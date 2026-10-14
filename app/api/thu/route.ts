import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { taoGioiHan } from "@/lib/gioi-han";
import { kiemThu, loaiKhai } from "@/lib/thu";
import { TRANG_CAM_ON, TRANG_CHUA_GUI, type LoaiThu, type MaLoiThu } from "@/lib/thu-chu";
import { siteConfig } from "@/site.config";

/**
 * Nơi nhận thư của web (phiên S5; docs/07, mục A5): lá thư “Gửi một câu hỏi”,
 * ô “Nhận thư hằng tháng” và ô “Báo cho tôi khi sách ra đời” đều gửi về đây.
 * Máy chủ kiểm dữ liệu, chặn máy gửi rác, rồi chuyển sang Google Apps Script
 * (apps-script/Code.gs). Apps Script ghi vào Google Sheets và gửi Gmail.
 *
 * Trình duyệt không bao giờ gọi thẳng Apps Script: địa chỉ và mã bí mật chỉ
 * nằm trong biến môi trường của Vercel (THU_APPS_SCRIPT_URL, THU_BI_MAT).
 *
 * Biểu mẫu chạy JavaScript gửi kèm `Accept: application/json` và nhận lại
 * JSON. Biểu mẫu gửi thường (trình duyệt tắt JavaScript) được chuyển hướng
 * sang trang cảm ơn, hoặc trang “chưa gửi được”.
 *
 * Không ghi nội dung thư, tên hay địa chỉ thư vào log. Log chỉ có loại lỗi.
 */

export const maxDuration = 30;

/** Dung lượng tối đa của một lần gửi; lá thư dài nhất cũng chỉ vài chục KB. */
const DUNG_LUONG_TOI_DA = 64 * 1024;
/** Mỗi địa chỉ mạng gửi tối đa 5 lần trong 10 phút. Apps Script đếm thêm một lần nữa. */
const duocGui = taoGioiHan({ toiDa: 5, khoangMs: 10 * 60 * 1000 });
/** Apps Script thường trả lời trong 2–5 giây. */
const CHO_APPS_SCRIPT_MS = 20_000;

type KetQua = { ok: true; den: string } | { ok: false; loi: MaLoiThu };

function traLoi(request: NextRequest, json: boolean, loai: LoaiThu, ma: MaLoiThu | null): NextResponse {
  if (!json) {
    const den = ma ? TRANG_CHUA_GUI : TRANG_CAM_ON[loai];
    return NextResponse.redirect(new URL(den, request.url), 303);
  }
  const body: KetQua = ma ? { ok: false, loi: ma } : { ok: true, den: TRANG_CAM_ON[loai] };
  const status = ma === null ? 200 : ma === "du-lieu" ? 400 : ma === "nhieu" ? 429 : 503;
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Địa chỉ mạng của khách. Trên Vercel, tiêu đề này do Vercel đặt, khách không giả được. */
function diaChiMang(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  return xff?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "khong-ro";
}

/** Đọc biểu mẫu thành các cặp tên – giá trị chữ (bỏ tệp đính kèm nếu có). */
async function docDuLieu(request: NextRequest): Promise<Record<string, string> | null> {
  try {
    const loaiNoiDung = request.headers.get("content-type") ?? "";
    if (loaiNoiDung.includes("application/json")) {
      const obj: unknown = await request.json();
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) return null;
      return Object.fromEntries(
        Object.entries(obj).filter((e): e is [string, string] => typeof e[1] === "string"),
      );
    }
    const fd = await request.formData();
    const kq: Record<string, string> = {};
    for (const [k, v] of fd) if (typeof v === "string") kq[k] = v;
    return kq;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Lá thư còn tắt ở bản thật (site.config.ts, `noiNhanThu`): không nhận thư nào.
  if (!siteConfig.moLoiThu) return NextResponse.json({ ok: false, loi: "du-lieu" }, { status: 404 });

  const json = (request.headers.get("accept") ?? "").includes("application/json");

  // Chỉ nhận thư gửi từ chính web này.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    let cungNoi = false;
    try {
      cungNoi = new URL(origin).host === host;
    } catch {}
    if (!cungNoi) return traLoi(request, json, "hoi", "du-lieu");
  }

  if (Number(request.headers.get("content-length") ?? 0) > DUNG_LUONG_TOI_DA) {
    return traLoi(request, json, "hoi", "du-lieu");
  }
  const duLieu = await docDuLieu(request);
  if (!duLieu) return traLoi(request, json, "hoi", "du-lieu");
  const loai = loaiKhai(duLieu);

  // Ô bẫy: người thật không thấy ô này nên để trống. Máy gửi rác điền vào thì
  // vẫn được báo “đã gửi”, để nó không thử cách khác, nhưng thư bị bỏ.
  if (duLieu.website) return traLoi(request, json, loai, null);

  const thu = kiemThu(duLieu);
  if (!thu) return traLoi(request, json, loai, "du-lieu");

  const ip = diaChiMang(request);
  if (!duocGui(ip)) return traLoi(request, json, loai, "nhieu");

  const url = process.env.THU_APPS_SCRIPT_URL;
  const biMat = process.env.THU_BI_MAT;
  if (!url || !biMat) {
    console.error("[thu] Chưa đặt THU_APPS_SCRIPT_URL hoặc THU_BI_MAT trên Vercel.");
    return traLoi(request, json, loai, "mang");
  }

  // Khoá băm của địa chỉ mạng, để Apps Script đếm tần suất mà không biết địa chỉ thật.
  const khoa = createHash("sha256").update(`${ip}|${biMat}`).digest("hex").slice(0, 24);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...thu, biMat, khoa }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(CHO_APPS_SCRIPT_MS),
    });
    const kq = (await res.json().catch(() => null)) as { ok?: boolean; loi?: string } | null;
    if (kq?.ok === true) return traLoi(request, json, loai, null);
    if (kq?.loi === "nhieu") return traLoi(request, json, loai, "nhieu");
    // Chỉ ghi mã lỗi, không ghi gì của lá thư.
    console.error(`[thu] Apps Script không nhận thư: HTTP ${res.status}, mã ${kq?.loi ?? "không đọc được"}.`);
  } catch (e) {
    console.error(`[thu] Không gọi được Apps Script: ${e instanceof Error ? e.name : "lỗi lạ"}.`);
  }
  return traLoi(request, json, loai, "mang");
}

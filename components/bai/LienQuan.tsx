import Link from "next/link";
import { docChinChang, duongDanChang } from "@/lib/chang";
import { LOAI, TEN_LOAI, timThamChieu, type Bai } from "@/lib/noi-dung";
import type { MaChang } from "@/lib/nhan";

/**
 * Câu hỏi của một chặng: những câu hỏi đã có trên trang chặng (giữ thứ tự của
 * bản mẫu), rồi mọi bài hỏi – đáp khác cùng chặng đang được dựng. Câu nào đã
 * có bài thì có `href`.
 */
export function cauHoiCungChang(chang: MaChang, hienThi: Bai[], boQua: string[] = []): CauHoi[] {
  const c = typeof chang === "number" ? docChinChang()[chang - 1] : undefined;
  const hoi = hienThi.filter((b) => b.loai === "hoi");
  const ds: CauHoi[] = [];
  const daCo = new Set(boQua);
  const them = (chu: string, href?: string) => {
    if (daCo.has(chu)) return;
    daCo.add(chu);
    ds.push({ chu, href });
  };
  for (const q of c ? (c.trang?.cau_hoi_khac ?? c.cau_hoi_lien_quan) : []) them(q, hoi.find((b) => b.tieuDe === q)?.duongDan);
  for (const b of hoi) if (b.chang === chang) them(b.tieuDe, b.duongDan);
  return ds;
}

export type CauHoi = { chu: string; href?: string };

/** Danh sách câu hỏi; câu chưa có bài là chữ thường, như trên trang chặng. */
export function DanhSachCauHoi({ ds }: { ds: CauHoi[] }) {
  return (
    <ul className="list">
      {ds.map((q) => (
        <li key={q.chu}>{q.href ? <Link href={q.href}>{q.chu}</Link> : <a data-can="C1">{q.chu}</a>}</li>
      ))}
    </ul>
  );
}

/**
 * Bước 9 của khuôn hỏi – đáp: câu hỏi liên quan cùng chặng và các mục Từ
 * điển (docs/04, mục 4). Dùng cho mọi loại bài.
 *
 * - Câu hỏi cùng chặng (cauHoiCungChang). Câu chưa có bài là chữ thường,
 *   như trên trang chặng (docs/07, mục C1).
 * - Các bài trong `lien_quan` của frontmatter, chia theo loại.
 * Bài chưa được dựng (bài nháp ở production) không bao giờ có liên kết.
 */
export function LienQuan({ bai, hienThi }: { bai: Bai; hienThi: Bai[] }) {
  const chang = typeof bai.chang === "number" ? docChinChang()[bai.chang - 1] : undefined;
  const cauHoi = cauHoiCungChang(bai.chang, hienThi, [bai.tieuDe]);
  const them = (chu: string, href: string) => {
    if (!cauHoi.some((q) => q.chu === chu)) cauHoi.push({ chu, href });
  };

  // Bài nêu trong `lien_quan`, chỉ những bài đang được dựng.
  const lienQuan = bai.fm.lien_quan.flatMap((r) => {
    const b = timThamChieu(hienThi, r);
    return b ? [b] : [];
  });
  for (const b of lienQuan) if (b.loai === "hoi") them(b.tieuDe, b.duongDan);

  const khac = lienQuan.filter((b) => b.loai !== "hoi");
  if (cauHoi.length === 0 && khac.length === 0 && !chang) return null;

  return (
    <section className="s bai-lq" aria-labelledby="lien-quan">
      <div className="wrap">
        <h2 id="lien-quan">
          {chang ? "Những câu hỏi khác người ta hay mang ở chặng này" : "Những câu hỏi khác người ta hay mang"}
        </h2>
        {cauHoi.length > 0 ? <DanhSachCauHoi ds={cauHoi} /> : null}
        {LOAI.filter((l) => l !== "hoi").map((loai) => {
          const cua = khac.filter((b) => b.loai === loai);
          if (cua.length === 0) return null;
          return (
            <div key={loai}>
              <h3 className="lq-h">{TEN_LOAI[loai]}</h3>
              <ul className="list">
                {cua.map((b) => (
                  <li key={b.duongDan}>
                    <Link href={b.duongDan}>{b.tieuDe}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {chang ? (
          <p className="hc-link">
            <Link href={duongDanChang(chang)}>Đọc trọn chặng {chang.ten} ›</Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}

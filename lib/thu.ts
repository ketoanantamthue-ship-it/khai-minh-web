import "server-only";
import { z } from "zod";
import { CHU_DE_THU, NHAN_CHU_DE_THU } from "@/components/trang-chu/chu";
import type { LoaiThu } from "./thu-chu";

/**
 * Kiểm dữ liệu biểu mẫu gửi thư ở phía máy chủ (phiên S5). Trình duyệt đã kiểm
 * một lần cho khách thấy lời nhắc; ở đây kiểm lại vì ai cũng gửi thẳng được.
 *
 * Tên trường khớp thuộc tính `name` trong biểu mẫu (GuiCauHoiForm, FormNhanThu).
 */

/** Độ dài tối đa, đủ rộng cho một lá thư dài, đủ chặt để không ai nhồi dữ liệu. */
export const DO_DAI = { ten: 80, cauHoi: 6000, email: 254 } as const;

/** Ô không bắt buộc: biểu mẫu có thể không gửi trường này. */
const chuoi = z.string().optional().default("").transform((s) => s.trim());
/** Ô đánh dấu của biểu mẫu HTML gửi "on" khi được chọn, không gửi gì khi bỏ trống. */
const daDongY = z.literal(["on", "true"]);
const email = z.string().trim().max(DO_DAI.email).pipe(z.email());

const laThu = z.object({
  loai: z.literal("hoi"),
  topic: z.enum(Object.keys(CHU_DE_THU) as [keyof typeof CHU_DE_THU, ...(keyof typeof CHU_DE_THU)[]]),
  dieu: chuoi,
  ten: chuoi.pipe(z.string().max(DO_DAI.ten)),
  "cau-hoi": z.string().trim().min(1).max(DO_DAI.cauHoi),
  email: chuoi.pipe(z.union([z.literal(""), email])),
  "dong-y": daDongY,
});

const nhanThu = z.object({
  loai: z.enum(["thang", "sach"]),
  email,
  "dong-y": daDongY,
});

const thuGui = z.discriminatedUnion("loai", [laThu, nhanThu]);

/** Dữ liệu gửi sang Apps Script (apps-script/Code.gs, hàm `doPost`). */
export type ThuDaKiem =
  | {
      loai: "hoi";
      chuDe: string;
      ten: string;
      cauHoi: string;
      email: string;
      dongY: true;
    }
  | { loai: "thang" | "sach"; email: string; dongY: true };

/** Kiểm và chuẩn hoá dữ liệu biểu mẫu. Trả `null` khi dữ liệu không hợp lệ. */
export function kiemThu(duLieu: Record<string, string>): ThuDaKiem | null {
  const kq = thuGui.safeParse(duLieu);
  if (!kq.success) return null;
  const d = kq.data;
  if (d.loai !== "hoi") return { loai: d.loai, email: d.email.toLowerCase(), dongY: true };

  let chuDe = NHAN_CHU_DE_THU.find((c) => c.ma === d.topic)?.nhan ?? d.topic;
  if (d.topic === "hc") {
    const so = Number(d.dieu);
    if (Number.isInteger(so) && so >= 1 && so <= 9) chuDe += ` (Điều ${so})`;
  }
  return { loai: "hoi", chuDe, ten: d.ten, cauHoi: d["cau-hoi"], email: d.email.toLowerCase(), dongY: true };
}

/** Loại thư khai trong biểu mẫu, kể cả khi dữ liệu còn lại không hợp lệ. */
export function loaiKhai(duLieu: Record<string, string>): LoaiThu {
  const l = duLieu.loai;
  return l === "thang" || l === "sach" ? l : "hoi";
}

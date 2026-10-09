/**
 * Tên các sự kiện trên `window` mà các phần của trang chủ dùng để gọi nhau
 * (bản mẫu gọi thẳng hàm; ở đây mỗi phần là một thành phần riêng).
 */
export const SU_KIEN = {
  /** Mở lớp phủ Mục lục. `detail`: phần tử đã mở, để trả focus khi đóng. */
  moMucLuc: "km-mo-muc-luc",
  /** Mở lớp Ngồi lặng chín mươi giây. */
  ngoiLang: "km-ngoi-lang",
  /** Mở một chặng trên trang chủ. `detail`: chỉ số chặng 0–8. */
  moChang: "km-mo-chang",
  /** Chọn người đang hỏi cho (trục "bạn đang lo cho ai"). `detail`: mã người hỏi. */
  chonNguoiHoi: "km-chon-nguoi-hoi",
} as const;

/** Mã người hỏi, dùng chung cho cánh cổng và trục "bạn đang lo cho ai" (docs/01, mục B4). */
export const NGUOI_HOI = ["self", "spouse", "child", "parent", "gone"] as const;
export type NguoiHoi = (typeof NGUOI_HOI)[number];

/** Chế độ tĩnh: giảm chuyển động, bản nhẹ hoặc chữ lớn (CLAUDE.md, quy tắc 10). */
export function laCheDoTinh(): boolean {
  if (typeof window === "undefined") return true;
  const goc = document.documentElement.classList;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches || goc.contains("lite") || goc.contains("easy")
  );
}

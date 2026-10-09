import { veAnhOg, KICH_THUOC_OG, KIEU_OG } from "@/lib/anh-og";

export const size = KICH_THUOC_OG;
export const contentType = KIEU_OG;
export const alt = "Khai Minh – Người Khai Vấn";

/** Ảnh chia sẻ mặc định của web (trang nào chưa có ảnh riêng thì dùng ảnh này). */
export default async function Anh() {
  return veAnhOg({
    tieuDe: "Đời người có chín chặng, và chặng nào cũng có những câu hỏi ta chỉ dám hỏi mình lúc nửa đêm.",
    nhan: "CHÍN CHẶNG ĐỜI",
  });
}

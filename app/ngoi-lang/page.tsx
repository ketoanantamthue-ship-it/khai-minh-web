import { KhoiTrangChu, TrangKhung } from "@/components/khung/TrangKhung";
import { KhoangLang } from "@/components/trang-chu/KhoangLang";
import { NgoiLang } from "@/components/trang-chu/KhoangLangHieuUng";
import { taoMetadata } from "@/lib/seo";
import "@/styles/trang-chu.css";

/**
 * Ngồi lặng /ngoi-lang (phiên S4; docs/02, mục 3): phần “Một khoảng lặng” của
 * trang chủ, cùng lớp “ngồi lặng chín mươi giây” mở bằng nút trong phần ấy.
 * Lời mời chính: “Ngồi lặng cùng tôi chín mươi giây” (Bản cuối: bắt đầu ngồi
 * lặng). Video rót trà và giọng đọc chờ chất liệu thật (docs/07, mục B5).
 */
export const metadata = taoMetadata({
  tieuDe: "Ngồi lặng chín mươi giây",
  moTa: "Bạn chỉ cần chín mươi giây để thở chậm cùng tôi, và không có câu hỏi nào cần trả lời.",
  duongDan: "/ngoi-lang",
});

export default function TrangNgoiLang() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Ngồi lặng chín mươi giây", duongDan: "/ngoi-lang" },
      ]}
      tieuDe="Ngồi lặng chín mươi giây"
    >
      <KhoiTrangChu>
        <KhoangLang noiKhac />
        <NgoiLang />
      </KhoiTrangChu>
    </TrangKhung>
  );
}

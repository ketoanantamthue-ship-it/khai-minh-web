import { KhoiGiay, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { KhoiSach, TIEU_DE_SACH } from "@/components/trang-con/KhoiSach";
import { OCan } from "@/components/trang-con/OCan";
import { taoMetadata } from "@/lib/seo";

/**
 * Sách /sach (phiên S4; docs/02, mục 3): khối sách của Cửa Trí, giữ nguyên
 * chữ. Khung theo W2, mục 4: sách là gì, mục lục dự kiến, đoạn trích, đăng ký
 * nhận tin. Mục lục dự kiến và đoạn trích chờ chữ (docs/07, mục C12); bìa
 * sách chờ B11. Lời mời chính là ô “Báo cho tôi khi sách ra đời”.
 */
export const metadata = taoMetadata({
  tieuDe: "Sách Soi – Thấu – Chuyển",
  moTa: "Cuốn sách nói về sáu trạng thái của tâm và con đường tự soi. Phần đầu, Tri Thiên Mệnh, bàn về chữ “mệnh” trong cổ học và trong lời Phật dạy.",
  duongDan: "/sach",
});

export default function Sach() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Cửa Trí", duongDan: "/tri" },
        { ten: "Sách", duongDan: "/sach" },
      ]}
      nhan="CỬA TRÍ"
      tieuDe={TIEU_DE_SACH}
    >
      <KhoiGiay>
        <KhoiSach coTieuDe={false} />
        <MucGiay id="muc-luc-du-kien" tieuDe="Mục lục dự kiến" cho>
          <OCan ma="C12" />
        </MucGiay>
        <MucGiay id="doan-trich" tieuDe="Đoạn trích" cho>
          <OCan ma="C12" />
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

import { KhoiTrangChu, TrangKhung } from "@/components/khung/TrangKhung";
import { GuiCauHoi } from "@/components/trang-chu/GuiCauHoi";
import { taoMetadata } from "@/lib/seo";
import "@/styles/trang-chu.css";

/**
 * Gửi một câu hỏi /gui-cau-hoi: phần #gui-cau-hoi của trang chủ (lá thư gửi
 * Khai Minh), để mọi nút “Gửi một câu hỏi” ở đầu trang và các trang con có
 * nơi đến (docs/07, mục E9, E12, E17). Liên kết từ trang khác mang chủ đề
 * theo tham số ?chu-de= (lib/lien-ket.ts).
 *
 * Biểu mẫu vẫn là bản xem trước: chưa gửi thư đi đâu. Phiên S5 nối nơi nhận
 * thư, chống spam và trang cảm ơn (docs/07, mục A5, E3, E18).
 */
export const metadata = taoMetadata({
  tieuDe: "Gửi một câu hỏi",
  moTa: "Tôi đọc từng câu hỏi. Có những câu, nếu bạn đồng ý, tôi sẽ trả lời trong một bài viết và không nêu tên bạn.",
  duongDan: "/gui-cau-hoi",
});

export default function TrangGuiCauHoi() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Gửi một câu hỏi", duongDan: "/gui-cau-hoi" },
      ]}
      tieuDe="Gửi một câu hỏi"
    >
      <KhoiTrangChu>
        <GuiCauHoi />
      </KhoiTrangChu>
    </TrangKhung>
  );
}

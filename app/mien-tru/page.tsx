import { ChoLuatSu } from "@/components/khung/ChoLuatSu";
import { KhoiGiay, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { MIEN_TRU } from "@/components/SiteFooter";
import { taoMetadata } from "@/lib/seo";

/**
 * Miễn trừ trách nhiệm /mien-tru (phiên S4; docs/02, mục 3). Trang chính sách chỉ dựng khung.
 * Đoạn Miễn trừ trách nhiệm của chân trang (bản mẫu) đứng trước; phần chữ pháp lý đầy đủ
 * chờ luật sư (docs/07, mục D3).
 */
export const metadata = taoMetadata({ tieuDe: "Miễn trừ trách nhiệm", moTa: MIEN_TRU, duongDan: "/mien-tru" });

export default function MienTru() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Miễn trừ trách nhiệm", duongDan: "/mien-tru" },
      ]}
      nhan="CHÍNH SÁCH VÀ QUYỀN"
      tieuDe="Miễn trừ trách nhiệm"
    >
      <KhoiGiay>
        <MucGiay id="noi-dung" tieuDe="Miễn trừ trách nhiệm">
          <p className="lede">{MIEN_TRU}</p>
          <ChoLuatSu />
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

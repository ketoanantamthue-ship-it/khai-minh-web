import { ChoLuatSu } from "@/components/khung/ChoLuatSu";
import { KhoiGiay, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { taoMetadata } from "@/lib/seo";

/**
 * Điều khoản sử dụng /dieu-khoan (phiên S4; docs/02, mục 3). Trang chính sách chỉ dựng khung.
 * Chữ pháp lý chờ luật sư (docs/07, mục D3).
 */
export const metadata = taoMetadata({ tieuDe: "Điều khoản sử dụng", duongDan: "/dieu-khoan" });

export default function DieuKhoan() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Điều khoản sử dụng", duongDan: "/dieu-khoan" },
      ]}
      nhan="CHÍNH SÁCH VÀ QUYỀN"
      tieuDe="Điều khoản sử dụng"
    >
      <KhoiGiay>
        <MucGiay id="noi-dung" tieuDe="Điều khoản sử dụng">
          <ChoLuatSu />
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

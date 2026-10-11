import { ChoLuatSu } from "@/components/khung/ChoLuatSu";
import { KhoiGiay, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { taoMetadata } from "@/lib/seo";

/**
 * Chính sách cookie /cookie (phiên S4; docs/02, mục 3). Trang chính sách chỉ dựng khung.
 * Chữ pháp lý chờ luật sư (docs/07, mục D3).
 */
export const metadata = taoMetadata({ tieuDe: "Chính sách cookie", duongDan: "/cookie" });

export default function Cookie() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Chính sách cookie", duongDan: "/cookie" },
      ]}
      nhan="CHÍNH SÁCH VÀ QUYỀN"
      tieuDe="Chính sách cookie"
    >
      <KhoiGiay>
        <MucGiay id="noi-dung" tieuDe="Chính sách cookie">
          <ChoLuatSu />
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

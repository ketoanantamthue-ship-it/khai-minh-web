import { ChoLuatSu } from "@/components/khung/ChoLuatSu";
import { KhoiGiay, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { taoMetadata } from "@/lib/seo";

/**
 * Chính sách bảo mật /bao-mat (phiên S4; docs/02, mục 3). Trang chính sách chỉ dựng khung.
 * Chữ pháp lý chờ luật sư (docs/07, mục D3).
 */
export const metadata = taoMetadata({ tieuDe: "Chính sách bảo mật", duongDan: "/bao-mat" });

export default function BaoMat() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Chính sách bảo mật", duongDan: "/bao-mat" },
      ]}
      nhan="CHÍNH SÁCH VÀ QUYỀN"
      tieuDe="Chính sách bảo mật"
    >
      <KhoiGiay>
        <MucGiay id="noi-dung" tieuDe="Chính sách bảo mật">
          <ChoLuatSu />
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

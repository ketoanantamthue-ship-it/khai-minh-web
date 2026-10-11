import { ChoLuatSu } from "@/components/khung/ChoLuatSu";
import { KhoiGiay, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { dieuSo } from "@/components/trang-chu/LoiHua";
import { taoMetadata } from "@/lib/seo";

/**
 * Dữ liệu của bạn /du-lieu (phiên S4; docs/02, mục 3). Mở bằng Điều 8 của
 * Hiến chương (bản mẫu). Khung theo W2, mục 4: thu gì, để làm gì, lưu ở đâu
 * và bao lâu, quyền của bạn, liên hệ. Chữ pháp lý chờ luật sư (docs/07, D3).
 */
const DIEU_8 = dieuSo(8);
const MUC = [
  { id: "thu-gi", ten: "Thu gì" },
  { id: "de-lam-gi", ten: "Để làm gì" },
  { id: "luu-o-dau", ten: "Lưu ở đâu, bao lâu" },
  { id: "quyen", ten: "Quyền của bạn" },
  { id: "lien-he", ten: "Liên hệ" },
];

export const metadata = taoMetadata({ tieuDe: "Dữ liệu của bạn", moTa: DIEU_8.lam, duongDan: "/du-lieu" });

export default function DuLieu() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Dữ liệu của bạn", duongDan: "/du-lieu" },
      ]}
      nhan="HIẾN CHƯƠNG · ĐIỀU 8"
      tieuDe="Dữ liệu của bạn"
      soi={DIEU_8.phu}
    >
      <KhoiGiay>
        <MucGiay id="giu-kin" tieuDe={DIEU_8.ten}>
          <p className="lede">{DIEU_8.lam}</p>
          <p className="lede">{DIEU_8.kiem}</p>
        </MucGiay>
        {MUC.map((m) => (
          <MucGiay key={m.id} id={m.id} tieuDe={m.ten}>
            <ChoLuatSu />
          </MucGiay>
        ))}
      </KhoiGiay>
    </TrangKhung>
  );
}

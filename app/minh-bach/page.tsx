import { KhoiGiay, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { OCan } from "@/components/trang-con/OCan";
import { BAO_CAO, dieuSo, LOI_BAO_CAO } from "@/components/trang-chu/LoiHua";
import { taoMetadata } from "@/lib/seo";

/**
 * Minh bạch lợi ích /minh-bach (phiên S4; docs/02, mục 3). Mở bằng Điều 9 của
 * Hiến chương (bản mẫu). Danh sách lợi ích kinh doanh chờ anh (docs/07, mục B8)
 * và quyết định cửa Thân A hay B (A3). Mục #bao-cao (docs/01, mục F1) dùng
 * chữ báo cáo minh bạch của trang chủ: bản đầu tiên ra sau đợt đồng hành đầu
 * tiên. Trang không có lời mời.
 */
const DIEU_9 = dieuSo(9);

export const metadata = taoMetadata({ tieuDe: "Minh bạch lợi ích", moTa: DIEU_9.lam, duongDan: "/minh-bach" });

export default function MinhBach() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Minh bạch lợi ích", duongDan: "/minh-bach" },
      ]}
      nhan="HIẾN CHƯƠNG · ĐIỀU 9"
      tieuDe="Minh bạch lợi ích"
      soi={DIEU_9.phu}
    >
      <KhoiGiay>
        <MucGiay id="loi-ich" tieuDe={DIEU_9.ten}>
          <p className="lede">{DIEU_9.lam}</p>
          {/* Các lợi ích kinh doanh của Khai Minh (docs/07, mục B8; chờ quyết định A3). */}
          <OCan ma="B8" />
        </MucGiay>
        <MucGiay id="bao-cao" tieuDe="Báo cáo minh bạch hằng năm">
          <p className="lede">{LOI_BAO_CAO}</p>
          <ul className="bao-cao">
            {BAO_CAO.map((b) => (
              <li key={b.ten}>
                <b>{b.ten}</b>
                <span>{b.khi}</span>
              </li>
            ))}
          </ul>
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

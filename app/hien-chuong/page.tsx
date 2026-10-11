import { KhoiGiay, KhoiTrangChu, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { LienKetNgoai } from "@/components/trang-con/LienKetNgoai";
import { OCan } from "@/components/trang-con/OCan";
import { LoiHua } from "@/components/trang-chu/LoiHua";
import { taoMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import "@/styles/trang-chu.css";

/**
 * Hiến chương /hien-chuong (phiên S4; docs/02, mục 3): chín điều hứa và “Khi
 * tôi làm chưa đúng một điều” (phần #loi-hua, #dieu-1…9, #khi-sai của trang
 * chủ), cộng mục #lich-su-sua-doi (docs/01, mục F1). Bản gốc đầy đủ đặt ở
 * antammenh.com; địa chỉ chưa chốt (docs/07, mục A6). Ngày hiệu lực chờ C8.
 * Trang không có nút bán.
 */
export const metadata = taoMetadata({
  tieuDe: "Hiến chương An Tâm Mệnh",
  moTa: "Một lời hứa chỉ có giá trị khi bạn kiểm tra được nó. Vì vậy, mỗi điều đều ghi rõ việc tôi làm, cách bạn kiểm chứng, và gốc của lời hứa ấy.",
  duongDan: "/hien-chuong",
});

export default function HienChuong() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Hiến chương", duongDan: "/hien-chuong" },
      ]}
      nhan="HIẾN CHƯƠNG · NHỮNG LỜI HỨA"
      tieuDe="Hiến chương An Tâm Mệnh"
    >
      <KhoiTrangChu>
        <LoiHua noiKhac />
      </KhoiTrangChu>
      <KhoiGiay>
        <MucGiay id="lich-su-sua-doi" tieuDe="Lịch sử sửa đổi Hiến chương">
          <p className="lede">Mỗi lần sửa đổi đều được ghi lại ngày và lý do, công khai cho mọi người xem.</p>
          <dl className="tg-ds sua-doi">
            <div>
              <dt>Hiến chương An Tâm Mệnh, bản công bố 1.0</dt>
              <dd>
                {/* Ngày hiệu lực Hiến chương (docs/07, mục C8). */}
                <OCan ma="C8" kieu="dong" />
              </dd>
            </div>
          </dl>
          <p className="hc-link">
            <LienKetNgoai lk={siteConfig.lienKetNgoai.hienChuongGoc}>
              {siteConfig.lienKetNgoai.hienChuongGoc.ten}
            </LienKetNgoai>
          </p>
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

import { KhoiGiay, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { NutBanNhe, NutChuLon } from "@/components/HienThiToggle";
import { OCan } from "@/components/trang-con/OCan";
import { taoMetadata } from "@/lib/seo";

/**
 * Trợ năng và cách hiển thị /tro-nang (phiên S4; docs/01, mục F1; docs/02,
 * mục 3). Hai nút “Chữ lớn, dễ đọc” và “Bản nhẹ cho máy yếu” của chân trang
 * đặt ngay ở màn đầu, dùng được thật. Lời giải thích cách dùng hai chế độ và
 * cam kết về trợ năng chờ chữ (docs/07, mục C14); khi có chữ cam kết thì thêm
 * một mục cuối trang.
 */
export const metadata = taoMetadata({ tieuDe: "Trợ năng và cách hiển thị", duongDan: "/tro-nang" });

export default function TroNang() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Trợ năng và cách hiển thị", duongDan: "/tro-nang" },
      ]}
      tieuDe="Trợ năng và cách hiển thị"
      moi={
        <div className="prefs" role="group" aria-label="Cách hiển thị trang">
          <NutChuLon nhan="Chữ lớn, dễ đọc" />
          <NutBanNhe />
        </div>
      }
    >
      <KhoiGiay>
        <MucGiay id="cach-dung" tieuDe="Chữ lớn, dễ đọc" cho>
          <OCan ma="C14" />
        </MucGiay>
        <MucGiay id="ban-nhe" tieuDe="Bản nhẹ cho máy yếu" cho>
          <OCan ma="C14" />
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

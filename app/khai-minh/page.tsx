import Link from "next/link";
import { KhoiGiay, KhoiTrangChu, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { OCan } from "@/components/trang-con/OCan";
import { NguoiGiu } from "@/components/trang-chu/NguoiGiu";
import { ID_NGUOI, nutNguoi, nutToChuc, taoMetadata, TRANG_TAC_GIA } from "@/lib/seo";
import { siteConfig, urlTuyetDoi } from "@/site.config";
import "@/styles/trang-chu.css";

/**
 * Trang tác giả /khai-minh (phiên S4; docs/01, mục E3; docs/02, mục 3).
 * Nơi gốc của thực thể “Khai Minh” (docs/05, mục 4): JSON-LD ProfilePage trỏ
 * về Person. /cau-chuyen chuyển hướng 301 về mục #cau-chuyen của trang này.
 *
 * Chữ: dòng danh xưng của màn mở trang chủ (docs/07, mục A4), phần “Người giữ
 * những câu hỏi” của trang chủ (chân dung, quầy thuốc, những điều tự kiểm
 * chứng). Câu chuyện của tôi chờ bốn buổi ghi âm (B3); tiểu sử và các kênh
 * chính thức chờ C7; ảnh chân dung chờ B2. Lời mời chính: “Đọc cách tôi đồng
 * hành” (Bản cuối, sơ đồ trang).
 */
export const metadata = taoMetadata({
  tieuDe: siteConfig.kyTen,
  moTa: "Tôi không biết trước đời bạn. Điều tôi biết là cách ngồi lại với một câu hỏi cho đến khi nó tự mở ra.",
  duongDan: TRANG_TAC_GIA,
});

export default function TrangTacGia() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Câu chuyện của tôi", duongDan: TRANG_TAC_GIA },
      ]}
      nhan="NGƯỜI KHAI VẤN · AN TÂM MỆNH"
      tieuDe="Khai Minh"
      soi="Tôi là Khai Minh: người khai vấn, người viết sách, và một dược sĩ."
      moi={
        <Link className="btn" href="/cach-toi-dong-hanh">
          Đọc cách tôi đồng hành
        </Link>
      }
      jsonLd={[
        {
          "@type": "ProfilePage",
          "@id": urlTuyetDoi(`${TRANG_TAC_GIA}#trang`),
          url: urlTuyetDoi(TRANG_TAC_GIA),
          inLanguage: "vi",
          mainEntity: { "@id": ID_NGUOI },
        },
        nutNguoi(),
        nutToChuc(),
      ]}
    >
      <KhoiTrangChu>
        <NguoiGiu noiKhac />
      </KhoiTrangChu>
      <KhoiGiay>
        <MucGiay id="cau-chuyen" tieuDe="Câu chuyện của tôi">
          {/* Câu chuyện thật, gỡ từ bốn buổi ghi âm (docs/07, mục B3; W2, mục 1). */}
          <OCan ma="B3" />
        </MucGiay>
        <MucGiay id="tieu-su" tieuDe="Tiểu sử">
          {/* Tiểu sử chuẩn, một đoạn ngắn và một đoạn dài (docs/07, mục C7). */}
          <OCan ma="C7" />
          <ul className="kenh" aria-label="Kênh chính thức">
            {siteConfig.mangXaHoi.map((k) => (
              <li key={k.ten}>{k.url ? <a href={k.url}>{k.ten}</a> : <a data-can={k.can}>{k.ten}</a>}</li>
            ))}
          </ul>
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

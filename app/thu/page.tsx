import { DanhSachBai } from "@/components/bai/DanhSachBai";
import { ManDauBai } from "@/components/bai/ManDauBai";
import { JsonLd } from "@/components/JsonLd";
import { LoiMoiNhanThu } from "@/components/trang-con/LoiMoiNhanThu";
import { doorStyle } from "@/lib/doors";
import { khoHienThi } from "@/lib/kho";
import { baiCongKhai, locLoai, TEN_LOAI } from "@/lib/noi-dung";
import { doThi, nutDuongDan, SO_BAI_DE_LAP_CHI_MUC, taoMetadata, type MucDuongDan } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import "@/styles/trang-con.css";
import "@/styles/bai.css";

/**
 * Bản lưu thư hằng tháng /thu (phiên S3; docs/02, mục 2). Lời mời chính là
 * nhận thư; chữ lấy từ Cửa Trí (prototypes/cua-tri.html). Mỗi lá thư là một
 * tệp content/thu/<năm-tháng>.mdx, mới nhất trước.
 */
const VUN: MucDuongDan[] = [
  { ten: "Trang chủ", duongDan: "/" },
  { ten: TEN_LOAI.thu, duongDan: "/thu" },
];

export const metadata = taoMetadata({
  tieuDe: "Thư hằng tháng của Khai Minh",
  moTa: "Lá thư kể về một câu hỏi đời người tôi đang ngồi cùng, một trang sách tôi vừa đọc lại, và một thực tập nhỏ cho tháng ấy.",
  duongDan: "/thu",
  // Ít hơn ba lá thư đã đăng thì `noindex, follow` (docs/10, mục R5).
  mong: locLoai(baiCongKhai(), "thu").length < SO_BAI_DE_LAP_CHI_MUC,
});

export default function TrangThu() {
  const ds = locLoai(khoHienThi(), "thu").sort((a, b) =>
    (b.fm.ngay_gui ?? b.slug).localeCompare(a.fm.ngay_gui ?? a.slug),
  );
  return (
    <main id="main" className="km-con km-bai" data-door="tri" style={doorStyle("tri")}>
      <JsonLd duLieu={doThi(nutDuongDan(VUN))} />
      <ManDauBai duongDan={VUN} nhan="CỬA TRÍ" tieuDe={TEN_LOAI.thu}>
        {/* Bản thật chưa có nơi nhận thư: không mời nhận thư (docs/07, mục A18). */}
        {siteConfig.moLoiThu ? (
          <div className="cta">
            <a className="btn" href="#thu">
              Nhận thư hằng tháng của tôi
            </a>
          </div>
        ) : null}
      </ManDauBai>
      <section className="s">
        <div className="wrap bai-doc">
          <DanhSachBai ds={ds} an={["chang"]} />
        </div>
      </section>
      <LoiMoiNhanThu />
    </main>
  );
}

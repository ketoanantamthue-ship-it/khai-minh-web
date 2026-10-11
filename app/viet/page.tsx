import { BoLoc } from "@/components/bai/BoLoc";
import { DanhSachBai } from "@/components/bai/DanhSachBai";
import { ManDauBai } from "@/components/bai/ManDauBai";
import { JsonLd } from "@/components/JsonLd";
import { LoiMoiNhanThu } from "@/components/trang-con/LoiMoiNhanThu";
import { docChinChang } from "@/lib/chang";
import { doors, DOOR_KEYS } from "@/lib/doors";
import { khoHienThi } from "@/lib/kho";
import { baiCongKhai, locLoai, TEN_LOAI } from "@/lib/noi-dung";
import { SAU_TANG } from "@/lib/sau-tang";
import { doThi, nutDuongDan, SO_BAI_DE_LAP_CHI_MUC, taoMetadata, type MucDuongDan } from "@/lib/seo";
import "@/styles/trang-con.css";
import "@/styles/bai.css";

/**
 * Kho bài viết /viet (phiên S3; docs/02, mục 2): mọi bài trong content/viet,
 * mới nhất trước, lọc được theo ba nhãn. Lời mời chính: nhận thư hằng tháng
 * (Bản cuối, mục sơ đồ trang). Tiêu đề theo W2, mục 4.
 */
const VUN: MucDuongDan[] = [
  { ten: "Trang chủ", duongDan: "/" },
  { ten: TEN_LOAI.viet, duongDan: "/viet" },
];

/**
 * Ít hơn ba bài đã đăng thì `noindex, follow` (docs/10, mục R5).
 * CẦN: câu mô tả cho máy tìm kiếm; bản mẫu và docs/nguon chưa có chữ cho kho
 * bài viết (docs/07, mục C11). Tới khi có, trang dùng mô tả chung của layout.
 */
export const metadata = taoMetadata({
  tieuDe: "Bài viết của Khai Minh",
  duongDan: "/viet",
  mong: locLoai(baiCongKhai(), "viet").length < SO_BAI_DE_LAP_CHI_MUC,
});

export default function TrangViet() {
  const ds = locLoai(khoHienThi(), "viet");
  return (
    <main id="main" className="km-con km-bai">
      <JsonLd duLieu={doThi(nutDuongDan(VUN))} />
      <ManDauBai duongDan={VUN} nhan="CỬA TRÍ" tieuDe="Bài viết của Khai Minh" />
      <section className="s">
        <div className="wrap bai-doc" id="kho-viet">
          {ds.length > 1 ? (
            <BoLoc
              vung="kho-viet"
              chang={[
                ...docChinChang().map((c) => ({ gia: String(c.so), ten: `${c.so}. ${c.ten}` })),
                { gia: "cat-ngang", ten: "Cắt ngang" },
              ]}
              tang={SAU_TANG.map((t) => ({ gia: t.ma, ten: t.nhan }))}
              cua={DOOR_KEYS.map((k) => ({ gia: k, ten: `Cửa ${doors[k].ten}` }))}
            />
          ) : null}
          <DanhSachBai ds={ds} />
        </div>
      </section>
      <LoiMoiNhanThu />
    </main>
  );
}

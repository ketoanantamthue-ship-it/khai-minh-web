import Link from "next/link";
import { CacLopSau, DauMucLuc, ICON_CHIN_CHANG, NoiDungNgoiLang, TieuDeLop } from "@/components/muc-luc/CacLop";
import { CuuCungTrang } from "@/components/muc-luc/CuuCungTrang";
import { docChinChang, duongDanChang } from "@/lib/chang";
import { taoMetadata } from "@/lib/seo";
import "@/styles/muc-luc.css";

export const metadata = taoMetadata({
  tieuDe: "Mục lục",
  moTa: "Ngôi nhà này có bốn lối đi. Bạn chọn lối nào gần với lòng mình nhất cũng được, và có thể quay lại đây bất cứ lúc nào.",
  duongDan: "/muc-luc",
});

/**
 * Trang /muc-luc (phiên S2): Mục lục bốn lớp ở dạng trang HTML đầy đủ, để
 * người đọc và máy tìm kiếm thấy trọn (docs/02, mục 1). Chữ giống hệt lớp phủ
 * Mục lục trên trang chủ (components/muc-luc/CacLop.tsx), chỉ khác:
 * - bốn lớp luôn mở, tiêu đề lớp là <h2>;
 * - cửu cung là liên kết, và cả chín thang sáu tầng nằm sẵn trong HTML;
 * - lời mời chính là “Đọc trọn chặng …” (mở một chặng), thay cho
 *   “Mở chặng này trên trang chủ”;
 * - “Ngồi lặng chín mươi giây” dẫn tới trang /ngoi-lang (phiên S4).
 */
export default function TrangMucLuc() {
  const chang = docChinChang().map((c) => ({
    so: c.so,
    ten: c.ten,
    han: c.han_tu,
    cauHoi: c.cau_hoi_chinh,
    href: duongDanChang(c),
  }));

  return (
    <main id="main" className="km-ml">
      <div className="idx-head">
        <DauMucLuc kieu="trang" />
      </div>
      <div className="idx-wrap ix">
        <section className="ix-sec ix-1" aria-labelledby="lop-chin-chang">
          <h2 className="ix-sum" id="lop-chin-chang">
            <TieuDeLop
              kieu="trang"
              so="I"
              icon={ICON_CHIN_CHANG}
              ten="Chín chặng đời"
              phu="Tìm chặng đời bạn đang đi qua"
            />
          </h2>
          <div className="ix-body">
            <p className="idx-h">
              <span>Chín chặng được đặt theo cửu cung Lạc thư.</span>
            </p>
            <CuuCungTrang chang={chang} />
          </div>
        </section>
        <div className="layers">
          <CacLopSau
            kieu="trang"
            goc="/"
            nutNgoiLang={
              <Link className="ix-a" href="/ngoi-lang">
                <NoiDungNgoiLang />
              </Link>
            }
          />
        </div>
      </div>
    </main>
  );
}

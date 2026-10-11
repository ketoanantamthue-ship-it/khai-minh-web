import { KhoiGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { LoiMoiNhanThu } from "@/components/trang-con/LoiMoiNhanThu";
import { BiaTuSach, LOI_TU_SACH, TIEU_DE_TU_SACH } from "@/components/trang-con/TuSach";
import { docChinChang } from "@/lib/chang";
import { taoMetadata } from "@/lib/seo";

/**
 * Tủ sách /tu-sach (phiên S4; docs/02, mục 3): ba cuốn sách gợi ý cho mỗi
 * chặng đời. Chữ của Cửa Trí; danh sách 27 cuốn chờ anh (docs/07, mục B7),
 * nên mỗi cuốn là một khung bìa trống. Lời mời chính: nhận thư hằng tháng.
 */
export const metadata = taoMetadata({ tieuDe: "Tủ sách", moTa: LOI_TU_SACH, duongDan: "/tu-sach" });

export default function TuSach() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Cửa Trí", duongDan: "/tri" },
        { ten: "Tủ sách", duongDan: "/tu-sach" },
      ]}
      nhan="CỬA TRÍ"
      tieuDe={TIEU_DE_TU_SACH}
      soi={LOI_TU_SACH}
    >
      <KhoiGiay>
        <section className="s" aria-label="Sách gợi ý theo chín chặng">
          <div className="wrap">
            {docChinChang().map((c) => (
              <div key={c.slug} className="tu-sach-chang">
                <h2>
                  Chặng {c.so}: {c.ten}
                </h2>
                <BiaTuSach tenChang={c.ten} />
              </div>
            ))}
          </div>
        </section>
        <LoiMoiNhanThu />
      </KhoiGiay>
    </TrangKhung>
  );
}

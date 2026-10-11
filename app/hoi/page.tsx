import Link from "next/link";
import { DanhSachBai } from "@/components/bai/DanhSachBai";
import { cauHoiCungChang, DanhSachCauHoi } from "@/components/bai/LienQuan";
import { ManDauBai } from "@/components/bai/ManDauBai";
import { JsonLd } from "@/components/JsonLd";
import { LoiMoiGuiCauHoi } from "@/components/trang-con/LoiMoiGuiCauHoi";
import { docChinChang, duongDanChang } from "@/lib/chang";
import { khoHienThi } from "@/lib/kho";
import { locLoai, TEN_LOAI } from "@/lib/noi-dung";
import { doThi, nutDuongDan, taoMetadata, type MucDuongDan } from "@/lib/seo";
import "@/styles/trang-con.css";
import "@/styles/bai.css";

/**
 * Trang mục /hoi (phiên S3): mọi câu hỏi, chia theo chín chặng, rồi những bài
 * cắt ngang (năm hạn, nghi lễ). Câu đã có bài thì là liên kết; câu chưa có
 * bài là chữ thường (docs/07, mục C1). Mỗi chặng dẫn tới trang nhãn
 * /chang/[slug]/hoi.
 */
const VUN: MucDuongDan[] = [
  { ten: "Trang chủ", duongDan: "/" },
  { ten: TEN_LOAI.hoi, duongDan: "/hoi" },
];

export const metadata = taoMetadata({ tieuDe: TEN_LOAI.hoi, duongDan: "/hoi" });

export default function TrangHoi() {
  const hienThi = khoHienThi();
  const catNgang = locLoai(hienThi, "hoi").filter((b) => b.chang === "cat-ngang");

  return (
    <main id="main" className="km-con km-bai">
      <JsonLd duLieu={doThi(nutDuongDan(VUN))} />
      <ManDauBai duongDan={VUN} nhan="CHÍN CHẶNG ĐỜI" tieuDe={TEN_LOAI.hoi} />
      {docChinChang().map((c) => (
        <section key={c.slug} className="s" aria-labelledby={`chang-${c.so}`}>
          <div className="wrap bai-doc">
            <h2 id={`chang-${c.so}`}>
              <Link href={`${duongDanChang(c)}/hoi`}>
                Chặng {c.so}: {c.ten}
              </Link>
            </h2>
            <DanhSachCauHoi ds={cauHoiCungChang(c.so, hienThi)} />
          </div>
        </section>
      ))}
      {catNgang.length > 0 ? (
        <section className="s" aria-labelledby="cat-ngang">
          <div className="wrap bai-doc">
            <h2 id="cat-ngang">Cắt ngang</h2>
            <DanhSachBai ds={catNgang} an={["chang"]} />
          </div>
        </section>
      ) : null}
      <LoiMoiGuiCauHoi />
    </main>
  );
}

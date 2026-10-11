import Link from "next/link";
import { notFound } from "next/navigation";
import { cauHoiCungChang, DanhSachCauHoi } from "@/components/bai/LienQuan";
import { ManDauBai } from "@/components/bai/ManDauBai";
import { JsonLd } from "@/components/JsonLd";
import { LoiMoiGuiCauHoi } from "@/components/trang-con/LoiMoiGuiCauHoi";
import { docChang, docChinChang, duongDanChang } from "@/lib/chang";
import { khoHienThi } from "@/lib/kho";
import { baiCongKhai, locLoai, TEN_LOAI } from "@/lib/noi-dung";
import { doThi, nutDuongDan, SO_BAI_DE_LAP_CHI_MUC, taoMetadata, type MucDuongDan } from "@/lib/seo";
import "@/styles/trang-con.css";
import "@/styles/bai.css";

/**
 * Trang nhãn “câu hỏi theo chặng” /chang/[slug]/hoi (phiên S3; docs/02, mục 2).
 * Tự sinh từ frontmatter: mọi bài hỏi – đáp của chặng, cộng những câu hỏi đã
 * có trên trang chặng. Câu chưa có bài là chữ thường (docs/07, mục C1).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return docChinChang().map((c) => ({ slug: c.slug }));
}

function tieuDe(goiTen: string) {
  return `Những câu hỏi người ta hay mang ở chặng ${goiTen}`;
}

function duongDanVun(c: NonNullable<ReturnType<typeof docChang>>): MucDuongDan[] {
  return [
    { ten: "Trang chủ", duongDan: "/" },
    { ten: `Chặng ${c.so}: ${c.ten}`, duongDan: duongDanChang(c) },
    { ten: TEN_LOAI.hoi, duongDan: `${duongDanChang(c)}/hoi` },
  ];
}

export async function generateMetadata({ params }: PageProps<"/chang/[slug]/hoi">) {
  const c = docChang((await params).slug);
  if (!c) return {};
  return taoMetadata({
    tieuDe: `${TEN_LOAI.hoi} – ${c.ten}`,
    moTa: c.cau_hoi_chinh,
    duongDan: `${duongDanChang(c)}/hoi`,
    // Ít hơn ba bài hỏi – đáp đã đăng ở chặng này thì `noindex, follow` (docs/10, mục R5).
    mong: locLoai(baiCongKhai(), "hoi").filter((b) => b.chang === c.so).length < SO_BAI_DE_LAP_CHI_MUC,
  });
}

export default async function CauHoiTheoChang({ params }: PageProps<"/chang/[slug]/hoi">) {
  const c = docChang((await params).slug);
  if (!c) notFound();
  const vun = duongDanVun(c);
  const cauHoi = cauHoiCungChang(c.so, khoHienThi());

  return (
    <main id="main" className="km-con km-bai">
      <JsonLd duLieu={doThi(nutDuongDan(vun))} />
      <ManDauBai
        duongDan={vun}
        nhan={
          <span>
            CHẶNG {c.so} · <span className="han">{c.han_tu}</span> · {c.ten.toLocaleUpperCase("vi")}
          </span>
        }
        tieuDe={tieuDe(c.trang?.goi_ten ?? c.ten.toLowerCase())}
        soi={c.soi}
      />
      <section className="s">
        <div className="wrap bai-doc">
          <DanhSachCauHoi ds={cauHoi} />
          <p className="hc-link">
            <Link href={duongDanChang(c)}>Đọc trọn chặng {c.ten} ›</Link>
          </p>
        </div>
      </section>
      <LoiMoiGuiCauHoi />
    </main>
  );
}

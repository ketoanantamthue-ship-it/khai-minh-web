import { notFound } from "next/navigation";
import { DanhSachBai } from "@/components/bai/DanhSachBai";
import { ManDauBai } from "@/components/bai/ManDauBai";
import { JsonLd } from "@/components/JsonLd";
import { LoiMoiNhanThu } from "@/components/trang-con/LoiMoiNhanThu";
import { khoHienThi } from "@/lib/kho";
import { baiCongKhai } from "@/lib/noi-dung";
import { TEN_TANG } from "@/lib/nhan";
import { SAU_TANG } from "@/lib/sau-tang";
import { doThi, nutDuongDan, SO_BAI_DE_LAP_CHI_MUC, taoMetadata, type MucDuongDan } from "@/lib/seo";
import "@/styles/trang-con.css";
import "@/styles/bai.css";

/**
 * Trang nhãn /tang/[tang] (phiên S3; docs/02, mục 2): mọi bài mang tầng ấy,
 * chia theo loại. Sáu tầng trong Mục lục dẫn về đây (lib/sau-tang.ts).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SAU_TANG.map((t) => ({ tang: t.ma }));
}

function tim(ma: string) {
  const i = SAU_TANG.findIndex((t) => t.ma === ma);
  return i < 0 ? undefined : { ...SAU_TANG[i]!, so: i + 1 };
}

function duongDanVun(t: NonNullable<ReturnType<typeof tim>>): MucDuongDan[] {
  return [
    { ten: "Trang chủ", duongDan: "/" },
    { ten: "Mục lục", duongDan: "/muc-luc" },
    { ten: t.nhan, duongDan: t.href },
  ];
}

export async function generateMetadata({ params }: PageProps<"/tang/[tang]">) {
  const t = tim((await params).tang);
  if (!t) return {};
  // Mô tả: dòng phụ của tầng trong Mục lục (bản mẫu). Ít hơn ba bài đã đăng
  // thì `noindex, follow` (docs/10, mục R5).
  return taoMetadata({
    tieuDe: `${t.nhan} – Tầng ${TEN_TANG[t.ma]}`,
    moTa: `${t.nhan}: ${t.phu.charAt(0).toLowerCase()}${t.phu.slice(1)}.`,
    duongDan: t.href,
    mong: baiCongKhai().filter((b) => b.tang === t.ma).length < SO_BAI_DE_LAP_CHI_MUC,
  });
}

export default async function TrangTang({ params }: PageProps<"/tang/[tang]">) {
  const t = tim((await params).tang);
  if (!t) notFound();
  const vun = duongDanVun(t);
  const ds = khoHienThi().filter((b) => b.tang === t.ma);

  return (
    <main id="main" className="km-con km-bai">
      <JsonLd duLieu={doThi(nutDuongDan(vun))} />
      <ManDauBai
        duongDan={vun}
        nhan={`TẦNG ${t.so} · ${TEN_TANG[t.ma].toLocaleUpperCase("vi")}`}
        tieuDe={t.nhan}
      />
      <section className="s">
        <div className="wrap bai-doc">
          <DanhSachBai ds={ds} nhom />
        </div>
      </section>
      <LoiMoiNhanThu />
    </main>
  );
}

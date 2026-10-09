import { notFound } from "next/navigation";
import { DanhSachBai } from "@/components/bai/DanhSachBai";
import { ManDauBai } from "@/components/bai/ManDauBai";
import { JsonLd } from "@/components/JsonLd";
import { LoiMoiNhanThu } from "@/components/trang-con/LoiMoiNhanThu";
import { khoHienThi } from "@/lib/kho";
import { TEN_TANG } from "@/lib/nhan";
import { SAU_TANG } from "@/lib/sau-tang";
import { doThi, nutDuongDan, taoMetadata, type MucDuongDan } from "@/lib/seo";
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
  return taoMetadata({ tieuDe: `${t.nhan} – Tầng ${TEN_TANG[t.ma]}`, duongDan: t.href });
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

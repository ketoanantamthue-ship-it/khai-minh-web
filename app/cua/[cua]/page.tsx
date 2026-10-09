import Link from "next/link";
import { notFound } from "next/navigation";
import { DanhSachBai } from "@/components/bai/DanhSachBai";
import { ManDauBai } from "@/components/bai/ManDauBai";
import { JsonLd } from "@/components/JsonLd";
import { CHU_CUA } from "@/components/trang-con/BaCuaKhac";
import { LoiMoiNhanThu } from "@/components/trang-con/LoiMoiNhanThu";
import { DOOR_KEYS, doors, doorStyle, type DoorKey } from "@/lib/doors";
import { khoHienThi } from "@/lib/kho";
import { doThi, nutDuongDan, taoMetadata, type MucDuongDan } from "@/lib/seo";
import "@/styles/trang-con.css";
import "@/styles/bai.css";

/**
 * Trang nhãn /cua/[cua] (phiên S3; docs/02, mục 2): mọi bài mang cửa ấy, chia
 * theo loại. Trang cửa chính vẫn là /tam, /tri, /than; trang này chỉ là danh
 * sách bài, mang màu của cửa (lib/doors.ts).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return DOOR_KEYS.map((cua) => ({ cua }));
}

function laCua(k: string): k is DoorKey {
  return (DOOR_KEYS as readonly string[]).includes(k);
}

function duongDanVun(k: DoorKey): MucDuongDan[] {
  return [
    { ten: "Trang chủ", duongDan: "/" },
    { ten: "Mục lục", duongDan: "/muc-luc" },
    { ten: `Cửa ${doors[k].ten}`, duongDan: `/cua/${k}` },
  ];
}

export async function generateMetadata({ params }: PageProps<"/cua/[cua]">) {
  const { cua } = await params;
  if (!laCua(cua)) return {};
  return taoMetadata({
    tieuDe: `Cửa ${doors[cua].ten} – ${CHU_CUA[cua].phu}`,
    moTa: CHU_CUA[cua].danhCho,
    duongDan: `/cua/${cua}`,
  });
}

export default async function TrangCua({ params }: PageProps<"/cua/[cua]">) {
  const { cua } = await params;
  if (!laCua(cua)) notFound();
  const d = doors[cua];
  const vun = duongDanVun(cua);
  const ds = khoHienThi().filter((b) => b.cua.includes(cua));

  return (
    <main id="main" className="km-con km-bai" data-door={cua} style={doorStyle(cua)}>
      <JsonLd duLieu={doThi(nutDuongDan(vun))} />
      <ManDauBai
        duongDan={vun}
        nhan={
          <>
            <span className="dk-seal" aria-hidden="true">
              {d.han}
            </span>
            {CHU_CUA[cua].phu.toLocaleUpperCase("vi")}
          </>
        }
        tieuDe={`Cửa ${d.ten}`}
        soi={CHU_CUA[cua].danhCho}
      />
      <section className="s">
        <div className="wrap bai-doc">
          <DanhSachBai ds={ds} nhom />
          <p className="hc-link">
            <Link href={d.href}>Xem cửa {d.ten.toLowerCase()}</Link>
          </p>
        </div>
      </section>
      <LoiMoiNhanThu />
    </main>
  );
}

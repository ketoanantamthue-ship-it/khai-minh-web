import Link from "next/link";
import { notFound } from "next/navigation";
import { TrangKhung } from "@/components/khung/TrangKhung";
import { taoMetadata } from "@/lib/seo";
import { CHUA_GUI } from "@/lib/thu-cam-on";
import { CHU_THU } from "@/lib/thu-chu";
import { siteConfig } from "@/site.config";

/**
 * Trang “chưa gửi được” (phiên S5). Chỉ gặp khi trình duyệt không chạy
 * JavaScript: biểu mẫu gửi theo cách thường của HTML, nơi nhận thư không
 * chuyển được thư đi thì đưa khách tới đây. Có JavaScript thì lời báo hiện
 * ngay dưới nút gửi và chữ khách viết vẫn còn nguyên. Luôn để `noindex`.
 * Lá thư còn tắt ở bản thật (`moLoiThu`) thì trang này ra 404.
 */
export const metadata = taoMetadata({
  tieuDe: CHUA_GUI.tieuDe,
  moTa: CHUA_GUI.soi,
  duongDan: "/chua-gui-duoc",
  mong: true,
});

export default function TrangChuaGui() {
  if (!siteConfig.moLoiThu) notFound();
  const zalo = siteConfig.lienHe.zalo;
  return (
    <TrangKhung
      vun={[]}
      tieuDe={CHUA_GUI.tieuDe}
      soi={CHUA_GUI.soi}
      moi={
        <>
          <Link className="btn" href="/gui-cau-hoi">
            {CHUA_GUI.quayLai}
          </Link>
          {zalo ? <p className="lien-404">{CHU_THU.loiZalo(zalo)}</p> : null}
        </>
      }
    >
      {null}
    </TrangKhung>
  );
}

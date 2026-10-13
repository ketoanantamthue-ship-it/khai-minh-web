import Link from "next/link";
import { notFound } from "next/navigation";
import { KhoiGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { taoMetadata } from "@/lib/seo";
import { CAM_ON, CAM_ON_NGOI_LANG, LOAI_THU, type LoaiThu } from "@/lib/thu-chu";
import { siteConfig } from "@/site.config";

/**
 * Trang cảm ơn sau khi gửi thư (phiên S5): /cam-on/la-thu (lá thư “Gửi một câu
 * hỏi”), /cam-on/thu-hang-thang và /cam-on/bao-sach (hai ô nhận thư). Chữ ở
 * lib/thu-chu.ts. Trang không vào sitemap và luôn để `noindex` (`mong`).
 */
const THEO_DUONG_DAN = Object.fromEntries(
  LOAI_THU.map((l) => [CAM_ON[l].duongDan.split("/").pop()!, l]),
) as Record<string, LoaiThu>;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(THEO_DUONG_DAN).map((loai) => ({ loai }));
}

export async function generateMetadata({ params }: PageProps<"/cam-on/[loai]">) {
  const l = THEO_DUONG_DAN[(await params).loai];
  if (!l) return {};
  const c = CAM_ON[l];
  return taoMetadata({ tieuDe: c.tieuDe, moTa: c.soi, duongDan: c.duongDan, mong: true });
}

export default async function TrangCamOn({ params }: PageProps<"/cam-on/[loai]">) {
  const l = THEO_DUONG_DAN[(await params).loai];
  if (!l) notFound();
  const c = CAM_ON[l];
  const { capCuu, ngayMai } = siteConfig.khanCap;

  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: c.tenVun, duongDan: c.duongDan },
      ]}
      nhan={c.nhan}
      tieuDe={c.tieuDe}
      soi={c.soi}
    >
      <KhoiGiay>
        <section className="s">
          <div className="wrap bai-doc">
            {c.doan.map((d) => (
              <p className="lede" key={d}>
                {d}
              </p>
            ))}
            {l === "hoi" ? (
              <>
                {/* Câu của bản mẫu, khối “Nếu bạn đang gặp nguy hiểm” cạnh lá thư. */}
                <p className="lede" role="note">
                  Nếu bạn đang gặp nguy hiểm, xin đừng chờ thư hồi âm. Bạn hãy gọi{" "}
                  <a href={`tel:${capCuu.tel}`}>
                    {capCuu.ten} {capCuu.so}
                  </a>
                  {ngayMai.hotlineDaXacNhan ? (
                    <>
                      {" "}
                      hoặc{" "}
                      <a href={`tel:${ngayMai.tel}`}>
                        {ngayMai.ten} {ngayMai.so.replace(/ /g, " ")}
                      </a>
                    </>
                  ) : null}
                  .
                </p>
                <p className="lede">
                  {CAM_ON_NGOI_LANG[0]}
                  <Link href="/ngoi-lang">{CAM_ON_NGOI_LANG[1]}</Link>
                  {CAM_ON_NGOI_LANG[2]}
                </p>
              </>
            ) : null}
            <p className="lede">
              {l === "sach" ? (
                <>
                  <Link href="/sach">Đọc thêm về cuốn sách</Link> ·{" "}
                </>
              ) : null}
              <Link href="/" prefetch={false}>
                Về trang chủ
              </Link>
            </p>
          </div>
        </section>
      </KhoiGiay>
    </TrangKhung>
  );
}

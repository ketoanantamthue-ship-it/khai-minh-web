import "server-only";
import { siteConfig } from "@/site.config";
import { baiHienThi, locLoai, type Bai, type Loai } from "./noi-dung";

/**
 * Kho bài theo môi trường đang build: production chỉ có bài `da-dang`, bản
 * xem trước có mọi bài (site.config.ts, `hienBanNhap`; docs/04, mục 5).
 * Các route dùng những hàm này, không gọi thẳng lib/noi-dung.ts.
 */

export function khoHienThi(): Bai[] {
  return baiHienThi(siteConfig.hienBanNhap);
}

/** Tham số cho `generateStaticParams` của route /<loại>/[slug]. */
export function thamSoTinh(loai: Loai): { slug: string }[] {
  return locLoai(khoHienThi(), loai).map((b) => ({ slug: b.slug }));
}

export function timBai<L extends Loai>(loai: L, slug: string): Bai<L> | undefined {
  return locLoai(khoHienThi(), loai).find((b) => b.slug === slug);
}

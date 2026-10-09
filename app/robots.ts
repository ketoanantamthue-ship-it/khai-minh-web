import type { MetadataRoute } from "next";
import { siteConfig, urlTuyetDoi } from "@/site.config";

/**
 * Cờ lập chỉ mục tắt: chặn mọi máy đọc.
 * Cờ bật: cho phép tất cả, kể cả các bot AI (docs/05, mục 1).
 * Sitemap được thêm ở phiên S3.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.choPhepLapChiMuc) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host: urlTuyetDoi("/"),
  };
}

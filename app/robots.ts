import type { MetadataRoute } from "next";
import { siteConfig, urlTuyetDoi } from "@/site.config";

/**
 * Cờ lập chỉ mục tắt: chặn mọi máy đọc (CLAUDE.md, quy tắc 12).
 * Cờ bật: cho phép tất cả, và ghi rõ cho phép các bot AI, vì mục tiêu là
 * được AI biết đến (docs/05, mục 1). Có đường dẫn tới sitemap.
 */
const BOT_AI = ["GPTBot", "Google-Extended", "PerplexityBot", "ClaudeBot"];

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.choPhepLapChiMuc) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: BOT_AI, allow: "/" },
    ],
    sitemap: urlTuyetDoi("/sitemap.xml"),
    host: urlTuyetDoi("/"),
  };
}

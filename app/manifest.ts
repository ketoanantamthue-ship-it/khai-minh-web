import type { MetadataRoute } from "next";
import { MO_TA_TRANG_CHU } from "@/lib/seo";
import { siteConfig } from "@/site.config";

/**
 * /manifest.webmanifest (docs/10, mục R4): tên, màu và biểu tượng khi khách
 * thêm web vào màn hình chính. Màu theo docs/03: nền sơn mài tối `--lac`.
 * Ảnh PNG vẽ từ app/icon.svg bằng `node scripts/ve-bieu-tuong.mjs`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Khai Minh – Người Khai Vấn",
    short_name: siteConfig.ten,
    description: MO_TA_TRANG_CHU,
    lang: "vi",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "minimal-ui",
    background_color: "#120E0B",
    theme_color: "#120E0B",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/bieu-tuong/192.png", type: "image/png", sizes: "192x192", purpose: "any" },
      { src: "/bieu-tuong/512.png", type: "image/png", sizes: "512x512", purpose: "any" },
      { src: "/bieu-tuong/maskable-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}

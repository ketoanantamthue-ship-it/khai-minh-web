import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { chuyenHuongChang } from "./lib/chuyen-huong";
import { DOOR_KEYS } from "./lib/doors";
import { kiemTraAnhTam } from "./lib/kiem-tra-build";
import { danhSachAnhTam, siteConfig } from "./site.config";

export default function nextConfig(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) {
    kiemTraAnhTam({ choPhepLapChiMuc: siteConfig.choPhepLapChiMuc, anhTam: danhSachAnhTam() });
  }

  return {
    reactStrictMode: true,
    poweredByHeader: false,
    // Ảnh bìa video YouTube (components/bai/VideoYouTube.tsx).
    images: { remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }] },
    // /chang/1 … /chang/9 chuyển hướng 301 về đường dẫn có chữ (docs/02, mục 1);
    // /cau-chuyen về trang tác giả.
    async redirects() {
      return [
        ...chuyenHuongChang(),
        // Trang tác giả duy nhất là /khai-minh, có mục “Câu chuyện của tôi” (docs/01, mục E3).
        { source: "/cau-chuyen", destination: "/khai-minh#cau-chuyen", statusCode: 301 },
        // Danh sách bài của mỗi cửa đã gộp vào cuối trang cửa (docs/10, mục R6).
        ...DOOR_KEYS.map((k) => ({ source: `/cua/${k}`, destination: `/${k}#bai-viet`, statusCode: 301 as const })),
      ];
    },
    async headers() {
      // Lớp chặn thứ hai, bên cạnh thẻ meta robots và robots.txt.
      if (siteConfig.choPhepLapChiMuc) return [];
      return [
        {
          source: "/:path*",
          headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
        },
      ];
    },
  };
}

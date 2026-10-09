import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { chuyenHuongChang } from "./lib/chuyen-huong";
import { kiemTraAnhTam } from "./lib/kiem-tra-build";
import { danhSachAnhTam, siteConfig } from "./site.config";

export default function nextConfig(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) {
    kiemTraAnhTam({ choPhepLapChiMuc: siteConfig.choPhepLapChiMuc, anhTam: danhSachAnhTam() });
  }

  return {
    reactStrictMode: true,
    poweredByHeader: false,
    // /chang/1 … /chang/9 chuyển hướng 301 về đường dẫn có chữ (docs/02, mục 1).
    async redirects() {
      return chuyenHuongChang();
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

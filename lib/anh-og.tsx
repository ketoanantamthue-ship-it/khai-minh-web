import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Ảnh chia sẻ (Open Graph) theo từng trang (docs/05, mục 1): nền sơn mài
 * tối, vệt vàng, tiêu đề trang bằng Noto Serif. Ảnh được dựng sẵn lúc build.
 *
 * Phông mặc định của next/og không có dấu tiếng Việt, nên nạp Noto Serif từ
 * gói @fontsource/noto-serif (giấy phép SIL Open Font License), hai tập con
 * latin và vietnamese. Ảnh không dùng chữ Hán (tập con không có).
 */

export const KICH_THUOC_OG = { width: 1200, height: 630 };
export const KIEU_OG = "image/png";

const THU_MUC_PHONG = join(process.cwd(), "node_modules", "@fontsource", "noto-serif", "files");

async function napPhong() {
  const [latin, viet] = await Promise.all(
    ["latin", "vietnamese"].map((tap) => readFile(join(THU_MUC_PHONG, `noto-serif-${tap}-500-normal.woff`))),
  );
  return [
    { name: "Noto Serif", data: latin!, weight: 500 as const, style: "normal" as const },
    { name: "Noto Serif", data: viet!, weight: 500 as const, style: "normal" as const },
  ];
}

/** Bỏ chữ Hán và khoảng trắng thừa khỏi chữ đưa vào ảnh. */
function locChu(chu: string): string {
  return chu
    .replace(/[㐀-鿿]/g, "")
    .replace(/\s*·\s*·\s*/g, " · ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function veAnhOg({ tieuDe, nhan, mau = "#C4973B" }: { tieuDe: string; nhan?: string; mau?: string }) {
  const chu = locChu(tieuDe);
  const co = chu.length > 70 ? 50 : chu.length > 44 ? 60 : 70;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: "#120E0B",
          backgroundImage:
            "radial-gradient(circle at 18% 28%, rgba(110,30,20,0.55), rgba(18,14,11,0) 55%), radial-gradient(circle at 88% 92%, rgba(196,151,59,0.18), rgba(18,14,11,0) 50%)",
          fontFamily: "Noto Serif",
          color: "#F4ECDD",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 24, letterSpacing: 6, color: "#D9B76A" }}>
          KHAI MINH · NGƯỜI KHAI VẤN
        </div>
        <div style={{ display: "flex", fontSize: co, lineHeight: 1.18, maxWidth: 1000 }}>{chu}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 120, height: 4, borderRadius: 2, backgroundColor: mau, marginBottom: 22 }} />
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, color: "#DCD0BA" }}>
            {locChu(nhan ?? "")}
          </div>
        </div>
      </div>
    ),
    { ...KICH_THUOC_OG, fonts: await napPhong() },
  );
}

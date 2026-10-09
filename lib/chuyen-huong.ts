import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/**
 * Chuyển hướng 301 từ /chang/1 … /chang/9 về đường dẫn có chữ (docs/01,
 * mục E2; docs/02, mục 1). Số và slug đọc thẳng từ content/chang/*.mdx,
 * nên đổi slug ở một chỗ là đủ.
 *
 * Tệp này được next.config.ts gọi lúc dựng, nên không dùng "server-only"
 * và chỉ đọc hai trường `so`, `slug`. Schema đầy đủ nằm ở lib/chang.ts.
 */

export type ChuyenHuong = { source: string; destination: string; statusCode: 301 };

export function chuyenHuongChang(thuMuc = join(process.cwd(), "content", "chang")): ChuyenHuong[] {
  return readdirSync(thuMuc)
    .filter((t) => t.endsWith(".mdx"))
    .sort()
    .map((t) => {
      const { data } = matter(readFileSync(join(thuMuc, t), "utf8"));
      const so = Number(data.so);
      const slug = String(data.slug ?? "");
      if (!Number.isInteger(so) || so < 1 || so > 9 || !/^[a-z0-9-]+$/.test(slug)) {
        throw new Error(`content/chang/${t}: thiếu hoặc sai “so” / “slug”, không đặt được chuyển hướng.`);
      }
      return { source: `/chang/${so}`, destination: `/chang/${slug}`, statusCode: 301 as const };
    });
}

#!/usr/bin/env node
/**
 * npm run kiem:bai
 *
 * Báo tình trạng kho bài cho đội viết (docs/09): mỗi bài ở trạng thái nào,
 * còn thiếu gì trước khi đăng, và liên kết `lien_quan` nào chưa trỏ tới bài
 * có thật. Kho sai schema thì dừng và in lỗi, giống hệt lúc build.
 *
 * Tuỳ chọn: --sau-build  kiểm bản build production (HIEN_BAN_NHAP=false):
 * không bài nào chưa `da-dang` được dựng thành trang, và sitemap chỉ có bài
 * `da-dang` (docs/08, “Trạng thái bài”).
 *
 * Chạy thẳng bằng Node (Node 22.18 trở lên tự đọc được TypeScript).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { docKho, timThamChieu } from "../lib/noi-dung.ts";

const kho = docKho();

if (process.argv.includes("--sau-build")) {
  const loi: string[] = [];
  const goc = join(process.cwd(), ".next", "server", "app");
  if (!existsSync(goc)) {
    console.error("Chưa có bản build. Hãy chạy HIEN_BAN_NHAP=false npm run build trước.");
    process.exit(1);
  }
  const sitemap = existsSync(join(goc, "sitemap.xml.body")) ? readFileSync(join(goc, "sitemap.xml.body"), "utf8") : "";
  for (const b of kho) {
    const coTrang = existsSync(join(goc, `${b.duongDan.slice(1)}.html`));
    const coSitemap = sitemap.includes(`${b.duongDan}<`);
    if (b.trangThai !== "da-dang" && coTrang) loi.push(`${b.tep} (${b.trangThai}) vẫn được dựng thành trang.`);
    if (b.trangThai !== "da-dang" && coSitemap) loi.push(`${b.tep} (${b.trangThai}) có trong sitemap.`);
    if (b.trangThai === "da-dang" && !coTrang) loi.push(`${b.tep} đã đăng mà không có trang.`);
  }
  if (!sitemap) loi.push("Không tìm thấy sitemap trong bản build.");
  if (loi.length > 0) {
    console.error(`✗ Bản build production chưa đúng:\n  - ${loi.join("\n  - ")}`);
    process.exit(1);
  }
  const nhap = kho.filter((b) => b.trangThai !== "da-dang").length;
  console.log(`✓ Bản build production chỉ có bài đã đăng (${kho.length - nhap} bài); ${nhap} bài chưa đăng không có trang.`);
  process.exit(0);
}

let soThieu = 0;
for (const b of kho) {
  const gay = b.fm.lien_quan.filter((r) => !timThamChieu(kho, r));
  console.log(`\n${b.trangThai === "da-dang" ? "✓" : "·"} ${b.tep}  [${b.trangThai}]`);
  console.log(`  ${b.tieuDe}`);
  console.log(`  Trang: ${b.duongDan}`);
  if (b.thieu.length > 0) {
    soThieu++;
    console.log(`  Còn thiếu trước khi đăng:\n    - ${b.thieu.join("\n    - ")}`);
  }
  if (gay.length > 0) console.log(`  Liên kết chưa có bài: ${gay.join(", ")}`);
}
console.log(`\nKho có ${kho.length} bài; ${kho.filter((b) => b.trangThai === "da-dang").length} bài đã đăng; ${soThieu} bài còn thiếu phần.`);

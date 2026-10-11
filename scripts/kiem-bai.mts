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
 * `da-dang` (docs/08, “Trạng thái bài”). Kiểm thêm phần bản thật của phiên
 * S4b (docs/10, mục R7 và “Thêm sau S4”): trang khung và trang chặng chưa đủ
 * năm tầng không còn ô “Đang soạn” và không vào sitemap; khi chưa có nơi nhận
 * thư (docs/07, mục A18), không trang nào còn lá thư, ô nhận thư hay lối dẫn
 * tới chúng, và /gui-cau-hoi không vào sitemap.
 *
 * Chạy thẳng bằng Node (Node 22.18 trở lên tự đọc được TypeScript).
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { docKho, timThamChieu } from "../lib/noi-dung.ts";
import { TRANG_CHUA_DU_CHU } from "../lib/trang-khung.ts";
import { siteConfig } from "../site.config.ts";

/** Mọi tệp .html trong một thư mục, kể cả thư mục con. */
function tepHtml(thuMuc: string): string[] {
  return readdirSync(thuMuc, { withFileTypes: true }).flatMap((m) =>
    m.isDirectory() ? tepHtml(join(thuMuc, m.name)) : m.name.endsWith(".html") ? [join(thuMuc, m.name)] : [],
  );
}

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

  // Bản thật: trang khung và trang chặng chưa đủ năm tầng (docs/10, mục R7).
  const thuMucChang = join(process.cwd(), "content", "chang");
  const changThieu = readdirSync(thuMucChang)
    .filter((t) => t.endsWith(".mdx"))
    .map((t) => matter(readFileSync(join(thuMucChang, t), "utf8")).data as { slug: string; trang?: unknown })
    .filter((c) => !c.trang)
    .map((c) => `/chang/${c.slug}`);
  for (const p of [...TRANG_CHUA_DU_CHU, ...changThieu]) {
    const tep = join(goc, `${p.slice(1)}.html`);
    if (!existsSync(tep)) {
      loi.push(`${p}: không có trang trong bản build.`);
      continue;
    }
    const html = readFileSync(tep, "utf8");
    if (/Đang soạn|Đang chờ luật sư/.test(html)) loi.push(`${p}: bản thật còn ô “Đang soạn”.`);
    if (sitemap.includes(`${p}<`)) loi.push(`${p}: trang còn khung mà vẫn có trong sitemap.`);
  }
  // Chưa có nơi nhận thư: không còn lá thư, ô nhận thư hay lối dẫn tới chúng (docs/07, mục A18).
  const LOI_THU = [
    ['href="/gui-cau-hoi', "liên kết tới /gui-cau-hoi"],
    ['href="#gui-cau-hoi"', "liên kết tới #gui-cau-hoi"],
    ['id="gui-cau-hoi"', "phần lá thư"],
    ['id="askForm"', "lá thư"],
    ['class="signup"', "ô nhận thư"],
    ['href="#thu"', "lời mời nhận thư"],
    ['href="/tri#thu"', "lời mời nhận thư"],
    ["hồi âm trong ngày", "lời hứa hồi âm"],
    ["hồi âm mọi lời nhắn", "lời hứa hồi âm"],
    ["trả lời mọi lời nhắn", "lời hứa hồi âm"],
  ] as const;
  let soTrangThu = 0;
  if (siteConfig.noiNhanThu === null) {
    for (const tep of tepHtml(goc)) {
      soTrangThu++;
      const html = readFileSync(tep, "utf8");
      const trang = `/${tep.slice(goc.length + 1).replace(/\.html$/, "").replace(/^index$/, "")}`;
      for (const [chuoi, ten] of LOI_THU) if (html.includes(chuoi)) loi.push(`${trang}: bản thật còn ${ten}.`);
    }
    if (sitemap.includes("/gui-cau-hoi<")) loi.push("/gui-cau-hoi: chưa có nơi nhận thư mà vẫn có trong sitemap.");
  }
  if (loi.length > 0) {
    console.error(`✗ Bản build production chưa đúng:\n  - ${loi.join("\n  - ")}`);
    process.exit(1);
  }
  const nhap = kho.filter((b) => b.trangThai !== "da-dang").length;
  console.log(`✓ Bản build production chỉ có bài đã đăng (${kho.length - nhap} bài); ${nhap} bài chưa đăng không có trang.`);
  console.log(
    `✓ ${TRANG_CHUA_DU_CHU.size} trang khung và ${changThieu.length} trang chặng chưa đủ năm tầng không còn ô “Đang soạn”, không vào sitemap.`,
  );
  console.log(
    siteConfig.noiNhanThu === null
      ? `✓ Chưa có nơi nhận thư: ${soTrangThu} trang HTML không còn lá thư, ô nhận thư hay lối dẫn tới chúng.`
      : "· Đã có nơi nhận thư: bỏ qua bước kiểm lá thư.",
  );
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

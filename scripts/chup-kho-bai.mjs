#!/usr/bin/env node
/**
 * Chụp các trang của kho bài (phiên S3) ở ba khổ 390×844, 768×1024, 1366×768
 * (CLAUDE.md, “Cách làm một phiên”). Bản mẫu chưa có trang bài, nên chỉ chụp
 * phía web, phần <main> (bỏ chân trang dùng chung), ảnh JPG cho nhẹ.
 *
 * Cách chạy: npm run build && npm run start -- --port 3100 (ở cửa sổ khác), rồi
 *   node scripts/chup-kho-bai.mjs [tiền tố, mặc định "s3"] [đường dẫn…]
 * Có đường dẫn thì chụp đúng các trang ấy (tên ảnh lấy từ đường dẫn), ví dụ
 *   node scripts/chup-kho-bai.mjs s4 /khai-minh /hien-chuong
 * Ảnh lưu ở tests/__screens__/<tiền tố>-<khổ>-<trang>.jpg.
 */
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const RA = new URL("../tests/__screens__/", import.meta.url).pathname;
const URL_WEB = (process.env.URL_THU ?? "http://127.0.0.1:3100").replace(/\/$/, "");
const TIEN_TO = process.argv[2] ?? "s3";
const KHO = [
  [390, 844],
  [768, 1024],
  [1366, 768],
];
const DUONG_DAN = process.argv.slice(3);
const TRANG_MAC_DINH = [
  ["hoi-q001", "/hoi/bon-muoi-tuoi-du-day-sao-long-chua-yen"],
  ["hoi", "/hoi"],
  ["cua-tam", "/tam"],
  ["chang-5-hoi", "/chang/tuoi-giua-doi/hoi"],
];
const TRANG =
  DUONG_DAN.length > 0 ? DUONG_DAN.map((d) => [d.replace(/^\//, "").replace(/\//g, "-") || "trang-chu", d]) : TRANG_MAC_DINH;
const chromiumCoSan = "/opt/pw-browsers/chromium";

mkdirSync(RA, { recursive: true });
const trinhDuyet = await chromium.launch(existsSync(chromiumCoSan) ? { executablePath: chromiumCoSan } : {});
for (const [w, h] of KHO) {
  for (const [ten, duong] of TRANG) {
    const ctx = await trinhDuyet.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(URL_WEB + duong, { waitUntil: "load" });
    await page.locator("main").screenshot({ path: `${RA}${TIEN_TO}-${w}-${ten}.jpg`, type: "jpeg", quality: 70 });
    await ctx.close();
  }
}
await trinhDuyet.close();
console.log(`Đã chụp ${KHO.length * TRANG.length} ảnh vào tests/__screens__/.`);

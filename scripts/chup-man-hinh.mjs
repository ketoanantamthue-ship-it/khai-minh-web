#!/usr/bin/env node
/**
 * Chụp đầu trang và chân trang của web và của bản mẫu ở ba khổ
 * 390×844, 768×1024, 1366×768 để so hình (CLAUDE.md, "Cách làm một phiên").
 *
 * Cách chạy: npm run build && npm run start -- --port 3100 (ở cửa sổ khác), rồi
 *   node scripts/chup-man-hinh.mjs [tiền tố, mặc định "s0"]
 * Ảnh lưu ở tests/__screens__/.
 */
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const ROOT = new URL("..", import.meta.url).pathname;
const RA = `${ROOT}tests/__screens__`;
const URL_WEB = process.env.URL_THU ?? "http://127.0.0.1:3100/";
const TIEN_TO = process.argv[2] ?? "s0";
const KHO = [
  [390, 844],
  [768, 1024],
  [1366, 768],
];
const chromiumCoSan = "/opt/pw-browsers/chromium";

mkdirSync(RA, { recursive: true });
const trinhDuyet = await chromium.launch(existsSync(chromiumCoSan) ? { executablePath: chromiumCoSan } : {});

async function chup(url, ten, w, h) {
  const trang = await trinhDuyet.newPage({ viewport: { width: w, height: h } });
  await trang.emulateMedia({ reducedMotion: "reduce" });
  await trang.goto(url, { waitUntil: "load", timeout: 60_000 });
  await trang.waitForTimeout(800);
  // Bản mẫu trang chủ có cánh cổng che màn hình: ẩn đi để chụp đầu trang.
  await trang.addStyleTag({ content: "#gate{display:none!important}" });
  await trang.evaluate(() => document.fonts.ready);
  await trang.screenshot({ path: `${RA}/${ten}-${w}-dau-trang.png` });
  await trang.locator("footer.ft").screenshot({ path: `${RA}/${ten}-${w}-chan-trang.png` });
  await trang.close();
}

for (const [w, h] of KHO) {
  await chup(URL_WEB, `${TIEN_TO}-web`, w, h);
  await chup(`file://${ROOT}prototypes/index.html`, `${TIEN_TO}-ban-mau-index`, w, h);
  await chup(`file://${ROOT}prototypes/cua-tam.html`, `${TIEN_TO}-ban-mau-cua-tam`, w, h);
}
await trinhDuyet.close();
console.log(`Đã lưu ảnh vào ${RA}`);

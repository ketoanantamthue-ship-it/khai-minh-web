#!/usr/bin/env node
/**
 * So hình trang chủ với bản mẫu (CLAUDE.md, "Cách làm một phiên"; docs/08, mục 2).
 *
 * Chụp cánh cổng và từng phần của trang chủ, của web và của
 * prototypes/index.html, ở ba khổ 390×844, 768×1024, 1366×768.
 * Chế độ giảm chuyển động để hai bên đứng yên giống nhau.
 *
 * Cách chạy: npm run build && npm run start -- --port 3100 (ở cửa sổ khác), rồi
 *   node scripts/chup-trang-chu.mjs [tiền tố, mặc định "s1"]
 * Ảnh lưu ở tests/__screens__/. Ảnh trong kho là ảnh ghép JPG (trái: bản mẫu,
 * phải: web) cho nhẹ, tên s1-so-sanh-<khổ>-<phần>.jpg.
 */
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const ROOT = new URL("..", import.meta.url).pathname;
const RA = `${ROOT}tests/__screens__`;
const URL_WEB = process.env.URL_THU ?? "http://127.0.0.1:3100/";
const URL_MAU = `file://${ROOT}prototypes/index.html`;
const TIEN_TO = process.argv[2] ?? "s1";
const KHO = [
  [390, 844],
  [768, 1024],
  [1366, 768],
];
const PHAN = [
  ["1-chin-chang", "#openSec"],
  ["2-tieu-vu-tru", "#micro"],
  ["3-ba-cua", "#ba-cua"],
  ["4-binh-minh", "#binh-minh"],
  ["5-nguoi-giu", "#nguoi-giu"],
  ["6-dong-hanh", "#dong-hanh"],
  ["7-loi-hua", "#loi-hua"],
  ["8-khoang-lang", "#khoang-lang"],
  ["9-gui-cau-hoi", "#gui-cau-hoi"],
];
const chromiumCoSan = "/opt/pw-browsers/chromium";

mkdirSync(RA, { recursive: true });
const trinhDuyet = await chromium.launch(existsSync(chromiumCoSan) ? { executablePath: chromiumCoSan } : {});

async function moTrang(url, w, h, quaCong) {
  const ctx = await trinhDuyet.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  if (quaCong) {
    // Web nhớ cổng ở localStorage, bản mẫu ở sessionStorage.
    await ctx.addInitScript(() => {
      try {
        localStorage.setItem("km-gate", "1");
        sessionStorage.setItem("km-gate", "1");
      } catch {}
    });
  }
  const trang = await ctx.newPage();
  await trang.goto(url, { waitUntil: "load", timeout: 60_000 });
  await trang.evaluate(() => document.fonts.ready);
  await trang.waitForTimeout(600);
  return trang;
}

async function chup(url, ten, w, h) {
  // Cánh cổng: chụp khi lời chào đã hiện đủ.
  const cong = await moTrang(url, w, h, false);
  await cong.waitForTimeout(800);
  await cong.screenshot({ path: `${RA}/${ten}-${w}-0-cong.png` });
  await cong.context().close();

  const trang = await moTrang(url, w, h, true);
  // Thanh rút gọn, vòng số phần và tấm trượt (đang đóng) là lớp cố định:
  // ẩn đi để chúng không lọt vào ảnh chụp từng phần.
  await trang.addStyleTag({ content: ".minibar,.chap-ring,#panel{visibility:hidden!important}" });
  for (const [tenPhan, chon] of PHAN) {
    const el = trang.locator(chon);
    await el.scrollIntoViewIfNeeded();
    await trang.waitForTimeout(300);
    await el.screenshot({ path: `${RA}/${ten}-${w}-${tenPhan}.png` });
  }
  await trang.context().close();
}

for (const [w, h] of KHO) {
  await chup(URL_WEB, `${TIEN_TO}-web`, w, h);
  await chup(URL_MAU, `${TIEN_TO}-ban-mau`, w, h);
}
await trinhDuyet.close();
console.log(`Đã lưu ảnh vào ${RA}`);

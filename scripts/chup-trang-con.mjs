#!/usr/bin/env node
/**
 * So hình trang cửa và trang chặng với bản mẫu (CLAUDE.md, "Cách làm một phiên";
 * docs/08, mục 2).
 *
 * Chụp trọn trang của web và của prototypes/cua-*.html, chang-5.html ở ba khổ
 * 390×844, 768×1024, 1366×768, rồi ghép thành một ảnh JPG (trái: bản mẫu,
 * phải: web, thu nhỏ một nửa cho nhẹ). Trang /muc-luc được đặt cạnh lớp phủ
 * Mục lục của bản mẫu trang chủ; trang chặng 1 chỉ chụp phía web (bản mẫu
 * không có), để xem khuôn khi chặng còn ô CẦN.
 * Chế độ giảm chuyển động để hai bên đứng yên giống nhau.
 *
 * Cách chạy: npm run build && npm run start -- --port 3100 (ở cửa sổ khác), rồi
 *   node scripts/chup-trang-con.mjs [tiền tố, mặc định "s2"]
 * Ảnh lưu ở tests/__screens__/<tiền tố>-so-sanh-<khổ>-<trang>.jpg.
 */
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { chromium } from "@playwright/test";

const ROOT = new URL("..", import.meta.url).pathname;
const RA = `${ROOT}tests/__screens__`;
const TAM = `${ROOT}.chup-tam`;
const URL_WEB = (process.env.URL_THU ?? "http://127.0.0.1:3100").replace(/\/$/, "");
const TIEN_TO = process.argv[2] ?? "s2";
const KHO = [
  [390, 844],
  [768, 1024],
  [1366, 768],
];
const TRANG = [
  ["cua-tam", "/tam", "cua-tam.html"],
  ["cua-tri", "/tri", "cua-tri.html"],
  ["cua-than", "/than", "cua-than.html"],
  ["chang-5", "/chang/tuoi-giua-doi", "chang-5.html"],
  ["chang-1", "/chang/truoc-khi-den", null],
  ["muc-luc", "/muc-luc", "index.html#muc-luc"],
];
const chromiumCoSan = "/opt/pw-browsers/chromium";

mkdirSync(RA, { recursive: true });
mkdirSync(TAM, { recursive: true });
const trinhDuyet = await chromium.launch(existsSync(chromiumCoSan) ? { executablePath: chromiumCoSan } : {});

async function chup(url, tep, w, h, moMucLuc) {
  const ctx = await trinhDuyet.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem("km-gate", "1");
      sessionStorage.setItem("km-gate", "1");
    } catch {}
  });
  const trang = await ctx.newPage();
  await trang.goto(url, { waitUntil: "load", timeout: 60_000 });
  await trang.evaluate(() => document.fonts.ready);
  if (moMucLuc) {
    // Bản mẫu trang chủ: mở lớp phủ Mục lục, mở cả bốn lớp, chụp phần cuộn bên trong.
    await trang.click("#openIndex");
    await trang.waitForTimeout(700);
    await trang.evaluate(() => {
      document.querySelectorAll("#index details").forEach((d) => (d.open = true));
      const ix = document.getElementById("index");
      Object.assign(ix.style, { position: "static", height: "auto", overflow: "visible" });
      document.querySelectorAll("body > :not(#index)").forEach((e) => (e.style.display = "none"));
    });
  }
  await trang.waitForTimeout(500);
  await trang.screenshot({ path: tep, fullPage: true });
  await ctx.close();
}

async function ghep(trai, phai, w, ra) {
  const ctx = await trinhDuyet.newContext({ viewport: { width: w, height: 400 } });
  const trang = await ctx.newPage();
  const anh = (p) => (p ? `<img src="data:image/png;base64,${readFileSync(p).toString("base64")}">` : "<div></div>");
  await trang.setContent(
    `<style>body{margin:0;display:grid;grid-template-columns:1fr 1fr;gap:6px;background:#888;align-items:start}img{width:100%;display:block}</style>${anh(trai)}${anh(phai)}`,
  );
  await trang.waitForTimeout(200);
  await trang.screenshot({ path: ra, fullPage: true, type: "jpeg", quality: 62 });
  await ctx.close();
}

for (const [w, h] of KHO) {
  for (const [ten, duong, mau] of TRANG) {
    const tepWeb = `${TAM}/${ten}-${w}-web.png`;
    await chup(`${URL_WEB}${duong}`, tepWeb, w, h, false);
    let tepMau = null;
    if (mau) {
      tepMau = `${TAM}/${ten}-${w}-mau.png`;
      const [tep, neo] = mau.split("#");
      await chup(`file://${ROOT}prototypes/${tep}`, tepMau, w, h, neo === "muc-luc");
    }
    await ghep(tepMau, tepWeb, w, `${RA}/${TIEN_TO}-so-sanh-${w}-${ten}.jpg`);
    console.log(`${ten} ${w}`);
  }
}
await trinhDuyet.close();
rmSync(TAM, { recursive: true, force: true });
console.log(`Đã lưu ảnh vào ${RA}`);

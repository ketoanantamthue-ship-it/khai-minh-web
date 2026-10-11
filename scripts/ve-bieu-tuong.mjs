/**
 * Vẽ lại các biểu tượng PNG và favicon.ico từ dấu “vết mài” (docs/10, mục R4).
 *
 * Nguồn: app/icon.svg. Lệnh này sinh:
 * - app/apple-icon.png (180×180, nền kín, không trong suốt, cho iPhone);
 * - app/favicon.ico (16, 32 và 48 px, PNG đặt trong tệp ICO);
 * - public/bieu-tuong/192.png, 512.png (biểu tượng ứng dụng trong manifest);
 * - public/bieu-tuong/maskable-512.png (có lề an toàn cho Android).
 *
 * Chạy: node scripts/ve-bieu-tuong.mjs (cần Chromium của Playwright).
 * Đổi dấu thì sửa app/icon.svg rồi chạy lại lệnh này.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const goc = process.cwd();
const svg = readFileSync(join(goc, "app", "icon.svg"), "utf8").replace(/<!--[\s\S]*?-->/g, "");
const NEN = "#120E0B";
const chromiumCoSan = "/opt/pw-browsers/chromium";

const trinhDuyet = await chromium.launch(existsSync(chromiumCoSan) ? { executablePath: chromiumCoSan } : {});
const trang = await trinhDuyet.newPage();

/** Chụp dấu ở cỡ `co` px. `le`: lề quanh dấu (tỉ lệ cạnh); `nenKin`: tô kín nền tối. */
async function chup(co, { le = 0, nenKin = false } = {}) {
  await trang.setViewportSize({ width: co, height: co });
  const trong = co * (1 - 2 * le);
  await trang.setContent(
    `<html><body style="margin:0;width:${co}px;height:${co}px;display:grid;place-items:center;background:${nenKin ? NEN : "transparent"}">` +
      `<div style="width:${trong}px;height:${trong}px">${svg.replace("<svg ", '<svg style="width:100%;height:100%" ')}</div></body></html>`,
  );
  return trang.screenshot({ omitBackground: !nenKin, type: "png" });
}

/** Gói các ảnh PNG vào một tệp ICO (ICO cho phép chứa PNG nguyên vẹn). */
function goiIco(anh) {
  const dau = Buffer.alloc(6 + 16 * anh.length);
  dau.writeUInt16LE(0, 0);
  dau.writeUInt16LE(1, 2);
  dau.writeUInt16LE(anh.length, 4);
  let viTri = dau.length;
  anh.forEach(({ co, png }, i) => {
    const o = 6 + 16 * i;
    dau.writeUInt8(co >= 256 ? 0 : co, o);
    dau.writeUInt8(co >= 256 ? 0 : co, o + 1);
    dau.writeUInt16LE(1, o + 4);
    dau.writeUInt16LE(32, o + 6);
    dau.writeUInt32LE(png.length, o + 8);
    dau.writeUInt32LE(viTri, o + 12);
    viTri += png.length;
  });
  return Buffer.concat([dau, ...anh.map((a) => a.png)]);
}

mkdirSync(join(goc, "public", "bieu-tuong"), { recursive: true });
writeFileSync(join(goc, "app", "apple-icon.png"), await chup(180, { le: 0.08, nenKin: true }));
writeFileSync(join(goc, "public", "bieu-tuong", "192.png"), await chup(192));
writeFileSync(join(goc, "public", "bieu-tuong", "512.png"), await chup(512));
writeFileSync(join(goc, "public", "bieu-tuong", "maskable-512.png"), await chup(512, { le: 0.14, nenKin: true }));
const ico = [];
for (const co of [16, 32, 48]) ico.push({ co, png: await chup(co) });
writeFileSync(join(goc, "app", "favicon.ico"), goiIco(ico));

await trinhDuyet.close();
console.log("Đã vẽ: app/apple-icon.png, app/favicon.ico, public/bieu-tuong/{192,512,maskable-512}.png");

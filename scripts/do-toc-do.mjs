/**
 * Đo tốc độ một bản đang chạy (docs/10, mục R11–R13).
 *
 * Cách dùng: dựng và chạy bản production ở cổng 3100 (hoặc đặt URL_THU),
 * rồi chạy `node scripts/do-toc-do.mjs`. Lệnh in ra:
 * - JS đã nén mà mỗi trang tải (R12, ngân sách 160 KB, docs/05 mục 2);
 * - CLS của trang chủ lần đầu và khi đã qua cổng (R11, ngưỡng 0,1);
 * - LCP trên điện thoại giả lập 4G chậm, CPU chậm 4 lần (R13, ngưỡng 2,5 giây).
 *
 * Mạng “4G chậm” dùng số của Lighthouse cho điện thoại: độ trễ 150 ms, tải
 * xuống 1,6 Mbps, tải lên 750 Kbps (giả lập bằng Chrome DevTools Protocol).
 * Mỗi phép đo LCP và CLS chạy ba lần và lấy số giữa.
 */
import { existsSync } from "node:fs";
import { chromium } from "@playwright/test";

const GOC = (process.env.URL_THU ?? "http://127.0.0.1:3100").replace(/\/+$/, "");
const LAN = Number(process.env.SO_LAN ?? 3);
const chromiumCoSan = "/opt/pw-browsers/chromium";

const TRANG_JS = ["/", "/chang/tuoi-giua-doi", "/tam", "/khai-minh", "/hoi", "/muc-luc", "/gui-cau-hoi"];

const MANG_CHAM = { offline: false, latency: Number(process.env.DO_TRE ?? 150), downloadThroughput: (1638.4 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 };

const trinhDuyet = await chromium.launch(existsSync(chromiumCoSan) ? { executablePath: chromiumCoSan } : {});

/** Một trang mới ở khổ điện thoại, có thể giả lập mạng chậm và CPU chậm. */
async function moTrang({ cham = false, daQuaCong = false } = {}) {
  const ctx = await trinhDuyet.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "vi-VN",
  });
  if (daQuaCong) await ctx.addInitScript(() => localStorage.setItem("km-gate", "1"));
  await ctx.addInitScript(() => {
    window.__cls = 0;
    window.__lcp = 0;
    window.__dichChuyen = [];
    new PerformanceObserver((ds) => {
      for (const e of ds.getEntries()) {
        if (e.hadRecentInput) continue;
        window.__cls += e.value;
        window.__dichChuyen.push({
          gt: Number(e.value.toFixed(4)),
          luc: Math.round(e.startTime),
          nguon: (e.sources ?? []).map((s) => {
            const n = s.node;
            if (!n || !n.nodeName) return "?";
            const el = n.nodeType === 1 ? n : n.parentElement;
            return el ? `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${el.className && typeof el.className === "string" ? `.${el.className.trim().split(/\s+/).join(".")}` : ""}` : "#text";
          }),
        });
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((ds) => {
      const e = ds.getEntries().at(-1);
      if (e) {
        window.__lcp = e.startTime;
        const el = e.element;
        window.__lcpEl = el ? `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? `.${el.className.trim().split(/\s+/).join(".")}` : ""}${e.url ? ` ${e.url.replace(location.origin, "")}` : ""}` : "?";
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  if (cham) {
    await cdp.send("Network.emulateNetworkConditions", MANG_CHAM);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  }
  return { ctx, page, cdp };
}

/** JS đã nén (byte truyền qua mạng) mà một trang tải, tới khi mạng lặng. */
async function doJs(duongDan) {
  const { ctx, page, cdp } = await moTrang({ daQuaCong: true });
  const loai = new Map();
  let tong = 0;
  const tep = [];
  cdp.on("Network.responseReceived", (e) => loai.set(e.requestId, [e.type, e.response.url]));
  cdp.on("Network.loadingFinished", (e) => {
    const [kieu, url] = loai.get(e.requestId) ?? [];
    if (kieu === "Script") {
      tong += e.encodedDataLength;
      tep.push(`${(e.encodedDataLength / 1024).toFixed(1).padStart(6)} KB ${url.replace(GOC, "")}`);
    }
  });
  await page.goto(GOC + duongDan, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await ctx.close();
  if (process.env.CHI_TIET) console.log(tep.map((t) => `      ${t}`).join("\n"));
  return tong;
}

/** LCP, CLS và phần tử LCP của một lần tải trang chủ. */
async function doTrangChu({ daQuaCong }) {
  const { ctx, page } = await moTrang({ cham: true, daQuaCong });
  await page.goto(GOC + "/", { waitUntil: "load", timeout: 120_000 });
  await page.waitForTimeout(4000);
  // LCP chốt khi khách chạm trang; CLS tính hết tới lúc này.
  const kq = await page.evaluate(() => ({ lcp: window.__lcp, el: window.__lcpEl, cls: window.__cls, dc: window.__dichChuyen }));
  await ctx.close();
  return kq;
}

const giua = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];

console.log(`Đo ${GOC}\n`);
console.log("JS đã nén (R12, ngân sách 160 KB):");
for (const p of process.env.BO_JS ? [] : TRANG_JS) {
  const b = await doJs(p);
  console.log(`  ${p.padEnd(24)} ${(b / 1024).toFixed(1)} KB`);
}

for (const daQuaCong of [false, true]) {
  const ds = [];
  for (let i = 0; i < LAN; i++) ds.push(await doTrangChu({ daQuaCong }));
  const lcp = giua(ds.map((d) => d.lcp));
  const cls = giua(ds.map((d) => d.cls));
  console.log(`\nTrang chủ, ${daQuaCong ? "đã qua cổng" : "lần đầu (có cổng)"} — 4G chậm, CPU chậm 4 lần, ${LAN} lần:`);
  console.log(`  LCP: ${(lcp / 1000).toFixed(2)} giây (các lần: ${ds.map((d) => (d.lcp / 1000).toFixed(2)).join(", ")})`);
  console.log(`  Phần tử LCP: ${ds.find((d) => d.lcp === lcp)?.el}`);
  console.log(`  CLS: ${cls.toFixed(3)} (các lần: ${ds.map((d) => d.cls.toFixed(3)).join(", ")})`);
  const dc = ds.find((d) => d.cls === cls)?.dc ?? [];
  if (process.env.CHI_TIET) for (const d of dc) console.log(`    ${d.gt} @${d.luc}ms ${d.nguon.join(", ")}`);
}

await trinhDuyet.close();

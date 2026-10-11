#!/usr/bin/env node
/**
 * npm run liet-ke:can
 *
 * Liệt kê mọi ô CẦN đang có trên web: chỗ chưa có chữ hay chất liệu thật,
 * đánh dấu bằng `data-can` (CLAUDE.md, quy tắc 2). Đọc từng trang trong
 * sitemap (cộng trang 404) của một bản đang chạy, rồi in một bảng Markdown
 * theo mã việc ở docs/07. Phần chân trang lặp lại trên mọi trang nên được
 * liệt kê một lần riêng.
 *
 * Cách chạy: npm run build && npm run start -- --port 3100 (ở cửa sổ khác), rồi
 *   npm run liet-ke:can
 */
const URL_WEB = (process.env.URL_THU ?? "http://127.0.0.1:3100").replace(/\/$/, "");

const xml = await (await fetch(`${URL_WEB}/sitemap.xml`)).text();
const trang = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
trang.push("/trang-nay-khong-co");

/** Mã việc ở đầu chuỗi data-can: "D5: số Ngày Mai…" → "D5". */
const maViec = (s) => (s.match(/^[A-F]\d{1,2}/)?.[0] ?? s).trim();

function giaiMa(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;| /g, " ");
}

/** Mỗi phần tử có data-can: mã, và chữ mô tả (aria-label, hoặc chữ bên trong). */
function timO(html) {
  const ds = [];
  for (const m of html.matchAll(/<(\w+)((?:\s[^>]*?)?\sdata-can="([^"]*)"[^>]*)>/g)) {
    const [, the, thuocTinh, can] = m;
    const nhan = thuocTinh.match(/aria-label="([^"]*)"/)?.[1];
    const sau = html.slice(m.index + m[0].length, m.index + m[0].length + 600);
    const trong = sau.split(new RegExp(`</${the}>`))[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    ds.push({ ma: maViec(giaiMa(can)), mo: giaiMa(nhan ?? trong).slice(0, 90) || "(không có chữ)" });
  }
  return ds;
}

const theoTrang = [];
let chanTrang = [];
for (const duong of trang) {
  const html = await (await fetch(URL_WEB + duong)).text();
  const main = html.match(/<main[\s\S]*<\/main>/)?.[0] ?? "";
  const footer = html.match(/<footer[\s\S]*<\/footer>/)?.[0] ?? "";
  if (chanTrang.length === 0) chanTrang = timO(footer);
  const o = timO(main);
  if (o.length) theoTrang.push({ duong, o });
}

const dong = (o) => {
  const gom = new Map();
  for (const x of o) {
    const k = `${x.ma}|${x.mo}`;
    gom.set(k, (gom.get(k) ?? 0) + 1);
  }
  return [...gom].map(([k, n]) => {
    const [ma, mo] = k.split("|");
    return `| ${ma} | ${mo}${n > 1 ? ` (×${n})` : ""} |`;
  });
};

const ra = ["| Trang | Mã | Chỗ còn thiếu |", "| --- | --- | --- |"];
for (const { duong, o } of theoTrang) {
  for (const d of dong(o)) ra.push(`| \`${duong}\` ${d}`);
}
ra.push("", "**Chân trang (lặp lại trên mọi trang):**", "", "| Mã | Chỗ còn thiếu |", "| --- | --- |", ...dong(chanTrang));

const tong = theoTrang.reduce((n, t) => n + t.o.length, 0);
const ma = [...new Set([...theoTrang.flatMap((t) => t.o.map((x) => x.ma)), ...chanTrang.map((x) => x.ma)])].sort();
console.log(ra.join("\n"));
console.log(`\n${tong} ô CẦN trên ${theoTrang.length} trang, cộng ${chanTrang.length} ô ở chân trang. Mã việc: ${ma.join(", ")}.`);

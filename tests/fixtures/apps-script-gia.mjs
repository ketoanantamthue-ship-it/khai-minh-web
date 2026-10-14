/**
 * Apps Script giả cho bài kiểm thử lá thư (tests/thu.spec.ts).
 *
 * Bắt chước Apps Script thật: nhận POST ở /exec, trả 302 sang một địa chỉ
 * khác, nơi lời đáp JSON được đọc bằng GET. Giữ lại các gói đã nhận để bài
 * kiểm thử xem máy chủ web đã gửi gì sang (GET /tim?q=<chữ>).
 *
 * - Mã bí mật khác "bi-mat-thu": trả { ok: false, loi: "bi-mat" }.
 * - Câu hỏi có chữ "[loi]": trả { ok: false, loi: "ghi" }, như khi bảng tính lỗi.
 */
import { createServer } from "node:http";

const PORT = Number(process.env.PORT_APPS_SCRIPT_GIA ?? 3101);
const daNhan = [];

createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${PORT}`);
  const json = (obj, status = 200) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(obj));
  };

  if (req.method === "POST" && url.pathname === "/exec") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      let goi = null;
      try {
        goi = JSON.parse(body);
      } catch {}
      daNhan.push(goi);
      res.writeHead(302, { Location: `/echo?so=${daNhan.length - 1}` });
      res.end();
    });
    return;
  }
  if (req.method === "GET" && url.pathname === "/echo") {
    const goi = daNhan[Number(url.searchParams.get("so"))];
    if (!goi) return json({ ok: false, loi: "du-lieu" });
    if (goi.biMat !== "bi-mat-thu") return json({ ok: false, loi: "bi-mat" });
    if (String(goi.cauHoi ?? "").includes("[loi]")) return json({ ok: false, loi: "ghi" });
    return json({ ok: true });
  }
  if (req.method === "GET" && url.pathname === "/tim") {
    const q = url.searchParams.get("q") ?? "";
    return json(daNhan.filter((g) => g && JSON.stringify(g).includes(q)));
  }
  if (req.method === "GET" && url.pathname === "/") return json({ ok: true });
  json({ ok: false }, 404);
}).listen(PORT, "127.0.0.1");

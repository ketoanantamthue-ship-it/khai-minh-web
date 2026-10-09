#!/usr/bin/env node
/**
 * npm run check:words
 *
 * Quét chữ cho khách tìm từ cấm (CLAUDE.md, quy tắc 5; docs/nguon/
 * ban-thiet-ke-W2-giong-van-va-50-cau-cam.md, mục 3).
 *
 * - LỖI: từ cấm tuyệt đối. Gặp là script thoát với mã 1.
 * - CẦN XEM: từ chỉ được dùng trong ngữ cảnh nhất định (ví dụ "giải hạn"
 *   chỉ trong câu phủ định của Hiến chương). Script in ra để người viết
 *   tự kiểm, không làm hỏng CI.
 *
 * Phạm vi: content/ (MDX, MD), components/, app/ và site.config.ts.
 * Bỏ qua tệp CSS, chú thích trong mã và các giá trị CSS như `width:100%`.
 *
 * Chỗ đã được người thật xem và cho phép giữ nằm ở check-words-cho-phep.json.
 *
 * Tuỳ chọn: --strict  coi cả mục CẦN XEM là lỗi.
 */
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import choPhep from "./check-words-cho-phep.json" with { type: "json" };

const ROOT = new URL("..", import.meta.url).pathname;
const STRICT = process.argv.includes("--strict");

const SCAN = ["content", "components", "app", "site.config.ts"];
const EXT_CONTENT = new Set([".mdx", ".md"]);
const EXT_CODE = new Set([".tsx", ".ts", ".jsx", ".js", ".mjs"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "out"]);

/** [mẫu, lý do / chữ thay]. Mẫu là biểu thức chính quy, không phân biệt hoa thường. */
const LOI = [
  ["xem bói", "dùng “khai vấn”, “soi”"],
  ["thầy bói", "dùng “người khai vấn”, “người đồng hành”"],
  ["số phận đã định", "bỏ ý này"],
  ["miễn phí", "dùng “không thu phí”"],
  ["100\\s?%", "bỏ con số"],
  ["chính xác tuyệt đối", "hứa hẹn sai sự thật"],
  ["đảm bảo thay đổi vận mệnh", "rủi ro pháp lý"],
  ["cải vận cấp tốc", "gieo kỳ vọng sai"],
  ["hạn nặng", "gieo sợ"],
  ["đại hung", "gieo sợ"],
  ["vong theo", "gieo sợ"],
  ["nghiệp nặng", "phán xét"],
  ["khoa học năng lượng", "giả khoa học"],
  ["được khoa học chứng minh", "dùng “chưa có nghiên cứu chứng minh” khi cần"],
  ["tinh hoa", "tự xưng"],
  ["đẳng cấp nhất", "tự xưng"],
  ["số một", "tự xưng"],
  ["hàng đầu", "tự xưng"],
  ["bí truyền", "gợi mê tín"],
  ["mở khóa tiềm năng", "văn quảng cáo sáo"],
  ["đánh thức con người thật", "văn quảng cáo sáo"],
  ["thay đổi cuộc đời mãi mãi", "phóng đại"],
  ["chỉ trong \\d+ ngày", "hứa hẹn thời hạn"],
  ["năng lượng tích cực", "nói cụ thể điều gì thay đổi"],
  ["vũ trụ gửi tín hiệu", "gợi mê tín"],
  ["hành trình chuyển hóa tuyệt vời", "kể một chi tiết thật"],
  ["trong thế giới hiện đại ngày nay", "vào thẳng ý"],
  ["hãy cùng khám phá", "vào thẳng ý"],
  ["bạn có bao giờ tự hỏi", "đặt câu hỏi cụ thể"],
  ["điều quan trọng là", "nói thẳng điều đó"],
  ["nói tóm lại", "bỏ"],
  ["tóm lại", "bỏ"],
  ["hơn bao giờ hết", "bỏ"],
  ["đỉnh cao", "phóng đại"],
  ["kiệt tác", "phóng đại"],
  ["đừng bỏ lỡ", "dùng “Khi bạn sẵn sàng”"],
  ["đăng ký ngay", "dùng “Nhận thư”, “Gửi lời nhắn”"],
  ["chỉ còn \\d+ suất", "khan hiếm giả"],
  ["quý khách", "dùng “bạn”"],
  ["linh nghiệm", "gợi mê tín"],
  ["tâm linh cao cấp", "tự xưng"],
  ["trải nghiệm đẳng cấp", "văn quảng cáo"],
  ["cam kết kết quả", "rủi ro pháp lý"],
];

const CAN_XEM = [
  ["giải hạn", "chỉ dùng trong câu phủ định của Hiến chương"],
  ["khắc tuổi|kỵ tuổi", "chỉ dùng trong câu phủ định của Hiến chương"],
  ["chẩn đoán", "thuật ngữ y khoa; dùng “soi”, “nhìn rõ”"],
  ["chữa lành", "dễ hiểu nhầm là dịch vụ y tế; dùng “đồng hành”, “chuyển hoá”"],
  ["trị liệu", "chỉ dùng khi nói rõ đây không phải trị liệu"],
  ["liệu pháp", "dùng “thực hành”"],
  ["tần số", "giả khoa học khi nói về năng lượng"],
  ["duy nhất", "khó kiểm chứng"],
  ["bí mật", "gợi mê tín, lôi kéo"],
  ["sâu sắc|kỳ diệu|tuyệt vời", "tính từ rỗng khi dùng để khen"],
  ["không chỉ[^.。\\n]{0,80}mà còn", "tách thành hai câu nếu dùng liên tục"],
  ["phán(?! xét)", "dùng “nói”, “chia sẻ”"],
  ["định mệnh", "trái nhân quả"],
  ["thầy(?! bói| thuốc)", "không tự xưng “thầy”"],
  ["đức phật đã bảo chắc chắn", "dẫn tên kinh cụ thể"],
];

/**
 * Chuẩn hoá cách đặt dấu thanh kiểu cũ/mới ("khoá" và "khóa", "hoà" và "hòa")
 * để một mẫu bắt được cả hai cách viết.
 */
const DAU = [
  ["oá", "óa"], ["oà", "òa"], ["oả", "ỏa"], ["oã", "õa"], ["oạ", "ọa"],
  ["oé", "óe"], ["oè", "òe"], ["oẻ", "ỏe"], ["oẽ", "õe"], ["oẹ", "ọe"],
  ["uý", "úy"], ["uỳ", "ùy"], ["uỷ", "ủy"], ["uỹ", "ũy"], ["uỵ", "ụy"],
];
function chuanHoa(s) {
  let t = s.normalize("NFC").toLowerCase();
  for (const [moi, cu] of DAU) t = t.split(moi).join(cu);
  return t;
}

const BIEN = "(?<![\\p{L}\\p{N}])";
const BIEN_SAU = "(?![\\p{L}\\p{N}])";
function bienDich(ds, muc) {
  return ds.map(([mau, lyDo]) => ({
    mau,
    lyDo,
    muc,
    re: new RegExp(`${BIEN}(?:${chuanHoa(mau)})${BIEN_SAU}`, "gu"),
  }));
}
const LUAT = [...bienDich(LOI, "LỖI"), ...bienDich(CAN_XEM, "CẦN XEM")];

/** Thay một đoạn bằng khoảng trắng cùng độ dài, giữ nguyên số dòng và cột. */
function xoa(text, re) {
  return text.replace(re, (m) => m.replace(/[^\n]/g, " "));
}

/** Bỏ những phần khách không đọc: chú thích, giá trị CSS, đường dẫn. */
function locChuHienThi(text, ext) {
  let t = text;
  // Chú thích khối /* … */ và {/* … */} (cả dấu CẦN trong MDX).
  t = xoa(t, /\/\*[\s\S]*?\*\//g);
  // Chú thích HTML/MDX <!-- … -->.
  t = xoa(t, /<!--[\s\S]*?-->/g);
  if (EXT_CODE.has(ext)) {
    // Chú thích dòng // … (không đụng tới "https://").
    t = xoa(t, /(^|[^:"'`])\/\/[^\n]*/gm);
    // Thuộc tính style={{ … }} và chuỗi CSS kiểu "width:100%".
    t = xoa(t, /style=\{\{[\s\S]*?\}\}/g);
  }
  // Giá trị CSS kiểu width:100%, max-width: 100% (cả trong MDX/HTML nhúng).
  t = xoa(t, /[a-z-]+\s*:\s*["'`]?[^;"'`\n]*?100%/gi);
  return t;
}

async function* duyet(p) {
  const full = join(ROOT, p);
  let entries;
  try {
    entries = await readdir(full, { withFileTypes: true });
  } catch (e) {
    if (e.code === "ENOTDIR") {
      yield full;
      return;
    }
    if (e.code === "ENOENT") return;
    throw e;
  }
  for (const en of entries) {
    if (SKIP_DIRS.has(en.name)) continue;
    const rel = join(p, en.name);
    if (en.isDirectory()) yield* duyet(rel);
    else yield join(ROOT, rel);
  }
}

function viTri(text, index) {
  const truoc = text.slice(0, index);
  const dong = truoc.split("\n").length;
  const cot = index - truoc.lastIndexOf("\n");
  return { dong, cot };
}

function duocPhep(file, tim) {
  return choPhep.cho_phep.some((c) => c.tep === file && chuanHoa(c.cum) === tim);
}

const ketQua = [];
let soTep = 0;

for (const goc of SCAN) {
  for await (const file of duyet(goc)) {
    const ext = extname(file);
    if (!EXT_CONTENT.has(ext) && !EXT_CODE.has(ext)) continue;
    soTep++;
    const goc_ = await readFile(file, "utf8");
    const loc = chuanHoa(locChuHienThi(goc_.normalize("NFC"), ext));
    const dongGoc = goc_.normalize("NFC").split("\n");
    for (const luat of LUAT) {
      luat.re.lastIndex = 0;
      for (const m of loc.matchAll(luat.re)) {
        const tep = relative(ROOT, file);
        if (duocPhep(tep, m[0])) continue;
        const { dong, cot } = viTri(loc, m.index);
        ketQua.push({
          file: tep,
          dong,
          cot,
          muc: luat.muc,
          tim: m[0],
          lyDo: luat.lyDo,
          ngu: (dongGoc[dong - 1] ?? "").trim().slice(0, 140),
        });
      }
    }
  }
}

ketQua.sort((a, b) => a.file.localeCompare(b.file) || a.dong - b.dong);
const loi = ketQua.filter((k) => k.muc === "LỖI" || STRICT);
const canXem = ketQua.filter((k) => k.muc === "CẦN XEM" && !STRICT);

for (const k of ketQua) {
  console.log(`${k.muc === "LỖI" || STRICT ? "✗" : "!"} ${k.file}:${k.dong}:${k.cot}  [${k.muc}] “${k.tim}”: ${k.lyDo}`);
  console.log(`    ${k.ngu}`);
}

console.log(
  `\nĐã quét ${soTep} tệp. ${loi.length} lỗi, ${canXem.length} chỗ cần xem lại bằng mắt.`,
);
if (loi.length > 0) {
  console.log("Hãy sửa các chỗ đánh dấu ✗ rồi chạy lại npm run check:words.");
  process.exit(1);
}

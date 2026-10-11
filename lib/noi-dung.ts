import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  duocHien,
  schemaChang,
  schemaCua,
  schemaSlug,
  schemaTang,
  schemaTrangThai,
  type MaChang,
  type MaCua,
  type MaTang,
  type TrangThai,
} from "./nhan.ts";

/**
 * Kho bài của web Khai Minh (phiên S3; docs/04, mục 4 và 5).
 *
 * Mỗi loại bài là một thư mục trong content/, mỗi bài là một tệp
 * `<slug>.mdx`. Thêm một tệp là có thêm một trang, không phải sửa mã.
 *
 * - Frontmatter được kiểm bằng zod. Sai schema, hay thiếu một trong ba nhãn
 *   (chặng, tầng, cửa), thì build báo lỗi kèm tên tệp.
 * - Bài `da-dang` phải đủ mọi phần (người soát, nguồn, đủ các bước của
 *   khuôn…) và không còn dấu CẦN; thiếu thì build báo lỗi.
 * - Bài ở trạng thái khác được phép thiếu. Danh sách phần còn thiếu xem
 *   bằng `npm run kiem:bai`.
 * - Tệp bắt đầu bằng “_” (ví dụ `_mau.mdx`) là khuôn để chép, không thành trang.
 *
 * Tệp này không dùng bí danh `@/` và ghi rõ đuôi `.ts` khi nhập, để
 * scripts/kiem-bai.mts chạy thẳng bằng Node được.
 */

export const LOAI = ["hoi", "tu-dien", "ngo-nhan", "viet", "thu", "phuong-phap"] as const;
export type Loai = (typeof LOAI)[number];

/** Tên mỗi loại bài, dùng làm tiêu đề nhóm trong các trang danh sách. */
export const TEN_LOAI: Record<Loai, string> = {
  hoi: "Hỏi – đáp",
  "tu-dien": "Từ điển",
  "ngo-nhan": "Ngộ nhận",
  viet: "Viết",
  thu: "Thư hằng tháng",
  "phuong-phap": "Phương pháp",
};

/**
 * Năm bước của khuôn mười bước hỏi – đáp nằm trong thân MDX, mỗi bước là một
 * tiêu đề `##` đúng chữ và đúng thứ tự (bước 4 đến 8; docs/04, mục 4;
 * docs/01, mục F7). Bước 1–3 và 9–10 do trang dựng từ frontmatter.
 */
export const BUOC_HOI = [
  "Nhân quả nói gì",
  "Huyền học nói gì",
  "Khoa học nói gì",
  "Ba việc bạn làm được từ hôm nay",
  "Khi nào cần gặp bác sĩ, chuyên gia tâm lý hoặc luật sư",
] as const;

/** Hai bước phải có nhãn tin cậy riêng (thẻ <NhanTinCay> hoặc <BangSoiBaLop>). */
export const BUOC_CAN_NHAN = ["Huyền học nói gì", "Khoa học nói gì"] as const;

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */

/**
 * Ngày trong YAML, chỉ nhận dạng `2026-11-02` (YAML đọc thành Date), đổi thành
 * chuỗi `YYYY-MM-DD`. Dạng `02/11/2026` bị từ chối, để không nhầm ngày với tháng.
 */
const schemaNgay = z
  .union([z.date(), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "ngày ghi theo dạng 2026-11-02")])
  .transform((d) => new Date(d).toISOString().slice(0, 10));

/** Một đoạn hoặc nhiều đoạn văn. */
const schemaDoan = z
  .union([z.string().min(1), z.array(z.string().min(1)).min(1)])
  .transform((v) => (Array.isArray(v) ? v : [v]));

const schemaNguon = z.object({
  ten: z.string().min(1),
  /** kinh, co-thu (sách cổ), sach, nghien-cuu, bao, khac */
  loai: z.enum(["kinh", "co-thu", "sach", "nghien-cuu", "bao", "khac"]).optional(),
  /** `true` khi không trích nguyên văn (docs/04, mục 1). */
  dien_y: z.boolean().optional(),
  url: z.url().optional(),
});
export type Nguon = z.infer<typeof schemaNguon>;

/** Tham chiếu tới bài khác: `<loại>/<slug>`, ví dụ `tu-dien/tam-tai`. */
const schemaThamChieu = z
  .string()
  .regex(new RegExp(`^(${LOAI.join("|")})/[a-z0-9]+(?:-[a-z0-9]+)*$`), "tham chiếu dạng “hoi/slug”, “tu-dien/slug”…");

/** Video YouTube đặt ở đầu bài (thẻ <VideoYouTube> cho video trong thân bài). */
const schemaVideo = z.strictObject({
  /** Mã video YouTube, 11 ký tự, ví dụ trong youtube.com/watch?v=<mã>. */
  id: z.string().regex(/^[A-Za-z0-9_-]{11}$/, "mã video YouTube gồm 11 ký tự"),
  tieu_de: z.string().min(1),
  /** Lời thoại đầy đủ, hiện thu gọn dưới video. */
  loi_thoai: z.string().min(1).optional(),
  ngay_dang: schemaNgay.optional(),
  /** Thời lượng theo chuẩn ISO 8601, ví dụ "PT8M30S". */
  thoi_luong: z.string().regex(/^PT(\d+H)?(\d+M)?(\d+S)?$/, "thời lượng dạng PT8M30S").optional(),
});
export type Video = z.infer<typeof schemaVideo>;

/** Bản ghi âm Khai Minh đọc bài, đặt trong public/. */
const schemaAmThanh = z.strictObject({
  src: z.string().startsWith("/", "đường dẫn tệp trong public/, bắt đầu bằng “/”"),
  /** Thời lượng hiện cho người nghe, ví dụ "8 phút". */
  thoi_luong: z.string().min(1).optional(),
});

/** Ảnh đầu bài, đặt trong public/. Dùng làm ảnh chia sẻ của bài. */
const schemaAnh = z.strictObject({
  src: z.string().startsWith("/", "đường dẫn tệp trong public/, bắt đầu bằng “/”"),
  /** Mô tả ảnh bằng tiếng Việt cho người không nhìn thấy ảnh. */
  alt: z.string().min(1),
  chu_thich: z.string().min(1).optional(),
});

/** Trường chung của mọi bài. */
const coBan = {
  slug: schemaSlug,
  chang: schemaChang,
  tang: schemaTang,
  cua: schemaCua,
  trang_thai: schemaTrangThai,
  nguon: z.array(schemaNguon).default([]),
  muc_tin_cay: z.string().min(1).optional(),
  ngay_viet: schemaNgay.optional(),
  /** Ngày người soát đọc lại bài gần nhất. */
  ngay_kiem_lai: schemaNgay.optional(),
  /** Bắt buộc khi `trang_thai` là `da-dang`. */
  nguoi_soat: z.string().min(1).optional(),
  lien_quan: z.array(schemaThamChieu).default([]),
  /** Thẻ mô tả cho máy tìm kiếm (120–155 ký tự). Bỏ trống thì lấy từ đoạn đầu bài. */
  mo_ta: z.string().min(1).optional(),
  /** Ngôn ngữ của bài; chỉ có tiếng Việt cho tới khi chốt docs/07, mục A8. */
  lang: z.literal("vi").default("vi"),
  /** Ghi chú cho đội viết. Không bao giờ hiện trên trang. */
  ghi_chu_noi_bo: z.string().optional(),
  /** Tuỳ chọn: video, bản đọc, ảnh đầu bài. Không có thì trang không hiện gì. */
  video: schemaVideo.optional(),
  am_thanh: schemaAmThanh.optional(),
  anh_bia: schemaAnh.optional(),
};

const schemaHoi = z.strictObject({
  ...coBan,
  /** Bước 1: câu hỏi nguyên văn của khách. */
  tieu_de: z.string().min(1),
  /** Bước 2: hai câu nói lại tình cảnh người đọc. */
  tinh_canh: z.string().min(1).optional(),
  /** Bước 3: trả lời ngắn 40–60 chữ, hiện ngay dưới tiêu đề. */
  tra_loi_ngan: z.string().min(1).optional(),
  /** Khớp cột ID của data/bang-loc-cau-hoi-noi-dau.xlsx. */
  ma_cau_hoi: z.string().regex(/^Q\d{3,}$/, "mã câu hỏi dạng Q001"),
});

const schemaTuDien = z.strictObject({
  ...coBan,
  thuat_ngu: z.string().min(1),
  /** Một hai câu, đặt đầu trang. */
  dinh_nghia: z.string().min(1).optional(),
  kinh_noi: schemaDoan.optional(),
  dan_gian_noi: schemaDoan.optional(),
  ngo_nhan: schemaDoan.optional(),
});

const schemaNgoNhan = z.strictObject({
  ...coBan,
  /** Niềm tin người ta hay nghe, viết như người đọc vẫn nói. */
  niem_tin: z.string().min(1),
  /** Sự thật, đặt trước nguồn. */
  su_that: schemaDoan.optional(),
});

const schemaViet = z.strictObject({
  ...coBan,
  tieu_de: z.string().min(1),
  /** Đoạn mở ngắn dưới tiêu đề. */
  tom_tat: z.string().min(1).optional(),
});

const schemaThu = z.strictObject({
  ...coBan,
  tieu_de: z.string().min(1),
  ngay_gui: schemaNgay.optional(),
  tom_tat: z.string().min(1).optional(),
});

const schemaPhuongPhap = z.strictObject({
  ...coBan,
  ten: z.string().min(1),
  dinh_nghia: z.string().min(1).optional(),
  ngay_cong_bo: schemaNgay.optional(),
  phien_ban: z.string().min(1).optional(),
});

const SCHEMA = {
  hoi: schemaHoi,
  "tu-dien": schemaTuDien,
  "ngo-nhan": schemaNgoNhan,
  viet: schemaViet,
  thu: schemaThu,
  "phuong-phap": schemaPhuongPhap,
} as const;

export type FrontMatter = { [L in Loai]: z.infer<(typeof SCHEMA)[L]> };

/* ------------------------------------------------------------------ */
/* Bài                                                                 */
/* ------------------------------------------------------------------ */

type BaiChung = {
  slug: string;
  /** Đường dẫn trên web, ví dụ `/hoi/bon-muoi-tuoi-…`. */
  duongDan: string;
  /** Tệp nguồn, ví dụ `content/hoi/….mdx`. */
  tep: string;
  tieuDe: string;
  /** Mô tả cho thẻ meta và ảnh chia sẻ. */
  moTa: string | undefined;
  trangThai: TrangThai;
  chang: MaChang;
  tang: MaTang;
  cua: MaCua[];
  /** Ngày dùng cho sitemap và `dateModified`: ngày kiểm lại, hoặc ngày viết. */
  ngayCapNhat: string | undefined;
  /** Thân MDX (không có frontmatter). */
  than: string;
  /** Những phần còn thiếu; bài `da-dang` phải rỗng. */
  thieu: string[];
};

export type Bai<L extends Loai = Loai> = { [K in L]: BaiChung & { loai: K; fm: FrontMatter[K] } }[L];

export function duongDanBai(loai: Loai, slug: string): string {
  return `/${loai}/${slug}`;
}

function tieuDeCua(b: { loai: Loai; fm: FrontMatter[Loai] }): string {
  const fm = b.fm as Partial<Record<"tieu_de" | "thuat_ngu" | "niem_tin" | "ten", string>>;
  return fm.tieu_de ?? fm.thuat_ngu ?? fm.niem_tin ?? fm.ten ?? "";
}

/** Đoạn đầu dùng làm mô tả khi bài không có `mo_ta`. */
function doanDau(b: { loai: Loai; fm: FrontMatter[Loai] }): string | undefined {
  switch (b.loai) {
    case "hoi":
      return (b.fm as FrontMatter["hoi"]).tra_loi_ngan;
    case "tu-dien":
      return (b.fm as FrontMatter["tu-dien"]).dinh_nghia;
    case "ngo-nhan":
      return (b.fm as FrontMatter["ngo-nhan"]).su_that?.[0];
    case "viet":
    case "thu":
      return (b.fm as FrontMatter["viet"]).tom_tat;
    case "phuong-phap":
      return (b.fm as FrontMatter["phuong-phap"]).dinh_nghia;
  }
}

/** Cắt mô tả về khoảng 155 ký tự, ở ranh giới chữ (docs/05, mục 1). */
export function catMoTa(chu: string, toiDa = 155): string {
  const s = chu.replace(/\s+/g, " ").trim();
  if (s.length <= toiDa) return s;
  const cat = s.slice(0, toiDa - 1);
  return `${cat.slice(0, cat.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

/** Số chữ (tiếng) trong một đoạn tiếng Việt. */
export function demChu(chu: string): number {
  return chu.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
}

/** Thân MDX còn dấu CẦN (chú thích `{/* CẦN … *\/}` hoặc thẻ `<DangSoan>`). */
export function conDauCan(than: string): boolean {
  return /\{\/\*\s*CẦN\b/u.test(than) || /<DangSoan\b/.test(than);
}

/** Các tiêu đề `##` trong thân MDX, theo thứ tự. */
export function tieuDeHai(than: string): string[] {
  return [...than.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]!);
}

/** Phần thân bài nằm dưới một tiêu đề `##`, tới tiêu đề `##` kế tiếp. */
export function phanDuoiTieuDe(than: string, tieuDe: string): string | undefined {
  const dong = than.split("\n");
  const dau = dong.findIndex((d) => d.trim() === `## ${tieuDe}`);
  if (dau < 0) return undefined;
  const sau = dong.findIndex((d, i) => i > dau && /^##\s/.test(d));
  return dong.slice(dau + 1, sau < 0 ? undefined : sau).join("\n");
}

/** Chữ người đọc thấy trong thân MDX: bỏ chú thích, thẻ và dấu Markdown. */
export function chuTrongThan(than: string): string {
  return than
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`]/g, "");
}

/** Số phút đọc, tính 220 chữ mỗi phút, ít nhất một phút. */
export function phutDoc(b: Bai): number {
  const fm = b.fm as Partial<Record<string, unknown>>;
  const dau = ["tinh_canh", "tra_loi_ngan", "dinh_nghia", "tom_tat"].map((k) => (typeof fm[k] === "string" ? fm[k] : ""));
  const doan = ["kinh_noi", "dan_gian_noi", "ngo_nhan", "su_that"].flatMap((k) => (Array.isArray(fm[k]) ? fm[k] : []));
  const chu = [...dau, ...doan, chuTrongThan(b.than)].join(" ");
  return Math.max(1, Math.round(demChu(chu) / 220));
}

/**
 * Neo cho một tiêu đề: chữ thường không dấu, nối bằng gạch ngang.
 * “Khoa học nói gì” → `khoa-hoc-noi-gi`.
 */
export function taoNeo(chu: string): string {
  return chu
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Thuộc tính của các thẻ <VideoYouTube …> trong thân MDX, để dựng JSON-LD VideoObject. */
export function videoTrongThan(than: string): Record<string, string>[] {
  return [...chuKhongChuThich(than).matchAll(/<VideoYouTube\b([^>]*)>/g)].map((m) =>
    Object.fromEntries([...m[1]!.matchAll(/(\w+)="([^"]*)"/g)].map((a) => [a[1]!, a[2]!])),
  );
}

function chuKhongChuThich(than: string): string {
  return than.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
}

/** Liệt kê những phần còn thiếu, theo khuôn của từng loại bài. */
function timChoThieu(b: { loai: Loai; fm: FrontMatter[Loai] }, than: string): string[] {
  const t: string[] = [];
  const fm = b.fm;
  if (!fm.ngay_viet) t.push("ngày viết (ngay_viet)");
  if (!fm.nguoi_soat) t.push("người soát (nguoi_soat)");
  if (conDauCan(than)) t.push("thân bài còn dấu CẦN");

  const canNguonVaTinCay = b.loai === "hoi" || b.loai === "tu-dien" || b.loai === "ngo-nhan";
  if (canNguonVaTinCay && fm.nguon.length === 0) t.push("nguồn (nguon)");
  if (canNguonVaTinCay && !fm.muc_tin_cay) t.push("nhãn tin cậy (muc_tin_cay)");
  if (fm.ngay_viet && fm.ngay_kiem_lai && fm.ngay_kiem_lai < fm.ngay_viet) {
    t.push("ngày kiểm lại phải sau ngày viết");
  }

  switch (b.loai) {
    case "hoi": {
      const h = b.fm as FrontMatter["hoi"];
      if (!h.tinh_canh) t.push("bước 2: hai câu nói lại tình cảnh (tinh_canh)");
      if (!h.tra_loi_ngan) t.push("bước 3: trả lời ngắn (tra_loi_ngan)");
      else {
        const n = demChu(h.tra_loi_ngan);
        if (n < 40 || n > 60) t.push(`bước 3: trả lời ngắn cần 40–60 chữ, đang có ${n}`);
      }
      const coTieuDe = tieuDeHai(than);
      let viTri = -1;
      BUOC_HOI.forEach((buoc, i) => {
        const o = coTieuDe.indexOf(buoc);
        if (o < 0) t.push(`bước ${i + 4}: thiếu tiêu đề “## ${buoc}”`);
        else if (o < viTri) t.push(`bước ${i + 4}: tiêu đề “## ${buoc}” sai thứ tự`);
        else viTri = o;
      });
      for (const buoc of BUOC_CAN_NHAN) {
        const phan = phanDuoiTieuDe(chuKhongChuThich(than), buoc);
        if (phan !== undefined && !/<(NhanTinCay|BangSoiBaLop)\b/.test(phan)) {
          t.push(`bước “${buoc}” thiếu nhãn tin cậy riêng (<NhanTinCay>)`);
        }
      }
      break;
    }
    case "tu-dien": {
      const d = b.fm as FrontMatter["tu-dien"];
      if (!d.dinh_nghia) t.push("định nghĩa (dinh_nghia)");
      if (!d.kinh_noi) t.push("kinh nói gì (kinh_noi)");
      if (!d.dan_gian_noi) t.push("dân gian nói gì (dan_gian_noi)");
      if (!d.ngo_nhan) t.push("ngộ nhận (ngo_nhan)");
      break;
    }
    case "ngo-nhan": {
      if (!(b.fm as FrontMatter["ngo-nhan"]).su_that) t.push("sự thật (su_that)");
      break;
    }
    case "viet":
    case "thu": {
      if (!than.trim()) t.push("thân bài");
      if (b.loai === "thu" && !(b.fm as FrontMatter["thu"]).ngay_gui) t.push("ngày gửi (ngay_gui)");
      break;
    }
    case "phuong-phap": {
      const p = b.fm as FrontMatter["phuong-phap"];
      if (!p.dinh_nghia) t.push("định nghĩa (dinh_nghia)");
      if (!p.ngay_cong_bo) t.push("ngày công bố (ngay_cong_bo)");
      if (!p.phien_ban) t.push("phiên bản (phien_ban)");
      break;
    }
  }
  return t;
}

/* ------------------------------------------------------------------ */
/* Đọc kho                                                             */
/* ------------------------------------------------------------------ */

export const THU_MUC_NOI_DUNG = join(process.cwd(), "content");

const boNho = new Map<string, Bai[]>();

/**
 * Đọc mọi bài của mọi loại trong `thuMuc` (mặc định content/), kể cả bài
 * nháp. Báo lỗi ngay khi một tệp sai schema hoặc một bài `da-dang` còn thiếu.
 */
export function docKho(thuMuc = THU_MUC_NOI_DUNG): Bai[] {
  const daCo = boNho.get(thuMuc);
  if (daCo) return daCo;

  const ds: Bai[] = [];
  const loi: string[] = [];
  const maCauHoi = new Map<string, string>();

  // Mọi trang đều dựng sẵn lúc build, nên máy chủ không cần mang theo content/
  // (turbopackIgnore: không kéo cả kho mã vào gói triển khai).
  for (const loai of LOAI) {
    const thu = join(/*turbopackIgnore: true*/ thuMuc, loai);
    if (!existsSync(/*turbopackIgnore: true*/ thu)) continue;
    const tepMdx = readdirSync(/*turbopackIgnore: true*/ thu)
      .filter((t) => t.endsWith(".mdx") && !t.startsWith("_"))
      .sort();

    for (const ten of tepMdx) {
      const tep = `content/${loai}/${ten}`;
      const { data, content } = matter(readFileSync(/*turbopackIgnore: true*/ join(thu, ten), "utf8"));
      const kq = SCHEMA[loai].safeParse(data);
      if (!kq.success) {
        loi.push(`${tep}: frontmatter sai schema.\n${z.prettifyError(kq.error)}`);
        continue;
      }
      const fm = kq.data;
      if (`${fm.slug}.mdx` !== ten) {
        loi.push(`${tep}: slug “${fm.slug}” phải trùng tên tệp (${fm.slug}.mdx).`);
        continue;
      }
      if (loai === "hoi") {
        const ma = (fm as FrontMatter["hoi"]).ma_cau_hoi;
        if (maCauHoi.has(ma)) loi.push(`${tep}: mã câu hỏi ${ma} đã dùng ở ${maCauHoi.get(ma)}.`);
        maCauHoi.set(ma, tep);
      }

      const goc = { loai, fm } as { loai: Loai; fm: FrontMatter[Loai] };
      const thieu = timChoThieu(goc, content);
      if (fm.trang_thai === "da-dang" && thieu.length > 0) {
        loi.push(`${tep}: bài đã đăng (da-dang) còn thiếu:\n  - ${thieu.join("\n  - ")}`);
        continue;
      }
      const moTa = fm.mo_ta ?? doanDau(goc);
      ds.push({
        loai,
        fm,
        slug: fm.slug,
        duongDan: duongDanBai(loai, fm.slug),
        tep,
        tieuDe: tieuDeCua(goc),
        moTa: moTa ? catMoTa(moTa) : undefined,
        trangThai: fm.trang_thai,
        chang: fm.chang,
        tang: fm.tang,
        cua: fm.cua,
        ngayCapNhat: fm.ngay_kiem_lai ?? fm.ngay_viet,
        than: content,
        thieu,
      } as Bai);
    }
  }

  if (loi.length > 0) {
    throw new Error(`Kho bài có ${loi.length} lỗi (docs/09):\n\n${loi.join("\n\n")}`);
  }

  // Mới nhất trước; cùng ngày thì theo tên.
  ds.sort((a, b) => (b.ngayCapNhat ?? "").localeCompare(a.ngayCapNhat ?? "") || a.tieuDe.localeCompare(b.tieuDe, "vi"));
  boNho.set(thuMuc, ds);
  return ds;
}

/** Bài được dựng thành trang: chỉ `da-dang` ở production, mọi bài ở bản xem trước. */
export function baiHienThi(hienBanNhap: boolean, thuMuc?: string): Bai[] {
  return docKho(thuMuc).filter((b) => duocHien(b.trangThai, hienBanNhap));
}

/** Bài công khai: chỉ `da-dang` (sitemap, dù đang ở bản xem trước). */
export function baiCongKhai(thuMuc?: string): Bai[] {
  return docKho(thuMuc).filter((b) => b.trangThai === "da-dang");
}

export function locLoai<L extends Loai>(ds: Bai[], loai: L): Bai<L>[] {
  return ds.filter((b) => b.loai === loai) as Bai<L>[];
}

/** Tìm bài theo tham chiếu `<loại>/<slug>` trong một danh sách. */
export function timThamChieu(ds: Bai[], thamChieu: string): Bai | undefined {
  return ds.find((b) => `${b.loai}/${b.slug}` === thamChieu);
}

/** Ngày `YYYY-MM-DD` viết kiểu Việt Nam: `02/11/2026`. */
export function vietNgay(ngay: string): string {
  const [y, m, d] = ngay.split("-");
  return `${d}/${m}/${y}`;
}

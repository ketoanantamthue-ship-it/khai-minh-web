import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Chín chặng đời, đọc từ content/chang/*.mdx (docs/03, mục 7; docs/04, mục 4).
 *
 * Chỉ đọc frontmatter. Phần chữ riêng của trang /chang/[slug] (khuôn
 * prototypes/chang-5.html) nằm ở trường `trang`; chặng nào chưa có trường
 * này thì trang chặng dựng từ phần seed và để ô CẦN (docs/07, mục C2).
 * Frontmatter sai schema thì build báo lỗi, kèm tên tệp.
 */

const TANG = ["cham", "hieu", "soi", "chuyen", "dong-hanh", "tot-nghiep"] as const;
const CUA = ["tam", "tri", "than"] as const;
const TRANG_THAI = ["ban-nhap", "ban-mau-chua-duyet", "da-soat", "da-dang"] as const;

/** Thang nhãn tin cậy bản mẫu đang dùng (docs/04, mục 3; thang đầy đủ chờ docs/07, mục C6). */
export const MUC_TIN_CAY = {
  "Niềm tin truyền thống": "b1",
  "Luận giải mệnh lý": "b2",
  "Đang được nghiên cứu": "b3",
  "Điều đã được kiểm chứng": "b4",
} as const;

/** Nhãn tin cậy dạng thẻ nhỏ của bản mẫu: chữ hiện ra và lớp màu l1–l4. */
const schemaNhan = z.object({
  chu: z.string().min(1),
  lop: z.enum(["l1", "l2", "l3", "l4"]),
});

/**
 * Một tầng trong "Năm tầng soi": các đoạn văn, có thể kèm nhãn tin cậy,
 * hoặc một lời trích có nguồn (tầng "Lời Phật dạy").
 */
const schemaTang = z
  .object({
    doan: z.array(z.string().min(1)).optional(),
    nhan: schemaNhan.optional(),
    trich: z.object({ loi: z.string().min(1), nguon: z.string().min(1) }).optional(),
  })
  .refine((t) => t.doan?.length || t.trich, { message: "mỗi tầng cần `doan` hoặc `trich`" });

/** Chữ riêng của trang chặng, theo khuôn prototypes/chang-5.html. */
const schemaTrang = z.object({
  /** Thẻ mô tả cho máy tìm kiếm. */
  mo_ta: z.string().min(1),
  /** Đoạn dưới câu "soi" ở màn đầu. */
  mo_dau: z.string().min(1),
  /** Câu ở ngưỡng bình minh. */
  binh_minh: z.string().min(1),
  /** Cách gọi chặng trong câu, ví dụ “chặng giữa đời”. Mặc định là tên chặng viết thường. */
  goi_ten: z.string().min(1).optional(),
  /** Năm tầng soi, đúng thứ tự: nỗi khổ, điều hay dọa, khoa học, lời Phật, thực tập. */
  nam_tang: z.array(schemaTang).length(5),
  /** Lời giới thiệu cho mỗi cửa trong “Ba cánh cửa cho chặng…”. */
  ba_cua: z.object({ tam: z.string().min(1), tri: z.string().min(1), than: z.string().min(1) }).partial(),
  /** Sáu tầng đi sâu, phần chữ sau nhãn đậm (đúng thứ tự lib/sau-tang.ts). */
  di_sau: z.array(z.string().min(1)).length(6),
  /** Câu hỏi khác ở chặng, nếu trang chặng cần nhiều hơn `cau_hoi_lien_quan`. */
  cau_hoi_khac: z.array(z.string().min(1)).optional(),
});

const schemaChang = z.object({
  so: z.number().int().min(1).max(9),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  ten: z.string().min(1),
  han_tu: z.string().length(1),
  do_tuoi: z.string().min(1),
  khi_nao: z.string().min(1),
  cau_hoi_chinh: z.string().min(1),
  soi: z.string().min(1),
  tra_loi: z.array(z.string().min(1)).min(1),
  nguon: z.string().min(1),
  /** Lời nhắc an toàn, chỉ có ở vài chặng (bản mẫu: trường `safe` của mảng S). */
  loi_an_toan: z.string().min(1).optional(),
  muc_tin_cay: z.string().min(1),
  cau_hoi_lien_quan: z.array(z.string().min(1)),
  cua: z.array(z.enum(CUA)).min(1),
  tang: z.enum(TANG),
  trang_thai: z.enum(TRANG_THAI),
  nguon_goc: z.string().optional(),
  trang: schemaTrang.optional(),
});

export type TrangChang = z.infer<typeof schemaTrang>;
export type TangSoi = z.infer<typeof schemaTang>;

export type Chang = z.infer<typeof schemaChang> & {
  /** Lớp màu của nhãn tin cậy (b1–b4), như bản mẫu. */
  lopTinCay: string;
};

const THU_MUC = join(process.cwd(), "content", "chang");

let boNho: Chang[] | null = null;

/** Chín chặng, theo thứ tự 1 → 9. */
export function docChinChang(): Chang[] {
  if (boNho) return boNho;

  const tep = readdirSync(THU_MUC)
    .filter((t) => t.endsWith(".mdx"))
    .sort();

  const ds = tep.map((t) => {
    const { data } = matter(readFileSync(join(THU_MUC, t), "utf8"));
    const kq = schemaChang.safeParse(data);
    if (!kq.success) {
      throw new Error(`content/chang/${t}: frontmatter sai schema.\n${z.prettifyError(kq.error)}`);
    }
    const c = kq.data;
    if (!(c.muc_tin_cay in MUC_TIN_CAY)) {
      console.warn(`content/chang/${t}: nhãn tin cậy lạ “${c.muc_tin_cay}” (docs/07, mục C6).`);
    }
    return {
      ...c,
      lopTinCay: MUC_TIN_CAY[c.muc_tin_cay as keyof typeof MUC_TIN_CAY] ?? "b1",
    };
  });

  ds.sort((a, b) => a.so - b.so);
  if (ds.length !== 9 || ds.some((c, i) => c.so !== i + 1)) {
    throw new Error("content/chang/ phải có đúng chín chặng, đánh số từ 1 đến 9.");
  }

  boNho = ds;
  return ds;
}

/** Đường dẫn trang chặng (docs/02, mục 1; trang dựng ở phiên S2). */
export function duongDanChang(c: Pick<Chang, "slug">): string {
  return `/chang/${c.slug}`;
}

/** Một chặng theo slug, hoặc `undefined` khi không có. */
export function docChang(slug: string): Chang | undefined {
  return docChinChang().find((c) => c.slug === slug);
}

/** Lớp màu thẻ nhãn tin cậy của trang con (l1–l4), tương ứng b1–b4 của trang chủ. */
export function lopNhanTinCay(c: Pick<Chang, "lopTinCay">): string {
  return c.lopTinCay.replace("b", "l");
}

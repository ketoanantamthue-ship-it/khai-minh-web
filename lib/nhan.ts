import { z } from "zod";

/**
 * Ba nhãn của mọi bài (CLAUDE.md, quy tắc 7; docs/04, mục 2) và trạng thái
 * bài. Dùng chung cho schema của chín chặng (lib/chang.ts) và kho bài
 * (lib/noi-dung.ts).
 *
 * Tệp này không đọc đĩa, nên bài kiểm thử và script đều nhập được.
 */

export const TANG = ["cham", "hieu", "soi", "chuyen", "dong-hanh", "tot-nghiep"] as const;
export const CUA = ["tam", "tri", "than"] as const;
export const TRANG_THAI = ["ban-nhap", "ban-mau-chua-duyet", "da-soat", "da-dang"] as const;

export type MaTang = (typeof TANG)[number];
export type MaCua = (typeof CUA)[number];
export type TrangThai = (typeof TRANG_THAI)[number];
/** Chặng 1–9, hoặc `cat-ngang` cho năm hạn, nghi lễ và chủ đề chung. */
export type MaChang = number | "cat-ngang";

/**
 * Tên sáu tầng, theo hệ ngôn ngữ của Bản cuối (docs/01, mục B2). Nhãn đọc
 * cho khách (“Bắt đầu nhẹ nhàng”…) nằm ở lib/sau-tang.ts.
 */
export const TEN_TANG: Record<MaTang, string> = {
  cham: "Chạm",
  hieu: "Hiểu",
  soi: "Soi",
  chuyen: "Chuyển",
  "dong-hanh": "Đồng hành",
  "tot-nghiep": "Tốt nghiệp",
};

/** Thang nhãn tin cậy bản mẫu đang dùng (docs/04, mục 3; thang đầy đủ chờ docs/07, mục C6). */
export const MUC_TIN_CAY = {
  "Niềm tin truyền thống": "b1",
  "Luận giải mệnh lý": "b2",
  "Đang được nghiên cứu": "b3",
  "Điều đã được kiểm chứng": "b4",
} as const;

/** Lớp màu thẻ nhãn tin cậy trên trang con (l1–l4) cho một mức trong thang; mức lạ trả `undefined`. */
export function lopTinCay(chu: string): "l1" | "l2" | "l3" | "l4" | undefined {
  const b = MUC_TIN_CAY[chu as keyof typeof MUC_TIN_CAY];
  return b ? (b.replace("b", "l") as "l1" | "l2" | "l3" | "l4") : undefined;
}

/** Chữ hiện trên dải bản nháp (chỉ có ở bản xem trước). */
export const TEN_TRANG_THAI: Record<TrangThai, string> = {
  "ban-nhap": "Bản nháp",
  "ban-mau-chua-duyet": "Bản mẫu, chưa duyệt",
  "da-soat": "Đã soát, chờ duyệt",
  "da-dang": "Đã đăng",
};

export const schemaTang = z.enum(TANG);
export const schemaCua = z.array(z.enum(CUA)).min(1);
export const schemaTrangThai = z.enum(TRANG_THAI);
export const schemaChang = z.union([z.number().int().min(1).max(9), z.literal("cat-ngang")]);

/** Slug: chữ thường không dấu, số và gạch ngang (docs/02, quy ước). */
export const schemaSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug chỉ gồm chữ thường không dấu, số và gạch ngang");

/** Chỉ bài `da-dang` được build ra ở production (docs/04, mục 5). */
export function duocHien(trangThai: TrangThai, hienBanNhap: boolean): boolean {
  return trangThai === "da-dang" || hienBanNhap;
}

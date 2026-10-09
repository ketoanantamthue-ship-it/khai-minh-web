/**
 * Sáu tầng đi sâu (docs/01, mục B2): nhãn, trang nhãn tương ứng (docs/02,
 * mục 2; dựng ở phiên S3) và "thang sáu tầng" của một chặng.
 *
 * Chữ chép từ bản mẫu: nhãn và thang lấy từ Mục lục của prototypes/index.html
 * (hàm showLadder), dùng chung cho lớp phủ Mục lục, trang /muc-luc và phần
 * "Bạn có thể đi sâu tới đâu" của trang chặng khi chặng chưa có chữ riêng.
 */

export const SAU_TANG = [
  { ma: "cham", nhan: "Bắt đầu nhẹ nhàng", href: "/tang/cham" },
  { ma: "hieu", nhan: "Đọc để hiểu", href: "/tang/hieu" },
  { ma: "soi", nhan: "Tự soi mình", href: "/tang/soi" },
  { ma: "chuyen", nhan: "Thực tập để chuyển", href: "/tang/chuyen" },
  { ma: "dong-hanh", nhan: "Có người đi cùng", href: "/tang/dong-hanh" },
  { ma: "tot-nghiep", nhan: "Tự bước đi", href: "/tang/tot-nghiep" },
] as const;

/** Sáu bậc của thang cho một chặng, theo đúng thứ tự của SAU_TANG. */
export function thangSauTang(tenChang: string): string[] {
  return [
    "Lá thư của chặng này",
    `Bài đọc sâu về ${tenChang.toLowerCase()}`,
    "Bảng tự soi tánh hạnh",
    "Nhật ký hai mươi mốt ngày cho chặng này",
    "Hành trình đồng hành tám đến mười tuần",
    "Lá thư của người đã đi hết hành trình",
  ];
}

/**
 * Sáu tầng đi sâu (docs/01, mục B2): nhãn, trang nhãn tương ứng (docs/02,
 * mục 2; dựng ở phiên S3) và "thang sáu tầng" của một chặng.
 *
 * Chữ chép từ bản mẫu: nhãn, dòng phụ (`phu`) và thang lấy từ Mục lục của
 * prototypes/index.html (lớp “Đi sâu theo sáu tầng” và hàm showLadder), dùng chung cho lớp phủ Mục lục, trang /muc-luc và phần
 * "Bạn có thể đi sâu tới đâu" của trang chặng khi chặng chưa có chữ riêng.
 */

export const SAU_TANG = [
  { ma: "cham", nhan: "Bắt đầu nhẹ nhàng", href: "/tang/cham", phu: "Thư hằng tháng, chuyện đạo, những bài viết ngắn" },
  { ma: "hieu", nhan: "Đọc để hiểu", href: "/tang/hieu", phu: "Bài đọc sâu, Từ điển, những điều người ta hay hiểu lầm" },
  { ma: "soi", nhan: "Tự soi mình", href: "/tang/soi", phu: "Bảng tự soi tánh hạnh và Hồ sơ Soi" },
  { ma: "chuyen", nhan: "Thực tập để chuyển", href: "/tang/chuyen", phu: "Nhật ký hai mươi mốt ngày và các lớp học" },
  { ma: "dong-hanh", nhan: "Có người đi cùng", href: "/tang/dong-hanh", phu: "Hành trình đồng hành và Trà thất" },
  { ma: "tot-nghiep", nhan: "Tự bước đi", href: "/tang/tot-nghiep", phu: "Lá thư tốt nghiệp và chứng nhận Tổng Mệnh Học™" },
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

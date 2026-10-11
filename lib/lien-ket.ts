/**
 * Đường dẫn tới lá thư “Gửi một câu hỏi”.
 *
 * Trên trang chủ, biểu mẫu nằm ngay trong trang (`#gui-cau-hoi`) và liên kết
 * mang `data-topic` để chọn sẵn chủ đề. Khi khối của trang chủ được đặt ở
 * trang khác (phiên S4), liên kết dẫn sang trang /gui-cau-hoi và mang chủ đề
 * theo tham số `chu-de`, để biểu mẫu ở đó chọn sẵn đúng chủ đề.
 */
export function hrefGuiCauHoi(noiKhac: boolean | undefined, chuDe?: string): string {
  if (!noiKhac) return "#gui-cau-hoi";
  return chuDe ? `/gui-cau-hoi?chu-de=${chuDe}` : "/gui-cau-hoi";
}

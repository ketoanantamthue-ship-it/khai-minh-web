/**
 * Các trang khung chưa có chữ đã duyệt (docs/10, “Thêm sau S4”). Ở bản thật,
 * ô “Đang soạn” trên các trang này không được dựng, trang để `noindex, follow`
 * và không vào sitemap. Có chữ đã duyệt cho trang nào thì bỏ trang ấy khỏi đây.
 *
 * Tệp này không import gì, để scripts/kiem-bai.mts (chạy thẳng bằng Node) đọc
 * được cùng danh sách với web.
 */
export const TRANG_CHUA_DU_CHU: ReadonlySet<string> = new Set([
  "/sach",
  "/bao-chi",
  "/tro-nang",
  "/noi-chuyen",
  "/ngoi-lang",
  "/tu-sach",
  // Bốn trang chính sách và Dữ liệu của bạn: chờ chữ của luật sư (docs/07, mục D3).
  "/dieu-khoan",
  "/bao-mat",
  "/cookie",
  "/mien-tru",
  "/du-lieu",
]);

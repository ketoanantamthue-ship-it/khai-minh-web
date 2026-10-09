/**
 * Trang chủ trống của phiên S0: chỉ có đầu trang, chân trang và một màn
 * sơn mài tối để đầu trang hiện đúng như bản mẫu.
 * Phiên S1 dựng chín phần của trang chủ theo docs/03, mục 4.
 */
export default function TrangChu() {
  return (
    <main id="main" className="lacquer km-trong">
      {/* Tiêu đề lấy từ <title> của prototypes/index.html; S1 thay bằng màn mở. */}
      <h1 className="sr">Khai Minh – Người Khai Vấn</h1>
    </main>
  );
}

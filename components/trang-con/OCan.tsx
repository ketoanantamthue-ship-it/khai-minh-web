/**
 * Ô CẦN: chỗ trên trang chưa có chữ đã duyệt (CLAUDE.md, quy tắc 2).
 *
 * Khách chỉ thấy khung chất liệu `.slot` của bản mẫu với chữ “Đang soạn”
 * (chữ của bản mẫu cửa Trí). Mã việc ở docs/07 nằm trong `data-can`, không
 * bao giờ hiện ra (quy tắc 3).
 *
 * `kieu="dong"`: ô nhỏ nằm trong dòng chữ, dùng trong danh sách.
 */
export function OCan({ ma, kieu = "khoi" }: { ma: string; kieu?: "khoi" | "dong" }) {
  if (kieu === "dong") {
    return (
      <span className="o-can-chu" data-can={ma}>
        Đang soạn
      </span>
    );
  }
  return (
    <div className="slot o-can" data-can={ma}>
      <div>
        <b>Đang soạn</b>
      </div>
    </div>
  );
}

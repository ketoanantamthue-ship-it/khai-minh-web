/**
 * Chỗ dành cho chữ pháp lý của các trang chính sách và trang Dữ liệu của bạn.
 * Chữ chờ luật sư (docs/07, mục D3), nên chỉ hiện câu “Đang chờ luật sư hoàn
 * thiện” trong khung chất liệu của bản mẫu.
 */
export function ChoLuatSu({ ma = "D3" }: { ma?: string }) {
  return (
    <div className="slot o-can cho-luat-su" data-can={ma}>
      <div>
        <b>Đang chờ luật sư hoàn thiện</b>
      </div>
    </div>
  );
}

/**
 * Ngưỡng bình minh: dải chuyển từ màn đầu tối sang thân trang giấy sáng.
 * Lớp sơn tối (#dawnCover) bị mài dần theo nhịp cuộn, do HieuUngTrangCon vẽ.
 *
 * Khi chưa có câu cho ngưỡng này, dải vẫn giữ để nhịp "từ tối ra sáng" không
 * gãy (docs/03, mục 4), chỉ không có chữ; dấu `data-can` ghi chỗ còn thiếu.
 */
export function NguongBinhMinh({ cau, can }: { cau?: string; can?: string }) {
  if (!cau) {
    return (
      <section className="dawn" id="binh-minh" aria-hidden="true" data-can={can}>
        <div className="dawn-in">
          <span className="dawn-rule" />
        </div>
        <canvas className="dawn-cover" id="dawnCover" />
      </section>
    );
  }
  return (
    <section className="dawn" id="binh-minh" aria-labelledby="dawn-line">
      <div className="dawn-in">
        <span className="dawn-rule" aria-hidden="true" />
        <p className="dawn-line" id="dawn-line">
          {cau}
        </p>
      </div>
      <canvas className="dawn-cover" id="dawnCover" aria-hidden="true" />
    </section>
  );
}

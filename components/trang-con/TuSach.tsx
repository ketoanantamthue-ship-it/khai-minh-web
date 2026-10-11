/**
 * Tủ sách: mỗi chặng đời ba cuốn sách gợi ý (prototypes/cua-tri.html). Dùng ở
 * Cửa Trí (chặng Tuổi giữa đời) và trang /tu-sach (cả chín chặng). Danh sách
 * sách còn chờ (docs/07, mục B7), nên mỗi cuốn là một khung bìa trống.
 */
export const TIEU_DE_TU_SACH = "Mỗi chặng đời, tôi gợi ý ba cuốn sách đáng đọc.";
export const LOI_TU_SACH =
  "Tôi không nhận tiền để giới thiệu sách. Nếu có liên kết mua sách mang lại lợi ích cho tôi, tôi ghi rõ ngay ở đầu bài.";

export function BiaTuSach({ tenChang }: { tenChang: string }) {
  return (
    <div className="grid g3">
      {["thứ nhất", "thứ hai", "thứ ba"].map((t) => (
        <div key={t} className="slot r23" role="img" aria-label={`Bìa sách ${t}`} data-can="B7">
          <div>
            <b>Bìa sách {t}</b>Cho chặng {tenChang}
          </div>
        </div>
      ))}
    </div>
  );
}

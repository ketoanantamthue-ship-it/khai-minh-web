import { FormNhanThu } from "./FormNhanThu";

export const TIEU_DE_SACH = "Tôi đang viết cuốn sách Soi – Thấu – Chuyển.";

/**
 * Khối sách (`section#sach` của prototypes/cua-tri.html): cuốn sách đang viết,
 * các bộ sách đang hoàn thiện, ô “Báo cho tôi khi sách ra đời” và khung bìa.
 * Dùng ở Cửa Trí và trang /sach. Trên trang /sach, câu tiêu đề là tiêu đề của
 * trang (h1), nên khối bỏ tiêu đề riêng (`coTieuDe={false}`).
 */
export function KhoiSach({
  id = "sach",
  oId = "thu-sach",
  coTieuDe = true,
}: {
  id?: string;
  oId?: string;
  coTieuDe?: boolean;
}) {
  return (
    <section className="s" id={id}>
      <div className="wrap grid g73 g-dau g-tren">
        <div>
          {coTieuDe ? <h2>{TIEU_DE_SACH}</h2> : null}
          <p className="lede">
            Cuốn sách nói về sáu trạng thái của tâm và con đường tự soi. Phần đầu, Tri Thiên Mệnh, bàn về chữ “mệnh”
            trong cổ học và trong lời Phật dạy.
          </p>
          <p className="lede">
            Bản thảo của những cuốn dưới đây đang được hoàn thiện. Mỗi cuốn chỉ ra mắt sau khi đã được người có chuyên
            môn đọc soát.
          </p>
          <ul className="list">
            <li>Thần Số Học Khai Minh</li>
            <li>Đại Luận Về Tâm</li>
            <li>Bách Khoa Cầm Tướng Học</li>
            <li>Bộ sách KHAI MỆNH, gồm nhiều tập ra dần theo năm tháng</li>
          </ul>
          <div className="ky-form">
            <FormNhanThu
              id={oId}
              nut="Báo cho tôi khi sách ra đời"
              camOn="Cảm ơn bạn. Tôi sẽ báo cho bạn khi sách ra đời."
            />
          </div>
        </div>
        {/* Bìa sách: chờ thiết kế bìa (docs/07, mục B11). */}
        <div className="slot r23" role="img" aria-label="Bìa sách" data-can="B11">
          <div>
            <b>Bìa sách</b>Soi – Thấu – Chuyển, khi đã có thiết kế
          </div>
        </div>
      </div>
    </section>
  );
}

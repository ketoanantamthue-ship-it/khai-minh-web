import { siteConfig } from "@/site.config";
import { ChuTham, ThuGuiToi } from "./GuiCauHoiForm";

/**
 * Phần IX · Gửi một câu hỏi (`#gui-cau-hoi`).
 *
 * Biểu mẫu vẫn là bản xem trước như bản mẫu: chưa gửi thư đi đâu. Phiên S5
 * nối nơi nhận thư (docs/07, mục A5 và E3).
 */
export function GuiCauHoi() {
  const { capCuu, ngayMai } = siteConfig.khanCap;

  return (
    <section className="send" id="gui-cau-hoi" aria-labelledby="h-send">
      <div className="grid">
        <div>
          <p className="hk hk-ink">MỘT LÁ THƯ GỬI TÔI</p>
          <ChuTham id="h-send" chu="Nếu có một câu hỏi bạn chưa nói với ai, bạn có thể gửi cho tôi." />
          <p>
            Tôi đọc từng câu hỏi. Có những câu, nếu bạn đồng ý, tôi sẽ trả lời trong một bài viết và không nêu tên bạn.
          </p>
          <p className="small">Mỗi tháng tôi chỉ nhận tối đa ba người mới để đồng hành riêng.</p>
          <ol className="sd-steps" aria-label="Lá thư của bạn sẽ đi như thế này">
            <li>
              <b>Bạn viết bằng lời của mình.</b>Bạn không cần đưa ngày giờ sinh nếu chưa muốn.
            </li>
            <li>
              <b>Tôi đọc và hồi âm trong ngày.</b>Lá thư chỉ dùng để trả lời bạn, không dùng vào việc gì khác.
            </li>
            <li>
              <b>Lá thư vẫn là của bạn.</b>Bạn có quyền xin xóa nó bất cứ lúc nào.
            </li>
          </ol>
          {ngayMai.hotlineDaXacNhan ? (
            <div className="sd-safe" role="note">
              Nếu bạn đang gặp nguy hiểm, xin đừng chờ thư hồi âm. Bạn hãy gọi{" "}
              <a href={`tel:${capCuu.tel}`}>
                {capCuu.ten} {capCuu.so}
              </a>{" "}
              hoặc{" "}
              <a href={`tel:${ngayMai.tel}`}>
                {ngayMai.ten} {ngayMai.so.replace(/ /g, " ")}
              </a>
              .
            </div>
          ) : (
            // Số Ngày Mai chưa được đội vận hành gọi thử (docs/07, mục D5).
            <div className="sd-safe" role="note" data-can="D5: số Ngày Mai chờ xác nhận">
              Nếu bạn đang gặp nguy hiểm, xin đừng chờ thư hồi âm. Bạn hãy gọi{" "}
              <a href={`tel:${capCuu.tel}`}>
                {capCuu.ten} {capCuu.so}
              </a>
              .
            </div>
          )}
        </div>
        <ThuGuiToi />
      </div>
    </section>
  );
}

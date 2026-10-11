import { FormNhanThu } from "./FormNhanThu";
import { siteConfig } from "@/site.config";

/**
 * Lời mời “Nhận thư hằng tháng” (`section.end#thu` của prototypes/cua-tri.html).
 * Dùng ở Cửa Trí và là lời mời chính của /viet, /thu và các bài trong kho
 * (Bản cuối: “/viet … Nhận thư hằng tháng”, “/thu … Nhận thư”).
 * Ô nhận thư vẫn là bản xem trước (docs/07, mục E18; phiên S5).
 */
export function LoiMoiNhanThu({ id = "thu", oId = "thu-thang" }: { id?: string; oId?: string }) {
  return (
    <section className="end" id={id}>
      <div className="wrap">
        <h2>Mỗi tháng, tôi gửi bạn một lá thư.</h2>
        <p>
          Lá thư kể về một câu hỏi đời người tôi đang ngồi cùng, một trang sách tôi vừa đọc lại, và một thực tập nhỏ
          cho tháng ấy.
        </p>
        <FormNhanThu
          id={oId}
          nut="Gửi thư cho tôi mỗi tháng"
          camOn="Cảm ơn bạn. Lá thư đầu tiên sẽ đến hộp thư của bạn trong vài ngày tới."
          baoDaNhan={siteConfig.baoDaNhanThu}
        />
      </div>
    </section>
  );
}

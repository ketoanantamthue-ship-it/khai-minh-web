import type { Metadata } from "next";
import { BaCuaKhac } from "@/components/trang-con/BaCuaKhac";
import { FormNhanThu } from "@/components/trang-con/FormNhanThu";
import { HieuUngTrangCon } from "@/components/trang-con/HieuUngTrangCon";
import { ManDau } from "@/components/trang-con/ManDau";
import { NguongBinhMinh } from "@/components/trang-con/NguongBinhMinh";
import { doors, doorStyle } from "@/lib/doors";
import "@/styles/trang-con.css";

export const metadata: Metadata = {
  title: "Cửa Thân – Dưỡng sinh Trần Y Thư",
  description:
    "Khai Minh là dược sĩ. Ở cửa Thân, anh chia sẻ cách chăm sóc thân thể thuận tự nhiên, có dẫn nguồn cổ thư và nhãn mức tin cậy.",
  alternates: { canonical: "/than" },
};

/**
 * Cửa Thân (phiên S2): chuyển prototypes/cua-than.html (K1.9.16), giữ nguyên
 * chữ, màu cửa và mọi phần. Cửa này chỉ có giáo dục, không bán sản phẩm
 * (docs/01, mục B1 và D1).
 */
export default function CuaThan() {
  return (
    <main id="main" className="km-con" data-door="than" style={doorStyle("than")}>
      <ManDau
        nhan={
          <>
            <span className="dk-seal" aria-hidden="true">
              {doors.than.han}
            </span>
            CỬA THÂN · TRẦN Y THƯ
          </>
        }
        tieuDe="Cơ thể bạn cũng cần được lắng nghe, như tâm bạn vậy."
        soi="Có thể bạn đã quen chịu đựng những cơn mỏi mệt, vì nghĩ ai ở tuổi này cũng vậy, và vì không muốn ai phải lo cho mình."
        moDau="Tôi là dược sĩ. Ở cửa này, tôi chia sẻ cách chăm sóc thân thể thuận tự nhiên, dựa trên hiểu biết y dược hôm nay và những trang cổ thư có dẫn nguồn."
      >
        {/* Chưa có bài dưỡng sinh nào (docs/07, mục C9): giữ nút, chưa có địa chỉ. */}
        <a className="btn" data-can="C9">
          Đọc bài dưỡng sinh đầu tiên
        </a>
        <a className="soft" href="#gioi-han">
          Xem bốn điều tôi luôn giữ ở cửa này
        </a>
      </ManDau>
      <NguongBinhMinh cau="Cơ thể cũng cần được lắng nghe chậm rãi, như người thợ lắng nghe mặt gỗ dưới tay mình." />

      <section className="s">
        <div className="wrap grid g73 g-dau">
          <div>
            <h2>Thập Bổ là mười cách bồi bổ thân thể theo lẽ tự nhiên.</h2>
            <p className="lede">
              Mỗi cách đều có dẫn nguồn cổ thư thật, kèm nhãn cho biết đó là kinh nghiệm truyền thống, điều đang được
              nghiên cứu, hay điều y học đã kiểm chứng. Mười bài sẽ lần lượt được đăng.
            </p>
            <p>
              <span className="label l1">Niềm tin truyền thống</span>
              <span className="label l3">Điều đang được nghiên cứu</span>
              <span className="label l4">Điều đã được kiểm chứng</span>
            </p>
          </div>
          {/* Ảnh cổ thư và dược liệu: chờ chất liệu thật (docs/07, mục B11). */}
          <div className="slot r32" role="img" aria-label="Ảnh cổ thư và dược liệu" data-can="B11">
            <div>
              <b>Ảnh cổ thư và dược liệu</b>Trang sách cổ và dược liệu thật, ánh sáng tự nhiên
            </div>
          </div>
        </div>
      </section>

      <section className="s" id="gioi-han">
        <div className="wrap">
          <h2>Có bốn điều tôi luôn giữ ở cửa này.</h2>
          <ul className="list">
            <li>
              Tôi chỉ chia sẻ hiểu biết để bạn tự chăm sóc mình. Tôi không chẩn đoán và không chữa bệnh.
            </li>
            <li>Tôi không thay thế bác sĩ đang điều trị cho bạn, và không bao giờ khuyên bạn ngừng thuốc.</li>
            <li>Tôi không bao giờ nối một lời khuyên sức khỏe với lá số hay tuổi mệnh của bạn.</li>
            <li>
              Tôi không bán sản phẩm ở đây. Những lợi ích kinh doanh của tôi được công khai ở trang Minh bạch lợi ích.
            </li>
          </ul>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <h2>Mỗi chặng đời, cơ thể cần được chăm theo một cách khác.</h2>
          <div className="grid g3">
            <article className="card">
              <h3>Những năm đầu đời</h3>
              <p>
                Giấc ngủ của con và của mẹ, và chuyện ở cữ theo hiểu biết mới, không theo những kiêng khem gây hại.
              </p>
              <span className="tag">Sắp đăng</span>
            </article>
            <article className="card">
              <h3>Tuổi giữa đời</h3>
              <p>Căng thẳng, giấc ngủ, và sức khỏe tim mạch ở tuổi phải gánh nhiều việc cùng một lúc.</p>
              <span className="tag">Sắp đăng</span>
            </article>
            <article className="card">
              <h3>Tuổi già</h3>
              <p>Vận động nhẹ, ăn uống, giấc ngủ, và những dấu hiệu lú lẫn cần đưa người thân đi khám sớm.</p>
              <span className="tag">Sắp đăng</span>
            </article>
          </div>
        </div>
      </section>

      <BaCuaKhac
        hienTai="than"
        tieuDe="Ngôi nhà này còn hai cánh cửa khác."
        loiDan="Cả ba cánh cửa cùng mở vào một ngôi nhà. Khi bạn cần, bạn cứ sang cửa bên cạnh."
      />
      <section className="end" id="thu">
        <div className="wrap">
          <h2>Với mọi câu hỏi về bệnh, bác sĩ của bạn luôn là người nên hỏi đầu tiên.</h2>
          <p>
            Còn nếu bạn muốn hiểu thêm về cách sống thuận tự nhiên, mỗi tháng tôi gửi một lá thư, trong đó có một bài
            dưỡng sinh có dẫn nguồn.
          </p>
          <FormNhanThu
            id="thu-thang"
            nut="Gửi thư cho tôi mỗi tháng"
            camOn="Cảm ơn bạn. Lá thư đầu tiên sẽ đến hộp thư của bạn trong vài ngày tới."
          />
        </div>
      </section>
      <HieuUngTrangCon />
    </main>
  );
}

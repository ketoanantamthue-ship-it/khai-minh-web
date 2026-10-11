import { BaiVietCua } from "@/components/trang-con/BaiVietCua";
import { BaCuaKhac } from "@/components/trang-con/BaCuaKhac";
import { HieuUngTrangCon } from "@/components/trang-con/HieuUngTrangCon";
import { KhoiSach } from "@/components/trang-con/KhoiSach";
import { LoiMoiNhanThu } from "@/components/trang-con/LoiMoiNhanThu";
import { ManDau } from "@/components/trang-con/ManDau";
import { NguongBinhMinh } from "@/components/trang-con/NguongBinhMinh";
import { BiaTuSach, LOI_TU_SACH, TIEU_DE_TU_SACH } from "@/components/trang-con/TuSach";
import { doors, doorStyle } from "@/lib/doors";
import { taoMetadata } from "@/lib/seo";
import "@/styles/trang-con.css";

export const metadata = taoMetadata({
  tieuDe: "Cửa Trí – Sách và những gì tôi giữ gìn",
  moTa: "Khai Minh viết sách, soạn từ điển và đọc cùng bạn những cuốn sách đáng đọc, để hiểu biết xưa được giữ lại cho đúng.",
  duongDan: "/tri",
});

/**
 * Cửa Trí (phiên S2): chuyển prototypes/cua-tri.html (K1.9.16), giữ nguyên chữ,
 * màu cửa và mọi phần, kể cả hai neo #sach và #thu (docs/02, mục 6).
 */
export default function CuaTri() {
  return (
    <main id="main" className="km-con" data-door="tri" style={doorStyle("tri")}>
      <ManDau
        nhan={
          <>
            <span className="dk-seal" aria-hidden="true">
              {doors.tri.han}
            </span>
            CỬA TRÍ
          </>
        }
        tieuDe="Có những hiểu biết nên được giữ lại cho đúng, để người sau còn đọc được."
        soi="Có thể bạn từng nghe một lời đồn về tuổi hạn hay số mệnh, và nó cứ nằm trong đầu bạn suốt nhiều năm, dù bạn không chắc nó đúng."
        moDau="Tôi viết sách, soạn từ điển, và đọc cùng bạn những cuốn sách đáng đọc. Tôi làm việc này để những điều xưa không bị phủ bởi lời đồn, và để ai cũng tìm đọc được."
      >
        <a className="btn" href="#thu">
          Nhận thư hằng tháng của tôi
        </a>
        <a className="soft" href="#sach">
          Xem những cuốn sách tôi đang viết
        </a>
      </ManDau>
      <NguongBinhMinh cau="Hiểu biết xưa cũng như mặt sơn: phải mài bỏ lớp bụi của lời đồn, mới thấy lại ánh sáng gốc." />

      <KhoiSach />

      <section className="s">
        <div className="wrap">
          <h2>Một bộ từ điển và một bộ chuẩn, mở cho mọi người cùng dùng.</h2>
          <p className="lede">
            Từ điển giải nghĩa các thuật ngữ cổ học bằng lời dễ hiểu. Bộ chuẩn đặt ra cách nói rõ mỗi điều thuộc loại
            nào, để người đọc không bị nhầm giữa niềm tin và sự thật:
          </p>
          <p>
            <span className="label l1">Niềm tin truyền thống</span>
            <span className="label l2">Luận giải mệnh lý</span>
            <span className="label l3">Điều đang được nghiên cứu</span>
            <span className="label l4">Điều đã được kiểm chứng</span>
          </p>
          <div className="grid g2">
            <article className="card">
              <h3>Đại từ điển</h3>
              <p>Mỗi mục có nghĩa gốc, những cách hiểu sai thường gặp, và nguồn để bạn tự đọc lại.</p>
              <span className="tag">Đang soạn</span>
            </article>
            <article className="card">
              <h3>Chuẩn Chính Tín</h3>
              <p>
                Bất kỳ ai viết về cổ học cũng có thể dùng bộ chuẩn này, chỉ cần ghi nguồn và chia sẻ lại theo cùng cách.
              </p>
              <span className="tag">Sắp mở</span>
            </article>
          </div>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <h2>{TIEU_DE_TU_SACH}</h2>
          <p className="lede">{LOI_TU_SACH}</p>
          {/* Ba bìa sách cho chặng Tuổi giữa đời: chờ danh sách Tủ sách (docs/07, mục B7). */}
          <BiaTuSach tenChang="Tuổi giữa đời" />
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <h2>Tôi đang soát lại những điều người ta hay hiểu lầm về cổ học.</h2>
          <p className="lede">
            Mỗi hiểu lầm sẽ được đặt cạnh điều sách xưa thật sự viết và điều khoa học đã biết. Phần này chỉ được công bố
            sau khi người có chuyên môn đã đọc soát từng mục.
          </p>
          <div className="grid g2">
            <article className="card">
              <h3>Những hiểu lầm về Tử Vi, Bát Tự và các môn khác</h3>
              <p>
                Bạn sẽ đọc được, ví dụ, vì sao một “năm hạn” không làm rủi ro tăng vọt, và sách xưa thật sự nói gì về
                chữ “khắc”.
              </p>
              <span className="tag">Đang soát</span>
            </article>
          </div>
        </div>
      </section>

      <BaiVietCua cua="tri" />

      <BaCuaKhac
        hienTai="tri"
        tieuDe="Ngôi nhà này còn hai cánh cửa khác."
        loiDan="Cả ba cánh cửa cùng mở vào một ngôi nhà. Khi bạn cần, bạn cứ sang cửa bên cạnh."
      />
      <LoiMoiNhanThu />
      <HieuUngTrangCon />
    </main>
  );
}

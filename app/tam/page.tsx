import Link from "next/link";
import { BaiVietCua } from "@/components/trang-con/BaiVietCua";
import { BaCuaKhac } from "@/components/trang-con/BaCuaKhac";
import { HieuUngTrangCon } from "@/components/trang-con/HieuUngTrangCon";
import { BuoiSoi, SauDieuKhongLam } from "@/components/trang-con/KhoiCuaTam";
import { LienKetNgoai } from "@/components/trang-con/LienKetNgoai";
import { LoiMoiGuiCauHoi } from "@/components/trang-con/LoiMoiGuiCauHoi";
import { ManDau } from "@/components/trang-con/ManDau";
import { NguongBinhMinh } from "@/components/trang-con/NguongBinhMinh";
import { doors, doorStyle } from "@/lib/doors";
import { siteConfig } from "@/site.config";
import { taoMetadata } from "@/lib/seo";
import "@/styles/trang-con.css";

export const metadata = taoMetadata({
  tieuDe: "Cửa Tâm – An Tâm Mệnh",
  moTa: "Nếu bạn đã hỏi nhiều nơi mà lòng vẫn chưa yên, An Tâm Mệnh là nơi Khai Minh và những người đồng hành ngồi cùng bạn, cho tới ngày bạn tự bước đi được.",
  duongDan: "/tam",
});

/**
 * Cửa Tâm (phiên S2): chuyển prototypes/cua-tam.html (K1.9.16), giữ nguyên chữ,
 * màu cửa và mọi phần. Liên kết "#" của bản mẫu được nối vào route ở docs/02;
 * địa chỉ ở antammenh.com chưa chốt thì giữ chữ và gắn `data-can` (docs/07, A6).
 */
export default function CuaTam() {
  const { lienKetNgoai } = siteConfig;

  return (
    <main id="main" className="km-con" data-door="tam" style={doorStyle("tam")}>
      <ManDau
        nhan={
          <>
            <span className="dk-seal" aria-hidden="true">
              {doors.tam.han}
            </span>
            CỬA TÂM · AN TÂM MỆNH
          </>
        }
        tieuDe="Khi lòng chưa yên, bạn không phải đi một mình."
        soi="Có thể bạn đã hỏi nhiều nơi, nghe nhiều lời phán, và mỗi lần trở về nhà, nỗi lo lại nặng thêm một chút."
        moDau="Nếu bạn đã hỏi nhiều nơi mà lòng vẫn chưa yên, An Tâm Mệnh là nơi tôi và những người đồng hành ngồi cùng bạn, cho tới ngày bạn tự bước đi được."
      >
        <a className="btn" href="#bac-thang">
          Bắt đầu bằng bảng tự soi
        </a>
        <Link className="soft" href="/hien-chuong">
          Đọc Hiến chương trước khi bắt đầu
        </Link>
      </ManDau>
      <NguongBinhMinh cau="Lòng người không yên lại chỉ sau một đêm. Nó lắng dần, như mặt sơn qua từng lần mài." />

      <section className="s">
        <div className="wrap">
          <h2>Con đường đi qua bốn chặng, và đích đến là ngày bạn không cần tôi nữa.</h2>
          <p className="lede">
            Tâm thường đi từ lúc bị cuốn đi, tới lúc biết dừng lại, rồi chuyển hóa, và tìm về sự an. Mỗi chặng dưới đây
            là một bước trên con đường ấy.
          </p>
          <div className="grid g4">
            <article className="card">
              <span className="n">1</span>
              <h3>Soi</h3>
              <p>Bạn tự quan sát mình trước bằng một bảng hỏi ngắn, rồi chúng ta mới đặt lá số bên cạnh.</p>
            </article>
            <article className="card">
              <span className="n">2</span>
              <h3>Thấu</h3>
              <p>Trong hai mươi mốt ngày, bạn ghi lại những lúc tâm mình bị cuốn đi, để thấy nó thường bắt đầu từ đâu.</p>
            </article>
            <article className="card">
              <span className="n">3</span>
              <h3>Chuyển</h3>
              <p>Chúng ta cùng chọn một thực tập vừa sức, rồi chỉnh dần theo những gì bạn ghi được.</p>
            </article>
            <article className="card">
              <span className="n">4</span>
              <h3>Tốt nghiệp</h3>
              <p>Bạn tự đọc được mình. Ở buổi cuối, tôi trao lại cho bạn mọi điều chúng ta đã cùng ghi.</p>
            </article>
          </div>
          <div className="grid g73 g-tiep">
            {/* Video giới thiệu: chờ chất liệu thật (docs/07, mục B11). */}
            <div className="slot r169" role="img" aria-label="Video giới thiệu" data-can="B11">
              <div>
                <b>Video giới thiệu</b>Khai Minh tự kể về con đường bốn chặng, khoảng hai phút, có phụ đề
              </div>
            </div>
            <div className="card">
              <h3>Vì sao lại là tốt nghiệp?</h3>
              <p>
                Một người đồng hành tốt là người dần trở nên không cần thiết. Tôi đo mình bằng số người đã tự bước đi
                được, chứ không bằng số người còn phải quay lại.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="s" id="bac-thang">
        <div className="wrap">
          <h2>Bạn có thể bắt đầu từ bước nhẹ nhất, và chỉ đi tiếp khi bạn muốn.</h2>
          <p className="lede">
            Trong hai năm đầu dựng ngôi nhà này, tôi đồng hành cùng bạn mà không nhận tiền. Thay cho học phí là{" "}
            <Link className="more" href="/#loi-hen" prefetch={false}>
              bốn lời hẹn
            </Link>
            : có mặt, thực tập, nói thật và trao lại. Bạn có thể dừng lại ở bất cứ bước nào mà không cần giải thích.
          </p>
          <div className="grid g3">
            <article className="card">
              <h3>Bảng tự soi</h3>
              <p>
                Ba mươi câu hỏi giúp bạn nhìn lại cách tâm mình thường phản ứng. Bạn làm một mình, ở nhà, vào một buổi
                tối yên tĩnh.
              </p>
              <span className="tag">Không thu phí</span>
              <LienKetNgoai lk={lienKetNgoai.bangTuSoi} className="more">
                Bắt đầu bảng tự soi
              </LienKetNgoai>
            </article>
            <article className="card">
              <h3>Hồ sơ Soi</h3>
              <p>
                Tôi đặt lá số của bạn cạnh những gì bạn tự quan sát, và chỉ rõ cho bạn cả chỗ khớp lẫn chỗ không khớp.
              </p>
              <span className="tag">Không nhận tiền · hẹn nói thật</span>
            </article>
            <article className="card">
              <h3>Hành trình đồng hành</h3>
              <p>
                Tám đến mười tuần đi qua bốn chặng Soi, Thấu, Chuyển và Tốt nghiệp, có người đồng hành và có nhóm cùng
                thực tập.
              </p>
              <span className="tag">Không nhận tiền · bốn lời hẹn</span>
            </article>
            <article className="card">
              <h3>Trà thất</h3>
              <p>
                Những cuộc trò chuyện riêng và kín đáo, dành cho người muốn đi sâu hơn. Mỗi tháng tôi chỉ nhận tối đa ba
                người mới.
              </p>
              <span className="tag">Không nhận tiền · đã qua Hồ sơ Soi</span>
            </article>
            <article className="card">
              <h3>Chứng nhận Tổng Mệnh Học™</h3>
              <p>
                Chương trình dành cho người đã tốt nghiệp và muốn đồng hành cùng người khác. Chương trình sẽ mở khi đã
                đủ điều kiện.
              </p>
              <span className="tag">Sắp mở</span>
            </article>
          </div>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <h2>Bên trong ngôi nhà có hai căn phòng và một khoảng sân chung.</h2>
          <div className="grid g3">
            <article className="card">
              <h3>Phòng soi Khai Mệnh</h3>
              <p>
                Nơi bạn lập lá số và đọc những điều các môn cổ học nói về mình, luôn kèm lời nhắc rằng đó là giả thuyết
                để bạn tự kiểm.
              </p>
              <LienKetNgoai lk={lienKetNgoai.khaiMenh} className="more">
                Ghé phòng soi
              </LienKetNgoai>
            </article>
            <article className="card">
              <h3>Phòng chuyển Khai Tâm</h3>
              <p>Nơi giữ những thực tập theo từng trạng thái của tâm, cùng cuốn nhật ký hai mươi mốt ngày.</p>
              <LienKetNgoai lk={lienKetNgoai.khaiTam} className="more">
                Ghé phòng chuyển
              </LienKetNgoai>
            </article>
            <article className="card">
              <h3>Khoảng sân chung</h3>
              <p>Cộng đồng nơi mọi người cùng học, cùng thực tập, và hỏi nhau những điều khó nói với người ngoài.</p>
              <LienKetNgoai lk={lienKetNgoai.congDong} className="more">
                Ghé khoảng sân
              </LienKetNgoai>
            </article>
          </div>
        </div>
      </section>

      <BuoiSoi />

      <SauDieuKhongLam />

      <BaiVietCua cua="tam" />

      <BaCuaKhac
        hienTai="tam"
        tieuDe="Ngôi nhà này còn hai cánh cửa khác."
        loiDan="Cả ba cánh cửa cùng mở vào một ngôi nhà. Khi bạn cần, bạn cứ sang cửa bên cạnh."
      />
      <LoiMoiGuiCauHoi />
      <HieuUngTrangCon />
    </main>
  );
}

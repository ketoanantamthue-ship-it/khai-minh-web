import type { ReactNode } from "react";
import { doors, doorStyle, type DoorKey } from "@/lib/doors";
import { siteConfig } from "@/site.config";
import { BaCuaHieuUng } from "./BaCuaHieuUng";

/**
 * Phần III · Ba cửa (`#ba-cua`): lá thư "Trước khi bạn bước vào" và cổng
 * tam quan An Tâm Mệnh. Mỗi cửa gõ thì mở ra một phòng; màu cửa lấy từ
 * lib/doors.ts. Khi không có JavaScript, phòng hiện sẵn (styles/trang-chu-them.css).
 */

const Ii = ({ children }: { children: ReactNode }) => (
  <svg className="ii" viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

/** Hai cánh cửa gỗ và khe sáng giữa hai cánh. */
const HaiCanh = () => (
  <>
    <i className="tq-lv l" aria-hidden="true">
      <i className="pn pn-t" />
      <i className="pn pn-b" />
      <i className="kh" />
    </i>
    <i className="tq-lv r" aria-hidden="true">
      <i className="pn pn-t" />
      <i className="pn pn-b" />
      <i className="kh" />
    </i>
    <i className="tq-seam" aria-hidden="true" />
  </>
);

function Gian({
  cua,
  tenPhong,
  nhan,
  tenCua,
  danhCho,
  children,
}: {
  cua: DoorKey;
  tenPhong: string;
  nhan: string;
  tenCua: string;
  danhCho: string;
  children: ReactNode;
}) {
  const d = doors[cua];
  return (
    <article className={`tq-bay b-${cua}`} style={doorStyle(cua)}>
      <div className="tq-sign">
        <span className="tq-han" aria-hidden="true">
          {d.han}
        </span>
        <span className="tq-sn">CỬA {d.ten.toUpperCase()}</span>
      </div>
      <div className="tq-frame">
        <div className="room" id={`room-${cua}`}>
          <p className="rk">
            <span className="rk-seal" aria-hidden="true">
              {d.han}
            </span>
            {tenPhong}
          </p>
          {children}
          <button className="shut" type="button">
            Khép cửa lại
          </button>
        </div>
        <button className="tq-door" type="button" aria-expanded="false" aria-controls={`room-${cua}`} aria-label={nhan}>
          <HaiCanh />
          <span className="tq-label">
            <span className="tq-name">{tenCua}</span>
            <span className="tq-for">{danhCho}</span>
            <span className="tq-knock">
              <span className="m">Chạm để gõ cửa</span>
              <span className="d">Bấm để gõ cửa</span>
            </span>
          </span>
        </button>
      </div>
    </article>
  );
}

export function BaCua() {
  return (
    <section className="hall" id="ba-cua" aria-labelledby="h-gates">
      <div className="hall-glow" aria-hidden="true" />
      <div className="hall-in">
        <div className="letter" id="letter3">
          <p className="hk">TRƯỚC KHI BẠN BƯỚC VÀO</p>
          <p className="ln">Có thể bạn đã hỏi nhiều nơi.</p>
          <p className="ln">Có người nói bạn “số khổ”, có người bảo phải làm lễ mới qua được.</p>
          <p className="ln">Bạn về nhà, nỗi lo vẫn còn nguyên, chỉ nặng thêm một chút.</p>
          <p className="ln ln-gap">Tôi không thêm một lời phán nào nữa vào nỗi lo ấy.</p>
          <p className="ln">Tôi chỉ ngồi cùng bạn, và cùng bạn nhìn cho rõ.</p>
          <span className="seal3" aria-hidden="true">
            明
          </span>
        </div>
        <div className="descend" id="descend" aria-hidden="true" />
        <header className="gates-head">
          <p className="hk">BA CÁNH CỬA</p>
          <h2 id="h-gates">Ngôi nhà của tôi có ba cánh cửa, và cánh nào cũng dẫn về cùng một chỗ.</h2>
          <p className="lede3">
            Khi lòng bạn rối, có cửa tâm. Khi bạn muốn hiểu cho rõ, có cửa trí. Khi cơ thể bạn mỏi mệt, có cửa thân.
          </p>
        </header>
        <div className="tq" id="tamquan">
          <div className="tq-top">
            <svg className="tq-roof" viewBox="0 0 1000 130" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="tqRoofG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3A1610" />
                  <stop offset="1" stopColor="#170806" />
                </linearGradient>
                <radialGradient id="tqMoon">
                  <stop offset="0" stopColor="#FFF4D6" />
                  <stop offset=".55" stopColor="#E2C27A" />
                  <stop offset="1" stopColor="#E2C27A" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                className="tq-r1"
                d="M0 84 Q24 104 54 106 L946 106 Q976 104 1000 84 Q978 94 950 94 L878 68 L122 68 L50 94 Q22 94 0 84Z"
              />
              <g className="tq-tiles">
                {Array.from({ length: 46 }, (_, i) => {
                  const x = 140 + i * 16;
                  const lech = x < 500 ? -2 : 2;
                  return <line key={x} x1={x} y1="70" x2={x + lech} y2="104" />;
                })}
              </g>
              <path
                className="tq-r2"
                d="M296 66 Q318 50 344 48 L656 48 Q682 50 704 66 Q684 58 660 58 L628 28 L372 28 L340 58 Q316 58 296 66Z"
              />
              <line className="tq-ridge" x1="372" y1="28" x2="628" y2="28" />
              <circle className="tq-halo" cx="500" cy="16" r="16" fill="url(#tqMoon)" />
              <circle className="tq-moon" cx="500" cy="16" r="6" />
            </svg>
            <div className="tq-plaque">
              <span className="tq-ph" aria-hidden="true">
                安 心 命
              </span>
              <span className="tq-pv">An Tâm Mệnh · Một ngôi nhà, ba cánh cửa</span>
            </div>
          </div>
          <div className="tq-bays">
            <Gian
              cua="tam"
              tenPhong="CỬA TÂM · AN TÂM MỆNH"
              nhan="Mở cửa tâm: An Tâm Mệnh"
              tenCua="An Tâm Mệnh"
              danhCho="Cánh cửa này dành cho bạn khi đêm nào cũng nghĩ mãi một chuyện, mà không có ai để nói cùng."
            >
              <p>
                Nếu bạn đã hỏi nhiều nơi mà lòng vẫn chưa yên, tôi đồng hành để bạn tự nhìn rõ mình, cho tới ngày bạn tự
                bước đi được.
              </p>
              <ul>
                <li className="rm-li">
                  <Ii>
                    <path d="M5 20c2-5 7-3 8-8s4-6 6-8" />
                    <circle cx="5" cy="20" r="1.3" />
                    <circle cx="19" cy="4" r="1.3" />
                  </Ii>
                  <span>
                    <b>Hành trình đồng hành</b> trong tám đến mười tuần, theo phương pháp Soi – Thấu – Chuyển.
                  </span>
                </li>
                <li className="rm-li">
                  <Ii>
                    <circle cx="12" cy="9" r="5.5" />
                    <path d="M12 14.5V21M9 21h6" />
                  </Ii>
                  <span>
                    <b>Phòng soi Khai Mệnh</b> giúp bạn đặt lá số cạnh điều bạn tự quan sát về mình.
                  </span>
                </li>
                <li className="rm-li">
                  <Ii>
                    <path d="M7.5 15h9l-1.3 4H8.8z" />
                    <path d="M12 4c2.3 3 2.3 5.5 0 8-2.3-2.5-2.3-5 0-8z" />
                  </Ii>
                  <span>
                    <b>Phòng chuyển Khai Tâm</b> giữ những thực tập và cuốn nhật ký hai mươi mốt ngày.
                  </span>
                </li>
                <li className="rm-li">
                  <Ii>
                    <path d="M4 10h13v2.5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z" />
                    <path d="M17 11h1.3a2.6 2.6 0 0 1 0 5.2H16" />
                    <path d="M8 3.5c0 1.5 1 1.5 1 3M12 3.5c0 1.5 1 1.5 1 3" />
                  </Ii>
                  <span>
                    <b>Trà thất</b> dành cho những cuộc trò chuyện riêng; mỗi tháng tôi nhận tối đa ba người mới.
                  </span>
                </li>
              </ul>
              <div className="room-act">
                <a className="read" href={`${doors.tam.href}#bac-thang`}>
                  Bắt đầu bằng bảng tự soi
                </a>
                <a className="room-more" href={doors.tam.href}>
                  Vào hẳn cửa tâm
                </a>
              </div>
            </Gian>
            <Gian
              cua="tri"
              tenPhong="CỬA TRÍ"
              nhan="Mở cửa trí: Sách và những gì tôi giữ gìn"
              tenCua="Sách và những gì tôi giữ gìn"
              danhCho="Cánh cửa này dành cho bạn khi đã nghe quá nhiều lời đồn về tuổi hạn và số mệnh, và muốn biết điều gì là thật."
            >
              <p>
                Tôi viết, soạn và đọc cùng bạn, để những hiểu biết xưa được giữ lại cho đúng, và ai cũng đọc được.
              </p>
              <ul>
                <li className="rm-li">
                  <Ii>
                    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
                    <path d="M4 20.5V5.5" />
                  </Ii>
                  <span>
                    <b>Sách Soi – Thấu – Chuyển</b> đang được viết.
                  </span>
                </li>
                <li className="rm-li">
                  <Ii>
                    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
                    <path d="M9 10.5l2 2 4-4" />
                  </Ii>
                  <span>
                    <b>Từ điển và Chuẩn Chính Tín</b> được mở cho mọi người cùng dùng.
                  </span>
                </li>
                <li className="rm-li">
                  <Ii>
                    <path d="M5.5 4v15M9.5 4v15M13 6l4 13" />
                    <path d="M3 20h18" />
                  </Ii>
                  <span>
                    <b>Tủ sách</b> gợi ý ba cuốn cho mỗi chặng đời.
                  </span>
                </li>
              </ul>
              {/* Bản thật chưa có nơi nhận thư: không mời nhận thư (docs/07, mục A18). */}
              {siteConfig.moLoiThu ? (
                <div className="room-act">
                  <a className="room-more" href={`${doors.tri.href}#thu`}>
                    Nhận thư hằng tháng của tôi
                  </a>
                </div>
              ) : null}
            </Gian>
            <Gian
              cua="than"
              tenPhong="CỬA THÂN · TRẦN Y THƯ"
              nhan="Mở cửa thân: Dưỡng sinh Trần Y Thư"
              tenCua="Dưỡng sinh Trần Y Thư"
              danhCho="Cánh cửa này dành cho bạn khi cơ thể mỏi mệt, mà bạn vẫn quen chịu đựng một mình."
            >
              <p>
                Tôi chia sẻ cách chăm sóc thân thể thuận tự nhiên, từ nền tảng của một dược sĩ và những trang cổ thư có
                dẫn nguồn.
              </p>
              <ul>
                <li className="rm-li">
                  <Ii>
                    <path d="M5 19C5 11 11 5 20 5c0 9-6 15-14 15" />
                    <path d="M5 19l8-8" />
                  </Ii>
                  <span>
                    <b>Thập Bổ</b>: mười cách bồi bổ thân thể theo lẽ tự nhiên, mỗi cách có nguồn và nhãn tin cậy.
                  </span>
                </li>
              </ul>
              <div className="room-act">
                <a className="room-more" href={doors.than.href}>
                  Đọc bài dưỡng sinh đầu tiên
                </a>
              </div>
            </Gian>
          </div>
          <div className="tq-base" aria-hidden="true" />
          <p className="tq-root">
            Ba cánh cửa này là cách ngôi nhà An Tâm Mệnh được dựng lên: một gốc chung là nhân quả và Tâm, và ba lối vào
            cho ba nỗi bận lòng của đời người.
          </p>
        </div>
        <p className="root3">
          Sau cả ba cánh cửa là cùng một điều: nhân quả và Tâm, những lời hứa trong <a href="#loi-hua">Hiến chương</a>,
          và việc tôi luôn nói rõ điều gì đã chắc, điều gì còn chưa biết.
        </p>
      </div>
      <BaCuaHieuUng />
    </section>
  );
}

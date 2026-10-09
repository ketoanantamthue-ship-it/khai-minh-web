import { NgoiLaiCauHoi, PhuChanDung } from "./NguoiGiuHieuUng";

/**
 * Phần V · Người giữ những câu hỏi (`#nguoi-giu`): chân dung, câu chuyện
 * quầy thuốc, ba câu hỏi để ngồi lại, và bốn điều tự kiểm chứng.
 * Các khung nét góc (ảnh, chữ ký, số chứng chỉ) chờ chất liệu thật (docs/07).
 */
export function NguoiGiu() {
  return (
    <section className="keeper" id="nguoi-giu" aria-labelledby="h-keeper">
      <div className="grid">
        <div className="kp-pcol">
          {/* Ảnh chân dung khổ 4:5 (docs/07, mục B2). */}
          <PhuChanDung>
            <div data-can="B2">
              <b>Ảnh chân dung</b>Khổ 4:5, ánh sáng cửa sổ
            </div>
          </PhuChanDung>
          <p className="kp-cap">
            <b>Khai Minh</b>Dược sĩ, người khai vấn của An Tâm Mệnh
          </p>
        </div>
        <div className="kp-letter">
          <p className="hk">NGƯỜI GIỮ NHỮNG CÂU HỎI</p>
          <h2 id="h-keeper">
            Tôi không biết trước đời bạn. Điều tôi biết là cách ngồi lại với một câu hỏi cho đến khi nó tự mở ra.
          </h2>
          <p className="position">Tôi không thêm gì vào bạn. Tôi cùng bạn mài đi những gì đang phủ lên lòng mình.</p>
          <div className="kp-story">
            <p>
              Nhiều năm làm dược sĩ, tôi gặp rất nhiều người đến hỏi một thứ thuốc để ngủ được. Có những người, sau vài
              câu chuyện, tôi hiểu điều họ cần không nằm trong hộp thuốc. Họ cần một người chịu ngồi nghe trọn câu hỏi
              của mình.
            </p>
            <p>
              Câu hỏi ấy đưa tôi đến với cổ học Việt và Phật học, và tôi đã học khoảng mười bốn năm. Tôi xem các môn ấy
              là những tấm gương để mỗi người tự soi, không phải là cách nói trước tương lai.
            </p>
            <p className="kp-turn">
              Tôi không đứng trước bạn để phán. Tôi ngồi bên cạnh bạn, cầm một ngọn đèn, và chúng ta cùng nhìn.
            </p>
          </div>
          <div className="kp-sign">
            {/* Chữ ký tay quét thành SVG (docs/07, mục B4). */}
            <div className="slot signature" role="img" aria-label="Khung chữ ký tay" data-can="B4">
              <div>
                <b>Chữ ký tay</b>
              </div>
            </div>
            <span className="kp-seal" aria-hidden="true">
              明
            </span>
          </div>
          <div className="kp-cta">
            <a className="kp-ask" href="#gui-cau-hoi" data-topic="q">
              Gửi tôi một câu hỏi
            </a>
            <a className="go" href="/khai-minh">
              Đọc câu chuyện của tôi
            </a>
          </div>
        </div>
      </div>

      <NgoiLaiCauHoi />

      <div className="kp-proof">
        <h3 className="kp-ph">Bạn không cần tin lời tôi. Đây là những điều bạn có thể tự kiểm chứng.</h3>
        <p className="kp-psub">
          Một người đáng để bạn gửi câu hỏi thì phải chịu được việc bị kiểm tra. Tôi để sẵn ở đây.
        </p>
        <ul className="kp-list">
          <li>
            <span className="kp-g">
              <span>藥</span>DƯỢC
            </span>
            <span className="kp-b">Tôi là dược sĩ.</span>
            <span className="kp-s">Số chứng chỉ hành nghề dược của tôi được ghi ngay dưới đây để bạn tra cứu.</span>
            {/* Có hiện số chứng chỉ hay không, và số nào (docs/07, mục D2). */}
            <div className="slot kp-cc" role="img" aria-label="Khung số chứng chỉ hành nghề" data-can="D2">
              <div>
                <b>Số chứng chỉ hành nghề</b>
              </div>
            </div>
          </li>
          <li>
            <span className="kp-g">
              <span>學</span>HỌC
            </span>
            <span className="kp-b">Tôi đã học khoảng mười bốn năm.</span>
            <span className="kp-s">
              Tên sách, tên người thầy và nơi tôi đã học được kể đầy đủ trong câu chuyện của tôi.
            </span>
            <a className="kp-a" href="/khai-minh">
              Đọc câu chuyện ›
            </a>
          </li>
          <li>
            <span className="kp-g">
              <span>約</span>ƯỚC
            </span>
            <span className="kp-b">Tôi công khai chín lời hứa.</span>
            <span className="kp-s">
              Mỗi lời hứa ghi rõ cách bạn kiểm chứng và gốc của nó, và bạn có quyền nhắc tôi khi tôi làm chưa đúng.
            </span>
            <a className="kp-a" href="#loi-hua">
              Xem chín lời hứa ›
            </a>
          </li>
          <li>
            <span className="kp-g">
              <span>淨</span>TỊNH
            </span>
            <span className="kp-b">Tôi không bán lễ giải hạn, bùa hay vật phẩm.</span>
            <span className="kp-s">Nếu có ai nhân danh tôi để bán những thứ ấy, xin bạn báo cho tôi biết.</span>
            <a className="kp-a" href="#gui-cau-hoi" data-topic="md">
              Báo cho tôi ›
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

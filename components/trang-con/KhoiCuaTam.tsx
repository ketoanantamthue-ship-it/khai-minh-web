import Link from "next/link";

/**
 * Hai khối của Cửa Tâm (prototypes/cua-tam.html), dùng chung với trang
 * /cach-toi-dong-hanh (docs/02, mục 3: “một buổi khai vấn diễn ra thế nào,
 * điều tôi không làm”).
 */

/** “Một buổi Soi kéo dài khoảng chín mươi phút…”, kèm khung ảnh trà thất. */
export function BuoiSoi() {
  return (
    <section className="s">
      <div className="wrap grid g73 g-dau">
        <div>
          <h2>Một buổi Soi kéo dài khoảng chín mươi phút, và bạn luôn biết trước điều gì sẽ diễn ra.</h2>
          <ul className="list">
            <li>Chúng ta thống nhất những gì sẽ làm, và những gì được giữ kín.</li>
            <li>Bạn tự trả lời một bảng quan sát nhỏ về chính mình.</li>
            <li>Chúng ta mở lá số và đặt nó cạnh điều bạn vừa thấy về mình.</li>
            <li>Tôi chỉ cho bạn cả chỗ khớp lẫn chỗ không khớp.</li>
            <li>Bạn ra về với một thực tập nhỏ cho hai mươi mốt ngày.</li>
          </ul>
        </div>
        {/* Ảnh trà thất: chờ chất liệu thật (docs/07, mục B11). */}
        <div className="slot r45" role="img" aria-label="Ảnh trà thất" data-can="B11">
          <div>
            <b>Ảnh trà thất</b>Bàn gỗ, ánh chiều, ấm trà, không có khách
          </div>
        </div>
      </div>
    </section>
  );
}

/** “Có sáu điều tôi đã nguyện sẽ không bao giờ làm.” */
export function SauDieuKhongLam() {
  return (
    <section className="s">
      <div className="wrap">
        <h2>Có sáu điều tôi đã nguyện sẽ không bao giờ làm.</h2>
        <ul className="list">
          <li>Tôi không tiên đoán, và không đoán ngày mất hay thọ yểu của bất kỳ ai.</li>
          <li>Tôi không ngăn cản một cuộc hôn nhân vì tuổi, và không nói một người con “khắc” cha mẹ mình.</li>
          <li>
            Tôi không bán lễ giải hạn, không dọa về vong, mồ mả hay sao hạn, và không kiếm tiền từ nỗi sợ.
          </li>
          <li>Tôi không xem khổ đau là sự trừng phạt, và không phán xét nghiệp của bất kỳ ai.</li>
          <li>
            Tôi không thay thế bác sĩ, luật sư hay nhà tâm lý, và không bao giờ khuyên bạn ngừng điều trị.
          </li>
          <li>Tôi không xưng là bậc thầy tâm linh, và không trục lợi từ lòng tin của bạn.</li>
        </ul>
        <p className="hc-link">
          <Link href="/hien-chuong">Đọc Hiến chương đầy đủ, có nguồn lời dạy của Đức Phật cho từng điều</Link>
        </p>
      </div>
    </section>
  );
}

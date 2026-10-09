import Link from "next/link";

/**
 * Lời mời cuối trang Cửa Tâm và trang chặng (`section.end` của bản mẫu).
 * Bản mẫu dẫn về index.html#gui-cau-hoi; web dẫn về trang /gui-cau-hoi
 * (docs/02; docs/07, mục E9), trang này dựng ở phiên S5.
 */
export function LoiMoiGuiCauHoi() {
  return (
    <section className="end">
      <div className="wrap">
        <h2>Nếu có một câu hỏi bạn chưa nói với ai, bạn có thể gửi cho tôi.</h2>
        <p>
          Tôi đọc từng câu hỏi, và tôi trả lời mọi lời nhắn trong ngày. Mỗi tháng tôi chỉ nhận tối đa ba người mới để
          đồng hành riêng.
        </p>
        <div className="cta">
          <Link className="btn" href="/gui-cau-hoi">
            Gửi một câu hỏi cho Khai&nbsp;Minh
          </Link>
        </div>
      </div>
    </section>
  );
}

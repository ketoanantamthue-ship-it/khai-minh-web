import type { CSSProperties } from "react";
import { SU_KIEN } from "@/lib/su-kien";
import { KhoiTra } from "./KhoangLangHieuUng";
import { NutSuKien } from "./NutSuKien";

/**
 * Phần VIII · Một khoảng lặng (`#khoang-lang`): ngồi lặng chín mươi giây.
 * Video rót trà và giọng đọc còn chờ chất liệu thật (docs/07, mục B5).
 */
export function KhoangLang() {
  return (
    <section className="lacquer still" id="khoang-lang" aria-labelledby="h-still">
      <div className="grid">
        <KhoiTra>
          <div data-can="B5">
            <b>Video rót trà</b>Vòng lặp 8–12 giây, không tiếng
          </div>
        </KhoiTra>
        <div>
          <div className="kp-lamp st-lamp" aria-hidden="true" style={{ "--q": 2 } as CSSProperties}>
            <i />
            <b />
          </div>
          <p className="hk">MỘT KHOẢNG LẶNG</p>
          <h2 id="h-still">Nếu hôm nay bạn chưa muốn đọc gì, bạn có thể chỉ ngồi lặng.</h2>
          <p>Bạn chỉ cần chín mươi giây để thở chậm cùng tôi, và không có câu hỏi nào cần trả lời.</p>
          <NutSuKien className="btn-line" id="openBreath" suKien={SU_KIEN.ngoiLang}>
            Ngồi lặng cùng tôi chín mươi giây
          </NutSuKien>
          <div className="slot st-audio" role="img" aria-label="Khung âm thanh giọng đọc" data-can="B5">
            <div>
              <b>Giọng đọc chậm, khoảng ba phút</b>Khai Minh đọc một đoạn kinh ngắn, để bạn nghe khi khó ngủ
            </div>
          </div>
          <p className="st-night">
            Nếu bạn đang thức lúc hai giờ sáng, bạn không cần đọc tiếp. Bạn cứ ngồi lại đây một lúc.{" "}
            <a href="#binh-minh">Xem lại bốn giờ của một đêm dài ›</a>
          </p>
        </div>
      </div>
    </section>
  );
}

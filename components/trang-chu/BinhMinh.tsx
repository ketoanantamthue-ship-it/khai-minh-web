import { BonGio, PhuSonToi } from "./BonGio";

/**
 * Phần IV · Bốn giờ của một đêm (`#binh-minh`): dải chuyển từ sơn mài tối
 * sang giấy sáng. Lớp sơn tối bị mài dần theo nhịp cuộn (PhuSonToi).
 */
export function BinhMinh() {
  return (
    <section className="dawn" id="binh-minh" aria-labelledby="dawn-line">
      <div className="dawn-in">
        <span className="dawn-rule" aria-hidden="true" />
        <p className="hk hk-ink">TỪ NỬA ĐÊM RA ÁNH SÁNG</p>
        <p className="dawn-line" id="dawn-line">
          Câu hỏi thường đến lúc nửa đêm. Sự bình an thường đến chậm hơn, khi lòng mình đã lắng như mặt sơn sau nhiều
          lần mài.
        </p>
      </div>
      <div className="hours">
        <p className="hours-h">Một đêm dài thường đi qua bốn giờ như thế này. Bạn đang ở giờ nào?</p>
        <BonGio
          gio={[
            {
              gio: "2 GIỜ SÁNG",
              tang: "Cuốn",
              ta: "Bạn nằm nhìn trần nhà. Một ý nghĩ cứ quay đi quay lại, và càng cố ngủ, bạn lại càng tỉnh.",
            },
            {
              gio: "4 GIỜ SÁNG",
              tang: "Dừng",
              ta: "Bạn ngồi dậy, rót một ly nước, và lần đầu tiên gọi được đúng tên điều đang làm mình sợ.",
            },
            {
              gio: "5 GIỜ SÁNG",
              tang: "Chuyển",
              ta: "Bạn thấy nỗi sợ ấy có hình dạng, có chỗ bắt đầu, và không lớn như mình vẫn tưởng.",
            },
            {
              gio: "6 GIỜ SÁNG",
              tang: "An",
              ta: "Trời hửng sáng. Câu hỏi vẫn còn đó, nhưng bạn không còn phải ôm nó một mình.",
            },
          ]}
        />
        <p className="hours-close">
          Bạn không cần đi qua bốn giờ ấy một mình. Ngôi nhà này được dựng lên để có một người ngồi cùng bạn, từ giờ thứ
          nhất cho tới khi trời sáng.
        </p>
      </div>
      <PhuSonToi />
    </section>
  );
}

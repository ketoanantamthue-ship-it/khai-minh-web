import { TieuVuTruHieuUng } from "./TieuVuTruHieuUng";

/**
 * Phần II · Tiểu vũ trụ (`#micro`): muôn sao thu về một điểm sáng
 * (Kinh Rohitassa). Năm nhịp chữ hiện lần lượt theo nhịp cuộn; ở chế độ tĩnh
 * cả năm nhịp xếp dọc, không có canvas.
 */
export function TieuVuTru() {
  return (
    <section className="micro" id="micro" aria-labelledby="h-micro">
      <div className="micro-stick">
        <TieuVuTruHieuUng />
        <div className="micro-text">
          <div className="mb mb1" id="mb1">
            <p className="mk">MỘT TIỂU VŨ TRỤ</p>
            <p className="mt">Người xưa nói mỗi con người là một tiểu vũ trụ.</p>
            <p className="ms">
              Vậy mà có những đêm, giữa hàng tỉ vì sao, bạn thấy mình nhỏ bé đến mức không ai nghe thấy.
            </p>
          </div>
          <div className="mb mb2" id="mb2">
            <p className="mt big">Bạn đã đi bao xa để tìm một câu trả lời?</p>
            <p className="ms">
              Bạn đã ngước lên trời, đã hỏi nhiều thầy, đã xem nhiều lá số. Mỗi nơi cho bạn một lời phán, và lòng bạn
              vẫn chưa yên.
            </p>
          </div>
          <div className="mb mb3" id="mb3">
            <p className="mk">MỘT CÂU CHUYỆN TRONG KINH</p>
            <p className="mt">Có một vị tiên từng muốn đi tới tận cùng thế giới.</p>
            <p className="ms">
              Ông đi suốt một trăm năm, chỉ dừng lại để ăn, uống và ngủ. Rồi ông qua đời khi vẫn chưa tới nơi.
            </p>
          </div>
          <div className="mb mb4" id="mb4">
            <p className="mk">LỜI ĐỨC PHẬT</p>
            <blockquote className="mq">
              “Chính trong tấm thân dài chừng một sải tay này, có tưởng và có tâm, Như Lai chỉ ra thế giới, nguồn gốc
              của thế giới, sự chấm dứt của thế giới, và con đường đưa đến sự chấm dứt ấy.”
              <cite>Diễn ý Kinh Rohitassa, Tương Ưng Bộ 2.26 và Tăng Chi Bộ 4.45</cite>
            </blockquote>
          </div>
          <div className="mb mb5" id="mb5">
            <p className="mk">BẦU TRỜI BÊN TRONG</p>
            <p className="mt big">Bầu trời mà bạn tìm kiếm bấy lâu đang ở ngay trong bạn.</p>
            <h2 className="ms" id="h-micro">
              Vì vậy tôi không nhìn lên trời để đoán đời bạn. Tôi ngồi cùng bạn để nhìn vào bầu trời bên trong bạn, cho
              tới khi bạn thấy lại ánh sáng của chính mình.
            </h2>
          </div>
        </div>
        <ol className="mdots" aria-hidden="true">
          <li />
          <li />
          <li />
          <li />
          <li />
        </ol>
      </div>
    </section>
  );
}

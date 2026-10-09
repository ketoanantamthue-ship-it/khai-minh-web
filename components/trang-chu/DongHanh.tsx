import type { ReactNode } from "react";
import { doors } from "@/lib/doors";
import { ConDuongTabs } from "./ConDuongTabs";

/**
 * Phần VI · Con đường đồng hành (`#dong-hanh`), kèm `#loi-hen` (bốn lời hẹn).
 * Hai năm đầu không nhận tiền; web không hiện giá (docs/01, mục D2).
 */

function BangTram({
  ten,
  tieuDe,
  loiTua,
  lam,
  camDen,
  mangVe,
  loiHen,
  children,
}: {
  ten: string;
  tieuDe: string;
  loiTua: string;
  lam: string;
  camDen: string;
  mangVe: string;
  loiHen: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="lp-ph">
        <span className="lp-pn">{ten}</span>
        <h3>{tieuDe}</h3>
        <p className="lp-tag">{loiTua}</p>
      </div>
      <dl className="lp-dl">
        <div>
          <dt>Bạn làm</dt>
          <dd>{lam}</dd>
        </div>
        <div>
          <dt>Tôi cầm đèn</dt>
          <dd>{camDen}</dd>
        </div>
        <div>
          <dt>Bạn mang về</dt>
          <dd>{mangVe}</dd>
        </div>
        <div className="lp-cond">
          <dt>Lời hẹn ở trạm này</dt>
          <dd>{loiHen}</dd>
        </div>
      </dl>
      {children}
    </>
  );
}

export function DongHanh() {
  const bangTuSoi = `${doors.tam.href}#bac-thang`;

  return (
    <section className="lp" id="dong-hanh" aria-labelledby="h-ladder">
      <div className="lp-in">
        <p className="lp-k">CÁCH TÔI ĐỒNG HÀNH</p>
        <h2 id="h-ladder">
          Tôi không đi thay bạn. Tôi cầm đèn đi bên cạnh, để bạn thấy rõ từng bước chân của chính mình.
        </h2>
        <p className="lp-lede">
          Con đường có bốn trạm. Bạn bắt đầu từ trạm nhẹ nhất, và chỉ đi tiếp khi bạn thấy mình sẵn sàng. Ở trạm nào,
          bạn cũng có thể dừng lại mà không cần giải thích.
        </p>
        <div className="lp-gift" role="note">
          <span className="lp-gift-k">HAI NĂM ĐẦU</span>
          <p>
            Trong hai năm đầu dựng ngôi nhà này, tôi đồng hành cùng bạn mà không nhận tiền. Điều tôi xin ở bạn là sự
            nghiêm túc, được viết thành bốn lời hẹn ở cuối con đường.
          </p>
        </div>

        <ConDuongTabs
          tram={[
            { so: "TRẠM 1", ten: "Bảng tự soi", hen: "Mở cho mọi người" },
            { so: "TRẠM 2", ten: "Hồ sơ Soi", hen: "Hẹn: nói thật" },
            { so: "TRẠM 3", ten: "Hành trình đồng hành", hen: "Hẹn: bốn lời hẹn" },
            { so: "TRẠM 4", ten: "Trà thất", hen: "Hẹn: đã qua Hồ sơ Soi" },
          ]}
          bang={[
            <BangTram
              key="1"
              ten="TRẠM 1 · TỰ THẮP ĐÈN"
              tieuDe="Bảng tự soi"
              loiTua="Bạn tự thắp ngọn đèn đầu tiên, một mình, ở nhà."
              lam="Bạn trả lời ba mươi câu hỏi về cách tâm mình thường phản ứng, vào một buổi tối yên tĩnh."
              camDen="Tôi chuẩn bị sẵn từng câu hỏi và giải thích vì sao có câu ấy. Nếu bạn không gửi kết quả cho tôi, tôi không giữ lại câu trả lời nào của bạn."
              mangVe="Một bức phác về sáu nét tâm của chính mình, đủ để bạn bắt đầu nhìn mình rõ hơn."
              loiHen="Trạm này không cần lời hẹn nào. Cánh cửa mở cho mọi người."
            >
              <a className="lp-go" href={bangTuSoi}>
                Bắt đầu Bảng tự soi ›
              </a>
            </BangTram>,
            <BangTram
              key="2"
              ten="TRẠM 2 · SOI CHUNG MỘT NGỌN ĐÈN"
              tieuDe="Hồ sơ Soi"
              loiTua="Tôi soi đèn vào lá số, còn bạn soi vào chính đời mình."
              lam="Bạn gửi cho tôi bảng tự soi, ngày giờ sinh, và một câu hỏi bạn đang mang theo."
              camDen="Tôi đặt lá số của bạn cạnh những gì bạn tự quan sát, rồi chỉ rõ cả chỗ khớp lẫn chỗ không khớp. Lá số chỉ là giả thuyết, và bạn là người kiểm chứng."
              mangVe="Một bản hồ sơ viết bằng lời đời thường, kèm vài câu hỏi để bạn tự soi tiếp."
              loiHen="Bạn làm bảng tự soi một cách trung thực, và nói thật với tôi chỗ nào đúng, chỗ nào chưa đúng."
            >
              <a className="lp-go" href="#gui-cau-hoi" data-topic="hoso">
                Gửi thư xin Hồ sơ Soi ›
              </a>
            </BangTram>,
            <BangTram
              key="3"
              ten="TRẠM 3 · ĐI CÙNG NHAU"
              tieuDe="Hành trình đồng hành"
              loiTua="Tôi đi bên cạnh bạn, cho đến ngày bạn tự cầm được đèn."
              lam="Bạn đi tám đến mười tuần qua bốn chặng Soi, Thấu, Chuyển và Tốt nghiệp, cùng một nhóm nhỏ từ tám đến mười người."
              camDen="Tôi gặp bạn theo lịch đã hẹn, đọc nhật ký của bạn, và hỏi lại đúng chỗ bạn đang vướng. Tôi không quyết định thay bạn."
              mangVe="Một nếp thực tập bạn tự giữ được, và một ngày tốt nghiệp, khi bạn không còn cần tôi cầm đèn nữa."
              loiHen="Bạn giữ trọn bốn lời hẹn được viết ở bên dưới."
            >
              <a className="lp-go" href="#gui-cau-hoi" data-topic="dong">
                Gửi thư xin đi cùng ›
              </a>
            </BangTram>,
            <BangTram
              key="4"
              ten="TRẠM 4 · NGỒI RIÊNG BÊN ẤM TRÀ"
              tieuDe="Trà thất"
              loiTua="Có những điều chỉ nói được khi chỉ còn hai người và một ấm trà."
              lam="Bạn mang đến một câu chuyện cần được nói riêng, kín đáo, không qua nhóm."
              camDen="Tôi dành cho bạn những buổi trò chuyện riêng. Mỗi tháng tôi chỉ nhận tối đa ba người mới, để không ai phải đi vội."
              mangVe="Một chỗ an toàn để bạn nói hết, và những bước tiếp theo do chính bạn chọn."
              loiHen="Bạn đã đi qua Hồ sơ Soi, để chúng ta có chung một ngôn ngữ trước khi ngồi riêng."
            >
              <a className="lp-go" href="#gui-cau-hoi" data-topic="tra">
                Hỏi về Trà thất ›
              </a>
            </BangTram>,
          ]}
        />

        <div className="lp-vows" id="loi-hen">
          <h3 className="lp-vh">Bốn lời hẹn thay cho học phí</h3>
          <p className="lp-vs">Bạn không trả cho tôi bằng tiền. Bạn giữ cho con đường này sáng bằng bốn điều dưới đây.</p>
          <ol className="lp-vl">
            <li>
              <span className="lp-vg">
                <span aria-hidden="true">到</span>
                <em>CÓ MẶT</em>
              </span>
              <span className="lp-vb">Bạn đi trọn chặng đường đã nhận.</span>
              <span className="lp-vt">
                Nếu cần vắng, bạn báo trước. Nếu vắng hai buổi liền mà không báo, bạn nhường chỗ cho người đang chờ.
              </span>
            </li>
            <li>
              <span className="lp-vg">
                <span aria-hidden="true">行</span>
                <em>THỰC TẬP</em>
              </span>
              <span className="lp-vb">Bạn thực tập đều mỗi ngày.</span>
              <span className="lp-vt">
                Mỗi ngày bạn dành mười lăm phút để thực tập và viết ba dòng nhật ký quán tâm. Thời gian không nhiều,
                nhưng cần đều đặn.
              </span>
            </li>
            <li>
              <span className="lp-vg">
                <span aria-hidden="true">誠</span>
                <em>NÓI THẬT</em>
              </span>
              <span className="lp-vb">Bạn nói thật, kể cả khi tôi sai.</span>
              <span className="lp-vt">
                Bạn kể thật về đời mình, và phản hồi thật về những gì tôi nói, kể cả khi phản hồi ấy cho thấy tôi đã nhìn
                sai.
              </span>
            </li>
            <li>
              <span className="lp-vg">
                <span aria-hidden="true">傳</span>
                <em>TRAO LẠI</em>
              </span>
              <span className="lp-vb">Bạn trao lại một điều cho ngôi nhà.</span>
              <span className="lp-vt">
                Khi tốt nghiệp, bạn chọn trao lại một điều: một lời góp ý, một buổi ngồi nghe người mới, hoặc câu chuyện
                của bạn đã đổi tên. Câu chuyện chỉ được dùng khi bạn đồng ý bằng văn bản.
              </span>
            </li>
          </ol>
          <p className="lp-vclose">
            Bốn lời hẹn này không để ràng buộc bạn. Chúng giữ cho ngọn đèn không bị phí, vì mỗi chỗ ngồi bạn nhận là một
            chỗ mà người khác đang chờ.
          </p>
          <div className="lp-why">
            <div>
              <h4>Vì sao tôi không nhận tiền</h4>Tôi đang dựng ngôi nhà này cùng những người đầu tiên. Điều tôi cần lúc này
              không phải là tiền, mà là những hành trình thật để phương pháp được kiểm chứng một cách trung thực. Trong
              thời gian ấy, tôi không nhận tiền, quà hay phong bì dưới bất kỳ tên gọi nào.
            </div>
            <div>
              <h4>Sau hai năm</h4>Nếu có điều gì thay đổi, tôi sẽ báo trước trên chính trang này. Người đang đi giữa hành
              trình sẽ được đi trọn như đã hẹn, không phát sinh bất kỳ khoản nào.
            </div>
          </div>
          <div className="lp-cta">
            <a className="lp-go" href="#gui-cau-hoi" data-topic="dong">
              Gửi thư xin đồng hành ›
            </a>
            <a className="lp-alt" href={bangTuSoi}>
              Hoặc bắt đầu với Bảng tự soi, không cần hẹn ›
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

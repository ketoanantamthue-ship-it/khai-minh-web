import { hrefGuiCauHoi } from "@/lib/lien-ket";
import { siteConfig } from "@/site.config";
import { MoCaChinDieu } from "./MoCaChinDieu";

/**
 * Phần VII · Chín điều hứa (`#loi-hua`, `#dieu-1` … `#dieu-9`, `#khi-sai`).
 * Mỗi điều là một <details>: đọc được trọn khi không có JavaScript.
 */

export type Dieu = {
  dau: string;
  ten: string;
  phu: string;
  lam: string;
  kiem: string;
  nhan: { lop: "k" | "n" | "p"; chu: string };
  goc: string;
};

const { ngayMai } = siteConfig.khanCap;

/** Báo cáo minh bạch hằng năm: dùng ở đây và ở trang /minh-bach#bao-cao. */
export const LOI_BAO_CAO =
  "Tôi không đặt ở đây những con số đẹp nhưng chưa có thật. Mỗi năm, tôi công bố một báo cáo minh bạch, kể cả khi kết quả không đẹp.";
export const BAO_CAO = [
  { ten: "Kết quả kiểm chứng", khi: "Công bố sau đợt đồng hành đầu tiên" },
  { ten: "Số người tốt nghiệp", khi: "Cập nhật mỗi năm" },
  { ten: "Lợi ích kinh doanh của tôi", khi: "Công khai ở một trang riêng" },
];

/** Hai điều 8 và 9, dùng lại ở trang /du-lieu và /minh-bach. */
export function dieuSo(so: number): Dieu {
  return NHOM.flatMap((g) => g.dieu)[so - 1]!;
}

const NHOM: { so: string; ten: string; dieu: Dieu[] }[] = [
  {
    so: "壹",
    ten: "VỀ SỰ THẬT",
    dieu: [
      {
        dau: "慎",
        ten: "Tôi không nói trước tương lai",
        phu: "Tôi không gieo nỗi sợ, và không bán lễ giải hạn.",
        lam: "Tôi không nói những câu như “năm nay bạn sẽ gặp nạn” hay “phải cúng mới qua”. Khi một môn cổ học nói về một xu hướng, tôi nói rõ đó là xu hướng để bạn tự soi, không phải là định mệnh.",
        kiem: "Nếu bạn nghe tôi nói một câu khiến bạn sợ hãi về tương lai, bạn có quyền dừng buổi trò chuyện và báo lại cho tôi, kèm số của điều này.",
        nhan: { lop: "k", chu: "Lời Phật dạy · diễn ý" },
        goc: "Kinh Phạm Võng (Trường Bộ, kinh số 1) kể rằng Đức Phật tránh xa việc xem tướng, đoán điềm và nói trước vận hạn để kiếm sống.",
      },
      {
        dau: "實",
        ten: "Tôi luôn nói thật",
        phu: "Kể cả khi lá số và đời bạn không khớp nhau.",
        lam: "Trong mỗi hồ sơ, tôi ghi riêng những chỗ lá số khớp với đời bạn và những chỗ không khớp. Tôi không lặng lẽ bỏ đi những chỗ không khớp.",
        kiem: "Bạn nhìn vào mục “Chỗ chưa khớp” trong hồ sơ của mình. Nếu mục ấy trống mà bạn thấy có chỗ chưa đúng, bạn nhắc tôi.",
        nhan: { lop: "k", chu: "Lời Phật dạy · diễn ý" },
        goc: "Kinh Vương Tử Vô Úy (Trung Bộ, kinh số 58): Đức Phật chỉ nói điều đúng sự thật và có lợi ích, vào đúng lúc, kể cả khi điều ấy khó nghe.",
      },
      {
        dau: "標",
        ten: "Mỗi điều đều có nhãn tin cậy",
        phu: "Bạn biết đâu là niềm tin, đâu là điều đã được kiểm chứng.",
        lam: "Mỗi bài viết và mỗi hồ sơ đều mang nhãn cho biết điều ấy là lời dạy có nguồn, kinh nghiệm được truyền lại, giả thuyết cần kiểm chứng, hay điều đã được kiểm chứng.",
        kiem: "Bạn tìm nhãn ở cuối mỗi bài và mỗi hồ sơ. Một điều không có nhãn là một lỗi của tôi, và bạn có quyền hỏi lại.",
        nhan: { lop: "k", chu: "Lời Phật dạy · diễn ý" },
        goc: "Kinh Canki (Trung Bộ, kinh số 95): người giữ gìn sự thật nói “đây là niềm tin của tôi”, chứ không khẳng định “chỉ điều này là đúng”.",
      },
    ],
  },
  {
    so: "貳",
    ten: "VỀ CON ĐƯỜNG CỦA BẠN",
    dieu: [
      {
        dau: "轉",
        ten: "Đời bạn luôn có thể chuyển",
        phu: "Vì nghiệp là điều bạn đang làm hôm nay.",
        lam: "Tôi không gắn cho bạn một số phận cố định. Mỗi điều tôi soi đều đi kèm một việc nhỏ mà bạn có thể làm ngay từ hôm nay.",
        kiem: "Sau mỗi buổi, bạn mang về ít nhất một việc cụ thể nằm trong tầm tay mình. Nếu bạn ra về chỉ với một lời phán, tôi đã làm chưa đúng điều này.",
        nhan: { lop: "k", chu: "Lời Phật dạy · diễn ý" },
        goc: "Tăng Chi Bộ, chương Sáu Pháp, kinh số 63: Đức Phật dạy rằng chính ý muốn dẫn đến hành động là nghiệp.",
      },
      {
        dau: "成",
        ten: "Tôi đồng hành để bạn tự bước đi",
        phu: "Đích đến là ngày bạn không cần tôi nữa.",
        lam: "Mỗi hành trình đều có ngày tốt nghiệp. Ở buổi cuối, tôi trao lại cho bạn mọi điều chúng ta đã cùng ghi, để bạn tự đi tiếp.",
        kiem: "Bạn biết trước ngày kết thúc ngay từ buổi đầu. Tôi không kéo dài hành trình, và không mời bạn quay lại khi bạn không cần.",
        nhan: { lop: "k", chu: "Lời Phật dạy · diễn ý" },
        goc: "Kinh Đại Bát Niết Bàn (Trường Bộ, kinh số 16): “Hãy tự mình làm ngọn đèn cho chính mình.”",
      },
      {
        dau: "安",
        ten: "An toàn của bạn trên hết",
        phu: "Cùng với quyền tự quyết định của bạn.",
        lam: "Khi bạn đang ở trong khủng hoảng, tôi ưu tiên giúp bạn đến được nơi hỗ trợ phù hợp, trước mọi buổi trò chuyện. Mọi quyết định về đời bạn vẫn là của bạn.",
        // Số Ngày Mai chỉ hiện khi đội vận hành đã gọi thử (docs/07, mục D5).
        kiem: ngayMai.hotlineDaXacNhan
          ? `Số cấp cứu 115 và ${ngayMai.ten} ${ngayMai.so.replace(/ /g, " ")} luôn có ở cuối mỗi trang. Bạn có thể dừng lại bất cứ lúc nào mà không cần giải thích.`
          : "Số cấp cứu 115 luôn có ở cuối mỗi trang. Bạn có thể dừng lại bất cứ lúc nào mà không cần giải thích.",
        nhan: { lop: "k", chu: "Lời Phật dạy · diễn ý" },
        goc: "Kinh Kalama (Tăng Chi Bộ, chương Ba Pháp, kinh số 65): Đức Phật khuyên người nghe tự mình kiểm nghiệm, không tin chỉ vì lời truyền lại hay vì người nói là thầy.",
      },
    ],
  },
  {
    so: "參",
    ten: "VỀ TRÁCH NHIỆM CỦA TÔI",
    dieu: [
      {
        dau: "醫",
        ten: "Tôi không thay thế bác sĩ",
        phu: "Và không bao giờ khuyên bạn ngừng điều trị.",
        lam: "Khi câu chuyện của bạn chạm đến sức khỏe thân thể hay tinh thần, tôi khuyên bạn gặp bác sĩ hoặc chuyên gia phù hợp. Tôi không bao giờ bảo bạn bỏ thuốc.",
        kiem: "Nếu bạn đang điều trị, bạn cứ kể. Tôi sẽ hỏi bạn đã trao đổi với bác sĩ chưa, chứ không nói thay lời bác sĩ.",
        nhan: { lop: "n", chu: "Nghề nghiệp" },
        goc: "Lời hứa này đến từ nghề dược của tôi, không từ một bản kinh. Tôi ghi rõ như vậy để bạn biết lời hứa này dựa vào đâu.",
      },
      {
        dau: "密",
        ten: "Thông tin của bạn được giữ kín",
        phu: "Bạn có quyền xem, sửa và xóa bất cứ lúc nào.",
        lam: "Tôi chỉ hỏi những thông tin cần cho câu hỏi của bạn. Tôi không bán, không chia sẻ, và không dùng câu chuyện của bạn khi chưa có sự đồng ý bằng văn bản.",
        kiem: "Bạn gửi yêu cầu xem, sửa hoặc xóa dữ liệu ở trang Dữ liệu của bạn. Tôi báo lại cho bạn khi việc ấy đã làm xong.",
        nhan: { lop: "p", chu: "Pháp luật" },
        goc: "Quy định của pháp luật Việt Nam về bảo vệ dữ liệu cá nhân.",
      },
      {
        dau: "明",
        ten: "Lợi ích của tôi được công khai",
        phu: "Bạn luôn biết ai đang nói với bạn và vì sao.",
        lam: "Mọi hoạt động kinh doanh của tôi đều được kể ở một trang riêng. Khi tôi nhắc đến một cuốn sách hay một sản phẩm mà tôi có lợi ích, tôi nói rõ ngay tại chỗ.",
        kiem: "Bạn đọc trang Minh bạch lợi ích, rồi đối chiếu với những gì tôi giới thiệu ở bất cứ đâu.",
        nhan: { lop: "k", chu: "Lời Phật dạy · diễn ý" },
        goc: "Kinh Đại Tứ Thập (Trung Bộ, kinh số 117) giảng về chánh mạng, tức là nuôi sống mình một cách chân chính.",
      },
    ],
  },
];

/** `noiKhac`: khối được đặt ở trang /hien-chuong; lời góp ý dẫn sang /gui-cau-hoi. */
export function LoiHua({ noiKhac }: { noiKhac?: boolean } = {}) {
  let so = 0;
  return (
    <section className="promises" id="loi-hua" aria-labelledby="h-prom">
      <div className="in">
        <div className="hc-head">
          <div>
            <p className="hk hk-ink">HIẾN CHƯƠNG · NHỮNG LỜI HỨA</p>
            <h2 id="h-prom">Chín điều tôi hứa với bạn, và giữ bằng hành động.</h2>
            <p className="hc-lede">
              Một lời hứa chỉ có giá trị khi bạn kiểm tra được nó. Vì vậy, mỗi điều dưới đây đều ghi rõ việc tôi làm,
              cách bạn kiểm chứng, và gốc của lời hứa ấy.
            </p>
          </div>
          <div className="hc-meta">
            <dl>
              <div>
                <dt>VĂN BẢN</dt>
                <dd>Hiến chương An Tâm Mệnh, bản công bố 1.0</dd>
              </div>
              <div>
                <dt>HIỆU LỰC TỪ</dt>
                <dd>
                  {/* Ngày hiệu lực Hiến chương (docs/07, mục C8). */}
                  <span className="hc-slot" data-can="C8">
                    Ngày công bố
                  </span>
                </dd>
              </div>
              <div>
                <dt>NGƯỜI CAM KẾT</dt>
                <dd>Khai Minh, dược sĩ và người khai vấn</dd>
              </div>
              <div>
                <dt>SỬA ĐỔI</dt>
                <dd>Mỗi lần sửa đổi đều được ghi lại ngày và lý do, công khai cho mọi người xem.</dd>
              </div>
            </dl>
          </div>
        </div>
        <MoCaChinDieu />
        <div className="hc-groups">
          {NHOM.map((g) => (
            <div className="hc-group" key={g.ten}>
              <h3 className="hc-gh">
                <b aria-hidden="true">{g.so}</b>
                {g.ten}
              </h3>
              {g.dieu.map((d) => {
                so++;
                return (
                  <details className="hc-item" id={`dieu-${so}`} key={so}>
                    <summary>
                      <span className="hc-seal" aria-hidden="true">
                        {d.dau}
                      </span>
                      <span>
                        <span className="hc-n">ĐIỀU {so}</span>
                        <span className="hc-t">{d.ten}</span>
                        <span className="hc-s">{d.phu}</span>
                      </span>
                      <span className="hc-pm" aria-hidden="true" />
                    </summary>
                    <dl className="hc-body">
                      <div>
                        <dt>Việc tôi làm</dt>
                        <dd>{d.lam}</dd>
                      </div>
                      <div>
                        <dt>Bạn kiểm chứng bằng cách</dt>
                        <dd data-can={so === 6 && !ngayMai.hotlineDaXacNhan ? "D5: số Ngày Mai chờ xác nhận" : undefined}>
                          {d.kiem}
                        </dd>
                      </div>
                      <div className="hc-src">
                        <dt>Gốc của lời hứa</dt>
                        <dd>
                          <span className={`hc-tag ${d.nhan.lop}`}>{d.nhan.chu}</span>
                          {d.goc}
                        </dd>
                      </div>
                    </dl>
                  </details>
                );
              })}
            </div>
          ))}
        </div>
        <div className="hc-acc" id="khi-sai">
          <h3>Khi tôi làm chưa đúng một điều</h3>
          <ol>
            <li>
              <b>Bạn gửi cho tôi một dòng.</b>Bạn ghi số của điều ấy và điều bạn đã thấy, ở mục{" "}
              {siteConfig.moLoiThu ? (
                <a href={hrefGuiCauHoi(noiKhac, "hc")} data-topic="hc">
                  Gửi câu hỏi
                </a>
              ) : (
                // Chữ Hiến chương giữ nguyên; bản thật chưa có lá thư nên không dẫn đi đâu (docs/07, mục A18).
                <span data-can="A18">Gửi câu hỏi</span>
              )}
              .
            </li>
            <li>
              <b>Tôi trả lời bạn trong bảy ngày.</b>Tôi trả lời bằng tên thật của mình, và nói rõ tôi sẽ sửa điều gì.
            </li>
            <li>
              <b>Lỗi được ghi lại công khai.</b>Nếu tôi sai, lỗi ấy có mặt trong báo cáo minh bạch năm đó, kể cả khi nó
              không đẹp.
            </li>
          </ol>
        </div>
        <div className="transp">
          <p className="tp-h">{LOI_BAO_CAO}</p>
          <div className="tp-row">
            {BAO_CAO.map((b) => (
              <div key={b.ten}>
                <span className="tv">—</span>
                <b>{b.ten}</b>
                <span>{b.khi}</span>
              </div>
            ))}
          </div>
          <a className="tp-link" href="/hien-chuong#lich-su-sua-doi">
            Đọc Hiến chương đầy đủ, kèm lịch sử sửa đổi
          </a>
        </div>
        <div className="hc-sign">
          <span className="kp-seal" aria-hidden="true">
            明
          </span>
          <p>
            Tôi đặt tên mình dưới chín điều này, và tự nguyện để bạn kiểm tra.<span>Khai Minh</span>
          </p>
        </div>
      </div>
    </section>
  );
}

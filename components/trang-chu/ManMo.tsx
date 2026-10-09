import type { Chang } from "@/lib/chang";
import { duongDanChang } from "@/lib/chang";
import { NGUOI_HOI, SU_KIEN } from "@/lib/su-kien";
import { BuiVang } from "./BuiVang";
import { ChinChangDieuKhien } from "./ChinChangDieuKhien";
import { NGUOI_HOI_CHU } from "./chu";
import { KHUNG_CAO, KHUNG_RONG, veDuongKham } from "./duong-kham";
import { NutSuKien } from "./NutSuKien";

/**
 * Phần I · Chín chặng đời (`#openSec`, docs/03 mục 4).
 *
 * Chữ của chín chặng đọc từ content/chang/*.mdx và nằm sẵn trong HTML:
 * tên và câu hỏi ở hai danh sách chặng, toàn bộ lời chia sẻ ở chín thẻ
 * trong `#panel`. ChinChangDieuKhien và BuiVang chỉ thêm hiệu ứng.
 * Khi không có JavaScript, CSS (styles/trang-chu-them.css) hiện danh sách
 * dọc và cả chín thẻ để đọc được trọn.
 */

const so2 = (k: number) => String(k + 1).padStart(2, "0");

export function ManMo({ chang }: { chang: Chang[] }) {
  const duong = veDuongKham();
  const macDinh = chang[4]!;

  return (
    <section className="lacquer open" id="openSec" aria-labelledby="h1">
      <BuiVang />

      <div className="intro">
        <h1 id="h1" className="reveal-1">
          <span className="a">Đời người có chín chặng.</span>
          <span className="b">Chặng nào cũng có những câu hỏi ta chỉ dám hỏi mình lúc nửa đêm.</span>
        </h1>
        <p className="second reveal-2">
          <b>Tôi là Khai&nbsp;Minh: người khai vấn, người viết sách, và một dược sĩ.</b> Tôi không trả lời thay bạn.
          Tôi ngồi cùng bạn, đủ lâu để bạn tự thấy.
        </p>
        <div className="hero-cta reveal-2">
          <a className="cta-main" href="#chang">
            Chọn chặng đời của bạn
          </a>
          <NutSuKien className="cta-soft" id="heroBreath" suKien={SU_KIEN.ngoiLang}>
            Hoặc ngồi lặng chín mươi giây
          </NutSuKien>
        </div>
      </div>

      <div className="life" id="chang">
        <h2 className="pick-h" id="chon-chang">
          Bạn chạm vào chặng đời đang làm mình bận lòng.
        </h2>
        <p className="pick-sub">
          Mỗi chặng mở ra một câu hỏi, một lời chia sẻ có dẫn nguồn, và những bước bạn có thể đi tiếp.
        </p>
        <p className="ask">Có khi câu hỏi không phải cho mình, mà cho một người mình thương. Bạn đang lo cho ai?</p>
        <div className="asker" role="group" aria-label="Bạn đang hỏi cho ai">
          {NGUOI_HOI.map((a) => (
            <button key={a} type="button" data-a={a} aria-pressed="false">
              {NGUOI_HOI_CHU[a].nhan}
            </button>
          ))}
        </div>
        <p className="asker-note" id="askerNote" aria-live="polite" />
        <p className="road-hint">
          <span aria-hidden="true" />
          Bạn rê chuột lên một chặng để xem trước. Bấm vào chặng ấy để đọc trọn lời chia sẻ.
        </p>
        <div className="line-wrap" id="lineWrap">
          <svg
            className="line-svg"
            id="lineSvg"
            viewBox={`0 0 ${KHUNG_RONG} ${KHUNG_CAO}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="sheenGrad">
                <stop offset="0" stopColor="#FFF3D1" stopOpacity=".95" />
                <stop offset=".35" stopColor="#E2C27A" stopOpacity=".45" />
                <stop offset="1" stopColor="#E2C27A" stopOpacity="0" />
              </radialGradient>
              <mask id="lineMask" maskUnits="userSpaceOnUse">
                <path id="maskPath" d={duong.d} fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
              </mask>
            </defs>
            <path className="groove" id="groove" d={duong.d} />
            <path className="inlay a" id="inlayA" d={duong.d} />
            <path className="inlay b" id="inlayB" d={duong.d} />
            <path className="lit" id="lit" d={duong.d} />
            <g mask="url(#lineMask)">
              <ellipse className="sheen" id="sheen" cx="-200" cy="60" rx="140" ry="40" />
            </g>
            <g id="eggs">
              {duong.vo.map((v, k) => (
                <path
                  key={k}
                  className="egg"
                  d={v.d}
                  transform={`translate(${v.x} ${v.y}) rotate(${v.xoay}) scale(1.35)`}
                />
              ))}
            </g>
          </svg>
          <ol className="stages" id="stagesDesk" aria-label="Chín chặng đời">
            {chang.map((c, k) => (
              <li key={c.slug}>
                <button
                  type="button"
                  className="stage-btn"
                  aria-expanded="false"
                  aria-controls="panel"
                  aria-label={`Chặng ${k + 1}: ${c.ten}. Bấm để đọc chặng này.`}
                >
                  <span className="sb-k">
                    {so2(k)}
                    <i aria-hidden="true">{c.han_tu}</i>
                  </span>
                  <span className="sb-n">{c.ten}</span>
                  <span className="sb-go">
                    Đọc chặng này<i aria-hidden="true">›</i>
                  </span>
                  <em className="tap">Bấm để mở</em>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="peek" id="peek" aria-live="polite">
          <div className="pk-l">
            <p className="pk-k" id="pkK">
              Chặng 5 · {macDinh.han_tu} · {macDinh.ten}
            </p>
            <p className="pk-feel" id="pkFeel">
              {macDinh.khi_nao}.
            </p>
          </div>
          <p className="pk-q" id="pkQ">
            “{macDinh.cau_hoi_chinh}”
          </p>
          <button className="pk-go" id="pkGo" type="button">
            <span id="pkGoT">Đọc trọn chặng {macDinh.ten} </span>
            <i aria-hidden="true">›</i>
          </button>
        </div>
        <div className="vlist" id="stagesMob" aria-label="Chín chặng đời" role="group">
          <div className="vlit" id="vlit" aria-hidden="true" />
          {chang.map((c, k) => (
            <button key={c.slug} type="button" aria-expanded="false" aria-controls="panel">
              <span className="num">
                {so2(k)}
                <i className="hz" aria-hidden="true">
                  {c.han_tu}
                </i>
              </span>
              <span className="nm">{c.ten}</span>
              <small>{c.khi_nao}</small>
              <span className="open-tag">
                Đọc<i aria-hidden="true"> ›</i>
              </span>
              <em className="tap">Chạm để đọc chặng này</em>
            </button>
          ))}
        </div>
      </div>

      <div className="fade-down" aria-hidden="true" />
      <div className="panel" id="panel" aria-live="polite">
        <div className="in">
          <div className="sheet-bar">
            <span id="sheetTitle">
              Chặng 5 · {macDinh.ten}
            </span>
            <button type="button" className="sheet-x" id="sheetClose">
              Đóng
            </button>
          </div>
          {chang.map((c, k) => (
            <TheChang key={c.slug} c={c} k={k} truoc={chang[k - 1]} sau={chang[k + 1]} />
          ))}
        </div>
      </div>

      <ChinChangDieuKhien
        chang={chang.map((c) => ({ ten: c.ten, han: c.han_tu, khiNao: c.khi_nao, cauHoi: c.cau_hoi_chinh }))}
      />
    </section>
  );
}

/** Một chặng trong `#panel`: thẻ `.card` của bản mẫu, chữ dựng phía server. */
function TheChang({ c, k, truoc, sau }: { c: Chang; k: number; truoc?: Chang; sau?: Chang }) {
  return (
    <article className="card" id={`chang-${c.slug}`} data-k={k} tabIndex={-1} aria-labelledby={`ten-${c.slug}`}>
      <div>
        <h2 className="stage-name" id={`ten-${c.slug}`}>
          {c.ten}
        </h2>
        <p className="stage-age">
          <span aria-hidden="true">{c.han_tu} · </span>
          {c.do_tuoi}
        </p>
        <div className="hand">
          <q>{c.cau_hoi_chinh}</q>
          <canvas className="polish" aria-hidden="true" />
          {/* Chỗ đặt ảnh câu hỏi viết tay trên giấy dó (docs/07, mục B6). */}
          <span className="slot-tag" data-can="B6">
            Chỗ đặt câu hỏi viết tay
          </span>
        </div>
        <p className="polish-note">
          Bạn lướt tay hoặc rê chuột trên mặt sơn để mài lộ câu hỏi. Người thợ sơn mài cũng mài như thế để thấy lớp màu
          nằm bên dưới.
          <i>Tâm này vốn sáng, chỉ bị che bởi những bụi bặm từ bên ngoài. (Diễn ý Tăng Chi Bộ 1.51)</i>
        </p>
      </div>
      <div className="answer">
        <div>
          <p className="soi">{c.soi}</p>
          {c.tra_loi.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
        {c.loi_an_toan ? <p className="safe-note">{c.loi_an_toan}</p> : null}
        <div className="meta">
          <span>
            <b>Nguồn:</b> <span>{c.nguon}</span>
          </span>
          <span>
            <b>Mức tin cậy:</b> <span className={`badge ${c.lopTinCay}`}>{c.muc_tin_cay}</span>
          </span>
        </div>
        <a className="read" href={duongDanChang(c)}>
          Đọc trọn bài
        </a>
        <p className="more-label">Những câu hỏi khác ở chặng này</p>
        <ul className="more-q">
          {c.cau_hoi_lien_quan.map((q) => (
            <li key={q}>
              {/* Chưa có bài hỏi – đáp nào (docs/07, mục C1). */}
              <a data-can="C1">{q}</a>
            </li>
          ))}
        </ul>
        <div className="pn">
          <button type="button" data-den={k - 1} disabled={!truoc}>
            {truoc ? `Chặng trước: ${truoc.ten}` : "Đây là chặng đầu tiên"}
          </button>
          <button type="button" data-den={k + 1} disabled={!sau}>
            {sau ? `Chặng sau: ${sau.ten}` : "Đây là chặng cuối cùng"}
          </button>
        </div>
      </div>
    </article>
  );
}

"use client";

import { Fragment, useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { useCheDoTinh } from "@/lib/dung-moi-truong";
import { CHU_DE_THU, type ChuDeThu } from "./chu";

/**
 * Tiêu đề "chữ thấm vào giấy": từng chữ hiện dần khi cuộn tới (bản mẫu V2).
 * Chữ nằm sẵn trong HTML; khi chưa có JavaScript, CSS hiện đủ chữ.
 */
export function ChuTham({ id, chu }: { id: string; chu: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const tinh = useCheDoTinh();
  const [toi, setToi] = useState(false);
  const on = toi || tinh;

  useEffect(() => {
    const h = ref.current;
    if (!h || tinh) return;
    if (!("IntersectionObserver" in window)) {
      const r = requestAnimationFrame(() => setToi(true));
      return () => cancelAnimationFrame(r);
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting) {
          setToi(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(h);
    return () => io.disconnect();
  }, [tinh]);

  const tu = chu.split(" ");
  return (
    <h2 id={id} className={on ? "inkwrite on" : "inkwrite"} ref={ref}>
      {tu.map((w, i) => (
        <Fragment key={i}>
          <span className="w" style={{ transitionDelay: `${i * 70}ms` }}>
            {w}
          </span>
          {i < tu.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}

const CHU_DE: { ma: ChuDeThu; nhan: string }[] = [
  { ma: "q", nhan: "Một câu hỏi tôi đang mang" },
  { ma: "hoso", nhan: "Xin Hồ sơ Soi" },
  { ma: "dong", nhan: "Xin đi cùng hành trình" },
  { ma: "tra", nhan: "Hỏi về Trà thất" },
  { ma: "hc", nhan: "Góp ý một điều trong Hiến chương" },
  { ma: "md", nhan: "Báo người mạo danh tôi" },
];

const DIEU = [
  "Không nói trước tương lai",
  "Luôn nói thật",
  "Nhãn tin cậy",
  "Đời luôn có thể chuyển",
  "Đồng hành để bạn tự bước đi",
  "An toàn trên hết",
  "Không thay thế bác sĩ",
  "Giữ kín thông tin",
  "Lợi ích được công khai",
];

/**
 * Lá thư gửi Khai Minh (bản mẫu K1.9.9): chọn chủ đề, ô viết, phiếu đồng ý.
 * Các liên kết có `data-topic` ở khắp trang chủ chọn sẵn chủ đề tương ứng; ở
 * trang /gui-cau-hoi, chủ đề đến từ tham số `?chu-de=` của địa chỉ.
 *
 * Bản xem trước: chưa gửi đi đâu, như bản mẫu. Phiên S5 nối nơi nhận thư,
 * chống spam và trang cảm ơn (docs/06; docs/07, mục A5, E3). Bản thật chưa có
 * nơi nhận thư thì không dựng lá thư (GuiCauHoi, `siteConfig.moLoiThu`).
 */
const khongDoi = () => () => {};

function docChuDeTuDiaChi(): ChuDeThu | null {
  const ma = new URLSearchParams(window.location.search).get("chu-de");
  return ma && ma in CHU_DE_THU ? (ma as ChuDeThu) : null;
}

export function ThuGuiToi() {
  // Trang /gui-cau-hoi: chủ đề do liên kết ở trang khác mang theo (lib/lien-ket.ts).
  const tuDiaChi = useSyncExternalStore(khongDoi, docChuDeTuDiaChi, () => null);
  const [daChon, setChuDe] = useState<ChuDeThu | null>(null);
  const chuDe: ChuDeThu = daChon ?? tuDiaChi ?? "q";
  const [loiNhan, setLoiNhan] = useState<{ chu: string; loi: boolean } | null>(null);
  const oViet = useRef<HTMLTextAreaElement>(null);
  const oDongY = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bam = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[data-topic]");
      const ma = a?.getAttribute("data-topic");
      if (ma && ma in CHU_DE_THU) setChuDe(ma as ChuDeThu);
    };
    document.addEventListener("click", bam);
    return () => document.removeEventListener("click", bam);
  }, []);

  const gui = (e: FormEvent) => {
    e.preventDefault();
    const t = oViet.current;
    const ok = oDongY.current;
    if (!t || !ok) return;
    if (!t.value.trim()) {
      setLoiNhan({ chu: "Bạn viết giúp tôi câu hỏi trước khi gửi nhé.", loi: true });
      t.focus();
      return;
    }
    if (!ok.checked) {
      setLoiNhan({ chu: "Bạn đánh dấu ô đồng ý để tôi được đọc câu hỏi này nhé.", loi: true });
      ok.focus();
      return;
    }
    setLoiNhan({
      chu: "Tôi đã nhận được lá thư của bạn. Cảm ơn bạn đã tin mà gửi cho tôi. Tôi sẽ hồi âm trong ngày.",
      loi: false,
    });
    t.value = "";
  };

  const [nhanO, nhacNho] = CHU_DE_THU[chuDe];

  return (
    // Biểu mẫu chưa gửi thư đi đâu (docs/07, mục A5, E3).
    <form id="askForm" noValidate onSubmit={gui} data-can="A5: chưa có nơi nhận thư">
      <fieldset className="sd-topic">
        <legend>Bạn viết thư về điều gì?</legend>
        <div className="sd-chips">
          {CHU_DE.map((c) => (
            <label className="sd-chip" key={c.ma}>
              <input
                type="radio"
                name="topic"
                value={c.ma}
                checked={chuDe === c.ma}
                onChange={() => setChuDe(c.ma)}
              />
              <span>{c.nhan}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="sd-hint" id="sdHint" aria-live="polite">
        {nhacNho}
      </p>
      <div className="field sd-dieu" id="sdDieu" hidden={chuDe !== "hc"}>
        <label htmlFor="q-dieu">Bạn góp ý về điều số mấy?</label>
        <select id="q-dieu" name="dieu">
          {DIEU.map((d, i) => (
            <option key={d} value={i + 1}>
              Điều {i + 1}: {d}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="q-name">Bạn muốn tôi gọi bạn là gì? (không bắt buộc)</label>
        <input id="q-name" name="ten" type="text" autoComplete="nickname" />
      </div>
      <div className="field">
        <label htmlFor="q-text" id="qLabel">
          {nhanO}
        </label>
        <textarea
          id="q-text"
          name="cau-hoi"
          ref={oViet}
          placeholder="Bạn viết bằng lời của mình, dài ngắn thế nào cũng được."
        />
      </div>
      <div className="field">
        <label htmlFor="q-mail">Địa chỉ thư, nếu bạn muốn nhận lời hồi âm</label>
        <input id="q-mail" name="thu" type="email" autoComplete="email" />
      </div>
      <label className="consent">
        <input type="checkbox" id="q-ok" name="dong-y" ref={oDongY} />
        <span>
          Tôi đồng ý để Khai&nbsp;Minh đọc lá thư này và có thể trả lời trong một bài viết không nêu tên tôi, theo cách
          được nói rõ ở trang Dữ liệu.
        </span>
      </label>
      <button className="submit" type="submit">
        Gửi thư cho Khai&nbsp;Minh
      </button>
      <p className="msg" id="askMsg" aria-live="polite" style={loiNhan?.loi ? { color: "#7A3B10" } : undefined}>
        {loiNhan?.chu}
      </p>
    </form>
  );
}

"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useCheDoTinh, useCoJs } from "@/lib/dung-moi-truong";
import { hrefGuiCauHoi } from "@/lib/lien-ket";

/**
 * Khung ảnh chân dung, phủ một lớp sơn để khách mài lộ người viết
 * (bản mẫu: "V2: mài sơn lộ chân dung"). Chế độ tĩnh: không có lớp sơn.
 */
export function PhuChanDung({ children }: { children: ReactNode }) {
  const khung = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const bat = !useCheDoTinh();
  const [xong, setXong] = useState(false);
  const [daCham, setDaCham] = useState(false);

  useEffect(() => {
    const ps = khung.current;
    const cv = cvRef.current;
    const x = cv?.getContext("2d");
    if (!bat || !ps || !cv || !x) return;

    let done = false;
    let mv = 0;
    let last: [number, number] | null = null;
    let W = 0;
    let H = 0;
    const finish = () => {
      done = true;
      setXong(true);
    };
    function cover() {
      const r = ps!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv!.width = W * dpr;
      cv!.height = H * dpr;
      x!.setTransform(dpr, 0, 0, dpr, 0, 0);
      x!.globalCompositeOperation = "source-over";
      x!.fillStyle = "#120A08";
      x!.fillRect(0, 0, W, H);
      for (let i = 0; i < 900; i++) {
        x!.fillStyle = `rgba(232,205,150,${(Math.random() * 0.05).toFixed(3)})`;
        x!.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 18, 0.6);
      }
      for (let j = 0; j < 120; j++) {
        x!.fillStyle = `rgba(226,194,122,${(0.12 + Math.random() * 0.25).toFixed(2)})`;
        const s = 0.6 + Math.random() * 1.1;
        x!.fillRect(Math.random() * W, Math.random() * H, s, s);
      }
    }
    function sand(px: number, py: number) {
      x!.globalCompositeOperation = "destination-out";
      for (let i = 0; i < 5; i++) {
        x!.fillStyle = `rgba(0,0,0,${(0.16 + Math.random() * 0.22).toFixed(2)})`;
        x!.beginPath();
        x!.ellipse(
          px + (Math.random() - 0.5) * 16,
          py + (Math.random() - 0.5) * 12,
          7 + Math.random() * 13,
          4 + Math.random() * 7,
          (Math.random() - 0.5) * 0.8,
          0,
          6.283,
        );
        x!.fill();
      }
    }
    const onMove = (e: PointerEvent) => {
      if (done) return;
      const r = cv.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      if (last) {
        const dx = px - last[0];
        const dy = py - last[1];
        const n = Math.min(12, Math.ceil(Math.hypot(dx, dy) / 6));
        for (let s = 1; s <= n; s++) sand(last[0] + (dx * s) / n, last[1] + (dy * s) / n);
      } else sand(px, py);
      last = [px, py];
      mv++;
      setDaCham(true);
      if (mv > 70) finish();
    };
    const onLeave = () => {
      last = null;
    };
    const onResize = () => {
      if (!done) cover();
    };
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    cover();
    let hen: number | undefined;
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (es) => {
              if (es[0]?.isIntersecting) {
                hen = window.setTimeout(() => {
                  if (!done) finish();
                }, 9000);
                io?.disconnect();
              }
            },
            { threshold: 0.5 },
          )
        : null;
    io?.observe(ps);
    return () => {
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      window.clearTimeout(hen);
    };
  }, [bat]);

  return (
    <div className="slot portrait" id="portraitSlot" role="img" aria-label="Khung ảnh chân dung" ref={khung}>
      {children}
      {bat ? (
        <>
          <canvas className={xong ? "pcover done" : "pcover"} aria-hidden="true" ref={cvRef} />
          <p className={xong || daCham ? "pnote gone" : "pnote"} aria-hidden="true">
            Bạn lướt tay để mài lộ người viết
          </p>
        </>
      ) : null}
    </div>
  );
}

const BA_CAU = [
  "Lần gần nhất bạn kể hết nỗi lo của mình cho một người, mà không sợ bị phán xét, là khi nào?",
  "Có lời nào ai đó từng phán về đời bạn, mà đến giờ bạn vẫn còn mang theo?",
  "Nếu nỗi lo ấy nhẹ đi một nửa, sáng mai bạn sẽ làm điều gì khác?",
];
const THU_TU = ["CÂU THỨ NHẤT", "CÂU THỨ HAI", "CÂU THỨ BA"];

/**
 * "Trước khi đọc tiếp": ba câu hỏi để ngồi lại, hiện từng câu một
 * (bản mẫu K1.9.6). Khi chưa có JavaScript, cả ba câu xếp dọc.
 * `noiKhac`: đặt ở trang /khai-minh, lời mời gửi thư dẫn sang /gui-cau-hoi.
 */
export function NgoiLaiCauHoi({ noiKhac }: { noiKhac?: boolean } = {}) {
  const js = useCoJs();
  const [i, setI] = useState(0);
  const [xong, setXong] = useState(false);
  const n = BA_CAU.length;

  const tiep = () => {
    if (xong) {
      setXong(false);
      setI(0);
      return;
    }
    if (i < n - 1) {
      setI(i + 1);
      return;
    }
    setXong(true);
  };

  const lop = ["kp-sit", js ? "kp-js" : "", xong ? "kp-done" : ""].filter(Boolean).join(" ");

  return (
    <div className={lop} aria-labelledby="h-kpsit" role="region" style={{ "--q": xong ? 4 : i + 1 } as CSSProperties}>
      <div className="kp-lamp" aria-hidden="true">
        <i />
        <b />
      </div>
      <div className="kp-k">TRƯỚC KHI ĐỌC TIẾP</div>
      <h3 className="kp-h" id="h-kpsit">
        Bạn thử ngồi lại với một câu hỏi. Bạn không cần trả lời thành lời, chỉ cần để nó ở lại với mình một lúc.
      </h3>
      <ol className="kp-qs" aria-live="polite">
        {BA_CAU.map((c, j) => (
          <li
            key={c}
            className={!js || j === i ? "kp-q on" : "kp-q"}
            aria-hidden={js ? j !== i : undefined}
          >
            <span className="kp-qn">{THU_TU[j]}</span>
            <span className="kp-qt">{c}</span>
          </li>
        ))}
      </ol>
      <div className="kp-ctrl">
        <span className="kp-dots" aria-hidden="true">
          {BA_CAU.map((c, j) => (
            <i key={c} className={j <= i || xong ? "on" : undefined} />
          ))}
        </span>
        <span className="kp-count">{xong ? "Đã đi qua ba câu" : `Câu ${i + 1} / ${n}`}</span>
        <button className="kp-next" type="button" onClick={tiep}>
          {xong ? "Ngồi lại từ câu đầu ›" : i === n - 1 ? "Tôi đã ngồi xong ›" : "Câu tiếp theo ›"}
        </button>
      </div>
      <div className="kp-end" hidden={!xong}>
        <div className="kp-et">
          Những câu hỏi như thế là việc tôi làm mỗi ngày. Tôi không trả lời thay bạn. Tôi giữ câu hỏi ấy cùng bạn, đủ lâu
          để bạn tự thấy câu trả lời của mình.
        </div>
        <a className="kp-ego" href={hrefGuiCauHoi(noiKhac, "q")} data-topic="q">
          Gửi tôi câu hỏi bạn đang mang ›
        </a>
      </div>
    </div>
  );
}

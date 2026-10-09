"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { laCheDoTinh, SU_KIEN } from "@/lib/su-kien";
import { BON_GIO_DAP } from "./chu";

type Gio = { gio: string; tang: string; ta: string };

/** Bốn nút giờ, mặt trời nhỏ và lời đáp khi khách chọn một giờ. */
export function BonGio({ gio }: { gio: Gio[] }) {
  const [chon, setChon] = useState<number | null>(null);
  const dap = chon === null ? null : BON_GIO_DAP[chon];

  return (
    <>
      <div className="hours-sky" aria-hidden="true">
        <span
          className={chon === null ? "sun" : "sun on"}
          id="hrSun"
          style={{ "--k": chon ?? 0 } as CSSProperties}
        />
      </div>
      <div className="hours-row" role="group" aria-label="Bạn đang ở giờ nào trong đêm">
        {gio.map((g, i) => (
          <button
            key={g.gio}
            type="button"
            className={`hr hr${i + 1}`}
            aria-pressed={chon === i}
            onClick={() => setChon(i)}
          >
            <span className="hr-t">{g.gio}</span>
            <span className="hr-s">{g.tang}</span>
            <span className="hr-p">{g.ta}</span>
            <span className="hr-me">Tôi đang ở giờ này</span>
          </button>
        ))}
      </div>
      <div
        className={chon === null ? "hours-ans" : `hours-ans at${chon + 1}`}
        id="hrAns"
        aria-live="polite"
        hidden={chon === null}
      >
        <p className="ha-l">{dap?.loi}</p>
        <div className="ha-a">
          {dap ? (
            <a
              className="ha-go"
              href={dap.href}
              onClick={(e) => {
                if (!dap.ngoiLang) return;
                e.preventDefault();
                window.dispatchEvent(new CustomEvent(SU_KIEN.ngoiLang, { detail: e.currentTarget }));
              }}
            >
              {dap.nut} ›
            </a>
          ) : null}
          <p className="ha-safe" hidden={!dap?.anToan}>
            Nếu ý nghĩ ấy là muốn làm hại bản thân, xin bạn gọi cấp cứu 115 hoặc nói ngay với một người thân ở gần.
          </p>
        </div>
      </div>
    </>
  );
}

/** Ngưỡng bình minh: lớp sơn tối bị mài dần theo nhịp cuộn (chế độ tĩnh: không vẽ). */
export function PhuSonToi() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const sec = cv?.parentElement;
    const x = cv?.getContext("2d");
    if (!cv || !sec || !x || laCheDoTinh()) return;

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    let W = 0;
    let H = 0;
    let strokes: { cx: number; cy: number; len: number; th: number; ang: number }[] = [];
    let flecks: [number, number, number, number][] = [];
    let lastP = -1;

    const prog = () => {
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      return Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.85 + r.height * 0.25)));
    };
    const sm = (a: number, b: number, v: number) => {
      const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    function draw(p: number) {
      if (Math.abs(p - lastP) < 0.004) return;
      lastP = p;
      x!.clearRect(0, 0, W, H);
      const base = 1 - sm(0.62, 0.98, p);
      if (base <= 0.001) return;
      x!.globalCompositeOperation = "source-over";
      x!.globalAlpha = base;
      x!.fillStyle = "#0A0806";
      x!.fillRect(0, 0, W, H);
      for (const f of flecks) {
        x!.fillStyle = `rgba(226,194,122,${f[3]})`;
        x!.fillRect(f[0], f[1], f[2], f[2]);
      }
      x!.globalAlpha = 1;
      x!.globalCompositeOperation = "destination-out";
      const k = Math.floor(sm(0.05, 0.9, p) * strokes.length);
      for (let s = 0; s < k; s++) {
        const st = strokes[s]!;
        x!.save();
        x!.translate(st.cx, st.cy);
        x!.rotate(st.ang);
        for (let e = 0; e < 4; e++) {
          x!.fillStyle = `rgba(0,0,0,${(0.18 + ((s * 7 + e) % 5) * 0.06).toFixed(2)})`;
          x!.beginPath();
          x!.ellipse((e - 1.5) * st.len * 0.22, (((s + e) % 3) - 1) * st.th * 0.25, st.len * 0.32, st.th * 0.5, 0, 0, 6.283);
          x!.fill();
        }
        x!.restore();
      }
      x!.globalCompositeOperation = "source-over";
    }
    function build() {
      const r = sec!.getBoundingClientRect();
      const d = Math.min(1.5, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv!.width = W * d;
      cv!.height = H * d;
      x!.setTransform(d, 0, 0, d, 0, 0);
      strokes = [];
      const N = 150;
      const nho = W < 700;
      for (let i = 0; i < N; i++) {
        strokes.push({
          cx: rnd(-0.1, 1.1) * W,
          cy: H * (0.5 + (Math.random() - 0.5) * 0.9 * Math.min(1, 0.25 + i / N)),
          len: Math.max(rnd(0.18, 0.42) * W, nho ? rnd(220, 380) : 0),
          th: nho ? rnd(6, 13) : rnd(10, 24),
          ang: rnd(-0.08, 0.08),
        });
      }
      flecks = [];
      for (let j = 0; j < Math.round((W * H) / 900); j++)
        flecks.push([Math.random() * W, Math.random() * H, rnd(0.5, 1.4), rnd(0.08, 0.35)]);
      lastP = -1;
      draw(prog());
    }
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        draw(prog());
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", build);
    build();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas className="dawn-cover" id="dawnCover" aria-hidden="true" ref={ref} />;
}

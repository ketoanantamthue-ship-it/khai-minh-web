"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useCheDoTinh } from "@/lib/dung-moi-truong";
import { SU_KIEN } from "@/lib/su-kien";
import { NGOI_LANG } from "./chu";

/** Khung video rót trà, có khói trà bay lên (bản mẫu: "V2: khói trà bay lên"). */
export function KhoiTra({ children }: { children: ReactNode }) {
  const khung = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const bat = !useCheDoTinh();

  useEffect(() => {
    const vs = khung.current;
    const cv = cvRef.current;
    const x = cv?.getContext("2d");
    if (!bat || !vs || !cv || !x) return;
    let W = 0;
    let H = 0;
    const P: { x: number; y: number; r: number; a: number; ph: number; v: number }[] = [];
    let vis = false;
    let raf: number | null = null;
    const t0 = performance.now();
    const sz = () => {
      const r = vs.getBoundingClientRect();
      const d = Math.min(1.5, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv.width = W * d;
      cv.height = H * d;
      x.setTransform(d, 0, 0, d, 0, 0);
    };
    const spawn = () =>
      P.push({
        x: W * 0.5 + (Math.random() - 0.5) * W * 0.03,
        y: H * 0.9,
        r: 2 + Math.random() * 2.5,
        a: 0.1 + Math.random() * 0.06,
        ph: Math.random() * 6.28,
        v: 0.45 + Math.random() * 0.35,
      });
    const frame = (now: number) => {
      if (!vis) {
        raf = null;
        return;
      }
      x.clearRect(0, 0, W, H);
      for (let q = 0; q < 2; q++) if (Math.random() < 0.6) spawn();
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i]!;
        p.y -= p.v;
        p.r += 0.035;
        p.a *= 0.991;
        const sway = Math.sin((now - t0) / 1100 + p.ph + p.y * 0.035) * (H * 0.9 - p.y) * 0.12;
        const g = x.createRadialGradient(p.x + sway, p.y, 0, p.x + sway, p.y, p.r);
        g.addColorStop(0, `rgba(236,226,206,${p.a.toFixed(3)})`);
        g.addColorStop(1, "rgba(236,226,206,0)");
        x.fillStyle = g;
        x.beginPath();
        x.arc(p.x + sway, p.y, p.r, 0, 6.283);
        x.fill();
        if (p.y < H * 0.05 || p.a < 0.01) P.splice(i, 1);
      }
      raf = requestAnimationFrame(frame);
    };
    sz();
    window.addEventListener("resize", sz);
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver((es) => {
            vis = !!es[0]?.isIntersecting;
            if (vis && !raf) raf = requestAnimationFrame(frame);
          })
        : null;
    io?.observe(vs);
    return () => {
      vis = false;
      window.removeEventListener("resize", sz);
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [bat]);

  return (
    <div className="slot video" id="stillVideo" role="img" aria-label="Khung video rót trà" ref={khung}>
      {children}
      {bat ? <canvas className="smoke" aria-hidden="true" ref={cvRef} /> : null}
    </div>
  );
}

/**
 * Lớp "Ngồi lặng chín mươi giây" (hộp thoại toàn màn hình). Mở bằng sự kiện
 * SU_KIEN.ngoiLang từ bất kỳ nút nào trên trang; Esc hoặc "Dừng lại" để đóng.
 */
export function NgoiLang() {
  const [mo, setMo] = useState(false);
  const [loi, setLoi] = useState("");
  const [loiHien, setLoiHien] = useState(true);
  const [con, setCon] = useState(0);
  const nutDong = useRef<HTMLButtonElement>(null);
  const nguoiMo = useRef<HTMLElement | null>(null);

  const dong = useCallback(() => {
    setMo(false);
    (nguoiMo.current?.isConnected ? nguoiMo.current : document.getElementById("openBreath"))?.focus();
  }, []);

  useEffect(() => {
    const batDau = (e: Event) => {
      const tu = (e as CustomEvent<unknown>).detail;
      nguoiMo.current = tu instanceof HTMLElement ? tu : null;
      setLoi(NGOI_LANG.batDau);
      setLoiHien(true);
      setCon(90);
      setMo(true);
    };
    window.addEventListener(SU_KIEN.ngoiLang, batDau);
    return () => window.removeEventListener(SU_KIEN.ngoiLang, batDau);
  }, []);

  useEffect(() => {
    if (!mo) return;
    nutDong.current?.focus();
    let t = 90;
    let i = 0;
    const hen: number[] = [];
    const dem = window.setInterval(() => {
      t--;
      setCon(t);
      if (t % 5 === 0 && t > 0) {
        setLoiHien(false);
        hen.push(
          window.setTimeout(() => {
            setLoi(NGOI_LANG.hoiTho[i % 2]!);
            setLoiHien(true);
            i++;
          }, 600),
        );
      }
      if (t <= 0) {
        window.clearInterval(dem);
        setLoi(NGOI_LANG.xong);
      }
    }, 1000);
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dong();
    };
    document.addEventListener("keydown", esc);
    return () => {
      window.clearInterval(dem);
      hen.forEach((h) => window.clearTimeout(h));
      document.removeEventListener("keydown", esc);
    };
  }, [mo, dong]);

  return (
    <div
      className={mo ? "breath on" : "breath"}
      id="breath"
      role="dialog"
      aria-modal="true"
      aria-label="Ngồi lặng chín mươi giây"
    >
      <button className="close" id="closeBreath" type="button" onClick={dong} ref={nutDong}>
        Dừng lại
      </button>
      <div>
        <div className="ring" aria-hidden="true" />
        <p className="say" id="say" aria-live="polite" style={{ opacity: loiHien ? 1 : 0 }}>
          {loi}
        </p>
        <p className="time" id="time">
          {mo && con > 0 ? `Còn ${con} giây` : ""}
        </p>
      </div>
    </div>
  );
}

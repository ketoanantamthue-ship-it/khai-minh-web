"use client";

import { useEffect, useRef } from "react";
import { laCheDoTinh } from "@/lib/su-kien";
import { taoNgauNhien } from "./duong-kham";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const band = (p: number, a: number, b: number) => clamp(Math.min((p - a) / 0.07, (b - p) / 0.07), 0, 1);

/**
 * Canvas "muôn sao thu về một điểm sáng" và năm nhịp chữ theo nhịp cuộn
 * (docs/03, mục 6, hiệu ứng 6). Chế độ tĩnh: thêm lớp `static`, không vẽ.
 */
export function TieuVuTruHieuUng() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mcv = ref.current;
    const mic = document.getElementById("micro");
    const mctx = mcv?.getContext("2d");
    if (!mcv || !mic) return;

    if (laCheDoTinh() || !mctx) {
      mic.classList.add("static");
      return () => mic.classList.remove("static");
    }

    const R = taoNgauNhien(Date.now() % 2147483647);
    const khoi = [1, 2, 3, 4, 5].map((i) => document.getElementById(`mb${i}`));
    const cham = [...mic.querySelectorAll<HTMLLIElement>(".mdots li")];
    let mP: [number, number, number, number, boolean][] = [];
    let mW = 0;
    let mH = 0;
    let mVis = false;
    let mRaf: number | null = null;

    function mProg() {
      const r = mic!.getBoundingClientRect();
      return clamp(-r.top / (r.height - window.innerHeight), 0, 1);
    }
    function mDraw() {
      const x = mctx!;
      const p = mProg();
      const e = ease(clamp(p / 0.82, 0, 1));
      const cx = mW / 2;
      const cy = mH * (mH < 720 ? 0.82 : 0.7);
      x.fillStyle = "#0A0806";
      x.fillRect(0, 0, mW, mH);
      for (const q of mP) {
        const r = q[1] * Math.pow(1 - e, 1.15);
        const a = q[0] + e * q[3] * Math.PI;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r * 0.82;
        const s = q[2] * (1 - 0.45 * e);
        const al = 0.38 + 0.5 * e + (q[4] ? 0.2 : 0);
        x.fillStyle = q[4] ? `rgba(236,206,140,${al.toFixed(3)})` : `rgba(240,232,216,${(al * 0.8).toFixed(3)})`;
        x.fillRect(px, py, s, s);
      }
      if (e > 0.55) {
        const k = (e - 0.55) / 0.45;
        const gr = x.createRadialGradient(cx, cy, 0, cx, cy, 30 + 90 * k);
        gr.addColorStop(0, `rgba(255,240,205,${(0.9 * k).toFixed(3)})`);
        gr.addColorStop(0.25, `rgba(226,194,122,${(0.35 * k).toFixed(3)})`);
        gr.addColorStop(1, "rgba(226,194,122,0)");
        x.fillStyle = gr;
        x.fillRect(cx - 140, cy - 140, 280, 280);
      }
      const B = [
        band(p, 0.02, 0.17),
        band(p, 0.2, 0.36),
        band(p, 0.39, 0.55),
        band(p, 0.58, 0.74),
        clamp((p - 0.79) / 0.07, 0, 1),
      ];
      let act = -1;
      let best = 0;
      B.forEach((o, i) => {
        const el = khoi[i];
        if (!el) return;
        el.style.opacity = String(o);
        el.style.visibility = o > 0.01 ? "visible" : "hidden";
        el.classList.toggle("on", o > 0.6);
        if (o > best) {
          best = o;
          act = i;
        }
      });
      cham.forEach((d, i) => d.classList.toggle("on", i === act && best > 0.2));
    }
    function mSize() {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      mW = mcv!.clientWidth;
      mH = mcv!.clientHeight;
      mcv!.width = Math.round(mW * dpr);
      mcv!.height = Math.round(mH * dpr);
      mctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = mW < 860 ? 800 : 1500;
      const r4 = taoNgauNhien(Math.floor(R() * 1e9));
      const rmax = Math.hypot(mW, mH) * 0.62;
      mP = [];
      for (let i = 0; i < n; i++) {
        mP.push([r4() * Math.PI * 2, Math.pow(r4(), 0.6) * rmax, 0.6 + r4() * 1.6, 1.1 + r4() * 1.6, r4() < 0.14]);
      }
      mDraw();
    }
    const onScroll = () => {
      if (mVis && !mRaf)
        mRaf = requestAnimationFrame(() => {
          mDraw();
          mRaf = null;
        });
    };
    mSize();
    window.addEventListener("resize", mSize);
    window.addEventListener("scroll", onScroll, { passive: true });
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => {
        mVis = !!es[0]?.isIntersecting;
        if (mVis) mDraw();
      });
      io.observe(mic);
    } else mVis = true;

    return () => {
      window.removeEventListener("resize", mSize);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      if (mRaf) cancelAnimationFrame(mRaf);
    };
  }, []);

  return <canvas id="microCv" aria-hidden="true" ref={ref} />;
}

"use client";

import { useEffect, useRef } from "react";
import { laCheDoTinh } from "@/lib/su-kien";
import { taoNgauNhien } from "./duong-kham";

/**
 * Nền vũ trụ và bụi vàng dưới ánh đèn của màn đầu (docs/03, mục 6, hiệu ứng
 * 1 và 5): bụi vàng sáng lên quanh con trỏ, bảy sao Bắc Đẩu hiện khi ánh đèn
 * lướt qua, cả bầu trời xoay rất chậm quanh điểm Tử Vi, mây sao dịch nhẹ
 * ngược hướng tay. Chép từ script của bản mẫu. Chế độ tĩnh: chỉ vẽ một lần.
 */

/* Bảy sao Bắc Đẩu. Thứ tự: Dao Quang, Khai Dương, Ngọc Hành, Thiên Quyền, Thiên Cơ, Thiên Tuyền, Thiên Xu */
const DIPPER: [number, number][] = [
  [0, 0.1],
  [0.16, 0],
  [0.3, 0.03],
  [0.45, 0.08],
  [0.47, 0.25],
  [0.72, 0.3],
  [0.74, 0.08],
];
const DLINK: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 6],
  [6, 5],
  [5, 4],
  [4, 3],
];

type Diem = [number, number];
const rot = (p: Diem, c: Diem, a: number): Diem => {
  const s = Math.sin(a);
  const co = Math.cos(a);
  const x = p[0] - c[0];
  const y = p[1] - c[1];
  return [c[0] + x * co - y * s, c[1] + x * s + y * co];
};

export function BuiVang() {
  const cosmosRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dc = dustRef.current;
    const cos = cosmosRef.current;
    const sec = dc?.parentElement;
    const dctx = dc?.getContext("2d");
    if (!dc || !cos || !sec || !dctx) return;

    const reduce = laCheDoTinh();
    const R = taoNgauNhien(Date.now() % 2147483647);
    let flecks: [number, number, number, number, boolean][] = [];
    let dW = 0;
    let dH = 0;
    let lx = 0;
    let ly = 0;
    let tx = 0;
    let ty = 0;
    let draf: number | null = null;
    let SKY = 0;
    const skyT0 = performance.now();
    let dung = false;

    const pole = (): Diem =>
      dW < 860 ? [dW * 0.8, 70] : [dW * 0.84, Math.max(96, Math.min(130, window.innerHeight * 0.13))];

    function dipperBase(): Diem[] {
      const P = pole();
      const w = dW < 860 ? dW * 0.42 : Math.min(260, dW * 0.2);
      const sc = w / 0.74;
      const loc = DIPPER.map((p): Diem => [p[0] * sc, p[1] * sc]);
      const mer = loc[5]!;
      const dub = loc[6]!;
      const vx = dub[0] - mer[0];
      const vy = dub[1] - mer[1];
      const Lh = Math.hypot(vx, vy);
      const want = Math.atan2(-0.62, 0.78);
      const a = want - Math.atan2(vy, vx);
      const dist = Lh * 3.2;
      const r = loc.map((p) => rot(p, [0, 0], a));
      const rd = r[6]!;
      const ox = P[0] - Math.cos(want) * dist - rd[0];
      const oy = P[1] - Math.sin(want) * dist - rd[1];
      return r.map((p): Diem => [p[0] + ox, p[1] + oy]);
    }

    function drawDipper() {
      const c = pole();
      const P = dipperBase().map((p) => rot(p, c, SKY));
      const RR = 340;
      const ks = P.map((p) => {
        const d = Math.hypot(p[0] - lx, p[1] - ly);
        return d < RR ? Math.pow(1 - d / RR, 1.3) : 0;
      });
      const kmax = Math.max(...ks);
      if (kmax < 0.02) {
        P.forEach((p) => {
          dctx!.fillStyle = "rgba(244,224,168,0.07)";
          dctx!.fillRect(p[0] - 0.8, p[1] - 0.8, 1.6, 1.6);
        });
        return;
      }
      dctx!.strokeStyle = `rgba(226,194,122,${(kmax * 0.32).toFixed(3)})`;
      dctx!.lineWidth = 0.7;
      dctx!.beginPath();
      DLINK.forEach(([a, b]) => {
        dctx!.moveTo(P[a]![0], P[a]![1]);
        dctx!.lineTo(P[b]![0], P[b]![1]);
      });
      dctx!.stroke();
      P.forEach((p, i) => {
        const k = ks[i]!;
        if (k < 0.01) return;
        const g = dctx!.createRadialGradient(p[0], p[1], 0, p[0], p[1], 9);
        g.addColorStop(0, `rgba(255,240,200,${(k * 0.9).toFixed(3)})`);
        g.addColorStop(1, "rgba(255,240,200,0)");
        dctx!.fillStyle = g;
        dctx!.fillRect(p[0] - 9, p[1] - 9, 18, 18);
        dctx!.fillStyle = `rgba(255,247,222,${Math.min(1, k * 1.1).toFixed(3)})`;
        dctx!.fillRect(p[0] - 1.2, p[1] - 1.2, 2.4, 2.4);
        dctx!.fillRect(p[0] - 5 * k, p[1] - 0.3, 10 * k, 0.6);
        dctx!.fillRect(p[0] - 0.3, p[1] - 5 * k, 0.6, 10 * k);
      });
    }

    function drawDust() {
      const x = dctx!;
      x.clearRect(0, 0, dW, dH);
      const g = x.createRadialGradient(lx, ly, 0, lx, ly, 520);
      g.addColorStop(0, "rgba(232,196,120,0.14)");
      g.addColorStop(0.55, "rgba(200,150,80,0.05)");
      g.addColorStop(1, "rgba(226,194,122,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, dW, dH);
      const RR = 430;
      const ph = (lx + ly) * 0.006;
      const C = pole();
      const sS = Math.sin(SKY);
      const cS = Math.cos(SKY);
      const pg = x.createRadialGradient(C[0], C[1], 0, C[0], C[1], 14);
      pg.addColorStop(0, "rgba(255,238,200,0.55)");
      pg.addColorStop(1, "rgba(255,238,200,0)");
      x.fillStyle = pg;
      x.fillRect(C[0] - 14, C[1] - 14, 28, 28);
      x.fillStyle = "rgba(255,246,220,0.85)";
      x.fillRect(C[0] - 1, C[1] - 1, 2, 2);
      for (const f0 of flecks) {
        const qx = f0[0] - C[0];
        const qy = f0[1] - C[1];
        const fx = C[0] + qx * cS - qy * sS;
        const fy = C[1] + qx * sS + qy * cS;
        const [, , fr, fa, leaf] = f0;
        const dx = fx - lx;
        const dy = fy - ly;
        const d = Math.sqrt(dx * dx + dy * dy);
        const k = d < RR ? 1 - d / RR : 0;
        const glint = Math.pow(Math.abs(Math.cos(fa + ph + d * 0.004)), 3);
        let a = 0.035 + Math.pow(k, 1.4) * (0.25 + glint * 0.9);
        if (a < 0.04) continue;
        if (a > 1) a = 1;
        if (leaf) {
          x.save();
          x.translate(fx, fy);
          x.rotate(fa);
          x.fillStyle = `rgba(222,184,104,${(a * 0.9).toFixed(3)})`;
          x.beginPath();
          x.moveTo(-fr, -fr * 0.4);
          x.lineTo(fr * 0.6, -fr * 0.7);
          x.lineTo(fr, fr * 0.3);
          x.lineTo(-fr * 0.3, fr * 0.8);
          x.closePath();
          x.fill();
          x.restore();
        } else {
          x.fillStyle = `rgba(244,224,168,${a.toFixed(3)})`;
          x.fillRect(fx, fy, fr, fr);
        }
        if (k > 0.7 && glint > 0.94) {
          x.fillStyle = `rgba(255,244,214,${(k * 0.8).toFixed(3)})`;
          x.fillRect(fx - 1.5, fy + fr / 2 - 0.25, 3 + fr, 0.5);
          x.fillRect(fx + fr / 2 - 0.25, fy - 1.5, 0.5, 3 + fr);
        }
      }
      drawDipper();
    }

    function sizeDust() {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      dW = sec!.clientWidth;
      dH = sec!.clientHeight;
      dc!.width = Math.round(dW * dpr);
      dc!.height = Math.round(dH * dpr);
      dctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(2600, Math.round((dW * dH) / 650));
      const r3 = taoNgauNhien(Math.floor(R() * 1e9));
      flecks = [];
      for (let i = 0; i < n; i++) {
        const leaf = r3() < 0.035;
        flecks.push([r3() * dW, r3() * dH, leaf ? 2.2 + r3() * 2.6 : 0.45 + r3() * 1.35, r3() * Math.PI * 2, leaf]);
      }
      if (!lx) {
        lx = tx = dW * 0.3;
        ly = ty = Math.min(dH * 0.35, 320);
      }
      drawDust();
    }

    function dustLoop() {
      lx += (tx - lx) * 0.08;
      ly += (ty - ly) * 0.08;
      drawDust();
      draf = Math.abs(tx - lx) + Math.abs(ty - ly) > 0.6 ? requestAnimationFrame(dustLoop) : null;
    }
    function aim(x: number, y: number) {
      tx = x;
      ty = y;
      if (reduce) {
        lx = x;
        ly = y;
        drawDust();
        return;
      }
      if (!draf) draf = requestAnimationFrame(dustLoop);
    }

    /* Thị sai: tầng mây sao xa dịch rất nhẹ ngược hướng tay */
    let px = 0;
    let py = 0;
    let ptx = 0;
    let pty = 0;
    let praf: number | null = null;
    function parLoop() {
      px += (ptx - px) * 0.06;
      py += (pty - py) * 0.06;
      cos!.style.transform = `translate3d(${px.toFixed(2)}px,${py.toFixed(2)}px,0) scale(1.04)`;
      praf = Math.abs(ptx - px) + Math.abs(pty - py) > 0.1 ? requestAnimationFrame(parLoop) : null;
    }
    function par(fx: number, fy: number) {
      if (reduce) return;
      ptx = -(fx - 0.5) * 22;
      pty = -(fy - 0.5) * 14;
      if (!praf) praf = requestAnimationFrame(parLoop);
    }

    const onMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      aim(e.clientX - r.left, e.clientY - r.top);
      par(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    };
    sec.addEventListener("pointermove", onMove, { passive: true });

    /* Bầu trời xoay quanh điểm Tử Vi: một vòng mất bốn mươi phút, như trời đêm thật */
    let skyVis = true;
    let skyLast = 0;
    let skyRaf: number | null = null;
    function skyLoop(now: number) {
      skyRaf = null;
      if (dung || !skyVis || document.hidden) {
        skyLast = 0;
        return;
      }
      // Cánh cổng đang che trang (body.mzs-lock): chưa vẽ bầu trời, để máy dành
      // sức cho cổng và ảnh đầu tiên (docs/10, mục R13).
      if (document.body.classList.contains("mzs-lock")) {
        skyRaf = requestAnimationFrame(skyLoop);
        return;
      }
      if (now - skyLast > 33) {
        SKY = ((now - skyT0) / 1000) * ((2 * Math.PI) / 2400);
        drawDust();
        skyLast = now;
      }
      skyRaf = requestAnimationFrame(skyLoop);
    }
    const chaySky = () => {
      if (!skyRaf && !dung) skyRaf = requestAnimationFrame(skyLoop);
    };
    let io: IntersectionObserver | null = null;
    if (!reduce) {
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver((es) => {
          skyVis = !!es[0]?.isIntersecting;
          if (skyVis) chaySky();
        });
        io.observe(sec);
      } else chaySky();
    }
    const onVis = () => {
      if (!document.hidden && skyVis && !reduce) chaySky();
    };
    document.addEventListener("visibilitychange", onVis);
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      aim(
        dW * Math.max(0.05, Math.min(0.95, 0.5 + e.gamma / 70)),
        Math.max(40, Math.min(dH - 40, (0.35 + (e.beta - 40) / 120) * window.innerHeight + window.scrollY)),
      );
    };
    window.addEventListener("deviceorientation", onTilt, { passive: true });
    const ro =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            if (Math.abs(sec.clientHeight - dH) > 4 || Math.abs(sec.clientWidth - dW) > 4) sizeDust();
          })
        : null;
    ro?.observe(sec);
    sizeDust();

    return () => {
      dung = true;
      sec.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("deviceorientation", onTilt);
      io?.disconnect();
      ro?.disconnect();
      [draf, praf, skyRaf].forEach((r) => r && cancelAnimationFrame(r));
    };
  }, []);

  return (
    <>
      <div className="cosmos" id="cosmos" aria-hidden="true" ref={cosmosRef} />
      <canvas id="dust" aria-hidden="true" ref={dustRef} />
    </>
  );
}

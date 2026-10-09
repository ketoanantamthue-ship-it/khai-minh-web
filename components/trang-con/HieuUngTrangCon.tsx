"use client";

import { useEffect } from "react";
import { laCheDoTinh } from "@/lib/su-kien";

/**
 * Ba hiệu ứng của trang con, chép từ script cuối các bản mẫu cua-*.html và
 * chang-5.html:
 * 1. bụi vàng dưới ánh đèn ở màn đầu (#dust), sáng theo con trỏ;
 * 2. viền khảm chỉ vàng của thẻ `.card` hiện dần khi cuộn tới;
 * 3. ngưỡng bình minh: lớp sơn tối (#dawnCover) bị mài dần theo nhịp cuộn.
 *
 * Chế độ tĩnh (giảm chuyển động, Chữ lớn, Bản nhẹ): bụi không trôi, viền
 * hiện ngay, lớp sơn không vẽ (CLAUDE.md, quy tắc 10). Chữ không phụ thuộc
 * vào thành phần này.
 */
export function HieuUngTrangCon() {
  useEffect(() => {
    const huy: (() => void)[] = [];
    const tinh = laCheDoTinh();

    /* ---------- 1. Bụi vàng dưới ánh đèn ---------- */
    const h = document.querySelector<HTMLElement>(".km-con .hero");
    const c = document.getElementById("dust") as HTMLCanvasElement | null;
    const x = c?.getContext("2d");
    if (h && c && x) {
      let W = 0;
      let H = 0;
      let F: [number, number, number, number][] = [];
      let lx = 0;
      let ly = 0;
      let tx = 0;
      let ty = 0;
      let raf: number | null = null;
      const draw = () => {
        x.clearRect(0, 0, W, H);
        const g = x.createRadialGradient(lx, ly, 0, lx, ly, 480);
        g.addColorStop(0, "rgba(232,196,120,.12)");
        g.addColorStop(1, "rgba(232,196,120,0)");
        x.fillStyle = g;
        x.fillRect(0, 0, W, H);
        for (const f of F) {
          const d = Math.hypot(f[0] - lx, f[1] - ly);
          const k = d < 420 ? 1 - d / 420 : 0;
          const gl = Math.pow(Math.abs(Math.cos(f[3] + (lx + ly) * 0.006 + d * 0.004)), 3);
          const a = 0.03 + Math.pow(k, 1.4) * (0.25 + gl * 0.85);
          if (a < 0.04) continue;
          x.fillStyle = `rgba(244,224,168,${Math.min(1, a).toFixed(3)})`;
          x.fillRect(f[0], f[1], f[2], f[2]);
        }
      };
      const sz = () => {
        const d = Math.min(1.5, window.devicePixelRatio || 1);
        W = h.clientWidth;
        H = h.clientHeight;
        c.width = W * d;
        c.height = H * d;
        x.setTransform(d, 0, 0, d, 0, 0);
        F = [];
        const n = Math.min(1800, Math.round((W * H) / 700));
        for (let i = 0; i < n; i++) F.push([Math.random() * W, Math.random() * H, 0.4 + Math.random() * 1.3, Math.random() * 6.28]);
        if (!lx) {
          lx = tx = W * 0.35;
          ly = ty = H * 0.4;
        }
        draw();
      };
      const loop = () => {
        lx += (tx - lx) * 0.08;
        ly += (ty - ly) * 0.08;
        draw();
        raf = Math.abs(tx - lx) + Math.abs(ty - ly) > 0.6 ? requestAnimationFrame(loop) : null;
      };
      const move = (e: PointerEvent) => {
        const r = h.getBoundingClientRect();
        tx = e.clientX - r.left;
        ty = e.clientY - r.top;
        if (laCheDoTinh()) {
          lx = tx;
          ly = ty;
          draw();
          return;
        }
        if (!raf) raf = requestAnimationFrame(loop);
      };
      h.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("resize", sz);
      sz();
      huy.push(() => {
        h.removeEventListener("pointermove", move);
        window.removeEventListener("resize", sz);
        if (raf) cancelAnimationFrame(raf);
      });
    }

    /* ---------- 2. Viền khảm chỉ vàng khi cuộn tới ---------- */
    const cards = [...document.querySelectorAll<HTMLElement>(".km-con .card")];
    if ("IntersectionObserver" in window && !tinh) {
      const timers: number[] = [];
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
            timers.push(window.setTimeout(() => el.classList.add("inlaid"), sib * 160));
            io.unobserve(el);
          });
        },
        { threshold: 0.3 },
      );
      cards.forEach((k) => io.observe(k));
      huy.push(() => {
        io.disconnect();
        timers.forEach((t) => window.clearTimeout(t));
      });
    } else {
      cards.forEach((k) => k.classList.add("inlaid"));
    }

    /* ---------- 3. Ngưỡng bình minh: mài lớp sơn tối theo nhịp cuộn ---------- */
    const sec = document.getElementById("binh-minh");
    const cv = document.getElementById("dawnCover") as HTMLCanvasElement | null;
    const y = cv?.getContext("2d");
    if (sec && cv && y && !tinh) {
      let W = 0;
      let H = 0;
      let lastP = -1;
      type Net = { cx: number; cy: number; len: number; th: number; ang: number };
      let strokes: Net[] = [];
      let flecks: [number, number, number, number][] = [];
      const rnd = (a: number, b: number) => a + Math.random() * (b - a);
      const sm = (a: number, b: number, v: number) => {
        const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
        return t * t * (3 - 2 * t);
      };
      const prog = () => {
        const r = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        return Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.85 + r.height * 0.25)));
      };
      const mauNen = getComputedStyle(h ?? document.body).backgroundColor || "#0A0806";
      const draw = (p: number) => {
        if (Math.abs(p - lastP) < 0.004) return;
        lastP = p;
        y.clearRect(0, 0, W, H);
        const base = 1 - sm(0.62, 0.98, p);
        if (base <= 0.001) return;
        y.globalCompositeOperation = "source-over";
        y.globalAlpha = base;
        y.fillStyle = mauNen;
        y.fillRect(0, 0, W, H);
        for (const f of flecks) {
          y.fillStyle = `rgba(226,194,122,${f[3]})`;
          y.fillRect(f[0], f[1], f[2], f[2]);
        }
        y.globalAlpha = 1;
        y.globalCompositeOperation = "destination-out";
        const k = Math.floor(sm(0.05, 0.9, p) * strokes.length);
        for (let s = 0; s < k; s++) {
          const q = strokes[s]!;
          y.save();
          y.translate(q.cx, q.cy);
          y.rotate(q.ang);
          for (let e = 0; e < 4; e++) {
            y.fillStyle = `rgba(0,0,0,${(0.18 + ((s * 7 + e) % 5) * 0.06).toFixed(2)})`;
            y.beginPath();
            y.ellipse((e - 1.5) * q.len * 0.22, (((s + e) % 3) - 1) * q.th * 0.25, q.len * 0.32, q.th * 0.5, 0, 0, 6.283);
            y.fill();
          }
          y.restore();
        }
        y.globalCompositeOperation = "source-over";
      };
      const build = () => {
        const r = sec.getBoundingClientRect();
        const d = Math.min(1.5, window.devicePixelRatio || 1);
        W = r.width;
        H = r.height;
        cv.width = W * d;
        cv.height = H * d;
        y.setTransform(d, 0, 0, d, 0, 0);
        strokes = [];
        const nho = W < 700;
        for (let i = 0; i < 120; i++) {
          strokes.push({
            cx: rnd(-0.1, 1.1) * W,
            cy: H * (0.5 + (Math.random() - 0.5) * 0.9 * Math.min(1, 0.25 + i / 120)),
            len: Math.max(rnd(0.18, 0.42) * W, nho ? rnd(220, 380) : 0),
            th: nho ? rnd(6, 13) : rnd(10, 24),
            ang: rnd(-0.08, 0.08),
          });
        }
        flecks = [];
        for (let j = 0; j < Math.round((W * H) / 900); j++) {
          flecks.push([Math.random() * W, Math.random() * H, rnd(0.5, 1.4), rnd(0.08, 0.35)]);
        }
        lastP = -1;
        draw(prog());
      };
      let tk = false;
      const cuon = () => {
        if (tk) return;
        tk = true;
        requestAnimationFrame(() => {
          draw(prog());
          tk = false;
        });
      };
      window.addEventListener("scroll", cuon, { passive: true });
      window.addEventListener("resize", build);
      build();
      huy.push(() => {
        window.removeEventListener("scroll", cuon);
        window.removeEventListener("resize", build);
      });
    }

    return () => huy.forEach((f) => f());
  }, []);

  return null;
}

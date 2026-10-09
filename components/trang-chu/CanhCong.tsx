"use client";

/* eslint-disable @next/next/no-img-element -- ảnh cổng cần đúng srcset, sizes và mặt nạ CSS của bản mẫu */
import { useEffect, useRef, useState } from "react";
import { bayFocus } from "@/lib/bay-focus";
import { useKhoLuu, useManHinhCham } from "@/lib/dung-moi-truong";
import { laCheDoTinh, NGUOI_HOI, SU_KIEN, type NguoiHoi } from "@/lib/su-kien";
import { LOI_CHAO_CONG, NGUOI_HOI_CHU } from "./chu";

/**
 * Cánh cổng mở đầu (docs/03, mục 5; bản mẫu K1.9.11–K1.9.16).
 *
 * Đêm → thắp đèn cho ai → ngọn đèn bay tới người ngồi thiền → bình minh loang
 * ra từ mặt trời trong lòng → lời mở và nút "Mời bạn vào nhà".
 *
 * - Chỉ có ở trang chủ, chỉ hiện lần đầu trên mỗi máy (localStorage `km-gate`).
 *   Script đầu trang (app/layout.tsx) thêm lớp `mzs-seen` để cổng không nháy.
 * - Chế độ tĩnh (`mzs-static`) khi giảm chuyển động, bản nhẹ hoặc chữ lớn.
 * - Focus trap; Esc tương đương "Vào thẳng trang"; phía sau cổng là `inert`.
 * - Âm thanh mặc định tắt, lựa chọn lưu ở localStorage `km-sound`.
 * - Lựa chọn "thắp đèn cho ai" được truyền xuống trục "bạn đang lo cho ai".
 *
 * Trạng thái đặt trên phần tử gốc, luôn có tiền tố `mzs-` (CLAUDE.md, quy tắc 11).
 */

const KHOA_CONG = "km-gate";
const KHOA_TIENG = "km-sound";
/** Sự kiện báo đã ghi lại một lựa chọn vào localStorage (để các hook đọc lại). */
const SU_KIEN_KHO = "km-kho-doi";

/** Điểm neo trên ảnh 1152×2048 (docs/03, mục 5). Thay ảnh thì đo lại. */
const NEO_DEN = { x: 0.3924, y: 0.6523 };

function docKho(khoa: string): string | null {
  try {
    return window.localStorage.getItem(khoa);
  } catch {
    return null;
  }
}
function ghiKho(khoa: string, giaTri: string) {
  try {
    window.localStorage.setItem(khoa, giaTri);
  } catch {
    // Trình duyệt chặn localStorage: lựa chọn chỉ giữ trong lần xem này.
  }
}

export function CanhCong() {
  // Máy này đã qua cổng thì không hiện lại (CLAUDE.md, quy tắc 9).
  const daQua = useKhoLuu(KHOA_CONG, SU_KIEN_KHO) === "1";
  const [xong, setXong] = useState(false);
  const tieng = useKhoLuu(KHOA_TIENG, SU_KIEN_KHO) === "1";
  const cham = useManHinhCham();
  const [loiChao, setLoiChao] = useState("");
  const [chon, setChon] = useState<NguoiHoi | "" | null>(null);
  const goc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (docKho(KHOA_CONG) === "1" || document.documentElement.classList.contains("mzs-seen")) return;
    const g = goc.current;
    if (!g) return;

    const calm = laCheDoTinh();
    const T: number[] = [];
    const at = (ms: number, fn: () => void) => T.push(window.setTimeout(fn, ms));
    const huy: (() => void)[] = [];
    let done = false;
    let choice: NguoiHoi | null = null;
    let from: [number, number] | null = null;
    let fireStop: (() => void) | null = null;

    /* ---------- Khoá phía sau cổng ---------- */
    document.body.classList.add("mzs-lock");
    const bg: HTMLElement[] = [];
    for (let el: HTMLElement | null = g; el && el !== document.body; el = el.parentElement) {
      const cha = el.parentElement;
      if (!cha) break;
      [...cha.children].forEach((x) => {
        if (x !== el && x instanceof HTMLElement && x.tagName !== "SCRIPT" && !x.inert) {
          x.inert = true;
          bg.push(x);
        }
      });
    }
    const moKhoa = () => {
      document.body.classList.remove("mzs-lock");
      bg.forEach((x) => {
        x.inert = false;
      });
    };
    huy.push(bayFocus(g));

    const art = g.querySelector<HTMLElement>(".mz-art")!;
    const lamp = g.querySelector<HTMLElement>(".mz-lamp")!;
    const enterBtn = g.querySelector<HTMLButtonElement>(".mz-enter")!;
    const words = g.querySelector<HTMLElement>(".mz-words")!;
    const stage = g.querySelector<HTMLElement>(".mz-stage")!;
    const seq = [...g.querySelectorAll<HTMLElement>(".mz-flow .mzl")];
    const first = g.querySelector<HTMLButtonElement>(".mz-li")!;
    const hint = g.querySelector<HTMLElement>(".mz-hint");
    // Lời mở chưa hiện thì chưa bấm được (bản mẫu dùng aria-hidden; inert chặn cả focus).
    words.inert = true;

    /* ---------- Lời chào hiện từng dòng ---------- */
    const RT: number[] = [];
    let revealed = false;
    stage.classList.add("mzs-js");
    const show = (el: HTMLElement) => {
      el.classList.add("mzs-on");
      if (el.classList.contains("mz-q")) g.classList.add("mzs-asked");
      if (window.innerWidth <= 900 || window.innerWidth / window.innerHeight < 1.1) {
        const r = el.getBoundingClientRect();
        if (r.bottom > window.innerHeight * 0.9 && !calm)
          stage.scrollBy({ top: r.bottom - window.innerHeight * 0.82, behavior: "smooth" });
      }
    };
    const revealAll = () => {
      if (revealed) return;
      revealed = true;
      RT.forEach((t) => window.clearTimeout(t));
      seq.forEach((el) => el.classList.add("mzs-on"));
      g.classList.add("mzs-asked");
      hint?.classList.remove("mzs-on");
    };
    if (calm) {
      revealAll();
      at(300, () => first.focus({ preventScroll: true }));
    } else {
      RT.push(
        window.setTimeout(() => {
          if (!revealed) hint?.classList.add("mzs-on");
        }, 1800),
      );
      const wait = (el: HTMLElement) => {
        if (el.classList.contains("mz-li")) return 170;
        if (el.classList.contains("mz-look")) return 380;
        if (el.classList.contains("mz-seal")) return 900;
        if (el.classList.contains("mz-q")) return 1100;
        const n = (el.textContent ?? "").trim().split(/\s+/).length;
        return Math.max(800, Math.min(2400, 450 + n * 155));
      };
      let t = 600;
      seq.forEach((el) => {
        RT.push(
          window.setTimeout(() => {
            show(el);
            if (el === first) first.focus({ preventScroll: true });
          }, t),
        );
        t += wait(el);
      });
      RT.push(
        window.setTimeout(() => {
          revealed = true;
          hint?.classList.remove("mzs-on");
        }, t + 200),
      );
      const onDown = (e: PointerEvent) => {
        if (!(e.target as Element).closest("button")) revealAll();
      };
      const onKey = (e: KeyboardEvent) => {
        if (!revealed && (e.key === "Enter" || e.key === " " || e.key === "Tab")) revealAll();
      };
      stage.addEventListener("pointerdown", onDown);
      document.addEventListener("keydown", onKey);
      huy.push(() => {
        stage.removeEventListener("pointerdown", onDown);
        document.removeEventListener("keydown", onKey);
      });
    }
    huy.push(() => RT.forEach((t) => window.clearTimeout(t)));

    /* ---------- Chuông ---------- */
    let AC: AudioContext | null = null;
    const bell = (v: number) => {
      if (docKho(KHOA_TIENG) !== "1") return;
      try {
        const Ctx =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctx) return;
        AC = AC ?? new Ctx();
        if (AC.state === "suspended") void AC.resume();
        const t = AC.currentTime;
        const base = 196;
        (
          [
            [1, 0.5, 5],
            [2.76, 0.22, 3.2],
            [5.4, 0.1, 2],
            [8.93, 0.04, 1.2],
          ] as const
        ).forEach(([f, gain, dur]) => {
          const o = AC!.createOscillator();
          const gn = AC!.createGain();
          o.type = "sine";
          o.frequency.value = base * f;
          gn.gain.setValueAtTime(0, t);
          gn.gain.linearRampToValueAtTime(gain * v, t + 0.015);
          gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
          o.connect(gn);
          gn.connect(AC!.destination);
          o.start(t);
          o.stop(t + dur + 0.1);
        });
      } catch {
        // Trình duyệt không cho phát âm thanh: bỏ qua.
      }
    };
    const nghe = (e: Event) => bell((e as CustomEvent<number>).detail);
    g.addEventListener("km-chuong", nghe);
    huy.push(() => {
      g.removeEventListener("km-chuong", nghe);
      void AC?.close();
    });

    /* ---------- Ngọn đèn và đom đóm ---------- */
    const target = (): [number, number] => {
      const r = art.getBoundingClientRect();
      return [r.left + r.width * NEO_DEN.x, r.top + r.height * NEO_DEN.y];
    };
    const datDen = ([x, y]: [number, number]) => {
      lamp.style.transform = `translate(${x - 13}px,${y - 29}px)`;
    };
    const placeLamp = () => {
      if (lamp.style.opacity !== "1" || !lamp.classList.contains("mzs-on")) return;
      lamp.getAnimations?.().forEach((a) => a.cancel());
      datDen(target());
    };
    window.addEventListener("resize", placeLamp);
    huy.push(() => window.removeEventListener("resize", placeLamp));

    const lampFly = () => {
      const p = target();
      const x0 = from ? from[0] : window.innerWidth * 0.7;
      const y0 = from ? from[1] : window.innerHeight * 0.15;
      lamp.style.opacity = "1";
      const mx = (x0 + p[0]) / 2;
      const my = Math.min(y0, p[1]) - Math.min(120, window.innerHeight * 0.12);
      if (!lamp.animate) {
        datDen(p);
        lamp.classList.add("mzs-on");
        return;
      }
      const an = lamp.animate(
        [
          { transform: `translate(${x0 - 13}px,${y0 - 29}px) scale(1.3)`, opacity: 0 },
          { transform: `translate(${mx - 13}px,${my - 29}px) scale(1.12)`, opacity: 1, offset: 0.45 },
          { transform: `translate(${p[0] - 13}px,${p[1] - 29}px) scale(1)`, opacity: 1 },
        ],
        { duration: 1900, easing: "cubic-bezier(.45,.05,.25,1)", fill: "forwards" },
      );
      an.onfinish = () => {
        datDen(p);
        lamp.classList.add("mzs-on");
        g.classList.add("mzs-lamp");
        bell(0.16);
      };
    };

    const fireflies = () => {
      const cv = g.querySelector<HTMLCanvasElement>(".mz-fire");
      const x = cv?.getContext("2d");
      if (!cv || !x) return;
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      let W = 0;
      let H = 0;
      let run = true;
      const size = () => {
        const r = cv.getBoundingClientRect();
        W = r.width;
        H = r.height;
        cv.width = W * dpr;
        cv.height = H * dpr;
        x.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      size();
      window.addEventListener("resize", size);
      type Dom = { x: number; y: number; r: number; vy: number; vx: number; ph: number; life: number; max: number };
      const spawn = (p: Partial<Dom>, init: boolean): Dom =>
        Object.assign(p, {
          x: W * (0.04 + Math.random() * 0.6),
          y: init ? H * (0.1 + Math.random() * 0.45) : H * (0.42 + Math.random() * 0.18),
          r: 0.7 + Math.random() * 1.7,
          vy: -(3 + Math.random() * 7),
          vx: (Math.random() - 0.5) * 5,
          ph: Math.random() * 6.28,
          life: 0,
          max: 6 + Math.random() * 7,
        });
      const P: Dom[] = [];
      const N = Math.max(18, Math.min(52, Math.round((W * H) / 9000)));
      for (let i = 0; i < N; i++) P.push(spawn({}, true));
      const t0 = performance.now();
      let last = t0;
      const frame = (now: number) => {
        if (!run) return;
        if (document.hidden) {
          last = now;
          requestAnimationFrame(frame);
          return;
        }
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const fade = Math.min(1, (now - t0) / 2200);
        x.clearRect(0, 0, W, H);
        for (const p of P) {
          p.life += dt;
          p.x += p.vx * dt + Math.sin(now / 1000 + p.ph) * 0.14;
          p.y += p.vy * dt;
          const k = Math.min(1, p.life / 1.4) * Math.max(0, 1 - p.life / p.max);
          const tw = 0.5 + 0.5 * Math.sin(now / 420 + p.ph);
          if (p.life > p.max || p.y < H * 0.03) spawn(p, false);
          x.beginPath();
          x.fillStyle = `rgba(255,226,150,${(k * tw * 0.95 * fade).toFixed(3)})`;
          x.shadowColor = "rgba(255,206,110,.95)";
          x.shadowBlur = 9;
          x.arc(p.x, p.y, p.r, 0, 6.283);
          x.fill();
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
      fireStop = () => {
        run = false;
        window.removeEventListener("resize", size);
      };
    };
    huy.push(() => fireStop?.());

    /* ---------- Bình minh và lời mở ---------- */
    const ready = () => {
      g.classList.add("mzs-ready");
      words.inert = false;
      enterBtn.focus({ preventScroll: true });
    };
    const begin = () => {
      g.classList.add("mzs-open");
      if (calm) {
        g.classList.add("mzs-static", "mzs-lamp");
        lamp.style.opacity = "1";
        lamp.classList.add("mzs-on");
        datDen(target());
        ready();
        return;
      }
      at(250, () => g.classList.add("mzs-dawn"));
      at(900, fireflies);
      at(1900, () => g.classList.add("mzs-rip"));
      at(2200, lampFly);
      at(3500, () => g.classList.add("mzs-w1"));
      at(4500, () => g.classList.add("mzs-w2"));
      at(5300, ready);
    };

    const choose = (a: NguoiHoi | "") => {
      if (g.classList.contains("mzs-chosen")) return;
      choice = a || null;
      revealAll();
      setChon(a);
      setLoiChao(LOI_CHAO_CONG[a]);
      const li = g.querySelector(`.mz-li[data-a="${a}"] .mz-cup i`) ?? g.querySelector(".mz-seal");
      const r = li?.getBoundingClientRect();
      if (r?.width) from = [r.left + r.width / 2, r.top + r.height / 2];
      g.classList.add("mzs-chosen");
      bell(0.3);
      let started = false;
      const wn = LOI_CHAO_CONG[a].split(/\s+/).length;
      const delay = calm ? 350 : Math.max(2400, Math.min(4200, 900 + wn * 190));
      const go = () => {
        if (started) return;
        started = true;
        const l2 = g.querySelector<HTMLElement>(`.mz-li[data-a="${a}"] .mz-cup i`);
        const r2 = l2?.getBoundingClientRect();
        if (r2?.width) from = [r2.left + r2.width / 2, r2.top + r2.height / 2];
        if (l2) l2.style.opacity = "0";
        begin();
      };
      const tm = window.setTimeout(go, delay);
      T.push(tm);
      at(400, () => {
        const onDown = (e: PointerEvent) => {
          if (!(e.target as Element).closest("button")) {
            window.clearTimeout(tm);
            go();
          }
        };
        stage.addEventListener("pointerdown", onDown);
        huy.push(() => stage.removeEventListener("pointerdown", onDown));
      });
    };

    /* ---------- Rời cổng ---------- */
    const finish = (toi?: string) => {
      if (done) return;
      done = true;
      T.forEach((t) => window.clearTimeout(t));
      fireStop?.();
      lamp.style.display = "none";
      ghiKho(KHOA_CONG, "1");
      moKhoa();
      g.classList.add("mzs-gone");
      window.setTimeout(() => {
        setXong(true);
        document.documentElement.classList.add("mzs-seen");
        if (choice) window.dispatchEvent(new CustomEvent(SU_KIEN.chonNguoiHoi, { detail: choice }));
        const dich = toi ? document.getElementById(toi) : null;
        if (dich) {
          dich.scrollIntoView({ behavior: calm ? "auto" : "smooth" });
          (dich.querySelector<HTMLElement>("h2, button") ?? dich).focus({ preventScroll: true });
        } else {
          const h = document.getElementById("h1");
          if (h) {
            h.setAttribute("tabindex", "-1");
            h.focus({ preventScroll: true });
          }
        }
      }, 650);
    };
    const exit = (toi?: string) => {
      if (done || g.classList.contains("mzs-out")) return;
      g.classList.add("mzs-out");
      lamp.style.transition = "opacity .6s";
      lamp.style.opacity = "0";
      T.push(window.setTimeout(() => finish(toi), calm ? 0 : 1000));
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("button, a");
      if (!el || !g.contains(el)) return;
      if (el.classList.contains("mz-li")) choose((el.dataset.a ?? "") as NguoiHoi);
      else if (el.id === "gateOpen") choose("");
      else if (el.id === "gateSkip") finish();
      else if (el.id === "mzEnter") exit();
      else if (el.classList.contains("mz-thang")) {
        e.preventDefault();
        exit("chang");
      }
    };
    g.addEventListener("click", onClick);
    const onEsc = (e: KeyboardEvent) => {
      if (!done && e.key === "Escape") finish();
    };
    document.addEventListener("keydown", onEsc);
    huy.push(() => {
      g.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onEsc);
    });

    return () => {
      T.forEach((t) => window.clearTimeout(t));
      huy.forEach((f) => f());
      moKhoa();
    };
  }, []);

  if (daQua || xong) return null;

  const doiTieng = () => {
    const moi = !tieng;
    ghiKho(KHOA_TIENG, moi ? "1" : "0");
    window.dispatchEvent(new Event(SU_KIEN_KHO));
    if (moi) goc.current?.dispatchEvent(new CustomEvent("km-chuong", { detail: 0.22 }));
  };

  return (
    <div className="eg" id="gate" role="dialog" aria-modal="true" aria-labelledby="gate-q" ref={goc}>
      <div className="mz-sky" aria-hidden="true" />
      <div className="mz-art" id="mzArt" aria-hidden="true">
        <span className="mz-warm" />
        <img
          className="mz-dawn-img"
          src="/assets/img/mo-cua-sang.webp"
          srcSet="/assets/img/mo-cua-sang-720.webp 720w, /assets/img/mo-cua-sang.webp 1152w"
          sizes="57vh"
          alt=""
          width={1152}
          height={2048}
          decoding="async"
        />
        <img
          className="mz-night"
          src="/assets/img/mo-cua-dem.webp"
          srcSet="/assets/img/mo-cua-dem-720.webp 720w, /assets/img/mo-cua-dem.webp 1152w"
          sizes="57vh"
          fetchPriority="high"
          alt=""
          width={1152}
          height={2048}
          decoding="async"
        />
        <span className="mz-pool" />
        <span className="mz-ember" />
        <span className="mz-urna" />
        <canvas className="mz-fire" id="mzFire" />
        <span className="mz-rip">
          <i />
          <i />
          <i />
        </span>
      </div>
      <button className="gskip" id="gateSkip" type="button">
        Vào thẳng trang
      </button>
      <div className="mz-bar" aria-hidden="true" />
      <button className="mz-sound" id="mzSound" type="button" aria-pressed={tieng} onClick={doiTieng}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
          <path d="M10 20.5a2 2 0 0 0 4 0" />
        </svg>
        <span>{tieng ? "Tắt tiếng chuông" : "Bật tiếng chuông"}</span>
      </button>
      <p className="mz-hint" id="mzHint" aria-hidden="true">
        {cham ? "Chạm" : "Bấm"} vào màn hình nếu bạn muốn đọc nhanh hơn.
      </p>
      <div className="mz-veil" aria-hidden="true" />
      <p className="mz-cpl-v mz-c1" aria-hidden="true">
        {"Lòng có rối, cửa vẫn mở.".split(" ").map((w) => (
          <span key={w}>{w}</span>
        ))}
      </p>
      <p className="mz-cpl-v mz-c2" aria-hidden="true">
        {"Đêm dù dài, đèn vẫn soi.".split(" ").map((w) => (
          <span key={w}>{w}</span>
        ))}
      </p>
      <div className="mz-stage" id="mzStage">
        <div className="mz-flow" id="mzFlow">
          <p className="mzl mz-seal">
            <span className="mz-han" aria-hidden="true">
              <b>開</b>
              <b>明</b>
            </span>
            <span className="mz-kick">TRƯỚC CỬA NHÀ KHAI MINH</span>
          </p>
          <p className="mzl mz-h" id="gate-q">
            Bạn đã mang câu hỏi ấy một mình đủ lâu rồi.
          </p>
          <p className="mzl mz-p">
            Có những câu hỏi ta chỉ dám hỏi mình lúc nửa đêm. Trong ngôi nhà này, không ai phán xét bạn, và không ai nói
            trước đời bạn.
          </p>
          <p className="mzl mz-q">Trước khi cửa mở, bạn thắp một ngọn đèn cho ai?</p>
          <div className="mz-lamps" role="group" aria-label="Bạn thắp một ngọn đèn cho ai">
            {NGUOI_HOI.map((a) => (
              <button key={a} className="mzl mz-li" type="button" data-a={a} aria-pressed={chon === a}>
                <span className="mz-cup" aria-hidden="true">
                  <i />
                </span>
                <span className="mz-lt">{NGUOI_HOI_CHU[a].nhan}</span>
              </button>
            ))}
          </div>
          <p className="mz-wel" id="gWelcome" aria-live="polite">
            {loiChao}
          </p>
          <button className="mzl glook mz-look" id="gateOpen" type="button" data-a="">
            Tôi muốn xem quanh nhà trước
          </button>
          <p className="mzl mz-trust">
            Tôi không nói trước tương lai, không bán lễ giải hạn, và giữ kín câu chuyện của bạn.
            <span>Ba điều này nằm trong Hiến chương chín điều mà tôi công khai. Khai Minh, dược sĩ và người khai vấn.</span>
          </p>
        </div>
      </div>
      <div className="mz-words" id="mzWords">
        <p className="mz-k">CÁNH CỬA ĐÃ MỞ</p>
        <p className="mz-l1">Cánh cửa này không mở ra nhà tôi. Nó mở ra lòng bạn.</p>
        <p className="mz-l2">
          Trong lòng bạn đã có sẵn một gốc cây, một mặt trời, và một chỗ để ngồi yên. Tôi chỉ ngồi cạnh bạn, cầm một
          ngọn đèn.
        </p>
        <p className="mz-sig">
          <b>Khai Minh</b> · Người khai vấn
        </p>
        <button className="mz-enter" id="mzEnter" type="button">
          Mời bạn vào nhà ›
        </button>
        <a className="mz-thang" href="#chang">
          Đi thẳng tới chín chặng đời
        </a>
      </div>
      <div className="mz-lamp" id="mzLamp" aria-hidden="true">
        <i />
        <b />
      </div>
      <div className="mz-polish" aria-hidden="true" />
    </div>
  );
}

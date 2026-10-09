"use client";

import { useEffect } from "react";
import { laCheDoTinh, NGUOI_HOI, SU_KIEN, type NguoiHoi } from "@/lib/su-kien";
import { NGUOI_HOI_CHU } from "./chu";
import {
  chiaManh,
  docDaGiac,
  HINH_VO_DIEN_THOAI,
  KHUNG_CAO,
  KHUNG_RONG,
  taoNgauNhien,
  veDuongKham,
  xCuaChang,
  yTai,
} from "./duong-kham";

type ChangGon = { ten: string; han: string; khiNao: string; cauHoi: string };

const NS = "http://www.w3.org/2000/svg";

/**
 * Hiệu ứng và thao tác của phần Chín chặng đời, chép từ script của bản mẫu:
 * đường khảm sáng dần, vỏ trứng nứt, vệt sáng lướt, khung xem trước, mở một
 * chặng, mài sơn để lộ câu hỏi, trục "bạn đang lo cho ai", tấm trượt trên
 * điện thoại. Thành phần này không vẽ chữ: mọi chữ đã có sẵn trong HTML.
 */
export function ChinChangDieuKhien({ chang }: { chang: ChangGon[] }) {
  useEffect(() => {
    const sec = document.getElementById("openSec");
    const wrap = document.getElementById("lineWrap");
    const svg = document.getElementById("lineSvg") as SVGSVGElement | null;
    const list = document.getElementById("stagesDesk");
    const mob = document.getElementById("stagesMob");
    const panel = document.getElementById("panel");
    if (!sec || !wrap || !svg || !list || !mob || !panel) return;

    const reduce = laCheDoTinh();
    const R = taoNgauNhien(Date.now() % 2147483647);
    const { diem } = veDuongKham();
    const yAt = (x: number) => yTai(diem, x);
    const huy: (() => void)[] = [];
    const nghe = <K extends keyof WindowEventMap>(
      el: Window | Document | HTMLElement,
      ten: K | string,
      fn: (e: Event) => void,
      opt?: AddEventListenerOptions,
    ) => {
      el.addEventListener(ten, fn, opt);
      huy.push(() => el.removeEventListener(ten, fn, opt));
    };
    const hen = (fn: () => void, ms: number) => {
      const t = window.setTimeout(fn, ms);
      huy.push(() => window.clearTimeout(t));
    };

    const deskBtns = [...list.querySelectorAll<HTMLButtonElement>(".stage-btn")];
    const mobBtns = [...mob.querySelectorAll<HTMLButtonElement>(":scope > button")];
    const cards = [...panel.querySelectorAll<HTMLElement>(".card")];
    const eggs = [...svg.querySelectorAll<SVGPathElement>("#eggs .egg")];

    /* ---------- Đường khảm vàng ---------- */
    const A = svg.querySelector<SVGPathElement>("#inlayA")!;
    const B = svg.querySelector<SVGPathElement>("#inlayB")!;
    const L = svg.querySelector<SVGPathElement>("#lit")!;
    const len = A.getTotalLength();
    A.style.setProperty("--len", String(len));
    B.style.setProperty("--len", String(len));
    L.style.strokeDasharray = String(len);
    L.style.strokeDashoffset = String(len);

    function placeLabels() {
      // Khoảng đệm 150px trên và dưới đường khảm do CSS đặt sẵn
      // (.km-js .line-wrap, styles/trang-chu-them.css). Bản mẫu đặt đệm bằng
      // script sau khi đo, nên ở chế độ tĩnh (mọi thuộc tính "chuyển" trong
      // .01ms) lần đo đầu thiếu 150px và thẻ chặng đè lên hàng chữ phía trên.
      const r = svg!.getBoundingClientRect();
      const wr = wrap!.getBoundingClientRect();
      deskBtns.forEach((b, k) => {
        const px = xCuaChang(k);
        b.style.left = `${r.left - wr.left + (px / KHUNG_RONG) * r.width}px`;
        const up = k % 2 === 1;
        b.classList.toggle("up", up);
        const ly = r.top - wr.top + (yAt(px) / KHUNG_CAO) * r.height;
        b.style.top = `${up ? ly - 18 : ly + 18}px`;
      });
    }

    /* ---------- Vệt sáng lướt trên đường khảm ---------- */
    const sheen = svg.querySelector<SVGEllipseElement>("#sheen")!;
    let sx = -200;
    let target = -200;
    let raf: number | null = null;
    function frame() {
      sx += (target - sx) * 0.07;
      sheen.setAttribute("cx", sx.toFixed(1));
      sheen.setAttribute("cy", yAt(Math.max(20, Math.min(1180, sx))).toFixed(1));
      raf = Math.abs(target - sx) > 0.5 ? requestAnimationFrame(frame) : null;
    }
    function glideTo(x: number) {
      if (reduce) {
        sheen.setAttribute("cx", String(x));
        sheen.setAttribute("cy", String(yAt(x)));
        return;
      }
      target = x;
      if (!raf) raf = requestAnimationFrame(frame);
    }
    huy.push(() => {
      if (raf) cancelAnimationFrame(raf);
    });

    /* ---------- Khung xem trước một chặng ---------- */
    let pkCur = 4;
    const pkK = document.getElementById("pkK");
    const pkFeel = document.getElementById("pkFeel");
    const pkQ = document.getElementById("pkQ");
    const pkGoT = document.getElementById("pkGoT");
    function peek(k: number) {
      pkCur = k;
      const s = chang[k]!;
      if (pkK) pkK.textContent = `Chặng ${k + 1} · ${s.han} · ${s.ten}`;
      if (pkFeel) pkFeel.textContent = `${s.khiNao}.`;
      if (pkQ) pkQ.textContent = `“${s.cauHoi}”`;
      if (pkGoT) pkGoT.textContent = `Đọc trọn chặng ${s.ten} `;
      deskBtns.forEach((x, i) => x.classList.toggle("peeking", i === k));
    }

    /* ---------- Mở một chặng ---------- */
    let cur = -1;
    const isMob = () => window.matchMedia("(max-width: 859px)").matches;
    const sheetTitle = document.getElementById("sheetTitle");
    const sheetClose = document.getElementById("sheetClose");

    function lightPath(k: number) {
      L.classList.add("on");
      L.style.strokeDashoffset = String(Math.max(0, len * (1 - xCuaChang(k) / KHUNG_RONG)));
    }

    function crackle(k: number) {
      const g = svg!.querySelector("#eggs")!;
      g.querySelectorAll(".crack").forEach((c) => c.remove());
      eggs.forEach((e) => e.classList.remove("hide"));
      const e = eggs[k]!;
      const poly = docDaGiac(e.getAttribute("d")!);
      const manh = chiaManh(poly, 10, R);
      const grp = document.createElementNS(NS, "g");
      grp.setAttribute("class", "crack");
      grp.setAttribute("transform", e.getAttribute("transform")!.replace("scale(1.35)", "scale(2.1)"));
      let cx = 0;
      let cy = 0;
      poly.forEach((p) => {
        cx += p[0];
        cy += p[1];
      });
      cx /= poly.length;
      cy /= poly.length;
      const cells = manh.map(({ manh: m, hat }) => {
        const pg = document.createElementNS(NS, "polygon");
        pg.setAttribute("points", m.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" "));
        grp.appendChild(pg);
        return [pg, hat[0] - cx, hat[1] - cy] as const;
      });
      g.appendChild(grp);
      e.classList.add("hide");
      if (reduce) {
        cells.forEach(([pg, dx, dy]) => {
          pg.style.transform = `translate(${(dx * 0.06).toFixed(2)}px,${(dy * 0.06).toFixed(2)}px)`;
        });
        return;
      }
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          cells.forEach(([pg, dx, dy], i) => {
            pg.style.transitionDelay = `${i * 40}ms`;
            pg.style.transform = `translate(${(dx * 0.07).toFixed(2)}px,${(dy * 0.07).toFixed(2)}px) rotate(${((R() - 0.5) * 6).toFixed(1)}deg)`;
          });
        }),
      );
    }

    function mobFx(k: number) {
      const b = mobBtns[k];
      const vl = document.getElementById("vlit");
      if (!b || !vl) return;
      vl.style.height = `${b.offsetTop + b.offsetHeight / 2 - 8}px`;
      mobBtns.forEach((x) => {
        x.classList.remove("cracked");
        x.querySelector(".mcrack")?.remove();
      });
      const sv = document.createElementNS(NS, "svg");
      sv.setAttribute("class", "mcrack");
      sv.setAttribute("viewBox", "-12 -10 24 20");
      sv.setAttribute("aria-hidden", "true");
      const g = document.createElementNS(NS, "g");
      g.setAttribute("transform", "scale(1.25)");
      sv.appendChild(g);
      const cells = chiaManh(docDaGiac(HINH_VO_DIEN_THOAI), 8, R).map(({ manh: m, hat }) => {
        const pg = document.createElementNS(NS, "polygon");
        pg.setAttribute("points", m.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" "));
        g.appendChild(pg);
        return [pg, hat] as const;
      });
      b.appendChild(sv);
      b.classList.add("cracked");
      if (!reduce)
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            cells.forEach(([pg, h], i) => {
              pg.style.transitionDelay = `${i * 45}ms`;
              pg.style.transform = `translate(${(h[0] * 0.09).toFixed(2)}px,${(h[1] * 0.09).toFixed(2)}px)`;
            });
          }),
        );
    }

    /* ---------- Mài sơn để thấy câu hỏi ---------- */
    let kb = false;
    nghe(document, "keydown", (e) => {
      const k = (e as KeyboardEvent).key;
      if (k === "Tab" || k === "Enter" || k === " ") kb = true;
    });
    nghe(document, "pointerdown", () => {
      kb = false;
    });

    type MaiSon = { reset: () => void; huy: () => void };
    function taoMaiSon(card: HTMLElement): MaiSon {
      const hand = card.querySelector<HTMLElement>(".hand")!;
      const pc = card.querySelector<HTMLCanvasElement>(".polish")!;
      const pctx = pc.getContext("2d");
      let pDone = true;
      let pMoves = 0;
      let pLast: [number, number] | null = null;
      let pAuto: number | undefined;
      const timers: number[] = [];
      function cover() {
        if (!pctx) return;
        const r = hand.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) return;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const W = r.width;
        const H = r.height;
        pc.width = Math.round(W * dpr);
        pc.height = Math.round(H * dpr);
        pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        pctx.globalCompositeOperation = "source-over";
        pctx.fillStyle = "#0F0B09";
        pctx.fillRect(0, 0, W, H);
        const r2 = taoNgauNhien(Math.floor(R() * 1e9));
        for (let i = 0; i < 1100; i++) {
          pctx.fillStyle = `rgba(232,205,150,${(r2() * 0.05).toFixed(3)})`;
          pctx.fillRect(r2() * W, r2() * H, 2 + r2() * 18, 0.6);
        }
        for (let j = 0; j < 140; j++) {
          pctx.fillStyle = `rgba(226,194,122,${(0.12 + r2() * 0.25).toFixed(2)})`;
          const s = 0.6 + r2() * 1.1;
          pctx.fillRect(r2() * W, r2() * H, s, s);
        }
      }
      function finish() {
        pDone = true;
        pc.classList.add("done");
        window.clearTimeout(pAuto);
      }
      function reset() {
        window.clearTimeout(pAuto);
        if (reduce || !pctx) {
          finish();
          return;
        }
        pDone = false;
        pMoves = 0;
        pLast = null;
        pc.classList.remove("done");
        timers.push(window.setTimeout(cover, 60), window.setTimeout(cover, 950));
        pAuto = window.setTimeout(finish, 9000);
        if (kb) timers.push(window.setTimeout(finish, 1200));
      }
      function sand(x: number, y: number) {
        if (!pctx) return;
        pctx.globalCompositeOperation = "destination-out";
        for (let i = 0; i < 5; i++) {
          const rx = 6 + R() * 12;
          const ry = 3 + R() * 6;
          pctx.fillStyle = `rgba(0,0,0,${(0.16 + R() * 0.22).toFixed(2)})`;
          pctx.beginPath();
          pctx.ellipse(x + (R() - 0.5) * 14, y + (R() - 0.5) * 10, rx, ry, (R() - 0.5) * 0.8, 0, Math.PI * 2);
          pctx.fill();
        }
      }
      function revealed() {
        try {
          const d = pctx!.getImageData(0, 0, pc.width, pc.height).data;
          let n = 0;
          for (let i = 0; i < 500; i++) {
            const px = Math.floor(R() * pc.width);
            const py = Math.floor(R() * pc.height);
            if (d[(py * pc.width + px) * 4 + 3]! < 60) n++;
          }
          return n / 500;
        } catch {
          return 1;
        }
      }
      const onMove = (ev: PointerEvent) => {
        if (pDone) return;
        if (ev.pointerType === "mouse" && ev.buttons === 0 && pMoves > 400) return;
        const r = pc.getBoundingClientRect();
        const x = ev.clientX - r.left;
        const y = ev.clientY - r.top;
        if (pLast) {
          const dx = x - pLast[0];
          const dy = y - pLast[1];
          const steps = Math.min(12, Math.ceil(Math.hypot(dx, dy) / 6));
          for (let s = 1; s <= steps; s++) sand(pLast[0] + (dx * s) / steps, pLast[1] + (dy * s) / steps);
        } else sand(x, y);
        pLast = [x, y];
        pMoves++;
        window.clearTimeout(pAuto);
        pAuto = window.setTimeout(finish, 9000);
        if (pMoves % 12 === 0 && revealed() > 0.42) finish();
      };
      const onLeave = () => {
        pLast = null;
      };
      pc.addEventListener("pointermove", onMove);
      pc.addEventListener("pointerleave", onLeave);
      const ro =
        "ResizeObserver" in window
          ? new ResizeObserver(() => {
              if (!pDone && pMoves === 0) cover();
            })
          : null;
      ro?.observe(hand);
      return {
        reset,
        huy: () => {
          pc.removeEventListener("pointermove", onMove);
          pc.removeEventListener("pointerleave", onLeave);
          ro?.disconnect();
          window.clearTimeout(pAuto);
          timers.forEach((t) => window.clearTimeout(t));
        },
      };
    }
    const maiSon = cards.map(taoMaiSon);
    huy.push(() => maiSon.forEach((m) => m.huy()));

    /* ---------- Hướng dẫn lần đầu: chặng 5 sáng nhẹ cho tới lần chạm đầu tiên ---------- */
    let hinted = false;
    function clearHint() {
      document.querySelectorAll("#openSec .hint").forEach((x) => x.classList.remove("hint"));
      hinted = true;
    }
    function showHint() {
      if (hinted) return;
      deskBtns[4]?.classList.add("hint");
      mobBtns[4]?.classList.add("hint");
    }

    let thoiDiemDongTam: number | undefined;
    function openStage(k: number, focus: boolean) {
      const s = chang[k];
      const card = cards[k];
      if (!s || !card) return;
      cur = k;
      cards.forEach((c, i) => c.classList.toggle("km-on", i === k));
      [...deskBtns, ...mobBtns].forEach((b) => b.setAttribute("aria-expanded", "false"));
      deskBtns[k]?.setAttribute("aria-expanded", "true");
      mobBtns[k]?.setAttribute("aria-expanded", "true");
      panel!.classList.add("open-p");
      glideTo(xCuaChang(k));
      lightPath(k);
      crackle(k);
      maiSon[k]?.reset();
      mobFx(k);
      if (sheetTitle) sheetTitle.textContent = `Chặng ${k + 1} · ${s.ten}`;
      clearHint();
      if (isMob()) {
        // Tấm trượt nằm trong #openSec: nâng cả phần này lên trên các phần sau
        // khi tấm đang mở (bản mẫu chuyển tấm ra <body>, React không cho làm thế).
        window.clearTimeout(thoiDiemDongTam);
        sec!.classList.add("km-tam-mo");
        panel!.scrollTop = 0;
        document.body.style.overflow = "hidden";
        hen(() => sheetClose?.focus({ preventScroll: true }), 400);
      } else if (focus) {
        hen(
          () => {
            card.focus({ preventScroll: true });
            panel!.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
          },
          reduce ? 0 : 450,
        );
      }
    }

    deskBtns.forEach((b, k) => {
      nghe(b, "click", () => openStage(k, true));
      nghe(b, "mouseenter", () => {
        glideTo(xCuaChang(k));
        peek(k);
      });
      nghe(b, "focus", () => {
        glideTo(xCuaChang(k));
        peek(k);
      });
    });
    mobBtns.forEach((b, k) => nghe(b, "click", () => openStage(k, true)));
    const pkGo = document.getElementById("pkGo");
    if (pkGo) nghe(pkGo, "click", () => openStage(pkCur, true));
    cards.forEach((card) =>
      card.querySelectorAll<HTMLButtonElement>(".pn button").forEach((b) =>
        nghe(b, "click", () => {
          const den = Number(b.dataset.den);
          if (den >= 0 && den < chang.length) openStage(den, true);
        }),
      ),
    );
    if (sheetClose)
      nghe(sheetClose, "click", () => {
        panel.classList.remove("open-p");
        document.body.style.overflow = "";
        thoiDiemDongTam = window.setTimeout(() => sec.classList.remove("km-tam-mo"), 600);
        mobBtns[cur]?.focus({ preventScroll: true });
      });
    nghe(window, "resize", () => {
      if (!isMob() && sec.classList.contains("km-tam-mo")) {
        sec.classList.remove("km-tam-mo");
        document.body.style.overflow = "";
      }
    });
    huy.push(() => {
      window.clearTimeout(thoiDiemDongTam);
      document.body.style.overflow = "";
    });

    /* ---------- Trục người hỏi ---------- */
    const askBtns = [...sec.querySelectorAll<HTMLButtonElement>(".asker button")];
    const askerNote = document.getElementById("askerNote");
    let curAsk: NguoiHoi | null = null;
    function chonNguoiHoi(a: NguoiHoi) {
      const off = curAsk === a;
      curAsk = off ? null : a;
      askBtns.forEach((x) => x.setAttribute("aria-pressed", String(!off && x.dataset.a === a)));
      const set = off ? null : NGUOI_HOI_CHU[a].chang;
      deskBtns.forEach((s, i) => s.classList.toggle("dim", !!set && !set.includes(i)));
      mobBtns.forEach((s, i) => s.classList.toggle("dim", !!set && !set.includes(i)));
      eggs.forEach((s, i) => s.classList.toggle("dim", !!set && !set.includes(i)));
      if (askerNote) askerNote.textContent = off ? "" : NGUOI_HOI_CHU[a].loiNhan;
      if (set) peek(set[0]!);
    }
    askBtns.forEach((b) =>
      nghe(b, "click", () => {
        const a = b.dataset.a as NguoiHoi;
        if (NGUOI_HOI.includes(a)) chonNguoiHoi(a);
      }),
    );
    // Lựa chọn "thắp đèn cho ai" ở cánh cổng được truyền xuống trục này (docs/03, mục 5).
    nghe(window, SU_KIEN.chonNguoiHoi, (e) => {
      const a = (e as CustomEvent<NguoiHoi>).detail;
      if (NGUOI_HOI.includes(a) && curAsk !== a) chonNguoiHoi(a);
    });
    // Mục lục: "Mở chặng này trên trang chủ".
    nghe(window, SU_KIEN.moChang, (e) => {
      const k = (e as CustomEvent<number>).detail;
      document.getElementById("chang")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      openStage(k, true);
    });

    /* ---------- Khởi động ---------- */
    peek(4);
    placeLabels();
    nghe(window, "resize", placeLabels);
    document.fonts?.ready.then(placeLabels);
    if ("IntersectionObserver" in window) {
      const ioH = new IntersectionObserver(
        (es) => {
          if (es[0]?.isIntersecting) {
            hen(showHint, 700);
            ioH.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      const chon = document.getElementById("chang");
      if (chon) ioH.observe(chon);
      huy.push(() => ioH.disconnect());
    } else hen(showHint, 2500);

    if (reduce) {
      svg.classList.add("drawn");
      wrap.classList.add("drawn");
    } else {
      svg.classList.add("draw");
      hen(() => {
        wrap.classList.add("drawn");
        svg.classList.add("drawn");
      }, 2600);
      hen(() => {
        target = 1400;
        if (!raf) raf = requestAnimationFrame(frame);
      }, 1100);
      hen(() => {
        target = -200;
      }, 4200);
    }

    return () => huy.forEach((f) => f());
  }, [chang]);

  return null;
}

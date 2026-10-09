"use client";

import { useEffect } from "react";
import { laCheDoTinh } from "@/lib/su-kien";

/**
 * Hiệu ứng của phần Ba cửa, chép từ script của bản mẫu: từng câu của lá thư
 * sáng dần khi cuộn tới, đường vàng rủ xuống, gõ cửa thì hai cánh mở ra.
 *
 * Khác bản mẫu: phòng sau cánh cửa đóng dùng `inert` thay cho `aria-hidden`,
 * để các liên kết trong phòng không nhận focus khi còn bị che (axe:
 * aria-hidden-focus).
 */
export function BaCuaHieuUng() {
  useEffect(() => {
    const sec = document.getElementById("ba-cua");
    if (!sec) return;
    const reduce = laCheDoTinh();
    const huy: (() => void)[] = [];

    /* ---------- Thắp chữ: từng câu sáng dần khi cuộn tới ---------- */
    const lns = [...sec.querySelectorAll<HTMLElement>("#letter3 .ln")];
    const dsc = document.getElementById("descend");
    const lightLines = () => {
      const vh = window.innerHeight;
      lns.forEach((l) => {
        if (l.getBoundingClientRect().top < vh * 0.66) l.classList.add("lit");
      });
      if (dsc && dsc.getBoundingClientRect().top < vh * 0.8) dsc.classList.add("on");
    };
    if (reduce) {
      lns.forEach((l) => l.classList.add("lit"));
      dsc?.classList.add("on");
    } else {
      const onScroll = () => requestAnimationFrame(lightLines);
      window.addEventListener("scroll", onScroll, { passive: true });
      huy.push(() => window.removeEventListener("scroll", onScroll));
      lightLines();
    }

    /* ---------- Cổng tam quan: gõ cửa, hai cánh mở ra ---------- */
    sec.querySelectorAll<HTMLElement>(".tq-bay").forEach((g) => {
      const door = g.querySelector<HTMLButtonElement>(".tq-door");
      const shut = g.querySelector<HTMLButtonElement>(".shut");
      const room = g.querySelector<HTMLElement>(".room");
      if (!door || !shut || !room) return;
      room.inert = true;
      const timers: number[] = [];
      const moCua = () => {
        if (g.classList.contains("is-open") || g.classList.contains("knock")) return;
        const go = () => {
          g.classList.remove("knock");
          g.classList.add("is-open");
          door.setAttribute("aria-expanded", "true");
          room.inert = false;
          timers.push(window.setTimeout(() => room.querySelector("a")?.focus({ preventScroll: true }), reduce ? 50 : 1100));
        };
        if (reduce) go();
        else {
          g.classList.add("knock");
          timers.push(window.setTimeout(go, 520));
        }
      };
      const khepCua = () => {
        g.classList.remove("is-open");
        door.setAttribute("aria-expanded", "false");
        room.inert = true;
        door.focus({ preventScroll: true });
      };
      door.addEventListener("click", moCua);
      shut.addEventListener("click", khepCua);
      huy.push(() => {
        door.removeEventListener("click", moCua);
        shut.removeEventListener("click", khepCua);
        timers.forEach((t) => window.clearTimeout(t));
        room.inert = false;
      });
    });

    return () => huy.forEach((f) => f());
  }, []);

  return null;
}

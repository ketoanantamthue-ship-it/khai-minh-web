"use client";

import { useEffect, useState } from "react";
import { doors, DOOR_KEYS } from "@/lib/doors";
import { SU_KIEN } from "@/lib/su-kien";
import { NutChuLon } from "../HienThiToggle";
import { VetMai } from "../VetMai";

/** Thanh đầu trang rút gọn: hiện lại khi khách cuộn ngược lên (bản mẫu: `.minibar`). */
export function ThanhRutGon() {
  const [hien, setHien] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const past = y > window.innerHeight * 0.9;
      setHien((cu) => (past && y < lastY - 4 ? true : y > lastY + 4 ? false : cu && past));
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={hien ? "minibar show" : "minibar"}
      id="minibar"
      role="region"
      aria-label="Thanh điều hướng rút gọn"
      inert={!hien}
    >
      <a className="mk brand" href="#dau-trang" aria-label="Khai Minh, về đầu trang">
        <VetMai size={26} />
        <span>KHAI MINH</span>
      </a>
      <div className="r">
        <nav className="navl" aria-label="Ba cửa, thanh rút gọn">
          {DOOR_KEYS.map((k) => (
            <a key={k} href={doors[k].href}>
              <i className="dd" style={{ background: doors[k].dc }} aria-hidden="true" />
              Cửa {doors[k].ten}
            </a>
          ))}
        </nav>
        <a className="ask-l" href="#gui-cau-hoi">
          Gửi một câu hỏi
        </a>
        <NutChuLon nhan="Chữ lớn" />
        <button
          className="index-btn"
          id="openIndex2"
          type="button"
          aria-haspopup="dialog"
          aria-controls="index"
          onClick={(e) => window.dispatchEvent(new CustomEvent(SU_KIEN.moMucLuc, { detail: e.currentTarget }))}
        >
          <i aria-hidden="true" />
          Mục lục
        </button>
      </div>
    </div>
  );
}

const PHAN: [string, string][] = [
  ["openSec", "I"],
  ["micro", "II"],
  ["ba-cua", "III"],
  ["binh-minh", "IV"],
  ["nguoi-giu", "V"],
  ["dong-hanh", "VI"],
  ["loi-hua", "VII"],
  ["khoang-lang", "VIII"],
  ["gui-cau-hoi", "IX"],
];

/** Vòng số La Mã ở góc, chỉ phần đang xem (docs/03, mục 4). */
export function VongChuong() {
  const [so, setSo] = useState("I");
  const [hien, setHien] = useState(false);

  useEffect(() => {
    const P = PHAN.map(([id, r]) => ({ el: document.getElementById(id), r })).filter((x) => x.el);
    let tk = false;
    const upd = () => {
      const mid = window.innerHeight * 0.4;
      let a = P[0];
      P.forEach((x) => {
        if (x.el!.getBoundingClientRect().top <= mid) a = x;
      });
      if (a) setSo(a.r);
      setHien(window.scrollY > window.innerHeight * 0.6);
      tk = false;
    };
    const onScroll = () => {
      if (!tk) {
        tk = true;
        requestAnimationFrame(upd);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    upd();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className={hien ? "chap-ring on" : "chap-ring"} id="chapRing" aria-hidden="true">
      <span className="rl">Phần</span>
      <span className="rn" id="chapRingN">
        {so}
      </span>
    </aside>
  );
}

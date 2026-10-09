"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { useCoJs } from "@/lib/dung-moi-truong";

type Tram = { so: string; ten: string; hen: string };

const GX = ["12.5%", "37.5%", "62.5%", "87.5%"];
const GY = [118, 86, 56, 26];
const OFF = [875, 625, 375, 125];

/**
 * Con đường có đèn (bản mẫu K1.9.7): bốn trạm là bốn tab, ngọn đèn đi tới
 * trạm đang chọn. Khi chưa có JavaScript, bốn bảng trạm xếp dọc.
 */
export function ConDuongTabs({ tram, bang }: { tram: Tram[]; bang: ReactNode[] }) {
  const js = useCoJs();
  const [chon, setChon] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const sel = (k: number, focus = false) => {
    setChon(k);
    if (focus) tabs.current[k]?.focus();
  };
  const phim = (e: KeyboardEvent, j: number) => {
    let k: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") k = (j + 1) % 4;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") k = (j + 3) % 4;
    else if (e.key === "Home") k = 0;
    else if (e.key === "End") k = 3;
    if (k !== null) {
      e.preventDefault();
      sel(k, true);
    }
  };

  return (
    <>
      <div className="lp-road" style={{ "--gx": GX[chon], "--gy": `${GY[chon]}px` } as CSSProperties}>
        <svg className="lp-svg" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="lpGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#7A5A8A" />
              <stop offset=".45" stopColor="#B9788A" />
              <stop offset=".75" stopColor="#D99A6C" />
              <stop offset="1" stopColor="#E8C26A" />
            </linearGradient>
          </defs>
          <path
            className="lp-dim"
            d="M0 136 C 60 130, 90 120, 125 118 S 300 92, 375 86 S 560 60, 625 56 S 820 30, 875 26 S 960 14, 1000 10"
          />
          <path
            className="lp-lit"
            pathLength={1000}
            style={{ strokeDashoffset: OFF[chon] }}
            d="M0 136 C 60 130, 90 120, 125 118 S 300 92, 375 86 S 560 60, 625 56 S 820 30, 875 26 S 960 14, 1000 10"
          />
        </svg>
        <div className="lp-guide" aria-hidden="true">
          <i />
          <b />
          <span>Khai Minh cầm đèn</span>
        </div>
        <div className="lp-stops" role="tablist" aria-label="Bốn trạm trên con đường đồng hành">
          {tram.map((t, j) => (
            <button
              key={t.ten}
              ref={(el) => {
                tabs.current[j] = el;
              }}
              className={j <= chon ? "lp-stop lit" : "lp-stop"}
              type="button"
              role="tab"
              id={`lpt${j + 1}`}
              aria-controls={`lpp${j + 1}`}
              aria-selected={j === chon}
              tabIndex={j === chon ? 0 : -1}
              onClick={() => sel(j)}
              onKeyDown={(e) => phim(e, j)}
            >
              <span className="lp-lan" aria-hidden="true" />
              <span className="lp-n">{t.so}</span>
              <span className="lp-t">{t.ten}</span>
              <span className="lp-c">{t.hen}</span>
            </button>
          ))}
        </div>
        <p className="lp-far">
          <b>Phía xa con đường:</b> Chứng nhận Tổng Mệnh Học™, dành cho người đã tốt nghiệp và muốn đồng hành cùng
          người khác. Chương trình sẽ mở khi đã đủ điều kiện.
        </p>
      </div>

      <div className={js ? "lp-panels lp-js" : "lp-panels"}>
        {bang.map((b, j) => (
          <div
            key={j}
            className={j === chon ? "lp-panel on" : "lp-panel"}
            role="tabpanel"
            id={`lpp${j + 1}`}
            aria-labelledby={`lpt${j + 1}`}
          >
            {b}
          </div>
        ))}
      </div>
    </>
  );
}

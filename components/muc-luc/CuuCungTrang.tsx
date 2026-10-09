"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { SAU_TANG, thangSauTang } from "@/lib/sau-tang";
import { CUU_CUNG, DuongBayCuuCung } from "./CacLop";

function ngheNeo(bao: () => void) {
  window.addEventListener("hashchange", bao);
  return () => window.removeEventListener("hashchange", bao);
}

export type ChangMucLuc = { so: number; ten: string; han: string; cauHoi: string; href: string };

/**
 * Lớp I của trang /muc-luc: cửu cung Lạc thư và thang sáu tầng của từng chặng.
 *
 * Cả chín thang đều nằm sẵn trong HTML do server dựng. Khi có JavaScript
 * (lớp `km-js` trên <html>), chỉ thang của cung đang chọn hiện ra, như lớp
 * phủ trên trang chủ; chạm một cung thì đổi thang. Khi không có JavaScript,
 * mỗi cung là liên kết tới thang của chặng ấy ngay bên dưới.
 */
export function CuuCungTrang({ chang }: { chang: ChangMucLuc[] }) {
  const [daBam, setChon] = useState<number | null>(null);
  // Mở thẳng /muc-luc#thang-3 thì chọn sẵn chặng 3; mặc định là chặng 5 ở trung cung.
  const neo = useSyncExternalStore(ngheNeo, () => window.location.hash, () => "");
  const theoNeo = /^#thang-([1-9])$/.exec(neo);
  const chon = daBam ?? (theoNeo ? Number(theoNeo[1]) - 1 : 4);

  return (
    <>
      <div className="lo" id="lo">
        <DuongBayCuuCung />
        {CUU_CUNG.map((n) => {
          const s = chang[n - 1]!;
          const on = chon === n - 1;
          return (
            <a
              key={n}
              href={`#thang-${n}`}
              className={[n === 5 ? "mid" : "", on ? "on" : ""].filter(Boolean).join(" ") || undefined}
              aria-label={`Chặng ${n}: ${s.ten}`}
              aria-current={on ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                setChon(n - 1);
                window.history.replaceState(null, "", `#thang-${n}`);
              }}
            >
              <span className="n">{n}</span>
              <span className="hz" aria-hidden="true">
                {s.han}
              </span>
              <span className="t">{s.ten}</span>
            </a>
          );
        })}
      </div>
      <p className="lo-note">Bạn chạm vào một cung để thấy con đường đi sâu dành cho chặng ấy.</p>
      <div className="ladders">
        {chang.map((c, k) => (
          <div key={c.so} className={k === chon ? "ladder on" : "ladder"} id={`thang-${c.so}`}>
            <h3>
              Chặng {c.so}: {c.ten}
            </h3>
            <p className="lq">“{c.cauHoi}”</p>
            <ol>
              {thangSauTang(c.ten).map((ten, i) => (
                <li key={SAU_TANG[i]!.ma}>
                  <span>{SAU_TANG[i]!.nhan}</span>
                  {/* Như lớp phủ: tạm dẫn về trang tầng (S3); “Đọc để hiểu” dẫn về trang chặng. */}
                  <Link href={i === 1 ? c.href : SAU_TANG[i]!.href}>{ten}</Link>
                </li>
              ))}
            </ol>
            <Link className="go" href={c.href}>
              Đọc trọn chặng {c.ten} ›
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

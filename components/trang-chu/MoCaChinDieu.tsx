"use client";

import { useEffect, useRef, useState } from "react";
import { useCoJs } from "@/lib/dung-moi-truong";

/**
 * Nút "Mở cả chín điều" và việc mở sẵn một điều khi địa chỉ có `#dieu-n`
 * (bản mẫu K1.9.8). Nút chỉ hiện khi có JavaScript (lớp `hc-js`).
 */
export function MoCaChinDieu() {
  const ref = useRef<HTMLDivElement>(null);
  const js = useCoJs();
  const [moHet, setMoHet] = useState(false);

  useEffect(() => {
    const goc = ref.current?.closest(".promises");
    if (!goc) return;
    const its = [...goc.querySelectorAll<HTMLDetailsElement>(".hc-item")];
    const sync = () => setMoHet(its.every((d) => d.open));
    const hash = () => {
      const m = /^#dieu-(\d)$/.exec(window.location.hash);
      if (m) {
        const d = document.getElementById(`dieu-${m[1]}`);
        if (d instanceof HTMLDetailsElement) d.open = true;
      }
    };
    its.forEach((d) => d.addEventListener("toggle", sync));
    window.addEventListener("hashchange", hash);
    // Mở một điều thì <details> phát sự kiện "toggle", sync chạy theo.
    hash();
    return () => {
      its.forEach((d) => d.removeEventListener("toggle", sync));
      window.removeEventListener("hashchange", hash);
    };
  }, []);

  const bam = () => {
    const goc = ref.current?.closest(".promises");
    if (!goc) return;
    const its = [...goc.querySelectorAll<HTMLDetailsElement>(".hc-item")];
    const mo = !its.every((d) => d.open);
    its.forEach((d) => {
      d.open = mo;
    });
  };

  return (
    <div className={js ? "hc-tools hc-js" : "hc-tools"} ref={ref}>
      <p className="hc-how">
        Bạn chạm vào từng điều để xem việc tôi làm, cách bạn kiểm chứng và gốc của lời hứa.
      </p>
      <button className="hc-all" type="button" aria-expanded={moHet} onClick={bam}>
        {moHet ? "Thu gọn cả chín điều" : "Mở cả chín điều"}
      </button>
    </div>
  );
}

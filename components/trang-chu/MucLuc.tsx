"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CacLopSau,
  CUU_CUNG,
  DauMucLuc,
  DuongBayCuuCung,
  ICON_CHIN_CHANG,
  NoiDungNgoiLang,
  TieuDeLop,
} from "@/components/muc-luc/CacLop";
import { bayFocus } from "@/lib/bay-focus";
import { SAU_TANG, thangSauTang } from "@/lib/sau-tang";
import { laCheDoTinh, SU_KIEN } from "@/lib/su-kien";

type ChangMuc = { ten: string; han: string; cauHoi: string };

/**
 * Lớp phủ Mục lục của trang chủ (bản mẫu K1.9.15): bốn lối đi, trong đó
 * Chín chặng đời là cửu cung Lạc thư. Mở bằng nút "Mục lục" ở đầu trang
 * hoặc thanh rút gọn; đóng bằng Esc, nút "Đóng mục lục" hay "Quay lại trang".
 * Trang /muc-luc (app/muc-luc) là bản đầy đủ cho máy đọc được (docs/02).
 */
export function MucLuc({
  chang,
  duongDanChang,
  moLoiThu = true,
}: {
  chang: ChangMuc[];
  duongDanChang: string[];
  /** Lối gửi thư đang mở (siteConfig.moLoiThu, truyền từ server; docs/07, mục A18). */
  moLoiThu?: boolean;
}) {
  const [mo, setMo] = useState(false);
  const [chon, setChon] = useState(4);
  const hop = useRef<HTMLDivElement>(null);
  const nutDong = useRef<HTMLButtonElement>(null);
  const sec1 = useRef<HTMLDetailsElement>(null);
  const nguoiMo = useRef<HTMLElement | null>(null);

  const dong = useCallback((imLang = false) => {
    setMo(false);
    document.body.style.overflow = "";
    if (!imLang) {
      const tu = nguoiMo.current?.isConnected ? nguoiMo.current : document.getElementById("openIndex");
      tu?.focus();
    }
  }, []);

  // Mở sẵn Chín chặng đời trên máy tính; trên điện thoại mỗi lần chỉ mở một lớp.
  useEffect(() => {
    if (window.matchMedia("(min-width:960px)").matches && sec1.current) sec1.current.open = true;
    const secs = [...(hop.current?.querySelectorAll<HTMLDetailsElement>(".ix-sec") ?? [])];
    const timers: number[] = [];
    const onToggle = (e: Event) => {
      const d = e.currentTarget as HTMLDetailsElement;
      if (d.open && window.matchMedia("(max-width:959px)").matches) {
        secs.forEach((o) => {
          if (o !== d) o.open = false;
        });
        timers.push(
          window.setTimeout(() => {
            try {
              d.scrollIntoView({ block: "start", behavior: "smooth" });
            } catch {
              /* trình duyệt cũ */
            }
          }, 60),
        );
      }
    };
    secs.forEach((d) => d.addEventListener("toggle", onToggle));
    return () => {
      secs.forEach((d) => d.removeEventListener("toggle", onToggle));
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    const moRa = (e: Event) => {
      const tu = (e as CustomEvent<unknown>).detail;
      nguoiMo.current = tu instanceof HTMLElement ? tu : null;
      if (window.innerWidth < 960) {
        hop.current?.querySelectorAll<HTMLDetailsElement>(".ix-sec").forEach((d) => {
          d.open = false;
        });
      }
      setMo(true);
    };
    window.addEventListener(SU_KIEN.moMucLuc, moRa);
    return () => window.removeEventListener(SU_KIEN.moMucLuc, moRa);
  }, []);

  useEffect(() => {
    const h = hop.current;
    if (!mo || !h) return;
    h.scrollTop = 0;
    document.body.style.overflow = "hidden";
    nutDong.current?.focus();
    const go = bayFocus(h);
    const esc = (e: KeyboardEvent) => {
      // Lớp Ngồi lặng nằm trên Mục lục: Esc đóng lớp đó trước.
      if (e.key === "Escape" && !document.querySelector(".breath.on")) dong();
    };
    document.addEventListener("keydown", esc);
    return () => {
      go();
      document.removeEventListener("keydown", esc);
    };
  }, [mo, dong]);

  const c = chang[chon]!;
  const tinh = () => laCheDoTinh();

  return (
    <div
      className={mo ? "index show" : "index"}
      id="index"
      role="dialog"
      aria-modal="true"
      aria-label="Mục lục"
      ref={hop}
      onClick={(e) => {
        if ((e.target as Element).closest("a")) dong(true);
      }}
    >
      <button className="x" id="closeIndex" type="button" ref={nutDong} onClick={() => dong()}>
        <span aria-hidden="true">×</span> Đóng mục lục
      </button>
      {/* Bản mẫu dùng <header>; ở đây là <div> để trang chỉ có một vùng banner (axe). */}
      <div className="idx-head">
        <DauMucLuc kieu="lop-phu" />
      </div>
      <div className="idx-wrap ix">
        <details className="ix-sec ix-1" id="ixSec1" ref={sec1}>
          <summary className="ix-sum">
            <TieuDeLop
              kieu="lop-phu"
              so="I"
              icon={ICON_CHIN_CHANG}
              ten="Chín chặng đời"
              phu="Tìm chặng đời bạn đang đi qua"
            />
          </summary>
          <div className="ix-body">
            <p className="idx-h" id="idx-cung">
              <span>Chín chặng được đặt theo cửu cung Lạc thư.</span>
            </p>
            <div className="lo" id="lo">
              <DuongBayCuuCung />
              {CUU_CUNG.map((n) => {
                const s = chang[n - 1]!;
                const on = chon === n - 1;
                return (
                  <button
                    key={n}
                    type="button"
                    className={[n === 5 ? "mid" : "", on ? "on" : ""].filter(Boolean).join(" ") || undefined}
                    aria-label={`Chặng ${n}: ${s.ten}`}
                    aria-current={on ? "true" : undefined}
                    onClick={() => setChon(n - 1)}
                  >
                    <span className="n">{n}</span>
                    <span className="hz" aria-hidden="true">
                      {s.han}
                    </span>
                    <span className="t">{s.ten}</span>
                  </button>
                );
              })}
            </div>
            <p className="lo-note">Bạn chạm vào một cung để thấy con đường đi sâu dành cho chặng ấy.</p>
            <div className="ladder" id="ladder" aria-live="polite">
              <h3>
                Chặng {chon + 1}: {c.ten}
              </h3>
              <p className="lq">“{c.cauHoi}”</p>
              <ol>
                {thangSauTang(c.ten).map((ten, i) => (
                  <li key={i}>
                    <span>{SAU_TANG[i]!.nhan}</span>
                    {/* Tạm dẫn về trang tầng (S3); bài riêng cho từng chặng chờ nội dung (docs/07). */}
                    <a href={i === 1 ? duongDanChang[chon] : SAU_TANG[i]!.href}>{ten}</a>
                  </li>
                ))}
              </ol>
              <button
                className="go"
                type="button"
                id="goStage"
                onClick={() => {
                  dong(true);
                  const k = chon;
                  window.setTimeout(
                    () => window.dispatchEvent(new CustomEvent(SU_KIEN.moChang, { detail: k })),
                    tinh() ? 0 : 350,
                  );
                }}
              >
                Mở chặng này trên trang chủ
              </button>
            </div>
          </div>
        </details>
        <div className="layers">
          <CacLopSau
            kieu="lop-phu"
            goc=""
            moLoiThu={moLoiThu}
            nutNgoiLang={
              <button
                className="ix-a"
                type="button"
                id="idxBreath"
                onClick={(e) => {
                  const tu = e.currentTarget;
                  dong(true);
                  window.dispatchEvent(new CustomEvent(SU_KIEN.ngoiLang, { detail: tu }));
                }}
              >
                <NoiDungNgoiLang />
              </button>
            }
          />
          <button className="idx-close2" id="closeIndex2" type="button" onClick={() => dong()}>
            Quay lại trang
          </button>
        </div>
      </div>
    </div>
  );
}

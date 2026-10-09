"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { bayFocus } from "@/lib/bay-focus";
import { doors, doorStyle, type DoorKey } from "@/lib/doors";
import { laCheDoTinh, SU_KIEN } from "@/lib/su-kien";

type ChangMuc = { ten: string; han: string; cauHoi: string };

/** Thứ tự ô của cửu cung Lạc thư; chặng 5 nằm ở trung cung (docs/01, mục B3). */
const CUU_CUNG = [4, 9, 2, 3, 5, 7, 8, 1, 6] as const;

/** Sáu tầng đi sâu (docs/01, mục B2) và trang nhãn tương ứng (docs/02, mục 2; dựng ở phiên S3). */
const SAU_TANG = [
  { nhan: "Bắt đầu nhẹ nhàng", href: "/tang/cham" },
  { nhan: "Đọc để hiểu", href: "/tang/hieu" },
  { nhan: "Tự soi mình", href: "/tang/soi" },
  { nhan: "Thực tập để chuyển", href: "/tang/chuyen" },
  { nhan: "Có người đi cùng", href: "/tang/dong-hanh" },
  { nhan: "Tự bước đi", href: "/tang/tot-nghiep" },
] as const;

const Ii = ({ children, className = "ii" }: { children: ReactNode; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

function Dong({ href, icon, ten, phu }: { href: string; icon: ReactNode; ten: string; phu: string }) {
  return (
    <a className="ix-a" href={href}>
      <Ii>{icon}</Ii>
      <span className="ix-t">
        {ten}
        <em>{phu}</em>
      </span>
      <i className="ix-c" aria-hidden="true">
        ›
      </i>
    </a>
  );
}

function TheCua({ cua, phu, children }: { cua: DoorKey; phu: string; children: ReactNode }) {
  const d = doors[cua];
  return (
    <div className={`idd idd-${cua}`} style={doorStyle(cua)}>
      <div className="idd-h">
        <span className="idd-seal" aria-hidden="true">
          {d.han}
        </span>
        <div>
          <h4 className="idd-n">Cửa {d.ten}</h4>
          <p className="idd-s">{phu}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

const ICON = {
  duong: (
    <>
      <path d="M5 20c2-5 7-3 8-8s4-6 6-8" />
      <circle cx="5" cy="20" r="1.3" />
      <circle cx="19" cy="4" r="1.3" />
    </>
  ),
  guong: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M12 14.5V21M9 21h6" />
    </>
  ),
  tra: (
    <>
      <path d="M4 10h13v2.5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z" />
      <path d="M17 11h1.3a2.6 2.6 0 0 1 0 5.2H16" />
      <path d="M8 3.5c0 1.5 1 1.5 1 3M12 3.5c0 1.5 1 1.5 1 3" />
    </>
  ),
  sach: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5V5.5" />
    </>
  ),
  nguoi2: (
    <>
      <circle cx="8" cy="9" r="2.8" />
      <circle cx="16" cy="9" r="2.8" />
      <path d="M3 19c.7-3 2.6-4.6 5-4.6s4.3 1.6 5 4.6M11 19c.7-3 2.6-4.6 5-4.6s4.3 1.6 5 4.6" />
    </>
  ),
};

/**
 * Lớp phủ Mục lục của trang chủ (bản mẫu K1.9.15): bốn lối đi, trong đó
 * Chín chặng đời là cửu cung Lạc thư. Mở bằng nút "Mục lục" ở đầu trang
 * hoặc thanh rút gọn; đóng bằng Esc, nút "Đóng mục lục" hay "Quay lại trang".
 * Trang /muc-luc đầy đủ cho máy đọc được dựng ở phiên S2 (docs/02).
 */
export function MucLuc({ chang, duongDanChang }: { chang: ChangMuc[]; duongDanChang: string[] }) {
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
        <span className="idx-seal" aria-hidden="true">
          明
        </span>
        <div>
          <p className="idx-t">Mục lục</p>
          <p className="idx-s">
            Ngôi nhà này có bốn lối đi. Bạn chọn lối nào gần với lòng mình nhất cũng được, và có thể quay lại đây bất cứ
            lúc nào.
          </p>
        </div>
      </div>
      <div className="idx-wrap ix">
        <details className="ix-sec ix-1" id="ixSec1" ref={sec1}>
          <summary className="ix-sum">
            <b className="ix-num">I</b>
            <Ii className="ii ix-si">
              <circle cx="6" cy="6" r="1.6" />
              <circle cx="12" cy="6" r="1.6" />
              <circle cx="18" cy="6" r="1.6" />
              <circle cx="6" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="2.2" />
              <circle cx="18" cy="12" r="1.6" />
              <circle cx="6" cy="18" r="1.6" />
              <circle cx="12" cy="18" r="1.6" />
              <circle cx="18" cy="18" r="1.6" />
            </Ii>
            <span className="ix-st">
              Chín chặng đời<em>Tìm chặng đời bạn đang đi qua</em>
            </span>
            <i className="ix-pm" aria-hidden="true" />
          </summary>
          <div className="ix-body">
            <p className="idx-h" id="idx-cung">
              <span>Chín chặng được đặt theo cửu cung Lạc thư.</span>
            </p>
            <div className="lo" id="lo">
              <svg viewBox="0 0 300 300" aria-hidden="true">
                <polyline className="fly" points="150,250 250,50 50,150 50,50 150,150 250,250 250,150 50,250 150,50" />
                <circle className="pt" cx="150" cy="250" r="2.6" />
                <circle className="pt" cx="150" cy="50" r="2.6" />
                <circle className="pt" cx="150" cy="150" r="3.4" />
              </svg>
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
                {[
                  "Lá thư của chặng này",
                  `Bài đọc sâu về ${c.ten.toLowerCase()}`,
                  "Bảng tự soi tánh hạnh",
                  "Nhật ký hai mươi mốt ngày cho chặng này",
                  "Hành trình đồng hành tám đến mười tuần",
                  "Lá thư của người đã đi hết hành trình",
                ].map((ten, i) => (
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
          <details className="ix-sec ix-2">
            <summary className="ix-sum">
              <b className="ix-num">II</b>
              <Ii className="ii ix-si">
                <path d="M6 21V4h12v17M3.5 21h17" />
                <circle cx="14.5" cy="12.5" r=".9" />
              </Ii>
              <span className="ix-st">
                Ba cánh cửa của ngôi nhà<em>Tâm, Trí và Thân: ba lối vào một ngôi nhà</em>
              </span>
              <i className="ix-pm" aria-hidden="true" />
            </summary>
            <div className="ix-body ix-doors">
              <TheCua cua="tam" phu="An Tâm Mệnh · Dành cho lòng đang rối.">
                <Dong
                  href={`${doors.tam.href}#bac-thang`}
                  icon={ICON.duong}
                  ten="Hành trình đồng hành"
                  phu="Tám đến mười tuần theo phương pháp Soi – Thấu – Chuyển"
                />
                <Dong
                  href={`${doors.tam.href}#bac-thang`}
                  icon={ICON.guong}
                  ten="Hồ sơ Soi"
                  phu="Lá số đặt cạnh điều bạn tự quan sát về mình"
                />
                <Dong
                  href={`${doors.tam.href}#bac-thang`}
                  icon={ICON.tra}
                  ten="Trà thất"
                  phu="Trò chuyện riêng; mỗi tháng tôi nhận tối đa ba người mới"
                />
                <Dong
                  href={doors.tam.href}
                  icon={
                    <>
                      <rect x="3.5" y="4" width="7.5" height="16" rx="1" />
                      <rect x="13" y="4" width="7.5" height="16" rx="1" />
                      <path d="M8.5 12h.01M15.5 12h.01" />
                    </>
                  }
                  ten="Phòng soi Khai Mệnh và phòng chuyển Khai Tâm"
                  phu="Công cụ tự soi, thực tập và nhật ký"
                />
                <Dong href={doors.tam.href} icon={ICON.nguoi2} ten="Cộng đồng" phu="Nơi cùng nhau học và thực tập" />
              </TheCua>
              <TheCua cua="tri" phu="Sách và tri thức · Dành cho người muốn hiểu.">
                <Dong
                  href={`${doors.tri.href}#sach`}
                  icon={ICON.sach}
                  ten="Sách"
                  phu="Soi – Thấu – Chuyển và các bộ sách khác"
                />
                <Dong
                  href={doors.tri.href}
                  icon={
                    <>
                      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
                      <path d="M9 10.5l2 2 4-4" />
                    </>
                  }
                  ten="Từ điển và Chuẩn Chính Tín"
                  phu="Mở cho mọi người cùng dùng"
                />
                <Dong
                  href={doors.tri.href}
                  icon={
                    <>
                      <path d="M5.5 4v15M9.5 4v15M13 6l4 13" />
                      <path d="M3 20h18" />
                    </>
                  }
                  ten="Tủ sách"
                  phu="Ba cuốn sách cho mỗi chặng đời"
                />
              </TheCua>
              <TheCua cua="than" phu="Dưỡng sinh · Dành cho thân thể đang mệt.">
                <Dong
                  href={doors.than.href}
                  icon={
                    <>
                      <path d="M5 19C5 11 11 5 20 5c0 9-6 15-14 15" />
                      <path d="M5 19l8-8" />
                    </>
                  }
                  ten="Dưỡng sinh Trần Y Thư"
                  phu="Chăm sóc thân thể thuận tự nhiên, có dẫn nguồn"
                />
              </TheCua>
            </div>
          </details>
          <details className="ix-sec ix-3">
            <summary className="ix-sum">
              <b className="ix-num">III</b>
              <Ii className="ii ix-si">
                <path d="M3.5 20h4.5v-4h4v-4h4V8h4.5" />
              </Ii>
              <span className="ix-st">
                Đi sâu theo sáu tầng<em>Từ đọc nhẹ nhàng đến tự bước đi</em>
              </span>
              <i className="ix-pm" aria-hidden="true" />
            </summary>
            <div className="ix-body ix-tang">
              <Dong
                href={SAU_TANG[0].href}
                icon={
                  <>
                    <circle cx="12" cy="12" r="3.5" />
                    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
                  </>
                }
                ten="Bắt đầu nhẹ nhàng"
                phu="Thư hằng tháng, chuyện đạo, những bài viết ngắn"
              />
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
                <Ii>
                  <path d="M3 12c3 0 3-4 6-4s3 8 6 8 3-4 6-4" />
                </Ii>
                <span className="ix-t">
                  Ngồi lặng chín mươi giây<em>Chín mươi giây thở chậm, không câu hỏi nào cần trả lời</em>
                </span>
                <i className="ix-c" aria-hidden="true">
                  ›
                </i>
              </button>
              <Dong
                href={SAU_TANG[1].href}
                icon={
                  <path d="M3 6c3-1.3 6-1.3 9 0v13c-3-1.3-6-1.3-9 0zM21 6c-3-1.3-6-1.3-9 0v13c3-1.3 6-1.3 9 0z" />
                }
                ten="Đọc để hiểu"
                phu="Bài đọc sâu, Từ điển, những điều người ta hay hiểu lầm"
              />
              <Dong href={SAU_TANG[2].href} icon={ICON.guong} ten="Tự soi mình" phu="Bảng tự soi tánh hạnh và Hồ sơ Soi" />
              <Dong
                href={SAU_TANG[3].href}
                icon={ICON.duong}
                ten="Thực tập để chuyển"
                phu="Nhật ký hai mươi mốt ngày và các lớp học"
              />
              <Dong href={SAU_TANG[4].href} icon={ICON.nguoi2} ten="Có người đi cùng" phu="Hành trình đồng hành và Trà thất" />
              <Dong
                href={SAU_TANG[5].href}
                icon={
                  <>
                    <path d="M2.5 9.5L12 5l9.5 4.5L12 14z" />
                    <path d="M6.5 11.5v4c3.5 2.5 7.5 2.5 11 0v-4" />
                  </>
                }
                ten="Tự bước đi, rồi đi cùng người khác"
                phu="Lá thư tốt nghiệp và chứng nhận Tổng Mệnh Học™"
              />
            </div>
          </details>
          <details className="ix-sec ix-4">
            <summary className="ix-sum">
              <b className="ix-num">IV</b>
              <Ii className="ii ix-si">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c1-4 4-6 7-6s6 2 7 6" />
              </Ii>
              <span className="ix-st">
                Về tôi và những lời hứa<em>Người khai vấn, Hiến chương và cách liên hệ</em>
              </span>
              <i className="ix-pm" aria-hidden="true" />
            </summary>
            <div className="ix-body ix-me">
              <Dong
                href="#dong-hanh"
                icon={
                  <>
                    <path d="M7.5 15h9l-1.3 4H8.8z" />
                    <path d="M12 4c2.3 3 2.3 5.5 0 8-2.3-2.5-2.3-5 0-8z" />
                  </>
                }
                ten="Con đường đồng hành"
                phu="Bốn trạm có người cầm đèn, không nhận tiền trong hai năm đầu"
              />
              <Dong
                href="#loi-hua"
                icon={
                  <>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M8.5 12.2l2.4 2.4 4.6-5" />
                  </>
                }
                ten="Những lời hứa"
                phu="Chín điều, mỗi điều đều có cách để bạn kiểm chứng"
              />
              <Dong
                href="/khai-minh"
                icon={
                  <>
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 20c1-4 4-6 7-6s6 2 7 6" />
                  </>
                }
                ten="Câu chuyện của tôi"
                phu="Từ nghề dược đến người khai vấn"
              />
              <Dong
                href="#gui-cau-hoi"
                icon={
                  <>
                    <rect x="3" y="6" width="18" height="12" rx="1.5" />
                    <path d="M3.5 7l8.5 6 8.5-6" />
                  </>
                }
                ten="Gửi một câu hỏi"
                phu="Tôi đọc từng câu hỏi bạn gửi"
              />
              <Dong
                href="/bao-chi"
                icon={
                  <>
                    <rect x="9" y="3" width="6" height="11" rx="3" />
                    <path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
                  </>
                }
                ten="Báo chí và hợp tác"
                phu="Tiểu sử, ảnh và những chủ đề tôi nói chuyện"
              />
              <Dong
                href="/hien-chuong"
                icon={
                  <>
                    <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8" />
                    <path d="M7 4a2 2 0 0 0-2 2v1.5h4V6a2 2 0 0 0-2-2z" />
                    <path d="M10.5 9h5M10.5 13h5" />
                  </>
                }
                ten="Hiến chương"
                phu="Những điều tôi hứa, có nguồn cho từng điều"
              />
              <Dong
                href="/minh-bach"
                icon={
                  <>
                    <path d="M12 4v16M6 20h12M5 8h14" />
                    <path d="M5 8l-2.3 5h4.6zM19 8l-2.3 5h4.6z" />
                  </>
                }
                ten="Minh bạch lợi ích"
                phu="Những lợi ích kinh doanh tôi có, nói rõ với bạn"
              />
              <Dong
                href="/du-lieu"
                icon={
                  <>
                    <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
                    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
                  </>
                }
                ten="Dữ liệu của bạn"
                phu="Cách web này giữ thông tin của bạn"
              />
            </div>
          </details>
          <button className="idx-close2" id="closeIndex2" type="button" onClick={() => dong()}>
            Quay lại trang
          </button>
        </div>
      </div>
    </div>
  );
}

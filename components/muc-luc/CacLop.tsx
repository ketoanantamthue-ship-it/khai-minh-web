import type { ReactNode } from "react";
import { doors, doorStyle, type DoorKey } from "@/lib/doors";
import { SAU_TANG } from "@/lib/sau-tang";

/**
 * Phần dùng chung của Mục lục bốn lớp (bản mẫu K1.9.15, prototypes/index.html):
 * lớp phủ trên trang chủ (components/trang-chu/MucLuc.tsx) và trang /muc-luc
 * (app/muc-luc) dựng từ cùng một chữ.
 *
 * `kieu="lop-phu"`: mỗi lớp là một <details> mở ra đóng vào, như bản mẫu.
 * `kieu="trang"`: mỗi lớp là một <section> luôn mở, tiêu đề là <h2>, để
 * người đọc và máy tìm kiếm thấy trọn bốn lớp.
 */

export type KieuMucLuc = "lop-phu" | "trang";

/** Thứ tự ô của cửu cung Lạc thư; chặng 5 nằm ở trung cung (docs/01, mục B3). */
export const CUU_CUNG = [4, 9, 2, 3, 5, 7, 8, 1, 6] as const;

export const Ii = ({ children, className = "ii" }: { children: ReactNode; className?: string }) => (
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

function TheCua({ cua, phu, kieu, children }: { cua: DoorKey; phu: string; kieu: KieuMucLuc; children: ReactNode }) {
  const d = doors[cua];
  // Trên trang /muc-luc, tên cửa nằm dưới tiêu đề lớp <h2> nên là <h3>.
  const TieuDe = kieu === "trang" ? "h3" : "h4";
  return (
    <div className={`idd idd-${cua}`} style={doorStyle(cua)}>
      <div className="idd-h">
        <span className="idd-seal" aria-hidden="true">
          {d.han}
        </span>
        <div>
          <TieuDe className="idd-n">Cửa {d.ten}</TieuDe>
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
  ngoiLang: <path d="M3 12c3 0 3-4 6-4s3 8 6 8 3-4 6-4" />,
};

/** Đầu Mục lục: dấu 明, tên và lời dẫn. Trên trang /muc-luc, tên là <h1>. */
export function DauMucLuc({ kieu }: { kieu: KieuMucLuc }) {
  const Ten = kieu === "trang" ? "h1" : "p";
  return (
    <>
      <span className="idx-seal" aria-hidden="true">
        明
      </span>
      <div>
        <Ten className="idx-t">Mục lục</Ten>
        <p className="idx-s">
          Ngôi nhà này có bốn lối đi. Bạn chọn lối nào gần với lòng mình nhất cũng được, và có thể quay lại đây bất cứ
          lúc nào.
        </p>
      </div>
    </>
  );
}

/** Dòng tiêu đề của một lớp: số La Mã, biểu tượng, tên và lời phụ. */
export function TieuDeLop({ so, icon, ten, phu, kieu }: {
  so: string;
  icon: ReactNode;
  ten: string;
  phu: string;
  kieu: KieuMucLuc;
}) {
  return (
    <>
      <b className="ix-num">{so}</b>
      <Ii className="ii ix-si">{icon}</Ii>
      <span className="ix-st">
        {ten}
        <em>{phu}</em>
      </span>
      {kieu === "lop-phu" ? <i className="ix-pm" aria-hidden="true" /> : null}
    </>
  );
}

export const ICON_CHIN_CHANG = (
  <>
    <circle cx="6" cy="6" r="1.6" />
    <circle cx="12" cy="6" r="1.6" />
    <circle cx="18" cy="6" r="1.6" />
    <circle cx="6" cy="12" r="1.6" />
    <circle cx="12" cy="12" r="2.2" />
    <circle cx="18" cy="12" r="1.6" />
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="12" cy="18" r="1.6" />
    <circle cx="18" cy="18" r="1.6" />
  </>
);

/** Đường bay phi tinh nối chín cung theo thứ tự 1 → 9 (docs/nguon/chin-chang-doi.md). */
export function DuongBayCuuCung() {
  return (
    <svg viewBox="0 0 300 300" aria-hidden="true">
      <polyline className="fly" points="150,250 250,50 50,150 50,50 150,150 250,250 250,150 50,250 150,50" />
      <circle className="pt" cx="150" cy="250" r="2.6" />
      <circle className="pt" cx="150" cy="50" r="2.6" />
      <circle className="pt" cx="150" cy="150" r="3.4" />
    </svg>
  );
}

function Lop({ kieu, lop, id, tieuDe, thanLop, children }: {
  kieu: KieuMucLuc;
  lop: string;
  id: string;
  tieuDe: ReactNode;
  thanLop: string;
  children: ReactNode;
}) {
  if (kieu === "lop-phu") {
    return (
      <details className={`ix-sec ${lop}`}>
        <summary className="ix-sum">{tieuDe}</summary>
        <div className={`ix-body ${thanLop}`}>{children}</div>
      </details>
    );
  }
  return (
    <section className={`ix-sec ${lop}`} aria-labelledby={id}>
      <h2 className="ix-sum" id={id}>
        {tieuDe}
      </h2>
      <div className={`ix-body ${thanLop}`}>{children}</div>
    </section>
  );
}

/**
 * Lớp II, III và IV.
 *
 * - `nutNgoiLang`: lối "Ngồi lặng chín mươi giây". Lớp phủ dùng nút mở lớp
 *   Ngồi lặng ngay trên trang chủ; trang /muc-luc dùng liên kết.
 * - `goc`: tiền tố cho các neo của trang chủ (`#dong-hanh`…). Lớp phủ nằm
 *   trên trang chủ nên để trống; trang /muc-luc đặt "/".
 */
export function CacLopSau({ kieu, nutNgoiLang, goc }: { kieu: KieuMucLuc; nutNgoiLang: ReactNode; goc: "" | "/" }) {
  return (
    <>
      <Lop
        kieu={kieu}
        lop="ix-2"
        id="lop-ba-cua"
        thanLop="ix-doors"
        tieuDe={
          <TieuDeLop
            kieu={kieu}
            so="II"
            icon={
              <>
                <path d="M6 21V4h12v17M3.5 21h17" />
                <circle cx="14.5" cy="12.5" r=".9" />
              </>
            }
            ten="Ba cánh cửa của ngôi nhà"
            phu="Tâm, Trí và Thân: ba lối vào một ngôi nhà"
          />
        }
      >
        <TheCua kieu={kieu} cua="tam" phu="An Tâm Mệnh · Dành cho lòng đang rối.">
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
        <TheCua kieu={kieu} cua="tri" phu="Sách và tri thức · Dành cho người muốn hiểu.">
          <Dong href={`${doors.tri.href}#sach`} icon={ICON.sach} ten="Sách" phu="Soi – Thấu – Chuyển và các bộ sách khác" />
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
        <TheCua kieu={kieu} cua="than" phu="Dưỡng sinh · Dành cho thân thể đang mệt.">
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
      </Lop>

      <Lop
        kieu={kieu}
        lop="ix-3"
        id="lop-sau-tang"
        thanLop="ix-tang"
        tieuDe={
          <TieuDeLop
            kieu={kieu}
            so="III"
            icon={<path d="M3.5 20h4.5v-4h4v-4h4V8h4.5" />}
            ten="Đi sâu theo sáu tầng"
            phu="Từ đọc nhẹ nhàng đến tự bước đi"
          />
        }
      >
        <Dong
          href={SAU_TANG[0].href}
          icon={
            <>
              <circle cx="12" cy="12" r="3.5" />
              <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
            </>
          }
          ten="Bắt đầu nhẹ nhàng"
          phu={SAU_TANG[0].phu}
        />
        {nutNgoiLang}
        <Dong
          href={SAU_TANG[1].href}
          icon={<path d="M3 6c3-1.3 6-1.3 9 0v13c-3-1.3-6-1.3-9 0zM21 6c-3-1.3-6-1.3-9 0v13c3-1.3 6-1.3 9 0z" />}
          ten="Đọc để hiểu"
          phu={SAU_TANG[1].phu}
        />
        <Dong href={SAU_TANG[2].href} icon={ICON.guong} ten="Tự soi mình" phu={SAU_TANG[2].phu} />
        <Dong
          href={SAU_TANG[3].href}
          icon={ICON.duong}
          ten="Thực tập để chuyển"
          phu={SAU_TANG[3].phu}
        />
        <Dong href={SAU_TANG[4].href} icon={ICON.nguoi2} ten="Có người đi cùng" phu={SAU_TANG[4].phu} />
        <Dong
          href={SAU_TANG[5].href}
          icon={
            <>
              <path d="M2.5 9.5L12 5l9.5 4.5L12 14z" />
              <path d="M6.5 11.5v4c3.5 2.5 7.5 2.5 11 0v-4" />
            </>
          }
          ten="Tự bước đi, rồi đi cùng người khác"
          phu={SAU_TANG[5].phu}
        />
      </Lop>

      <Lop
        kieu={kieu}
        lop="ix-4"
        id="lop-ve-toi"
        thanLop="ix-me"
        tieuDe={
          <TieuDeLop
            kieu={kieu}
            so="IV"
            icon={
              <>
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c1-4 4-6 7-6s6 2 7 6" />
              </>
            }
            ten="Về tôi và những lời hứa"
            phu="Người khai vấn, Hiến chương và cách liên hệ"
          />
        }
      >
        <Dong
          href={`${goc}#dong-hanh`}
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
          href={`${goc}#loi-hua`}
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
          href={`${goc}#gui-cau-hoi`}
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
      </Lop>
    </>
  );
}

/** Nội dung của lối "Ngồi lặng chín mươi giây" (biểu tượng, tên, lời phụ, mũi tên). */
export function NoiDungNgoiLang() {
  return (
    <>
      <Ii>{ICON.ngoiLang}</Ii>
      <span className="ix-t">
        Ngồi lặng chín mươi giây<em>Chín mươi giây thở chậm, không câu hỏi nào cần trả lời</em>
      </span>
      <i className="ix-c" aria-hidden="true">
        ›
      </i>
    </>
  );
}

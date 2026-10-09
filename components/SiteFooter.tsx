import Link from "next/link";
import type { ReactNode } from "react";
import { doors } from "@/lib/doors";
import { siteConfig } from "@/site.config";
import { NutBanNhe, NutChuLon } from "./HienThiToggle";
import { VetMai } from "./VetMai";

/**
 * Chân trang dùng chung, chép từ `footer.ft` của prototypes/cua-tam.html (K1.9.9).
 *
 * Liên kết "#" của bản mẫu được nối vào route ở docs/02. Mục nào chưa có
 * route hay chất liệu thì giữ chữ, bỏ `href` và gắn `data-can` (docs/07).
 */

type MucLienKet = { ten: string; href: string | null; can?: string };

const KHAM_PHA: MucLienKet[] = [
  { ten: "Câu chuyện của tôi", href: "/khai-minh" },
  { ten: "Chín chặng đời", href: "/#chang" },
  { ten: "Ba cánh cửa", href: "/#ba-cua" },
  { ten: `Cửa ${doors.tam.ten}`, href: doors.tam.href },
  { ten: `Cửa ${doors.tri.ten}`, href: doors.tri.href },
  { ten: `Cửa ${doors.than.ten}`, href: doors.than.href },
  { ten: "Con đường đồng hành", href: "/#dong-hanh" },
  { ten: "Bốn lời hẹn thay cho học phí", href: "/#loi-hen" },
];

const CAM_KET: MucLienKet[] = [
  { ten: "Hiến chương chín điều", href: "/#loi-hua" },
  { ten: "Lịch sử sửa đổi Hiến chương", href: null, can: "Chưa có trang lịch sử sửa đổi Hiến chương" },
  { ten: "Báo cáo minh bạch hằng năm", href: null, can: "Chưa có báo cáo minh bạch hằng năm" },
  { ten: "Minh bạch lợi ích", href: "/minh-bach" },
  { ten: "Khi tôi làm chưa đúng một điều", href: "/#khi-sai" },
];

const CHINH_SACH: MucLienKet[] = [
  { ten: "Điều khoản sử dụng", href: "/dieu-khoan" },
  { ten: "Chính sách bảo mật", href: "/bao-mat" },
  { ten: "Dữ liệu cá nhân và quyền của bạn", href: "/du-lieu" },
  { ten: "Chính sách cookie", href: "/cookie" },
  { ten: "Miễn trừ trách nhiệm", href: "#mien-tru" },
  { ten: "Trợ năng và cách hiển thị", href: null, can: "Chưa có trang trợ năng" },
];

function LienKetChu({ href, can, className, children }: {
  href: string | null;
  can?: string;
  className?: string;
  children: ReactNode;
}) {
  if (href === null) {
    return (
      <a className={className} data-can={can ?? "Chưa có địa chỉ"}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

/** Ô trống nét đứt cho chất liệu còn thiếu, như `.ft-slot` của bản mẫu. */
function O({ giaTri, nhan, can }: { giaTri: string | null; nhan: string; can: string }) {
  if (giaTri) return <>{giaTri}</>;
  return (
    <span className="ft-slot" data-can={can}>
      {nhan}
    </span>
  );
}

function CotLienKet({ id, tieuDe, muc }: { id: string; tieuDe: string; muc: MucLienKet[] }) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id}>{tieuDe}</h2>
      <ul>
        {muc.map((m) => (
          <li key={m.ten}>
            <LienKetChu href={m.href} can={m.can}>
              {m.ten}
            </LienKetChu>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function KhoiNguyHiem() {
  const { capCuu, ngayMai } = siteConfig.khanCap;
  const capCuuLink = (
    <a href={`tel:${capCuu.tel}`}>
      {capCuu.ten} {capCuu.so}
    </a>
  );

  return (
    <div className="ft-safe" role="note">
      <b>Nếu bạn đang gặp nguy hiểm</b>
      {ngayMai.hotlineDaXacNhan ? (
        <p>
          Nếu bạn đang có ý nghĩ làm hại bản thân, hoặc đang bị người khác làm hại, xin bạn đừng chờ thư
          hồi âm. Bạn hãy gọi {capCuuLink}, gọi{" "}
          <a href={`tel:${ngayMai.tel}`}>
            {ngayMai.ten} {ngayMai.so.replace(/ /g, " ")}
          </a>
          , hoặc nói ngay với một người thân ở gần.
        </p>
      ) : (
        // Số Ngày Mai chưa được đội vận hành gọi thử (docs/07, mục D5).
        <p data-can="D5: số Ngày Mai chờ xác nhận">
          Nếu bạn đang có ý nghĩ làm hại bản thân, hoặc đang bị người khác làm hại, xin bạn đừng chờ thư
          hồi âm. Bạn hãy gọi {capCuuLink}, hoặc nói ngay với một người thân ở gần.
        </p>
      )}
    </div>
  );
}

export function SiteFooter() {
  const { lienHe, lienKetNgoai, mangXaHoi } = siteConfig;

  return (
    <footer className="ft" id="cuoi-trang">
      <div className="ft-in">
        <div className="ft-top">
          <div className="ft-brand">
            <VetMai size={52} />
            <div>
              <p className="ft-name">
                KHAI MINH<span>Người Khai Vấn · An Tâm Mệnh</span>
              </p>
              <p className="ft-tag">An Tâm trước — Mệnh sẽ chuyển.</p>
            </div>
          </div>
          <p className="ft-vow">
            Tôi không nói trước đời bạn, không gieo nỗi sợ, và luôn nói thật, kể cả khi lá số và đời bạn
            không khớp nhau.
          </p>
          <div className="ft-act">
            <Link className="ft-letter" href="/gui-cau-hoi">
              Gửi tôi một lá thư ›
            </Link>
            <span className="ft-reply">Tôi hồi âm mọi lời nhắn trong ngày.</span>
          </div>
        </div>

        <KhoiNguyHiem />

        <div className="ft-cols">
          <CotLienKet id="ft-h1" tieuDe="Khám phá" muc={KHAM_PHA} />
          <CotLienKet id="ft-h2" tieuDe="Cam kết và minh bạch" muc={CAM_KET} />
          <CotLienKet id="ft-h3" tieuDe="Chính sách và quyền" muc={CHINH_SACH} />
          <div>
            <h2>Liên hệ</h2>
            <dl className="ft-dl">
              <div>
                <dt>Thư điện tử</dt>
                <dd>
                  <O giaTri={lienHe.email} nhan="Địa chỉ thư" can="D1: địa chỉ thư" />
                </dd>
              </div>
              <div>
                <dt>Zalo</dt>
                <dd>
                  <O giaTri={lienHe.zalo} nhan="Số Zalo" can="D1: số Zalo" />
                </dd>
              </div>
              <div>
                <dt>Nơi làm việc</dt>
                <dd>
                  {lienHe.thanhPho} · <O giaTri={lienHe.diaChi} nhan="Địa chỉ cụ thể" can="D1: địa chỉ" />
                </dd>
              </div>
              <div>
                <dt>Hồi âm</dt>
                <dd>Mọi lời nhắn đều được hồi âm trong ngày.</dd>
              </div>
            </dl>
            <div className="ft-soc" role="group" aria-label="Mạng xã hội">
              {mangXaHoi.map((m) => (
                <LienKetChu key={m.ten} href={m.url} can={m.can}>
                  {m.ten}
                </LienKetChu>
              ))}
            </div>
          </div>
        </div>

        <div className="ft-eco">
          <span>CÙNG MỘT NGÔI NHÀ</span>
          <a href={lienKetNgoai.anTamMenh.url}>{lienKetNgoai.anTamMenh.ten}</a>
          <a href={lienKetNgoai.khaiMenh.url}>{lienKetNgoai.khaiMenh.ten}</a>
          <em>
            {lienKetNgoai.khaiTam.ten} <small>(sắp mở)</small>
          </em>
        </div>

        <div className="ft-disc" id="mien-tru">
          <h2>Miễn trừ trách nhiệm</h2>
          <p>
            Nội dung trên trang này giúp bạn tự soi và tham khảo. Đây không phải là lời khuyên y khoa, tâm lý
            trị liệu, pháp lý hay tài chính, và không thay thế cho bác sĩ hay chuyên gia. Các môn cổ học được
            trình bày như những tấm gương để bạn tự nhìn mình, không phải là lời nói trước tương lai. Mọi
            quyết định về đời bạn luôn thuộc về bạn.
          </p>
        </div>

        <div className="ft-base">
          <div>
            <p>
              © 2026 Người Khai Vấn (Khai{" "}Minh), thuộc hệ sinh thái An Tâm Mệnh. An Tâm Mệnh™ và Tổng
              Mệnh Học™ là nhãn hiệu của{" "}
              <O giaTri={lienHe.chuSoHuuNhanHieu} nhan="Chủ sở hữu nhãn hiệu" can="D1, D6: chủ sở hữu nhãn hiệu" />
              .
            </p>
            <p>
              Thông tin pháp nhân:{" "}
              <O
                giaTri={lienHe.phapNhan}
                nhan="Tên đơn vị · Mã số thuế · Địa chỉ đăng ký"
                can="D1: thông tin pháp nhân"
              />
            </p>
            <p>
              Hiến chương bản 1.0 · Trang được cập nhật lần cuối:{" "}
              <O giaTri={lienHe.ngayCapNhat} nhan="Ngày cập nhật" can="C8: ngày cập nhật" />
            </p>
          </div>
          <div className="ft-right">
            <div className="prefs" role="group" aria-label="Cách hiển thị trang">
              <NutChuLon nhan="Chữ lớn, dễ đọc" />
              <NutBanNhe />
            </div>
            <a className="ft-up" href="#dau-trang">
              Về đầu trang ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { DOOR_KEYS } from "@/lib/doors";
import { NutChuLon } from "./HienThiToggle";
import { LienKetCua } from "./LienKetCua";
import { NutMucLuc } from "./NutMucLuc";
import { VetMai } from "./VetMai";

/**
 * Đầu trang dùng chung, theo `header.top` của prototypes/index.html.
 * Thứ tự: Chín chặng · Cửa Tâm · Cửa Trí · Cửa Thân · Gửi một câu hỏi · Aa Chữ lớn · Mục lục
 * (docs/02, mục 5).
 *
 * "Mục lục" mở lớp phủ trên trang chủ; ở trang khác là liên kết tới /muc-luc.
 * Cửa đang xem được đánh dấu bằng `aria-current` (LienKetCua).
 *
 * Liên kết về trang chủ không tải trước (`prefetch={false}`): tải trước trang
 * chủ kéo theo toàn bộ hiệu ứng của nó (cổng, sao, đom đóm) vào mọi trang con
 * (docs/10, mục R12).
 */
export function SiteHeader() {
  return (
    <header className="top" id="dau-trang">
      <Link className="mark brand" href="/" prefetch={false} aria-label="Khai Minh, về trang chủ">
        <VetMai size={38} animated />
        <span className="bt">
          KHAI MINH<span>Người Khai Vấn</span>
        </span>
      </Link>
      <div className="top-r">
        <nav className="topnav" aria-label="Ba cửa">
          <Link className="dn" href="/#chang" prefetch={false}>
            Chín chặng
          </Link>
          {DOOR_KEYS.map((k) => (
            <LienKetCua key={k} cua={k} />
          ))}
          <Link className="ask-link" href="/gui-cau-hoi">
            Gửi một câu hỏi
          </Link>
        </nav>
        <NutChuLon nhan="Chữ lớn" />
        <NutMucLuc id="openIndex" />
      </div>
    </header>
  );
}

import Link from "next/link";
import { doors, type DoorKey } from "@/lib/doors";
import { NutChuLon } from "./HienThiToggle";
import { VetMai } from "./VetMai";

/**
 * Đầu trang dùng chung, theo `header.top` của prototypes/index.html.
 * Thứ tự: Chín chặng · Cửa Tâm · Cửa Trí · Cửa Thân · Gửi một câu hỏi · Aa Chữ lớn · Mục lục
 * (docs/02, mục 5).
 *
 * "Mục lục" hiện là liên kết tới /muc-luc (dựng ở S2). Phiên S1 đổi nút này
 * thành nút mở lớp phủ Mục lục trên trang chủ.
 */
export function SiteHeader({ cuaHienTai }: { cuaHienTai?: DoorKey }) {
  const cacCua: DoorKey[] = ["tam", "tri", "than"];

  return (
    <header className="top" id="dau-trang">
      <Link className="mark brand" href="/" aria-label="Khai Minh, về trang chủ">
        <VetMai size={38} animated />
        <span className="bt">
          KHAI MINH<span>Người Khai Vấn</span>
        </span>
      </Link>
      <div className="top-r">
        <nav className="topnav" aria-label="Ba cửa">
          <Link className="dn" href="/#chang">
            Chín chặng
          </Link>
          {cacCua.map((k) => (
            <Link
              key={k}
              className="dn"
              href={doors[k].href}
              aria-current={cuaHienTai === k ? "page" : undefined}
            >
              <i className="dd" style={{ background: doors[k].dc }} aria-hidden="true" />
              Cửa {doors[k].ten}
            </Link>
          ))}
          <Link className="ask-link" href="/gui-cau-hoi">
            Gửi một câu hỏi
          </Link>
        </nav>
        <NutChuLon nhan="Chữ lớn" />
        <Link className="index-btn" href="/muc-luc">
          <i aria-hidden="true" />
          Mục lục
        </Link>
      </div>
    </header>
  );
}

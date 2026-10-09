"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { doors, doorStyle, type DoorKey } from "@/lib/doors";

/**
 * Liên kết tới một cửa ở thanh điều hướng. Trên trang của chính cửa ấy, liên
 * kết mang `aria-current="page"` và gạch chân bằng màu cửa (như `.nav
 * a[aria-current]` của bản mẫu trang cửa). Màu lấy từ lib/doors.ts.
 */
export function LienKetCua({ cua }: { cua: DoorKey }) {
  const d = doors[cua];
  const dangO = usePathname() === d.href;
  return (
    <Link className="dn" href={d.href} aria-current={dangO ? "page" : undefined} style={dangO ? doorStyle(cua) : undefined}>
      <i className="dd" style={{ background: d.dc }} aria-hidden="true" />
      Cửa {d.ten}
    </Link>
  );
}

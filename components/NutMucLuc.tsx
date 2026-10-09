"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SU_KIEN } from "@/lib/su-kien";

/**
 * Nút "Mục lục" ở đầu trang.
 *
 * Trên trang chủ: nút mở lớp phủ Mục lục (#index), như bản mẫu.
 * Ở trang khác: liên kết tới trang /muc-luc (dựng ở phiên S2, docs/02).
 */
export function NutMucLuc({ id }: { id?: string }) {
  const duongDan = usePathname();

  if (duongDan === "/") {
    return (
      <button
        className="index-btn"
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-controls="index"
        onClick={(e) => window.dispatchEvent(new CustomEvent(SU_KIEN.moMucLuc, { detail: e.currentTarget }))}
      >
        <i aria-hidden="true" />
        Mục lục
      </button>
    );
  }

  return (
    <Link className="index-btn" href="/muc-luc" id={id}>
      <i aria-hidden="true" />
      Mục lục
    </Link>
  );
}

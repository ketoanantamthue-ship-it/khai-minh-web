import type { ReactNode } from "react";
import type { LienKet } from "@/site.config";

/**
 * Liên kết sang web khác lấy từ site.config.ts. Khi địa chỉ chưa chốt, giữ
 * chữ, bỏ `href` và gắn `data-can` (như chân trang; docs/07, mục A6).
 */
export function LienKetNgoai({ lk, className, children }: { lk: LienKet; className?: string; children: ReactNode }) {
  if (!lk.url) {
    return (
      <a className={className} data-can={lk.can ?? "Chưa có địa chỉ"}>
        {children}
      </a>
    );
  }
  return (
    <a className={className} href={lk.url}>
      {children}
    </a>
  );
}

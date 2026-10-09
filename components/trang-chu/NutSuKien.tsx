"use client";

import type { ReactNode } from "react";

/** Nút chỉ làm một việc: phát một sự kiện trên `window` (xem lib/su-kien.ts). */
export function NutSuKien({
  suKien,
  className,
  id,
  children,
}: {
  suKien: string;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <button
      className={className}
      id={id}
      type="button"
      onClick={(e) => window.dispatchEvent(new CustomEvent(suKien, { detail: e.currentTarget }))}
    >
      {children}
    </button>
  );
}

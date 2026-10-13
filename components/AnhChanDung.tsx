/* eslint-disable @next/next/no-img-element -- thẻ img thường không kéo thêm mã chạy của next/image vào trang con (ngân sách R12, docs/10) */
import type { ReactNode } from "react";
import { siteConfig } from "@/site.config";

/**
 * Ảnh chân dung Khai Minh (docs/07, mục B2), dùng chung ở trang chủ, trang
 * tác giả, khối tác giả cuối bài và trang Báo chí. Chưa có ảnh trong
 * `site.config.ts` thì hiện khung chờ như bản mẫu.
 */
export function AnhChanDung({ sizes, uuTien = false }: { sizes: string; uuTien?: boolean }) {
  const { anh, anhNho, anhMoTa, anhKichThuoc } = siteConfig.nguoi;
  if (!anh) return null;
  return (
    <img
      className="anh-chan-dung"
      src={anh}
      srcSet={`${anhNho} 480w, ${anh} ${anhKichThuoc.rong}w`}
      sizes={sizes}
      alt={anhMoTa}
      width={anhKichThuoc.rong}
      height={anhKichThuoc.cao}
      loading={uuTien ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

/** Khung 4:5 ở trang con: có ảnh thì hiện ảnh, chưa có thì hiện khung chờ B2. */
export function KhungChanDung({ className, sizes }: { className: string; sizes: string }): ReactNode {
  if (siteConfig.nguoi.anh) {
    return (
      <div className={`${className} co-anh`}>
        <AnhChanDung sizes={sizes} />
      </div>
    );
  }
  return (
    <div className={`slot ${className}`} role="img" aria-label="Ảnh chân dung" data-can="B2">
      <div>
        <b>Ảnh chân dung</b>Khổ 4:5, ánh sáng cửa sổ
      </div>
    </div>
  );
}

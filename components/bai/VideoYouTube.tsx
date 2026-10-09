"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";

/**
 * Video YouTube nhẹ: lúc đầu chỉ có ảnh bìa (không tải gì của YouTube). Bấm
 * vào thì mới nhúng trình phát từ youtube-nocookie.com, không đặt cookie theo
 * dõi trước khi người đọc chọn xem. Không có JavaScript thì ảnh bìa là liên
 * kết mở video trên YouTube.
 *
 * Lời thoại nằm sẵn trong HTML, thu gọn dưới video, để người không xem được
 * video, máy tìm kiếm và AI vẫn đọc được.
 *
 * Thiếu mã video hoặc tiêu đề thì không hiện gì.
 */
export function VideoYouTube({ id, tieuDe, loiThoai }: { id?: string; tieuDe?: string; loiThoai?: string }) {
  const [mo, setMo] = useState(false);
  if (!id || !tieuDe) return null;

  const bam = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMo(true);
  };

  return (
    <figure className="video-yt">
      <div className="video-khung">
        {mo ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={tieuDe}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <a href={`https://www.youtube.com/watch?v=${id}`} onClick={bam} aria-label={`Xem video: ${tieuDe}`}>
            <Image
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 900px) 760px, 100vw"
            />
            <span className="video-nut" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
          </a>
        )}
      </div>
      <figcaption>{tieuDe}</figcaption>
      {loiThoai ? (
        <details className="loi-thoai">
          <summary>Lời thoại</summary>
          {loiThoai.split(/\n\s*\n/).map((d) => (
            <p key={d}>{d}</p>
          ))}
        </details>
      ) : null}
    </figure>
  );
}

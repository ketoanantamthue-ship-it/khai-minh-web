import type { ReactNode } from "react";

/**
 * Màn đầu sơn mài tối của trang con (`section.hero` của bản mẫu): nhãn, câu
 * hỏi lớn, câu "soi" nói lại tình cảnh người đọc, đoạn mở và lời mời.
 * Bụi vàng dưới ánh đèn (#dust) do HieuUngTrangCon vẽ.
 *
 * `moDau` để trống khi chặng chưa có chữ: giữ dấu `data-can` cho người viết,
 * không hiện gì cho khách (CLAUDE.md, quy tắc 2 và 3).
 */
export function ManDau({ nhan, tieuDe, soi, moDau, can, children }: {
  nhan: ReactNode;
  tieuDe: string;
  soi: string;
  moDau?: string;
  /** Mã việc ở docs/07 khi `moDau` còn trống. */
  can?: string;
  children: ReactNode;
}) {
  return (
    <section className="hero">
      <canvas id="dust" aria-hidden="true" />
      <div className="wrap">
        <p className="k">{nhan}</p>
        <h1>{tieuDe}</h1>
        <p className="soi">{soi}</p>
        {moDau ? <p className="sub">{moDau}</p> : <p className="sub" data-can={can} hidden />}
        <div className="cta">{children}</div>
      </div>
    </section>
  );
}

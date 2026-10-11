import Link from "next/link";
import type { ReactNode } from "react";
import { TEN_TRANG_THAI, type TrangThai } from "@/lib/nhan";
import type { MucDuongDan } from "@/lib/seo";

/**
 * Màn đầu của trang bài và trang danh sách: lớp sơn mài tối như trang con
 * (docs/01, mục C1), nhưng gọn hơn để câu trả lời ngắn nằm ngay dưới tiêu đề
 * (docs/04, khuôn mười bước, bước 3). Không có hiệu ứng nào, nên trang bài
 * không tải thêm JavaScript (docs/05, mục 2).
 *
 * Dải đường dẫn hiện trên trang khớp với BreadcrumbList trong JSON-LD. Trang
 * không có đường dẫn (trang 404) truyền mảng rỗng.
 */
export function ManDauBai({
  duongDan,
  nhan,
  tieuDe,
  soi,
  trangThai,
  children,
}: {
  duongDan: MucDuongDan[];
  nhan?: ReactNode;
  tieuDe: string;
  soi?: string;
  /** Có giá trị khi bài chưa `da-dang`: hiện dải “Bản nháp” (chỉ ở bản xem trước). */
  trangThai?: TrangThai;
  children?: ReactNode;
}) {
  return (
    <section className="hero hero-bai">
      <div className="wrap">
        {trangThai && trangThai !== "da-dang" ? <DaiBanNhap trangThai={trangThai} /> : null}
        {duongDan.length > 0 ? (
          <nav className="vun" aria-label="Đường dẫn">
            <ol>
              {duongDan.slice(0, -1).map((m) => (
                <li key={m.duongDan}>
                  <Link href={m.duongDan}>{m.ten}</Link>
                </li>
              ))}
              <li aria-current="page">{duongDan.at(-1)?.ten}</li>
            </ol>
          </nav>
        ) : null}
        {nhan ? <p className="k">{nhan}</p> : null}
        <h1>{tieuDe}</h1>
        {soi ? <p className="soi">{soi}</p> : null}
        {children}
      </div>
    </section>
  );
}

/**
 * Dải “Bản nháp”: bài chưa đăng chỉ được dựng ở bản xem trước (docs/04, mục 5),
 * và luôn mang dải này để không ai nhầm với bài đã đăng.
 */
export function DaiBanNhap({ trangThai }: { trangThai: TrangThai }) {
  return (
    <p className="dai-nhap" role="note" data-trang-thai={trangThai}>
      <b>{TEN_TRANG_THAI[trangThai]}</b>
      <span>Bài này chưa đăng và chỉ hiện trên bản xem trước.</span>
    </p>
  );
}

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";
import Image from "next/image";
import { Children, isValidElement, type ReactNode } from "react";
import { OCan } from "@/components/trang-con/OCan";
import { lopTinCay } from "@/lib/nhan";
import { taoNeo } from "@/lib/noi-dung";
import { siteConfig } from "@/site.config";
import { VideoYouTube } from "./VideoYouTube";

/**
 * Các thẻ người viết dùng được trong thân MDX (docs/09, mục 5). Thẻ nào thiếu
 * dữ liệu thì không hiện gì, để khuôn bài có thể đặt sẵn chỗ cho video, bản
 * đọc, ảnh mà không lộ khung trống cho khách.
 *
 * Tệp này không nhập phần chỉ chạy phía server (lib/chang.ts), để bài kiểm
 * thử dựng thử được từng thẻ.
 */

type Lop = "l1" | "l2" | "l3" | "l4";

/** Thẻ nhãn tin cậy: màu theo thang của bản mẫu, hoặc theo `lop` khi chữ khác thang. */
function The({ chu, lop }: { chu: string; lop?: Lop }) {
  return <span className={`label ${lop ?? lopTinCay(chu) ?? "l1"}`}>{chu}</span>;
}

/** Lời trích có nguồn, như tầng “Lời Phật dạy” của trang chặng. */
export function Trich({ nguon, children }: { nguon: string; children: ReactNode }) {
  return (
    <blockquote className="quote">
      {children}
      <cite>{nguon}</cite>
    </blockquote>
  );
}

/** Nhãn tin cậy của đoạn văn ngay trên nó. */
export function NhanTinCay({ chu, lop }: { chu?: string; lop?: Lop }) {
  if (!chu) return null;
  return (
    <p>
      <The chu={chu} lop={lop} />
    </p>
  );
}

export function LoiAnToan({ children }: { children: ReactNode }) {
  return (
    <div className="safe" role="note">
      {children}
    </div>
  );
}

/** Ô “Đang soạn” cho chỗ còn thiếu; mã việc ở docs/07 nằm trong data-can. */
export function DangSoan({ ma }: { ma: string }) {
  return <OCan ma={ma} />;
}

/**
 * Khung chờ chất liệu (ảnh, video): chỉ hiện trên bản xem trước, để anh và đội
 * viết thấy chỗ sẽ đặt. Trên web thật, chưa có chất liệu thì không hiện gì.
 */
export function KhungCho({ loai, moTa }: { loai: "anh" | "video"; moTa: string }) {
  if (!siteConfig.hienBanNhap) return null;
  const ten = loai === "video" ? "Chỗ đặt video bài giảng YouTube" : "Chỗ đặt ảnh";
  return (
    <figure className={`khung-cho khung-cho-${loai}`} data-can={loai === "video" ? "B12" : "B13"}>
      <div className="khung-cho-o" role="img" aria-label={ten}>
        <b>{ten}</b>
        <span>{moTa}</span>
      </div>
    </figure>
  );
}

/**
 * Hộp “Ba điều cần nhớ”: vài ý cốt lõi của bài, đặt ở đầu thân bài để người
 * đọc nắm và nhớ trước khi đọc sâu. Nội dung là một danh sách Markdown.
 */
export function YChinh({ tieuDe = "Ba điều cần nhớ", children }: { tieuDe?: string; children: ReactNode }) {
  return (
    <aside className="y-chinh" aria-label={tieuDe}>
      <p className="y-chinh-tieu">{tieuDe}</p>
      {children}
    </aside>
  );
}

/** “Nghe Khai Minh đọc bài này”: bản ghi âm trong public/. Không có tệp thì không hiện gì. */
export function AmThanh({ src, thoiLuong }: { src?: string; thoiLuong?: string }) {
  if (!src) return null;
  return (
    <figure className="am-thanh">
      <figcaption>
        Nghe Khai Minh đọc bài này{thoiLuong ? <span className="am-tl"> · {thoiLuong}</span> : null}
      </figcaption>
      <audio controls preload="none" src={src} />
    </figure>
  );
}

/**
 * Ảnh trong bài, qua next/image. Ảnh phải nằm trong public/ (src bắt đầu bằng
 * “/”) và có mô tả tiếng Việt (alt). Kích thước đọc từ tệp lúc build, nên
 * khung ảnh giữ đúng tỉ lệ khi trang đang tải. Thiếu src, thiếu alt, hay không
 * tìm thấy tệp thì không hiện gì.
 */
export function Anh({
  src,
  alt,
  chuThich,
  cho,
}: {
  src?: string;
  alt?: string;
  chuThich?: string;
  /** Mô tả ảnh cần chụp hay vẽ: chỉ hiện thành khung chờ trên bản xem trước. */
  cho?: string;
}) {
  if (!src || !alt || !src.startsWith("/")) return cho ? <KhungCho loai="anh" moTa={cho} /> : null;
  let kichThuoc: { width: number; height: number };
  try {
    kichThuoc = imageSize(readFileSync(join(/*turbopackIgnore: true*/ process.cwd(), "public", src)));
  } catch {
    return null;
  }
  return (
    <figure className="anh-bai">
      <Image
        src={src}
        alt={alt}
        width={kichThuoc.width}
        height={kichThuoc.height}
        sizes="(min-width: 900px) 760px, 100vw"
      />
      {chuThich ? <figcaption>{chuThich}</figcaption> : null}
    </figure>
  );
}

/**
 * Bảng soi ba lớp: nhân quả, khoa học và huyền học đặt cạnh nhau, mỗi ô một
 * nhãn tin cậy. Ô nào không có chữ thì bỏ; cả ba trống thì không hiện gì.
 */
export function BangSoiBaLop({
  nhanQua,
  khoaHoc,
  huyenHoc,
  tinCayNhanQua,
  tinCayKhoaHoc,
  tinCayHuyenHoc,
}: {
  nhanQua?: string;
  khoaHoc?: string;
  huyenHoc?: string;
  tinCayNhanQua?: string;
  tinCayKhoaHoc?: string;
  tinCayHuyenHoc?: string;
}) {
  const o = [
    { ten: "Nhân quả", chu: nhanQua, tinCay: tinCayNhanQua },
    { ten: "Khoa học", chu: khoaHoc, tinCay: tinCayKhoaHoc },
    { ten: "Huyền học", chu: huyenHoc, tinCay: tinCayHuyenHoc },
  ].filter((x) => x.chu);
  if (o.length === 0) return null;
  return (
    <div className="ba-lop">
      {o.map((x) => (
        <div key={x.ten} className="ba-lop-o">
          <h3>{x.ten}</h3>
          <p>{x.chu}</p>
          {x.tinCay ? <The chu={x.tinCay} /> : null}
        </div>
      ))}
    </div>
  );
}

/** Chữ thuần của một tiêu đề, để làm neo cho mục lục đầu bài. */
function chuCua(nut: ReactNode): string {
  return Children.toArray(nut)
    .map((c) =>
      typeof c === "string" || typeof c === "number"
        ? String(c)
        : isValidElement<{ children?: ReactNode }>(c)
          ? chuCua(c.props.children)
          : "",
    )
    .join("");
}

/** Tiêu đề `##` có neo (id), để mục lục nhỏ ở đầu bài dẫn tới. */
function H2({ children }: { children?: ReactNode }) {
  return <h2 id={taoNeo(chuCua(children))}>{children}</h2>;
}

export const THANH_PHAN_MDX = {
  h2: H2,
  Trich,
  NhanTinCay,
  LoiAnToan,
  DangSoan,
  KhungCho,
  YChinh,
  AmThanh,
  Anh,
  BangSoiBaLop,
  VideoYouTube,
};

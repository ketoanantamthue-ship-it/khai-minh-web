import type { CSSProperties, ReactNode } from "react";
import { ManDauBai } from "@/components/bai/ManDauBai";
import { JsonLd } from "@/components/JsonLd";
import { doThi, nutDuongDan, type MucDuongDan } from "@/lib/seo";
import "@/styles/trang-con.css";
import "@/styles/bai.css";
import "@/styles/khung.css";

/**
 * Vỏ chung của các trang phiên S4 (docs/02, mục 3): màn đầu sơn mài tối gọn
 * (dải đường dẫn, nhãn nhỏ, tiêu đề h1, lời soi, lời mời chính nếu có), rồi
 * tới thân trang.
 *
 * Thân trang ghép từ hai loại khối, đặt cạnh nhau chứ không lồng vào nhau, để
 * CSS của mỗi loại không lan sang loại kia:
 * - <KhoiGiay>: khối trên giấy sáng theo bộ CSS trang con (.km-con);
 * - <KhoiTrangChu>: khối lấy nguyên từ trang chủ (.km-tc, styles/trang-chu.css).
 *
 * Dải đường dẫn trên trang khớp với BreadcrumbList trong JSON-LD.
 */
export function TrangKhung({
  vun,
  nhan,
  tieuDe,
  soi,
  moi,
  jsonLd = [],
  kieu,
  children,
}: {
  vun: MucDuongDan[];
  nhan?: ReactNode;
  tieuDe: string;
  soi?: string;
  /** Lời mời chính hoặc nút đặt ngay dưới tiêu đề. */
  moi?: ReactNode;
  /** Các nút JSON-LD thêm vào bên cạnh BreadcrumbList. */
  jsonLd?: Record<string, unknown>[];
  /** Thuộc tính style của màn đầu (màu cửa). */
  kieu?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <main id="main" className="km-khung">
      <JsonLd duLieu={doThi(...jsonLd, ...(vun.length > 0 ? [nutDuongDan(vun)] : []))} />
      <div className="km-con km-bai" style={kieu}>
        <ManDauBai duongDan={vun} nhan={nhan} tieuDe={tieuDe} soi={soi}>
          {moi ? <div className="cta">{moi}</div> : null}
        </ManDauBai>
      </div>
      {children}
    </main>
  );
}

/** Khối trên giấy sáng (bộ CSS trang con). */
export function KhoiGiay({ children }: { children: ReactNode }) {
  return <div className="km-con km-bai">{children}</div>;
}

/** Khối lấy nguyên từ trang chủ (bộ CSS trang chủ). */
export function KhoiTrangChu({ children }: { children: ReactNode }) {
  return <div className="km-tc">{children}</div>;
}

/** Một mục giấy có tiêu đề h2 và cột đọc. */
export function MucGiay({ id, tieuDe, children }: { id?: string; tieuDe: string; children: ReactNode }) {
  return (
    <section className="s" id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <div className="wrap bai-doc">
        <h2 id={id ? `${id}-h` : undefined}>{tieuDe}</h2>
        {children}
      </div>
    </section>
  );
}

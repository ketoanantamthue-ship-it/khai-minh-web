import type { Metadata } from "next";
import { siteConfig, urlTuyetDoi } from "@/site.config";

/**
 * Metadata, canonical và dữ liệu có cấu trúc (JSON-LD) dùng chung
 * (phiên S3; docs/05, mục 1 và 4).
 *
 * Một thực thể rõ ràng: Person “Khai Minh” có một mã định danh (@id) cố định
 * để mọi trang, và sau này antammenh.com, cùng trỏ về. Dữ liệu chỉ ghi những
 * gì đã hiện trên trang; ảnh chân dung, tiểu sử và các kênh chính thức thêm
 * vào khi có (docs/07, mục B2 và C7).
 */

/** Trang tác giả, nơi gốc của thực thể (docs/01, mục E3; dựng ở phiên S4). */
export const TRANG_TAC_GIA = "/khai-minh";

export const ID_NGUOI = urlTuyetDoi(`${TRANG_TAC_GIA}#nguoi`);
export const ID_TO_CHUC = `${siteConfig.toChuc.url}/#to-chuc`;
export const ID_WEB = urlTuyetDoi("/#web");

/** Hậu tố mà layout gắn vào tiêu đề (“%s – Khai Minh”). */
const HAU_TO = " – Khai Minh";

/**
 * Metadata cho một trang: tiêu đề, mô tả, canonical, Open Graph.
 * Tiêu đề dài hơn khoảng 60 ký tự thì bỏ hậu tố “– Khai Minh” (docs/05).
 */
export function taoMetadata({
  tieuDe,
  moTa,
  duongDan,
  loai = "website",
  ngayViet,
  ngayCapNhat,
  coAnhRieng = false,
}: {
  tieuDe: string;
  moTa?: string;
  duongDan: string;
  loai?: "website" | "article";
  /** Route có tệp opengraph-image.tsx riêng: để Next tự gắn ảnh ấy. */
  coAnhRieng?: boolean;
  ngayViet?: string;
  ngayCapNhat?: string;
}): Metadata {
  const tieuDeDai = tieuDe.length + HAU_TO.length > 62;
  return {
    title: tieuDeDai ? { absolute: tieuDe } : tieuDe,
    description: moTa,
    alternates: { canonical: duongDan },
    openGraph: {
      type: loai,
      locale: "vi_VN",
      siteName: siteConfig.ten,
      title: tieuDe,
      description: moTa,
      url: duongDan,
      // Trang không có ảnh riêng thì dùng ảnh mặc định (app/opengraph-image.tsx).
      // Ảnh khai báo ở đây đè lên ảnh của tệp, nên trang có ảnh riêng bỏ qua.
      ...(coAnhRieng ? {} : { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Khai Minh – Người Khai Vấn" }] }),
      ...(loai === "article"
        ? {
            publishedTime: ngayViet,
            modifiedTime: ngayCapNhat,
            authors: [urlTuyetDoi(TRANG_TAC_GIA)],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: tieuDe,
      description: moTa,
      ...(coAnhRieng ? {} : { images: ["/opengraph-image"] }),
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

type Nut = Record<string, unknown>;

/** Person: Khai Minh. */
export function nutNguoi(): Nut {
  const sameAs = siteConfig.mangXaHoi.flatMap((k) => (k.url ? [k.url] : []));
  return {
    "@type": "Person",
    "@id": ID_NGUOI,
    name: siteConfig.ten,
    alternateName: "Người Khai Vấn",
    jobTitle: "Người Khai Vấn",
    url: urlTuyetDoi(TRANG_TAC_GIA),
    worksFor: { "@id": ID_TO_CHUC },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Organization: An Tâm Mệnh, nơi giữ mọi dịch vụ (docs/01, mục A2). */
export function nutToChuc(): Nut {
  return {
    "@type": "Organization",
    "@id": ID_TO_CHUC,
    name: siteConfig.toChuc.ten,
    url: siteConfig.toChuc.url,
    founder: { "@id": ID_NGUOI },
  };
}

/** WebSite: web Khai Minh. */
export function nutWeb(): Nut {
  return {
    "@type": "WebSite",
    "@id": ID_WEB,
    url: urlTuyetDoi("/"),
    name: siteConfig.ten,
    alternateName: "Khai Minh – Người Khai Vấn",
    inLanguage: "vi",
    author: { "@id": ID_NGUOI },
    publisher: { "@id": ID_NGUOI },
  };
}

export type MucDuongDan = { ten: string; duongDan: string };

/** BreadcrumbList, khớp dải đường dẫn hiện trên trang. */
export function nutDuongDan(muc: MucDuongDan[]): Nut {
  return {
    "@type": "BreadcrumbList",
    itemListElement: muc.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.ten,
      item: urlTuyetDoi(m.duongDan),
    })),
  };
}

/** Article: một bài trong kho. Tác giả và nơi đăng trỏ về Person. */
export function nutBaiViet({
  tieuDe,
  moTa,
  duongDan,
  ngayViet,
  ngayCapNhat,
  nguon,
}: {
  tieuDe: string;
  moTa?: string;
  duongDan: string;
  ngayViet?: string;
  ngayCapNhat?: string;
  nguon?: string[];
}): Nut {
  const url = urlTuyetDoi(duongDan);
  return {
    "@type": "Article",
    "@id": `${url}#bai`,
    headline: tieuDe,
    ...(moTa ? { description: moTa } : {}),
    url,
    mainEntityOfPage: url,
    inLanguage: "vi",
    image: urlTuyetDoi(`${duongDan}/opengraph-image`),
    ...(ngayViet ? { datePublished: ngayViet } : {}),
    ...(ngayCapNhat ?? ngayViet ? { dateModified: ngayCapNhat ?? ngayViet } : {}),
    author: { "@id": ID_NGUOI },
    publisher: { "@id": ID_NGUOI },
    isPartOf: { "@id": ID_WEB },
    ...(nguon && nguon.length > 0 ? { citation: nguon } : {}),
  };
}

/** Gói các nút thành một khối JSON-LD. */
export function doThi(...nut: Nut[]): Nut {
  return { "@context": "https://schema.org", "@graph": nut };
}

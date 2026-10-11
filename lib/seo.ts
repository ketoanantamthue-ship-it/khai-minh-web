import type { Metadata } from "next";
import { siteConfig, urlTuyetDoi } from "@/site.config";
import { TRANG_CHUA_DU_CHU } from "./trang-khung";

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
 * Mô tả trang chủ, dưới 160 ký tự để Google không cắt (docs/10, mục R15).
 * Rút từ mô tả 168 ký tự của bản mẫu (prototypes/index.html): giữ nguyên câu
 * đầu và vế cuối, bỏ vế giữa “không trả lời thay bạn”.
 */
export const MO_TA_TRANG_CHU =
  "Đời người có chín chặng, và chặng nào cũng có những câu hỏi ta chỉ dám hỏi mình lúc nửa đêm. Khai Minh ngồi cùng bạn, đủ lâu để bạn tự thấy.";

export { TRANG_CHUA_DU_CHU } from "./trang-khung";

/** Trang danh sách có ít hơn số bài đã đăng này thì để `noindex, follow` (docs/10, mục R5). */
export const SO_BAI_DE_LAP_CHI_MUC = 3;

/**
 * Thẻ robots cho một trang còn mỏng (trang danh sách ít bài, trang chặng chưa
 * đủ năm tầng, trang khung chưa có chữ đã duyệt; docs/10, mục R5 và R7).
 *
 * - Cờ lập chỉ mục tắt: không trả gì, trang theo layout (`noindex, nofollow`).
 * - Cờ bật và trang mỏng: `noindex, follow`, để máy tìm kiếm vẫn đi theo liên kết.
 * - Trang đã đủ chữ: không trả gì, trang theo layout (`index, follow`).
 */
export function robotsTrangMong(mong: boolean, choPhepLapChiMuc = siteConfig.choPhepLapChiMuc): Metadata["robots"] {
  if (!choPhepLapChiMuc || !mong) return undefined;
  return { index: false, follow: true, googleBot: { index: false, follow: true } };
}

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
  anh,
  mong = false,
}: {
  tieuDe: string;
  moTa?: string;
  duongDan: string;
  loai?: "website" | "article";
  /** Route có tệp opengraph-image.tsx riêng: để Next tự gắn ảnh ấy. */
  coAnhRieng?: boolean;
  /** Ảnh chia sẻ riêng của trang (ảnh đầu bài), đè lên mọi ảnh khác. */
  anh?: { url: string; alt: string };
  ngayViet?: string;
  ngayCapNhat?: string;
  /**
   * Trang còn mỏng: `noindex, follow` khi cờ lập chỉ mục bật (xem robotsTrangMong).
   * Trang trong TRANG_CHUA_DU_CHU luôn được coi là mỏng.
   */
  mong?: boolean;
}): Metadata {
  const tieuDeDai = tieuDe.length + HAU_TO.length > 62;
  const robots = robotsTrangMong(mong || TRANG_CHUA_DU_CHU.has(duongDan));
  return {
    title: tieuDeDai ? { absolute: tieuDe } : tieuDe,
    description: moTa,
    ...(robots ? { robots } : {}),
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
      ...(anh
        ? { images: [anh] }
        : coAnhRieng
          ? {}
          : { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Khai Minh – Người Khai Vấn" }] }),
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
      ...(anh ? { images: [anh.url] } : coAnhRieng ? {} : { images: ["/opengraph-image"] }),
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

type Nut = Record<string, unknown>;

/**
 * Person: Khai Minh (docs/10, mục R2). Mọi trường lấy từ `site.config.ts`;
 * trường chưa có chất liệu (ảnh, kênh chính thức, nghề dược sĩ) thì bỏ qua.
 */
export function nutNguoi(): Nut {
  const { nguoi } = siteConfig;
  const sameAs = siteConfig.mangXaHoi.flatMap((k) => (k.url ? [k.url] : []));
  return {
    "@type": "Person",
    "@id": ID_NGUOI,
    name: siteConfig.ten,
    alternateName: "Người Khai Vấn",
    jobTitle: "Người Khai Vấn",
    description: nguoi.moTa,
    url: urlTuyetDoi(TRANG_TAC_GIA),
    mainEntityOfPage: urlTuyetDoi(TRANG_TAC_GIA),
    knowsAbout: [...nguoi.linhVuc],
    knowsLanguage: "vi",
    worksFor: { "@id": ID_TO_CHUC },
    ...(nguoi.anh ? { image: urlTuyetDoi(nguoi.anh) } : {}),
    ...(nguoi.ngheDuocSi
      ? { hasOccupation: { "@type": "Occupation", name: "Dược sĩ", occupationLocation: { "@type": "Country", name: "Việt Nam" } } }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Organization: An Tâm Mệnh, nơi giữ mọi dịch vụ (docs/01, mục A2; docs/10, mục R2 và R3). */
export function nutToChuc(): Nut {
  const { toChuc } = siteConfig;
  return {
    "@type": "Organization",
    "@id": ID_TO_CHUC,
    name: toChuc.ten,
    url: toChuc.url,
    founder: { "@id": ID_NGUOI },
    ...(toChuc.logo ? { logo: { "@type": "ImageObject", url: urlTuyetDoi(toChuc.logo) } } : {}),
    ...(toChuc.sameAs.length > 0 ? { sameAs: [...toChuc.sameAs] } : {}),
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

/**
 * WebPage của một trang trụ (trang chặng; docs/10, mục R14): trang này là gì,
 * của ai, nói về điều gì. `about` là chủ đề của trang, ghi bằng chữ đã có trên trang.
 * Đặt cùng khối với nutNguoi(), nutWeb() và nutDuongDan() để mọi @id đều có nút.
 */
export function nutTrangWeb({
  tieuDe,
  moTa,
  duongDan,
  chuDe,
  coAnhRieng = false,
}: {
  tieuDe: string;
  moTa?: string;
  duongDan: string;
  chuDe: { ten: string; moTa?: string };
  /** Trang có ảnh chia sẻ riêng (`opengraph-image.tsx`). */
  coAnhRieng?: boolean;
}): Nut {
  const url = urlTuyetDoi(duongDan);
  return {
    "@type": "WebPage",
    "@id": `${url}#trang`,
    url,
    name: tieuDe,
    ...(moTa ? { description: moTa } : {}),
    inLanguage: "vi",
    isPartOf: { "@id": ID_WEB },
    author: { "@id": ID_NGUOI },
    publisher: { "@id": ID_NGUOI },
    about: { "@type": "Thing", name: chuDe.ten, ...(chuDe.moTa ? { description: chuDe.moTa } : {}) },
    ...(coAnhRieng ? { primaryImageOfPage: { "@type": "ImageObject", url: urlTuyetDoi(`${duongDan}/opengraph-image`) } } : {}),
    breadcrumb: { "@id": `${url}#duong-dan` },
  };
}

export type MucDuongDan = { ten: string; duongDan: string };

/** BreadcrumbList, khớp dải đường dẫn hiện trên trang. */
export function nutDuongDan(muc: MucDuongDan[]): Nut {
  const cuoi = muc.at(-1);
  return {
    "@type": "BreadcrumbList",
    ...(cuoi ? { "@id": `${urlTuyetDoi(cuoi.duongDan)}#duong-dan` } : {}),
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
  anh,
  video,
}: {
  tieuDe: string;
  moTa?: string;
  duongDan: string;
  ngayViet?: string;
  ngayCapNhat?: string;
  nguon?: string[];
  /** Ảnh đầu bài; không có thì dùng ảnh chia sẻ của bài. */
  anh?: string;
  /** @id của các VideoObject trong bài. */
  video?: string[];
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
    image: anh ? urlTuyetDoi(anh) : urlTuyetDoi(`${duongDan}/opengraph-image`),
    ...(video && video.length > 0 ? { video: video.map((v) => ({ "@id": v })) } : {}),
    ...(ngayViet ? { datePublished: ngayViet } : {}),
    ...(ngayCapNhat ?? ngayViet ? { dateModified: ngayCapNhat ?? ngayViet } : {}),
    author: { "@id": ID_NGUOI },
    publisher: { "@id": ID_NGUOI },
    isPartOf: { "@id": ID_WEB },
    ...(nguon && nguon.length > 0 ? { citation: nguon } : {}),
  };
}

export type DuLieuVideo = {
  id: string;
  tieuDe: string;
  loiThoai?: string;
  /** YYYY-MM-DD */
  ngayDang?: string;
  /** ISO 8601, ví dụ PT8M30S */
  thoiLuong?: string;
};

/** @id của một video YouTube trong JSON-LD. */
export function idVideo(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

/**
 * VideoObject cho một video YouTube trong bài. Mô tả lấy từ lời thoại (đã
 * nằm trên trang); ngày đăng và thời lượng chỉ ghi khi người viết đã điền.
 */
export function nutVideo(v: DuLieuVideo): Nut {
  const moTa = v.loiThoai?.replace(/\s+/g, " ").trim();
  return {
    "@type": "VideoObject",
    "@id": idVideo(v.id),
    name: v.tieuDe,
    description: moTa ? (moTa.length > 300 ? `${moTa.slice(0, moTa.lastIndexOf(" ", 299))}…` : moTa) : v.tieuDe,
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`],
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    url: idVideo(v.id),
    inLanguage: "vi",
    ...(v.ngayDang ? { uploadDate: v.ngayDang } : {}),
    ...(v.thoiLuong ? { duration: v.thoiLuong } : {}),
    ...(v.loiThoai ? { transcript: v.loiThoai } : {}),
    author: { "@id": ID_NGUOI },
  };
}

/** Gói các nút thành một khối JSON-LD. */
export function doThi(...nut: Nut[]): Nut {
  return { "@context": "https://schema.org", "@graph": nut };
}

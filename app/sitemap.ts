import type { MetadataRoute } from "next";
import { docChinChang, duongDanChang } from "@/lib/chang";
import { DOOR_KEYS } from "@/lib/doors";
import { baiCongKhai } from "@/lib/noi-dung";
import { SAU_TANG } from "@/lib/sau-tang";
import { urlTuyetDoi } from "@/site.config";

/**
 * Sitemap (docs/05, mục 1): chỉ trang công khai và bài `da-dang`, kể cả khi
 * đang ở bản xem trước. Bài lấy `lastModified` từ ngày kiểm lại, hoặc ngày viết.
 *
 * Trang danh sách và trang nhãn chỉ vào sitemap khi đã có ít nhất một bài
 * công khai, để máy tìm kiếm không gặp trang chỉ có ô “Đang soạn”.
 */
const TRANG_S4 = [
  "/khai-minh",
  "/cach-toi-dong-hanh",
  "/noi-chuyen",
  "/sach",
  "/tu-sach",
  "/ngoi-lang",
  "/hien-chuong",
  "/bao-chi",
  "/minh-bach",
  "/du-lieu",
  "/tro-nang",
  "/gui-cau-hoi",
  "/dieu-khoan",
  "/bao-mat",
  "/cookie",
  "/mien-tru",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const bai = baiCongKhai();
  const chin = docChinChang();
  const co = (dk: (b: (typeof bai)[number]) => boolean) => bai.some(dk);

  const trang = [
    "/",
    "/tam",
    "/tri",
    "/than",
    "/muc-luc",
    ...chin.map(duongDanChang),
    // Các trang phiên S4. Trang chính sách và Dữ liệu của bạn còn chờ chữ của
    // luật sư (docs/07, mục D3); không ra mắt khi chưa có (docs/06, S7).
    ...TRANG_S4,
    ...(co((b) => b.loai === "hoi") ? ["/hoi"] : []),
    ...chin.filter((c) => co((b) => b.loai === "hoi" && b.chang === c.so)).map((c) => `${duongDanChang(c)}/hoi`),
    ...(co((b) => b.loai === "viet") ? ["/viet"] : []),
    ...(co((b) => b.loai === "thu") ? ["/thu"] : []),
    ...SAU_TANG.filter((t) => co((b) => b.tang === t.ma)).map((t) => t.href),
    ...DOOR_KEYS.filter((k) => co((b) => b.cua.includes(k))).map((k) => `/cua/${k}`),
  ];

  return [
    ...trang.map((p) => ({ url: urlTuyetDoi(p) })),
    ...bai.map((b) => ({
      url: urlTuyetDoi(b.duongDan),
      ...(b.ngayCapNhat ? { lastModified: b.ngayCapNhat } : {}),
    })),
  ];
}

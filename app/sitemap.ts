import type { MetadataRoute } from "next";
import { docChinChang, duNamTang, duongDanChang } from "@/lib/chang";
import { baiCongKhai, locLoai } from "@/lib/noi-dung";
import { SAU_TANG } from "@/lib/sau-tang";
import { SO_BAI_DE_LAP_CHI_MUC, TRANG_CHUA_DU_CHU } from "@/lib/seo";
import { siteConfig, urlTuyetDoi } from "@/site.config";

/**
 * Sitemap (docs/05, mục 1): chỉ trang công khai và bài `da-dang`, kể cả khi
 * đang ở bản xem trước. Bài lấy `lastModified` từ ngày kiểm lại, hoặc ngày viết.
 *
 * Trang nào để `noindex, follow` thì không vào sitemap (docs/10, mục R5 và R7):
 * - trang danh sách và trang nhãn có ít hơn ba bài đã đăng;
 * - trang chặng chưa đủ năm tầng soi;
 * - trang khung chưa có chữ đã duyệt (TRANG_CHUA_DU_CHU, lib/seo.ts);
 * - /gui-cau-hoi khi bản thật chưa có nơi nhận thư (docs/07, mục A18).
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
  // Đủ bài để lập chỉ mục: cùng ngưỡng với thẻ robots của các trang ấy.
  const du = (ds: typeof bai) => ds.length >= SO_BAI_DE_LAP_CHI_MUC;
  const hoi = locLoai(bai, "hoi");

  const trang = [
    "/",
    "/tam",
    "/tri",
    "/than",
    "/muc-luc",
    ...chin.filter(duNamTang).map(duongDanChang),
    // Các trang phiên S4, trừ trang khung còn chờ chữ (chính sách và Dữ liệu
    // của bạn chờ luật sư, docs/07 mục D3; không ra mắt khi chưa có, docs/06 S7).
    ...TRANG_S4.filter((p) => !TRANG_CHUA_DU_CHU.has(p) && (p !== "/gui-cau-hoi" || siteConfig.moLoiThu)),
    ...(du(hoi) ? ["/hoi"] : []),
    ...chin.filter((c) => du(hoi.filter((b) => b.chang === c.so))).map((c) => `${duongDanChang(c)}/hoi`),
    ...(du(locLoai(bai, "viet")) ? ["/viet"] : []),
    ...(du(locLoai(bai, "thu")) ? ["/thu"] : []),
    ...SAU_TANG.filter((t) => du(bai.filter((b) => b.tang === t.ma))).map((t) => t.href),
  ];

  return [
    ...trang.map((p) => ({ url: urlTuyetDoi(p) })),
    ...bai.map((b) => ({
      url: urlTuyetDoi(b.duongDan),
      ...(b.ngayCapNhat ? { lastModified: b.ngayCapNhat } : {}),
    })),
  ];
}

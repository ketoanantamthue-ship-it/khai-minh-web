import { LOAI_THU, TRANG_CAM_ON, type LoaiThu } from "./thu-chu";

export { LOAI_THU, type LoaiThu };

/*
 * Chữ của trang cảm ơn và trang “chưa gửi được” (phiên S5). Tách khỏi
 * lib/thu-chu.ts để chữ chỉ dùng ở máy chủ không bị gói vào JavaScript của
 * biểu mẫu (ngân sách 160 KB, docs/10, mục R12).
 */

/**
 * Chữ của ba trang cảm ơn (/cam-on/[loai]). `soi` là câu đã có trong bản mẫu;
 * tiêu đề và các đoạn còn lại là chữ mới của S5, chờ anh duyệt.
 */
export const CAM_ON: Record<
  LoaiThu,
  { duongDan: string; tenVun: string; nhan: string; tieuDe: string; soi: string; doan: string[] }
> = {
  hoi: {
    duongDan: TRANG_CAM_ON.hoi,
    tenVun: "Lá thư đã đến",
    nhan: "LÁ THƯ ĐÃ ĐẾN",
    tieuDe: "Tôi đã nhận được lá thư của bạn.",
    // Bản mẫu (prototypes/index.html, lời báo sau khi gửi).
    soi: "Cảm ơn bạn đã tin mà gửi cho tôi. Tôi sẽ hồi âm trong ngày.",
    doan: [
      "Nếu bạn để lại địa chỉ thư, tôi vừa gửi tới đó một thư xác nhận. Bạn chưa thấy thì xem thử trong mục thư rác giúp tôi nhé.",
      "Nếu bạn không để lại địa chỉ, tôi vẫn đọc lá thư của bạn. Có thể tôi sẽ trả lời trong một bài viết không nêu tên bạn.",
    ],
  },
  thang: {
    duongDan: TRANG_CAM_ON.thang,
    tenVun: "Thư hằng tháng",
    nhan: "THƯ HẰNG THÁNG",
    tieuDe: "Cảm ơn bạn đã muốn nhận thư của tôi.",
    // W2, mục 6 (Xác nhận đăng ký thư).
    soi: "Lá thư đầu tiên sẽ đến hộp thư của bạn trong vài ngày tới.",
    doan: ["Nếu một ngày bạn không muốn nhận nữa, bạn chỉ cần trả lời một lá thư bất kỳ và nói với tôi."],
  },
  sach: {
    duongDan: TRANG_CAM_ON.sach,
    tenVun: "Chờ sách ra đời",
    nhan: "SOI – THẤU – CHUYỂN",
    tieuDe: "Cảm ơn bạn đã cùng tôi chờ cuốn sách.",
    // Bản mẫu (prototypes/cua-tri.html, ô “Báo cho tôi khi sách ra đời”).
    soi: "Tôi sẽ báo cho bạn khi sách ra đời.",
    doan: ["Tôi chỉ dùng địa chỉ của bạn cho lá thư báo tin ấy."],
  },
};

/** Lời mời nhẹ cuối trang cảm ơn lá thư (mới ở S5, theo câu “Bạn thử ngồi lặng cùng tôi…” của Bốn giờ). */
export const CAM_ON_NGOI_LANG = ["Trong lúc chờ, bạn có thể ", "ngồi lặng cùng tôi chín mươi giây", "."] as const;

/** Trang “chưa gửi được”, chỉ gặp khi trình duyệt không chạy JavaScript (mới ở S5). */
export const CHUA_GUI = {
  tieuDe: "Lá thư của bạn chưa gửi được.",
  soi: "Đường truyền đang chập chờn, nên lá thư chưa đến được với tôi. Bạn quay lại và thử gửi lại sau ít phút giúp tôi nhé.",
  quayLai: "Quay lại trang Gửi một câu hỏi",
} as const;

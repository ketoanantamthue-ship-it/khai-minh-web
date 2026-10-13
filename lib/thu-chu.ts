/**
 * Chữ của các biểu mẫu gửi thư (phiên S5): lời báo khi gửi, phiếu đồng ý của ô
 * nhận thư, trang cảm ơn. Mọi câu cho khách nằm ở đây để anh duyệt và sửa ở
 * một chỗ. Câu nào lấy từ bản mẫu hoặc docs/nguon thì ghi nguồn; câu còn lại
 * là chữ mới của S5, chờ anh duyệt (docs/07, mục E39).
 *
 * Tệp này không nhập thư viện nào, vì thành phần chạy ở trình duyệt cũng dùng.
 */

/** Địa chỉ nơi nhận thư của web (app/api/thu/route.ts). */
export const NOI_NHAN_THU = "/api/thu";

/** Ba loại thư mà nơi nhận thư hiểu được. */
export const LOAI_THU = ["hoi", "thang", "sach"] as const;
export type LoaiThu = (typeof LOAI_THU)[number];

/** Đường dẫn trang cảm ơn của từng loại thư. */
export const TRANG_CAM_ON: Record<LoaiThu, string> = {
  hoi: "/cam-on/la-thu",
  thang: "/cam-on/thu-hang-thang",
  sach: "/cam-on/bao-sach",
};

/** Trang báo gửi chưa được, khi trình duyệt không chạy JavaScript. */
export const TRANG_CHUA_GUI = "/chua-gui-duoc";

/** Mã lỗi nơi nhận thư trả về cho trình duyệt. Không mang nội dung thư. */
export type MaLoiThu = "du-lieu" | "nhieu" | "mang";

export const CHU_THU = {
  // Bản mẫu (prototypes/index.html, lá thư).
  thieuCauHoi: "Bạn viết giúp tôi câu hỏi trước khi gửi nhé.",
  chuaDongYHoi: "Bạn đánh dấu ô đồng ý để tôi được đọc câu hỏi này nhé.",
  // Bản mẫu (FormNhanThu, ô nhận thư).
  saiDiaChi: "Bạn giúp tôi điền địa chỉ thư đầy đủ nhé, để lá thư đến đúng nơi.",

  // Mới ở S5, theo mẫu câu “Bạn đánh dấu ô đồng ý…” của bản mẫu.
  chuaDongYNhanThu: "Bạn đánh dấu ô đồng ý để tôi được gửi thư cho bạn nhé.",
  /** Phiếu đồng ý của ô nhận thư (mới ở S5). “trang Dữ liệu” là liên kết tới /du-lieu. */
  dongYNhanThu: ["Tôi đồng ý để Khai Minh chỉ dùng địa chỉ này để gửi thư cho tôi, như ", "trang Dữ liệu", " đã nói rõ."],
  dangGui: "Lá thư đang trên đường đi, bạn chờ tôi một chút nhé.",

  // Mới ở S5, dựa trên câu “Lỗi gửi biểu mẫu” của W2, mục 6.
  loiMangHoi:
    "Lá thư chưa gửi được vì đường truyền đang chập chờn. Chữ bạn viết vẫn còn nguyên ở đây. Bạn thử gửi lại sau ít phút giúp tôi nhé.",
  loiMangNhanThu: "Địa chỉ của bạn chưa gửi được vì đường truyền đang chập chờn. Bạn thử gửi lại sau ít phút giúp tôi nhé.",
  loiNhieu: "Bạn vừa gửi mấy lá thư liền nhau. Bạn đợi chừng mười phút rồi gửi lại giúp tôi nhé.",
  /** Theo sau câu lỗi của lá thư khi có số Zalo (site.config.ts, lienHe.zalo). */
  loiZalo: (zalo: string) => `Nếu vẫn chưa được, bạn nhắn cho tôi qua Zalo ${zalo}.`,
} as const;

/** Lời báo khi gửi không được, theo mã lỗi. */
export function loiGuiThu(ma: MaLoiThu, loai: LoaiThu): string {
  if (ma === "nhieu") return CHU_THU.loiNhieu;
  return loai === "hoi" ? CHU_THU.loiMangHoi : CHU_THU.loiMangNhanThu;
}

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

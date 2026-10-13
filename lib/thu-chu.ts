/**
 * Chữ của các biểu mẫu gửi thư (phiên S5): lời báo khi gửi, phiếu đồng ý của ô
 * nhận thư. Chữ trang cảm ơn nằm ở lib/thu-cam-on.ts. Anh duyệt và sửa ở hai
 * tệp này. Câu nào lấy từ bản mẫu hoặc docs/nguon thì ghi nguồn; câu còn lại
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

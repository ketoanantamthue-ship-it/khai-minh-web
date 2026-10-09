import type { NguoiHoi } from "@/lib/su-kien";

/**
 * Chữ do script của bản mẫu hiện ra sau một thao tác (prototypes/index.html).
 * Giữ nguyên văn; mọi thay đổi chữ làm ở đây.
 */

/** Trục "bạn đang lo cho ai": những chặng được thắp sáng (chỉ số 0–8) và lời nhắn. */
export const NGUOI_HOI_CHU: Record<NguoiHoi, { nhan: string; chang: number[]; loiNhan: string }> = {
  self: {
    nhan: "Cho chính tôi",
    chang: [3, 4, 5, 6],
    loiNhan: "Những chặng bạn có thể đang đi qua đã được thắp sáng. Bạn chọn một chặng để mở.",
  },
  spouse: {
    nhan: "Cho vợ hoặc chồng tôi",
    chang: [3, 4, 5, 6],
    loiNhan:
      "Những chặng mà hôn nhân thường bị thử thách nhất đã được thắp sáng: lúc mới về chung một nhà, lúc giữa đời nhiều gánh nặng, lúc con rời tổ, và lúc cùng nhau già đi.",
  },
  child: {
    nhan: "Cho con tôi",
    chang: [0, 1, 2],
    loiNhan: "Những chặng của tuổi thơ con đã được thắp sáng. Bạn chọn một chặng để mở.",
  },
  parent: {
    nhan: "Cho cha mẹ tôi",
    chang: [5, 6, 7],
    loiNhan: "Những chặng cha mẹ bạn có thể đang đi qua đã được thắp sáng. Bạn chọn một chặng để mở.",
  },
  gone: {
    nhan: "Cho người đã khuất",
    chang: [7, 8],
    loiNhan: "Những chặng của lúc ra đi và sau khi mất đã được thắp sáng. Mong bạn được nhẹ lòng khi đọc.",
  },
};

/** Lời chào ở cánh cổng sau khi khách thắp đèn. Khoá rỗng: "Tôi muốn xem quanh nhà trước". */
export const LOI_CHAO_CONG: Record<NguoiHoi | "", string> = {
  self: "Mời bạn vào. Ở đây, bạn được phép mệt, và được phép chưa có câu trả lời.",
  spouse: "Mời bạn vào. Ở đây, chuyện của hai người được nhìn cho rõ, mà không ai bị trách.",
  child: "Mời bạn vào. Ở đây, chúng ta cùng hiểu con, chứ không gán cho con một cái nhãn nào.",
  parent: "Mời bạn vào. Ở đây, nỗi lo cho cha mẹ được lắng nghe, còn chuyện điều trị vẫn để bác sĩ quyết.",
  gone: "Mời bạn vào. Ở đây, nỗi nhớ của bạn được đón nhận thật nhẹ nhàng.",
  "": "Mời bạn vào. Bạn cứ thong thả xem quanh nhà.",
};

/** Bốn giờ của một đêm: lời đáp khi khách chọn một giờ. */
export const BON_GIO_DAP: { loi: string; nut: string; href: string; ngoiLang?: boolean; anToan?: boolean }[] = [
  {
    loi: "Nếu bạn đang ở giờ này, bạn chưa cần làm gì nhiều. Bạn thử ngồi lặng cùng tôi chín mươi giây trước đã.",
    nut: "Ngồi lặng chín mươi giây",
    href: "#khoang-lang",
    ngoiLang: true,
    anToan: true,
  },
  {
    loi: "Bạn đã gọi được tên nỗi lo. Bảng tự soi giúp bạn nhìn nó rõ hơn, ở nhà, một mình, và không thu phí.",
    nut: "Bắt đầu bảng tự soi",
    href: "/tam#bac-thang",
  },
  {
    loi: "Bạn đã thấy hình dạng của nỗi sợ. Cuốn nhật ký hai mươi mốt ngày giúp bạn thấy nó thường bắt đầu từ đâu, để lần sau bạn kịp dừng lại.",
    nut: "Xem con đường đồng hành",
    href: "#dong-hanh",
  },
  {
    loi: "Bạn đã đi qua được một đêm. Nếu muốn, bạn có thể nhận lá thư hằng tháng của tôi, để những đêm sau bớt dài.",
    nut: "Nhận thư hằng tháng",
    href: "/tri#thu",
  },
];

/** Chủ đề lá thư: nhãn ô viết và lời nhắc. */
export const CHU_DE_THU = {
  q: ["Câu hỏi của bạn", "Bạn không cần đưa ngày giờ sinh nếu chưa muốn."],
  hoso: [
    "Câu hỏi bạn đang mang, và vì sao bạn muốn có Hồ sơ Soi",
    "Tôi sẽ hẹn bạn làm Bảng tự soi trước, vì Hồ sơ Soi bắt đầu từ đó. Trạm này không nhận tiền, chỉ cần lời hẹn nói thật.",
  ],
  dong: [
    "Điều bạn mong mang về sau hành trình",
    "Tôi sẽ gửi bạn bốn lời hẹn để bạn đọc kỹ trước khi nhận lời. Mỗi đợt chỉ có tám đến mười chỗ.",
  ],
  tra: [
    "Điều bạn muốn nói riêng với tôi",
    "Mỗi tháng tôi chỉ nhận tối đa ba người mới cho Trà thất, dành cho người đã đi qua Hồ sơ Soi.",
  ],
  hc: ["Điều bạn đã thấy", "Tôi trả lời bạn trong bảy ngày, bằng tên thật của mình, và nói rõ tôi sẽ sửa điều gì."],
  md: [
    "Bạn gặp người ấy ở đâu, và họ đã nói hay mời bạn mua gì",
    "Cảm ơn bạn. Tôi không bán lễ giải hạn, bùa hay vật phẩm, nên mọi lời mời mua những thứ ấy nhân danh tôi đều không phải từ tôi.",
  ],
} as const satisfies Record<string, readonly [string, string]>;
export type ChuDeThu = keyof typeof CHU_DE_THU;

/** Lớp Ngồi lặng chín mươi giây. */
export const NGOI_LANG = {
  batDau: "Bạn ngồi thoải mái. Chúng ta bắt đầu.",
  hoiTho: ["Thở vào, bạn biết mình đang thở vào.", "Thở ra, bạn biết mình đang thở ra."],
  xong: "Cảm ơn bạn đã ngồi lại với chính mình.",
} as const;

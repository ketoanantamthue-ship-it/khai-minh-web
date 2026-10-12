/**
 * Cấu hình chung của web Khai Minh.
 *
 * Mọi liên kết ra ngoài, số đường dây nóng, cờ ảnh tạm và cờ lập chỉ mục
 * đều lấy từ tệp này. Thành phần giao diện không viết cứng các giá trị đó.
 *
 * Giá trị `null` nghĩa là chưa có chất liệu thật: giao diện sẽ hiện ô trống
 * kèm `data-can`, và mục tương ứng được ghi ở docs/07.
 */

/** Một liên kết có thể chưa có địa chỉ (chờ anh chốt, xem docs/07). */
export type LienKet = {
  ten: string;
  url: string | null;
  /** Mã việc ở docs/07 khi `url` còn trống. */
  can?: string;
};

export type AnhTam = {
  /** Đường dẫn trong `public/`. */
  duongDan: string[];
  /** `true` khi ảnh chưa có bản quyền dùng (docs/07, mục B1). */
  anhTam: boolean;
  ghiChu: string;
};

/**
 * Tên miền gốc. Lấy từ NEXT_PUBLIC_SITE_URL cho tới khi chốt tên miền
 * (docs/07, mục A9). Bỏ dấu "/" ở cuối để ghép đường dẫn cho gọn.
 */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

/**
 * Cờ lập chỉ mục. Chỉ anh mới bật (CLAUDE.md, quy tắc 12).
 * Bản xem trước của Vercel luôn `noindex`, kể cả khi cờ đang bật.
 */
const laBanXemTruoc =
  process.env.VERCEL_ENV === "preview" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
const choPhepLapChiMuc =
  process.env.NEXT_PUBLIC_CHO_PHEP_LAP_CHI_MUC === "true" && !laBanXemTruoc;

/**
 * Có hiện bài chưa `da-dang` hay không (docs/04, mục 5).
 * - Production của Vercel, hoặc khi cờ lập chỉ mục đang bật: không bao giờ.
 * - Bản xem trước, `next dev`, bản build trên máy và trong CI: có, kèm dải
 *   “Bản nháp” trên trang.
 * Đặt HIEN_BAN_NHAP=false để dựng thử đúng như production.
 */
const moiTruongVercel = process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV;
const hienBanNhap =
  process.env.HIEN_BAN_NHAP !== "false" && moiTruongVercel !== "production" && !choPhepLapChiMuc;

/**
 * Bản thật: mọi nơi không hiện bài nháp (ngược với `hienBanNhap`). Ở bản thật,
 * các trang còn khung ẩn ô “Đang soạn” và để `noindex, follow`; bản xem trước
 * giữ nguyên để đội viết thấy chỗ còn thiếu (docs/10, mục R7).
 */
const laBanThat = !hienBanNhap;

/**
 * Nơi nhận thư của các biểu mẫu (docs/07, mục A5; nối ở phiên S5). Khi còn
 * `null`, bản thật ẩn lá thư, các ô nhận thư và mọi lối dẫn tới chúng (anh
 * chốt ở docs/07, mục A18); bản xem trước vẫn giữ như bản mẫu.
 */
const noiNhanThu: string | null = null;

export const siteConfig = {
  ten: "Khai Minh",
  kyTen: "Người Khai Vấn (Khai Minh)",
  siteUrl,
  choPhepLapChiMuc,
  hienBanNhap,
  laBanThat,
  noiNhanThu,
  /**
   * Lối gửi thư đang mở: lá thư “Gửi một câu hỏi”, ô “Nhận thư hằng tháng”,
   * ô “Báo cho tôi khi sách ra đời” và mọi nút dẫn tới chúng (xem `noiNhanThu`).
   * Thành phần chạy ở trình duyệt nhận giá trị này qua prop, vì biến môi
   * trường của bản thật không có ở phía trình duyệt.
   */
  moLoiThu: noiNhanThu !== null || hienBanNhap,

  /**
   * Thực thể Person “Khai Minh” trong JSON-LD (docs/05, mục 4; docs/10, mục R2).
   * Chỉ ghi điều đã có chất liệu; trường còn `null` thì JSON-LD bỏ qua.
   */
  nguoi: {
    /** Câu “Khai Minh là ai” của docs/nguon/ban-cuoi-khai-minh-va-an-tam-menh.md, mục 1. */
    moTa: "Khai Minh là người khai vấn, giúp người Việt tự soi và chuyển hóa tâm mình qua chín chặng đời, trên nền Phật học và cổ học được nói thật mức tin cậy, cho tới ngày họ tự bước đi.",
    /** Những mảng Khai Minh viết, theo câu trên và ba cửa (Bản cuối, mục 1 và 3). */
    linhVuc: ["Phật học", "Cổ học", "Dưỡng sinh"],
    /** Ảnh chân dung khổ 4:5 (docs/07, mục B2). Đường dẫn trong `public/`. */
    anh: "/assets/img/khai-minh-chan-dung.webp" as string | null,
    /** Bản nhỏ 480 px cho khung hẹp (srcset). */
    anhNho: "/assets/img/khai-minh-chan-dung-480.webp",
    anhMoTa: "Khai Minh mặc áo trắng, đeo chuỗi hạt gỗ, chắp tay chào và mỉm cười.",
    anhKichThuoc: { rong: 1066, cao: 1332 },
    /** Bản gốc khổ lớn cho trang Báo chí (mục “Ảnh tải về”). */
    anhTaiVe: "/assets/img/khai-minh-chan-dung-tai-ve.jpg" as string | null,
    /**
     * Tiểu sử (docs/07, mục C7), viết từ trang antammenh.com/about theo lời anh
     * (12/10/2026). Bản ngắn ngôi thứ ba cho báo chí; bản dài ngôi thứ nhất cho
     * /khai-minh. Câu nào đổi thì đổi ở đây, hai trang tự cập nhật.
     */
    tieuSuNgan: [
      "Khai Minh là bút danh của người sáng lập An Tâm Mệnh, một dược sĩ sống và làm việc tại TP. Hồ Chí Minh.",
      "Trước khi chọn con đường khai vấn, anh đã đi qua hơn bảy nghề, từ quầy thuốc đến kinh doanh phần mềm.",
      "Anh dùng Phật học và cổ học như những tấm gương, để người Việt tự soi tâm mình.",
      "Anh giữ ba nguyên tắc: không phán xét, không mê tín và không bán nỗi sợ.",
    ].join(" "),
    tieuSuDai: {
      moDau:
        "Tôi là Khai Minh. Tôi không sinh ra đã biết đường đi. Tôi đã lạc nhiều năm, và chính những năm lạc ấy dạy tôi cách ngồi bên một người đang lạc.",
      moc: [
        {
          nam: "2012",
          chu: "Tôi rời quê lên Sài Gòn học ngành Dược. Tôi mang theo một câu hỏi mà khi ấy chưa ai trả lời giúp tôi: mình sống để làm gì?",
        },
        {
          nam: "2013–2015",
          chu: "Tôi làm đủ việc: đứng quầy thuốc, giữ kho, đi trình dược. Tôi làm chăm chỉ, nhưng lòng vẫn thấy mình đang sống sai chỗ.",
        },
        {
          nam: "2015–2016",
          chu: "Câu hỏi ấy đưa tôi tìm đến cổ học. Tôi học Tử Vi, Bát Tự, Kinh Dịch, Thần Số Học, Nhân Tướng và chỉ tay, cùng lời Phật dạy về nhân quả. Tôi học để hiểu mình trước, rồi mới dám ngồi nghe câu hỏi của người khác.",
        },
        {
          nam: "2016–2019",
          chu: "Tôi làm kinh doanh phần mềm trong ngành viễn thông. Công việc ổn định, nhưng câu hỏi cũ chưa bao giờ rời tôi.",
        },
        {
          nam: "2019",
          chu: "Một trận bệnh nặng buộc tôi phải dừng lại. Tôi lên núi và ngồi thiền mười ngày. Ở đó, lần đầu tiên tôi nhìn thẳng vào những điều mình vẫn chạy trốn.",
        },
        {
          nam: "2020–2023",
          chu: "Tôi khởi nghiệp nhiều lần và thất bại cũng nhiều lần. Tôi đi qua Đông y, trà thảo mộc, marketing, nội thất và nông nghiệp sạch. Mỗi lần ngã, tôi hiểu thêm một điều về tâm mình.",
        },
        {
          nam: "2023",
          chu: "Tôi dùng chính những gì đã học để soi lại lá số và đời mình. Những mảnh rời rạc của bao năm bỗng khớp vào nhau, như một căn phòng tối vừa được thắp đèn.",
        },
        {
          nam: "2024",
          chu: "Tôi lập An Tâm Mệnh. Tôi muốn trao lại chiếc la bàn mà mình đã mất mười bốn năm để tìm. Tôi mong bạn không phải đi vòng lâu như tôi.",
        },
      ],
      ketLai:
        "Tôi không trao câu trả lời. Tôi trao lại chiếc la bàn, để bạn tự tìm đường về với lòng mình. Tôi giữ ba điều: không phán xét, không mê tín và không bán nỗi sợ.",
    },
    /**
     * Nghề dược sĩ trong `hasOccupation`: chỉ ghi khi anh đồng ý công khai
     * kèm chứng chỉ (docs/07, mục D2).
     */
    ngheDuocSi: false,
  },

  /** Tổ chức mà Khai Minh làm việc cho (JSON-LD Organization; docs/05, mục 1). */
  toChuc: {
    ten: "An Tâm Mệnh",
    url: "https://antammenh.com",
    /** Logo chính thức: chưa có (docs/nguon/he-nhan-dien-mot-goc.md, mục “Biểu tượng”). */
    logo: null as string | null,
    /** Kênh chính thức của tổ chức (docs/07, mục C7). */
    sameAs: [
      "https://www.facebook.com/antammenh",
      "https://www.youtube.com/@antammenh",
      "https://www.tiktok.com/@antammenh",
    ] as string[],
  },

  /** Liên kết sang các web khác trong cùng ngôi nhà (docs/02, mục 4). */
  lienKetNgoai: {
    anTamMenh: { ten: "An Tâm Mệnh", url: "https://antammenh.com" },
    khaiMenh: { ten: "Khai Mệnh", url: "https://khaimenh.com" },
    /** Khai Tâm chưa mở, chân trang hiện "(sắp mở)". */
    khaiTam: { ten: "Khai Tâm", url: null, can: "Khai Tâm chưa mở" },
    /** Trang con ở antammenh.com và khaimenh.com chưa chốt (docs/07, mục A6). */
    bangTuSoi: { ten: "Bảng tự soi", url: null, can: "A6" },
    hoSoSoi: { ten: "Hồ sơ Soi", url: null, can: "A6" },
    traThat: { ten: "Trà thất", url: null, can: "A6" },
    hienChuongGoc: { ten: "Hiến chương bản gốc", url: null, can: "A6" },
    /** Cộng đồng ở antammenh.com ("Khoảng sân chung" trên trang Cửa Tâm). */
    congDong: { ten: "Khoảng sân chung", url: null, can: "A6" },
  } satisfies Record<string, LienKet>,

  /** Kênh chính thức (docs/07, mục C7). */
  mangXaHoi: [
    { ten: "Facebook", url: null, can: "C7" },
    { ten: "Ngôi Nhà Khai Mệnh", url: null, can: "C7" },
    { ten: "YouTube", url: null, can: "C7" },
    { ten: "Zalo OA", url: null, can: "C7" },
  ] satisfies LienKet[],

  /** Thông tin liên hệ và pháp nhân (docs/07, mục D1). */
  lienHe: {
    email: null as string | null,
    /** Số Zalo, cũng là số điện thoại (anh gửi ngày 12/10/2026). */
    zalo: "094 436 5246" as string | null,
    dienThoai: "0944365246" as string | null,
    thanhPho: "TP. Hồ Chí Minh",
    diaChi: null as string | null,
    chuSoHuuNhanHieu: null as string | null,
    phapNhan: null as string | null,
    ngayCapNhat: null as string | null,
  },

  /** Số khẩn cấp ở chân trang mọi trang. */
  khanCap: {
    capCuu: { ten: "cấp cứu", so: "115", tel: "115" },
    ngayMai: {
      ten: "Đường dây nóng Ngày Mai",
      so: "096 306 1414",
      tel: "0963061414",
      /**
       * Số chỉ hiện ra khi cờ này là `true`. Đội vận hành cần gọi thử
       * và xác nhận giờ hoạt động trước khi bật (docs/07, mục D5).
       */
      hotlineDaXacNhan: false,
    },
  },

  /**
   * Ảnh tạm lấy từ Pinterest, chưa rõ tác giả (docs/07, mục B1).
   * Bản build production báo lỗi nếu còn ảnh tạm mà cờ lập chỉ mục đang bật.
   */
  anh: {
    canhCong: {
      duongDan: [
        "/assets/img/mo-cua-dem.webp",
        "/assets/img/mo-cua-dem-720.webp",
        "/assets/img/mo-cua-sang.webp",
        "/assets/img/mo-cua-sang-720.webp",
      ],
      anhTam: true,
      ghiChu: "Ảnh cánh cổng, chờ hoạ sĩ vẽ riêng",
    },
    vuTru: {
      duongDan: ["/assets/img/vu-tru.jpg", "/assets/img/vu-tru-dien-thoai.jpg"],
      anhTam: true,
      ghiChu: "Ảnh nền vũ trụ, chờ ảnh có bản quyền rộng từ 2.560 px",
    },
  } satisfies Record<string, AnhTam>,
} as const;

/** Danh sách ảnh tạm còn lại, dùng cho bước kiểm tra lúc build. */
export function danhSachAnhTam(): AnhTam[] {
  return Object.values(siteConfig.anh).filter((a) => a.anhTam);
}

/** Ghép đường dẫn tuyệt đối từ tên miền gốc. */
export function urlTuyetDoi(duongDan = "/"): string {
  return `${siteConfig.siteUrl}${duongDan.startsWith("/") ? "" : "/"}${duongDan}`;
}

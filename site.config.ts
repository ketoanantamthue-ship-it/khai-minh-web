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
 * `null`, bản thật không được báo “đã nhận được lá thư”; bản xem trước vẫn
 * hiện lời báo của bản mẫu như cũ.
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
  /** Biểu mẫu có được báo “đã nhận” hay không (xem `noiNhanThu`). */
  baoDaNhanThu: noiNhanThu !== null || hienBanNhap,

  /**
   * Thực thể Person “Khai Minh” trong JSON-LD (docs/05, mục 4; docs/10, mục R2).
   * Chỉ ghi điều đã có chất liệu; trường còn `null` thì JSON-LD bỏ qua.
   */
  nguoi: {
    /** Câu “Khai Minh là ai” của docs/nguon/ban-cuoi-khai-minh-va-an-tam-menh.md, mục 1. */
    moTa: "Khai Minh là người khai vấn, giúp người Việt tự soi và chuyển hóa tâm mình qua chín chặng đời, trên nền Phật học và cổ học được nói thật mức tin cậy, cho tới ngày họ tự bước đi.",
    /** Những mảng Khai Minh viết, theo câu trên và ba cửa (Bản cuối, mục 1 và 3). */
    linhVuc: ["Phật học", "Cổ học", "Dưỡng sinh"],
    /** Ảnh chân dung (docs/07, mục B2). Đường dẫn trong `public/`. */
    anh: null as string | null,
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
    sameAs: [] as string[],
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
    zalo: null as string | null,
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

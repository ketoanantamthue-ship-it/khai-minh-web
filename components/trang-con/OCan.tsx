import { siteConfig } from "@/site.config";

/**
 * Ô CẦN: chỗ trên trang chưa có chữ đã duyệt (CLAUDE.md, quy tắc 2).
 *
 * Khách chỉ thấy khung chất liệu `.slot` của bản mẫu với chữ “Đang soạn”
 * (chữ của bản mẫu cửa Trí). Mã việc ở docs/07 nằm trong `data-can`, không
 * bao giờ hiện ra (quy tắc 3).
 *
 * `kieu="dong"`: ô nhỏ nằm trong dòng chữ, dùng trong danh sách.
 *
 * `anOBanThat`: ô của trang chặng và các trang khung chỉ hiện trên bản xem
 * trước; bản thật không dựng ô ấy (docs/10, mục R7).
 */
export function OCan({ ma, kieu = "khoi", anOBanThat = false }: {
  ma: string;
  kieu?: "khoi" | "dong";
  anOBanThat?: boolean;
}) {
  if (anOBanThat && siteConfig.laBanThat) return null;
  if (kieu === "dong") {
    return (
      <span className="o-can-chu" data-can={ma}>
        Đang soạn
      </span>
    );
  }
  return (
    <div className="slot o-can" data-can={ma}>
      <div>
        <b>Đang soạn</b>
      </div>
    </div>
  );
}

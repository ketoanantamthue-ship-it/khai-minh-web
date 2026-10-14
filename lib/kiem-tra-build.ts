import type { AnhTam } from "../site.config";

/**
 * Chặn bản build production khi cờ lập chỉ mục đang bật mà còn ảnh tạm
 * (CLAUDE.md, mục "An toàn và pháp lý"; docs/08).
 */
export function kiemTraAnhTam({
  choPhepLapChiMuc,
  anhTam,
}: {
  choPhepLapChiMuc: boolean;
  anhTam: AnhTam[];
}): void {
  if (!choPhepLapChiMuc || anhTam.length === 0) return;

  const danhSach = anhTam.map((a) => `  - ${a.ghiChu}: ${a.duongDan.join(", ")}`).join("\n");
  throw new Error(
    [
      "Không build được: cờ NEXT_PUBLIC_CHO_PHEP_LAP_CHI_MUC đang bật nhưng vẫn còn ảnh tạm.",
      danhSach,
      "Hãy thay ảnh có bản quyền và đặt anhTam: false trong site.config.ts (docs/07, mục B1),",
      "hoặc tắt cờ lập chỉ mục.",
    ].join("\n"),
  );
}

/**
 * Chặn bản build production của Vercel khi lá thư và các ô nhận thư đang mở
 * (`noiNhanThu`) mà chưa đặt hai biến môi trường của nơi nhận thư (phiên S5;
 * apps-script/HUONG-DAN.md). Thiếu hai biến này, khách gửi thư sẽ chỉ gặp lời
 * báo lỗi. Bản xem trước và bản build trong CI không bị chặn.
 */
export function kiemTraNoiNhanThu({
  laProduction,
  noiNhanThu,
  bien,
}: {
  laProduction: boolean;
  noiNhanThu: string | null;
  bien: Record<string, string | undefined>;
}): void {
  if (!laProduction || !noiNhanThu) return;
  const thieu = ["THU_APPS_SCRIPT_URL", "THU_BI_MAT"].filter((k) => !bien[k]);
  if (thieu.length === 0) return;
  throw new Error(
    [
      `Không build được: lá thư đang mở nhưng Vercel chưa có biến môi trường ${thieu.join(", ")}.`,
      "Hãy đặt hai biến này cho Production (apps-script/HUONG-DAN.md, bước 6),",
      "hoặc đặt noiNhanThu = null trong site.config.ts để tạm ẩn lá thư.",
    ].join("\n"),
  );
}

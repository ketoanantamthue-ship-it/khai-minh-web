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

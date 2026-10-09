import { expect, test } from "@playwright/test";
import { kiemTraAnhTam } from "../lib/kiem-tra-build";
import { danhSachAnhTam } from "../site.config";

/** Cờ lập chỉ mục bật mà còn ảnh tạm thì build phải báo lỗi (docs/08). */
test.describe("Kiểm tra ảnh tạm lúc build", () => {
  test("ảnh cổng và ảnh vũ trụ đang được đánh dấu là ảnh tạm", () => {
    expect(danhSachAnhTam().length).toBe(2);
  });

  test("cờ tắt: build chạy bình thường", () => {
    expect(() => kiemTraAnhTam({ choPhepLapChiMuc: false, anhTam: danhSachAnhTam() })).not.toThrow();
  });

  test("cờ bật mà còn ảnh tạm: build báo lỗi", () => {
    expect(() => kiemTraAnhTam({ choPhepLapChiMuc: true, anhTam: danhSachAnhTam() })).toThrow(/ảnh tạm/);
  });

  test("cờ bật và đã thay hết ảnh: build chạy bình thường", () => {
    expect(() => kiemTraAnhTam({ choPhepLapChiMuc: true, anhTam: [] })).not.toThrow();
  });
});

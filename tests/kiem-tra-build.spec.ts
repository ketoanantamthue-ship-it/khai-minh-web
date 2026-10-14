import { expect, test } from "@playwright/test";
import { kiemTraAnhTam, kiemTraNoiNhanThu } from "../lib/kiem-tra-build";
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

/** Lá thư đang mở mà production chưa có biến môi trường của nơi nhận thư thì build báo lỗi (S5). */
test.describe("Kiểm tra nơi nhận thư lúc build", () => {
  const du = { THU_APPS_SCRIPT_URL: "https://script.google.com/macros/s/x/exec", THU_BI_MAT: "bi-mat" };

  test("production thiếu biến: build báo lỗi, kể tên biến thiếu", () => {
    expect(() => kiemTraNoiNhanThu({ laProduction: true, noiNhanThu: "/api/thu", bien: {} })).toThrow(
      /THU_APPS_SCRIPT_URL, THU_BI_MAT/,
    );
    expect(() =>
      kiemTraNoiNhanThu({ laProduction: true, noiNhanThu: "/api/thu", bien: { THU_BI_MAT: "x" } }),
    ).toThrow(/THU_APPS_SCRIPT_URL/);
  });

  test("production đủ biến, bản xem trước, hoặc lá thư đang ẩn: build chạy bình thường", () => {
    expect(() => kiemTraNoiNhanThu({ laProduction: true, noiNhanThu: "/api/thu", bien: du })).not.toThrow();
    expect(() => kiemTraNoiNhanThu({ laProduction: false, noiNhanThu: "/api/thu", bien: {} })).not.toThrow();
    expect(() => kiemTraNoiNhanThu({ laProduction: true, noiNhanThu: null, bien: {} })).not.toThrow();
  });
});

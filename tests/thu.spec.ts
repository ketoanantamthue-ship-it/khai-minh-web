import AxeBuilder from "@axe-core/playwright";
import { expect, test, type APIRequestContext } from "@playwright/test";
import { NOI_NHAN_THU } from "../lib/thu-chu";
import { siteConfig } from "../site.config";

/**
 * Lá thư và ô nhận thư gửi thật (phiên S5). Máy chủ thử chạy kèm một Apps
 * Script giả (tests/fixtures/apps-script-gia.mjs, playwright.config.ts), nên
 * lá thư đi trọn đường: biểu mẫu → /api/thu → Apps Script.
 */
const APPS_SCRIPT_GIA = `http://127.0.0.1:${Number(process.env.PORT_THU ?? 3100) + 1}`;

/**
 * Mỗi bài kiểm thử một địa chỉ mạng riêng, đổi theo từng lần chạy, để giới hạn
 * tần suất không chặn nhầm (máy chủ thử có thể còn nhớ lượt đếm của lần trước).
 */
const LAN_CHAY = Math.random().toString(36).slice(2);
function diaChiMang(ten: string): string {
  let h = 0;
  for (const c of `${LAN_CHAY}|${test.info().project.name}|${ten}`) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `10.${(h >> 16) & 255}.${(h >> 8) & 255}.${h & 255}`;
}

async function daNhan(request: APIRequestContext, q: string): Promise<Record<string, unknown>[]> {
  return (await request.get(`${APPS_SCRIPT_GIA}/tim?q=${encodeURIComponent(q)}`)).json();
}

function dau(): string {
  return `dau-${test.info().project.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

test.describe("Nơi nhận thư /api/thu", () => {
  test("site.config.ts trỏ đúng nơi nhận thư mà biểu mẫu gửi tới, hoặc còn tắt", () => {
    expect([null, NOI_NHAN_THU]).toContain(siteConfig.noiNhanThu);
  });

  test("lá thư hợp lệ đi sang Apps Script kèm mã bí mật, không kèm địa chỉ mạng", async ({ request }) => {
    const d = dau();
    const res = await request.post("/api/thu", {
      headers: { Accept: "application/json", "x-forwarded-for": diaChiMang("hop-le") },
      form: { loai: "hoi", topic: "hc", dieu: "3", ten: " An ", "cau-hoi": `Câu hỏi ${d}`, email: "An@Vi-Du.vn", "dong-y": "on" },
    });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true, den: "/cam-on/la-thu" });
    const [goi] = await daNhan(request, d);
    expect(goi).toMatchObject({
      loai: "hoi",
      chuDe: "Góp ý một điều trong Hiến chương (Điều 3)",
      ten: "An",
      cauHoi: `Câu hỏi ${d}`,
      email: "an@vi-du.vn",
      dongY: true,
      biMat: "bi-mat-thu",
    });
    expect(String(goi!.khoa)).toMatch(/^[0-9a-f]{24}$/);
    expect(JSON.stringify(goi)).not.toContain(diaChiMang("hop-le"));
  });

  test("dữ liệu sai thì báo lỗi `du-lieu` và không gửi gì đi", async ({ request }) => {
    const d = dau();
    const sai: Record<string, string>[] = [
      { loai: "hoi", topic: "q", "cau-hoi": `${d} thiếu ô đồng ý` },
      { loai: "hoi", topic: "q", "cau-hoi": "   ", "dong-y": "on" },
      { loai: "hoi", topic: "khong-co", "cau-hoi": d, "dong-y": "on" },
      { loai: "hoi", topic: "q", "cau-hoi": d, email: "khong-phai-dia-chi", "dong-y": "on" },
      { loai: "hoi", topic: "q", "cau-hoi": `${d}${"x".repeat(6001)}`, "dong-y": "on" },
      { loai: "thang", email: `${d}@vi-du.vn` },
      { loai: "sach", email: "", "dong-y": "on" },
    ];
    for (const form of sai) {
      const res = await request.post("/api/thu", {
        headers: { Accept: "application/json", "x-forwarded-for": diaChiMang("sai") },
        form,
      });
      expect(res.status(), JSON.stringify(form).slice(0, 80)).toBe(400);
      expect(await res.json()).toEqual({ ok: false, loi: "du-lieu" });
    }
    expect(await daNhan(request, d)).toEqual([]);
  });

  test("ô bẫy có chữ: báo đã gửi nhưng bỏ thư", async ({ request }) => {
    const d = dau();
    const res = await request.post("/api/thu", {
      headers: { Accept: "application/json", "x-forwarded-for": diaChiMang("bay") },
      form: { loai: "thang", email: `${d}@vi-du.vn`, "dong-y": "on", website: "http://rac.example" },
    });
    expect(await res.json()).toEqual({ ok: true, den: "/cam-on/thu-hang-thang" });
    expect(await daNhan(request, d)).toEqual([]);
  });

  test("gửi quá năm lần trong mười phút từ một địa chỉ mạng thì bị chặn", async ({ request }) => {
    const ip = diaChiMang("tan-suat");
    const trangThai: number[] = [];
    for (let i = 0; i < 6; i++) {
      const res = await request.post("/api/thu", {
        headers: { Accept: "application/json", "x-forwarded-for": ip },
        form: { loai: "sach", email: `${dau()}@vi-du.vn`, "dong-y": "on" },
      });
      trangThai.push(res.status());
    }
    expect(trangThai).toEqual([200, 200, 200, 200, 200, 429]);
  });

  test("Apps Script không ghi được thì báo lỗi `mang`", async ({ request }) => {
    const res = await request.post("/api/thu", {
      headers: { Accept: "application/json", "x-forwarded-for": diaChiMang("loi") },
      form: { loai: "hoi", topic: "q", "cau-hoi": "[loi] thử", "dong-y": "on" },
    });
    expect(res.status()).toBe(503);
    expect(await res.json()).toEqual({ ok: false, loi: "mang" });
  });

  test("gửi từ trang khác bị từ chối", async ({ request }) => {
    const res = await request.post("/api/thu", {
      headers: { Accept: "application/json", Origin: "https://trang-la.example", "x-forwarded-for": diaChiMang("la") },
      form: { loai: "sach", email: "ban@vi-du.vn", "dong-y": "on" },
    });
    expect(res.status()).toBe(400);
  });

  test("biểu mẫu gửi thường (không JavaScript) được chuyển sang trang cảm ơn hoặc trang chưa gửi được", async ({
    request,
  }) => {
    const ok = await request.post("/api/thu", {
      headers: { "x-forwarded-for": diaChiMang("thuong") },
      form: { loai: "sach", email: `${dau()}@vi-du.vn`, "dong-y": "on" },
      maxRedirects: 0,
    });
    expect(ok.status()).toBe(303);
    expect(new URL(ok.headers()["location"]!).pathname).toBe("/cam-on/bao-sach");
    const loi = await request.post("/api/thu", {
      headers: { "x-forwarded-for": diaChiMang("thuong") },
      form: { loai: "hoi", topic: "q", "cau-hoi": "[loi]", "dong-y": "on" },
      maxRedirects: 0,
    });
    expect(new URL(loi.headers()["location"]!).pathname).toBe("/chua-gui-duoc");
  });
});

test.describe("Lá thư “Gửi một câu hỏi”", () => {
  test("viết, đồng ý, gửi: tới trang cảm ơn và thư đến Apps Script", async ({ page, request }) => {
    await page.setExtraHTTPHeaders({ "x-forwarded-for": diaChiMang("la-thu") });
    const d = dau();
    await page.goto("/gui-cau-hoi?chu-de=hoso");
    const form = page.locator("#askForm");
    await expect(form.getByRole("radio", { name: "Xin Hồ sơ Soi" })).toBeChecked();
    await form.getByRole("button", { name: "Gửi thư cho Khai Minh" }).click();
    await expect(page.locator("#askMsg")).toContainText("Bạn viết giúp tôi câu hỏi");
    await page.locator("#q-text").fill(`Tôi muốn hỏi ${d}`);
    await page.locator("#q-mail").fill("chua-dung");
    await form.getByRole("button", { name: "Gửi thư cho Khai Minh" }).click();
    await expect(page.locator("#askMsg")).toContainText("điền địa chỉ thư đầy đủ");
    await expect(page.locator("#q-mail")).toBeFocused();
    await page.locator("#q-mail").fill("ban@vi-du.vn");
    await form.getByRole("button", { name: "Gửi thư cho Khai Minh" }).click();
    await expect(page.locator("#askMsg")).toContainText("đánh dấu ô đồng ý");
    await page.locator("#q-ok").check();
    await form.getByRole("button", { name: "Gửi thư cho Khai Minh" }).click();
    await expect(page).toHaveURL(/\/cam-on\/la-thu$/);
    await expect(page.locator("h1")).toHaveText("Tôi đã nhận được lá thư của bạn.");
    const [goi] = await daNhan(request, d);
    expect(goi).toMatchObject({ loai: "hoi", chuDe: "Xin Hồ sơ Soi", email: "ban@vi-du.vn", dongY: true });
  });

  test("gửi không được: lời báo ấm áp, chữ đã viết vẫn còn nguyên", async ({ page }) => {
    await page.setExtraHTTPHeaders({ "x-forwarded-for": diaChiMang("la-thu-loi") });
    await page.goto("/gui-cau-hoi");
    await page.locator("#q-text").fill("[loi] Lá thư này sẽ không tới.");
    await page.locator("#q-ok").check();
    await page.getByRole("button", { name: "Gửi thư cho Khai Minh" }).click();
    await expect(page.locator("#askMsg")).toContainText("Lá thư chưa gửi được");
    await expect(page.locator("#askMsg")).toContainText("Zalo");
    await expect(page).toHaveURL(/\/gui-cau-hoi$/);
    await expect(page.locator("#q-text")).toHaveValue("[loi] Lá thư này sẽ không tới.");
  });

  test("phiếu đồng ý dẫn tới trang Dữ liệu; ô bẫy không lộ ra cho người đọc", async ({ page }) => {
    await page.goto("/gui-cau-hoi");
    await expect(page.locator(".consent").getByRole("link", { name: "trang Dữ liệu" })).toHaveAttribute(
      "href",
      "/du-lieu",
    );
    await expect(page.getByRole("textbox", { name: "Trang web của bạn" })).toHaveCount(0);
  });

  test("trình duyệt tắt JavaScript vẫn gửi được lá thư", async ({ browser, request }) => {
    const ctx = await browser.newContext({
      javaScriptEnabled: false,
      extraHTTPHeaders: { "x-forwarded-for": diaChiMang("khong-js") },
    });
    const page = await ctx.newPage();
    const d = dau();
    await page.goto("/gui-cau-hoi");
    await page.locator("#q-text").fill(`Không có JavaScript ${d}`);
    await page.locator("#q-ok").check();
    await page.getByRole("button", { name: "Gửi thư cho Khai Minh" }).click();
    await expect(page).toHaveURL(/\/cam-on\/la-thu$/);
    expect(await daNhan(request, d)).toHaveLength(1);
    await ctx.close();
  });
});

test.describe("Trang cảm ơn và trang chưa gửi được", () => {
  for (const [duong, tieuDe] of [
    ["/cam-on/la-thu", "Tôi đã nhận được lá thư của bạn."],
    ["/cam-on/thu-hang-thang", "Cảm ơn bạn đã muốn nhận thư của tôi."],
    ["/cam-on/bao-sach", "Cảm ơn bạn đã cùng tôi chờ cuốn sách."],
    ["/chua-gui-duoc", "Lá thư của bạn chưa gửi được."],
  ] as const) {
    test(`${duong}: một h1, axe 0 lỗi, không vào sitemap`, async ({ page, request }) => {
      expect((await page.goto(duong))?.status()).toBe(200);
      await expect(page.locator("main h1")).toHaveText(tieuDe);
      const kq = await new AxeBuilder({ page }).analyze();
      expect(kq.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`)).toEqual([]);
      const rong = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(rong).toBeLessThanOrEqual(0);
      expect(await (await request.get("/sitemap.xml")).text()).not.toContain(duong);
    });
  }

  test("trang cảm ơn lạ thì ra 404", async ({ request }) => {
    expect((await request.get("/cam-on/khong-co")).status()).toBe(404);
  });
});

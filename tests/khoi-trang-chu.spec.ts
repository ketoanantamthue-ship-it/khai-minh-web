import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Bài test khói cho trang chủ trống của phiên S0 (docs/06, docs/08).
 * Chạy ở hai khổ 390 và 1366 (xem playwright.config.ts).
 */

test.describe("Trang chủ trống", () => {
  test("có đầu trang, chân trang và chữ tiếng Việt", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");
    await expect(page).toHaveTitle("Khai Minh – Người Khai Vấn");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

    const dau = page.locator("header.top");
    await expect(dau.getByRole("link", { name: "Khai Minh, về trang chủ" })).toBeVisible();
    await expect(dau.getByRole("button", { name: "Bật chữ lớn, dễ đọc" })).toBeVisible();
    await expect(dau.getByRole("link", { name: "Mục lục" })).toBeVisible();

    const chan = page.locator("footer.ft");
    await expect(chan.getByText("Nếu bạn đang gặp nguy hiểm")).toBeVisible();
    await expect(chan.locator('a[href="tel:115"]')).toBeVisible();
    await expect(chan.locator("#mien-tru")).toContainText("Miễn trừ trách nhiệm");
    await expect(chan.getByRole("link", { name: "An Tâm Mệnh" })).toHaveAttribute("href", "https://antammenh.com");
    await expect(chan.getByRole("link", { name: "Khai Mệnh" })).toHaveAttribute("href", "https://khaimenh.com");

    // Quyết định F1 (docs/01): ba liên kết chân trang trỏ vào mục và trang đã chốt.
    await expect(chan.getByRole("link", { name: "Lịch sử sửa đổi Hiến chương" })).toHaveAttribute(
      "href",
      "/hien-chuong#lich-su-sua-doi",
    );
    await expect(chan.getByRole("link", { name: "Báo cáo minh bạch hằng năm" })).toHaveAttribute(
      "href",
      "/minh-bach#bao-cao",
    );
    await expect(chan.getByRole("link", { name: "Trợ năng và cách hiển thị" })).toHaveAttribute("href", "/tro-nang");
  });

  test("thanh điều hướng đủ mục ở màn hình rộng", async ({ page }, info) => {
    test.skip(info.project.name !== "may-tinh-1366", "Thanh điều hướng chữ chỉ hiện từ 960 px");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Ba cửa" });
    for (const ten of ["Chín chặng", "Cửa Tâm", "Cửa Trí", "Cửa Thân", "Gửi một câu hỏi"]) {
      await expect(nav.getByRole("link", { name: ten })).toBeVisible();
    }
  });

  test("số Ngày Mai chưa hiện khi chưa xác nhận", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href^="tel:096"]')).toHaveCount(0);
    await expect(page.getByText("096 306 1414")).toHaveCount(0);
  });

  test("không lập chỉ mục khi cờ đang tắt", async ({ page, request }) => {
    const res = await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    expect(res?.headers()["x-robots-tag"]).toContain("noindex");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toMatch(/Disallow: \/\s*$/m);
  });

  test("axe không báo lỗi nào", async ({ page }) => {
    await page.goto("/");
    const kq = await new AxeBuilder({ page }).analyze();
    expect(kq.violations, JSON.stringify(kq.violations, null, 2)).toEqual([]);
  });

  test("axe không báo lỗi ở chế độ Chữ lớn", async ({ page }) => {
    await page.goto("/");
    await page.locator("header.top .aa-btn").click();
    await expect(page.locator("html")).toHaveClass(/\beasy\b/);
    const kq = await new AxeBuilder({ page }).analyze();
    expect(kq.violations, JSON.stringify(kq.violations, null, 2)).toEqual([]);
  });

  test("không có thanh cuộn ngang", async ({ page }) => {
    await page.goto("/");
    const tran = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(tran).toBeLessThanOrEqual(0);
  });

  test('không có liên kết trỏ "#"', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
  });

  test("phông chữ tải bằng next/font", async ({ page }) => {
    await page.goto("/");
    const serif = await page.locator(".ft-name").evaluate((el) => getComputedStyle(el).fontFamily);
    const sans = await page.locator(".ft-reply").evaluate((el) => getComputedStyle(el).fontFamily);
    expect(serif).toMatch(/Noto Serif/);
    expect(sans).toMatch(/Be Vietnam Pro/);
  });

  test("Chữ lớn được nhớ sau khi tải lại, hai nút luôn khớp nhau", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer .aa-btn").click();
    await expect(page.locator("html")).toHaveClass(/\beasy\b/);
    await expect(page.locator("header.top .aa-btn")).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/\beasy\b/);
    await expect(page.locator("footer .aa-btn")).toHaveAttribute("aria-pressed", "true");

    await page.locator("header.top .aa-btn").click();
    await expect(page.locator("html")).not.toHaveClass(/\beasy\b/);
  });
});

test.describe("Khi tắt JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("chữ của đầu trang và chân trang vẫn có trong HTML", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Khai Minh, về trang chủ" })).toBeVisible();
    await expect(page.locator("footer.ft")).toContainText("Tôi không nói trước đời bạn");
    await expect(page.locator("footer.ft")).toContainText("Miễn trừ trách nhiệm");
  });
});

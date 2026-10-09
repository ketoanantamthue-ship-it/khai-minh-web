import AxeBuilder from "@axe-core/playwright";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";

/**
 * Trang chủ (phiên S1): cánh cổng, chín phần, Mục lục, Chữ lớn, chế độ tĩnh,
 * và bản đọc được khi tắt JavaScript (docs/08, mục 1).
 * Chạy ở hai khổ 390 và 1366 (xem playwright.config.ts).
 */

/** Tên và câu hỏi chính của chín chặng, đọc thẳng từ content/chang/*.mdx. */
const CHIN_CHANG = readdirSync(join(process.cwd(), "content", "chang"))
  .filter((t) => t.endsWith(".mdx"))
  .sort()
  .map((t) => {
    const s = readFileSync(join(process.cwd(), "content", "chang", t), "utf8");
    const lay = (k: string) => new RegExp(`^${k}: "(.*)"$`, "m").exec(s)?.[1] ?? "";
    return { ten: lay("ten"), cauHoi: lay("cau_hoi_chinh"), slug: lay("slug") };
  });

async function quaCong(page: Page) {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem("km-gate", "1");
    } catch {}
  });
}

const cong = (page: Page) => page.locator("#gate");

/** Chờ script của cổng chạy xong (lúc đó cổng mới nghe phím Esc và nút bấm). */
async function choCong(page: Page) {
  await expect(page.locator("#mzStage")).toHaveClass(/\bmzs-js\b/);
}

test.describe("Cánh cổng mở đầu", () => {
  test("luồng cổng: thắp đèn cho chính tôi, vào nhà, trục người hỏi chọn sẵn; lần sau không hiện", async ({
    page,
  }) => {
    test.slow();
    await page.goto("/");
    await expect(cong(page)).toBeVisible();
    await expect(page.getByRole("dialog", { name: "Bạn đã mang câu hỏi ấy một mình đủ lâu rồi." })).toBeVisible();

    await cong(page).getByRole("button", { name: "Cho chính tôi" }).click();
    await expect(cong(page).getByRole("button", { name: "Cho chính tôi" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#gWelcome")).toContainText("Mời bạn vào.");

    // Bình minh: phần tử gốc lần lượt có mzs-open, mzs-dawn rồi mzs-ready.
    await expect(cong(page)).toHaveClass(/\bmzs-dawn\b/, { timeout: 15_000 });
    await expect(cong(page)).toHaveClass(/\bmzs-ready\b/, { timeout: 15_000 });
    await expect(page.locator(".mz-l1")).toHaveText("Cánh cửa này không mở ra nhà tôi. Nó mở ra lòng bạn.");
    const vao = page.getByRole("button", { name: "Mời bạn vào nhà ›" });
    await expect(vao).toBeFocused();
    await vao.click();

    await expect(cong(page)).toHaveCount(0, { timeout: 5_000 });
    await expect(page.locator(".asker").getByRole("button", { name: "Cho chính tôi" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator("#askerNote")).toContainText("đã được thắp sáng");
    expect(await page.evaluate(() => localStorage.getItem("km-gate"))).toBe("1");

    // Lần thứ hai trên cùng máy: cổng không hiện.
    await page.reload();
    await expect(page.locator("#h1")).toBeVisible();
    await expect(cong(page)).toHaveCount(0);
  });

  test("phím Esc đóng cổng, tương đương “Vào thẳng trang”", async ({ page }) => {
    await page.goto("/");
    await expect(cong(page)).toBeVisible();
    await choCong(page);
    await expect(page.locator("main")).toHaveJSProperty("inert", true);
    await page.keyboard.press("Escape");
    await expect(cong(page)).toHaveCount(0);
    await expect(page.locator("main")).toHaveJSProperty("inert", false);
    await expect(page.locator("#h1")).toBeFocused();
    expect(await page.evaluate(() => localStorage.getItem("km-gate"))).toBe("1");
  });

  test("nút “Vào thẳng trang” luôn có", async ({ page }) => {
    await page.goto("/");
    await cong(page).getByRole("button", { name: "Vào thẳng trang" }).click();
    await expect(cong(page)).toHaveCount(0);
  });

  test("focus không ra khỏi cổng khi bấm Tab", async ({ page }) => {
    await page.goto("/");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(cong(page).getByRole("button", { name: "Cho chính tôi" })).toBeFocused();
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press("Tab");
      expect(await page.evaluate(() => !!document.activeElement?.closest("#gate"))).toBe(true);
    }
  });

  test("tiếng chuông mặc định tắt, lựa chọn được nhớ", async ({ page }) => {
    await page.goto("/");
    const nut = page.locator("#mzSound");
    await expect(nut).toHaveAttribute("aria-pressed", "false");
    await expect(nut).toHaveText("Bật tiếng chuông");
    await nut.click();
    await expect(nut).toHaveAttribute("aria-pressed", "true");
    await expect(nut).toHaveText("Tắt tiếng chuông");
    expect(await page.evaluate(() => localStorage.getItem("km-sound"))).toBe("1");
    await page.reload();
    await expect(page.locator("#mzSound")).toHaveAttribute("aria-pressed", "true");
  });

  test("“Đi thẳng tới chín chặng đời” đưa tới phần chín chặng", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await cong(page).getByRole("button", { name: "Tôi muốn xem quanh nhà trước" }).click();
    await page.getByRole("link", { name: "Đi thẳng tới chín chặng đời" }).click();
    await expect(cong(page)).toHaveCount(0);
    await expect(page.locator("#chang")).toBeInViewport();
  });

  test("axe không báo lỗi ở cánh cổng, cả lúc chào và lúc mời vào nhà", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(cong(page).getByRole("button", { name: "Cho chính tôi" })).toBeVisible();
    let kq = await new AxeBuilder({ page }).analyze();
    expect(kq.violations, JSON.stringify(kq.violations, null, 2)).toEqual([]);

    await cong(page).getByRole("button", { name: "Cho cha mẹ tôi" }).click();
    await expect(cong(page)).toHaveClass(/\bmzs-ready\b/);
    kq = await new AxeBuilder({ page }).analyze();
    expect(kq.violations, JSON.stringify(kq.violations, null, 2)).toEqual([]);
  });
});

test.describe("Chế độ tĩnh", () => {
  test.use({ reducedMotion: "reduce" });

  test("cổng ở mzs-static và không có hoạt ảnh nào chạy quá 0,01 giây", async ({ page }) => {
    await page.goto("/");
    await cong(page).getByRole("button", { name: "Cho con tôi" }).click();
    await expect(cong(page)).toHaveClass(/\bmzs-static\b/);
    await expect(cong(page)).toHaveClass(/\bmzs-ready\b/);
    const dangChay = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a.playState === "running")
        .map((a) => {
          const t = a.effect?.getComputedTiming();
          return { ten: (a as CSSAnimation).animationName ?? a.constructor.name, ms: Number(t?.duration ?? 0) };
        })
        .filter((a) => a.ms > 10),
    );
    expect(dangChay).toEqual([]);
  });

  test("trang sau cổng cũng không có hoạt ảnh chạy dài", async ({ page }) => {
    await quaCong(page);
    await page.goto("/");
    await page.waitForTimeout(300);
    const dangChay = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a.playState === "running" && Number(a.effect?.getComputedTiming().duration ?? 0) > 10)
        .map((a) => (a as CSSAnimation).animationName ?? "?"),
    );
    expect(dangChay).toEqual([]);
    // Tiểu vũ trụ xếp dọc, không có canvas chạy theo cuộn.
    await expect(page.locator("#micro")).toHaveClass(/\bstatic\b/);
  });

  test("chế độ Chữ lớn cũng làm cổng tĩnh", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.addInitScript(() => localStorage.setItem("km-easy", "1"));
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/\beasy\b/);
    await cong(page).getByRole("button", { name: "Cho chính tôi" }).click();
    await expect(cong(page)).toHaveClass(/\bmzs-static\b/);
  });
});

test.describe("Chín phần của trang chủ", () => {
  test.beforeEach(async ({ page }) => quaCong(page));

  test("đủ chín phần, đúng thứ tự", async ({ page }) => {
    await page.goto("/");
    const ids = await page.locator("main > section").evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual([
      "openSec",
      "micro",
      "ba-cua",
      "binh-minh",
      "nguoi-giu",
      "dong-hanh",
      "loi-hua",
      "khoang-lang",
      "gui-cau-hoi",
    ]);
    for (const neo of ["loi-hen", "khi-sai", ...Array.from({ length: 9 }, (_, i) => `dieu-${i + 1}`)]) {
      await expect(page.locator(`#${neo}`)).toHaveCount(1);
    }
  });

  test("chữ chín chặng có sẵn trong HTML do server dựng", async ({ request }) => {
    const html = await (await request.get("/")).text();
    for (const c of CHIN_CHANG) {
      expect(html).toContain(c.ten);
      expect(html).toContain(c.cauHoi);
    }
  });

  test("mở một chặng: chỉ thẻ của chặng ấy hiện", async ({ page }, info) => {
    await page.goto("/");
    const mayTinh = info.project.name === "may-tinh-1366";
    const nut = mayTinh
      ? page.locator("#stagesDesk").getByRole("button", { name: /^Chặng 5: Tuổi giữa đời/ })
      : page.locator("#stagesMob button").nth(4);
    await nut.click();
    const the = page.locator("#chang-tuoi-giua-doi");
    await expect(the).toBeVisible();
    await expect(the.getByRole("heading", { name: "Tuổi giữa đời" })).toBeVisible();
    await expect(page.locator("#chang-tuoi-gia")).toBeHidden();
    await expect(nut).toHaveAttribute("aria-expanded", "true");

    await the.getByRole("button", { name: "Chặng sau: Tuổi chuyển giao" }).click();
    await expect(page.locator("#chang-tuoi-chuyen-giao")).toBeVisible();
    await expect(the).toBeHidden();

    if (!mayTinh) {
      // Điện thoại: tấm trượt có nút Đóng.
      await page.locator("#sheetClose").click();
      await expect(page.locator("#panel")).not.toHaveClass(/\bopen-p\b/);
    }
  });

  test("Mục lục mở dạng lớp phủ, Esc đóng và trả focus", async ({ page }) => {
    await page.goto("/");
    const nut = page.locator("header.top").getByRole("button", { name: "Mục lục" });
    await nut.click();
    const ml = page.getByRole("dialog", { name: "Mục lục" });
    await expect(ml).toBeVisible();
    await expect(page.locator("#closeIndex")).toBeFocused();
    await expect(ml.locator("#lo button")).toHaveCount(9);
    await expect(ml.locator("#lo button").nth(4)).toHaveAttribute("aria-label", "Chặng 5: Tuổi giữa đời");

    const kq = await new AxeBuilder({ page }).analyze();
    expect(kq.violations, JSON.stringify(kq.violations, null, 2)).toEqual([]);

    await page.keyboard.press("Escape");
    await expect(ml).toBeHidden();
    await expect(nut).toBeFocused();
  });

  test("Mục lục: cửu cung mở một chặng trên trang chủ", async ({ page }) => {
    await page.goto("/");
    await page.locator("header.top").getByRole("button", { name: "Mục lục" }).click();
    const ml = page.getByRole("dialog", { name: "Mục lục" });
    await ml.locator("#ixSec1 > summary").evaluate((s) => ((s.parentElement as HTMLDetailsElement).open = true));
    await ml.getByRole("button", { name: "Chặng 8: Lúc ra đi" }).click();
    await expect(ml.locator("#ladder h3")).toHaveText("Chặng 8: Lúc ra đi");
    await ml.getByRole("button", { name: "Mở chặng này trên trang chủ" }).click();
    await expect(ml).toBeHidden();
    await expect(page.locator("#chang-luc-ra-di")).toBeVisible();
  });

  test("Ngồi lặng chín mươi giây mở và đóng được", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Ngồi lặng cùng tôi chín mươi giây" }).click();
    const lop = page.getByRole("dialog", { name: "Ngồi lặng chín mươi giây" });
    await expect(lop).toBeVisible();
    await expect(page.locator("#time")).toContainText("Còn");
    await page.keyboard.press("Escape");
    await expect(lop).toBeHidden();
  });

  test("ba cửa: gõ cửa thì phòng mở, phòng đóng thì không nhận focus", async ({ page }) => {
    await page.goto("/");
    const phong = page.locator("#room-tam");
    await expect(phong).toHaveJSProperty("inert", true);
    await page.getByRole("button", { name: "Mở cửa tâm: An Tâm Mệnh" }).click();
    await expect(phong).toHaveJSProperty("inert", false);
    await expect(phong.getByRole("link", { name: "Bắt đầu bằng bảng tự soi" })).toBeVisible();
  });

  test("liên kết có data-topic chọn sẵn chủ đề lá thư", async ({ page }) => {
    await page.goto("/");
    await page.locator('a[data-topic="md"]').first().click();
    await expect(page.locator('input[name="topic"][value="md"]')).toBeChecked();
    await expect(page.locator("#qLabel")).toHaveText("Bạn gặp người ấy ở đâu, và họ đã nói hay mời bạn mua gì");
  });

  test("axe không báo lỗi ở trang chủ", async ({ page }) => {
    await page.goto("/");
    const kq = await new AxeBuilder({ page }).analyze();
    expect(kq.violations, JSON.stringify(kq.violations, null, 2)).toEqual([]);
  });

  test("axe không báo lỗi khi một chặng đang mở", async ({ page }, info) => {
    await page.goto("/");
    const nut =
      info.project.name === "may-tinh-1366"
        ? page.locator("#stagesDesk .stage-btn").nth(2)
        : page.locator("#stagesMob button").nth(2);
    await nut.click();
    await expect(page.locator("#chang-tuoi-lon-len")).toBeVisible();
    const kq = await new AxeBuilder({ page }).analyze();
    expect(kq.violations, JSON.stringify(kq.violations, null, 2)).toEqual([]);
  });

  test('không có liên kết trỏ "#"', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
  });

  test("số Ngày Mai không hiện ở đâu khi chưa xác nhận", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href^="tel:096"]')).toHaveCount(0);
    expect(await page.locator("body").innerText()).not.toContain("096 306 1414");
  });
});

test.describe("Không có thanh cuộn ngang", () => {
  for (const [w, h] of [
    [360, 800],
    [390, 844],
    [768, 1024],
    [1280, 720],
    [1366, 768],
    [1440, 900],
  ] as const) {
    test(`khổ ${w}×${h}, cả lúc có cổng`, async ({ browser }, info) => {
      test.skip(info.project.name !== "may-tinh-1366", "Chạy một lần cho mọi khổ");
      const ctx = await browser.newContext({ viewport: { width: w, height: h } });
      const page = await ctx.newPage();
      await page.goto("/");
      const tran = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(await tran()).toBeLessThanOrEqual(0);
      await choCong(page);
      await page.keyboard.press("Escape");
      await expect(cong(page)).toHaveCount(0);
      expect(await tran()).toBeLessThanOrEqual(0);
      await ctx.close();
    });
  }
});

test.describe("Khi tắt JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("đọc được đủ tên và câu hỏi của chín chặng, cổng không che trang", async ({ page }) => {
    await page.goto("/");
    await expect(cong(page)).toBeHidden();
    for (const c of CHIN_CHANG) {
      const the = page.locator(`#chang-${c.slug}`);
      await expect(the.getByRole("heading", { name: c.ten })).toBeVisible();
      await expect(the.locator(".hand q")).toHaveText(c.cauHoi);
    }
    await expect(page.locator("#mb5 h2")).toBeVisible();
    await expect(page.locator("#room-tam p").first()).toBeVisible();
    await expect(page.locator("#h-send")).toBeVisible();
  });
});

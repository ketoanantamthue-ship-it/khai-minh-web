import AxeBuilder from "@axe-core/playwright";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";

/**
 * Phiên S2: ba trang cửa, chín trang chặng, trang Mục lục và chuyển hướng
 * /chang/1…9 (docs/06; docs/08, mục 1). Chạy ở hai khổ 390 và 1366.
 */

/** Chín chặng, đọc thẳng từ content/chang/*.mdx. */
const CHIN_CHANG = readdirSync(join(process.cwd(), "content", "chang"))
  .filter((t) => t.endsWith(".mdx"))
  .sort()
  .map((t) => {
    const s = readFileSync(join(process.cwd(), "content", "chang", t), "utf8");
    const lay = (k: string) => new RegExp(`^${k}: "(.*)"$`, "m").exec(s)?.[1] ?? "";
    const traLoi = /^tra_loi:\n((?: {2}- ".*"\n)+)/m.exec(s)?.[1] ?? "";
    return {
      so: Number(/^so: (\d)$/m.exec(s)?.[1]),
      ten: lay("ten"),
      slug: lay("slug"),
      cauHoi: lay("cau_hoi_chinh"),
      soi: lay("soi"),
      traLoi: [...traLoi.matchAll(/- "(.*)"/g)].map((m) => m[1]!),
      coTrang: /^trang:$/m.test(s),
    };
  });

const TRANG_CUA = [
  { duong: "/tam", mau: "cua-tam.html", cua: "tam", ten: "Cửa Tâm" },
  { duong: "/tri", mau: "cua-tri.html", cua: "tri", ten: "Cửa Trí" },
  { duong: "/than", mau: "cua-than.html", cua: "than", ten: "Cửa Thân" },
] as const;

const MUOI_BA_TRANG = [
  ...TRANG_CUA.map((t) => t.duong),
  ...CHIN_CHANG.map((c) => `/chang/${c.slug}`),
  "/muc-luc",
];

const chuanHoa = (s: string) => s.replace(/[\s ]+/g, " ").trim();

/** Các đoạn chữ trong <main> của một bản mẫu, mỗi đoạn là chữ giữa hai thẻ. */
function chuBanMau(tep: string): string[] {
  const html = readFileSync(join(process.cwd(), "prototypes", tep), "utf8");
  const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  return main
    .split(/<[^>]+>/)
    .map((s) => chuanHoa(s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")))
    .filter((s) => s.length >= 3 && /\p{L}/u.test(s));
}

async function chuTrongMain(page: Page): Promise<string> {
  return chuanHoa((await page.locator("main").textContent()) ?? "");
}

test.describe("Ba trang cửa", () => {
  for (const t of TRANG_CUA) {
    test(`${t.duong}: giữ nguyên mọi đoạn chữ của prototypes/${t.mau}`, async ({ page }) => {
      await page.goto(t.duong);
      const chu = await chuTrongMain(page);
      const thieu = chuBanMau(t.mau).filter((d) => !chu.includes(d));
      expect(thieu, "những đoạn chữ của bản mẫu không có trên trang").toEqual([]);
    });

    test(`${t.duong}: màu cửa, cửa đang xem và một lời mời chính`, async ({ page }, info) => {
      await page.goto(t.duong);
      const main = page.locator("main");
      await expect(main).toHaveAttribute("data-door", t.cua);
      await expect(page.locator(".dsw-c[aria-current='page']")).toHaveCount(1);
      await expect(page.locator(".dsw-c[aria-current='page']")).toContainText(`${t.ten}Bạn đang ở đây`);
      await expect(page.locator(".dsw-c")).toHaveCount(3);
      // Dấu cửa mang màu cửa, lấy từ lib/doors.ts.
      const nen = await page.locator(".dk-seal").evaluate((e) => getComputedStyle(e).backgroundColor);
      const dc = await main.evaluate((e) => getComputedStyle(e).getPropertyValue("--dc").trim());
      expect(dc).toMatch(/^#[0-9A-F]{6}$/i);
      expect(nen).not.toBe("rgba(0, 0, 0, 0)");
      if (info.project.name === "may-tinh-1366") {
        await expect(page.locator(".topnav a[aria-current='page']")).toHaveText(t.ten);
      }
      // Mỗi trang chỉ có một nút ở màn đầu.
      await expect(page.locator(".hero .btn")).toHaveCount(1);
    });
  }

  test("neo #bac-thang, #sach, #thu, #gioi-han có trên trang", async ({ page }) => {
    for (const [duong, neo] of [
      ["/tam", "bac-thang"],
      ["/tri", "sach"],
      ["/tri", "thu"],
      ["/than", "gioi-han"],
    ] as const) {
      await page.goto(`${duong}#${neo}`);
      await expect(page.locator(`#${neo}`)).toHaveCount(1);
    }
  });

  test("ô nhận thư của cửa Trí báo lỗi khi thiếu địa chỉ, cảm ơn khi đủ", async ({ page }) => {
    await page.goto("/tri");
    const o = page.locator("#thu-thang");
    await page.locator("#thu").getByRole("button", { name: "Gửi thư cho tôi mỗi tháng" }).click();
    await expect(page.locator("#thu-thang-bao")).toContainText("điền địa chỉ thư đầy đủ");
    await expect(o).toBeFocused();
    await o.fill("ban@vi-du.vn");
    await page.locator("#thu").getByRole("button", { name: "Gửi thư cho tôi mỗi tháng" }).click();
    await expect(page.locator("#thu-thang-bao")).toContainText("Lá thư đầu tiên sẽ đến hộp thư của bạn");
  });
});

test.describe("Chín trang chặng", () => {
  test("chặng 5 giữ nguyên mọi đoạn chữ của prototypes/chang-5.html", async ({ page }) => {
    await page.goto("/chang/tuoi-giua-doi");
    const chu = await chuTrongMain(page);
    const thieu = chuBanMau("chang-5.html").filter((d) => !chu.includes(d));
    expect(thieu, "những đoạn chữ của bản mẫu không có trên trang").toEqual([]);
    // Chặng 5 đã đủ chữ: không còn ô CẦN nào về chữ.
    await expect(page.locator("[data-can='C2']")).toHaveCount(0);
    await expect(page.locator(".tg-h")).toHaveCount(5);
  });

  test("chữ của chín chặng nằm sẵn trong HTML do server dựng", async ({ request }) => {
    for (const c of CHIN_CHANG) {
      const res = await request.get(`/chang/${c.slug}`);
      expect(res.status()).toBe(200);
      const html = (await res.text()).replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
      expect(html).toContain(`<h1>${c.cauHoi}</h1>`);
      expect(html).toContain(c.soi);
      if (!c.coTrang) for (const t of c.traLoi) expect(html).toContain(t);
    }
  });

  test("tám chặng còn lại: phần chưa có chữ để ô CẦN, không lộ mã việc", async ({ page }) => {
    for (const c of CHIN_CHANG.filter((x) => !x.coTrang)) {
      await page.goto(`/chang/${c.slug}`);
      await expect(page.locator("h1")).toHaveText(c.cauHoi);
      await expect(page.locator(".tg-h")).toHaveCount(5);
      // Năm tầng soi và ba cửa: mỗi chỗ một ô “Đang soạn”.
      await expect(page.locator(".o-can[data-can='C2']")).toHaveCount(8);
      await expect(page.locator(".o-can").first()).toHaveText("Đang soạn");
      const chu = await chuTrongMain(page);
      expect(chu).not.toMatch(/\bC2\b|CẦN/);
    }
  });

  test("chặng trước, chặng sau dẫn đúng trang", async ({ page }) => {
    await page.goto("/chang/tuoi-giua-doi");
    await page.getByRole("link", { name: "Chặng sau: Tuổi chuyển giao" }).click();
    await expect(page).toHaveURL(/\/chang\/tuoi-chuyen-giao$/);
    await page.getByRole("link", { name: "Chặng trước: Tuổi giữa đời" }).click();
    await expect(page).toHaveURL(/\/chang\/tuoi-giua-doi$/);
    await page.goto("/chang/truoc-khi-den");
    await expect(page.getByRole("link", { name: /^Chặng trước/ })).toHaveCount(0);
    await page.goto("/chang/sau-khi-mat");
    await expect(page.getByRole("link", { name: /^Chặng sau/ })).toHaveCount(0);
  });

  test("/chang/1 … /chang/9 chuyển hướng 301 về slug", async ({ request }) => {
    for (const c of CHIN_CHANG) {
      const res = await request.get(`/chang/${c.so}`, { maxRedirects: 0 });
      expect(res.status()).toBe(301);
      expect(new URL(res.headers()["location"]!, "http://x").pathname).toBe(`/chang/${c.slug}`);
    }
    expect((await request.get("/chang/10", { maxRedirects: 0 })).status()).toBe(404);
  });
});

test.describe("Trang Mục lục", () => {
  test("bốn lớp luôn mở, chọn một cung thì hiện thang của chặng ấy", async ({ page }) => {
    await page.goto("/muc-luc");
    await expect(page.locator("h1")).toHaveText("Mục lục");
    await expect(page.locator("main h2.ix-sum")).toHaveCount(4);
    await expect(page.locator(".lo a")).toHaveCount(9);
    // Mặc định: chặng 5 ở trung cung.
    await expect(page.locator(".ladder:visible")).toHaveCount(1);
    await expect(page.locator(".ladder:visible h3")).toHaveText("Chặng 5: Tuổi giữa đời");
    await page.getByRole("link", { name: "Chặng 3: Tuổi lớn lên" }).click();
    await expect(page.locator(".ladder:visible h3")).toHaveText("Chặng 3: Tuổi lớn lên");
    await expect(page.getByRole("link", { name: "Chặng 3: Tuổi lớn lên" })).toHaveAttribute("aria-current", "true");
    await page.getByRole("link", { name: "Đọc trọn chặng Tuổi lớn lên ›" }).click();
    await expect(page).toHaveURL(/\/chang\/tuoi-lon-len$/);
  });

  test("mở thẳng /muc-luc#thang-8 thì chọn sẵn chặng 8", async ({ page }) => {
    await page.goto("/muc-luc#thang-8");
    await expect(page.locator(".ladder:visible h3")).toHaveText("Chặng 8: Lúc ra đi");
  });

  test("đầu trang ở trang khác dẫn tới /muc-luc", async ({ page }) => {
    await page.goto("/tam");
    await page.locator("#openIndex").click();
    await expect(page).toHaveURL(/\/muc-luc$/);
  });
});

test.describe("Khi tắt JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("Mục lục hiện đủ chín thang sáu tầng", async ({ page }) => {
    await page.goto("/muc-luc");
    await expect(page.locator(".ladder:visible")).toHaveCount(9);
    for (const c of CHIN_CHANG) await expect(page.getByText(`“${c.cauHoi}”`)).toBeVisible();
  });

  test("trang cửa và trang chặng đọc được đủ chữ", async ({ page }) => {
    await page.goto("/tam");
    await expect(page.getByText("Có sáu điều tôi đã nguyện sẽ không bao giờ làm.")).toBeVisible();
    await page.goto("/chang/tuoi-giua-doi");
    await expect(page.getByText("5. Một thực tập nhỏ cho tối nay")).toBeVisible();
  });
});

test.describe("Chung cho 13 trang mới", () => {
  for (const duong of MUOI_BA_TRANG) {
    test(`${duong}: axe 0 lỗi, không cuộn ngang, không có liên kết "#"`, async ({ page }) => {
      await page.goto(duong);
      await expect(page.locator("main h1")).toHaveCount(1);
      const kq = await new AxeBuilder({ page }).analyze();
      expect(kq.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`)).toEqual([]);
      const rong = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(rong).toBeLessThanOrEqual(0);
      await expect(page.locator('a[href="#"]')).toHaveCount(0);
    });
  }

  test("axe 0 lỗi ở chế độ Chữ lớn", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem("km-easy", "1");
      } catch {}
    });
    for (const duong of ["/tam", "/chang/tuoi-giua-doi", "/chang/luc-ra-di", "/muc-luc"]) {
      await page.goto(duong);
      await expect(page.locator("html")).toHaveClass(/\beasy\b/);
      const kq = await new AxeBuilder({ page }).analyze();
      expect(kq.violations.map((v) => `${duong} ${v.id}`)).toEqual([]);
    }
  });

  test("chế độ tĩnh: viền khảm hiện ngay, lớp sơn ngưỡng bình minh không vẽ", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/than");
    await expect(page.locator(".card").first()).toHaveClass(/\binlaid\b/);
    await expect(page.locator("#dawnCover")).toBeHidden();
    await ctx.close();
  });

  test("mọi liên kết nội bộ mở được", async ({ page, request }, info) => {
    test.skip(info.project.name !== "may-tinh-1366", "chỉ cần chạy một lần");
    test.slow();
    const daKiem = new Map<string, number>();
    const loi: string[] = [];
    for (const duong of ["/", ...MUOI_BA_TRANG]) {
      await page.goto(duong);
      const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")!));
      for (const href of hrefs) {
        if (!href.startsWith("/")) continue;
        const [duongDan, neo] = href.split("#") as [string, string | undefined];
        if (!daKiem.has(duongDan)) daKiem.set(duongDan, (await request.get(duongDan)).status());
        if (daKiem.get(duongDan) !== 200) loi.push(`${duong} → ${href} (${daKiem.get(duongDan)})`);
        if (neo) {
          const html = await (await request.get(duongDan)).text();
          if (!html.includes(`id="${neo}"`)) loi.push(`${duong} → ${href} (không có neo)`);
        }
      }
    }
    expect(loi).toEqual([]);
  });
});

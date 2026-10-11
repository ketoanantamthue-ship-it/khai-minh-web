import AxeBuilder from "@axe-core/playwright";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type APIRequestContext } from "@playwright/test";
import { TRANG_CHUA_DU_CHU } from "../lib/seo";

/**
 * Phiên S4: các trang còn lại (docs/02, mục 3; docs/06; docs/08, mục 1).
 * Từ phiên này không còn liên kết nội bộ nào được phép ra 404.
 */

const TRANG_S4 = [
  "/khai-minh",
  "/cach-toi-dong-hanh",
  "/noi-chuyen",
  "/sach",
  "/tu-sach",
  "/ngoi-lang",
  "/hien-chuong",
  "/bao-chi",
  "/minh-bach",
  "/du-lieu",
  "/tro-nang",
  "/gui-cau-hoi",
  "/dieu-khoan",
  "/bao-mat",
  "/cookie",
  "/mien-tru",
];

/** Chín trang chặng, slug đọc từ content/chang/*.mdx. */
const TRANG_CHANG = readdirSync(join(process.cwd(), "content", "chang"))
  .filter((t) => t.endsWith(".mdx"))
  .map((t) => `/chang/${/^slug: "([^"]+)"/m.exec(readFileSync(join(process.cwd(), "content", "chang", t), "utf8"))![1]}`);

const CHINH_SACH = [
  ["/dieu-khoan", "Điều khoản sử dụng"],
  ["/bao-mat", "Chính sách bảo mật"],
  ["/cookie", "Chính sách cookie"],
  ["/mien-tru", "Miễn trừ trách nhiệm"],
] as const;

async function trangTrongSitemap(request: APIRequestContext): Promise<string[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
}

test.describe("Các trang của phiên S4", () => {
  for (const duong of TRANG_S4) {
    test(`${duong}: axe 0 lỗi, một h1, không cuộn ngang, không có liên kết "#", không lộ mã việc`, async ({ page }) => {
      const res = await page.goto(duong);
      expect(res?.status()).toBe(200);
      await expect(page.locator("main h1")).toHaveCount(1);
      const kq = await new AxeBuilder({ page }).analyze();
      expect(kq.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`)).toEqual([]);
      const rong = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(rong).toBeLessThanOrEqual(0);
      await expect(page.locator('a[href="#"]')).toHaveCount(0);
      const chu = (await page.locator("main").textContent()) ?? "";
      expect(chu).not.toMatch(/CẦN|\b[A-F]\d{1,2}\b/);
      // Mỗi trang có địa chỉ gốc của chính nó.
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(new URL(canonical!).pathname).toBe(duong);
    });
  }

  test("trang S4 đủ chữ nằm trong sitemap; trang khung còn chờ chữ thì không (docs/10, R7)", async ({ request }) => {
    const url = await trangTrongSitemap(request);
    expect(url).toEqual(expect.arrayContaining(TRANG_S4.filter((p) => !TRANG_CHUA_DU_CHU.has(p))));
    for (const p of TRANG_CHUA_DU_CHU) expect(url, p).not.toContain(p);
  });

  test("axe 0 lỗi ở chế độ Chữ lớn", async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem("km-easy", "1");
      } catch {}
    });
    for (const duong of ["/khai-minh", "/hien-chuong", "/cach-toi-dong-hanh", "/du-lieu", "/tro-nang"]) {
      await page.goto(duong);
      const kq = await new AxeBuilder({ page }).analyze();
      expect(kq.violations.map((v) => `${duong} ${v.id}`)).toEqual([]);
    }
  });

  test("/cau-chuyen chuyển hướng 301 về trang tác giả", async ({ request }) => {
    const res = await request.get("/cau-chuyen", { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    expect(new URL(res.headers()["location"]!, "http://x").pathname).toBe("/khai-minh");
  });

  test("trang không tìm thấy: mã 404, chữ của W2, lời mời về trang chủ", async ({ page }) => {
    const res = await page.goto("/trang-nay-khong-co");
    expect(res?.status()).toBe(404);
    await expect(page.locator("main h1")).toHaveText("Trang bạn tìm không còn ở đây.");
    await expect(page.locator("main .btn")).toHaveText("Về trang chủ");
    const kq = await new AxeBuilder({ page }).analyze();
    expect(kq.violations.map((v) => v.id)).toEqual([]);
    await page.locator("main .btn").click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("trang chính sách và Dữ liệu của bạn: chỗ chữ pháp lý ghi “Đang chờ luật sư hoàn thiện”", async ({ page }) => {
    for (const [duong, ten] of CHINH_SACH) {
      await page.goto(duong);
      await expect(page.locator("main h1")).toHaveText(ten);
      await expect(page.locator("main .cho-luat-su[data-can='D3']")).toHaveText("Đang chờ luật sư hoàn thiện");
    }
    await page.goto("/du-lieu");
    await expect(page.locator("main .cho-luat-su")).toHaveCount(5);
  });

  test("neo đã chốt: #cau-chuyen, #lich-su-sua-doi, #khi-sai, #dieu-1…9, #bao-cao", async ({ page }) => {
    await page.goto("/khai-minh");
    await expect(page.locator("#cau-chuyen")).toHaveCount(1);
    await page.goto("/hien-chuong");
    for (const neo of ["lich-su-sua-doi", "khi-sai", "loi-hua", ...Array.from({ length: 9 }, (_, i) => `dieu-${i + 1}`)]) {
      await expect(page.locator(`#${neo}`)).toHaveCount(1);
    }
    await page.goto("/minh-bach");
    await expect(page.locator("#bao-cao")).toContainText("Công bố sau đợt đồng hành đầu tiên");
  });

  test("liên kết gửi thư từ trang khác mang theo chủ đề", async ({ page }) => {
    await page.goto("/cach-toi-dong-hanh");
    await page.locator('.lp-cta a[href="/gui-cau-hoi?chu-de=dong"]').click();
    await expect(page).toHaveURL(/\/gui-cau-hoi\?chu-de=dong$/);
    await expect(page.locator('input[name="topic"][value="dong"]')).toBeChecked();
  });

  test("/ngoi-lang: nút ngồi lặng mở lớp chín mươi giây, phím Esc đóng lại", async ({ page }) => {
    await page.goto("/ngoi-lang");
    await page.getByRole("button", { name: "Ngồi lặng cùng tôi chín mươi giây" }).click();
    await expect(page.locator("#breath")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#breath")).toBeHidden();
  });

  test("/khai-minh: JSON-LD ProfilePage trỏ về cùng Person của trang chủ", async ({ page }) => {
    const docDoThi = async () =>
      (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(
        (k) => JSON.parse(k)["@graph"] as Record<string, unknown>[],
      );
    await page.goto("/");
    const nguoiTrangChu = (await docDoThi()).find((n) => n["@type"] === "Person")!;
    await page.goto("/khai-minh");
    const g = await docDoThi();
    const ho = g.find((n) => n["@type"] === "ProfilePage")!;
    expect((ho.mainEntity as Record<string, unknown>)["@id"]).toBe(nguoiTrangChu["@id"]);
    expect(String(nguoiTrangChu.url)).toMatch(/\/khai-minh$/);
    expect(g.map((n) => n["@type"])).toContain("BreadcrumbList");
  });

  test("mọi liên kết nội bộ của mọi trang trong sitemap đều mở được, kể cả neo", async ({ page, request }, info) => {
    test.skip(info.project.name !== "may-tinh-1366", "chỉ cần chạy một lần");
    test.slow();
    // Trang ngoài sitemap (trang khung, trang chặng chưa đủ năm tầng) vẫn phải được duyệt.
    const trang = [
      ...new Set([...(await trangTrongSitemap(request)), ...TRANG_S4, ...TRANG_CHANG, "/trang-nay-khong-co"]),
    ];
    const trangThai = new Map<string, number>();
    const html = new Map<string, string>();
    const loi: string[] = [];
    const lay = async (duongDan: string) => {
      if (!trangThai.has(duongDan)) {
        const res = await request.get(duongDan);
        trangThai.set(duongDan, res.status());
        html.set(duongDan, await res.text());
      }
    };
    for (const duong of trang) {
      await page.goto(duong);
      const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")!));
      for (const href of new Set(hrefs)) {
        if (href.startsWith("#")) {
          if (href.length > 1 && !(await page.locator(href).count())) loi.push(`${duong} → ${href} (không có neo)`);
          continue;
        }
        if (!href.startsWith("/")) continue;
        const [duongDan, neo] = href.split("#") as [string, string | undefined];
        const goc = duongDan.split("?")[0]!;
        await lay(goc);
        if (trangThai.get(goc) !== 200) loi.push(`${duong} → ${href} (${trangThai.get(goc)})`);
        else if (neo && !html.get(goc)!.includes(`id="${neo}"`)) loi.push(`${duong} → ${href} (không có neo)`);
      }
    }
    expect(loi).toEqual([]);
  });
});

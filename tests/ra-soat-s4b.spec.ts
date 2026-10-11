import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { MO_TA_TRANG_CHU, robotsTrangMong, SO_BAI_DE_LAP_CHI_MUC, TRANG_CHUA_DU_CHU } from "../lib/seo";

/**
 * Phiên S4b: sửa theo bản rà soát trước ra mắt (docs/10, mục R2, R4–R7,
 * R11–R15 và ba việc “Thêm sau S4”).
 *
 * Bản build để chạy thử là bản xem trước, nên ô “Đang soạn” và lời báo “đã
 * nhận” vẫn hiện như cũ. Phần bản thật (ẩn ô, `noindex`, không báo đã nhận)
 * được kiểm bằng `npm run kiem:bai -- --sau-build` sau khi dựng với
 * HIEN_BAN_NHAP=false (CI), và bằng các hàm thuần ở đây.
 */

type Nut = Record<string, unknown>;

async function docDoThi(page: Page): Promise<Nut[]> {
  return (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(
    (k) => JSON.parse(k)["@graph"] as Nut[],
  );
}

test.describe("R2 · Person và Organization", () => {
  test("Person có mô tả và lĩnh vực lấy từ site.config.ts; không bịa ảnh, kênh hay nghề", async ({ page }) => {
    await page.goto("/");
    const g = await docDoThi(page);
    const nguoi = g.find((n) => n["@type"] === "Person")!;
    expect(String(nguoi.description)).toMatch(/^Khai Minh là người khai vấn/);
    expect(nguoi.knowsAbout).toEqual(["Phật học", "Cổ học", "Dưỡng sinh"]);
    // Chưa có chân dung (B2), kênh chính thức (C7), sự đồng ý công khai nghề (D2).
    expect(nguoi).not.toHaveProperty("image");
    expect(nguoi).not.toHaveProperty("sameAs");
    expect(nguoi).not.toHaveProperty("hasOccupation");
    const toChuc = g.find((n) => n["@type"] === "Organization")!;
    expect(toChuc["@id"]).toBe("https://antammenh.com/#to-chuc");
    expect(toChuc).not.toHaveProperty("logo");
  });
});

test.describe("R4 · Biểu tượng và manifest", () => {
  test("favicon, icon.svg, apple-icon, manifest đều có và đúng màu docs/03", async ({ page, request }) => {
    for (const [duong, loai] of [
      ["/favicon.ico", "image/x-icon"],
      ["/icon.svg", "image/svg+xml"],
      ["/apple-icon.png", "image/png"],
      ["/bieu-tuong/192.png", "image/png"],
      ["/bieu-tuong/512.png", "image/png"],
      ["/bieu-tuong/maskable-512.png", "image/png"],
    ] as const) {
      const res = await request.get(duong);
      expect(res.status(), duong).toBe(200);
      expect(res.headers()["content-type"], duong).toContain(loai);
    }
    const mf = await (await request.get("/manifest.webmanifest")).json();
    expect(mf.lang).toBe("vi");
    expect(mf.theme_color).toBe("#120E0B");
    expect(mf.background_color).toBe("#120E0B");
    expect(mf.icons.map((i: { purpose: string }) => i.purpose)).toContain("maskable");
    await page.goto("/chang/tuoi-giua-doi");
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveCount(1);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
    await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
  });
});

test.describe("R5, R7 · Trang mỏng để noindex, follow", () => {
  test("thẻ robots: chỉ trang mỏng, chỉ khi cờ lập chỉ mục bật", () => {
    expect(robotsTrangMong(true, true)).toEqual({ index: false, follow: true, googleBot: { index: false, follow: true } });
    expect(robotsTrangMong(false, true)).toBeUndefined();
    // Cờ tắt: theo layout (noindex, nofollow cho toàn trang).
    expect(robotsTrangMong(true, false)).toBeUndefined();
    expect(SO_BAI_DE_LAP_CHI_MUC).toBe(3);
  });

  test("trang danh sách có mô tả riêng lấy từ bản mẫu", async ({ page }) => {
    await page.goto("/hoi");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Đời người có chín chặng. Chặng nào cũng có những câu hỏi ta chỉ dám hỏi mình lúc nửa đêm.",
    );
    await page.goto("/tang/cham");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Bắt đầu nhẹ nhàng: thư hằng tháng, chuyện đạo, những bài viết ngắn.",
    );
  });

  test("sitemap bỏ trang chặng chưa đủ năm tầng, trang khung và trang danh sách ít bài", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const url = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
    expect(url).toContain("/chang/tuoi-giua-doi");
    expect(url).not.toContain("/chang/truoc-khi-den");
    for (const p of TRANG_CHUA_DU_CHU) expect(url).not.toContain(p);
    for (const p of ["/hoi", "/viet", "/thu", "/tang/hieu", "/chang/tuoi-giua-doi/hoi"]) expect(url).not.toContain(p);
    expect(url.some((p) => p.startsWith("/cua/"))).toBe(false);
  });

  test("bản xem trước vẫn hiện ô “Đang soạn” cho đội viết", async ({ page }) => {
    await page.goto("/chang/truoc-khi-den");
    expect(await page.locator("main .o-can").count()).toBeGreaterThan(0);
    await page.goto("/sach");
    await expect(page.locator("#muc-luc-du-kien .o-can")).toHaveText("Đang soạn");
  });
});

test.describe("R6 · Bài viết của mỗi cửa nằm cuối trang cửa", () => {
  test("/cua/* chuyển hướng 301 về #bai-viet của trang cửa", async ({ request }) => {
    for (const cua of ["tam", "tri", "than"]) {
      const res = await request.get(`/cua/${cua}`, { maxRedirects: 0 });
      expect(res.status()).toBe(301);
      const dich = new URL(res.headers()["location"]!, "http://x");
      expect(dich.pathname + dich.hash).toBe(`/${cua}#bai-viet`);
    }
  });

  test("/tam có mục #bai-viet với tiêu đề riêng, không trùng tiêu đề trang", async ({ page }) => {
    await page.goto("/tam");
    await expect(page.locator("#bai-viet h2")).toHaveText("Bài viết của Cửa Tâm");
    await expect(page.locator("main h1")).toHaveCount(1);
  });
});

test.describe("R14, R15 và đường dẫn nhỏ của /khai-minh", () => {
  test("trang chặng có WebPage: tác giả là Person, chủ đề là chặng", async ({ page }) => {
    await page.goto("/chang/tuoi-giua-doi");
    const g = await docDoThi(page);
    const trang = g.find((n) => n["@type"] === "WebPage")!;
    const nguoi = g.find((n) => n["@type"] === "Person")!;
    expect((trang.author as Nut)["@id"]).toBe(nguoi["@id"]);
    expect((trang.about as Nut).name).toBe("Chặng 5: Tuổi giữa đời");
    // Mọi tham chiếu @id đều trỏ tới một nút có trong khối.
    const ids = new Set(g.map((n) => n["@id"]).filter(Boolean));
    for (const r of JSON.stringify(g).match(/\{"@id":"[^"]+"\}/g) ?? []) expect(ids.has(JSON.parse(r)["@id"])).toBe(true);
  });

  test("mô tả trang chủ dưới 160 ký tự", async ({ page }) => {
    expect([...MO_TA_TRANG_CHU].length).toBeLessThan(160);
    await page.goto("/");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", MO_TA_TRANG_CHU);
  });

  test("/khai-minh: đường dẫn nhỏ và BreadcrumbList ghi “Khai Minh”, khớp tiêu đề", async ({ page }) => {
    await page.goto("/khai-minh");
    await expect(page.locator(".vun [aria-current]")).toHaveText("Khai Minh");
    await expect(page.locator("main h1")).toHaveText("Khai Minh");
    const vun = (await docDoThi(page)).find((n) => n["@type"] === "BreadcrumbList")!;
    expect((vun.itemListElement as Nut[]).map((m) => m.name)).toEqual(["Trang chủ", "Khai Minh"]);
  });
});

test.describe("R11, R13 · Trang chủ nhẹ hơn lúc mở", () => {
  test("cổng chỉ tải ảnh đêm; ảnh bình minh tải khi khách chạm cổng", async ({ page }) => {
    const anh: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("/assets/img/mo-cua-")) anh.push(new URL(r.url()).pathname);
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(anh.some((a) => a.includes("mo-cua-dem"))).toBe(true);
    expect(anh.some((a) => a.includes("mo-cua-sang"))).toBe(false);
    await page.locator(".mz-li").first().click();
    await expect(page.locator(".mz-dawn-img")).toHaveAttribute("src", /mo-cua-sang/);
  });

  test("lớp nền sơn mài và vũ trụ neo mép trên theo vh, không theo % chiều cao", () => {
    const css = readFileSync(join(process.cwd(), "styles", "trang-chu.css"), "utf8");
    expect(css).toContain(".km-tc .lacquer::before{content:\"\";position:absolute;inset:-10vh -10% -10%;");
    expect(css).toContain(".km-tc .cosmos{position:absolute;inset:-3vh -3% -3%;");
  });
});

test.describe("R12 · Dung lượng JS của trang con", () => {
  /** Ngân sách anh chốt ngày 11/10/2026 (docs/05, mục 2; docs/07, mục A19). */
  const NGAN_SACH = 160 * 1024;

  test("mỗi trang con tải dưới 160 KB JS đã nén, kể cả phần tải trước", async ({ page }, info) => {
    test.skip(info.project.name !== "may-tinh-1366", "dung lượng JS không đổi theo khổ màn hình");
    await page.addInitScript(() => {
      try {
        localStorage.setItem("km-gate", "1");
      } catch {}
    });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    const loai = new Map<string, string>();
    let tong = 0;
    cdp.on("Network.responseReceived", (e) => loai.set(e.requestId, e.type));
    cdp.on("Network.loadingFinished", (e) => {
      if (loai.get(e.requestId) === "Script") tong += e.encodedDataLength;
    });
    const ketQua: string[] = [];
    for (const duong of ["/chang/tuoi-giua-doi", "/tam", "/khai-minh", "/hoi", "/muc-luc", "/sach"]) {
      tong = 0;
      await page.goto(duong, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      ketQua.push(`${duong}: ${(tong / 1024).toFixed(1)} KB`);
      expect(tong, ketQua.at(-1)).toBeGreaterThan(0);
      expect(tong, ketQua.at(-1)).toBeLessThan(NGAN_SACH);
    }
    info.annotations.push({ type: "JS đã nén", description: ketQua.join(" · ") });
  });
});

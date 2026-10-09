import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { baiCongKhai, baiHienThi, BUOC_HOI, demChu, docKho } from "../lib/noi-dung";

/**
 * Phiên S3: kho bài, trang nhãn, SEO (docs/06; docs/08, mục 1).
 *
 * Bản build để chạy thử là bản xem trước (HIEN_BAN_NHAP mặc định bật ngoài
 * production), nên bài mẫu Q001 ở trạng thái `ban-nhap` có trang và mang dải
 * “Bản nháp”. Việc production không dựng bài nháp được kiểm bằng các hàm của
 * lib/noi-dung.ts ở đây, và bằng `npm run kiem:bai -- --sau-build` trong CI.
 */

const Q001 = "/hoi/bon-muoi-tuoi-du-day-sao-long-chua-yen";
const TIEU_DE_Q001 = "Bốn mươi tuổi, đủ đầy cả rồi, sao lòng vẫn chưa yên?";
const FIX = join(process.cwd(), "tests", "fixtures");

const TRANG_MOI = [
  "/hoi",
  Q001,
  "/viet",
  "/thu",
  "/phuong-phap/soi-thau-chuyen",
  "/chang/tuoi-giua-doi/hoi",
  "/chang/truoc-khi-den/hoi",
  ...["cham", "hieu", "soi", "chuyen", "dong-hanh", "tot-nghiep"].map((t) => `/tang/${t}`),
  ...["tam", "tri", "than"].map((c) => `/cua/${c}`),
];

/** Route của các phiên sau: liên kết tới đây được phép chưa chạy (docs/06). */
const CHO_PHIEN_SAU = [
  "/gui-cau-hoi",
  "/hien-chuong",
  "/ngoi-lang",
  "/khai-minh",
  "/bao-chi",
  "/minh-bach",
  "/du-lieu",
  "/dieu-khoan",
  "/bao-mat",
  "/cookie",
  "/tro-nang",
];

type Nut = Record<string, unknown>;

async function docJsonLd(page: Page): Promise<Nut[]> {
  const khoi = await page.locator('script[type="application/ld+json"]').allTextContents();
  return khoi.flatMap((k) => {
    const d = JSON.parse(k) as Nut;
    expect(d["@context"]).toBe("https://schema.org");
    return d["@graph"] as Nut[];
  });
}

test.describe("Schema và trạng thái bài (lib/noi-dung.ts)", () => {
  test("kho thật: bài mẫu Q001 là bản nháp, không công khai", () => {
    const kho = docKho();
    const q = kho.find((b) => b.duongDan === Q001);
    expect(q?.trangThai).toBe("ban-nhap");
    expect(q?.loai === "hoi" && q.fm.ma_cau_hoi).toBe("Q001");
    expect(baiHienThi(false).map((b) => b.duongDan)).not.toContain(Q001);
    expect(baiHienThi(true).map((b) => b.duongDan)).toContain(Q001);
    expect(baiCongKhai().some((b) => b.trangThai !== "da-dang")).toBe(false);
  });

  test("bài mẫu Q001 theo khuôn chín bước và chỉ dùng chữ của chặng 5", () => {
    const q = docKho().find((b) => b.duongDan === Q001)!;
    if (q.loai !== "hoi") throw new Error("Q001 phải là bài hỏi – đáp");
    expect(q.tieuDe).toBe(TIEU_DE_Q001);
    const n = demChu(q.fm.tra_loi_ngan ?? "");
    expect(n).toBeGreaterThanOrEqual(40);
    expect(n).toBeLessThanOrEqual(60);
    // Bốn bước trong thân bài đủ và đúng thứ tự.
    expect(q.thieu.filter((t) => t.startsWith("bước"))).toEqual([]);

    // Mọi câu khách đọc được đều có sẵn trong tệp chặng 5.
    const chang5 = readFileSync(join(process.cwd(), "content", "chang", "05-tuoi-giua-doi.mdx"), "utf8");
    const than = q.than
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      .replace(/<[^>]+>/g, "\n")
      .split("\n")
      .map((d) => d.replace(/^(##|\d+\.)\s+/, "").trim())
      .filter((d) => d && !(BUOC_HOI as readonly string[]).includes(d));
    const cau = [q.fm.tinh_canh!, q.fm.tra_loi_ngan!, ...than].flatMap((d) => d.match(/[^.?!]+[.?!]/g) ?? [d]);
    const ngoai = cau.map((c) => c.trim()).filter((c) => !chang5.includes(c));
    expect(ngoai, "câu không có trong chặng 5").toEqual([]);
  });

  test("production chỉ có bài da-dang; bản xem trước có mọi bài; tệp “_” không thành trang", () => {
    const thu = join(FIX, "kho-dung");
    expect(docKho(thu).map((b) => b.duongDan).sort()).toEqual(["/hoi/cau-hoi-thu", "/tu-dien/muc-thu"]);
    expect(baiHienThi(false, thu).map((b) => b.duongDan)).toEqual(["/hoi/cau-hoi-thu"]);
    expect(baiHienThi(true, thu)).toHaveLength(2);
    expect(baiCongKhai(thu).map((b) => b.duongDan)).toEqual(["/hoi/cau-hoi-thu"]);
    const da = docKho(thu).find((b) => b.slug === "cau-hoi-thu")!;
    expect(da.thieu).toEqual([]);
    expect(da.ngayCapNhat).toBe("2027-01-02");
  });

  test("thiếu một nhãn thì không build được", () => {
    expect(() => docKho(join(FIX, "kho-thieu-nhan"))).toThrow(/thieu-cua\.mdx[\s\S]*cua/);
  });

  test("bài da-dang còn dấu CẦN hay thiếu phần thì không build được", () => {
    expect(() => docKho(join(FIX, "kho-dang-thieu"))).toThrow(/da-dang[\s\S]*người soát[\s\S]*dấu CẦN/);
  });

  test("slug phải trùng tên tệp", () => {
    expect(() => docKho(join(FIX, "kho-sai-slug"))).toThrow(/slug “slug-khac” phải trùng tên tệp/);
  });
});

test.describe("Trang hỏi – đáp mẫu Q001 (bản xem trước)", () => {
  test("đủ chín bước, có dải Bản nháp, không lộ ghi chú nội bộ", async ({ page }) => {
    await page.goto(Q001);
    await expect(page.locator("main h1")).toHaveText(TIEU_DE_Q001);
    await expect(page.locator(".dai-nhap")).toContainText("Bản nháp");
    await expect(page.locator(".hero .soi")).toContainText("Có những tối bạn ngồi lại trong xe");
    await expect(page.locator(".tl-ngan")).toContainText("Nó cần được nhìn cho rõ, từng lớp một.");
    const h2 = await page.locator("main h2").allTextContents();
    expect(h2.slice(0, 4)).toEqual([...BUOC_HOI]);
    expect(h2).toContain("Những câu hỏi khác người ta hay mang ở chặng này");
    expect(h2).toContain("Tác giả và nguồn");
    await expect(page.locator(".bai-tg")).toContainText("Người Khai Vấn (Khai Minh)");
    await expect(page.locator(".bai-tg")).toContainText("Kinh Thiện Sinh, Trường Bộ 31 (diễn ý)");
    await expect(page.locator(".bai-than .quote cite")).toHaveText("Diễn ý Kinh Thiện Sinh, Trường Bộ 31");
    await expect(page.locator(".bai-than .o-can[data-can='C1']")).toHaveCount(4);
    const chu = (await page.locator("main").textContent()) ?? "";
    expect(chu).not.toMatch(/CẦN|ghi_chu|Bài mẫu S3/);
    // Một lời mời chính, ở cuối trang.
    await expect(page.locator("main .btn")).toHaveCount(1);
  });

  test("chữ nằm sẵn trong HTML do server dựng (không cần JavaScript)", async ({ request }) => {
    const html = (await (await request.get(Q001)).text()).replace(/&quot;/g, '"');
    expect(html).toContain(`<h1>${TIEU_DE_Q001}</h1>`);
    expect(html).toContain("Khoảng trống ở giữa đời không cần lấp ngay.");
    expect(html).toContain("Diễn ý Kinh Thiện Sinh, Trường Bộ 31");
  });

  test("trang nhãn liệt kê bài theo chặng, tầng và cửa", async ({ page }) => {
    for (const duong of ["/chang/tuoi-giua-doi/hoi", "/tang/hieu", "/cua/tam", "/hoi"]) {
      await page.goto(duong);
      await page.locator(`main a[href="${Q001}"]`).first().click();
      await expect(page).toHaveURL(new RegExp(`${Q001}$`));
    }
    // Tầng chưa có bài: ô “Đang soạn”.
    await page.goto("/tang/cham");
    await expect(page.locator("main h1")).toHaveText("Bắt đầu nhẹ nhàng");
    await expect(page.locator("main .o-can")).toHaveText("Đang soạn");
  });
});

test.describe("SEO: metadata, JSON-LD, sitemap, robots, ảnh chia sẻ", () => {
  test("canonical và ảnh OG trên mọi trang mới", async ({ page, request }) => {
    for (const duong of ["/", "/chang/tuoi-giua-doi", ...TRANG_MOI]) {
      await page.goto(duong);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(new URL(canonical!).pathname, duong).toBe(duong);
      await expect(page.locator('meta[name="description"]').or(page.locator("title")).first()).toBeAttached();
      const og = await page.locator('meta[property="og:image"]').getAttribute("content");
      const anh = await request.get(new URL(og!).pathname + new URL(og!).search);
      expect(anh.status(), `${duong} → ${og}`).toBe(200);
      expect(anh.headers()["content-type"]).toBe("image/png");
    }
  });

  test("JSON-LD hợp lệ: Person, Organization, WebSite ở trang chủ", async ({ page }) => {
    await page.goto("/");
    const g = await docJsonLd(page);
    const loai = g.map((n) => n["@type"]);
    expect(loai).toEqual(expect.arrayContaining(["WebSite", "Person", "Organization"]));
    const nguoi = g.find((n) => n["@type"] === "Person")!;
    expect(nguoi.name).toBe("Khai Minh");
    expect(String(nguoi["@id"])).toMatch(/\/khai-minh#nguoi$/);
  });

  test("JSON-LD hợp lệ: Article và BreadcrumbList khớp chữ trên trang", async ({ page }) => {
    await page.goto(Q001);
    const g = await docJsonLd(page);
    const bai = g.find((n) => n["@type"] === "Article")!;
    expect(bai.headline).toBe(await page.locator("main h1").textContent());
    expect(bai.datePublished).toBe("2026-10-09");
    expect((bai.author as Nut)["@id"]).toBe(g.find((n) => n["@type"] === "Person")!["@id"]);
    // Mọi tham chiếu @id đều trỏ tới một nút có trong khối.
    const ids = new Set(g.map((n) => n["@id"]).filter(Boolean));
    const thamChieu = JSON.stringify(g).match(/\{"@id":"[^"]+"\}/g) ?? [];
    for (const r of thamChieu) expect(ids.has(JSON.parse(r)["@id"])).toBe(true);

    const vun = g.find((n) => n["@type"] === "BreadcrumbList")!;
    const muc = vun.itemListElement as Nut[];
    const chu = await page.locator(".vun li").allTextContents();
    expect(muc.map((m) => m.name)).toEqual(chu);
    expect(muc.map((m) => m.position)).toEqual(chu.map((_, i) => i + 1));
    expect(muc.every((m) => /^https?:\/\//.test(String(m.item)))).toBe(true);
  });

  test("sitemap chỉ có trang công khai và bài da-dang", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const url = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
    expect(url).toEqual(expect.arrayContaining(["/", "/tam", "/tri", "/than", "/muc-luc", "/chang/tuoi-giua-doi"]));
    expect(url).not.toContain(Q001);
    expect(url).not.toContain("/phuong-phap/soi-thau-chuyen");
    const congKhai = new Set(baiCongKhai().map((b) => b.duongDan));
    for (const b of docKho()) expect(url.includes(b.duongDan)).toBe(congKhai.has(b.duongDan));
  });

  test("robots chặn mọi máy đọc khi cờ lập chỉ mục tắt", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/User-Agent: \*\s*Disallow: \//i);
  });
});

test.describe("Chung cho các trang mới của S3", () => {
  for (const duong of TRANG_MOI) {
    test(`${duong}: axe 0 lỗi, một h1, không cuộn ngang, không có liên kết "#"`, async ({ page }) => {
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
    for (const duong of [Q001, "/hoi", "/cua/tri"]) {
      await page.goto(duong);
      const kq = await new AxeBuilder({ page }).analyze();
      expect(kq.violations.map((v) => `${duong} ${v.id}`)).toEqual([]);
    }
  });

  test("mọi liên kết nội bộ mở được (trừ trang của phiên sau)", async ({ page, request }, info) => {
    test.skip(info.project.name !== "may-tinh-1366", "chỉ cần chạy một lần");
    test.slow();
    const daKiem = new Map<string, number>();
    const loi: string[] = [];
    for (const duong of TRANG_MOI) {
      await page.goto(duong);
      const hrefs = await page.$$eval("main a[href], nav.vun a[href]", (as) => as.map((a) => a.getAttribute("href")!));
      for (const href of hrefs) {
        if (!href.startsWith("/")) continue;
        const duongDan = href.split("#")[0]!;
        if (CHO_PHIEN_SAU.includes(duongDan)) continue;
        if (!daKiem.has(duongDan)) daKiem.set(duongDan, (await request.get(duongDan)).status());
        if (daKiem.get(duongDan) !== 200) loi.push(`${duong} → ${href} (${daKiem.get(duongDan)})`);
      }
    }
    expect(loi).toEqual([]);
  });
});

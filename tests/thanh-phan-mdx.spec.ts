import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import nextConfig from "../next.config";
import { AmThanh, Anh, BangSoiBaLop, NhanTinCay } from "../components/bai/ThanhPhanMdx";
import { VideoYouTube } from "../components/bai/VideoYouTube";
import { docKho, phutDoc, taoNeo, videoTrongThan } from "../lib/noi-dung";
import { nutVideo } from "../lib/seo";

/**
 * Các thẻ MDX của trang bài (sau S3): thiếu dữ liệu thì không hiện gì; có dữ
 * liệu thì hiện đúng, chữ nằm sẵn trong HTML. Dựng thẳng bằng React phía
 * server, không cần bài thật có video hay bản đọc.
 */

test.beforeEach(({}, info) => {
  test.skip(info.project.name !== "may-tinh-1366", "không phụ thuộc khổ màn hình, chỉ chạy một lần");
});

/** Cấu hình ảnh của web (next.config.ts), như Next truyền cho next/image lúc chạy thật. */
const CAU_HINH_ANH = { ...imageConfigDefault, ...nextConfig("phase-test").images };

function dung<P extends object>(The: ComponentType<P>, props: P): string {
  return renderToStaticMarkup(createElement(ImageConfigContext.Provider, { value: CAU_HINH_ANH }, createElement(The, props)));
}

test.describe("Thẻ MDX thiếu dữ liệu thì không hiện gì", () => {
  test("VideoYouTube, AmThanh, Anh, BangSoiBaLop, NhanTinCay", () => {
    expect(dung(VideoYouTube, { id: "", tieuDe: "", loiThoai: "" })).toBe("");
    expect(dung(VideoYouTube, { id: "dQw4w9WgXcQ", tieuDe: "" })).toBe("");
    expect(dung(AmThanh, { src: "", thoiLuong: "" })).toBe("");
    expect(dung(Anh, { src: "", alt: "", chuThich: "" })).toBe("");
    expect(dung(Anh, { src: "/assets/img/vu-tru.jpg", alt: "" })).toBe("");
    expect(dung(Anh, { src: "/assets/img/khong-co-tep-nay.jpg", alt: "Ảnh" })).toBe("");
    expect(dung(BangSoiBaLop, { nhanQua: "", khoaHoc: "", huyenHoc: "" })).toBe("");
    expect(dung(NhanTinCay, { chu: "" })).toBe("");
  });
});

test.describe("Thẻ MDX có dữ liệu", () => {
  test("VideoYouTube: lúc đầu chỉ có ảnh bìa, chưa nhúng trình phát; lời thoại nằm sẵn trong HTML", () => {
    const html = dung(VideoYouTube, { id: "dQw4w9WgXcQ", tieuDe: "Tiêu đề thử", loiThoai: "Đoạn một.\n\nĐoạn hai." });
    expect(html).not.toContain("<iframe");
    expect(html).not.toContain("youtube-nocookie");
    expect(html).toContain('href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"');
    expect(html).toContain("i.ytimg.com%2Fvi%2FdQw4w9WgXcQ%2Fhqdefault.jpg");
    expect(html).toContain('aria-label="Xem video: Tiêu đề thử"');
    expect(html).toContain("<details class=\"loi-thoai\"><summary>Lời thoại</summary><p>Đoạn một.</p><p>Đoạn hai.</p></details>");
  });

  test("AmThanh: “Nghe Khai Minh đọc bài này”, không tải trước", () => {
    const html = dung(AmThanh, { src: "/am-thanh/bai.mp3", thoiLuong: "8 phút" });
    expect(html).toContain("Nghe Khai Minh đọc bài này");
    expect(html).toContain("8 phút");
    expect(html).toMatch(/<audio controls="" preload="none" src="\/am-thanh\/bai.mp3">/);
  });

  test("Anh: next/image với alt tiếng Việt, kích thước đọc từ tệp", () => {
    const html = dung(Anh, { src: "/assets/img/vu-tru.jpg", alt: "Bầu trời sao", chuThich: "Chú thích" });
    expect(html).toContain('alt="Bầu trời sao"');
    expect(html).toContain('width="1600"');
    expect(html).toContain('height="1000"');
    expect(html).toContain("/_next/image?url=%2Fassets%2Fimg%2Fvu-tru.jpg");
    expect(html).toContain("<figcaption>Chú thích</figcaption>");
  });

  test("BangSoiBaLop: mỗi ô một nhãn tin cậy, ô trống bị bỏ", () => {
    const html = dung(BangSoiBaLop, {
      nhanQua: "A",
      tinCayNhanQua: "Niềm tin truyền thống",
      khoaHoc: "B",
      tinCayKhoaHoc: "Đang được nghiên cứu",
      huyenHoc: "",
    });
    expect(html.match(/class="ba-lop-o"/g)).toHaveLength(2);
    expect(html).toContain('<h3>Nhân quả</h3><p>A</p><span class="label l1">Niềm tin truyền thống</span>');
    expect(html).toContain('<h3>Khoa học</h3><p>B</p><span class="label l3">Đang được nghiên cứu</span>');
    expect(html).not.toContain("Huyền học");
  });
});

test.describe("Hàm phụ của trang bài", () => {
  test("neo tiêu đề không dấu", () => {
    expect(taoNeo("Khoa học nói gì")).toBe("khoa-hoc-noi-gi");
    expect(taoNeo("Khi nào cần gặp bác sĩ, chuyên gia tâm lý hoặc luật sư")).toBe(
      "khi-nao-can-gap-bac-si-chuyen-gia-tam-ly-hoac-luat-su",
    );
    expect(taoNeo("Đời sống")).toBe("doi-song");
  });

  test("video trong thân bài: bỏ qua thẻ nằm trong chú thích", () => {
    const than = '<VideoYouTube id="aaaaaaaaaaa" tieuDe="Một" />\n{/* <VideoYouTube id="bbbbbbbbbbb" tieuDe="Hai" /> */}';
    expect(videoTrongThan(than)).toEqual([{ id: "aaaaaaaaaaa", tieuDe: "Một" }]);
  });

  test("JSON-LD VideoObject", () => {
    const v = nutVideo({ id: "dQw4w9WgXcQ", tieuDe: "Tiêu đề", loiThoai: "Lời", ngayDang: "2026-10-01", thoiLuong: "PT3M" });
    expect(v).toMatchObject({
      "@type": "VideoObject",
      name: "Tiêu đề",
      description: "Lời",
      uploadDate: "2026-10-01",
      duration: "PT3M",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: ["https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"],
    });
    expect(nutVideo({ id: "dQw4w9WgXcQ", tieuDe: "Tiêu đề" })).not.toHaveProperty("uploadDate");
  });

  test("thời gian đọc: ít nhất một phút, tính 220 chữ mỗi phút", () => {
    const bai = docKho(join(process.cwd(), "tests", "fixtures", "kho-dung")).find((b) => b.slug === "cau-hoi-thu")!;
    expect(phutDoc(bai)).toBe(1);
    expect(phutDoc({ ...bai, than: "chữ ".repeat(660) })).toBe(3);
  });
});

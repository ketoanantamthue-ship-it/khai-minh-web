# Câu lệnh cho từng phiên Claude Code

Mỗi phiên, anh mở một phiên mới trên claude.ai/code, chọn kho `khai-minh-web`, rồi dán nguyên câu lệnh tương ứng. Claude Code tự đọc `CLAUDE.md`.

---

## S0 · Nền móng

```
Đọc CLAUDE.md và docs/00 đến docs/08. Làm phiên S0 theo docs/06.

1. Khởi tạo Next.js (App Router, TypeScript strict) ở thư mục gốc, giữ nguyên các thư mục docs/, prototypes/, content/, data/, prompts/.
2. Chép prototypes/assets/img sang public/assets/img.
3. Tạo styles/tokens.css từ :root trong prototypes/index.html, lib/doors.ts theo docs/03 mục 2, và site.config.ts (liên kết ngoài, số Ngày Mai kèm cờ hotlineDaXacNhan=false, cờ anhTam=true cho ảnh cổng và ảnh vũ trụ, tên miền lấy từ NEXT_PUBLIC_SITE_URL).
4. Phông bằng next/font: Noto Serif và Be Vietnam Pro, tập con vietnamese.
5. Đầu trang và chân trang dùng chung, giống hệt bản mẫu (chân trang lấy từ prototypes/cua-tam.html).
6. Cờ NEXT_PUBLIC_CHO_PHEP_LAP_CHI_MUC: khi false thì noindex toàn trang.
7. Script check:words quét từ cấm (CLAUDE.md quy tắc 5, và W2 mục 3).
8. Playwright và @axe-core/playwright, một bài test khói cho trang chủ trống.
9. GitHub Actions: lint, typecheck, build, test.

Trước khi làm, liệt kê kế hoạch ngắn bằng tiếng Việt. Xong thì mở pull request, tóm tắt bằng lời thường, và cập nhật docs/07.
```

## S1 · Trang chủ

```
Làm phiên S1 theo docs/06. Chuyển prototypes/index.html sang Next.js đúng chín phần ở docs/03 mục 4, giữ nguyên chữ và hình.

- Cánh cổng là client component theo docs/03 mục 5. Chỉ hiện lần đầu trên mỗi máy. Có chế độ tĩnh và focus trap.
- Chữ chín chặng đọc từ content/chang/*.mdx và render phía server. Hiệu ứng chỉ là lớp trang trí bên trên.
- Mục lục dạng lớp phủ, chế độ Chữ lớn, âm thanh (km-sound).
- Giữ đủ mọi phần; không bỏ phần nào.

So hình với bản mẫu ở 390, 768 và 1366. axe phải 0 lỗi. Có bài test luồng cổng như docs/08. Xong thì mở pull request.
```

## S2 · Ba cửa và chín chặng

```
Làm phiên S2 theo docs/06 và docs/02.

- /tam, /tri, /than từ prototypes/cua-*.html.
- Layout trang chặng từ prototypes/chang-5.html. Chặng 5 đủ chữ; tám chặng còn lại dùng phần seed trong content/chang/, các phần chưa có chữ để ô CẦN.
- Trang /muc-luc dạng HTML đầy đủ.
- Chuyển hướng /chang/1…9 về slug.
- Đổi mọi liên kết index.html#gui-cau-hoi thành /gui-cau-hoi.

Không tự viết chữ mới. Xong thì mở pull request.
```

## S3 · Kho nội dung và SEO

```
Làm phiên S3 theo docs/04 và docs/05.

- Schema zod cho chang, hoi, tu-dien, ngo-nhan, viet, thu.
- Route /hoi/[slug], /tu-dien/[slug], /ngo-nhan/[slug], /viet, /thu, /phuong-phap/[slug], cùng các trang lọc theo ba nhãn.
- Chỉ build bài da-dang ở production; bản xem trước hiện mọi trạng thái, kèm dải "Bản nháp".
- Metadata, canonical, sitemap, robots (cho phép bot AI khi bật cờ), JSON-LD Person, Organization, WebSite, Article, BreadcrumbList; ảnh OG.
- Tạo một bài hỏi – đáp mẫu ở trạng thái ban-nhap, theo khuôn chín bước, cho câu Q001 trong data/bang-loc-cau-hoi-noi-dau.xlsx. Chỉ dùng chữ của chặng 5 đã có; phần còn thiếu để CẦN.

Xong thì mở pull request, kèm hướng dẫn ngắn "cách thêm một bài mới" cho đội viết.
```

## S4 · Các trang còn lại

```
Làm phiên S4 theo docs/02 mục 3. Dựng khung cho mọi trang còn lại. Chữ đã có thì lấy từ bản mẫu và docs/nguon; chỗ thiếu để ô CẦN, ghi mã việc từ docs/07.

Nối hết các liên kết "#". Trang chính sách chỉ dựng khung và ghi "Đang chờ luật sư hoàn thiện" ở chỗ dành cho chữ pháp lý.

Xong thì mở pull request, kèm danh sách mọi ô CẦN còn lại.
```

## S4b · Sửa theo bản rà soát (docs/10)

```
Đọc docs/10-ra-soat-truoc-ra-mat.md. Làm các mục R2, R4, R5, R6, R7, R11, R12, R13, R14, R15. Với mỗi mục, đo lại sau khi sửa và ghi số đo vào PR.

- R2: mở rộng JSON-LD Person và Organization, lấy dữ liệu từ site.config.ts. Trường nào chưa có chất liệu thì bỏ qua, không bịa.
- R4: icon.svg, apple-icon.png, manifest.webmanifest theo hệ màu docs/03.
- R5: trang danh sách có dưới 3 bài đã đăng thì noindex, follow; viết mô tả chỉ bằng chữ đã có trong docs/nguon, chỗ thiếu để CẦN.
- R6: gộp danh sách bài của mỗi cửa vào cuối /tam, /tri, /than (mục #bai-viet), rồi chuyển hướng 301 /cua/* về đó.
- R7: ở production, ẩn khối "Đang soạn" và noindex trang chặng chưa đủ năm tầng; bản xem trước giữ nguyên.
- R11, R12, R13: đưa CLS trang chủ dưới 0,1; JS trang con dưới 100 KB nén; LCP trang chủ lần đầu dưới 2,5 giây trên 4G chậm.
- R14, R15: thêm WebPage/Article cho trang chặng; rút mô tả trang chủ dưới 160 ký tự.

Cập nhật docs/07 và docs/10 (đánh dấu xong). Xong thì mở pull request.
```

## S5 · Biểu mẫu

```
Làm phiên S5. Trước khi code, trình bày 2–3 phương án nhận thư cho form "Gửi một câu hỏi" và danh sách nhận thư, kèm chi phí và mức độ dễ dùng, rồi chờ tôi chọn (docs/07, mục A5).

Sau khi tôi chọn: kiểm tra dữ liệu, chống spam (honeypot và giới hạn tần suất), phiếu đồng ý dữ liệu theo trang /du-lieu, trang cảm ơn, thư xác nhận. Không lưu dữ liệu nhạy cảm vào log.
```

## S6 · Kiểm thử

```
Làm phiên S6: chạy đủ docs/08, sửa mọi lỗi, rồi xuất báo cáo ngắn bằng tiếng Việt, gồm những gì đạt, những gì chưa, và vì sao.
```

## S7 · Ra mắt

```
Làm phiên S7 khi tôi xác nhận đã đủ ba điều kiện ra mắt. Kiểm lại docs/07: các mục B1, D1, D3, D5 phải xong. Hướng dẫn tôi từng bước gắn tên miền, Search Console và Bing. Chỉ bật cờ lập chỉ mục khi tôi đồng ý bằng lời.
```

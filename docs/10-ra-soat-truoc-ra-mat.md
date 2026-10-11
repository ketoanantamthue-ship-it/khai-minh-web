# 10 · Rà soát toàn diện trước ra mắt (11/10/2026)

**Phạm vi rà soát:** bản dựng của nhánh S3 (PR #4) ở chế độ production, có bật cờ lập chỉ mục trên một tên miền thử. Tôi đã:
- duyệt toàn bộ liên kết nội bộ;
- đọc robots, sitemap, metadata và JSON-LD;
- đo tốc độ trên điện thoại giả lập 4G chậm, CPU chậm 4 lần;
- kiểm tra rằng bài nháp bị ẩn và rằng chốt chặn ảnh tạm hoạt động.

Mọi con số dưới đây đều đo được. Riêng **tỉ lệ sẵn sàng** là đánh giá của người rà soát.

## 1. Kết luận

**Xong S4, web chưa hoàn thành.** S4 đóng xong *khung trang*: mọi đường dẫn có trang, không còn trang 404. Phần còn lại gồm năm nhóm:
1. Các phiên S5–S7: form, kiểm thử, ra mắt.
2. Phiên **S4b** mới: sửa các lỗi kỹ thuật tìm thấy trong lần rà soát này.
3. **Nội dung**: hiện có 0 bài được đăng; tám trang chặng còn ô "Đang soạn".
4. **Chất liệu thật, liên hệ và pháp lý.**
5. **Hệ sinh thái**: nút chính của Cửa Tâm dẫn sang antammenh.com, nhưng các trang đích ở đó chưa tồn tại.

| Mảng | Sẵn sàng | Ghi chú |
| --- | --- | --- |
| Giao diện và trải nghiệm | 85% | Bám bản mẫu rất sát. Còn thiếu favicon; trang chủ bị xô lệch bố cục (CLS 0,106) |
| Cấu trúc trang | 75% → 95% sau S4 | 11 đường dẫn đang ra 404 |
| SEO kỹ thuật | 70% | Có sẵn robots, sitemap, canonical, ảnh chia sẻ, chuyển hướng 301. Trang mỏng vẫn đang cho lập chỉ mục; JS nặng |
| GEO và thực thể "Khai Minh" | 35% | Trang tác giả chưa có; dữ liệu Person còn sơ sài |
| Nội dung | 10% | 0 bài đã đăng; 8/9 trang chặng còn ô trống |
| Kết nối hệ sinh thái | 30% | Liên kết sang trang con của antammenh.com và khaimenh.com chưa có địa chỉ |
| Liên hệ, pháp lý | 15% | Email, Zalo, pháp nhân, chính sách đều còn trống |
| Đo lường | 0% | Chưa có Search Console, Bing, công cụ đếm lượt xem |
| Vận hành | 20% | Chưa có người giữ hộp thư, người soát nguồn, lịch đăng bài |

## 2. Những gì đã tốt (giữ nguyên)

- Chữ nằm sẵn trong HTML; chữ của chín chặng không phụ thuộc JavaScript.
- Mỗi trang có đúng một `h1`, có tiêu đề và mô tả riêng, có canonical, có ảnh chia sẻ 1200×630, `lang="vi"`, ảnh đều có `alt`.
- robots cho phép mọi bot (gồm GPTBot, Google-Extended, PerplexityBot, ClaudeBot) khi bật cờ, và chặn hết khi tắt cờ. Có thêm lớp chặn `X-Robots-Tag`.
- Sitemap chỉ liệt kê trang có nội dung; bài nháp không build ở production (đã thử: trang trả 404).
- **Chốt chặn ảnh tạm chạy đúng**: bật cờ lập chỉ mục khi còn ảnh Pinterest thì build báo lỗi.
- `/chang/5` chuyển hướng 301 về `/chang/tuoi-giua-doi`.
- Đo tốc độ trên điện thoại 4G chậm:
  - trang chặng và trang cửa: LCP khoảng 0,7–0,8 giây, rất tốt;
  - trang chủ khi khách đã qua cổng: 2,2 giây, đạt.

## 3. Lỗi và thiếu sót, theo mức ưu tiên

### P1: phải xong trước ra mắt

| Mã | Vấn đề | Đo được | Cách sửa | Ai làm |
| --- | --- | --- | --- | --- |
| R1 | **Trang tác giả `/khai-minh` chưa có**, trong khi dữ liệu Person trỏ tới nó | 404 | S4 dựng khung. Cần ảnh chân dung, tiểu sử chuẩn, chuyên môn kiểm chứng được (dược sĩ) | S4, anh (B2, B3, C7) |
| R2 | **Dữ liệu Person quá sơ sài** cho mục tiêu "AI nhận ra Khai Minh" | Chỉ có `name`, `jobTitle`, `url` | Thêm `image`, `description`, `sameAs` (khi có kênh), `knowsAbout` (Phật học ứng dụng, nhân quả, Tử Vi, dưỡng sinh…), `hasOccupation` (dược sĩ, khi anh đồng ý công khai). Thêm `logo` và `sameAs` cho Organization<br>**✓ Xong ở S4b:** Person có `description` (câu “Khai Minh là ai” của Bản cuối), `knowsAbout` (Phật học, Cổ học, Dưỡng sinh), `mainEntityOfPage`; Organization đọc `logo`, `sameAs` từ `site.config.ts`. Ảnh, kênh, nghề dược sĩ và logo chưa có chất liệu nên bỏ qua. | S4b, anh (C7, D2) |
| R3 | **@id của tổ chức An Tâm Mệnh phải trùng giữa hai web** | Khai Minh dùng `https://antammenh.com/#to-chuc` | antammenh-web phải khai báo cùng @id đó. Nếu không, Google hiểu thành hai tổ chức khác nhau | Phiên antammenh-web |
| R4 | **Không có favicon và biểu tượng ứng dụng** | `/favicon.ico`, `icon`, `apple-icon`, `manifest`: đều 404 | Thêm `app/icon.svg` (dấu 開明 hoặc vết mài), `apple-icon.png` 180px, `manifest.webmanifest`. Google hiện favicon cạnh kết quả tìm kiếm<br>**✓ Xong ở S4b:** `app/icon.svg` (dấu vết mài), `app/favicon.ico`, `app/apple-icon.png`, `/manifest.webmanifest` và ba ảnh PNG cho manifest; vẽ lại bằng `node scripts/ve-bieu-tuong.mjs`. | S4b |
| R5 | **Trang mỏng đang cho lập chỉ mục** | `/tang/*`, `/cua/*`, `/viet`, `/thu` chỉ có 60–75 chữ; `/hoi` và `/tang/*` không có mô tả | Đặt `noindex, follow` cho trang danh sách khi có dưới 3 bài, và tự bỏ `noindex` khi đủ bài. Viết mô tả cho mọi trang danh sách<br>**✓ Xong ở S4b:** dưới 3 bài đã đăng thì `noindex, follow` và không vào sitemap; tự mở khi đủ bài. Mô tả lấy từ bản mẫu cho `/hoi`, `/tang/*`; `/viet` còn để CẦN (C11). | S4b |
| R6 | **`/cua/tam` trùng tiêu đề với `/tam`** | Cùng tiêu đề "Cửa Tâm – An Tâm Mệnh – Khai Minh" | Đổi tiêu đề `/cua/*` thành "Bài viết của Cửa Tâm…", hoặc gộp danh sách bài vào cuối trang `/tam` rồi chuyển hướng `/cua/tam` về `/tam#bai-viet`<br>**✓ Xong ở S4b:** gộp vào mục `#bai-viet` (“Bài viết của Cửa …”) cuối trang cửa; `/cua/*` chuyển hướng 301. | S4b, khuyên gộp |
| R7 | **Trang chặng còn ô "Đang soạn" hiện cho khách** | 8/9 trang, mỗi trang 6–7 ô | Ở production: ẩn khối chưa có chữ, và đặt `noindex` cho trang chặng chưa đủ 5 tầng. Bản xem trước giữ nguyên để đội viết thấy<br>**✓ Xong ở S4b:** bản thật không dựng ô “Đang soạn”, tầng chưa có chữ bỏ cả tiêu đề; trang chặng chưa đủ năm tầng để `noindex, follow`, không vào sitemap. Bản xem trước giữ nguyên. | S4b |
| R8 | **Nút chính của Cửa Tâm không dẫn đi đâu** | "Bắt đầu bảng tự soi" có url `null` (A6) | antammenh-web phải có trang bảng tự soi trước. Nếu chưa có thì tạm đổi lời mời chính thành "Gửi một câu hỏi" | Anh quyết (A6) |
| R9 | **Form chưa gửi được thư**; email, Zalo, pháp nhân đều trống | `lienHe.*` = `null` | S5, cùng D1 | S5, anh |
| R10 | **Chính sách dữ liệu cá nhân** | Form thu tên, email, câu hỏi tâm sự | Luật sư xác nhận yêu cầu của Luật Bảo vệ dữ liệu cá nhân (theo hiểu biết của tôi, có hiệu lực từ 01/01/2026) và Nghị định 13/2023. Viết chữ cho `/du-lieu` và `/bao-mat`. Hỏi luật sư luôn việc web có cần thủ tục gì với cơ quan quản lý không | Anh, luật sư |

### P2: nên xong trước ra mắt

| Mã | Vấn đề | Đo được | Cách sửa | Ai làm |
| --- | --- | --- | --- | --- |
| R11 | **Trang chủ xô lệch bố cục** khi tải | CLS 0,106 (ngưỡng tốt là 0,1) | Giữ chỗ cố định cho ảnh nền, khối chín chặng, phông; tìm phần tử gây xô bằng PerformanceObserver<br>**✓ Xong ở S4b:** CLS 0,027 (xem mục 6). | S4b |
| R12 | **JavaScript nặng ở mọi trang** | Trang chặng tải 176 KB JS (đã nén), ngân sách là 100 KB | Hiệu ứng trang chủ (sao, đom đóm, mài sơn, cổng) chỉ tải ở trang chủ; trang con không kéo theo. Dùng `next/dynamic` và kiểm tra lại `layout.tsx`<br>**✓ Xong ở S4b:** trang con còn 145–151 KB; riêng khung React/Next đã là 137 KB (xem mục 6). Anh chốt nâng ngân sách lên 160 KB (docs/05, mục 2); có bài kiểm thử tự động. | S4b, S6 |
| R13 | Trang chủ lần đầu (có cổng): LCP 3,3 giây trên 4G chậm | Ngưỡng 2,5 giây | Preload đúng một ảnh cổng theo khổ màn hình; hạ chất lượng WebP bản 720; trì hoãn canvas sao tới khi khách đã qua cổng<br>**✓ Xong ở S4b:** LCP lần đầu 1,2 giây (xem mục 6). | S4b |
| R14 | Trang chặng mới có BreadcrumbList | Không có dữ liệu nói "trang này là gì, của ai" | Thêm `WebPage` hoặc `Article` kèm `author` là Person và `about` là chủ đề chặng<br>**✓ Xong ở S4b:** `WebPage` có `author`, `about` (tên chặng và độ tuổi), `breadcrumb`. | S4b |
| R15 | Mô tả trang chủ 168 ký tự | Google cắt ở khoảng 155–160 | Rút gọn<br>**✓ Xong ở S4b:** 140 ký tự. | S4b |
| R16 | Chưa có công cụ đo | — | Search Console, Bing Webmaster, Vercel Web Analytics (không dùng cookie, nên không cần bảng hỏi cookie) | S7 |
| R17 | Gói Vercel Hobby chỉ dành cho mục đích không thương mại | — | Chuyển sang Pro khi ra mắt | Anh |
| R18 | Email theo tên miền và thư gửi đi | Chưa có tên miền | Khi có tên miền: tạo hộp thư như `thu@<tên-miền>`, cấu hình SPF, DKIM, DMARC để thư hằng tháng không vào thư rác | Anh, S5 |

### P3: làm sau ra mắt

- **R19.** Thêm `OAI-SearchBot` và `ChatGPT-User` vào robots cho rõ ràng; hiện đã được phép qua `User-Agent: *`.
- **R20.** Bỏ dòng `Host:` trong robots.txt. Chỉ Yandex dùng dòng này, nó vô hại nhưng thừa.
- **R21.** Theo dõi lỗi và thời gian trang hoạt động, ví dụ thông báo lỗi build của Vercel kèm một dịch vụ kiểm tra trang còn sống.
- **R22.** Dọn khoảng 1.450 dòng CSS thừa chép từ bản mẫu (E19).

## 4. Nội dung: điểm nghẽn thật sự

1. **Lô đầu tiên:** 15–20 bài hỏi – đáp cho cụm chặng 5, và 15–20 bài cho cụm năm hạn, theo khuôn mười bước. Phải có người soát (F2) trước khi chuyển `da-dang`.
2. **Chữ năm tầng soi cho tám chặng** (C2), viết từ `data/truc-a/`.
3. **Trang tác giả và trang phương pháp** (C4, C7): đây là hai trang "thực thể" quan trọng nhất cho AI.
4. **Một thực thể thống nhất:** cùng một tên, một ảnh, một tiểu sử trên web, Facebook, YouTube, Zalo và bìa sách. Mọi nơi dẫn về `/khai-minh`.
5. **Ra mắt không cần đủ cả kho.** Có thể ra mắt khi có trang chủ, ba cửa, chặng 5 đầy đủ, trang tác giả, 15 bài hỏi – đáp và các trang pháp lý. Trang chưa đủ chữ để `noindex` (R7), rồi mở dần.

## 5. Thứ tự đề xuất

1. **S4**: trang còn lại, nối liên kết.
2. **S4b**: sửa R2, R4, R5, R6, R7, R11–R15 (câu lệnh ở `prompts/cac-cau-lenh-theo-phien.md`). **Đã làm**, kết quả ở mục 6.
3. **Song song, việc của anh:** A6 (địa chỉ trang ở antammenh.com), A9 (tên miền), C7 (tiểu sử và kênh), D1 (pháp nhân, liên hệ), D5 (gọi thử đường dây nóng), luật sư (R10), ảnh chân dung và ghi âm.
4. **Lô bài đầu tiên.**
5. **S5** (form, thư), **S6** (kiểm thử trên máy thật, Bộ thử 20 người), **S7** (ra mắt).

## 6. Kết quả phiên S4b (11/10/2026)

**Cách đo.** Bản build production (`HIEN_BAN_NHAP=false`, chạy `next start`), điện thoại 390×844, CPU chậm 4 lần, bằng lệnh `node scripts/do-toc-do.mjs`. Mỗi chỉ số đo 5 lần, lấy số giữa. Mạng chậm đo ở hai mức:
- **4G chậm của Lighthouse**: độ trễ 150 ms, 1,6 Mbps (mặc định của lệnh);
- **4G chậm khắt khe hơn**: độ trễ 562,5 ms (`DO_TRE=562.5`), gần với số của lần rà soát.

Số “trước” đo lại trên bản của nhánh chính trước phiên này, cùng máy, cùng cách đo. Số “sau” đo trên bản cuối của phiên (đã ẩn lá thư theo A18).

| Mã | Chỉ số | Ngưỡng | Trước | Sau |
| --- | --- | --- | --- | --- |
| R11 | CLS trang chủ, lần đầu (có cổng) | < 0,1 | 0,000 / **0,143** | 0,026 / **0,027** |
| R11 | CLS trang chủ, đã qua cổng | < 0,1 | 0,000 / **0,143** | 0,002 / 0,002 |
| R13 | LCP trang chủ, lần đầu (có cổng) | < 2,5 s | **4,95 s** / **6,53 s** | **1,16 s** / **2,13 s** |
| R13 | LCP trang chủ, đã qua cổng (để so) | — | 5,94 s / 3,17 s | 1,94 s / 3,30 s |
| R12 | JS đã nén, trang chặng 5 | < 160 KB (cũ: 100 KB) | 178 KB | **151 KB** |
| R12 | JS đã nén, `/tam` · `/khai-minh` · `/hoi` | < 160 KB | 176 · 177 · 172 KB | 149 · 150 · 145 KB |
| R12 | JS đã nén, trang chủ | — | 167 KB | 167 KB |

Ô có hai số: số trước là 4G chậm của Lighthouse, số sau là mức khắt khe hơn.

**R11, đã tìm ra ba nguyên nhân.**
1. Lớp nền sơn mài (`.lacquer::before`) và lớp vũ trụ (`.cosmos`) đặt mép trên bằng % chiều cao phần mở. Khi phông tải xong làm phần mở cao thêm, cả lớp nền dịch xuống. Đã đổi mép trên sang `vh`.
2. Chrome tính lại đơn vị `ch` chậm một nhịp khi phông vừa tải. Câu nghiêng dưới tiêu đề (`max-width:30ch`) thoáng xuống ba dòng rồi về hai dòng. Đã đổi bốn chỗ ở màn đầu sang `em` theo đúng chiều rộng chữ “0” của phông, nên hình không đổi.
3. Noto Serif của Google tách mỗi kiểu thành hai tệp, latin và vietnamese. Nay tự lưu mỗi kiểu thành một tệp (`app/fonts/noto-serif*.woff2`, qua `next/font/local`).

**R13.**
- Ảnh bình minh của cổng (91 KB) tải ngay lúc mở trang, và chính nó thành “ảnh lớn nhất”. Nay ảnh chỉ tải khi khách chạm vào cổng, vì bình minh chỉ bắt đầu sau khi khách chọn.
- Không tải trước phông nữa: 12 tệp phông, khoảng 190 KB, đang chiếm băng thông của ảnh đêm.
- Bầu trời sao phía sau không vẽ khi cổng còn che trang.

**R12: mức 100 KB không đạt được nếu giữ Next.js; anh đã chốt ngân sách mới 160 KB.** Đã bỏ việc trang con tải trước toàn bộ hiệu ứng trang chủ (cổng, sao, đom đóm, Mục lục), bớt được 25–27 KB mỗi trang. Phần còn lại gần như toàn là khung chạy của React và Next.js: 137 KB khi nén gzip, khoảng 117 KB khi nén brotli như Vercel. Con số này đã vượt ngân sách 100 KB trước khi có dòng mã nào của web. Thử dựng bằng webpack thay Turbopack cũng ra cùng mức, khoảng 142 KB. Muốn dưới 100 KB phải đổi hẳn cách dựng trang con. Ngày 11/10/2026 anh chọn nâng ngân sách lên 160 KB đã nén (docs/05, mục 2; docs/07, mục A19). Bài kiểm thử `tests/ra-soat-s4b.spec.ts` đo sáu trang con mỗi lần chạy CI.

**Ngoài các mục R.**
- Trang khung (`/sach`, `/bao-chi`, `/tro-nang`, `/noi-chuyen`, `/ngoi-lang`, `/tu-sach`, bốn trang chính sách, và `/du-lieu`): ở bản thật không dựng các mục chỉ có ô chờ, trang để `noindex, follow` và không vào sitemap. Danh sách trang nằm ở `lib/trang-khung.ts`.
- Lá thư và các ô nhận thư: ở bản thật, khi chưa có nơi nhận thư (A5), web ẩn hẳn lá thư, các ô nhận thư và mọi lối dẫn tới chúng; `/gui-cau-hoi` để `noindex, follow`. Bản xem trước giữ nguyên. Danh sách chỗ đã ẩn ở docs/07, mục A18.
- Đường dẫn nhỏ của `/khai-minh` nay ghi “Khai Minh”, cả trong BreadcrumbList.
- CI kiểm phần bản thật bằng `npm run kiem:bai -- --sau-build`.

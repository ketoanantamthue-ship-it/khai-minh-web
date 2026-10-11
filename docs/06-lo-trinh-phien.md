# 06 · Lộ trình các phiên dựng web bằng Claude Code

Mỗi phiên kết thúc bằng một pull request mà anh xem được trên bản xem trước của Vercel. Phiên sau chỉ bắt đầu khi phiên trước đã được gộp vào nhánh chính. Câu lệnh dán vào Claude Code cho từng phiên nằm ở `prompts/cac-cau-lenh-theo-phien.md`.

Cột "Cần có trước" chỉ tới mã việc ở docs/07. Mục nào chưa có thì phiên vẫn chạy được, nhưng chỗ đó sẽ để ô `CẦN`.

| Phiên | Việc | Cần có trước | Xong khi |
| --- | --- | --- | --- |
| **S0 · Nền móng** | Khởi tạo Next.js và TypeScript. Đưa token màu, phông, map `doors.ts` và `site.config.ts` (liên kết ngoài, số Ngày Mai, cờ ảnh tạm, cờ lập chỉ mục) vào. Dựng đầu trang và chân trang dùng chung. Viết script `check:words`. Cài Playwright và axe. Dựng CI gồm lint, typecheck, build, test. Nối Vercel, để bản xem trước `noindex`. | A1 (kho mã), quyền GitHub và Vercel | Trang trống có đầu trang, chân trang giống bản mẫu; CI chạy qua; có link xem trước |
| **S1 · Trang chủ** | Chuyển `prototypes/index.html` thành các thành phần theo chín phần ở docs/03 mục 4. Cổng là client component, chỉ hiện lần đầu. Phần chín chặng đọc từ `content/chang/`, chữ render phía server. Lớp phủ Mục lục. Chế độ tĩnh, Chữ lớn, âm thanh. | — | Ảnh so sánh với bản mẫu khớp ở 3 khổ; axe 0 lỗi; khi tắt JS vẫn đọc được đủ chữ chín chặng |
| **S2 · Cửa và chặng** | Dựng `/tam`, `/tri`, `/than` từ bản mẫu. Layout trang chặng theo `chang-5.html`; dựng 9 trang `/chang/[slug]`, chặng 5 đủ chữ, tám chặng khác từ seed. Dựng `/muc-luc`. Đặt chuyển hướng `/chang/1…9`. | A2 (slug chặng) | 13 trang mới; mọi liên kết giữa các trang này chạy |
| **S3 · Kho nội dung và SEO** | Đường xử lý MDX và schema zod cho `hoi`, `tu-dien`, `ngo-nhan`, `viet`, `thu`. Trang danh sách và lọc theo ba nhãn. Lọc theo `trang_thai`. Sitemap, robots, canonical, JSON-LD, ảnh OG. Viết một bài mẫu hỏi – đáp đánh dấu `ban-nhap`, chỉ hiện trên bản xem trước. | C1 (bài thật đầu tiên) để có nội dung | Thêm một tệp MDX là có trang mới, không phải sửa code; kiểm tra JSON-LD hợp lệ |
| **S4 · Trang còn lại** | `/khai-minh`, `/cach-toi-dong-hanh`, `/noi-chuyen`, `/sach`, `/tu-sach`, `/ngoi-lang`, `/hien-chuong`, `/bao-chi`, `/minh-bach`, `/du-lieu`, `/tro-nang`, bốn trang chính sách, `/404`. Nối hết liên kết "#". | A3, A4, B2–B6, C2–C4, D1–D3 | Không còn liên kết "#"; mọi ô thiếu đều có dấu `CẦN` và được ghi vào docs/07 |
| **S4b · Sửa theo rà soát** | Các mục R2, R4–R7, R11–R15 của docs/10, cùng ba việc “Thêm sau S4” (trang khung ở bản thật, lá thư không báo đã nhận, đường dẫn nhỏ của `/khai-minh`). | — | Đo lại từng mục, ghi số đo vào PR. **Đã làm** (R12: anh nâng ngân sách JS lên 160 KB) |
| **S5 · Biểu mẫu** | Form "Gửi một câu hỏi" và form nhận thư: kiểm tra dữ liệu, chống spam, phiếu đồng ý, trang cảm ơn. Gửi tới hộp thư hoặc dịch vụ anh chọn. | A5 (nơi nhận thư), D1 | Gửi thử thành công; dữ liệu đi đúng nơi; có thư xác nhận |
| **S6 · Kiểm thử và hiệu năng** | Chạy đủ docs/08: axe, Playwright, Lighthouse, đo các chỉ số chính. Kiểm tra trên iPhone và Android thật. Sửa lỗi. | — | Đạt mọi ngưỡng ở docs/08 |
| **S7 · Ra mắt** | Gắn tên miền. Đặt chuyển hướng 301 cho bài cũ (nếu có chuyển từ WordPress). Search Console, Bing, đếm lượt xem. Bật cờ lập chỉ mục. | Ba điều kiện ra mắt; A1; B1 (ảnh có bản quyền); D1–D3 | Trang công khai, được lập chỉ mục, sitemap đã nộp |

**Ước lượng:** S0–S3 mỗi phiên khoảng một buổi làm việc với Claude Code. S4 và S5 phụ thuộc vào chất liệu anh có. Có thể làm S0–S3 ngay bây giờ, vì không phiên nào trong số đó bị chặn bởi việc pháp lý.

# 02 · Sơ đồ trang và đường dẫn

**Quy ước:** đường dẫn viết thường, không dấu, nối bằng gạch ngang. Mỗi trang có đúng một lời mời chính, là nút vàng. Mọi lối khác là liên kết chữ.

**Cột trạng thái:**
- **BM**: đã có bản mẫu trong `prototypes/`, chỉ cần chuyển sang Next.js.
- **Seed**: có chữ khởi đầu trong `content/`, cần dựng giao diện.
- **Khung**: chưa có chữ cuối; dựng khung với các ô `CẦN`.
- **Chờ**: chưa dựng, vì cần quyết định hoặc chất liệu thật (xem docs/07).

## 1. Trang khung chính

| Trang | Đường dẫn | Việc của trang | Lời mời chính | Trạng thái | Phiên |
| --- | --- | --- | --- | --- | --- |
| Trang chủ | `/` | Gặp người, chọn chặng, thấy ba cửa | Mở một chặng | BM `index.html` | S1 |
| Cửa Tâm | `/tam` | An Tâm Mệnh, bậc thang đồng hành, hai phòng Khai Mệnh – Khai Tâm | Làm bảng tự soi (dẫn sang antammenh.com) | BM `cua-tam.html` | S2 |
| Cửa Trí | `/tri` | Sách, Từ điển, Chuẩn, Tủ sách, Ngộ nhận, thư | Nhận thư hằng tháng | BM `cua-tri.html` | S2 |
| Cửa Thân | `/than` | Dưỡng sinh Trần Y Thư (Thập Bổ), chỉ có giáo dục | Đọc bài dưỡng sinh đầu tiên | BM `cua-than.html` | S2 |
| Chín trang chặng | `/chang/[slug]` | Năm tầng soi, ba cửa, sáu tầng đi sâu, câu hỏi liên quan | Bước tiếp theo đúng một tầng | Chặng 5: BM `chang-5.html`. Tám chặng còn lại: Seed | S2 |
| Mục lục | `/muc-luc` | Bốn lớp mục lục ở dạng trang HTML đầy đủ, để máy đọc được (trên trang chủ vẫn là lớp phủ) | Mở một chặng | Seed (phần `.ix-*` trong bản mẫu) | S2 |

**Slug của chín chặng** (khớp tên tệp trong `content/chang/`):

| Số | Slug | Tên |
| --- | --- | --- |
| 1 | `truoc-khi-den` | Trước khi đến |
| 2 | `nhung-nam-dau-doi` | Những năm đầu đời |
| 3 | `tuoi-lon-len` | Tuổi lớn lên |
| 4 | `tuoi-lap-than` | Tuổi lập thân |
| 5 | `tuoi-giua-doi` | Tuổi giữa đời |
| 6 | `tuoi-chuyen-giao` | Tuổi chuyển giao |
| 7 | `tuoi-gia` | Tuổi già |
| 8 | `luc-ra-di` | Lúc ra đi |
| 9 | `sau-khi-mat` | Sau khi mất |

Các đường dẫn `/chang/1` đến `/chang/9` chuyển hướng 301 về slug tương ứng.

## 2. Kho tri thức (nơi viết bài, phục vụ SEO và GEO)

| Loại trang | Đường dẫn mẫu | Người đọc tìm gì | Khuôn viết | Trạng thái | Phiên |
| --- | --- | --- | --- | --- | --- |
| Hỏi – đáp | `/hoi/bon-muoi-tuoi-thay-trong-rong` | Một câu hỏi cụ thể | Khuôn 9 bước ở docs/04, 800–1.500 chữ | Khung (chưa có bài) | S3 |
| Mục hỏi – đáp *(thêm ở S3)* | `/hoi` | Mọi câu hỏi, chia theo chín chặng, cộng bài cắt ngang | Tự sinh; câu chưa có bài là chữ thường | Khung | S3 |
| Từ điển | `/tu-dien/tam-tai` | "X là gì" | Định nghĩa trước, rồi kinh nói gì, dân gian nói gì, ngộ nhận | Khung | S3 |
| Ngộ nhận | `/ngo-nhan/not-ruoi-duoi-mat` | "Có thật không" | Sự thật trước, nguồn sau, nhãn tin cậy | Khung | S3 |
| Phương pháp | `/phuong-phap/soi-thau-chuyen` | Tên riêng của phương pháp | Trang định nghĩa gốc, có ngày công bố và phiên bản | Khung, chữ chờ anh | S3 |
| Viết (bài dài) | `/viet`, `/viet/[slug]` | Đọc theo chặng, tầng, cửa | Lọc theo ba nhãn | Khung | S3 |
| Thư hằng tháng | `/thu`, `/thu/2026-11` | Bản lưu thư | Dẫn về các trang hỏi – đáp | Khung | S3 |
| Trang nhãn | `/chang/[slug]/hoi`, `/tang/[tang]`, `/cua/[cua]` | Danh sách bài theo nhãn | Tự sinh từ frontmatter | Khung | S3 |

## 3. Các trang riêng còn lại

| Trang | Đường dẫn | Việc của trang | Lời mời chính | Trạng thái | Phiên |
| --- | --- | --- | --- | --- | --- |
| Tác giả, Câu chuyện của tôi | `/khai-minh` (và `/cau-chuyen` chuyển hướng 301 về đây) | Ai đang viết, chuyên môn kiểm chứng được, câu chuyện thật | Đọc cách tôi đồng hành | **S4: đã dựng khung.** Mục `#cau-chuyen` và `#tieu-su` chờ ghi âm (B3), ảnh chân dung (B2), tiểu sử (C7) | S4 |
| Cách tôi đồng hành | `/cach-toi-dong-hanh` | Một buổi khai vấn diễn ra thế nào, điều tôi không làm | Gửi một câu hỏi | **S4: đã dựng** (dùng phần `#dong-hanh` của trang chủ và trang Cửa Tâm) | S4 |
| Nói chuyện | `/noi-chuyen` | Video, bài nói | Nhận thư hằng tháng | **S4: đã dựng khung**, chờ video (B9) | S4 |
| Sách | `/sach` | Sách lõi và các bộ sách | Nhận tin khi sách ra | **S4: đã dựng khung** (dùng `cua-tri.html#sach`); mục lục dự kiến và đoạn trích chờ C12 | S4 |
| Tủ sách | `/tu-sach` | Ba cuốn sách gợi ý cho mỗi chặng | Nhận thư hằng tháng | **S4: đã dựng khung**, chờ danh sách sách (B7) | S4 |
| Ngồi lặng | `/ngoi-lang` | Chín mươi giây có người dẫn | Bắt đầu ngồi lặng | **S4: đã dựng** (dùng `#khoang-lang`); chờ video và giọng đọc (B5) | S4 |
| Gửi một câu hỏi | `/gui-cau-hoi` | Lời nhắn riêng, phiếu đồng ý dữ liệu | Gửi câu hỏi | **Dựng sớm ở S4** (dùng `#gui-cau-hoi`, chủ đề chọn sẵn qua `?chu-de=`); thư chưa gửi đi đâu, cần nơi nhận thư (A5, E18) | S5 |
| Hiến chương (bản trên web Khai Minh) | `/hien-chuong` | Chín điều hứa, khi tôi sai | (không có nút bán) | BM (dùng `#loi-hua`, `#dieu-1…9`, `#khi-sai`). Thêm mục `#lich-su-sua-doi` (Lịch sử sửa đổi Hiến chương). Bản gốc đầy đủ đặt ở antammenh.com. **S4: đã dựng**; lịch sử sửa đổi chờ ngày công bố (C8) | S4 |
| Báo chí và hợp tác | `/bao-chi` | Tiểu sử, ảnh tải về, chủ đề nói chuyện, nguyên tắc nhận lời | Gửi lời mời hợp tác | **S4: đã dựng khung**, chờ ảnh (B2), tiểu sử (C7), chủ đề và nguyên tắc nhận lời (C13) | S4 |
| Minh bạch lợi ích | `/minh-bach` | Các lợi ích kinh doanh của Khai Minh; mục `#bao-cao` (Báo cáo minh bạch hằng năm) ghi rõ bản đầu tiên ra sau đợt chạy thử | (không có) | **S4: đã dựng khung**, chờ quyết định cửa Thân A hay B (A3) và danh sách lợi ích (B8) | S4 |
| Dữ liệu của bạn | `/du-lieu` | Thu gì, để làm gì, quyền của bạn | (không có) | **S4: đã dựng khung**, chờ luật sư (D3) | S4 |
| Chính sách | `/dieu-khoan`, `/bao-mat`, `/cookie`, `/mien-tru` | Pháp lý | (không có) | **S4: đã dựng khung**, chờ luật sư (D3) | S4 |
| Trợ năng và cách hiển thị | `/tro-nang` | Cách dùng chế độ Chữ lớn, Bản nhẹ cho máy yếu, và cam kết về trợ năng | (không có) | **S4: đã dựng khung**, chữ hướng dẫn chờ C14 | S4 |
| Không tìm thấy | `/404` | Dẫn người đọc về | Về trang chủ | **S4: đã dựng** (`app/not-found.tsx`) | S4 |

## 4. Liên kết sang web khác (không dựng trên Khai Minh)

- **antammenh.com:** Hiến chương bản gốc, bảng tự soi, Hồ sơ Soi, Hành trình đồng hành, Trà thất, cộng đồng, chứng nhận Tổng Mệnh Học™.
- **khaimenh.com:** công cụ lá số, khoá học huyền học.

Mọi liên kết ra ngoài lấy từ `site.config.ts`. Đường dẫn trang con chính xác ở antammenh.com và khaimenh.com **chưa được chốt** (xem docs/07, mục A6).

## 5. Thanh điều hướng và chân trang

- **Thanh điều hướng**, theo bản mẫu: Chín chặng · Cửa Tâm · Cửa Trí · Cửa Thân · Gửi một câu hỏi · Aa Chữ lớn · Mục lục.
- **Chân trang** có ba cột (Khám phá · Cam kết và minh bạch · Chính sách và quyền). Trong cột thứ hai, “Lịch sử sửa đổi Hiến chương” dẫn tới `/hien-chuong#lich-su-sua-doi` và “Báo cáo minh bạch hằng năm” dẫn tới `/minh-bach#bao-cao`; trong cột thứ ba, “Trợ năng và cách hiển thị” dẫn tới `/tro-nang` (quyết định F1 ở docs/01). Chân trang còn có khối Liên hệ, khối Miễn trừ trách nhiệm, số 115 và Ngày Mai, dòng "Cùng một ngôi nhà" dẫn sang An Tâm Mệnh và Khai Mệnh.
- Bản mẫu còn khoảng 38 liên kết "#" ở trang chủ và 14–20 liên kết ở mỗi trang con. Phiên S4 phải nối hết vào các route ở bảng trên. Không để liên kết nào trỏ "#". **S4: xong.** Một bài kiểm thử duyệt mọi liên kết nội bộ (kể cả neo) của mọi trang trong sitemap. Lối nào chưa có địa chỉ thật (A6, Khai Tâm) thì giữ chữ, bỏ liên kết và mang `data-can`.
- Khối “Miễn trừ trách nhiệm” ở chân trang dẫn tới trang `/mien-tru`; “Khi tôi làm chưa đúng một điều” dẫn tới `/hien-chuong#khi-sai`.

## 6. Ánh xạ từ bản mẫu sang route

| Bản mẫu | Route | Ghi chú |
| --- | --- | --- |
| `index.html` | `/` | Chữ chín chặng chuyển từ mảng JS `S` sang `content/chang/*.mdx` (đã tách sẵn) |
| `cua-tam.html`, `cua-tri.html`, `cua-than.html` | `/tam`, `/tri`, `/than` | Neo `#bac-thang`, `#sach`, `#thu` giữ nguyên |
| `chang-5.html` | `/chang/tuoi-giua-doi` | Dùng làm khuôn cho tám chặng còn lại |
| `index.html#gui-cau-hoi` | `/gui-cau-hoi`, và vẫn giữ một khối trên trang chủ | |
| `index.html#loi-hen`, `#loi-hua`, `#khi-sai` | Các khối trên trang chủ, và `/hien-chuong` | |

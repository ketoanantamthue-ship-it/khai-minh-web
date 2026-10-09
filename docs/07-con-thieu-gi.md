# 07 · Bảng rà soát: web Khai Minh còn thiếu gì

Cập nhật ngày 09/10/2026. Claude Code cập nhật bảng này cuối mỗi phiên: ghi `[x]` khi xong và thêm chỗ thiếu mới phát hiện.

**Cách đọc bảng:**
- **Nhóm A–D và F** là việc chỉ anh hoặc đội của anh làm được.
- **Nhóm E** là việc Claude Code tự làm, đã nằm trong các phiên.
- **Cột "Chặn"** ghi phiên sẽ phải để ô trống `CẦN` nếu mục đó chưa xong.

## Tóm tắt

| Nhóm | Số mục | Mục gấp nhất |
| --- | --- | --- |
| A. Quyết định | 11 | A1 kho mã, A9 tên miền |
| B. Chất liệu thật | 10 | B1 ảnh có bản quyền, B2 chân dung, B3 ghi âm |
| C. Nội dung | 8 | C1 hiện chưa có bài nào để tìm thấy |
| D. Pháp lý | 6 | D1 pháp nhân, D3 luật sư, D5 kiểm đường dây nóng |
| E. Kỹ thuật | 10 | Đã nằm trong S0–S7 |
| F. Vận hành | 4 | F1 người giữ hộp thư |

## A. Quyết định của anh

| Mã | Việc | Chặn | Mặc định nếu anh chưa chốt |
| --- | --- | --- | --- |
| [ ] A1 | **Kho mã riêng hay chung với antammenh-web?** | S0 | Kho riêng `khai-minh-web` (docs/01, mục E1) |
| [ ] A2 | Đường dẫn chặng: có chữ hay số? | S2 | Có chữ, ví dụ `/chang/tuoi-giua-doi`; `/chang/5` chuyển hướng về đó |
| [ ] A3 | Cửa Thân và việc kinh doanh sản phẩm: A (dừng, chỉ giáo dục) hay B (giữ nhưng tách hẳn, chỉ công khai ở trang Minh bạch lợi ích) | S4 (`/minh-bach`) | Kiến trúc web không đổi; trang Minh bạch để khung |
| [ ] A4 | Xác nhận dòng danh xưng "Người khai vấn, người viết sách, và một dược sĩ", và việc người lạ chỉ cần nhớ hai tên Khai Minh và An Tâm Mệnh | S1 | Giữ như bản mẫu |
| [ ] A5 | Thư từ form "Gửi một câu hỏi" và danh sách nhận thư đi về đâu: một hộp thư, một dịch vụ gửi thư, hay một bảng tính? | S5 | Claude Code đưa ra 2–3 phương án có chi phí, anh chọn |
| [ ] A6 | Địa chỉ cụ thể các trang ở antammenh.com (bảng tự soi, Hồ sơ Soi, Trà thất, Hiến chương gốc) và khaimenh.com | S4 | Tạm trỏ về trang chủ hai web đó; antammenh-web mới còn là bản xem trước |
| [ ] A7 | Công cụ đếm lượt xem | S7 | Vercel Web Analytics vì đơn giản nhất; có thể thêm Plausible |
| [ ] A8 | Bản tiếng Anh và tiếng Trung: khi nào làm? | — | Chưa làm trong hai năm đầu. Kho nội dung có sẵn trường `lang` để thêm sau. Bản dịch phải do người dịch soát, không đăng bản máy dịch hàng loạt. |
| [ ] A9 | **Tên miền cho Khai Minh**: chọn, kiểm còn trống, mua. Đã chọn thì không đổi về sau. | S7, và canonical | Dùng biến `NEXT_PUBLIC_SITE_URL` cho tới khi có |
| [ ] A10 | Cánh cổng chỉ hiện lần đầu trên mỗi máy | S1 | Bật (docs/01, mục E7) |
| [ ] A11 | Hỏi ý một vị thầy hoặc luật sư về việc dùng hình tượng Phật trên trang thương hiệu | S7 | Giữ trong bản xem trước |

## B. Chất liệu thật

| Mã | Chất liệu | Dùng ở | Chặn |
| --- | --- | --- | --- |
| [ ] B1 | **Ảnh cánh cổng vẽ riêng** (theo brief ở `docs/nguon/dat-ve-anh-cong-va-viec-truoc-khi-len-mang.md`) và **ảnh nền vũ trụ có bản quyền**, rộng từ 2.560 px. Hai ảnh hiện tại lấy từ Pinterest, không rõ tác giả. | Cổng, màn đầu trang chủ | **S7: không ra mắt khi chưa có** |
| [ ] B2 | Ảnh chân dung khổ 4:5, ánh sáng cửa sổ, áo sáng màu | `nguoi-giu`, `/khai-minh`, `/bao-chi` | S4 |
| [ ] B3 | Bốn buổi ghi âm câu chuyện thật (bộ câu hỏi ở W2 mục 1) | `/khai-minh`, `/cach-toi-dong-hanh` | S4 |
| [ ] B4 | Chữ ký tay, quét thành SVG | Trang chủ, thư | S4 |
| [ ] B5 | Video rót trà 8–12 giây, giọng đọc chậm khoảng ba phút | `khoang-lang`, `/ngoi-lang` | S4 |
| [ ] B6 | Chín câu hỏi viết tay trên giấy dó (bản mẫu đang để "Chỗ đặt câu hỏi viết tay"); ảnh cận cảnh một tấm sơn mài thật | Trang chủ, chín trang chặng | S4 |
| [ ] B7 | Danh sách Tủ sách: ba cuốn cho mỗi chặng, tổng 27 cuốn | `/tu-sach`, trang chặng | S4 |
| [ ] B8 | Danh sách các lợi ích kinh doanh của anh | `/minh-bach` | S4 |
| [ ] B9 | Video hoặc bài nói đã có | `/noi-chuyen` | S4 |
| [ ] B10 | Thư phản hồi có đồng ý bằng văn bản | Trang chủ, Cửa Tâm | Sau chạy thử |

## C. Nội dung

| Mã | Việc | Ghi chú | Chặn |
| --- | --- | --- | --- |
| [ ] C1 | **Bài hỏi – đáp: hiện có 0 bài.** Cần 15–20 bài cho mỗi cụm thử: chặng 5 và năm hạn. | Bảng lọc mới có 9 câu gợi ý, chưa kiểm với người hỏi thật. Đây là lỗ hổng lớn nhất về tìm kiếm: web đẹp nhưng chưa có gì để được tìm thấy. | Tìm kiếm |
| [ ] C2 | Duyệt chữ seed của tám chặng (1–4, 6–9), và viết phần năm tầng soi cho tám chặng từ `data/truc-a/` | Chặng 5 đã đủ | S2 dùng seed |
| [ ] C3 | Xác nhận các chữ có ràng buộc trong bản mẫu: | Mỗi câu là một lời hứa công khai | S1, S4 |
| | • đoạn kể về quầy thuốc ở phần "Người giữ những câu hỏi" | | |
| | • các con số trong bốn lời hẹn: mười lăm phút, ba dòng nhật ký, vắng hai buổi, nhóm tám đến mười người | | |
| | • điều kiện vào Trà thất: đã qua Hồ sơ Soi | | |
| | • cam kết không nhận tiền, quà hay phong bì dưới bất kỳ tên gọi nào | | |
| | • trả lời góp ý Hiến chương trong bảy ngày | | |
| | • câu "lá thư chỉ dùng để trả lời bạn", trong khi đội vận hành cùng đọc thư | | |
| | • nguồn kinh trong Hiến chương, đối chiếu bản dịch của HT. Thích Minh Châu | | |
| [ ] C4 | Chữ cho trang định nghĩa gốc `/phuong-phap/soi-thau-chuyen`: định nghĩa, ngày công bố, phiên bản | Để AI nói "theo phương pháp của Khai Minh" | S3 |
| [ ] C5 | Tải lên `data/` các tư liệu chưa có trong gói: bản V3 với 238 niềm tin sai về cầm tướng, các bài nhân tướng (răng, bàn chân, nốt ruồi), Từ điển, ngân hàng 108 chuyện đạo | Làm Ngộ nhận và Từ điển | S3 dùng khung |
| [ ] C6 | Thang nhãn tin cậy đầy đủ của Chuẩn Chính Tín | Bản mẫu mới có hai mức | S3 |
| [ ] C7 | Tiểu sử chuẩn (một đoạn ngắn, một đoạn dài) và danh sách kênh chính thức (Facebook, YouTube, Zalo…) | Dữ liệu `Person.sameAs`, thống nhất thực thể | S3, S4 |
| [ ] C8 | Ngày hiệu lực Hiến chương; ngày bắt đầu và kết thúc "hai năm đầu không nhận tiền" | Đang để trống trong bản mẫu | S4 |

## D. Pháp lý

| Mã | Việc | Chặn |
| --- | --- | --- |
| [ ] D1 | Tên pháp nhân, mã số thuế, địa chỉ đăng ký, chủ sở hữu nhãn hiệu; email, Zalo, địa chỉ liên hệ | S4, S5, S7 |
| [ ] D2 | Có hiện số chứng chỉ hành nghề dược trên web không; nếu có thì là số nào | S4 |
| [ ] D3 | Kết luận bằng văn bản của luật sư về câu hỏi "xem lá số có bị coi là xem bói không" (anh đã làm việc ngày 04/10); số hiệu văn bản về dữ liệu cá nhân ở Điều 8; chữ cho bốn trang chính sách và trang Dữ liệu của bạn | S4, S7 |
| [ ] D4 | Hợp đồng với hoạ sĩ: chuyển giao quyền dùng cho web, in ấn và mạng xã hội, không giới hạn thời gian | S7 |
| [ ] D5 | **Đường dây nóng Ngày Mai 096 306 1414**: số này đang hiện trên bản mẫu. Đội vận hành cần gọi thử và xác nhận giờ hoạt động trước khi công bố. | S7 |
| [ ] D6 | Tình trạng đăng ký nhãn hiệu An Tâm Mệnh và Tổng Mệnh Học™; đã được dùng ký hiệu ™ hay ® chưa | S4 |

## E. Kỹ thuật (Claude Code tự làm)

| Mã | Nợ kỹ thuật của bản mẫu | Phiên |
| --- | --- | --- |
| [ ] E1 | Chữ chín chặng nằm trong mảng JS, máy tìm kiếm khó đọc. Đã tách sẵn sang `content/chang/`. | S1, S2 |
| [ ] E2 | Khoảng 38 liên kết "#" ở trang chủ và 14–20 liên kết ở mỗi trang con | S4 |
| [ ] E3 | Form chỉ là bản xem trước, chưa gửi được thư | S5 |
| [ ] E4 | Chưa có metadata riêng cho từng trang, sitemap, robots, canonical, JSON-LD | S3 |
| [ ] E5 | Phông tải bằng thẻ link CSS; cần chuyển sang `next/font` và chỉ tải tập con | S0 |
| [ ] E6 | Cổng hiện mỗi lần vào trang và che toàn màn hình | S1 |
| [ ] E7 | Chưa có công cụ đo: Search Console, Bing, đếm lượt xem | S7 |
| [ ] E8 | Chưa có trang 404 và các trang chính sách | S4 |
| [ ] E9 | Các trang con dẫn về `index.html#gui-cau-hoi`; cần đổi thành `/gui-cau-hoi` | S2, S4 |
| [ ] E10 | Chưa thử trên iPhone và Android thật; chưa chạy Bộ thử 20 người thật | S6 |

## F. Vận hành

| Mã | Việc | Vì sao |
| --- | --- | --- |
| [ ] F1 | Ai giữ hộp thư câu hỏi, và hẹn trả lời trong bao lâu | Hiến chương: "không mở một lối nào trên web khi chưa có người giữ nó" |
| [ ] F2 | Người soát nguồn kinh và nhãn tin cậy (cố vấn Phật học, dự kiến mời trước 31/12/2026); lịch đăng bài mỗi tuần | Không có người soát thì không có bài `da-dang` |
| [ ] F3 | Ai được bật cờ lập chỉ mục và gộp pull request vào nhánh chính | Tránh ra mắt nhầm |
| [ ] F4 | Quyền truy cập: GitHub (cài Claude GitHub App cho kho mới), Vercel (tạo dự án mới) | S0 |

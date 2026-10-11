# 07 · Bảng rà soát: web Khai Minh còn thiếu gì

Cập nhật ngày 11/10/2026, sau phiên S4. Claude Code cập nhật bảng này cuối mỗi phiên: ghi `[x]` khi xong và thêm chỗ thiếu mới phát hiện.

**Cách đọc bảng:**
- **Nhóm A–D và F** là việc chỉ anh hoặc đội của anh làm được.
- **Nhóm E** là việc Claude Code tự làm, đã nằm trong các phiên.
- **Cột "Chặn"** ghi phiên sẽ phải để ô trống `CẦN` nếu mục đó chưa xong.

## Tóm tắt

| Nhóm | Số mục | Mục gấp nhất |
| --- | --- | --- |
| A. Quyết định | 17 | A1 kho mã, A9 tên miền |
| B. Chất liệu thật | 11 | B1 ảnh có bản quyền, B2 chân dung, B3 ghi âm |
| C. Nội dung | 14 | C1 hiện chưa có bài nào để tìm thấy |
| D. Pháp lý | 6 | D1 pháp nhân, D3 luật sư, D5 kiểm đường dây nóng |
| E. Kỹ thuật | 10 (+6 từ S0, +5 từ S1, +3 từ S2, +7 từ S3, +3 từ S4) | Đã nằm trong S0–S7 |
| F. Vận hành | 4 | F1 người giữ hộp thư |

## A. Quyết định của anh

| Mã | Việc | Chặn | Mặc định nếu anh chưa chốt |
| --- | --- | --- | --- |
| [ ] A1 | **Kho mã riêng hay chung với antammenh-web?** | S0 | Kho riêng `khai-minh-web` (docs/01, mục E1). **S0 đã dựng theo mặc định này**; anh chỉ cần xác nhận. |
| [ ] A2 | Đường dẫn chặng: có chữ hay số? | S2 | Có chữ, ví dụ `/chang/tuoi-giua-doi`; `/chang/5` chuyển hướng về đó |
| [ ] A3 | Cửa Thân và việc kinh doanh sản phẩm: A (dừng, chỉ giáo dục) hay B (giữ nhưng tách hẳn, chỉ công khai ở trang Minh bạch lợi ích) | S4 (`/minh-bach`) | Kiến trúc web không đổi; trang Minh bạch để khung. **S4:** `/minh-bach` đã dựng khung (Điều 9 của Hiến chương, mục `#bao-cao`); danh sách lợi ích là ô `B8`. |
| [ ] A4 | Xác nhận dòng danh xưng "Người khai vấn, người viết sách, và một dược sĩ", và việc người lạ chỉ cần nhớ hai tên Khai Minh và An Tâm Mệnh | S1 | Giữ như bản mẫu |
| [ ] A5 | Thư từ form "Gửi một câu hỏi" và danh sách nhận thư đi về đâu: một hộp thư, một dịch vụ gửi thư, hay một bảng tính? | S5 | Claude Code đưa ra 2–3 phương án có chi phí, anh chọn |
| [ ] A6 | Địa chỉ cụ thể các trang ở antammenh.com (bảng tự soi, Hồ sơ Soi, Trà thất, Hiến chương gốc) và khaimenh.com | S4 | Tạm trỏ về trang chủ hai web đó; antammenh-web mới còn là bản xem trước. **S4:** “Hiến chương bản gốc” ở cuối `/hien-chuong` cũng chờ địa chỉ này (`data-can="A6"`). |
| [ ] A7 | Công cụ đếm lượt xem | S7 | Vercel Web Analytics vì đơn giản nhất; có thể thêm Plausible |
| [ ] A8 | Bản tiếng Anh và tiếng Trung: khi nào làm? | — | Chưa làm trong hai năm đầu. Kho nội dung có sẵn trường `lang` để thêm sau. Bản dịch phải do người dịch soát, không đăng bản máy dịch hàng loạt. |
| [ ] A9 | **Tên miền cho Khai Minh**: chọn, kiểm còn trống, mua. Đã chọn thì không đổi về sau. | S7, và canonical | Dùng biến `NEXT_PUBLIC_SITE_URL` cho tới khi có |
| [x] A10 | Cánh cổng chỉ hiện lần đầu trên mỗi máy. **Đã chốt (docs/01, F5):** anh xác nhận ngày 09/10/2026. S1 đã làm theo (localStorage `km-gate`). | S1 | Bật (docs/01, mục E7) |
| [ ] A11 | Hỏi ý một vị thầy hoặc luật sư về việc dùng hình tượng Phật trên trang thương hiệu | S7 | Giữ trong bản xem trước |
| [x] A12 | *(Phát hiện ở S0.)* Chân trang có ba liên kết chưa có trang nào trong docs/02: “Lịch sử sửa đổi Hiến chương”, “Báo cáo minh bạch hằng năm”, “Trợ năng và cách hiển thị”. Dựng ba trang riêng, gộp vào `/hien-chuong` và `/minh-bach`, hay tạm ẩn? **Đã chốt (docs/01, F1):** mục `#lich-su-sua-doi` trong `/hien-chuong`, mục `#bao-cao` trong `/minh-bach`, trang riêng `/tro-nang`. Chân trang đã trỏ đúng; các trang dựng ở S4. | S4 | Đã nối liên kết theo F1 |
| [ ] A14 | *(Phát hiện ở S1.)* `npm run check:words` báo thêm 13 chỗ “cần xem” trong chữ trang chủ, tất cả chép nguyên từ bản mẫu đã duyệt: “phán” (5 chỗ, như “tôi không đứng trước bạn để phán”, “một lời phán”, “ai đó từng phán về đời bạn”), “thầy” (3 chỗ: “hỏi nhiều thầy”, “tên người thầy”, “người nói là thầy” trong Điều 6), “giải hạn” (4 chỗ, đều trong câu phủ định “không bán lễ giải hạn”), “định mệnh” (Điều 1, câu phủ định). Không chỗ nào là lỗi chặn CI. Anh đồng ý giữ, hay muốn đổi chữ? | S1 | Giữ như bản mẫu |
| [ ] A15 | *(Phát hiện ở S2.)* Ba trang cửa và trang chặng 5 có thêm 6 chỗ `check:words` báo “cần xem”, tất cả chép nguyên từ bản mẫu: “nghe nhiều lời phán” (câu soi ở Cửa Tâm); “không bán lễ giải hạn” (Cửa Tâm, câu phủ định); “không xưng là bậc thầy tâm linh” (Cửa Tâm, câu phủ định); “Tôi không chẩn đoán và không chữa bệnh” (Cửa Thân, câu phủ định); “lời khuyên phải cúng sao giải hạn” (chặng 5, tầng “Điều người ta hay dọa bạn”, kể lại lời dọa để gỡ); “cha mẹ, vợ chồng, con cái, thầy và bạn” (chặng 5, diễn ý Kinh Thiện Sinh). Không chỗ nào làm hỏng CI. Anh đồng ý giữ, hay muốn đổi chữ? | S2 | Giữ như bản mẫu |
| [x] A13 | *(Phát hiện ở S0.)* Cụm “hạn nặng” trong câu hỏi liên quan của chặng 5 (“Tuổi bốn mươi chín có thật là một năm hạn nặng?”) khớp từ cấm W2 số 10. Đây là câu hỏi nguyên văn của người đọc, có sẵn trong bản mẫu, nên được giữ và ghi vào `scripts/check-words-cho-phep.json`. Anh đồng ý giữ, hay muốn đổi câu? **Đã chốt (docs/01, F2):** giữ nguyên câu và giữ trong danh sách ngoại lệ. | S1, S2 | Giữ như bản mẫu |
| [x] A16 | *(Phát hiện ở S3.)* Trường `ngay_kiem_lai` nghĩa là gì: **ngày người soát đã đọc lại gần nhất**, hay **ngày hẹn sẽ kiểm lại**? Ví dụ trong docs/04 (viết 02/11/2026, kiểm lại 02/05/2027) đọc theo cách nào cũng được. Ngày này hiện trên trang (“Ngày kiểm lại”), vào sitemap và `dateModified` của JSON-LD, nên không được là ngày ở tương lai. **Đã chốt (docs/01, F6):** ngày đã kiểm lại gần nhất. | S3 | Ngày đã kiểm lại gần nhất. Web báo thiếu khi ngày kiểm lại trước ngày viết. |
| [x] A17 | *(Phát hiện ở S3.)* Khuôn chín bước chưa có chỗ cho “điều khoa học biết” hay “góc dược sĩ”, trong khi bảng lọc chấm điểm câu hỏi theo ba lớp “nhân quả, huyền học và góc dược sĩ”. Trang chặng 5 có tầng “Điều khoa học biết” (Erikson), nhưng bài mẫu Q001 phải bỏ đoạn này vì không có bước nào hợp. Thêm một bước “Khoa học nói gì” giữa bước 5 và 6, hay ghép vào bước 7? **Đã chốt (docs/01, F7):** thêm bước riêng “Khoa học nói gì” có nhãn tin cậy riêng; khuôn thành mười bước. Bài Q001 đã có lại đoạn Erikson của chặng 5. | S3 | Giữ chín bước như Chiến lược; người viết đặt điều khoa học trong bước 7 khi cần, kèm nhãn tin cậy. |

## B. Chất liệu thật

| Mã | Chất liệu | Dùng ở | Chặn |
| --- | --- | --- | --- |
| [ ] B1 | **Ảnh cánh cổng vẽ riêng** (theo brief ở `docs/nguon/dat-ve-anh-cong-va-viec-truoc-khi-len-mang.md`) và **ảnh nền vũ trụ có bản quyền**, rộng từ 2.560 px. Hai ảnh hiện tại lấy từ Pinterest, không rõ tác giả. | Cổng, màn đầu trang chủ | **S7: không ra mắt khi chưa có** |
| [ ] B2 | Ảnh chân dung khổ 4:5, ánh sáng cửa sổ, áo sáng màu | `nguoi-giu`, `/khai-minh`, `/bao-chi` (mục “Ảnh tải về”) | S4: đã có khung |
| [ ] B3 | Bốn buổi ghi âm câu chuyện thật (bộ câu hỏi ở W2 mục 1) | `/khai-minh#cau-chuyen` (ô “Đang soạn”) | S4: đã có khung |
| [ ] B4 | Chữ ký tay, quét thành SVG | Trang chủ, thư | S4 |
| [ ] B5 | Video rót trà 8–12 giây, giọng đọc chậm khoảng ba phút | `khoang-lang`, `/ngoi-lang` | S4: đã có khung |
| [ ] B6 | Chín câu hỏi viết tay trên giấy dó (bản mẫu đang để "Chỗ đặt câu hỏi viết tay"); ảnh cận cảnh một tấm sơn mài thật | Trang chủ, chín trang chặng | S4 |
| [ ] B7 | Danh sách Tủ sách: ba cuốn cho mỗi chặng, tổng 27 cuốn | `/tu-sach` (27 khung bìa, ba khung cho mỗi chặng), Cửa Trí | S4: đã có khung |
| [ ] B8 | Danh sách các lợi ích kinh doanh của anh | `/minh-bach` | S4: đã có khung |
| [ ] B9 | Video hoặc bài nói đã có | `/noi-chuyen` (khung video) | S4: đã có khung |
| [ ] B10 | Thư phản hồi có đồng ý bằng văn bản | Trang chủ, Cửa Tâm | Sau chạy thử |
| [ ] B11 | *(Phát hiện ở S2.)* Chất liệu cho các khung trên trang cửa: video giới thiệu con đường bốn chặng (khoảng hai phút, có phụ đề) và ảnh trà thất (Cửa Tâm); bìa sách Soi – Thấu – Chuyển (Cửa Trí); ảnh cổ thư và dược liệu (Cửa Thân). Ba bìa sách Tủ sách ở Cửa Trí thuộc B7. Các khung đang hiện như bản mẫu, mang `data-can="B11"` / `"B7"`. | `/tam`, `/tri`, `/than` | S4 |
| [ ] B12 | *(Phát hiện khi viết Q001.)* Video bài giảng chuyên sâu cho từng bài hỏi – đáp, đăng trên YouTube, kèm lời thoại đầy đủ. Bài đầu tiên: Q001, khoảng 10–15 phút, đi theo đúng các phần của bài. Khi có, điền mục `video` (mã 11 ký tự, tiêu đề, lời thoại). Bản xem trước hiện khung chờ có `data-can="B12"`; web thật không hiện. | Bài hỏi – đáp | Không chặn đăng bài |
| [ ] B13 | *(Phát hiện khi viết Q001.)* Ảnh cho bài hỏi – đáp: ảnh đầu bài (cũng là ảnh khi chia sẻ, tỉ lệ 3:2, có mô tả tiếng Việt) và ảnh minh họa giữa bài theo lối sơn mài. Q001 cần ảnh đầu bài, và ảnh “một người ngồi một mình bên cửa sổ lúc nửa đêm, ánh đèn vàng nhỏ”. Ảnh phải có quyền dùng, không lấy từ Pinterest. Khung chờ mang `data-can="B13"`. | Bài hỏi – đáp | Không chặn đăng bài |

## C. Nội dung

| Mã | Việc | Ghi chú | Chặn |
| --- | --- | --- | --- |
| [ ] C1 | **Bài hỏi – đáp: hiện có 0 bài đã đăng.** Cần 15–20 bài cho mỗi cụm thử: chặng 5 và năm hạn. | Bảng lọc mới có 9 câu gợi ý, chưa kiểm với người hỏi thật. Đây là lỗ hổng lớn nhất về tìm kiếm: web đẹp nhưng chưa có gì để được tìm thấy. **S3:** đường đăng bài đã chạy (thêm một tệp là có trang; hướng dẫn ở docs/09). Có một bài mẫu Q001 ở trạng thái `ban-nhap` (xem C10). Câu chưa có bài hiện là chữ thường, mang `data-can="C1"`; khi có bài, câu tự thành liên kết trên trang chặng, trang `/hoi` và trang câu hỏi của chặng. | Tìm kiếm |
| [ ] C2 | Duyệt chữ seed của tám chặng (1–4, 6–9), và viết phần năm tầng soi cho tám chặng từ `data/truc-a/` | Chặng 5 đã đủ. **S2:** chín trang `/chang/[slug]` đã dựng. Tám chặng còn lại đang hiện phần seed (câu hỏi, lời soi, lời chia sẻ, nguồn, mức tin cậy, câu hỏi liên quan) và thang sáu tầng chung của Mục lục; còn thiếu: đoạn mở ở màn đầu, câu ở ngưỡng bình minh, năm tầng soi, lời giới thiệu ba cửa cho chặng. Mỗi chỗ là một ô “Đang soạn” mang `data-can="C2"`. Điền vào trường `trang` trong frontmatter, theo mẫu ở `content/chang/05-tuoi-giua-doi.mdx` (dấu `CẦN` có sẵn trong từng tệp). | S2 dùng seed |
| [ ] C3 | Xác nhận các chữ có ràng buộc trong bản mẫu: | Mỗi câu là một lời hứa công khai | S1, S4 |
| | • đoạn kể về quầy thuốc ở phần "Người giữ những câu hỏi" | | |
| | • các con số trong bốn lời hẹn: mười lăm phút, ba dòng nhật ký, vắng hai buổi, nhóm tám đến mười người | | |
| | • điều kiện vào Trà thất: đã qua Hồ sơ Soi | | |
| | • cam kết không nhận tiền, quà hay phong bì dưới bất kỳ tên gọi nào | | |
| | • trả lời góp ý Hiến chương trong bảy ngày | | |
| | • câu "lá thư chỉ dùng để trả lời bạn", trong khi đội vận hành cùng đọc thư | | |
| | • nguồn kinh trong Hiến chương, đối chiếu bản dịch của HT. Thích Minh Châu | | |
| [ ] C4 | Chữ cho trang định nghĩa gốc `/phuong-phap/soi-thau-chuyen`: định nghĩa, ngày công bố, phiên bản | Để AI nói "theo phương pháp của Khai Minh". **S3:** khung đã có ở `content/phuong-phap/soi-thau-chuyen.mdx` (`ban-nhap`, chỉ hiện trên bản xem trước); điền `dinh_nghia`, `ngay_cong_bo`, `phien_ban` và phần giải thích ở chỗ dấu CẦN. | S3 |
| [ ] C5 | Tải lên `data/` các tư liệu chưa có trong gói: bản V3 với 238 niềm tin sai về cầm tướng, các bài nhân tướng (răng, bàn chân, nốt ruồi), Từ điển, ngân hàng 108 chuyện đạo | Làm Ngộ nhận và Từ điển. **S3:** route `/tu-dien/[slug]` và `/ngo-nhan/[slug]` đã sẵn, chưa có bài nào; khuôn ở `content/tu-dien/_mau.mdx`, `content/ngo-nhan/_mau.mdx`. | S3 dùng khung |
| [ ] C6 | Thang nhãn tin cậy đầy đủ của Chuẩn Chính Tín | Bản mẫu mới có hai mức | S3 |
| [ ] C7 | Tiểu sử chuẩn (một đoạn ngắn, một đoạn dài) và danh sách kênh chính thức (Facebook, YouTube, Zalo…) | Dữ liệu `Person.sameAs`, thống nhất thực thể. **S3:** JSON-LD Person đã có tên, danh xưng “Người Khai Vấn”, nơi làm việc An Tâm Mệnh; `sameAs` tự lấy từ `mangXaHoi` trong `site.config.ts` khi có địa chỉ. Chưa có `description` và `image` (chờ C7, B2). | S3, S4 |
| [ ] C9 | *(Phát hiện ở S2.)* Bài dưỡng sinh đầu tiên cho Cửa Thân (Thập Bổ). Nút “Đọc bài dưỡng sinh đầu tiên” ở màn đầu `/than` là lời mời chính nhưng chưa có bài để dẫn tới, nên chưa có địa chỉ (`data-can="C9"`). | Cần người soát nguồn và nhãn tin cậy (F2) | S3 |
| [ ] C8 | Ngày hiệu lực Hiến chương; ngày bắt đầu và kết thúc "hai năm đầu không nhận tiền" | Đang để trống trong bản mẫu. **S4:** mục `#lich-su-sua-doi` của `/hien-chuong` đã có dòng “Hiến chương An Tâm Mệnh, bản công bố 1.0”; ngày công bố và ghi chú của lần sửa đổi là ô `C8`. | S4 |
| [ ] C10 | *(Phát hiện ở S3; viết lại ngày 11/10/2026.)* **Bài Q001** (`content/hoi/bon-muoi-tuoi-du-day-sao-long-chua-yen.mdx`) đã có bản đầy đủ, không còn trùng chữ trang chặng 5: lời mở, hộp “Ba điều cần nhớ”, dấu hiệu nhận biết, đủ năm bước, bảng soi ba lớp, câu hỏi thường gặp, lời kết. Còn chờ: anh duyệt giọng văn và cách nói về huyền học; người soát đối chiếu diễn ý Tương Ưng Bộ 56.11 và Trường Bộ 31 với bản HT. Thích Minh Châu, kiểm bốn nguồn nghiên cứu (F2); chấm thật dòng Q001 trong bảng lọc (đang ghi “VÍ DỤ”); video B12 và ảnh B13 (không chặn). | Bài vẫn là `ban-nhap` tới khi có người soát | — |
| [ ] C11 | *(Phát hiện ở S3.)* Câu mô tả cho máy tìm kiếm (120–155 ký tự) của các trang danh sách `/hoi`, `/viet`, `/tang/*`, trang câu hỏi theo chặng: chưa có chữ đã duyệt, đang dùng mô tả chung của web (layout) hoặc câu hỏi chính của chặng. Bài trong kho thì lấy trường `mo_ta`, bỏ trống thì cắt từ đoạn trả lời ngắn. | Không chặn; nên có trước S7 | S7 |
| [ ] C12 | *(Phát hiện ở S4.)* Trang `/sach`: **mục lục dự kiến** và **một đoạn trích** của cuốn Soi – Thấu – Chuyển. docs/02 hẹn trang này có “sách lõi và các bộ sách”, nhưng bản mẫu chỉ có khối `#sach` của Cửa Trí (đã dùng nguyên văn). Hai mục còn lại hiện ô “Đang soạn”. | Không chặn | S4 khung |
| [ ] C13 | *(Phát hiện ở S4.)* Trang `/bao-chi`: danh sách **chủ đề nói chuyện** và **nguyên tắc nhận lời** mời phỏng vấn, hợp tác. Bản mẫu và `docs/nguon/` chưa có chữ. Tiểu sử ở trang này dùng chung C7, ảnh tải về dùng chung B2. | Không chặn | S4 khung |
| [ ] C14 | *(Phát hiện ở S4.)* Trang `/tro-nang`: chữ hướng dẫn cách dùng chế độ **Chữ lớn, dễ đọc** và **Bản nhẹ cho máy yếu**, và lời cam kết về trợ năng (docs/02). Hai nút bật tắt đã chạy ngay ở đầu trang; hai mục giải thích hiện ô “Đang soạn”. | Không chặn | S4 khung |

## D. Pháp lý

| Mã | Việc | Chặn |
| --- | --- | --- |
| [ ] D1 | Tên pháp nhân, mã số thuế, địa chỉ đăng ký, chủ sở hữu nhãn hiệu; email, Zalo, địa chỉ liên hệ | S4, S5, S7 |
| [ ] D2 | Có hiện số chứng chỉ hành nghề dược trên web không; nếu có thì là số nào | S4 |
| [ ] D3 | Kết luận bằng văn bản của luật sư về câu hỏi "xem lá số có bị coi là xem bói không" (anh đã làm việc ngày 04/10); số hiệu văn bản về dữ liệu cá nhân ở Điều 8; chữ cho bốn trang chính sách và trang Dữ liệu của bạn. **S4:** bốn trang chính sách và `/du-lieu` đã dựng khung; mọi chỗ chữ pháp lý hiện “Đang chờ luật sư hoàn thiện” (`data-can="D3"`). `/du-lieu` có năm mục: Thu gì, Để làm gì, Lưu ở đâu và bao lâu, Quyền của bạn, Liên hệ; phần đầu dùng nguyên văn Điều 8 của Hiến chương. `/mien-tru` hiện đoạn Miễn trừ của bản mẫu trước ô chờ luật sư. | S4, S7 |
| [ ] D4 | Hợp đồng với hoạ sĩ: chuyển giao quyền dùng cho web, in ấn và mạng xã hội, không giới hạn thời gian | S7 |
| [ ] D5 | **Đường dây nóng Ngày Mai 096 306 1414**: số này đang hiện trên bản mẫu. Đội vận hành cần gọi thử và xác nhận giờ hoạt động trước khi công bố. | S7 |
| [ ] D6 | Tình trạng đăng ký nhãn hiệu An Tâm Mệnh và Tổng Mệnh Học™; đã được dùng ký hiệu ™ hay ® chưa | S4 |

## E. Kỹ thuật (Claude Code tự làm)

**S0 · Nền móng đã xong:** Next.js 16 (App Router, TypeScript strict); token màu (`styles/tokens.css`); màu ba cửa (`lib/doors.ts`); cấu hình chung (`site.config.ts`); phông qua `next/font`; đầu trang và chân trang dùng chung; cờ lập chỉ mục (thẻ meta, `robots.txt` và tiêu đề `X-Robots-Tag`); build báo lỗi khi cờ bật mà còn ảnh tạm; `npm run check:words`; Playwright và axe; GitHub Actions. Ảnh so hình nằm ở `tests/__screens__/`.

| Mã | Nợ kỹ thuật của bản mẫu | Phiên |
| --- | --- | --- |
| [x] E1 | Chữ chín chặng nằm trong mảng JS, máy tìm kiếm khó đọc. Đã tách sẵn sang `content/chang/`. **S1: xong cho trang chủ** — chữ đọc từ `content/chang/*.mdx` (schema zod ở `lib/chang.ts`), server dựng sẵn; tắt JavaScript vẫn đọc trọn chín chặng. **S2: xong** chín trang `/chang/[slug]` dựng sẵn lúc build; `/chang/1` … `/chang/9` chuyển hướng 301 về slug. | S1, S2 |
| [x] E2 | Khoảng 38 liên kết "#" ở trang chủ và 14–20 liên kết ở mỗi trang con. **S4: xong** — không còn liên kết `href="#"` nào; bài kiểm thử `tests/trang-s4.spec.ts` duyệt mọi liên kết nội bộ, kể cả neo, của mọi trang trong sitemap và trang 404. Lối chưa có địa chỉ (A6, Khai Tâm, C9) giữ chữ, không có liên kết, mang `data-can`. | S4 |
| [ ] E3 | Form chỉ là bản xem trước, chưa gửi được thư | S5 |
| [x] E4 | Chưa có metadata riêng cho từng trang, sitemap, robots, canonical, JSON-LD. **S3: xong** — `lib/seo.ts`: mỗi trang có tiêu đề, mô tả, canonical, Open Graph; ảnh chia sẻ riêng cho trang chủ, chín chặng và mọi bài (`opengraph-image.tsx`, Noto Serif có dấu tiếng Việt), các trang còn lại dùng ảnh mặc định; JSON-LD WebSite, Person, Organization (trang chủ), Article và BreadcrumbList (trang bài), BreadcrumbList (trang chặng, trang nhãn); `app/sitemap.ts` chỉ có trang công khai và bài `da-dang`; `app/robots.ts` khi bật cờ cho phép cả GPTBot, Google-Extended, PerplexityBot, ClaudeBot và trỏ tới sitemap. | S3 |
| [x] E5 | Phông tải bằng thẻ link CSS; cần chuyển sang `next/font` và chỉ tải tập con. **S0: xong** (Noto Serif, Be Vietnam Pro, tập con `vietnamese` và `latin`). Chữ Hán cho dấu và cửu cung: **S1 xong**, tập con Noto Serif SC chỉ gồm 33 chữ (9,6 KB, `app/fonts/`). | S0 |
| [x] E6 | Cổng hiện mỗi lần vào trang và che toàn màn hình. **S1: xong** — cổng chỉ hiện lần đầu trên mỗi máy, có “Vào thẳng trang”, Esc, focus trap, chế độ tĩnh. | S1 |
| [ ] E7 | Chưa có công cụ đo: Search Console, Bing, đếm lượt xem | S7 |
| [x] E8 | Chưa có trang 404 và các trang chính sách. **S4: xong** — `app/not-found.tsx` (chữ W2, trả mã 404), bốn trang chính sách dựng khung (xem D3). | S4 |
| [x] E9 | Các trang con dẫn về `index.html#gui-cau-hoi`; cần đổi thành `/gui-cau-hoi`. **S2:** Cửa Tâm và chín trang chặng đã dẫn về `/gui-cau-hoi`; trang này dựng ở S5, nên tới lúc đó nút còn ra 404. **S4: xong phần liên kết** — `/gui-cau-hoi` đã dựng sớm (khối lá thư của trang chủ), nên không nút nào ra 404 nữa. Các nút ở trang khác mang theo chủ đề thư qua `?chu-de=` (ví dụ “Xin Hồ sơ Soi” → `/gui-cau-hoi?chu-de=hoso`), lá thư chọn sẵn chủ đề ấy. Việc gửi thư thật vẫn ở E18. | S2, S4, S5 |
| [ ] E10 | Chưa thử trên iPhone và Android thật; chưa chạy Bộ thử 20 người thật | S6 |
| [x] E11 | *(Từ S0.)* Nút “Mục lục” ở đầu trang tạm là liên kết tới `/muc-luc`. **S1: xong phần trang chủ** (nút mở lớp phủ). **S2: xong** trang `/muc-luc`: bốn lớp luôn mở, chín thang sáu tầng nằm sẵn trong HTML, chữ dùng chung với lớp phủ (`components/muc-luc/CacLop.tsx`). | S1, S2 |
| [x] E12 | *(Từ S0.)* Đầu trang và chân trang đã trỏ vào các route ở docs/02 (`/tam`, `/tri`, `/than`, `/gui-cau-hoi`, `/khai-minh`, `/hien-chuong`, `/minh-bach`, `/tro-nang`, bốn trang chính sách). Các route này chưa dựng nên hiện còn ra trang 404. **S2:** `/tam`, `/tri`, `/than`, `/muc-luc` đã chạy; đầu trang đánh dấu cửa đang xem. Còn lại các trang của S4, S5. **S4: xong** — mọi route ở đầu trang và chân trang đã chạy. | S2, S4, S5 |
| [ ] E13 | *(Từ S0.)* Khi `hotlineDaXacNhan` là `false`, chân trang chỉ nhắc 115 và người thân, chưa nhắc Ngày Mai. Bật cờ trong `site.config.ts` sau khi xong D5 thì câu đầy đủ của bản mẫu hiện lại. | Sau D5 |
| [ ] E14 | *(Từ S0.)* Liên hệ, mạng xã hội, chủ sở hữu nhãn hiệu, pháp nhân, ngày cập nhật: chân trang đang hiện ô nét đứt như bản mẫu. Điền vào `site.config.ts` khi có D1, C7, C8. **Không ra mắt khi còn ô trống.** | S4, S7 |
| [x] E15 | *(Từ S0.)* `npm run check:words` đang báo 3 chỗ “cần xem” (không làm hỏng CI): “trị liệu” trong khối Miễn trừ, “duy nhất” hai lần trong chặng 1. Cả ba đều nằm trong câu phủ định, nên tôi đề nghị giữ. **Đã chốt (docs/01, F3):** giữ cả ba chỗ. | S1 |
| [x] E17 | *(Từ S1.)* Liên kết trên trang chủ đã trỏ vào các route ở docs/02 nhưng các trang ấy chưa dựng, nên hiện còn ra 404: ~~`/tam`, `/tri`, `/than` (kèm `#bac-thang`, `#thu`, `#sach`), `/chang/[slug]` (“Đọc trọn bài”)~~ (**S2: đã chạy**, có bài kiểm thử duyệt mọi liên kết nội bộ), `/khai-minh`, `/hien-chuong`, `/minh-bach`, `/du-lieu`, `/bao-chi`, `/gui-cau-hoi` (nút ở đầu trang). Sáu tầng đi sâu trong Mục lục trỏ `/tang/cham` … `/tang/tot-nghiep` (**S3: đã dựng**, liệt kê bài theo tầng; tầng chưa có bài hiện ô “Đang soạn”); khi có bài riêng cho từng chặng thì đổi. Câu hỏi liên quan của mỗi chặng chưa có bài nên để `data-can="C1"`, không có liên kết. **S4: xong** — `/khai-minh`, `/hien-chuong`, `/minh-bach`, `/du-lieu`, `/bao-chi`, `/gui-cau-hoi` đã chạy. | S2–S5 |
| [ ] E18 | *(Từ S1.)* Lá thư “Gửi một câu hỏi” vẫn là bản xem trước như bản mẫu: bấm gửi thì hiện “Tôi đã nhận được lá thư của bạn…” nhưng **chưa gửi đi đâu**. Không mời người thật dùng thử biểu mẫu trước phiên S5. | S5 (cần A5) |
| [ ] E19 | *(Từ S1.)* CSS trang chủ chép nguyên từ bản mẫu (`styles/trang-chu.css`, ~1.450 dòng), gồm cả các luật của những phiên bản cũ không còn dùng (`.doors3`, `.foot`, `.grid9`, `.ladder4`, `.wall9`…). Giữ để khớp hình tuyệt đối; dọn khi đo hiệu năng. | S6 |
| [ ] E20 | *(Từ S1.)* Khi cờ `hotlineDaXacNhan` là `false`, số Ngày Mai cũng được ẩn ở Điều 6 của Hiến chương và ở khối “Nếu bạn đang gặp nguy hiểm” cạnh lá thư (chỉ còn 115). Bật cờ sau khi xong D5 thì câu đầy đủ của bản mẫu hiện lại. | Sau D5 |
| [ ] E21 | *(Từ S1.)* Các khung còn chờ chất liệu trên trang chủ mang `data-can`: ảnh chân dung (B2), chữ ký tay (B4), video rót trà và giọng đọc (B5), câu hỏi viết tay trong mỗi chặng (B6), số chứng chỉ hành nghề (D2), ngày hiệu lực Hiến chương (C8). **S4:** các trang mới dùng lại cùng khối nên mang cùng dấu (ảnh, chữ ký, số chứng chỉ trên `/khai-minh`; video và giọng đọc trên `/ngoi-lang`). Mục này xong khi có chất liệu. | S4 |
| [ ] E22 | *(Từ S2.)* Liên kết “#” của ba trang cửa và trang chặng 5 đã được nối: “Đọc Hiến chương…” → `/hien-chuong` (**S4: đã chạy**); “Ngồi lặng chín mươi giây trước” → `/ngoi-lang` (**S4: đã chạy**); “bốn lời hẹn” → `/#loi-hen`; ba cửa → `/tam`, `/tri`, `/than`; chặng trước, chặng sau → slug. Các lối ra antammenh.com chưa có địa chỉ (A6): “Bắt đầu bảng tự soi”, “Ghé khoảng sân” (cộng đồng); “Ghé phòng chuyển” chờ Khai Tâm mở. “Ghé phòng soi” đã dẫn tới khaimenh.com. Câu hỏi khác ở mỗi chặng chưa có bài nên chưa có liên kết (C1). Ô nhận thư ở Cửa Trí, Cửa Thân vẫn là bản xem trước như E18. | S3–S5 |
| [x] E23 | *(Từ S2.)* **S3: giữ nguyên trong frontmatter** — trang chặng đã chạy ổn và khuôn của nó khác khuôn bài; kho bài mới (hỏi – đáp, từ điển…) dùng thân MDX như docs/09. Chữ riêng của trang chặng (năm tầng soi, ba cửa, sáu tầng…) đang nằm trong trường `trang` của frontmatter, kiểm bằng zod, vì đường xử lý MDX chỉ có từ S3. S3 có thể chuyển phần này sang thân MDX nếu tiện cho người viết; trang không đổi. Chặng 5 dùng bốn câu hỏi khác của bản mẫu chang-5.html (`trang.cau_hoi_khac`), trong khi trang chủ vẫn hiện ba câu của mảng S. | S3 |
| [ ] E24 | *(Từ S2.)* Khác bản mẫu có chủ ý: ba trang cửa và trang chặng dùng đầu trang chung của trang chủ (Chín chặng · Cửa Tâm · Cửa Trí · Cửa Thân · Gửi một câu hỏi · Aa · Mục lục, docs/02 mục 5), thay cho thanh “Tâm · Trí · Thân · Gửi một câu hỏi · Trang chủ” riêng của bản mẫu trang con. Trang chặng còn thiếu chữ vẫn giữ dải ngưỡng bình minh nhưng không có câu. | — |
| [ ] E25 | *(Từ S3.)* JSON-LD Person trỏ `url` về `/khai-minh`, nhưng trang tác giả dựng ở S4, nên hiện còn ra 404. Khối tác giả cuối mỗi bài cũng dẫn tới đó. Khi dựng `/khai-minh`, thêm tiểu sử, ảnh và `sameAs` khớp đúng trang (docs/08: “tên và ảnh của Person khớp trang /khai-minh”). **S4:** `/khai-minh` đã chạy, có JSON-LD `ProfilePage` trỏ về cùng `Person` của trang chủ (cùng `@id`). Tiểu sử (C7) và ảnh (B2) chưa có nên Person vẫn chưa có `description`, `image`. | S4, sau C7 và B2 |
| [ ] E26 | *(Từ S3.)* Trang chặng có câu hỏi trùng tên bài hỏi – đáp thì câu ấy thành liên kết. Bài Q001 trùng câu hỏi chính của chặng 5, nên trên bản xem trước danh sách “Những câu hỏi khác…” của chặng 5 có thêm dòng thứ năm dẫn tới Q001. Ở production chưa có gì đổi vì Q001 là bản nháp. | — |
| [ ] E27 | *(Từ S3.)* Thêm trang `/hoi` (mục hỏi – đáp, chia theo chín chặng) ngoài sơ đồ cũ, để bài cắt ngang có trang mẹ và đường dẫn có cấp `/hoi`. Đã ghi vào docs/02. Trang `/cua/tam`, `/cua/tri`, `/cua/than` là danh sách bài theo cửa, khác trang cửa chính `/tam`, `/tri`, `/than`. Trang danh sách và trang nhãn chỉ vào sitemap khi đã có ít nhất một bài đăng. | — |
| [ ] E28 | *(Từ S3.)* Bộ lọc ba nhãn của `/viet` lọc phía trình duyệt (danh sách vẫn nằm sẵn trong HTML) và chỉ hiện khi có từ hai bài trở lên. Chưa có bài viết dài nào, nên bộ lọc chưa được thử với bài thật. | S6 |
| [ ] E29 | *(Từ S3.)* `check:words` có thêm 2 chỗ “cần xem” trong bài mẫu Q001, chép từ chặng 5: “cúng sao giải hạn” và “thầy và bạn” (cùng hai câu đã nêu ở A15). Không làm hỏng CI. | Theo A15 |
| [x] E30 | *(Sau S3, nâng trang hỏi – đáp.)* Các khối mới cần vài chữ giao diện chưa có trong bản mẫu. Tôi giữ ngắn nhất có thể, anh xem có muốn đổi không: “{n} phút đọc” (đầu bài); “Xem video: {tiêu đề}” (tên đọc cho máy đọc màn hình của nút ảnh bìa video); “Lời thoại” (nút mở lời thoại); “Nhân quả”, “Khoa học”, “Huyền học” (tên ba ô của bảng soi ba lớp, lấy từ tên bước). Câu “Nghe Khai Minh đọc bài này” là chữ anh đã đưa. Mục lục nhỏ đầu bài không có tiêu đề hiện ra. **Đã chốt (docs/01, F8):** “Bạn đọc bài này trong khoảng {n} phút.”; nút “Đọc lời trong video”; mục lục có dòng dẫn “Bài này có các phần:”; giữ nguyên “Xem video: {tiêu đề}” và ba tên ô. | — |
| [ ] E31 | *(Sau S3.)* Video, bản đọc và ảnh đầu bài đã có chỗ (frontmatter `video`, `am_thanh`, `anh_bia` và các thẻ `<VideoYouTube>`, `<AmThanh>`, `<Anh>`, `<BangSoiBaLop>`), chưa có chất liệu: bản đọc chờ giọng đọc (B5), video chờ B9. Ảnh bìa video đi qua bộ tối ưu ảnh của Vercel (khách không gọi tới YouTube trước khi bấm); khi có nhiều video, xem lại hạn mức tối ưu ảnh của gói Vercel. | B5, B9 |
| [ ] E32 | *(Từ S4.)* Các trang mới dùng lại nguyên khối của trang chủ và trang cửa (Người giữ những câu hỏi, Con đường đồng hành, Lời hứa và chín điều, Khoảng lặng, khối Sách và Tủ sách của Cửa Trí, Buổi soi và “Sau đây là điều tôi không làm” của Cửa Tâm), không chép lại chữ. Khi khối nằm ở trang khác, liên kết trong khối đổi từ neo trên cùng trang sang trang đích (ví dụ “Đọc câu chuyện của tôi” → `/khai-minh`, “Đọc trọn Hiến chương” → `/hien-chuong`, “bình minh” → `/#binh-minh`). Sửa chữ ở một nơi là đổi ở mọi trang. | — |
| [ ] E33 | *(Từ S4.)* Lệnh mới `npm run liet-ke:can` (cần một bản đang chạy ở cổng 3100, hoặc đặt `URL_THU`) đọc mọi trang trong sitemap và trang 404, rồi in bảng mọi ô `data-can` theo trang và mã việc. Bảng tóm tắt ở cuối tệp này lấy từ lệnh ấy. Ô “Ghé phòng chuyển” ở Cửa Tâm mang dấu “Khai Tâm chưa mở” (không có mã), chờ Khai Tâm mở. | — |
| [ ] E34 | *(Từ S4.)* Khác docs/02 có chủ ý: `/cau-chuyen` chuyển hướng 301 về `/khai-minh#cau-chuyen` (trình duyệt cuộn tới mục Câu chuyện của tôi). Footer: “Câu chuyện của tôi” → `/khai-minh`, “Khi tôi làm chưa đúng một điều” → `/hien-chuong#khi-sai`, khối Miễn trừ có trang riêng `/mien-tru`. Trang `/tro-nang` đặt hai nút Chữ lớn và Bản nhẹ ngay ở đầu trang. Trang `/bao-chi` có nút vàng “Gửi lời mời hợp tác” dẫn tới `/gui-cau-hoi` cho tới khi có hộp thư riêng (A5). | — |
| [x] E16 | *(Từ S0.)* Phiên S0 làm trên nhánh `claude/bold-volta-yy6w5v` do Claude Code trên web cấp, chưa theo quy ước `phien/S<số>-<tên-ngắn>`. Từ S1, khi mở phiên mới, có thể dặn Claude dùng đúng tên nhánh. **Đã chốt (docs/01, F4):** dùng tên nhánh do Claude Code cấp; CLAUDE.md đã bỏ quy ước cũ. | — |

## F. Vận hành

| Mã | Việc | Vì sao |
| --- | --- | --- |
| [ ] F1 | Ai giữ hộp thư câu hỏi, và hẹn trả lời trong bao lâu | Hiến chương: "không mở một lối nào trên web khi chưa có người giữ nó" |
| [ ] F2 | Người soát nguồn kinh và nhãn tin cậy (cố vấn Phật học, dự kiến mời trước 31/12/2026); lịch đăng bài mỗi tuần | Không có người soát thì không có bài `da-dang` |
| [ ] F3 | Ai được bật cờ lập chỉ mục và gộp pull request vào nhánh chính | Tránh ra mắt nhầm |
| [ ] F4 | Quyền truy cập: GitHub (cài Claude GitHub App cho kho mới), Vercel (tạo dự án mới) | S0. **GitHub đã chạy được.** Vercel còn chờ anh: tạo dự án từ kho này theo README bước 4, đặt `NEXT_PUBLIC_CHO_PHEP_LAP_CHI_MUC=false`. Bản xem trước của Vercel luôn `noindex`, kể cả khi cờ bật. |

## Danh sách ô CẦN sau phiên S4

Lấy từ `npm run liet-ke:can` ngày 11/10/2026: **244 ô trên 29 trang**, cộng **11 ô ở chân trang** (lặp lại trên mọi trang). Mỗi ô hiện cho khách như một khung nét đứt hoặc chữ “Đang soạn”; mã việc chỉ nằm trong thuộc tính `data-can`, không hiện ra.

| Mã | Chỗ còn thiếu | Ở đâu | Số ô |
| --- | --- | --- | --- |
| A5 | Lá thư và các ô nhận thư chưa gửi đi đâu | `/`, `/gui-cau-hoi`, `/tri` (2), `/than`, `/noi-chuyen`, `/sach`, `/tu-sach` | 8 |
| A6 | Địa chỉ ở antammenh.com: bảng tự soi, khoảng sân, Hiến chương bản gốc | `/tam` (2), `/hien-chuong` | 3 |
| B2 | Ảnh chân dung | `/`, `/khai-minh`, `/bao-chi` | 3 |
| B3 | Câu chuyện của tôi (ghi âm) | `/khai-minh#cau-chuyen` | 1 |
| B4 | Chữ ký tay | `/`, `/khai-minh` | 2 |
| B5 | Video rót trà, giọng đọc | `/`, `/ngoi-lang` | 4 |
| B6 | Câu hỏi viết tay | `/` (9), chín trang chặng | 18 |
| B7 | Bìa sách Tủ sách | `/tri` (3), `/tu-sach` (27) | 30 |
| B8 | Danh sách lợi ích kinh doanh | `/minh-bach` | 1 |
| B9 | Video bài nói | `/noi-chuyen` | 1 |
| B11 | Video giới thiệu, ảnh trà thất, bìa sách, ảnh cổ thư | `/tam` (2), `/tri`, `/than`, `/cach-toi-dong-hanh`, `/sach` | 6 |
| C1 | Câu hỏi chưa có bài (chữ thường, chưa có liên kết) | `/` (27), chín trang chặng (28) | 55 |
| C2 | Phần chữ còn thiếu của tám chặng | tám trang chặng, mỗi trang 10 | 80 |
| C7 | Tiểu sử và kênh chính thức | `/khai-minh` (5), `/bao-chi`; chân trang (4) | 6 + 4 |
| C8 | Ngày công bố Hiến chương, ngày cập nhật | `/`, `/hien-chuong` (2); chân trang (1) | 3 + 1 |
| C9 | Bài dưỡng sinh đầu tiên | `/than` | 1 |
| C12 | Mục lục dự kiến, đoạn trích | `/sach` | 2 |
| C13 | Chủ đề nói chuyện, nguyên tắc nhận lời | `/bao-chi` | 2 |
| C14 | Hướng dẫn hai chế độ hiển thị, cam kết trợ năng | `/tro-nang` | 2 |
| D1 | Thư điện tử, Zalo, địa chỉ, chủ sở hữu nhãn hiệu, pháp nhân | chân trang | 5 |
| D2 | Số chứng chỉ hành nghề | `/`, `/khai-minh` | 2 |
| D3 | Chữ pháp lý (“Đang chờ luật sư hoàn thiện”) | `/du-lieu` (5), `/dieu-khoan`, `/bao-mat`, `/cookie`, `/mien-tru` | 9 |
| D5 | Số Ngày Mai chờ gọi thử | `/`, `/hien-chuong`, `/gui-cau-hoi` (khối cạnh lá thư và Điều 6); chân trang (1) | 4 + 1 |
| (không mã) | “Ghé phòng chuyển” chờ Khai Tâm mở | `/tam` | 1 |

# Bản thiết kế website Người Khai Vấn
### Khung làm việc 8 phiên · Nội dung đầy đủ Phiên W1
Ngày 02/10/2026 · Tài liệu nội bộ

---

## 0. Hội đồng chuyên gia

Đây là các **vai chuyên môn** được mô phỏng để phản biện từ nhiều góc nhìn. Họ không phải người thật, và không ai trong hội đồng có quyền thay thế ý kiến của luật sư, nhiếp ảnh gia hay lập trình viên thật khi làm việc thật.

| Vai | Trách nhiệm trong dự án |
| --- | --- |
| Chiến lược gia thương hiệu cá nhân | Định vị, lời hứa, khác biệt, kiến trúc thương hiệu |
| Kiến trúc sư thông tin, nhà nghiên cứu trải nghiệm | Sơ đồ trang, hành trình người đọc, điều hướng |
| Giám đốc sáng tạo, nhà thiết kế biên tập | Bố cục, kiểu chữ, hệ thống lưới, chất liệu sơn mài |
| Giám đốc hình ảnh, đạo diễn phim tư liệu | Ảnh chân dung, video, phong cách ánh sáng |
| Nhà thiết kế chuyển động | Hiệu ứng, nhịp chuyển cảnh, giới hạn chuyển động |
| Biên tập viên tiếng Việt, người viết nội dung | Giọng văn, câu chữ, loại bỏ dấu vết văn máy |
| Chuyên gia SEO và E-E-A-T | Cấu trúc dữ liệu, nội dung đáng tin, tìm kiếm |
| Kỹ sư hiệu năng web (Next.js) | Core Web Vitals, ngân sách hiệu năng, truy cập |
| Chuyên gia khả năng tiếp cận (WCAG 2.2) | Người dùng lớn tuổi, người khiếm thị, thiết bị yếu |
| Luật sư dữ liệu và quảng cáo Việt Nam | Luật 91/2025, Nghị định 87/2026, lời chứng thực khách |

---

## 1. Bốn sự thật cần nói trước (phản biện chủ động)

### 1.1. Không nên làm một website hoàn toàn tách riêng, ít nhất lúc này

Anh đã chốt hướng **"nội dung là gốc"**: một kho Markdown/MDX duy nhất và **một** web Next.js (antammenh-web). Trong sơ đồ hiện tại cũng đã có trang **/khai-minh**.

| Phương án | Mô tả | Ưu | Nhược |
| --- | --- | --- | --- |
| **A. Khu "Người Khai Vấn" trong antammenh-web** (đề xuất) | Mở rộng /khai-minh thành một khu riêng có giao diện riêng, nhiều trang con; về sau có thể trỏ thêm tên miền riêng như khaiminh.vn vào | Một kho nội dung, một lần bảo trì; uy tín tìm kiếm dồn về một tên miền; Google hiểu rõ quan hệ "người sáng lập – thương hiệu" | Cảm giác "web cá nhân" phụ thuộc vào thiết kế; cần làm khu này khác biệt rõ với phần còn lại của ngôi nhà |
| B. Một website riêng với tên miền riêng | Web cá nhân của Khai Minh, tách khỏi An Tâm Mệnh | Thương hiệu cá nhân độc lập, tự do thiết kế | Hai web phải bảo trì; uy tín tìm kiếm bị chia đôi; đi ngược quyết định "một web để bắt đầu"; tốn công đội gấp đôi |

**Khuyến nghị ban đầu:** phương án A.

> **Quyết định ngày 02/10/2026: anh chọn phương án B, một website riêng.** Từ đây toàn bộ bản thiết kế đi theo phương án B. Để B không làm mất những gì A bảo vệ được, áp dụng sáu nguyên tắc sau.

**Sáu nguyên tắc để làm phương án B cho đúng**

1. **Hai web, một kho nội dung.** Dùng một kho mã chung chứa hai ứng dụng Next.js (web Khai Minh và antammenh-web) cùng một thư mục nội dung MDX dùng chung, tức an-tam-menh-content. Mỗi web triển khai riêng trên Vercel. Như vậy vẫn giữ quyết định "nội dung là gốc": sửa một lần, hai web cùng cập nhật.
2. **Phân vai rõ, không đăng trùng.** Web Khai Minh giữ **con người, tác phẩm, góc nhìn cá nhân**. antammenh.com giữ **phương pháp, dịch vụ, Hiến chương bản gốc**. Một nội dung buộc phải xuất hiện ở hai nơi thì chỉ có một bản gốc; bản kia khai báo đường dẫn chuẩn (canonical) trỏ về bản gốc.
3. **Nối hai web thành một thực thể trong mắt Google.** Web Khai Minh khai báo dữ liệu có cấu trúc Person và cho biết người này làm việc cho An Tâm Mệnh. antammenh.com khai báo Organization với người sáng lập trỏ về đúng Person đó. Đầu trang và chân trang hai web liên kết qua lại.
4. **Trang /khai-minh trên antammenh.com được rút gọn** thành một thẻ giới thiệu ngắn kèm liên kết sang web riêng, để tránh hai trang cùng nói một chuyện.
5. **Tên miền** được chọn ở Phiên W6. Gợi ý cần kiểm tra còn trống hay không: khaiminh.vn, khaiminh.com, nguoikhaivan.vn. Nếu được, nên giữ cả đuôi .vn và .com.
6. **Chấp nhận chi phí vận hành thêm:** một tên miền, hai lần triển khai, hai tài khoản Search Console, hai bộ đo lường. Đội vận hành cần một người phụ trách web Khai Minh.

### 1.2. Google không "chấm một điểm" duy nhất

Có ba thước đo khác nhau, và web phải đạt cả ba:

1. **Lighthouse:** điểm đo trong phòng thí nghiệm, dùng khi lập trình. Mục tiêu 95–100 cho cả bốn hạng mục.
2. **Core Web Vitals:** dữ liệu từ người dùng thật, đo ở phân vị thứ 75 trong 28 ngày. Đây là tín hiệu trải nghiệm trang mà Google dùng thật.
3. **Chất lượng nội dung (E-E-A-T):** kinh nghiệm, chuyên môn, thẩm quyền, độ tin cậy. Đây là tiêu chí trọng yếu nhất cho một web về đời sống và tâm linh.

> **Lưu ý về ngưỡng Core Web Vitals:** một số bài trên mạng nói Google đã siết LCP xuống 2,0 giây vào năm 2026, nhưng nhiều nguồn khác dẫn tài liệu chính thức cho biết ngưỡng vẫn là LCP ≤ 2,5 giây, INP < 200 ms, CLS < 0,1. Thay vì tranh luận, ta đặt **ngân sách nội bộ chặt hơn**: LCP ≤ 2,0 giây, INP ≤ 150 ms, CLS ≤ 0,05 trên điện thoại tầm trung. Đạt mức này thì đúng ở cả hai cách hiểu.

### 1.3. "Nhìn không ra AI làm" phụ thuộc phần lớn vào chất liệu thật

Mã nguồn có thể do AI hỗ trợ viết; điều đó không ai nhìn thấy. Thứ làm lộ "dấu vết AI" là **ảnh dựng bằng AI, câu chữ chung chung và bố cục rập khuôn**. Do đó ba thứ **bắt buộc phải thật**:
- Ảnh và video chân dung do nhiếp ảnh gia thật chụp.
- Giọng nói và câu chuyện của chính anh, được ghi âm rồi biên tập, không phải văn soạn sẵn.
- Chi tiết cụ thể: số năm, tình huống, đồ vật trong trà thất, chữ viết tay.

### 1.4. Bút danh và độ tin cậy

Google và người đọc đều cần biết **ai đứng sau** nội dung về đời sống và tâm linh. Dùng bút danh **Khai Minh** không sao, với điều kiện:
- Bút danh được dùng **nhất quán** ở mọi nơi.
- Có **ảnh, video thật** của anh.
- **Kinh nghiệm kiểm chứng được** được nói rõ: dược sĩ, khoảng 14 năm nghiên cứu cổ học.
- Chân trang có **thông tin pháp nhân** (hộ kinh doanh hoặc doanh nghiệp đứng tên dịch vụ). Tên thật không cần hiện; pháp nhân thì cần.

### 1.5. Kiểu chữ Times New Roman là một rủi ro

Times New Roman là phông mặc định của hệ điều hành, và người làm thiết kế nhận ra ngay. Nó làm web trông cũ, đi ngược mục tiêu "đẳng cấp" và "không rập khuôn". Đề xuất giữ Times New Roman làm **phông dự phòng**, còn phông hiển thị dùng một bộ serif có dấu tiếng Việt chuẩn. Ba lựa chọn để anh chọn ở Phiên W3:
- **EB Garamond:** cổ điển, sang, rất hợp chất "sách".
- **Cormorant Garamond:** thanh mảnh, hợp tiêu đề lớn.
- **Noto Serif:** chắc chắn, dễ đọc cho người lớn tuổi.

Cả ba đều có bộ ký tự tiếng Việt; cần kiểm tra dấu chồng như ầ, ẩ, ặ ở cỡ chữ nhỏ trước khi chốt.

---

## 2. Khung làm việc 8 phiên

| Phiên | Mục tiêu | Đầu ra | Chuyên gia dẫn dắt | Anh cần chuẩn bị |
| --- | --- | --- | --- | --- |
| **W1. Định vị và kiến trúc** | Biết web nói gì, cho ai, gồm những trang nào | File này | Chiến lược thương hiệu, kiến trúc thông tin | Đã chốt phương án B (02/10/2026) |
| **W2. Nội dung và giọng văn** | Có toàn bộ chữ cho từng trang, bằng giọng của anh | Bản thảo chữ từng trang; bộ quy tắc giọng văn; danh sách câu cấm | Biên tập viên tiếng Việt | 3–4 bản ghi âm anh tự kể (mỗi bản 10–15 phút, theo câu hỏi tôi gửi) |
| **W3. Hệ thống thiết kế** | Có ngôn ngữ thị giác riêng | Kiểu chữ, bảng màu sơn mài, lưới, khoảng trắng, nguyên tắc chuyển động, biểu tượng | Giám đốc sáng tạo, thiết kế chuyển động | Chọn 1 trong 3 phông; duyệt bảng màu |
| **W4. Hình ảnh và video** | Có kịch bản chụp và quay | Danh sách cảnh chụp, kịch bản video, chỉ dẫn ánh sáng, đạo cụ, quy chuẩn xuất file | Giám đốc hình ảnh | Chọn nhiếp ảnh gia, địa điểm, lịch chụp |
| **W5. Bản dựng giao diện** | Nhìn thấy web trước khi lập trình | Bản dựng từng trang trên máy tính và điện thoại | Thiết kế biên tập | Duyệt bản dựng |
| **W6. Kỹ thuật và tìm kiếm** | Web nhanh, dễ tìm, dễ tiếp cận | Ngân sách hiệu năng, cấu trúc dữ liệu, chuẩn truy cập, kế hoạch đo lường | Kỹ sư hiệu năng, chuyên gia SEO | Quyết định tên miền, công cụ đo lường |
| **W7. Xây dựng và kiểm thử** | Web chạy thật | Ứng dụng Next.js riêng trong kho mã chung với antammenh-web (Claude Code), danh sách kiểm thử | Kỹ sư Next.js | Đội kiểm thử trên điện thoại thật |
| **W8. Ra mắt và đo lường** | Web sống, được tìm thấy | Kế hoạch ra mắt, chỉ số theo dõi 90 ngày | Chuyên gia SEO, chiến lược | Duyệt ngày ra mắt |

**Thứ tự phụ thuộc:** W2 (chữ) và W4 (ảnh, video) là đường găng, vì chúng cần anh và nhiếp ảnh gia. Nên bắt đầu chuẩn bị ghi âm và tìm nhiếp ảnh gia ngay trong tuần này, song song với W3.

---

## 3. Phiên W1 — Định vị và kiến trúc thương hiệu

### 3.1. Vị trí trong hệ sinh thái

| Tầng | Tên | Vai trò trên web |
| --- | --- | --- |
| Người | **Khai Minh — Người Khai Vấn** | Cửa vào bằng con người: người đọc tin người trước, rồi mới tin phương pháp |
| Ngôi nhà | **An Tâm Mệnh** | Nơi giữ phương pháp Soi – Thấu – Chuyển, Hiến chương, hành trình đồng hành |
| Hai phòng | **Khai Mệnh** (phòng soi) · **Khai Tâm** (phòng chuyển) | Công cụ và thực hành |

Web Người Khai Vấn **không bán dịch vụ trực tiếp**. Việc của nó là trả lời ba câu hỏi người đọc tự đặt ra: *"Người này là ai? Tôi có tin được không? Người này có hiểu tôi không?"* Rồi nó dẫn người đọc vào ngôi nhà.

### 3.2. Tuyên bố định vị (dùng nội bộ)

> Dành cho những người đang đứng trước một câu hỏi lớn của đời mình và đã mệt với những lời phán, **Khai Minh là người khai vấn** dùng chín môn cổ học như những tấm gương, đặt trên nền Phật học, để giúp họ tự thấy rõ tâm mình. **Khác với** người xem số, Khai Minh không đoán tương lai, nói rõ mức tin cậy của từng điều, và đồng hành cho tới ngày người ấy tự bước đi được.

### 3.3. Ba nhóm người đọc chính

| Nhóm | Họ là ai | Câu hỏi trong lòng | Họ cần thấy gì trên web | Lối vào phù hợp |
| --- | --- | --- | --- | --- |
| **Người đang mắc kẹt** | Trung lưu, 28–50 tuổi, đang khủng hoảng về tình cảm, công việc, gia đình | "Có ai hiểu mình mà không phán xét mình không?" | Sự ấm áp, an toàn, lời hứa không gieo sợ | Đọc Hiến chương → nhận thư → cộng đồng |
| **Người đứng trước quyết định lớn** | Doanh nhân, người có tài sản, đang cân nhắc chuyện lớn | "Người này có đủ tầm và kín đáo để mình tin không?" | Sự điềm tĩnh, chiều sâu, kín đáo, không ồn ào bán hàng | Trà thất (riêng tư, tối đa 3 người mới mỗi tháng) |
| **Người tu học** | Người đọc Phật pháp, muốn hiểu cổ học một cách chính tín | "Người này có hiểu kinh đúng không, hay pha trộn mê tín?" | Nguồn kinh dẫn chuẩn, nhãn tin cậy, bài viết sâu | Bài viết → sách → cộng đồng |

Nhóm thứ tư (người đọc quốc tế) được thiết kế sẵn chỗ cho bản tiếng Anh, nhưng chưa làm trong giai đoạn này.

### 3.4. Lời hứa và ba trụ khác biệt

**Lời hứa với người đọc** (giọng khách, câu đủ ý): *"Bạn sẽ được lắng nghe trọn vẹn, được nói thật, và được đồng hành cho tới khi bạn tự bước đi trên con đường của mình."*

| Trụ khác biệt | Nói gì | Bằng chứng hiện trên web |
| --- | --- | --- |
| **Trung thực có hệ thống** | Mọi điều đều được nói rõ là niềm tin, luận giải, nghiên cứu hay đã kiểm chứng | Bốn nhãn tin cậy; Hiến chương; lời thừa nhận "chưa có nghiên cứu chứng minh" |
| **Người bạn lành, không phải thầy phán** | Mục tiêu là ngày bạn không còn cần đến chúng tôi | Hành trình có tốt nghiệp; bảy phẩm chất bạn lành |
| **Gốc Phật học, chín môn là tấm gương** | Không mê tín, có nguồn kinh | Nguồn lời dạy dẫn rõ; dược sĩ; 14 năm nghiên cứu |

### 3.5. Giọng nói

| Nên | Không nên |
| --- | --- |
| Ngôi thứ nhất, điềm tĩnh, như đang ngồi pha trà nói chuyện | Hô hào, khẩu hiệu, chấm than |
| Câu cụ thể có chi tiết thật ("năm thứ sáu tôi bỏ việc đoán số") | Câu chung chung ("hành trình chuyển hóa tuyệt vời") |
| Thừa nhận giới hạn | Tự xưng tinh hoa, số một |
| Gọi người đọc là "bạn" | Gọi là "quý khách", "các bạn" kiểu bài quảng cáo |
| Dùng từ của hệ Bản đồ Tâm Mệnh (Cuốn, Dừng, Chuyển, An; Tâm Ham, Tâm Nóng…) | Thuật ngữ khó hiểu mà không giải thích |

Bộ từ cấm của thương hiệu áp dụng nguyên vẹn.

---

## 4. Phiên W1 — Sơ đồ trang và hành trình người đọc

### 4.1. Sơ đồ trang (phương án B, web riêng)

```
/                         Trang chủ Người Khai Vấn
├── /cau-chuyen           Câu chuyện: từ dược sĩ đến người khai vấn (trang tác giả)
├── /cach-toi-dong-hanh   Một buổi khai vấn với tôi diễn ra thế nào
├── /viet                 Bài viết, thư, ghi chép tu học
│   └── /viet/[bai]       Từng bài viết
├── /noi-chuyen           Video, bài nói, phỏng vấn
├── /sach                 Sách "Soi – Thấu – Chuyển" (đăng ký nhận tin)
├── /thu                  Nhận thư hằng tháng
├── /tro-chuyen           Gửi lời nhắn riêng (dữ liệu vào cùng hệ thống tiếp nhận của Trà thất)
├── /du-lieu              Cách web này giữ thông tin của bạn
└── /en                   Chỗ dành sẵn cho bản tiếng Anh (chưa làm)

Liên kết sang antammenh.com (bản gốc nằm ở đó):
/hien-chuong              Hiến chương (web Khai Minh chỉ trích Năm lời hứa và dẫn về bản gốc)
/phuong-phap              Phương pháp Soi – Thấu – Chuyển
/tra-that                 Đồng hành riêng
/cong-dong                Ngôi Nhà Khai Mệnh
```

**Nguyên tắc:** web Khai Minh kể **góc nhìn cá nhân** ("tôi làm việc thế nào"); antammenh.com trình bày **phương pháp và dịch vụ** một cách hệ thống. Hai web liên kết qua lại, không đăng trùng.

### 4.2. Ba hành trình người đọc

1. **Người đang mắc kẹt:** trang chủ → "Vì sao tôi không đoán số" → Năm lời hứa → Hiến chương trên antammenh.com → /thu (nhận thư) → sau vài thư mới vào cộng đồng.
2. **Người đứng trước quyết định lớn:** trang chủ → /cach-toi-dong-hanh → /cau-chuyen → /tro-chuyen hoặc Trà thất trên antammenh.com.
3. **Người tu học:** tìm kiếm Google một chủ đề → /viet/[bai] → nguồn kinh dẫn → /sach → cộng đồng.

### 4.3. Điều hướng

- **Thanh điều hướng:** Câu chuyện · Cách tôi đồng hành · Viết · Nói chuyện · Sách · nút "Trò chuyện riêng".
- **Chân trang:** liên kết An Tâm Mệnh; Hiến chương; an toàn (115, Đường dây nóng Ngày Mai); /du-lieu; thông tin pháp nhân; chữ ký "Người Khai Vấn (Khai Minh)".

---

## 5. Phiên W1 — Cấu trúc trang chủ từng khối

Mỗi khối ghi: **mục đích · nội dung · hình ảnh/video · hiệu ứng · ghi chú kỹ thuật**. Nội dung chữ ở đây mới là **hướng viết**; chữ thật viết ở Phiên W2 bằng giọng của anh.

### Khối 1 — Mở màn: "Ngồi xuống cùng tôi"
- **Mục đích:** trong 3 giây, người đọc thấy một con người thật và cảm thấy được mời ngồi xuống, không bị bán hàng.
- **Nội dung:** một câu mở bằng giọng anh, ví dụ hướng *"Tôi không nói trước đời bạn. Tôi ngồi cùng bạn để bạn tự thấy rõ mình."*; dưới đó là tên "Khai Minh — Người Khai Vấn" và một nút nhẹ "Đọc câu chuyện của tôi".
- **Hình/video:** video vòng lặp 8–12 giây, không tiếng: tay anh rót trà, hơi nước, ánh sáng chiều xiên qua cửa gỗ, nền sơn mài tối. Ảnh tĩnh làm khung chờ.
- **Hiệu ứng:** chữ hiện chậm theo từng dòng, như mực thấm. Tôn trọng chế độ "giảm chuyển động" của thiết bị.
- **Kỹ thuật:** ảnh khung chờ là phần tử LCP, tải ưu tiên, định dạng AVIF; video tải sau, không tự phát trên mạng chậm; không đặt video chiếm chỗ làm xô lệch bố cục.

### Khối 2 — "Tôi là ai"
- **Mục đích:** trả lời thẳng câu "người này là ai".
- **Nội dung:** đoạn văn ngắn ngôi thứ nhất, kèm **ba sự thật kiểm chứng được** đặt thành hàng: dược sĩ; khoảng 14 năm học cổ học Việt và Phật học; không tiên đoán, không bán lễ.
- **Hình:** chân dung tĩnh khổ dọc, ánh sáng một nguồn bên cạnh (kiểu Rembrandt), không chỉnh da quá đà.
- **Hiệu ứng:** không có; khối này phải tĩnh và vững.

### Khối 3 — "Vì sao tôi không đoán số"
- **Mục đích:** đây là **móc khác biệt** của cả trang, câu chuyện mà không thầy nào khác kể.
- **Nội dung:** một bước ngoặt có thật trong 14 năm của anh: một lần anh thấy lời phán làm khổ một người, rồi quyết định đổi cách làm. Kết bằng câu dẫn tới Kinh Phạm Võng và Hiến chương.
- **Hình:** ảnh chi tiết, như cuốn sổ ghi chép cũ có chữ viết tay của anh, hoặc trang kinh có ghi chú.
- **Hiệu ứng:** cuộn trang làm hiện dần từng đoạn, kiểu một trang hồi ký.

### Khối 4 — Cách tôi đồng hành: Soi, Thấu, Chuyển, Tốt nghiệp
- **Mục đích:** cho thấy có một con đường rõ ràng, có điểm kết thúc.
- **Nội dung:** bốn chặng, mỗi chặng một câu đủ ý; bên dưới là bốn tầng Cuốn, Dừng, Chuyển, An.
- **Hình:** minh họa vẽ tay trên nền sơn mài: mặt nước từ gợn sóng (Cuốn) lắng dần thành phẳng lặng (An).
- **Hiệu ứng (điểm nhấn thương hiệu):** khi cuộn, mặt nước trong minh họa lắng dần theo bốn tầng. Làm bằng CSS hoặc SVG nhẹ, không dùng thư viện 3D nặng.
- **Kỹ thuật:** hiệu ứng chỉ chạy khi khối vào màn hình; trên máy yếu thay bằng bốn ảnh tĩnh.

### Khối 5 — Năm lời hứa
- **Mục đích:** tạo cảm giác an trong 10 giây.
- **Nội dung:** Năm lời hứa trích nguyên từ bản một trang của Hiến chương, kèm đường dẫn "Đọc Hiến chương đầy đủ".
- **Hình:** không ảnh; chữ lớn trên nền giấy dó, mỗi lời hứa có một số thứ tự viết tay.
- **Hiệu ứng:** không có.

### Khối 6 — Một buổi khai vấn trông như thế nào
- **Mục đích:** gỡ nỗi lo "vào đó sẽ bị phán gì".
- **Nội dung:** mốc thời gian một buổi Soi 90 phút: chào hỏi và thỏa thuận; bạn tự trả lời bảng quan sát trước; đặt cạnh lá số; chỗ khớp và chỗ không khớp; một thực hành 21 ngày.
- **Hình:** 3–4 ảnh thật trong trà thất: bàn trà, sổ, bảng hỏi in giấy. Không có khuôn mặt khách.
- **Hiệu ứng:** dòng thời gian ngang, vuốt được trên điện thoại.

### Khối 7 — Lời của người đã đồng hành
- **Mục đích:** bằng chứng xã hội.
- **Điều kiện bắt buộc:** chỉ đăng khi có **đồng ý bằng văn bản**, dùng chữ viết tắt tên; không dùng câu chuyện "hợp đồng 3 tỷ".
- **Nếu chưa đủ lời chứng có đồng ý:** **bỏ hẳn khối này** khi ra mắt, không dùng lời chứng mẫu. Một khối trống tốt hơn một lời chứng giả.
- **Hình:** chữ viết tay của người đọc (chụp lại, có đồng ý) đáng tin hơn ảnh chân dung.

### Khối 8 — Viết và nói chuyện
- **Mục đích:** cho người tu học và người đọc lâu dài một lý do quay lại.
- **Nội dung:** 3 bài viết chọn lọc, 1 video nói chuyện, khối sách "Soi – Thấu – Chuyển" với nút đăng ký nhận tin.
- **Hình:** ảnh bìa bài viết chụp thật (đồ vật, thiên nhiên), không dùng ảnh minh họa AI.
- **Hiệu ứng:** thẻ bài viết nhích nhẹ khi rê chuột; trên điện thoại không có hiệu ứng.

### Khối 9 — Nền tảng: nguồn kinh và nhãn tin cậy
- **Mục đích:** thuyết phục người tu học và người hoài nghi.
- **Nội dung:** giải thích ngắn bốn nhãn tin cậy; ba nguồn kinh tiêu biểu với đường dẫn; một câu thừa nhận rằng chưa có nghiên cứu khoa học chứng minh cổ học đoán được vận mệnh, và rằng chúng tôi đang tự kiểm chứng.
- **Hình:** ảnh trang kinh hoặc kệ sách thật của anh.

### Khối 10 — Ba lối mời, ba mức cam kết
- **Mục đích:** để mỗi người chọn bước vừa sức mình, không bị ép.
- **Nội dung:**
  - Nhận thư hằng tháng (mức nhẹ nhất).
  - Vào cộng đồng Ngôi Nhà Khai Mệnh.
  - Trò chuyện riêng: trang /tro-chuyen, dữ liệu vào cùng hệ thống tiếp nhận của Trà thất. Ghi rõ mỗi tháng chỉ nhận tối đa 3 người mới, và anh trả lời trong ngày.
- **Hiệu ứng:** không có; nút rõ ràng, chữ đủ to cho người lớn tuổi.

### Khối 11 — Chân trang
- **Nội dung:** Hiến chương; thông tin an toàn (115, Đường dây nóng Ngày Mai 096 306 1414, sau khi đội đã xác minh); chính sách dữ liệu; thông tin pháp nhân; bút danh và chữ ký "Người Khai Vấn (Khai Minh)".

---

## 6. Phiên W1 — Nguyên tắc để web không mang dấu vết AI

| Dấu vết thường gặp | Cách tránh |
| --- | --- |
| Mở màn căn giữa, nền chuyển màu tím xanh, tiêu đề to kiểu "Mở khóa tiềm năng" | Bố cục lệch kiểu trang báo, nền sơn mài thật, câu mở bằng giọng nói riêng |
| Ba thẻ tính năng giống hệt nhau, mỗi thẻ một biểu tượng | Mỗi khối một hình thức riêng: đoạn hồi ký, dòng thời gian, chữ viết tay, minh họa nước |
| Ảnh dựng bằng AI: da quá mịn, tay lạ, ánh sáng giả | Chỉ dùng ảnh và video do nhiếp ảnh gia thật chụp; giữ hạt ảnh, giữ nếp nhăn |
| Câu chữ chung chung, nhiều tính từ, liệt kê ba thứ liên tục | Câu có chi tiết thật; ít tính từ; người biên tập đọc to từng câu |
| Phông Inter hoặc phông mặc định | Phông serif có dấu tiếng Việt được chọn kỹ, cỡ chữ và khoảng dòng tinh chỉnh tay |
| Hiệu ứng ở mọi nơi | Chỉ hai điểm nhấn chuyển động trên cả trang (mực thấm ở mở màn, mặt nước lắng ở khối 4) |
| Biểu tượng cảm xúc, mũi tên, kính mờ | Họa tiết vẽ tay, đường viền mảnh màu vàng sơn mài, số thứ tự viết tay |
| Mọi khối có cùng chiều cao, cùng khoảng cách | Nhịp thay đổi: khối dày, khối thưa, khoảng trắng lớn trước những câu quan trọng |
| Không có lỗi người nào | Có dấu vết con người: ghi chú bên lề, ngày tháng viết tay, một trang sổ chưa hoàn hảo |

**Bài kiểm tra cuối:** cho 5 người không biết dự án xem web trong 30 giây và hỏi *"Bạn nghĩ web này do ai làm?"*. Nếu có người nói "trông như AI làm", quay lại bảng này.

---

## 7. Phiên W1 — Nguyên tắc để Google đánh giá cao

### 7.1. Ngân sách hiệu năng (điện thoại tầm trung, mạng 4G)

| Chỉ số | Ngưỡng Google công bố phổ biến | Ngân sách nội bộ |
| --- | --- | --- |
| LCP | ≤ 2,5 giây | ≤ 2,0 giây |
| INP | < 200 ms | ≤ 150 ms |
| CLS | < 0,1 | ≤ 0,05 |
| Tổng JavaScript trang chủ | — | ≤ 120 KB sau nén |
| Ảnh mở màn | — | ≤ 120 KB, AVIF, kích thước khai báo sẵn |

### 7.2. Độ tin cậy (E-E-A-T) cho một tác giả dùng bút danh

- Trang /cau-chuyen là **trang tác giả**: ảnh thật, kinh nghiệm cụ thể, nguyên tắc làm việc, cách liên hệ.
- Mỗi bài viết có **khối tác giả** dẫn về trang này, có ngày viết và ngày cập nhật.
- Mọi khẳng định về kinh điển có **nguồn dẫn**; mọi khẳng định về khoa học có **nhãn tin cậy**.
- Hiến chương, chính sách dữ liệu và thông tin pháp nhân luôn cách trang chủ **một cú nhấp**.

### 7.3. Dữ liệu có cấu trúc (schema.org)

| Loại | Dùng ở đâu | Ghi chú |
| --- | --- | --- |
| Person | Trang chủ web Khai Minh | Tên "Khai Minh"; mô tả "Người Khai Vấn"; làm việc cho An Tâm Mệnh (trỏ sang Organization trên antammenh.com); chuyên môn; liên kết mạng xã hội chính thức. Dùng một mã định danh (@id) cố định để hai web cùng trỏ về |
| Organization | antammenh.com | An Tâm Mệnh, logo, liên hệ, pháp nhân; người sáng lập trỏ về Person của web Khai Minh |
| Article | Từng bài viết | Tác giả trỏ về Person |
| VideoObject | /noi-chuyen | Có ảnh đại diện, thời lượng, mô tả |
| Book | /sach | Chỉ thêm khi sách đã có thông tin xuất bản thật |

**Không** dựa vào hỏi đáp có cấu trúc (FAQ) để mong hiện kết quả nổi bật, vì từ năm 2023 Google chỉ hiển thị loại này cho một số ít trang chính phủ và y tế có thẩm quyền.

### 7.4. Nội dung và tìm kiếm

- Đường dẫn không dấu, ngắn, có nghĩa: /viet/tam-nong-la-gi.
- Mỗi trang một tiêu đề và mô tả riêng, viết cho người đọc, không nhồi từ khóa.
- Không sản xuất hàng loạt bài viết bằng AI để kéo lượt tìm kiếm; Google xếp đây vào hành vi lạm dụng nội dung số lượng lớn.
- Với kết quả tìm kiếm có AI tóm tắt, cách làm vẫn là nội dung gốc, có kinh nghiệm thật, có nguồn rõ ràng.
- Chuẩn bị sẵn cấu trúc đa ngôn ngữ (hreflang) cho bản tiếng Anh sau này.

### 7.5. Khả năng tiếp cận (WCAG 2.2, mức AA)

- Độ tương phản chữ đạt ít nhất 4,5:1. Màu vàng #C4973B trên nền sáng **không đạt** cho chữ thường, chỉ dùng cho chữ lớn hoặc đường trang trí.
- Cỡ chữ thân bài tối thiểu 18px; người đọc lớn tuổi là một nhóm khách quan trọng.
- Mọi video có phụ đề; mọi ảnh có mô tả thay thế bằng tiếng Việt.
- Toàn bộ trang dùng được bằng bàn phím; nút bấm đủ lớn cho ngón tay.

---

## 8. Các phiên tiếp theo và việc anh cần chuẩn bị ngay

### Việc anh nên làm trong tuần này
1. ~~Chốt phương án A hay B~~ — đã chốt B. Việc tiếp theo về hạ tầng là kiểm tra tên miền còn trống (khaiminh.vn, khaiminh.com, nguoikhaivan.vn).
2. **Bắt đầu tìm nhiếp ảnh gia** có kinh nghiệm chụp chân dung và đời sống, chụp ánh sáng tự nhiên. Xem portfolio và tránh người có phong cách chỉnh da quá mức.
3. **Ghi âm bản kể đầu tiên** (10–15 phút) theo ba câu hỏi:
   - Vì sao tôi bắt đầu học cổ học?
   - Lần nào tôi thấy một lời phán làm khổ người khác?
   - Một buổi khai vấn tốt với tôi là như thế nào?

### Đầu ra cụ thể của từng phiên sau

| Phiên | Đầu ra cụ thể |
| --- | --- |
| W2 | Chữ hoàn chỉnh cho trang chủ và các trang con; bộ quy tắc giọng văn; danh sách 50 câu cấm; mẫu khối tác giả |
| W3 | Bộ kiểu chữ (cỡ, khoảng dòng, độ đậm); bảng màu sơn mài có kiểm tra tương phản; lưới 12 cột cho máy tính và 4 cột cho điện thoại; hai hiệu ứng điểm nhấn có thông số |
| W4 | Danh sách 30–40 cảnh chụp; kịch bản 3 video (mở màn 10 giây, giới thiệu 90 giây, một buổi khai vấn 3 phút); chỉ dẫn ánh sáng và đạo cụ; quy chuẩn xuất file AVIF, WebM, MP4 |
| W5 | Bản dựng giao diện cho trang chủ và các trang con, cả máy tính và điện thoại |
| W6 | Tài liệu kỹ thuật: cấu trúc thư mục MDX, mã schema, ngân sách hiệu năng, kế hoạch đo lường tôn trọng Luật 91/2025 |
| W7 | Ứng dụng Next.js riêng trong kho mã chung, viết bằng Claude Code theo tài liệu W6; danh sách 60 điểm kiểm thử |
| W8 | Danh sách kiểm tra trước ra mắt; chỉ số theo dõi 90 ngày (lượt tìm thấy, thời gian đọc, tỉ lệ đăng ký thư, Core Web Vitals thật) |

— Hết Phiên W1 —

# Khai Minh · Đặt vẽ ảnh cánh cổng và việc cần làm trước khi lên mạng

Oct 8, 2026 · @Mr Hiếu

## Tài liệu này dùng để làm gì

Đây là tài liệu nội bộ, không đưa lên web. Nó dùng cho hai việc: đặt vẽ một bức ảnh riêng thay ảnh cánh cổng đang dùng tạm, và rà những việc còn thiếu trước khi trang Khai Minh lên mạng thật.

- Bản xem trước hiện tại: khai-minh-K1.9.14-trang-chu.html, một file, ảnh nhúng sẵn.
- Gói triển khai: khai-minh-web-trien-khai.zip, ảnh tách riêng, tên trang ngắn.
- Ảnh cánh cổng và ảnh nền vũ trụ hiện lấy từ Pinterest, không rõ tác giả. Không dùng hai ảnh này khi trang lên mạng thật.

## Brief cho hoạ sĩ

Bức ảnh kể một ý: bầu trời và mặt trời đã nằm sẵn bên trong một người, và người ấy chỉ cần ngồi yên để thấy. Một gương mặt nghêng nhìn sang phải; phần đầu chứa một cảnh bình minh: gốc bồ đề lớn, mặt trời đang lên phía sau, một người ngồi thiền bên mặt nước lặng.

| Yếu tố | Yêu cầu |
| --- | --- |
| Khổ ảnh | Dọc 9:16, tối thiểu 2304 × 4096 px |
| Bố cục | Gương mặt nghêng chiếm nửa phải, nhìn sang phải; nửa trái là cảnh bên trong |
| Nền | Đen ấm #050403 hoặc nền trong suốt; mép sạch, không răng cưa, không viền trắng |
| Mép trái và mép dưới | Cảnh tan dần vào nền tối, không cắt thẳng |
| Phong cách | Mềm như sơn mài: kem ngà, vàng ấm, vài chấm vàng như đom đóm; không bóng bẩy kiểu 3D |
| Người ngồi thiền | Người tại gia, áo nâu hoặc áo lam; ngồi nghêng nhìn về mặt trời |
| Bảng màu | Nền đêm #050403 · kem giấy #F5EFE1 · vàng đèn #E2C27A · son #9B3A33 |

Các hiệu ứng trên web bám vào năm điểm neo dưới đây, tính theo phần trăm chiều ngang và chiều dọc của ảnh. Hoạ sĩ nên giữ gần đúng các vị trí này.

| Điểm neo | Vị trí (ngang, dọc) | Hiệu ứng trên web |
| --- | --- | --- |
| Mặt trời trong lòng | 40%, 55% | Bình minh toả ra từ đây; lúc đêm là một đốm lửa thở chậm |
| Chấm giữa trán | 86%, 31% | Ánh sáng nhẹ theo nhịp thở |
| Chỗ đặt ngọn đèn | 39%, 65%, ngay bên trái người ngồi | Ngọn đèn khách thắp bay đến, vũng sáng loang trên mặt đất |
| Mặt nước trước người ngồi | 52%, 67% | Ba vòng gợn nước |
| Tán cây | 5–65% ngang, 10–55% dọc | Đom đóm bay lên |

Nếu bố cục mới lệch các điểm trên, chỉ cần đo lại toạ độ; trang web chỉnh theo trong vài phút.

## Những điều cần tránh

Ảnh phải là bản vẽ mới hoàn toàn, giữ ý tưởng nhưng không chép chi tiết của ảnh Pinterest.

- Không vẽ hào quang hay tia sáng quanh đầu. Ánh sáng chỉ đến từ mặt trời bên trong.
- Không để chữ, logo hay chữ ký hoạ sĩ trên ảnh.
- Người ngồi thiền không mặc cà sa, để khách tại gia thấy mình trong đó.
- Nếu giữ hình tượng Phật: gương mặt tôn nghiêm và trọn vẹn, không bị chữ đè lên. Nên hỏi ý một vị thầy hoặc luật sư về việc dùng hình tượng Phật trên trang của thương hiệu.
- Hợp đồng với hoạ sĩ ghi rõ chuyển giao quyền sử dụng cho web, in ấn và mạng xã hội, không giới hạn thời gian.

## Thông số giao file và cách thay vào web

Hoạ sĩ chỉ cần giao bản bình minh; bản đêm có thể tạo từ bản bình minh để hai bản khớp nhau tuyệt đối.

| File | Định dạng | Kích thước |
| --- | --- | --- |
| Bản gốc bình minh | PNG hoặc TIFF, nền trong suốt | 2304 × 4096 px |
| Bản web bình minh | WebP | 1152 × 2048 px, dưới 150 KB |
| Bản gốc đêm (không bắt buộc) | PNG hoặc TIFF | 2304 × 4096 px |

1. Đặt tên file là mo-cua-sang.webp, và mo-cua-dem.webp nếu có bản đêm.
2. Chép đè vào thư mục assets/img của gói triển khai, kèm bản nhỏ 720 px chiều ngang (mo-cua-sang-720.webp, mo-cua-dem-720.webp).
3. Chưa có bản đêm thì nhờ Claude tạo từ bản bình minh, giống cách đã làm với ảnh tạm.
4. Mở index.html và thử: thắp một ngọn đèn, xem đèn có đặt đúng cạnh người ngồi không. Lệch thì đo toạ độ mới và chỉnh lại.

## Việc cần xong trước khi lên mạng

Trang chưa nên lên mạng thật cho đến khi xong các mục dưới đây, nhất là bản quyền ảnh và các lời hứa có ràng buộc.

**Hình ảnh và âm thanh**

- [ ] Ảnh cánh cổng vẽ riêng, theo brief ở trên
- [ ] Ảnh nền vũ trụ phần mở đầu: thay hoặc mua bản quyền
- [ ] Ảnh chân dung khổ 4:5, ánh sáng cửa sổ, áo sáng màu
- [ ] Video rót trà 8–12 giây, ảnh trà thất, giọng đọc chậm khoảng ba phút

**Thông tin còn để khung trống**

- [ ] Email, Zalo, địa chỉ cụ thể
- [ ] Tên pháp nhân, mã số thuế, địa chỉ đăng ký, chủ sở hữu nhãn hiệu
- [ ] Số chứng chỉ hành nghề dược
- [ ] Ngày hiệu lực Hiến chương; ngày bắt đầu và kết thúc “hai năm đầu” không nhận tiền
- [ ] Các liên kết còn để trống: Câu chuyện, Hiến chương đầy đủ, Minh bạch lợi ích, Dữ liệu của bạn, mạng xã hội

**Nội dung cần anh xác nhận**

- [ ] Đoạn kể về quầy thuốc ở phần Người giữ những câu hỏi
- [ ] Các con số trong bốn lời hẹn: mười lăm phút, ba dòng nhật ký, vắng hai buổi, nhóm tám đến mười người
- [ ] Điều kiện vào Trà thất: đã qua Hồ sơ Soi
- [ ] Cam kết không nhận tiền, quà hay phong bì dưới bất kỳ tên gọi nào
- [ ] Trả lời góp ý Hiến chương trong bảy ngày
- [ ] Câu “lá thư chỉ dùng để trả lời bạn” khi đội vận hành cùng đọc thư
- [ ] Nguồn kinh trong Hiến chương, đối chiếu bản dịch của HT. Thích Minh Châu

**Pháp lý và kỹ thuật**

- [ ] Luật sư chốt số hiệu văn bản về dữ liệu cá nhân ở Điều 8
- [ ] Viết các trang chính sách: điều khoản, bảo mật, dữ liệu cá nhân, cookie, miễn trừ
- [ ] Nơi nhận thư cho form Gửi câu hỏi; form hiện mới là bản xem trước
- [ ] Chạy thử trên iPhone và Android thật, cả Safari và Chrome
- [ ] Chạy Bộ thử 20 người thật trên bản cuối

## Gói triển khai

Gói khai-minh-web-trien-khai.zip là một trang tĩnh, nặng 741 KB (nén còn 424 KB). Trang chủ nhẹ hơn khoảng 55% so với bản một file vì mọi ảnh đã tách ra ngoài.

| File | Vai trò | Dung lượng |
| --- | --- | --- |
| index.html | Trang chủ, bản K1.9.14 | 277 KB |
| cua-tam.html, cua-tri.html, cua-than.html | Ba trang cửa | 37–41 KB mỗi trang |
| chang-5.html | Trang chặng 5 | 40 KB |
| assets/img/mo-cua-dem.webp, mo-cua-dem-720.webp | Ảnh cánh cổng, bản đêm | 29 KB, 14 KB |
| assets/img/mo-cua-sang.webp, mo-cua-sang-720.webp | Ảnh cánh cổng, bản bình minh | 89 KB, 46 KB |
| assets/img/vu-tru.jpg, vu-tru-dien-thoai.jpg | Nền vũ trụ phần mở đầu | 58 KB, 69 KB |

- Đưa cả thư mục khai-minh-web lên bất kỳ hosting tĩnh nào (Vercel, Netlify, Cloudflare Pages) và giữ nguyên cấu trúc thư mục.
- Khi chuyển sang bản Next.js, chép thư mục assets vào public/ và giữ nguyên đường dẫn ảnh.
- Đã kiểm: không còn ảnh nhúng trong trang, mọi liên kết nội bộ dẫn đúng file, kiểm tra khả năng tiếp cận bằng axe cho kết quả 0 lỗi ở cánh cổng và trang chủ.

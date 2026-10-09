# Đặc tả bốn hiệu ứng sơn mài — web Người Khai Vấn
Tài liệu nội bộ · đi kèm nguoi-khai-van-ban-do-doi-nguoi-v2.html · 03/10/2026

## Nguyên tắc chung

- Mỗi hiệu ứng là **một công đoạn thật của nghề sơn mài Việt** và mang **một ý nghĩa của phương pháp**. Không có hiệu ứng nào chỉ để trang trí.
- **Mỗi lượt xem sinh một hạt giống ngẫu nhiên riêng**, nên bụi vàng, đường nứt vỏ trứng và vệt mài không bao giờ lặp lại giữa hai người xem.
- Không dùng thư viện ngoài, không dùng WebGL. Chỉ dùng Canvas 2D và SVG; vẽ lại khi có thay đổi, dừng hẳn khi đứng yên.
- Khi thiết bị bật "giảm chuyển động", mọi hiệu ứng chuyển sang trạng thái tĩnh và nội dung hiện ngay.

**Nói thật về chuyện "không thể sao chép":** mã chạy trên trình duyệt thì ai cũng xem được. Thứ bảo vệ hiệu ứng là: mỗi lượt xem một hình riêng; hiệu ứng gắn với chín chặng và Cuốn → An của riêng An Tâm Mệnh; và về sau gắn với **ảnh tấm sơn mài thật, chữ viết tay, giọng nói** của anh. Mã nguồn và tác phẩm hình ảnh được bảo hộ quyền tác giả.

## Hiệu ứng 1 — Rắc bột vàng dưới ánh đèn

| Mục | Đặc tả |
| --- | --- |
| Công đoạn thật | Rắc bột vàng, dát vàng lá lên mặt sơn |
| Ý nghĩa | Muốn thấy phải soi: vàng chỉ hiện ở nơi có ánh đèn |
| Hành vi | Bụi vàng phủ khắp màn mở đầu, gần như vô hình. Quanh "ánh đèn" bán kính khoảng 430px, các hạt bắt sáng theo góc; khoảng 3,5% là mảnh vàng lá lớn hơn |
| Điều khiển | Máy tính: đèn đi theo chuột, trễ mềm. Điện thoại: đèn theo ngón tay; trên máy Android, nghiêng máy thì đèn dịch theo (iPhone cần xin quyền, chưa bật) |
| Hiệu năng | Mật độ tối đa 3.600 hạt; chỉ vẽ lại khi đèn di chuyển; dừng khi đèn đứng yên |
| Khi có chất liệu thật | Lấy mẫu màu và kích thước hạt từ ảnh chụp tấm sơn mài thật |

## Hiệu ứng 2 — Khảm vỏ trứng

| Mục | Đặc tả |
| --- | --- |
| Công đoạn thật | Cẩn vỏ trứng: thợ ấn mảnh vỏ xuống lớp sơn còn ướt, vỏ nứt thành khảm |
| Ý nghĩa | Chặng đời bạn chọn là duy nhất; vết nứt cũng là một phần vẻ đẹp |
| Hành vi | Khi chọn một chặng, mảnh vỏ trứng ở chặng ấy phóng lớn và nứt thành khoảng 10 mảnh theo sơ đồ Voronoi sinh ngẫu nhiên; các mảnh tách nhẹ rồi nằm yên |
| Thông số | Đường nứt màu #24180F; thời gian 1 giây, mỗi mảnh trễ 40ms |
| Hạn chế hiện tại | Trên điện thoại (đường đời dọc) chưa có hiệu ứng này; cần làm ở vòng sau |

## Hiệu ứng 3 — Đường khảm sáng tới chặng của bạn

| Mục | Đặc tả |
| --- | --- |
| Công đoạn thật | Khảm chỉ vàng |
| Ý nghĩa | Quãng đời bạn đã đi qua |
| Hành vi | Đoạn đường vàng từ chặng 1 tới chặng được chọn sáng dần trong 1,6 giây; vệt sáng dừng tại chặng ấy |

## Hiệu ứng 4 — Mài sơn để thấy câu hỏi

| Mục | Đặc tả |
| --- | --- |
| Công đoạn thật | Mài: công đoạn làm nên tên gọi "sơn mài", mài lớp trên để lộ lớp màu bên dưới |
| Ý nghĩa | Diễn ý Tăng Chi Bộ 1.51: tâm vốn sáng, chỉ bị bụi từ bên ngoài che phủ |
| Hành vi | Câu hỏi của chặng nằm dưới một lớp sơn đen có vệt mài và bụi vàng. Người đọc lướt tay hoặc rê chuột để mài lộ lớp son đỏ bên dưới; khi lộ khoảng 42%, lớp sơn tự tan |
| Không làm khó người đọc | Tự tan sau 9 giây nếu không ai mài; người dùng bàn phím thấy ngay; chế độ giảm chuyển động không có lớp phủ; câu hỏi luôn có trong mã trang cho trình đọc màn hình |
| Điện thoại | Mài bằng thao tác vuốt ngang; vuốt dọc vẫn cuộn trang bình thường |

## Chất liệu thật sẽ nâng bốn hiệu ứng

1. **Ảnh chụp một tấm sơn mài thật**: dùng làm nền, làm mẫu bụi vàng, và làm lớp son bên dưới khi mài.
2. **Câu hỏi viết tay**: khi mài lộ ra là nét chữ của anh, không phải phông chữ.
3. **Âm thanh** (tùy chọn, mặc định tắt): tiếng mài rất nhẹ, tiếng vỏ trứng nứt, ghi âm thật trong xưởng sơn mài.

---

## Bổ sung bản v4 — Tiểu vũ trụ (03/10/2026)

### Nền vũ trụ
- Ảnh nền: ảnh 1 trong ba ảnh anh gửi (đơn sắc, nhiều khoảng tối). Đã giảm bão hòa, phủ sắc ấm theo bảng màu sơn mài; trên máy tính dùng dải ngang chứa mặt trăng và đường viền hành tinh, trên điện thoại dùng khung dọc.
- **Không dùng ảnh này khi ra mắt.** Ảnh lấy từ Pinterest, rất có thể dựng bằng AI, không rõ bản quyền, và chỉ rộng 853px nên bị mềm trên màn hình lớn. Khi ra mắt cần một ảnh vũ trụ thật có giấy phép, ít nhất 2560px chiều ngang; tốt nhất là đặt một nhà chụp ảnh thiên văn Việt Nam chụp trời đêm có Bắc Đẩu.
- Thị sai: lớp ảnh dịch nhẹ tối đa khoảng 11px ngược hướng tay, tạo chiều sâu giữa trời xa và bụi vàng gần.

### Hiệu ứng 5 — Trời xoay quanh điểm Tử Vi
| Mục | Đặc tả |
| --- | --- |
| Cơ sở | Tên Tử Vi lấy từ Tử Vi viên, vùng trời quanh sao Bắc Cực; hai sao Thiên Xu và Thiên Tuyền của Bắc Đẩu chỉ về sao Bắc Cực |
| Hành vi | Một ngôi sao sáng dịu đánh dấu điểm Tử Vi ở góc trên bên phải; Bắc Đẩu đặt đúng hướng chỉ về điểm ấy; toàn bộ bụi vàng và Bắc Đẩu xoay rất chậm quanh điểm Tử Vi, một vòng mất 40 phút như trời đêm thật |
| Hiệu năng | Vẽ tối đa 30 khung hình mỗi giây, chỉ khi màn mở đầu đang hiện và thẻ trình duyệt đang mở; tối đa 2.600 hạt |

### Hiệu ứng 6 — Muôn sao thu về một điểm sáng
| Mục | Đặc tả |
| --- | --- |
| Cơ sở | Kinh Rohitassa (Tương Ưng Bộ 2.26): thế giới, nguồn gốc, sự chấm dứt và con đường đều được chỉ ra ngay trong tấm thân dài chừng một sải tay, có tưởng và có tâm. Đây cũng là cấu trúc Tứ diệu đế |
| Hành vi | Phần cuộn dài 260% chiều cao màn hình; khung giữ cố định; khoảng 1.500 hạt sao xoáy dần về một điểm sáng khi cuộn; ba câu chữ lần lượt hiện và tan |
| Ý nghĩa điểm sáng | Nối với Tăng Chi Bộ 1.51 ở hiệu ứng mài sơn: tâm vốn sáng |
| Giảm chuyển động | Ba câu chữ hiện tĩnh, xếp dọc, không có hạt |

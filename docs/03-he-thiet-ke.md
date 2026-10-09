# 03 · Hệ thiết kế

Nguồn chuẩn là CSS trong `prototypes/*.html`. Tài liệu này tóm tắt để Claude Code chuyển sang Next.js mà không làm lệch. Khi tài liệu và bản mẫu khác nhau, **theo bản mẫu**.

## 1. Token màu (từ `:root` của `prototypes/index.html`)

| Nhóm | Biến | Giá trị | Dùng cho |
| --- | --- | --- | --- |
| Sơn mài tối | `--lac` / `--lac-2` / `--lac-red` | `#120E0B` / `#1B1510` / `#3A1410` | Nền các màn tối |
| Vàng | `--gold` / `--gold-hi` / `--gold-ink` / `--cream-gold` | `#C4973B` / `#E2C27A` / `#D9B76A` / `#E8D6AE` | Nút vàng, đường khảm, chữ trên nền tối |
| Chữ trên nền tối | `--on` / `--on-2` / `--on-3` | `#F4ECDD` / `#DCD0BA` / `#A89C88` | |
| Giấy | `--paper` / `--paper-2` / `--egg` | `#F5EFE1` / `#EDE5D3` / `#EFE6D2` | Nền phần đọc |
| Mực | `--ink` / `--ink-2` / `--body-ink` | `#1A1614` / `#5E554A` / `#3B342C` | Chữ trên giấy |
| Vàng chữ trên giấy | `--gold-text` | `#7C5A1E` | Liên kết, nhãn (đạt AA trên nền giấy) |
| Son | `--son` | `#9B3A33` | Dấu, nhấn |
| Thương hiệu mẹ | `--navy` / `--teal` | `#1A2F4E` / `#7DB8B2` | Dẫn sang An Tâm Mệnh |
| Nền đêm cánh cổng | (cổng) | `#050403` | Cổng |

**Cảnh báo tương phản:** không đặt `--cream-gold` lên nền giấy. Tỉ lệ tương phản chỉ 1,14:1; lỗi này đã được sửa một lần ở bản mẫu.

## 2. Nhận diện ba cửa (K1.9.16)

| Cửa | Chữ dấu | `--dc` (màu chính) | `--dc2` (sáng, cho nền tối) | Màu chữ trên giấy | Màu nền nhạt |
| --- | --- | --- | --- | --- | --- |
| Tâm | 心 | `#B8452F` | `#E58B73` | `#9B3A33` | `#F4E4DC` |
| Trí | 智 | `#4E78B5` | `#93B4E6` | `#355C94` | `#E1E8F3` |
| Thân | 身 | `#2F9A8F` | `#7FD3C8` | `#1F7A70` | `#DCEFEB` |

Màu cửa dùng nhất quán ở mọi nơi:
- thẻ cửa trên trang chủ (`.idd`, `.idd-tri`, `.idd-than`) và dấu `.idd-seal`;
- ô cửa trong Mục lục;
- dấu cửa đầu trang con (`dk-seal`);
- khối "Ngôi nhà này còn hai cánh cửa khác" (`dsw`), các chấm điều hướng;
- nhãn cửa trên mỗi bài viết.

Trong code, đặt màu cửa thành một map duy nhất `doors.ts`. Mọi thành phần lấy màu từ map này, không viết cứng mã màu.

## 3. Chữ

- Tiêu đề: Noto Serif (400, 500, 600, nghiêng 400). Thân bài: Be Vietnam Pro (300, 400, 500, 600). Tải bằng `next/font/google`, tập con `vietnamese` và `latin`, `display: swap`.
- Chữ Hán cho dấu và cửu cung: 心 智 身 開 明 và 胎 幼 少 立 中 轉 老 終 後. Chỉ tải đúng những chữ này, bằng tham số `text=` của Google Fonts hoặc dùng SVG. Không tải cả bộ Noto Serif SC. *(S1: tệp `app/fonts/noto-serif-sc-han.woff2` gồm 33 chữ Hán có trong `prototypes/*.html`, dùng qua biến `--han`. Thêm chữ Hán mới thì tải lại tệp này.)*
- Khoảng lề: `--pad: clamp(20px, 6vw, 96px)`. Đường cong chuyển động: `--ease: cubic-bezier(.22,1,.36,1)`.
- Chế độ "Aa Chữ lớn" (lớp `easy` trên `<html>`) phóng chữ thân bài và tắt hiệu ứng. Lưu lựa chọn vào `localStorage`.

## 4. Nhịp trang: từ tối ra sáng

Mỗi trang mở bằng một màn sơn mài tối, rồi một dải chuyển "vết mài" dẫn vào thân trang giấy sáng. Phần đọc dài luôn nằm trên nền giấy.

Trang chủ, theo đúng thứ tự trong bản mẫu (vòng số La Mã ở góc chỉ phần đang xem):

| Số | id | Phần | Nền |
| --- | --- | --- | --- |
| — | `.mz-*` | Cánh cổng mở đầu | Đêm sang bình minh |
| I | `openSec` | Chín chặng đời: câu mở, đường khảm vàng, cửu cung, trục "bạn đang lo cho ai", khung xem trước một chặng | Vũ trụ và sơn mài |
| II | `micro` | Tiểu vũ trụ: muôn sao thu về một điểm sáng (Kinh Rohitassa) | Tối |
| III | `ba-cua` | Ba cửa | Giấy |
| IV | `binh-minh` | Bốn giờ của một đêm | Chuyển sáng |
| V | `nguoi-giu` | Người giữ những câu hỏi: chân dung, câu chuyện quầy thuốc | Son |
| VI | `dong-hanh` | Con đường đồng hành, kèm `#loi-hen` (bốn lời hẹn) | Giấy |
| VII | `loi-hua` | Chín điều hứa (`#dieu-1` đến `#dieu-9`), `#khi-sai` | Giấy |
| VIII | `khoang-lang` | Ngồi lặng chín mươi giây | Sơn mài |
| IX | `gui-cau-hoi` | Gửi một câu hỏi | Giấy dó |
| — | `.ft` | Chân trang | Tối |

## 5. Cánh cổng mở đầu

**Ý nghĩa:** cánh cửa không mở ra nhà Khai Minh. Nó mở ra lòng người khách: một gốc cây, một mặt trời, một chỗ để ngồi yên.

**Luồng:**
1. **Đêm.** Hiện lời chào "Bạn đã mang câu hỏi ấy một mình đủ lâu rồi." và câu hỏi "Trước khi cửa mở, bạn thắp một ngọn đèn cho ai?". Có năm lựa chọn, cộng "Tôi muốn xem quanh nhà trước".
2. **Thắp đèn.** Ngọn đèn bay đến điểm neo bên cạnh người ngồi thiền.
3. **Bình minh.** Ánh sáng loang ra từ mặt trời trong lòng, qua mặt nạ tròn `--mzr` (khai báo bằng `@property` để chạy được hoạt ảnh). Mặt nước gợn ba vòng.
4. **Lời mở.** Hiện câu "Cánh cửa này không mở ra nhà tôi. Nó mở ra lòng bạn." và hai nút: "Mời bạn vào nhà" và "Đi thẳng tới chín chặng đời".

Lựa chọn "thắp đèn cho ai" được truyền xuống trục "bạn đang lo cho ai" của phần I.

**Ảnh:**
- Bản đêm: `assets/img/mo-cua-dem.webp` (1152×2048) và bản `-720`.
- Bản bình minh: `assets/img/mo-cua-sang.webp` (1152×2048) và bản `-720`.
- Dùng `srcset`, và preload bản phù hợp. **Cả hai đều là ảnh tạm** (xem docs/07, mục B1).

**Điểm neo**, tính theo % chiều ngang và chiều dọc của ảnh 1152×2048. Khi thay ảnh vẽ riêng thì đo lại các toạ độ này.

| Điểm | Toạ độ |
| --- | --- |
| Mặt trời trong lòng | 39,93% · 54,69% |
| Chấm giữa trán | 85,9% · 31,25% |
| Ngọn đèn | 39,24% · 65,23% |
| Vòng gợn nước | 52% · 67,2% |
| Vùng đom đóm | 5–65% ngang · 10–55% dọc |

**Trạng thái** (đặt lên phần tử gốc của cổng, luôn có tiền tố `mzs-`): `mzs-open`, `mzs-lamp`, `mzs-asked`, `mzs-dawn`, `mzs-rip`, `mzs-w1`, `mzs-w2`, `mzs-ready`, `mzs-out`, `mzs-static`.
**Phần tử** dùng tiền tố `mz-`: `mz-art`, `mz-stage`, `mz-flow`, `mz-lamps`, `mz-cup`, `mz-words`, `mz-polish`, `mz-sound`, `mz-hint`, `mz-bar` và các phần tử khác.

**Quy tắc cổng:**
- Chỉ có ở trang chủ, và chỉ hiện lần đầu trên mỗi máy. Lần sau vào thẳng trang. Luôn có nút "Vào thẳng trang".
- Ở chế độ tĩnh (`mzs-static`), cổng hiện ảnh bình minh, chữ và nút, không có chuyển động. Chế độ này bật khi `prefers-reduced-motion`, `lite` hoặc `easy`.
- Âm thanh mặc định tắt. Lựa chọn lưu ở `localStorage['km-sound']`.
- Cổng có focus trap; phím Esc tương đương nút "Vào thẳng trang". Khi cổng mở, các phần tử phía sau có `pointer-events: none` để không chặn nút.
- Laptop thấp (cao 720–768 px) có truy vấn `max-height` để thu gọn. Giữ nguyên truy vấn này.
- Phần chữ của trang chủ vẫn nằm trong HTML phía dưới cổng, để máy tìm kiếm đọc được.

## 6. Hiệu ứng sơn mài

Đặc tả đầy đủ ở `docs/nguon/dac-ta-hieu-ung-son-mai.md`. Có sáu hiệu ứng:
1. rắc bột vàng dưới ánh đèn;
2. khảm vỏ trứng;
3. đường khảm sáng tới chặng của bạn;
4. mài sơn để thấy câu hỏi;
5. trời xoay quanh điểm Tử Vi;
6. muôn sao thu về một điểm sáng.

Mỗi hiệu ứng là một client component nhỏ. Hiệu ứng phải tự tắt ở chế độ tĩnh và không chặn việc vẽ chữ.

## 7. Cửu cung và chín chặng

- Thứ tự ô: `[4,9,2,3,5,7,8,1,6]`. Ô số 5 có lớp `mid`.
- Mỗi ô có số chặng, chữ Hán (`HZ`) và tên chặng. Nhãn cho trình đọc màn hình: "Chặng n: tên".
- Dữ liệu lấy từ `content/chang/*.mdx`, không lấy từ mảng JS.

## 8. Khổ màn hình phải kiểm

360×800 · 390×844 · 768×1024 · 1280×720 · 1366×768 · 1440×900. Không được có thanh cuộn ngang ở bất kỳ khổ nào.

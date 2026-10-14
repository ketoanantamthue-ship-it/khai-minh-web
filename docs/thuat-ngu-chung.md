# Bộ thuật ngữ chung v1 — bốn web Khai Minh, An Tâm Mệnh, Khai Mệnh, Khai Tâm

Anh Khai Minh chốt bộ này ngày 14/10/2026 (docs/01, mục A5 và G). Nó thay bộ tên “sáu tâm” cũ và thang Cuốn · Dừng · Chuyển · An. Đây là tài liệu nội bộ. Mọi câu trong ngoặc kép bên dưới là chữ đã duyệt, được dùng nguyên văn cho khách.

Ba kho mã An Tâm Mệnh, Khai Mệnh và Khai Minh giữ cùng một bản của tệp này. Khi sửa ở một nơi, phải sửa cả hai nơi kia.

## 1. Sáu tánh hạnh

Nguồn: Thanh Tịnh Đạo (Visuddhimagga), chương III. Đây là một bộ tên duy nhất, xếp theo ba cặp song hành.

- **Thứ tự hiển thị:** Tham · Tín · Sân · Trí · Si · Tầm
- **Ba cặp:** Tham – Tín · Sân – Trí · Si – Tầm

### Cách gọi

- “Tánh tham” là khuynh hướng lâu dài, ví dụ “tánh tham đang trội hơn ở bạn”.
- “Tâm tham” là lúc nó khởi lên, ví dụ “khi tâm tham trỗi lên”.
- Không bao giờ viết “người tham”, “bạn là người sân”, và không gắn tên tánh lên ai sau một cú bấm.
- Một người thường có một hai tánh trội; các tánh khác vẫn có lúc khởi lên.
- Không dùng chữ “tâm trí” làm tên cho tánh trí, vì trùng với từ “tâm trí” thường ngày.

### Câu giải nghĩa

Dùng nguyên văn ở lần đầu tên xuất hiện trên một trang. Nếu đoạn văn tại chỗ đã nói đúng ý ấy, không cần lặp lại.

| Tánh | Câu giải nghĩa | Khoá trong mã |
| --- | --- | --- |
| Tham | “Tham là lúc lòng bạn thấy phải có thêm một điều nữa mới đủ.” | `tanh-tham` |
| Tín | “Tín là lúc lòng bạn dễ tin, dễ mến và muốn nương vào điều tốt đẹp.” | `tanh-tin` |
| Sân | “Sân là lúc lòng bạn bốc lên như nước sôi và muốn đẩy điều trước mặt ra xa.” | `tanh-san` |
| Trí | “Trí là lúc bạn muốn nhìn cho thấu và hỏi cho ra lẽ trước khi tin.” | `tanh-tri` |
| Si | “Si là lúc tâm bạn mờ đi và chưa thấy rõ điều đang xảy ra. Si không có nghĩa là kém cỏi.” | `tanh-si` |
| Tầm | “Tầm là lúc đầu óc bạn nghĩ tới nghĩ lui và khó dừng lại ở một điều.” | `tanh-tam` |

Khoá có tiền tố `tanh-` để không trùng với nhãn cửa `tam`, `tri`, `than`.

## 2. Thang bốn bậc của tâm: Mê · Tỉnh · Chuyển · An

| Bậc | Câu giải nghĩa | Gốc (chỉ ghi ở trang phương pháp, kèm nhãn tin cậy) | Khoá |
| --- | --- | --- | --- |
| Mê | “Mê là lúc tâm bị cuốn đi mà bạn chưa hay biết.” | Phóng dật | `thang-me` |
| Tỉnh | “Tỉnh là lúc bạn nhận ra và gọi được đúng tên điều đang khởi lên trong lòng.” | Kinh Niệm Xứ (Trung Bộ 10) | `thang-tinh` |
| Chuyển | “Chuyển là lúc bạn chọn một cách đáp khác, gieo một nhân lành thay cho thói quen cũ.” | Tứ chánh cần; Kinh An Trú Tầm (Trung Bộ 20) | `thang-chuyen` |
| An | “An là lúc lòng bạn lắng lại, nhẹ hơn và vững hơn trước.” | Khinh an, một trong bảy giác chi | `thang-an` |

Câu trung thực bắt buộc ở nơi giới thiệu thang như một phương pháp: “Thang bốn bậc là cách sắp xếp của Tổng Mệnh Học™, dùng những từ có trong kinh. Không có bài kinh nào liệt kê đúng bốn bậc này.”

Khoá có tiền tố `thang-` để không trùng với tầng `chuyen`.

## 3. Giữ nguyên, không đổi

- Sáu tầng nội dung: Chạm → Hiểu → Soi → Chuyển → Đồng hành → Tốt nghiệp (khoá `cham`, `hieu`, `soi`, `chuyen`, `dong-hanh`, `tot-nghiep`).
- Phương pháp công khai: Soi – Thấu – Chuyển. Tên hệ: Tổng Mệnh Học™.
- Khung buổi coach: Tứ Diệu Đế (Khổ – Tập – Diệt – Đạo), chỉ dùng trong tài liệu và khu làm việc của coach.

## 4. Từ đã thôi dùng

`npm run check:words` báo lỗi khi gặp các từ này:

- Tâm Ham, Tâm Tin, Tâm Nóng, Tâm Hiểu, Tâm Mơ, Tâm Nghĩ.
- Các cụm “Cuốn · Dừng”, “Cuốn – Dừng”, “Cuốn → Dừng”.
- “người tham”, “người sân”, “người si” (trừ “người tham gia”, “người sân khấu”…).

Người viết tự kiểm, vì script không bắt được: “Tự tại” khi dùng làm tên bậc.

Chữ “cuốn” và “dừng” trong câu văn thường vẫn dùng bình thường, ví dụ “cuốn sách”, “dừng lại”.

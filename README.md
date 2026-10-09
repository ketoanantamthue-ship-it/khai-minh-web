# Web Khai Minh: bộ hồ sơ bàn giao cho Claude Code

Đây là kho mã khởi đầu của web Khai Minh (Người Khai Vấn). Trong kho đã có:
- bản mẫu đã duyệt, kèm ảnh;
- toàn bộ tài liệu quyết định, đặc tả và nguồn;
- kho nội dung khởi đầu;
- bộ câu lệnh cho từng phiên.

Kho này **chưa có mã Next.js**. Phiên S0 sẽ dựng phần đó.

## Bước 1: Đọc bảng còn thiếu trước

Mở `docs/07-con-thieu-gi.md`. Có bốn mục nên chốt trước khi bắt đầu:
- **A1:** kho mã riêng hay chung với antammenh-web;
- **A9:** tên miền;
- **B1:** ảnh có bản quyền;
- **D5:** đã gọi thử Đường dây nóng Ngày Mai.

Chỉ **A1** chặn phiên đầu tiên. Các mục khác có thể làm song song.

## Bước 2: Đưa kho lên GitHub

1. Vào github.com, đăng nhập tài khoản đang giữ antammenh-web, chọn **New repository**.
2. Đặt tên `khai-minh-web`, chọn **Private**. Không tạo sẵn README.
3. Ở trang kho trống, bấm **uploading an existing file**. Kéo **toàn bộ nội dung bên trong** thư mục này vào: các tệp `CLAUDE.md`, `README.md`, `.gitignore` và các thư mục `docs`, `prototypes`, `content`, `data`, `prompts`. Không kéo chính thư mục ngoài cùng.
4. Bấm **Commit changes**.

## Bước 3: Mở Claude Code trên web

1. Vào **claude.ai/code**. Nếu được hỏi, cho phép Claude GitHub App truy cập kho `khai-minh-web`.
2. Chọn kho `khai-minh-web` và môi trường mặc định.
3. Mở `prompts/cac-cau-lenh-theo-phien.md`, chép câu lệnh **S0**, dán vào ô chat và gửi.
4. Khi Claude Code xong, nó sẽ mở một pull request. Anh xem bản xem trước, đồng ý thì bấm **Merge**.
5. Lặp lại với S1, S2… Mỗi phiên dùng một phiên chat mới.

## Bước 4: Nối Vercel (trong phiên S0)

Vào vercel.com, chọn **Add New → Project**, chọn kho `khai-minh-web` rồi **Deploy**. Trong mục Environment Variables, để `NEXT_PUBLIC_CHO_PHEP_LAP_CHI_MUC` bằng `false` cho tới ngày ra mắt.

## Những điều cần nhớ

- `prototypes/` và `data/` là tư liệu chỉ để đọc. Claude Code không sửa hai thư mục này.
- Ảnh cánh cổng và ảnh vũ trụ hiện là **ảnh tạm**. Bản build sẽ báo lỗi nếu anh bật lập chỉ mục khi chưa thay hai ảnh này.
- Mọi chỗ thiếu chữ đều được đánh dấu `CẦN`, không có chữ bịa.

# Hướng dẫn nối nơi nhận thư (phiên S5)

Lá thư “Gửi một câu hỏi”, ô “Nhận thư hằng tháng” và ô “Báo cho tôi khi sách ra đời” trên web gửi về một bảng tính Google, rồi Gmail báo cho anh. Mọi thứ chạy bằng tài khoản **khaivannguoi@gmail.com** và không tốn phí.

Đường đi của một lá thư:

```
Khách bấm gửi  →  web Khai Minh (Vercel) kiểm tra, chặn thư rác
               →  Apps Script của anh  →  ghi một dòng vào bảng tính
                                        →  gửi thông báo về khaivannguoi@gmail.com
                                        →  gửi thư xác nhận cho khách (nếu khách để lại địa chỉ)
```

Anh làm bảy bước dưới đây, mất khoảng hai mươi phút. Bước nào vướng, anh chụp màn hình gửi tôi.

---

## Bước 1. Tạo bảng tính

1. Đăng nhập Google bằng **khaivannguoi@gmail.com**. Nếu trình duyệt đang mở nhiều tài khoản, anh nên mở một cửa sổ ẩn danh để khỏi nhầm.
2. Vào địa chỉ **sheets.new**. Một bảng tính trống hiện ra.
3. Bấm vào chữ “Bảng tính không có tiêu đề” ở góc trên bên trái, đặt tên **Thư từ web Khai Minh**.

Anh chưa cần tạo trang nào. Bước 3 sẽ tự tạo hai trang “Thư” và “Danh sách nhận thư”.

## Bước 2. Dán mã Apps Script

1. Trong bảng tính, chọn menu **Tiện ích mở rộng → Apps Script** (tiếng Anh: *Extensions → Apps Script*). Một thẻ mới mở ra, có sẵn tệp `Mã.gs` (hoặc `Code.gs`) với vài dòng mẫu.
2. Bấm vào chữ “Dự án không có tiêu đề” ở trên cùng, đặt tên **Nơi nhận thư Khai Minh**.
3. Mở tệp mã trên GitHub: kho `khai-minh-web`, thư mục `apps-script`, tệp `Code.gs`. Bấm nút **Raw** để thấy mã trần, rồi bấm **Ctrl + A** (máy Mac: **Cmd + A**) và **Ctrl + C** để chép hết.
4. Quay lại Apps Script. Bấm vào ô mã, **Ctrl + A** rồi xóa những dòng mẫu, sau đó **Ctrl + V** để dán.
5. Bấm biểu tượng **đĩa mềm** (Lưu dự án), hoặc **Ctrl + S**.

## Bước 3. Chạy cài đặt một lần

1. Trên thanh công cụ, ô chọn hàm nằm cạnh nút **Chạy** (*Run*). Chọn **caiDat**.
2. Bấm **Chạy**. Google sẽ hỏi quyền vì mã cần ghi bảng tính và gửi thư:
   - bấm **Xem lại quyền** (*Review permissions*), chọn tài khoản khaivannguoi@gmail.com;
   - nếu hiện “Google chưa xác minh ứng dụng này”, bấm **Nâng cao** (*Advanced*), rồi **Đi tới Nơi nhận thư Khai Minh (không an toàn)**. Cảnh báo này hiện với mọi mã tự viết; đây là mã của chính anh, chạy trong tài khoản của anh;
   - bấm **Cho phép** (*Allow*).
3. Phía dưới hiện **Nhật ký thực thi** (*Execution log*) với ba dòng. Dòng cuối có dạng:

   ```
   Mã BI_MAT (chép sang Vercel, biến THU_BI_MAT): 3f9a…(64 ký tự)
   ```

   **Chép dãy 64 ký tự ấy** vào một chỗ tạm. Đây là mã bí mật dùng chung giữa web và Apps Script. Anh đừng gửi mã này qua chat hay email.
4. Quay lại thẻ bảng tính. Anh sẽ thấy hai trang mới ở dưới đáy: **Thư** và **Danh sách nhận thư**, mỗi trang có sẵn dòng tiêu đề. Trang “Trang tính1” trống có thể xóa.

Nếu lỡ đóng nhật ký, anh chạy lại **caiDat**. Hàm không tạo mã mới, chỉ in lại mã cũ.

## Bước 4. Triển khai thành ứng dụng web

1. Ở góc trên bên phải Apps Script, bấm **Triển khai → Tùy chọn triển khai mới** (*Deploy → New deployment*).
2. Bấm biểu tượng **bánh răng** cạnh “Chọn loại”, chọn **Ứng dụng web** (*Web app*).
3. Điền:
   - **Mô tả:** `Bản 1`
   - **Thực thi dưới dạng** (*Execute as*): **Tôi (khaivannguoi@gmail.com)**
   - **Người có quyền truy cập** (*Who has access*): **Bất kỳ ai** (*Anyone*)
4. Bấm **Triển khai**. Nếu Google hỏi quyền lần nữa, làm như bước 3.
5. Chép **URL ứng dụng web**. Địa chỉ có dạng `https://script.google.com/macros/s/…/exec`.

Vì sao chọn “Bất kỳ ai”: máy chủ Vercel gọi tới Apps Script mà không đăng nhập Google. Người lạ biết địa chỉ cũng không ghi được gì, vì thiếu mã bí mật thì Apps Script từ chối.

**Kiểm nhanh:** dán URL vừa chép vào trình duyệt. Trang hiện dòng “Nơi nhận thư của web Khai Minh đang chạy.” là đúng.

## Bước 5. Xem trước thư xác nhận (không bắt buộc)

Trong Apps Script, chọn hàm **guiThuThu** rồi bấm **Chạy**. Một thư mẫu tiêu đề “[Thử] Tôi đã nhận được lá thư của bạn” sẽ về hộp thư khaivannguoi@gmail.com. Đó chính là thư khách sẽ nhận.

## Bước 6. Đặt hai biến môi trường trên Vercel

1. Vào **vercel.com**, mở dự án **khai-minh-web**.
2. Chọn **Settings → Environment Variables**.
3. Thêm biến thứ nhất:
   - **Key:** `THU_APPS_SCRIPT_URL`
   - **Value:** URL ứng dụng web ở bước 4
   - **Environments:** đánh dấu cả **Production**, **Preview** và **Development**
   - bật **Sensitive** nếu có ô này
   - bấm **Save**
4. Thêm biến thứ hai, cũng đánh dấu cả ba môi trường và bật **Sensitive**:
   - **Key:** `THU_BI_MAT`
   - **Value:** dãy 64 ký tự ở bước 3

Khi lá thư đã bật, bản production của web sẽ **không chịu dựng** nếu thiếu hai biến này. Tôi đặt chốt ấy để không có ngày lá thư hiện trên web mà gửi không đi.

## Bước 7. Dựng lại bản xem trước và gửi thử

Biến môi trường chỉ có hiệu lực từ lần dựng sau, nên cần dựng lại một lần.

1. Trong Vercel, chọn thẻ **Deployments**. Tìm bản mới nhất của nhánh **claude/magical-pasteur-slznsm**.
2. Bấm dấu **⋯** ở cuối dòng, chọn **Redeploy**, rồi **Redeploy** lần nữa. Chờ khoảng ba phút.
3. Mở bản xem trước, thêm `/gui-cau-hoi` vào cuối địa chỉ.
4. Viết một lá thư thử, điền **một địa chỉ thư khác** của anh (để thấy thư xác nhận đi tới khách), đánh dấu ô đồng ý, bấm **Gửi thư cho Khai Minh**.
5. Kiểm bốn điều:
   - [ ] web chuyển sang trang “Tôi đã nhận được lá thư của bạn.”;
   - [ ] trang **Thư** của bảng tính có thêm một dòng;
   - [ ] khaivannguoi@gmail.com nhận thư “[Lá thư mới] …”; bấm **Trả lời** thì địa chỉ người nhận là địa chỉ khách;
   - [ ] địa chỉ thư kia nhận “Tôi đã nhận được lá thư của bạn”. Nếu không thấy, anh xem mục **Thư rác**.
6. Mở `/tri`, kéo xuống ô “Gửi thư cho tôi mỗi tháng”, điền địa chỉ, đánh dấu ô đồng ý và gửi. Trang **Danh sách nhận thư** phải có thêm một dòng.

Đủ bốn điều thì nhờ Claude Code đổi `noiNhanThu` trong `site.config.ts` thành `"/api/thu"`. Từ lúc ấy, lá thư và các ô nhận thư mới hiện ra ở web thật.

---

## Về sau

**Khi tôi sửa mã Apps Script.** Anh dán mã mới như bước 2, rồi chọn **Triển khai → Quản lý các bản triển khai** (*Manage deployments*), bấm biểu tượng **bút chì**, ở ô **Phiên bản** chọn **Phiên bản mới** (*New version*), bấm **Triển khai**. Làm như vậy thì URL giữ nguyên, Vercel không cần sửa gì. Nếu anh chọn “Tùy chọn triển khai mới” thì sẽ ra một URL khác.

**Khi mã bí mật bị lộ.** Trong Apps Script, chọn **Cài đặt dự án** (biểu tượng bánh răng bên trái), kéo xuống **Thuộc tính tập lệnh**, xóa `BI_MAT`, chạy lại **caiDat** để có mã mới. Sau đó sửa `THU_BI_MAT` trên Vercel và dựng lại.

**Hạn mức thư.** Gmail thường gửi tối đa khoảng 100 người nhận mỗi ngày. Mỗi lá thư có địa chỉ khách tốn hai lượt: một thông báo cho anh, một thư xác nhận. Khi hết lượt, lá thư vẫn được ghi vào bảng tính, chỉ thiếu thư báo. Vì vậy anh nên mở bảng tính mỗi ngày, đừng chỉ chờ Gmail.

**Chặn thư rác.** Web có ô bẫy ẩn và giới hạn mỗi người năm lần trong mười phút. Apps Script đếm thêm một lần nữa và chặn khi cả web vượt sáu mươi lá thư mỗi giờ.

**Ai được xem bảng tính.** Bảng tính chứa câu hỏi riêng của khách. Anh chỉ chia sẻ cho người giữ hộp thư (docs/07, mục F1), và không bật “Bất kỳ ai có đường liên kết”.

**Rút lại đồng ý, xin xóa thư.** Khi khách xin xóa, anh xóa dòng của họ trong bảng tính và thư trong Gmail, rồi trả lời khách rằng việc ấy đã xong. Khi khách không muốn nhận thư hằng tháng nữa, anh xóa dòng của họ ở trang **Danh sách nhận thư**.

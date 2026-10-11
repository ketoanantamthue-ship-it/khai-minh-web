# 09 · Cách thêm một bài mới

Tài liệu này dành cho đội viết. Nó đi từ một câu hỏi trong bảng lọc tới một bài được đăng trên web Khai Minh. Bạn không cần biết lập trình: mỗi bài chỉ là một tệp chữ, và thêm một tệp là web có thêm một trang.

Bài mẫu để nhìn theo: `content/hoi/bon-muoi-tuoi-du-day-sao-long-chua-yen.mdx` (câu Q001). Đây là bản nháp, chỉ hiện trên bản xem trước.

## 1. Bức tranh chung

| Bước | Ai làm | Việc | Bài đang ở trạng thái |
| --- | --- | --- | --- |
| 1 | Đội vận hành | Chấm câu hỏi trong bảng lọc, chọn câu có kết luận “Viết” | (chưa có tệp) |
| 2 | Người viết | Tạo tệp bài từ khuôn, viết theo khuôn mười bước | `ban-nhap` |
| 3 | Người viết | Xem bài trên bản xem trước, sửa cho tới khi đủ | `ban-nhap` |
| 4 | Người soát | Kiểm nguồn kinh và nhãn tin cậy, ghi tên mình | `da-soat` |
| 5 | Anh | Đọc lần cuối và cho đăng | `da-dang` |

**Quy tắc vàng:** chỉ bài `da-dang` mới lên web thật. Bài ở mọi trạng thái khác chỉ hiện trên bản xem trước, và luôn có dải “Bản nháp” ở đầu trang.

## 2. Chọn câu hỏi trong bảng lọc

Mở `data/bang-loc-cau-hoi-noi-dau.xlsx`, trang “Chấm câu hỏi”.

1. Chỉ viết câu có cột **Kết luận** là “Viết”.
2. Câu có điểm **An toàn** bằng 1 thì không viết bài tư vấn. Câu đó chỉ làm trang dẫn người đọc tới nơi hỗ trợ (115, Đường dây nóng Ngày Mai, bác sĩ, luật sư). Hãy hỏi anh trước.
3. Ghi lại ba thứ của câu đó:
   - **ID** ở cột A, ví dụ `Q001`;
   - **câu hỏi nguyên văn** ở cột D, giữ đúng từng chữ khách đã hỏi;
   - **địa chỉ gợi ý** ở cột Q, ví dụ `/hoi/bon-muoi-tuoi-du-day-sao-long-chua-yen`.
4. Đổi cột **Trạng thái** của câu thành “Đang viết”.

## 3. Tạo tệp bài

Mỗi loại bài có một thư mục trong `content/`, và mỗi thư mục có một tệp khuôn tên `_mau.mdx`. Tệp có tên bắt đầu bằng dấu gạch dưới không thành trang, nên bạn cứ chép thoải mái.

| Loại bài | Thư mục | Địa chỉ trên web |
| --- | --- | --- |
| Hỏi – đáp | `content/hoi/` | `/hoi/<tên-tệp>` |
| Từ điển | `content/tu-dien/` | `/tu-dien/<tên-tệp>` |
| Ngộ nhận | `content/ngo-nhan/` | `/ngo-nhan/<tên-tệp>` |
| Bài viết dài | `content/viet/` | `/viet/<tên-tệp>` |
| Thư hằng tháng | `content/thu/` | `/thu/<năm>-<tháng>`, ví dụ `/thu/2026-11` |
| Phương pháp | `content/phuong-phap/` | `/phuong-phap/<tên-tệp>` |

**Đặt tên tệp (slug):** lấy từ địa chỉ gợi ý trong bảng lọc. Nếu bảng chưa có, bạn tự đặt theo cách sau: viết thường, bỏ dấu, “đ” thành “d”, nối các chữ bằng gạch ngang, bỏ dấu câu. Tên nên ngắn và có nghĩa.

> “Bốn mươi tuổi, đủ đầy cả rồi, sao lòng vẫn chưa yên?” → `bon-muoi-tuoi-du-day-sao-long-chua-yen`

Tên tệp và trường `slug` bên trong phải giống hệt nhau, nếu không web sẽ báo lỗi. **Đã đăng rồi thì không đổi tên tệp nữa**, vì đổi tên là đổi địa chỉ, và mọi liên kết cũ sẽ gãy.

**Cách tạo tệp trên GitHub, không cần cài gì:**

1. Mở kho `khai-minh-web` trên GitHub, vào thư mục `content/hoi/`.
2. Mở `_mau.mdx`, bấm nút sao chép nội dung.
3. Quay lại thư mục, chọn **Add file → Create new file**, đặt tên `<slug>.mdx`, dán nội dung vào.
4. Ở cuối trang, chọn **Create a new branch** (tạo nhánh mới), đặt tên nhánh ngắn, rồi bấm **Propose new file**. GitHub sẽ mời bạn mở pull request: hãy mở, vì đó là cách để có bản xem trước.

Bạn cũng có thể nhờ Claude Code: “Tạo bài hỏi – đáp cho câu Q00x theo docs/09, để `ban-nhap`.”

## 4. Điền phần đầu tệp

Phần nằm giữa hai dòng `---` ở đầu tệp gọi là phần đầu. Mỗi dòng có dạng `tên: giá trị`. Chữ đặt trong ngoặc kép thẳng `"…"`; còn ngoặc kép cong “ ” là để dùng trong câu văn. Dòng bắt đầu bằng `#` là ghi chú cho đội viết, không hiện trên web.

### Ba nhãn (bắt buộc với mọi bài)

| Nhãn | Ghi thế nào | Ví dụ |
| --- | --- | --- |
| `chang` | số chặng từ 1 tới 9, hoặc `"cat-ngang"` cho năm hạn, nghi lễ và chủ đề không thuộc riêng chặng nào | `chang: 5` |
| `tang` | một trong sáu tầng: `cham`, `hieu`, `soi`, `chuyen`, `dong-hanh`, `tot-nghiep` | `tang: "hieu"` |
| `cua` | một hay nhiều cửa: `tam`, `tri`, `than` | `cua: ["tam"]` |

Thiếu một nhãn thì web không dựng được. Nhãn quyết định bài hiện ở đâu: trang câu hỏi của chặng (`/chang/<chặng>/hoi`), trang tầng (`/tang/hieu`) và trang cửa (`/cua/tam`). Những trang này tự cập nhật, bạn không phải sửa gì.

### Các trường của bài hỏi – đáp

| Trường | Là gì | Bắt buộc khi đăng |
| --- | --- | --- |
| `tieu_de` | **Bước 1.** Câu hỏi nguyên văn của khách | Có |
| `slug` | Tên tệp, không có `.mdx` | Có |
| `ma_cau_hoi` | ID trong bảng lọc, ví dụ `"Q001"`. Mỗi mã chỉ dùng cho một bài | Có |
| `tinh_canh` | **Bước 2.** Hai câu nói lại tình cảnh người đọc, để họ thấy mình được hiểu | Có |
| `tra_loi_ngan` | **Bước 3.** Trả lời thẳng trong **40–60 chữ**. Đây là đoạn Google và AI dễ trích nhất | Có |
| `nguon` | Danh sách nguồn (xem dưới) | Có |
| `muc_tin_cay` | Nhãn tin cậy chung của bài | Có |
| `ngay_viet` | Ngày viết, dạng `2026-11-02` | Có |
| `ngay_kiem_lai` | Ngày người soát **đã** đọc lại bài gần nhất (không phải ngày hẹn), dạng `2027-05-02` | Không |
| `nguoi_soat` | Tên người soát | Có |
| `trang_thai` | `ban-nhap`, `da-soat` hoặc `da-dang` | Có |
| `lien_quan` | Bài khác nên dẫn tới, ví dụ `["tu-dien/tam-tai"]` | Không |
| `mo_ta` | Câu mô tả cho Google, 120–155 ký tự. Bỏ trống thì web lấy đoạn trả lời ngắn | Không |
| `ghi_chu_noi_bo` | Ghi chú cho đội, không bao giờ hiện trên web | Không |
| `video` | Video YouTube đặt ở đầu bài (xem dưới) | Không |
| `am_thanh` | Bản ghi âm Khai Minh đọc bài, hiện dòng “Nghe Khai Minh đọc bài này” | Không |
| `anh_bia` | Ảnh đầu bài; cũng là ảnh hiện ra khi bài được chia sẻ | Không |

**Video, bản đọc, ảnh đầu bài** chỉ hiện khi bạn điền. Không điền thì trang không hiện gì, không có khung trống:

```
video: { id: "mã 11 ký tự", tieu_de: "…", loi_thoai: "…", ngay_dang: 2026-11-02, thoi_luong: "PT8M30S" }
am_thanh: { src: "/am-thanh/<slug>.mp3", thoi_luong: "8 phút" }
anh_bia: { src: "/assets/img/<tệp>.webp", alt: "Mô tả ảnh bằng tiếng Việt", chu_thich: "…" }
```

- Mã video là 11 ký tự sau `watch?v=` trong địa chỉ YouTube. Ngày đăng và thời lượng giúp Google hiểu video; thời lượng viết kiểu `PT8M30S` (8 phút 30 giây).
- Lời thoại hiện thu gọn dưới video, sau nút “Đọc lời trong video”, để người không xem được video vẫn đọc được. Hãy dán đủ lời thoại.
- Tệp ghi âm và ảnh đặt trong thư mục `public/` (nhờ Claude Code tải lên nếu cần); đường dẫn bắt đầu bằng `/`.
- `alt` là câu tả ảnh bằng tiếng Việt cho người không nhìn thấy ảnh. Thiếu `alt` thì ảnh không hiện.

**Nguồn**, mỗi nguồn một dòng:

```
nguon:
  - { ten: "Kinh Thiện Sinh, Trường Bộ 31", loai: "kinh", dien_y: true }
  - { ten: "Luận Ngữ 2.4", loai: "co-thu" }
```

- `loai`: `kinh`, `co-thu` (sách cổ), `sach`, `nghien-cuu`, `bao` hoặc `khac`.
- `dien_y: true` khi bạn không trích nguyên văn. Web sẽ ghi “(diễn ý)” sau tên nguồn.
- Có đường dẫn đọc được trên mạng thì thêm `url: "https://…"`.

**Nhãn tin cậy** hiện có bốn mức của bản mẫu: “Niềm tin truyền thống”, “Luận giải mệnh lý”, “Đang được nghiên cứu”, “Điều đã được kiểm chứng”. Thang đầy đủ của Chuẩn Chính Tín còn chờ chốt (docs/07, mục C6).

## 5. Viết thân bài theo khuôn mười bước

Bước 1, 2, 3 nằm ở phần đầu tệp. Bước 9 và 10 do web tự dựng. Thân bài là phần dưới dòng `---` thứ hai, và chỉ gồm **năm tiêu đề đúng chữ, đúng thứ tự**:

```
## Nhân quả nói gì

## Huyền học nói gì

## Khoa học nói gì

## Ba việc bạn làm được từ hôm nay

## Khi nào cần gặp bác sĩ, chuyên gia tâm lý hoặc luật sư
```

| Bước | Viết gì |
| --- | --- |
| 4. Nhân quả nói gì | Lời dạy có nguồn kinh. Không trích nguyên văn thì ghi “Diễn ý”. |
| 5. Huyền học nói gì | Nêu như một giả thuyết, không bao giờ như lời phán. **Luôn kèm nhãn tin cậy riêng.** |
| 6. Khoa học nói gì | Điều nghiên cứu đã biết hoặc còn đang tìm hiểu, kể cả góc nhìn của người dược sĩ. **Luôn kèm nhãn tin cậy riêng.** |
| 7. Ba việc bạn làm được từ hôm nay | Ba việc nhỏ, cụ thể, làm được trong một ngày. Đánh số `1.`, `2.`, `3.` |
| 8. Khi nào cần gặp bác sĩ, chuyên gia tâm lý hoặc luật sư | Dấu hiệu nào thì nên tìm người có chuyên môn. |
| 9. Câu hỏi liên quan | Web tự liệt kê các câu hỏi cùng chặng, cộng những bài bạn ghi trong `lien_quan`. |
| 10. Tác giả, ngày, nguồn | Web tự dựng từ phần đầu tệp. Mọi bài ký tên Người Khai Vấn (Khai Minh). |

Bước 5 và bước 6 mà thiếu thẻ `<NhanTinCay>` thì bài không đăng được.

Đầu mỗi bài, web tự hiện **thời gian đọc** và **mục lục nhỏ** dẫn tới năm tiêu đề trên. Bạn không phải viết gì thêm.

Giữa các đoạn văn để một dòng trống. Muốn in nghiêng thì bọc chữ bằng `*…*`, in đậm thì `**…**`.

### Các thẻ đặc biệt

| Thẻ | Dùng khi | Cách viết |
| --- | --- | --- |
| Lời trích | Trích lời kinh, có nguồn | `<Trich nguon="Diễn ý Kinh Thiện Sinh, Trường Bộ 31">` xuống dòng, lời trích, xuống dòng, `</Trich>` |
| Nhãn tin cậy | Ngay sau một đoạn huyền học hay khoa học | `<NhanTinCay chu="Niềm tin truyền thống" />` |
| Lời nhắc an toàn | Bài chạm tới sức khoẻ, ý nghĩ làm hại bản thân, pháp lý | `<LoiAnToan>` xuống dòng, lời nhắc, xuống dòng, `</LoiAnToan>` |
| Ô “Đang soạn” | Chỗ chưa viết được | `<DangSoan ma="C1" />` |
| Video YouTube | Một video đặt giữa bài | `<VideoYouTube id="mã 11 ký tự" tieuDe="…" loiThoai="…" />` |
| Bản đọc | Bản ghi âm đặt giữa bài | `<AmThanh src="/am-thanh/….mp3" thoiLuong="8 phút" />` |
| Ảnh | Một ảnh trong bài | `<Anh src="/assets/img/….webp" alt="Mô tả bằng tiếng Việt" chuThich="…" />` |
| Bảng soi ba lớp | Đặt nhân quả, khoa học, huyền học cạnh nhau | `<BangSoiBaLop nhanQua="…" tinCayNhanQua="…" khoaHoc="…" tinCayKhoaHoc="…" huyenHoc="…" tinCayHuyenHoc="…" />` |

Với nhãn tin cậy có chữ khác bốn mức trên, thêm màu: `lop="l1"` (vàng), `l2` (xanh ngọc), `l3` (đỏ son), `l4` (xanh lá).

Bốn thẻ cuối **không hiện gì khi thiếu dữ liệu** (thiếu mã video, thiếu tệp, thiếu `alt`, ô trống). Video chỉ hiện ảnh bìa; người đọc bấm vào mới tải trình phát của YouTube. Trong bảng soi ba lớp, ô nào có chữ thì nên có nhãn tin cậy của ô ấy.

### Chỗ còn thiếu

Không bịa chữ để lấp chỗ trống. Hãy để lại hai thứ:

```
{/* CẦN: ba việc làm được trong một ngày, chờ người viết (docs/07, mục C1). */}
<DangSoan ma="C1" />
```

Dòng `{/* CẦN: … */}` là ghi chú cho đội, không hiện trên web. Thẻ `<DangSoan>` hiện một khung nhỏ “Đang soạn” trên bản xem trước, để ai đọc cũng thấy chỗ còn thiếu. **Bài còn dấu CẦN thì không đăng được.**

## 6. Soát giọng văn

Trước khi gửi bài đi soát, đọc lại một lượt theo những điều sau:

- Xưng “tôi” và gọi người đọc là “bạn”.
- Mỗi câu có chủ ngữ và vị ngữ, không quá 25 chữ.
- Câu mở nói đúng tình cảnh người đọc, để họ thấy mình được hiểu rồi nhẹ đi. Không khoét sâu nỗi sợ.
- Dùng ngoặc kép cong “ ”.
- Không dùng “xem bói”, “thầy bói”, “số phận đã định”, “100%”. Viết “không thu phí” thay cho “miễn phí”. Danh sách đủ 50 câu cấm ở `docs/nguon/ban-thiet-ke-W2-giong-van-va-50-cau-cam.md`, mục 3.

Máy cũng quét giúp bạn: lệnh `npm run check:words` báo ✗ cho từ cấm (phải sửa) và ! cho chữ cần xem lại bằng mắt. Pull request nào còn ✗ thì không qua được bước kiểm tra tự động.

## 7. Xem bài trên bản xem trước

Mỗi pull request có một **bản xem trước** trên Vercel. Đường dẫn nằm trong phần bình luận của pull request, sau vài phút. Mở đường dẫn, thêm địa chỉ bài phía sau, ví dụ `…/hoi/bon-muoi-tuoi-du-day-sao-long-chua-yen`.

Trên bản xem trước, bạn sẽ thấy:

- dải **“Bản nháp”** ở đầu bài;
- các khung “Đang soạn” ở chỗ còn thiếu;
- bài đã có mặt trong trang câu hỏi của chặng, trang tầng và trang cửa, kèm nhãn “Bản nháp”.

Bản xem trước luôn chặn máy tìm kiếm, nên bài nháp không lọt ra ngoài.

**Muốn biết bài còn thiếu gì?** Lệnh `npm run kiem:bai` liệt kê từng bài, trạng thái của nó, và những phần còn thiếu trước khi đăng (người soát, nguồn, đủ năm tiêu đề, nhãn tin cậy của phần huyền học và khoa học, trả lời ngắn đủ 40–60 chữ, dấu CẦN…). Nếu bạn không tự chạy được lệnh, hãy nhờ Claude Code chạy và đọc kết quả cho bạn.

## 8. Soát bài

Người soát (cố vấn Phật học, docs/07 mục F2) làm ba việc:

1. Đối chiếu từng nguồn kinh với bản dịch, kiểm chữ “diễn ý” có đúng chỗ không.
2. Kiểm mỗi nhãn tin cậy có đúng mức không, và mọi điều huyền học đều được nêu như giả thuyết.
3. Điền vào phần đầu tệp:

```
nguoi_soat: "Tên người soát"
ngay_kiem_lai: 2026-11-10
trang_thai: "da-soat"
```

## 9. Đăng bài

Anh đọc lần cuối trên bản xem trước. Khi đồng ý, đổi `trang_thai: "da-dang"` rồi gộp pull request vào nhánh chính. Vài phút sau bài lên web thật, vào sitemap và được ghi ngày cập nhật.

Web **tự chặn** bài chưa đủ: khi `trang_thai` là `da-dang` mà bài còn thiếu người soát, nguồn, nhãn tin cậy, ngày viết, một trong năm tiêu đề, nhãn tin cậy riêng của phần huyền học hay khoa học, trả lời ngắn đúng độ dài, hay còn dấu CẦN, thì bước dựng web báo lỗi kèm tên tệp và danh sách phần thiếu. Bài thiếu không bao giờ lên được web thật.

Sau khi đăng, đổi cột **Trạng thái** trong bảng lọc thành “Đã đăng”.

## 10. Sau khi đăng

- Mỗi lần đọc lại và sửa bài, cập nhật `ngay_kiem_lai`. Google và AI dùng ngày này để biết bài còn mới.
- Không đổi tên tệp và `slug` của bài đã đăng.
- Muốn gỡ bài tạm thời, đổi `trang_thai` về `da-soat`. Bài biến khỏi web thật nhưng vẫn còn trên bản xem trước.

## 11. Các loại bài khác

Mọi loại bài đều có ba nhãn, `trang_thai`, `nguon`, `ngay_viet`, `nguoi_soat` và `lien_quan` như bài hỏi – đáp. Khác nhau ở các trường dưới đây; khuôn có sẵn trong `_mau.mdx` của từng thư mục.

| Loại | Trường riêng | Trang hiện gì trước |
| --- | --- | --- |
| Từ điển | `thuat_ngu`, `dinh_nghia` (một hai câu), `kinh_noi`, `dan_gian_noi`, `ngo_nhan` | Định nghĩa, rồi Kinh nói gì, Dân gian nói gì, Ngộ nhận |
| Ngộ nhận | `niem_tin` (viết như người đọc vẫn nghe), `su_that` | Sự thật trước, nguồn sau, kèm nhãn tin cậy |
| Bài viết dài | `tieu_de`, `tom_tat` | Đoạn tóm tắt, rồi thân bài |
| Thư hằng tháng | `tieu_de`, `ngay_gui`, `tom_tat` | Ngày gửi, tóm tắt, thân thư, các bài hỏi – đáp được nhắc |
| Phương pháp | `ten`, `dinh_nghia`, `ngay_cong_bo`, `phien_ban` | Định nghĩa, ngày công bố, phiên bản |

Với `kinh_noi`, `dan_gian_noi`, `ngo_nhan` và `su_that`, bạn ghi một đoạn trong ngoặc kép, hoặc nhiều đoạn dạng danh sách:

```
kinh_noi:
  - "Đoạn thứ nhất."
  - "Đoạn thứ hai."
```

## 12. Khi web báo lỗi

| Lời báo | Nghĩa là | Cách sửa |
| --- | --- | --- |
| `frontmatter sai schema` kèm tên một trường | Một trường thiếu, viết sai tên, hoặc sai dạng | Đối chiếu với `_mau.mdx`. Lỗi hay gặp: thiếu nhãn `cua`, viết `tang: "Hiểu"` thay cho `"hieu"` |
| `Unrecognized key` | Có một trường lạ, thường do gõ sai tên | Sửa đúng tên trường |
| `ngày ghi theo dạng 2026-11-02` | Một ngày viết sai dạng | Ghi năm-tháng-ngày, ví dụ `2026-11-02` |
| `slug “…” phải trùng tên tệp` | Tên tệp và `slug` khác nhau | Sửa cho giống hệt |
| `mã câu hỏi Q… đã dùng` | Hai bài cùng một mã | Kiểm lại ID trong bảng lọc |
| `bài đã đăng (da-dang) còn thiếu` | Bài đăng chưa đủ phần | Điền phần thiếu, hoặc trả về `da-soat` |
| Lỗi có chữ `Unexpected end of file` hoặc `expected a corresponding closing brace` | Thân bài có dấu `{` đứng một mình, hoặc dấu `<` dính liền chữ phía sau | Bỏ dấu `{` lẻ; viết “nhỏ hơn” thay cho dấu `<` |

Gặp lỗi khó hiểu, hãy chép nguyên lời báo gửi cho Claude Code và nhờ sửa.

# 04 · Nội dung và giọng văn

## 1. Giọng văn (bắt buộc với mọi chữ cho khách)

- Xưng "tôi" với người đọc là "bạn". Ký tên: **Người Khai Vấn (Khai Minh)**.
- Mỗi câu có chủ ngữ và vị ngữ, không quá 25 chữ. Không viết khẩu hiệu cụt hay câu lạnh lùng tối giản.
- Viết từ phía người đọc. Câu mở nói lại đúng tình cảnh của họ, để họ thấy mình được hiểu rồi nhẹ đi. Không khoét sâu nỗi sợ.
- Dùng ngoặc kép cong “ ”.
- Mọi khẳng định về kinh điển phải có nguồn và ghi "diễn ý" khi không trích nguyên văn. Mọi khẳng định về khoa học phải có nhãn tin cậy, kể cả bài dưỡng sinh.
- Huyền học chỉ được nêu như **giả thuyết**, không bao giờ là lời phán.
- Bộ quy tắc đầy đủ: `docs/nguon/ban-thiet-ke-W2-giong-van-va-50-cau-cam.md`, mục 2 (quy tắc) và mục 3 (50 câu cấm). Chuẩn chữ bổ sung: `docs/nguon/phan-bien-vong-2-huong-C.md`, mục 6.

**Từ cấm**, được quét bằng `npm run check:words`: "xem bói", "thầy bói", "số phận đã định", "miễn phí" (thay bằng "không thu phí"), "100%", cùng 50 câu ở W2 mục 3. Script quét `content/` và `components/`, và báo lỗi khi gặp từ cấm.

## 2. Ba nhãn cho mọi bài

| Nhãn | Giá trị |
| --- | --- |
| `chang` | `1` … `9`, hoặc `cat-ngang` (năm hạn, nghi lễ, chủ đề không thuộc riêng một chặng) |
| `tang` | `cham`, `hieu`, `soi`, `chuyen`, `dong-hanh`, `tot-nghiep` |
| `cua` | `tam`, `tri`, `than` (có thể nhiều giá trị) |

Bài nào thiếu nhãn thì không build được (schema zod báo lỗi).

## 3. Nhãn tin cậy

Bản mẫu đang dùng các giá trị: **"Niềm tin truyền thống"** và **"Đang được nghiên cứu"**. Thang đầy đủ thuộc bộ Chuẩn Chính Tín và chưa được chốt thành văn (xem docs/07, mục C6). Tạm thời schema chấp nhận chuỗi tự do, có cảnh báo khi giá trị lạ.

## 4. Schema frontmatter

### `content/chang/*.mdx` (đã có 9 tệp gốc)

```yaml
so: 5
slug: "tuoi-giua-doi"
ten: "Tuổi giữa đời"
han_tu: "中"
do_tuoi: "Từ ba mươi đến năm mươi tuổi"
khi_nao: "Khi mọi thứ đủ đầy, mà lòng vẫn trống"
cau_hoi_chinh: "…"
soi: "…"                 # đoạn "soi" nói lại tình cảnh người đọc
tra_loi: ["…", "…"]       # các đoạn trả lời
nguon: "Luận Ngữ 2.4"
loi_an_toan: "…"         # không bắt buộc: lời nhắc an toàn (chặng 3, 8, 9 theo bản mẫu)
muc_tin_cay: "Niềm tin truyền thống"
cau_hoi_lien_quan: ["…", "…", "…"]
cua: ["tam", "tri", "than"]
tang: "cham"
trang_thai: "ban-mau-chua-duyet"   # ban-nhap | ban-mau-chua-duyet | da-soat | da-dang
```

Phần thân MDX của trang chặng theo khuôn `prototypes/chang-5.html`, gồm:
1. năm tầng soi;
2. ba cánh cửa cho chặng;
3. "Bạn có thể đi sâu tới đâu" (sáu tầng);
4. câu hỏi khác ở chặng;
5. khối ba cửa;
6. gửi một câu hỏi.

*(Từ S2.)* Phần chữ riêng của trang chặng nằm trong trường `trang` của frontmatter (schema ở `lib/chang.ts`): `mo_ta`, `mo_dau`, `binh_minh`, `goi_ten`, `nam_tang` (đúng năm tầng), `ba_cua`, `di_sau` (đúng sáu dòng), `cau_hoi_khac`. Chặng nào chưa có trường này thì trang hiện phần seed và ô “Đang soạn” (docs/07, mục C2).

Chặng 5 lấy nguyên chữ từ bản mẫu. Tám chặng còn lại hiện chỉ có phần seed; phần sâu viết từ `data/truc-a/A{n}_*_DAO_SAU.md` và **phải được anh duyệt** trước khi đổi `trang_thai`.

### `content/hoi/*.mdx` — trang hỏi – đáp

```yaml
tieu_de: "Bốn mươi tuổi thấy trống rỗng, phải làm sao?"   # nguyên văn câu khách hỏi
slug: "bon-muoi-tuoi-thay-trong-rong"
chang: 5
tang: "hieu"
cua: ["tam"]
tra_loi_ngan: "…"          # 40–60 chữ, hiện ngay dưới tiêu đề
ma_cau_hoi: "Q003"         # khớp cột A của data/bang-loc-cau-hoi-noi-dau.xlsx
nguon: [{ ten: "Tăng Chi Bộ 1.51", loai: "kinh", dien_y: true }]
muc_tin_cay: "…"
ngay_viet: 2026-11-02
ngay_kiem_lai: 2027-05-02
nguoi_soat: "…"            # bắt buộc khi trang_thai = da-dang
trang_thai: "ban-nhap"
lien_quan: ["tu-dien/tam-tai", "hoi/…"]
```

**Khuôn chín bước của thân bài** (theo Chiến lược 2–10 năm):
1. Tiêu đề là câu hỏi nguyên văn của khách.
2. Hai câu nói lại tình cảnh người đọc.
3. Trả lời ngắn 40–60 chữ. Đây là đoạn AI dễ trích nhất.
4. Nhân quả nói gì: lời dạy có nguồn kinh, ghi rõ "diễn ý".
5. Huyền học nói gì: nêu như giả thuyết, có nhãn tin cậy.
6. Ba việc bạn làm được từ hôm nay.
7. Khi nào cần gặp bác sĩ, chuyên gia tâm lý hoặc luật sư.
8. Câu hỏi liên quan cùng chặng và các mục Từ điển.
9. Tác giả, ngày viết, ngày kiểm lại và nguồn.

### `content/tu-dien/*.mdx`

Gồm `thuat_ngu`, `slug`, `dinh_nghia` (1–2 câu, đặt đầu trang), `kinh_noi`, `dan_gian_noi`, `ngo_nhan`, `nguon`, `muc_tin_cay`, ba nhãn, `trang_thai`.

### `content/ngo-nhan/*.mdx`

Gồm `niem_tin`, `slug`, `su_that` (đặt trước), `nguon`, `muc_tin_cay`, ba nhãn, `trang_thai`. Tư liệu sẵn có: 238 niềm tin sai về cầm tướng (bản V3) và các bài nhân tướng. **Các tệp này không nằm trong gói** (xem docs/07, mục C5).

## 5. Quy trình từ câu hỏi đến bài đăng

1. Đội vận hành thu câu hỏi nguyên văn và chấm năm tiêu chí trong `data/bang-loc-cau-hoi-noi-dau.xlsx`.
2. Câu nào có kết luận "Viết" thì mở tệp `content/hoi/<slug>.mdx` với `trang_thai: ban-nhap` và `ma_cau_hoi` khớp bảng.
3. Viết theo khuôn chín bước, rồi chạy `npm run check:words`.
4. Người soát kiểm nguồn kinh và nhãn tin cậy, điền `nguoi_soat`, chuyển sang `da-soat`.
5. Anh duyệt và chuyển sang `da-dang`. **Chỉ bài `da-dang` mới được build ra trang công khai.** Bài ở trạng thái khác chỉ hiện trên bản xem trước.
6. Thứ tự viết: hai cụm thử trước (chặng 5 và năm hạn), mỗi cụm 15–20 bài, đăng đều mỗi tuần.

## 6. Chữ đã có sẵn và chữ còn thiếu

- **Đã có, đã soát giọng:** toàn bộ chữ trong `prototypes/` (trang chủ, ba cửa, chặng 5); phần seed của chín chặng trong `content/chang/`.
- **Còn thiếu:** xem docs/07, nhóm C. Không tự viết thay, mà đặt dấu `CẦN`.

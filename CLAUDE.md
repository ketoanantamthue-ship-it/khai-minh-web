# CLAUDE.md — Web Khai Minh (Người Khai Vấn)

Tệp này là quy tắc của dự án. Đọc hết trước khi làm bất cứ việc gì, ở mọi phiên.

## Dự án là gì

Web cá nhân của **Người Khai Vấn (Khai Minh)**. Mục đích: giúp người Việt tự soi và chuyển hoá tâm mình qua chín chặng đời, dựa trên Phật học và cổ học, và luôn nói thật mức tin cậy của từng điều.

- Web là **kho tri thức trung tâm**: trang trả lời câu hỏi đời người, từ điển, bài ngộ nhận và trang tác giả.
- Dịch vụ nằm ở antammenh.com. Công cụ lá số và khoá học nằm ở khaimenh.com. Web này chỉ dẫn sang hai nơi đó, không chép lại nội dung của chúng.
- Chủ dự án không phải lập trình viên. Khi cần anh quyết định, hãy giải thích bằng lời thường và đưa ra 2–3 phương án, kèm một khuyến nghị.

## Đọc theo thứ tự này

1. `docs/00-bat-dau-tu-day.md`: bản đồ của bộ hồ sơ
2. `docs/01-quyet-dinh-da-chot.md`: những gì đã chốt, và cách xử lý chỗ các tài liệu vênh nhau
3. `docs/06-lo-trinh-phien.md`: phiên này làm gì
4. Tài liệu của phiên đó: `02` sơ đồ trang, `03` hệ thiết kế, `04` nội dung, `05` SEO/GEO, `08` kiểm thử
5. `docs/07-con-thieu-gi.md`: những gì còn thiếu. Gặp chỗ thiếu thì tra ở đây, không tự bịa.

**Thứ tự ưu tiên khi các nguồn khác nhau:** `docs/01` → bản mẫu `prototypes/` (nguồn chuẩn về hình thức và chữ đã duyệt) → `docs/nguon/ban-cuoi-khai-minh-va-an-tam-menh.md` → các tài liệu khác trong `docs/nguon/`.

## Công nghệ

- Next.js (App Router), TypeScript ở chế độ strict, bản ổn định mới nhất.
- CSS thuần, chuyển từ bản mẫu sang (CSS Modules hoặc một tệp toàn cục cho token). Không thêm Tailwind hay thư viện giao diện khi chưa được hỏi, vì phong cách sơn mài của bản mẫu là CSS viết tay.
- Nội dung là MDX trong `content/`, có frontmatter được kiểm bằng schema (zod). Mọi trang nội dung được dựng sẵn thành HTML lúc build (SSG).
- Phông chữ qua `next/font`: Noto Serif cho tiêu đề, Be Vietnam Pro cho thân bài, có tập con `vietnamese`.
- Triển khai: Vercel. Bản xem trước luôn để `noindex`.
- Kiểm thử: Playwright và @axe-core/playwright. Kiểm tra kiểu và lint chạy trong CI.

## Cấu trúc thư mục đích

```
app/                 các route (xem docs/02)
components/          thành phần giao diện, mỗi phần của trang chủ là một thành phần
content/             MDX: chang/, hoi/, tu-dien/, ngo-nhan/, viet/, thu/
lib/                 đọc nội dung, schema, tiện ích SEO
public/assets/img/   ảnh (chép từ prototypes/assets/img)
prototypes/          bản mẫu HTML gốc: CHỈ ĐỌC, không sửa
docs/                hồ sơ dự án
data/                ngân hàng câu hỏi và tư liệu: CHỈ ĐỌC
tests/               Playwright và axe
```

## Mười hai quy tắc không được phá

1. **Chữ cho khách viết bằng tiếng Việt, ấm áp và đầy đủ câu.** Xưng "tôi" và "bạn". Câu có chủ ngữ và vị ngữ, không quá 25 chữ, dùng ngoặc kép cong “ ”. Không viết khẩu hiệu cụt hay câu lạnh lùng tối giản. Viết từ phía người đọc để họ thấy mình trong đó.
2. **Không tự viết nội dung mới cho khách.** Chỉ dùng chữ có trong bản mẫu, trong `content/` hoặc trong `docs/nguon/`. Chỗ còn thiếu thì đặt dấu `{/* CẦN: … */}` trong MDX, hoặc `data-can="…"` trong JSX, rồi ghi vào `docs/07`. Không dùng lorem ipsum.
3. **Ghi chú nội bộ không bao giờ hiện cho khách.** Nhãn làm việc, việc còn treo và tên phiên chỉ được nằm trong `docs/` hoặc chú thích mã.
4. **Không bỏ phần nào đã chốt.** Khi dựng lại một trang, giữ đủ các phần của bản mẫu. Muốn bỏ hay gộp phần nào thì hỏi trước.
5. **Có những từ không bao giờ dùng:** "xem bói", "thầy bói", "số phận đã định", "100%". Viết "không thu phí" thay cho "miễn phí". Danh sách đầy đủ 50 câu cấm nằm ở `docs/nguon/ban-thiet-ke-W2-giong-van-va-50-cau-cam.md`, mục 3. Kiểm tra tự động bằng `npm run check:words`, script này cần viết ở phiên S0. Script chỉ quét chữ hiển thị và MDX, bỏ qua CSS (ví dụ `width:100%`).
6. **Mỗi màn hình chỉ có một nút vàng, mỗi trang chỉ có một lời mời chính.** Mọi lối khác là liên kết chữ.
7. **Mỗi bài mang đủ ba nhãn:** chặng (1–9 hoặc `cat-ngang`), tầng (`cham`, `hieu`, `soi`, `chuyen`, `dong-hanh`, `tot-nghiep`), cửa (`tam`, `tri`, `than`).
8. **Chữ phải nằm sẵn trong HTML.** Nội dung không được chỉ hiện ra khi chạy JavaScript; máy tìm kiếm và AI phải đọc được. Hiệu ứng thì có thể là client component, còn chữ thì luôn render phía server.
9. **Cánh cổng mở đầu chỉ có ở trang chủ.** Khách đã qua cổng một lần thì lần sau không hiện lại (lưu trong `localStorage`, bọc `try/catch`). Không có cổng ở trang bài viết. Chế độ tĩnh luôn có sẵn.
10. **Đáp ứng chuẩn truy cập:** axe báo 0 lỗi; tương phản đạt AA. Khi `prefers-reduced-motion` bật, hoặc ở chế độ "Chữ lớn" (`easy`) hay "nhẹ" (`lite`), mọi hiệu ứng chuyển sang tĩnh. Cổng có focus trap và thoát được bằng phím Esc.
11. **Tên lớp CSS phải có tiền tố riêng.** Lớp trạng thái không được trùng tên với lớp phần tử; đây là lỗi đã xảy ra nhiều lần ở bản mẫu. Trạng thái cổng dùng `mzs-*`, phần tử cổng dùng `mz-*`.
12. **Chưa ra mắt thì không lập chỉ mục.** Biến môi trường `NEXT_PUBLIC_CHO_PHEP_LAP_CHI_MUC` đặt `false` thì toàn trang `noindex` và robots chặn. Chỉ anh mới bật biến này.

## An toàn và pháp lý

- Mọi trang có chân trang ghi số 115 và Đường dây nóng Ngày Mai. Số Ngày Mai lấy từ cấu hình `site.config.ts`. Cờ `hotlineDaXacNhan` phải là `true` thì số mới hiện ra; đội vận hành cần gọi thử và xác nhận giờ hoạt động trước khi bật.
- Ảnh cánh cổng và ảnh nền vũ trụ hiện là **ảnh tạm lấy từ Pinterest**. Đánh dấu cả hai là ảnh tạm trong `site.config.ts`; bản build production phải báo lỗi nếu còn ảnh tạm mà cờ lập chỉ mục đang bật.
- Không đặt sản phẩm hay việc bán hàng cạnh bài tâm linh. Không nối dưỡng sinh với lá số.
- Các trang chính sách (điều khoản, bảo mật, dữ liệu cá nhân, cookie, miễn trừ) chỉ dựng khung. Phần chữ pháp lý chờ luật sư.

## Cách làm một phiên

1. Đọc `docs/06` để biết phiên hiện tại và tiêu chí xong.
2. Làm trên một nhánh riêng, đặt tên `phien/S<số>-<tên-ngắn>`.
3. Cuối phiên chạy `npm run lint && npm run typecheck && npm run build && npm run test`. Mọi bước phải qua.
4. So hình với bản mẫu ở các khổ 390×844, 768×1024 và 1366×768. Chụp ảnh màn hình vào `tests/__screens__/`.
5. Cập nhật `docs/07`: đánh dấu việc đã xong và thêm chỗ thiếu mới phát hiện.
6. Viết commit message bằng tiếng Việt, ngắn và rõ. Mở pull request kèm tóm tắt cho anh đọc, viết bằng lời thường, không dùng thuật ngữ.

## Lệnh

```
npm run dev          chạy thử
npm run build        dựng bản production
npm run lint         kiểm tra mã
npm run typecheck    kiểm tra kiểu
npm run test         Playwright và axe
npm run check:words  quét từ cấm trong content/ và components/
```

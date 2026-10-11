# Bắt đầu từ đây — bản đồ bộ hồ sơ web Khai Minh

Bộ hồ sơ này gom mọi thứ đã làm cho web Khai Minh tới ngày 09/10/2026, để dựng thành web thật bằng Claude Code. Đây là tài liệu nội bộ, không đưa lên web.

## Có gì trong kho

| Thư mục / tệp | Là gì | Ai dùng |
| --- | --- | --- |
| `CLAUDE.md` | Quy tắc dự án, Claude Code tự đọc mỗi phiên | Claude Code |
| `README.md` | Hướng dẫn cho anh: đưa lên GitHub, mở Claude Code | Anh |
| `docs/01-quyet-dinh-da-chot.md` | Những điều đã chốt và cách xử lý các chỗ vênh giữa tài liệu | Cả hai |
| `docs/02-so-do-trang-va-duong-dan.md` | Toàn bộ trang, đường dẫn, lời mời chính, trạng thái | Claude Code |
| `docs/03-he-thiet-ke.md` | Màu, chữ, ba cửa, cánh cổng, hiệu ứng, chế độ tĩnh | Claude Code |
| `docs/04-noi-dung-va-giong-van.md` | Giọng văn, từ cấm, ba nhãn, khuôn trang, schema frontmatter | Claude Code, đội viết |
| `docs/05-seo-geo-ky-thuat.md` | Việc kỹ thuật để Google và AI đọc được | Claude Code |
| `docs/06-lo-trinh-phien.md` | Tám phiên dựng web, tiêu chí xong của từng phiên | Cả hai |
| `docs/07-con-thieu-gi.md` | **Bảng rà soát còn thiếu**: quyết định, chất liệu, pháp lý, kỹ thuật | Anh trước tiên |
| `docs/08-kiem-thu.md` | Tiêu chí nghiệm thu | Claude Code |
| `docs/09-cach-them-bai-moi.md` | Cách thêm một bài mới, từ câu hỏi trong bảng lọc tới bài được đăng | Đội viết |
| `docs/nguon/` | Tài liệu gốc: Bản cuối, chiến lược 2–10 năm, Hiến chương, hệ nhận diện, chín chặng, giọng văn W1/W2, hiệu ứng sơn mài, brief hoạ sĩ | Tra cứu |
| `prototypes/` | Bản mẫu HTML K1.9.16 đã duyệt: trang chủ, ba trang cửa, trang chặng 5, kèm ảnh | Nguồn chuẩn về hình thức |
| `content/chang/` | Chín tệp MDX gốc cho chín chặng, tách từ bản mẫu | Điểm khởi đầu của kho nội dung |
| `data/` | Ngân hàng câu hỏi (bảng tính), chín tệp đào sâu Trục A, bảng lọc câu hỏi nỗi đau | Nguồn để viết bài |
| `prompts/cac-cau-lenh-theo-phien.md` | Câu lệnh dán vào Claude Code cho từng phiên | Anh |

## Mở bản mẫu để xem

Mở `prototypes/index.html` bằng trình duyệt. Ảnh nằm ở `prototypes/assets/img/`, đường dẫn tương đối, nên mở trực tiếp vẫn chạy.

## Ba điều nên biết trước

1. **Bản mẫu đẹp nhưng chưa phải web thật.** Chữ chín chặng đang nằm trong JavaScript, nhiều liên kết còn để "#", form chưa gửi được thư. Phiên S1–S5 sẽ sửa những điểm này.
2. **Web có thể dựng xong trước khi ra mắt.** Theo Bản cuối, web chỉ ra mắt khi đủ ba điều kiện: có ý kiến luật sư, có chất liệu thật, và đợt chạy thử đã bắt đầu. Trong lúc đó, bản xem trước luôn để `noindex`.
3. **Có những việc chỉ anh làm được.** Xem `docs/07`, nhóm A và B. Có mục chặn một phiên cụ thể, nên cần xong trước phiên đó.

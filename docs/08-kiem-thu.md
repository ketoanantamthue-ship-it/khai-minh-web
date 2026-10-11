# 08 · Tiêu chí nghiệm thu

Mỗi phiên chỉ được coi là xong khi đạt các mục dưới đây cho mọi trang mà phiên đó dựng.

## 1. Tự động (chạy trong CI bằng `npm run test`)

| Kiểm tra | Ngưỡng |
| --- | --- |
| Build, lint, typecheck | Không có lỗi |
| axe (@axe-core/playwright) | 0 vi phạm, ở cả cổng và trang chủ, mỗi trang con, ở khổ 390 và 1366 |
| Liên kết nội bộ | Không có `href="#"`, không có liên kết gãy (Playwright duyệt sitemap) |
| Từ cấm | `npm run check:words` sạch |
| Không cuộn ngang | `document.documentElement.scrollWidth <= innerWidth` ở các khổ 360, 390, 768, 1280, 1366, 1440 |
| Không cần JS vẫn đọc được | Với `javaScriptEnabled: false`: trang chủ có đủ tên và câu hỏi của 9 chặng; trang bài có tiêu đề, phần trả lời ngắn và nguồn |
| Chế độ tĩnh | Với `reducedMotion: 'reduce'`: cổng ở `mzs-static`, không có hoạt ảnh nào chạy quá 0,01 giây |
| Luồng cổng | Lần đầu: cổng hiện → chọn "Cho chính tôi" → tới bình minh → bấm "Mời bạn vào nhà" → trục "bạn đang lo cho ai" đã chọn sẵn. Lần thứ hai: cổng không hiện. Phím Esc đóng được cổng. |
| Cờ lập chỉ mục | Khi tắt: có thẻ `noindex` và robots chặn. Khi bật mà còn ảnh tạm: build báo lỗi. |
| Trạng thái bài | Bài không phải `da-dang` không có trong sitemap và không build ra ở production |
| JSON-LD | Hợp lệ theo schema.org; tên và ảnh của Person khớp trang `/khai-minh` |

## 2. So hình với bản mẫu

Chụp từng phần ở các khổ 390×844, 768×1024 và 1366×768, đặt cạnh ảnh chụp bản mẫu tương ứng. Màu, chữ và khoảng cách phải khớp. Khác biệt nào cố ý thì ghi lý do trong pull request.

## 3. Hiệu năng (Lighthouse, giả lập điện thoại)

Đạt các ngưỡng LCP, CLS, INP và dung lượng JS ở docs/05 mục 2. Dung lượng JS của trang con (dưới 160 KB đã nén) được kiểm tự động trong `tests/ra-soat-s4b.spec.ts`; đo tay cả LCP, CLS và JS bằng `node scripts/do-toc-do.mjs` khi một bản đang chạy ở cổng 3100. Điểm Accessibility và SEO của Lighthouse phải đạt 100. Điểm Performance từ 90 trở lên cho trang bài; trang chủ có cổng thì từ 80 trở lên.

## 4. Bằng tay (phiên S6)

- iPhone thật với Safari, Android thật với Chrome: thử cổng, cửu cung, mài sơn, form, chế độ Chữ lớn.
- Đọc lại chữ của mỗi trang theo danh sách kiểm tra ở W2 mục 7.
- Chạy Bộ thử 20 người thật trên bản xem trước cuối cùng.

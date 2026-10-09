# 05 · SEO, GEO và nền kỹ thuật

**Nguyên tắc:** SEO và GEO dùng chung một kho bài. Theo Google, không có yêu cầu hay đánh dấu riêng nào để xuất hiện trong AI Overviews và AI Mode. Một trang tốt với SEO nền tảng là đủ. Không ai hứa được thứ hạng; các việc dưới đây chỉ tăng xác suất được tìm thấy.

## 1. Bắt buộc ở phiên S3

| Việc | Chi tiết |
| --- | --- |
| Render sẵn HTML | Mọi trang nội dung dựng bằng SSG; chữ có trong HTML mà không cần chạy JS. Kiểm tra bằng cách tắt JS rồi xem trang. |
| Metadata | `generateMetadata` cho từng route: tiêu đề tối đa khoảng 60 ký tự, mô tả 120–155 ký tự, viết bằng giọng ấm. Một `<h1>` cho mỗi trang. |
| Canonical | Mỗi trang một địa chỉ gốc. Bài đăng lại ở nơi khác phải trỏ canonical về đây. |
| Sitemap | `app/sitemap.ts` chỉ liệt kê trang công khai và bài `da-dang`, có `lastModified` lấy từ `ngay_kiem_lai` hoặc `ngay_viet`. |
| Robots | `app/robots.ts`: khi cờ lập chỉ mục tắt thì chặn tất cả; khi bật thì cho phép, **gồm cả các bot AI** (GPTBot, Google-Extended, PerplexityBot, ClaudeBot), vì mục tiêu là được AI biết đến. |
| JSON-LD | `Person` (Khai Minh; `sameAs` là các kênh chính thức), `Organization` (An Tâm Mệnh), `WebSite`, `Article` cho bài, `BreadcrumbList`. Dữ liệu phải khớp chữ trên trang. Không dùng FAQPage để mong hiển thị đặc biệt, vì Google đã bỏ kết quả FAQ từ 7/5/2026. |
| Đường dẫn | Viết thường, không dấu. Các chuyển hướng 301 ở docs/02 đặt trong `next.config`. |
| Ảnh | `next/image`, có `alt` mô tả bằng tiếng Việt, kích thước rõ ràng, WebP hoặc AVIF. |
| Ảnh chia sẻ | Ảnh OG theo từng trang. Có thể sinh bằng `ImageResponse` với nền sơn mài và tiêu đề. |
| Ngôn ngữ | `<html lang="vi">`. Tạm thời chưa có hreflang; chờ quyết định về bản tiếng Anh (docs/07, mục A8). |
| llms.txt | **Không ưu tiên.** Số liệu tháng 5/2026: 97% tệp llms.txt không nhận lượt đọc nào. |

## 2. Hiệu năng (đo trên điện thoại tầm trung, mạng 4G)

| Chỉ số | Ngưỡng |
| --- | --- |
| LCP | dưới 2,5 giây ở trang chủ (sau cổng) và trang bài |
| CLS | dưới 0,1 |
| INP | dưới 200 ms |
| JS ban đầu của trang bài | dưới 100 KB (đã nén) |
| Ảnh cổng | preload đúng một bản theo khổ màn hình |

Hiệu ứng nặng (canvas sao, đom đóm) chỉ tải khi phần đó sắp vào màn hình. Không chạy hiệu ứng khi tab ẩn.

## 3. Đo lường (phiên S7, trước khi ra mắt)

- Google Search Console và Bing Webmaster Tools; nộp sitemap.
- Một công cụ đếm lượt xem tôn trọng riêng tư (anh chọn công cụ, xem docs/07 mục A7). Đếm riêng lượt đến từ chatgpt.com, perplexity.ai và gemini.google.com.
- Mỗi tháng hỏi AI 20 câu cố định và ghi lại AI có nhắc tới Khai Minh hay không. Việc này do đội vận hành làm, không cần code.

## 4. Một thực thể rõ ràng

Một tên, một ảnh, một tiểu sử, giống hệt nhau trên web, Facebook, YouTube, Zalo và bìa sách. Trang `/khai-minh` là nơi gốc. Mọi bài đều ký tên Khai Minh và dẫn về trang này.

## Nguồn

- [AI features and your website — Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)
- [llms.txt adoption rises 8.8x but 97% of files get zero AI requests — PPC Land](https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/)
- [Google drops FAQ rich results — Search Engine Journal](https://www.searchenginejournal.com/google-drops-faq-rich-results/574429/)

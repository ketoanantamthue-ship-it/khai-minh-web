import { KhoiGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { LoiMoiNhanThu } from "@/components/trang-con/LoiMoiNhanThu";
import { taoMetadata } from "@/lib/seo";

/**
 * Nói chuyện /noi-chuyen (phiên S4; docs/02, mục 3): video và bài nói. Chưa có
 * video nào (docs/07, mục B9), nên trang là khung với ô “Đang soạn”. Khi có
 * video, đặt bằng thẻ <VideoYouTube> (lời thoại nằm sẵn trong HTML, có
 * JSON-LD VideoObject). Lời mời chính: nhận thư hằng tháng (Bản cuối).
 */
export const metadata = taoMetadata({ tieuDe: "Nói chuyện", duongDan: "/noi-chuyen" });

export default function NoiChuyen() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Nói chuyện", duongDan: "/noi-chuyen" },
      ]}
      nhan="CỬA TRÍ"
      tieuDe="Nói chuyện"
    >
      <KhoiGiay>
        <section className="s" aria-label="Video và bài nói">
          <div className="wrap bai-doc">
            {/* Video chính và danh sách bài nói (docs/07, mục B9; W2, mục 4). */}
            <div className="slot r169" role="img" aria-label="Khung video" data-can="B9">
              <div>
                <b>Đang soạn</b>
              </div>
            </div>
          </div>
        </section>
        <LoiMoiNhanThu />
      </KhoiGiay>
    </TrangKhung>
  );
}

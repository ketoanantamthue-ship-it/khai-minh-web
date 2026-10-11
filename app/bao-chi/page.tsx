import Link from "next/link";
import { KhoiGiay, MucGiay, TrangKhung } from "@/components/khung/TrangKhung";
import { OCan } from "@/components/trang-con/OCan";
import { taoMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

/**
 * Báo chí và hợp tác /bao-chi (phiên S4; docs/02, mục 3). Khung theo Bản cuối:
 * tiểu sử (docs/07, mục C7), ảnh tải về (B2), chủ đề nói chuyện và nguyên tắc
 * nhận lời (C13). Lời mời chính: gửi lời mời hợp tác, dẫn tới lá thư gửi
 * Khai Minh (biểu mẫu nối ở phiên S5).
 */
export const metadata = taoMetadata({ tieuDe: "Báo chí và hợp tác", duongDan: "/bao-chi" });

export default function BaoChi() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Báo chí và hợp tác", duongDan: "/bao-chi" },
      ]}
      tieuDe="Báo chí và hợp tác"
      moi={
        // Bản thật chưa có nơi nhận thư: chưa có lối gửi lời mời (docs/07, mục A18).
        siteConfig.moLoiThu ? (
          <Link className="btn" href="/gui-cau-hoi">
            Gửi lời mời hợp tác
          </Link>
        ) : undefined
      }
    >
      <KhoiGiay>
        <MucGiay id="tieu-su" tieuDe="Tiểu sử" cho>
          <OCan ma="C7" />
        </MucGiay>
        <MucGiay id="anh" tieuDe="Ảnh tải về" cho>
          <div className="slot r45 tg-anh" role="img" aria-label="Ảnh chân dung" data-can="B2">
            <div>
              <b>Ảnh chân dung</b>Khổ 4:5, ánh sáng cửa sổ
            </div>
          </div>
        </MucGiay>
        <MucGiay id="chu-de" tieuDe="Chủ đề nói chuyện" cho>
          <OCan ma="C13" />
        </MucGiay>
        <MucGiay id="nguyen-tac" tieuDe="Nguyên tắc nhận lời" cho>
          <OCan ma="C13" />
        </MucGiay>
      </KhoiGiay>
    </TrangKhung>
  );
}

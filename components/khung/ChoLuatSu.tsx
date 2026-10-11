import { siteConfig } from "@/site.config";

/**
 * Chỗ dành cho chữ pháp lý của các trang chính sách và trang Dữ liệu của bạn.
 * Chữ chờ luật sư (docs/07, mục D3), nên chỉ hiện câu “Đang chờ luật sư hoàn
 * thiện” trong khung chất liệu của bản mẫu. Bản thật không dựng ô này
 * (docs/10, mục R7); trang để `noindex, follow` cho tới khi có chữ.
 */
export function ChoLuatSu({ ma = "D3" }: { ma?: string }) {
  if (siteConfig.laBanThat) return null;
  return (
    <div className="slot o-can cho-luat-su" data-can={ma}>
      <div>
        <b>Đang chờ luật sư hoàn thiện</b>
      </div>
    </div>
  );
}

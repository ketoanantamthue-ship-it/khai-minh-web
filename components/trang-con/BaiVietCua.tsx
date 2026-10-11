import { DanhSachBai } from "@/components/bai/DanhSachBai";
import { doors, type DoorKey } from "@/lib/doors";
import { khoHienThi } from "@/lib/kho";
import { siteConfig } from "@/site.config";
import "@/styles/bai.css";

/**
 * Mục “Bài viết của Cửa …” (`#bai-viet`) ở cuối trang cửa /tam, /tri, /than
 * (docs/10, mục R6). Thay cho trang nhãn /cua/[cua] cũ, nay chuyển hướng 301
 * về đây: mọi bài mang cửa ấy, chia theo loại.
 *
 * Bản thật chưa có bài nào mang cửa ấy thì không dựng mục, để trang cửa không
 * có ô “Đang soạn”; bản xem trước vẫn hiện ô ấy (docs/07, mục C1).
 */
export function BaiVietCua({ cua }: { cua: DoorKey }) {
  const ds = khoHienThi().filter((b) => b.cua.includes(cua));
  if (ds.length === 0 && siteConfig.laBanThat) return null;
  return (
    <section className="s km-bai" id="bai-viet" aria-labelledby="bai-viet-h">
      <div className="wrap bai-doc">
        <h2 id="bai-viet-h">Bài viết của Cửa {doors[cua].ten}</h2>
        <DanhSachBai ds={ds} nhom capNhom="h3" />
      </div>
    </section>
  );
}

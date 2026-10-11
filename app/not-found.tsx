import Link from "next/link";
import { TrangKhung } from "@/components/khung/TrangKhung";

/**
 * Trang không tìm thấy /404 (phiên S4; docs/02, mục 3). Chữ lấy từ W2, mục 6
 * (chữ nhỏ trên giao diện). Lời mời chính: về trang chủ (Bản cuối). Next tự
 * gắn noindex cho trang này.
 */
export const metadata = { title: "Trang bạn tìm không còn ở đây" };

export default function KhongTimThay() {
  return (
    <TrangKhung
      vun={[]}
      tieuDe="Trang bạn tìm không còn ở đây."
      moi={
        <>
          <Link className="btn" href="/">
            Về trang chủ
          </Link>
          <p className="lien-404">
            Bạn có thể quay về trang chủ, hoặc đọc <Link href="/viet">những bài viết gần đây</Link>.
          </p>
        </>
      }
    >
      {null}
    </TrangKhung>
  );
}

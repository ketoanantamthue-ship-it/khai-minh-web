import Link from "next/link";
import { OCan } from "@/components/trang-con/OCan";
import { docChinChang } from "@/lib/chang";
import { LOAI, TEN_LOAI, type Bai } from "@/lib/noi-dung";
import { TEN_TRANG_THAI, type MaChang } from "@/lib/nhan";

/** “Chặng 5: Tuổi giữa đời”, hoặc “Cắt ngang” cho bài không thuộc riêng một chặng. */
export function tenChang(chang: MaChang): string {
  if (chang === "cat-ngang") return "Cắt ngang";
  const c = docChinChang()[chang - 1];
  return c ? `Chặng ${c.so}: ${c.ten}` : `Chặng ${chang}`;
}

/**
 * Danh sách bài của một trang nhãn hay trang mục. Mỗi bài là một liên kết
 * chữ, kèm chặng và đoạn mô tả. Bài chưa đăng (chỉ có ở bản xem trước) mang
 * thêm nhãn trạng thái.
 *
 * `nhom`: chia theo loại bài (Hỏi – đáp, Từ điển…), mỗi nhóm một tiêu đề h2.
 * Danh sách rỗng thì hiện ô “Đang soạn” (docs/07, mục C1).
 */
export function DanhSachBai({ ds, nhom = false, an = [] }: { ds: Bai[]; nhom?: boolean; an?: ("chang" | "mo-ta")[] }) {
  if (ds.length === 0) return <OCan ma="C1" />;
  if (!nhom) return <CacBai ds={ds} an={an} />;
  return (
    <>
      {LOAI.map((loai) => {
        const cua = ds.filter((b) => b.loai === loai);
        if (cua.length === 0) return null;
        return (
          <div key={loai} className="ds-nhom">
            <h2>{TEN_LOAI[loai]}</h2>
            <CacBai ds={cua} an={an} />
          </div>
        );
      })}
    </>
  );
}

function CacBai({ ds, an }: { ds: Bai[]; an: ("chang" | "mo-ta")[] }) {
  return (
    <ul className="list ds-bai">
      {ds.map((b) => (
        <li key={b.duongDan} data-chang={b.chang} data-tang={b.tang} data-cua={b.cua.join(" ")}>
          <Link className="ds-t" href={b.duongDan}>
            {b.tieuDe}
          </Link>
          {an.includes("chang") ? null : <span className="ds-c">{tenChang(b.chang)}</span>}
          {b.trangThai !== "da-dang" ? <span className="ds-nhap">{TEN_TRANG_THAI[b.trangThai]}</span> : null}
          {b.moTa && !an.includes("mo-ta") ? <span className="ds-m">{b.moTa}</span> : null}
        </li>
      ))}
    </ul>
  );
}

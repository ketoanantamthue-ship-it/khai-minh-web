import "server-only";
import { veAnhOg } from "./anh-og";
import { docChinChang } from "./chang";
import { doors } from "./doors";
import { timBai } from "./kho";
import { TEN_LOAI, vietNgay, type Loai } from "./noi-dung";

/** Ảnh chia sẻ của một bài: tiêu đề, loại bài và chặng, vệt màu của cửa đầu tiên. */
export async function anhOgBai(loai: Loai, slug: string) {
  const bai = timBai(loai, slug);
  if (!bai) return veAnhOg({ tieuDe: "Khai Minh – Người Khai Vấn" });
  const phan = [TEN_LOAI[loai]];
  if (typeof bai.chang === "number") {
    const c = docChinChang()[bai.chang - 1]!;
    phan.push(`Chặng ${c.so}`, c.ten);
  }
  if (bai.loai === "thu" && bai.fm.ngay_gui) phan.push(vietNgay(bai.fm.ngay_gui));
  return veAnhOg({
    tieuDe: bai.tieuDe,
    nhan: phan.join(" · ").toLocaleUpperCase("vi"),
    mau: doors[bai.cua[0]!].dc,
  });
}

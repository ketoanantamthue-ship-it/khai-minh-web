import { evaluate } from "@mdx-js/mdx";
import type { ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { OCan } from "@/components/trang-con/OCan";
import { MUC_TIN_CAY } from "@/lib/chang";

/**
 * Dựng thân MDX của một bài thành HTML phía server, lúc build
 * (CLAUDE.md, quy tắc 8). Thân bài chỉ đến từ content/ trong kho mã.
 *
 * Người viết dùng được bốn thẻ dưới đây trong MDX (docs/09):
 * - <Trich nguon="Diễn ý Kinh Thiện Sinh, Trường Bộ 31">lời dạy</Trich>
 * - <NhanTinCay chu="Niềm tin truyền thống" />
 * - <LoiAnToan>lời nhắc an toàn</LoiAnToan>
 * - <DangSoan ma="C1" />: ô “Đang soạn” cho chỗ còn thiếu. Ghi rõ thiếu gì
 *   trong chú thích {/* CẦN: … *\/} ngay cạnh; chú thích không hiện ra.
 */

/** Lời trích có nguồn, như tầng “Lời Phật dạy” của trang chặng. */
function Trich({ nguon, children }: { nguon: string; children: ReactNode }) {
  return (
    <blockquote className="quote">
      {children}
      <cite>{nguon}</cite>
    </blockquote>
  );
}

/**
 * Nhãn tin cậy. Màu lấy theo thang của bản mẫu (lib/chang.ts); chữ khác thang
 * (ví dụ “Câu nói dân gian: niềm tin truyền thống”) thì ghi `lop` (l1–l4).
 */
function NhanTinCay({ chu, lop }: { chu: string; lop?: "l1" | "l2" | "l3" | "l4" }) {
  const lopThang = MUC_TIN_CAY[chu as keyof typeof MUC_TIN_CAY]?.replace("b", "l");
  return (
    <p>
      <span className={`label ${lop ?? lopThang ?? "l1"}`}>{chu}</span>
    </p>
  );
}

function LoiAnToan({ children }: { children: ReactNode }) {
  return (
    <div className="safe" role="note">
      {children}
    </div>
  );
}

function DangSoan({ ma }: { ma: string }) {
  return <OCan ma={ma} />;
}

const THANH_PHAN = { Trich, NhanTinCay, LoiAnToan, DangSoan };

export async function ThanMdx({ than }: { than: string }) {
  const { default: NoiDung } = await evaluate(than, { ...runtime, development: false });
  return <NoiDung components={THANH_PHAN} />;
}

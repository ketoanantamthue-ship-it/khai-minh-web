import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { THANH_PHAN_MDX } from "./ThanhPhanMdx";

/**
 * Dựng thân MDX của một bài thành HTML phía server, lúc build
 * (CLAUDE.md, quy tắc 8). Thân bài chỉ đến từ content/ trong kho mã.
 * Các thẻ người viết dùng được nằm ở ThanhPhanMdx.tsx (docs/09, mục 5).
 */
export async function ThanMdx({ than }: { than: string }) {
  const { default: NoiDung } = await evaluate(than, { ...runtime, development: false });
  return <NoiDung components={THANH_PHAN_MDX} />;
}

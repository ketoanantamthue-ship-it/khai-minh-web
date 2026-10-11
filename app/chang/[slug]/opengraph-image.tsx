import { veAnhOg, KICH_THUOC_OG, KIEU_OG } from "@/lib/anh-og";
import { docChang, docChinChang } from "@/lib/chang";

export const size = KICH_THUOC_OG;
export const contentType = KIEU_OG;
export const alt = "Khai Minh – Người Khai Vấn";

export function generateStaticParams() {
  return docChinChang().map((c) => ({ slug: c.slug }));
}

/** Ảnh chia sẻ của trang chặng: câu hỏi chính của chặng. */
export default async function Anh({ params }: { params: Promise<{ slug: string }> }) {
  const c = docChang((await params).slug);
  return veAnhOg({
    tieuDe: c?.cau_hoi_chinh ?? "Khai Minh – Người Khai Vấn",
    nhan: c ? `CHẶNG ${c.so} · ${c.ten.toLocaleUpperCase("vi")} · ${c.do_tuoi.toLocaleUpperCase("vi")}` : undefined,
  });
}

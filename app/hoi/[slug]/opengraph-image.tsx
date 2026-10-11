import { KICH_THUOC_OG, KIEU_OG } from "@/lib/anh-og";
import { anhOgBai } from "@/lib/anh-og-bai";
import { thamSoTinh } from "@/lib/kho";

export const size = KICH_THUOC_OG;
export const contentType = KIEU_OG;
export const alt = "Khai Minh – Người Khai Vấn";

export function generateStaticParams() {
  return thamSoTinh("hoi");
}

export default async function Anh({ params }: { params: Promise<{ slug: string }> }) {
  return anhOgBai("hoi", (await params).slug);
}

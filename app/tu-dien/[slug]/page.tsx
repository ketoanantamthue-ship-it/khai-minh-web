import { notFound } from "next/navigation";
import { metadataBai, TrangBai } from "@/components/bai/TrangBai";
import { thamSoTinh, timBai } from "@/lib/kho";

/**
 * Trang /tu-dien/[slug]: mỗi tệp content/tu-dien/<slug>.mdx là một trang (phiên S3).
 * Production chỉ dựng bài `da-dang`; bản xem trước dựng mọi bài (lib/kho.ts).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return thamSoTinh("tu-dien");
}

export async function generateMetadata({ params }: PageProps<"/tu-dien/[slug]">) {
  return metadataBai(timBai("tu-dien", (await params).slug));
}

export default async function Trang({ params }: PageProps<"/tu-dien/[slug]">) {
  const bai = timBai("tu-dien", (await params).slug);
  if (!bai) notFound();
  return <TrangBai bai={bai} />;
}

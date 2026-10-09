import { notFound } from "next/navigation";
import { metadataBai, TrangBai } from "@/components/bai/TrangBai";
import { thamSoTinh, timBai } from "@/lib/kho";

/**
 * Trang /phuong-phap/[slug]: mỗi tệp content/phuong-phap/<slug>.mdx là một trang (phiên S3).
 * Production chỉ dựng bài `da-dang`; bản xem trước dựng mọi bài (lib/kho.ts).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return thamSoTinh("phuong-phap");
}

export async function generateMetadata({ params }: PageProps<"/phuong-phap/[slug]">) {
  return metadataBai(timBai("phuong-phap", (await params).slug));
}

export default async function Trang({ params }: PageProps<"/phuong-phap/[slug]">) {
  const bai = timBai("phuong-phap", (await params).slug);
  if (!bai) notFound();
  return <TrangBai bai={bai} />;
}

import { notFound } from "next/navigation";
import { metadataBai, TrangBai } from "@/components/bai/TrangBai";
import { thamSoTinh, timBai } from "@/lib/kho";

/**
 * Trang /hoi/[slug]: mỗi tệp content/hoi/<slug>.mdx là một trang (phiên S3).
 * Production chỉ dựng bài `da-dang`; bản xem trước dựng mọi bài (lib/kho.ts).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return thamSoTinh("hoi");
}

export async function generateMetadata({ params }: PageProps<"/hoi/[slug]">) {
  return metadataBai(timBai("hoi", (await params).slug));
}

export default async function Trang({ params }: PageProps<"/hoi/[slug]">) {
  const bai = timBai("hoi", (await params).slug);
  if (!bai) notFound();
  return <TrangBai bai={bai} />;
}

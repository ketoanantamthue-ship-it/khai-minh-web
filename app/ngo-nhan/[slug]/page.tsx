import { notFound } from "next/navigation";
import { metadataBai, TrangBai } from "@/components/bai/TrangBai";
import { thamSoTinh, timBai } from "@/lib/kho";

/**
 * Trang /ngo-nhan/[slug]: mỗi tệp content/ngo-nhan/<slug>.mdx là một trang (phiên S3).
 * Production chỉ dựng bài `da-dang`; bản xem trước dựng mọi bài (lib/kho.ts).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return thamSoTinh("ngo-nhan");
}

export async function generateMetadata({ params }: PageProps<"/ngo-nhan/[slug]">) {
  return metadataBai(timBai("ngo-nhan", (await params).slug));
}

export default async function Trang({ params }: PageProps<"/ngo-nhan/[slug]">) {
  const bai = timBai("ngo-nhan", (await params).slug);
  if (!bai) notFound();
  return <TrangBai bai={bai} />;
}

import { notFound } from "next/navigation";
import { metadataBai, TrangBai } from "@/components/bai/TrangBai";
import { thamSoTinh, timBai } from "@/lib/kho";

/**
 * Trang /thu/[slug]: mỗi tệp content/thu/<slug>.mdx là một trang (phiên S3).
 * Production chỉ dựng bài `da-dang`; bản xem trước dựng mọi bài (lib/kho.ts).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return thamSoTinh("thu");
}

export async function generateMetadata({ params }: PageProps<"/thu/[slug]">) {
  return metadataBai(timBai("thu", (await params).slug));
}

export default async function Trang({ params }: PageProps<"/thu/[slug]">) {
  const bai = timBai("thu", (await params).slug);
  if (!bai) notFound();
  return <TrangBai bai={bai} />;
}

import { preload } from "react-dom";
import { BaCua } from "@/components/trang-chu/BaCua";
import { BinhMinh } from "@/components/trang-chu/BinhMinh";
import { CanhCong } from "@/components/trang-chu/CanhCong";
import { DongHanh } from "@/components/trang-chu/DongHanh";
import { GuiCauHoi } from "@/components/trang-chu/GuiCauHoi";
import { KhoangLang } from "@/components/trang-chu/KhoangLang";
import { NgoiLang } from "@/components/trang-chu/KhoangLangHieuUng";
import { LoiHua } from "@/components/trang-chu/LoiHua";
import { ManMo } from "@/components/trang-chu/ManMo";
import { MucLuc } from "@/components/trang-chu/MucLuc";
import { NguoiGiu } from "@/components/trang-chu/NguoiGiu";
import { ThanhRutGon, VongChuong } from "@/components/trang-chu/ThanhRutGon";
import { TieuVuTru } from "@/components/trang-chu/TieuVuTru";
import { JsonLd } from "@/components/JsonLd";
import { docChinChang, duongDanChang } from "@/lib/chang";
import { doThi, nutNguoi, nutToChuc, nutWeb, taoMetadata } from "@/lib/seo";
import "@/styles/trang-chu.css";
import "@/styles/trang-chu-them.css";

/** Tiêu đề và mô tả lấy từ layout; trang chủ thêm canonical và Open Graph. */
export const metadata = {
  ...taoMetadata({
    tieuDe: "Khai Minh – Người Khai Vấn",
    moTa: "Đời người có chín chặng, và chặng nào cũng có những câu hỏi ta chỉ dám hỏi mình lúc nửa đêm. Khai Minh không trả lời thay bạn; tôi ngồi cùng bạn, đủ lâu để bạn tự thấy.",
    duongDan: "/",
    coAnhRieng: true,
  }),
  title: { absolute: "Khai Minh – Người Khai Vấn" },
};

/**
 * Trang chủ (phiên S1): chuyển prototypes/index.html (K1.9.16) sang Next.js
 * theo chín phần ở docs/03, mục 4, cộng cánh cổng mở đầu.
 *
 * Mọi chữ nằm sẵn trong HTML do server dựng; chữ chín chặng đọc từ
 * content/chang/*.mdx. Các client component chỉ thêm hiệu ứng và thao tác.
 */
export default function TrangChu() {
  const chang = docChinChang();

  // Ảnh đêm của cánh cổng là thứ đầu tiên khách thấy (bản mẫu: <link rel="preload">).
  preload("/assets/img/mo-cua-dem.webp", {
    as: "image",
    imageSrcSet: "/assets/img/mo-cua-dem-720.webp 720w, /assets/img/mo-cua-dem.webp 1152w",
    imageSizes: "57vh",
    fetchPriority: "high",
  });

  return (
    <div className="km-tc">
      {/* Một thực thể rõ ràng: WebSite, Person và Organization (docs/05, mục 1 và 4). */}
      <JsonLd duLieu={doThi(nutWeb(), nutNguoi(), nutToChuc())} />
      <CanhCong />

      <main id="main">
        {/* I */}
        <ManMo chang={chang} />
        {/* II */}
        <TieuVuTru />
        {/* III */}
        <BaCua />
        {/* IV */}
        <BinhMinh />
        {/* V */}
        <NguoiGiu />
        {/* VI */}
        <DongHanh />
        {/* VII */}
        <LoiHua />
        {/* VIII */}
        <KhoangLang />
        {/* IX */}
        <GuiCauHoi />
      </main>

      <NgoiLang />
      <MucLuc
        chang={chang.map((c) => ({ ten: c.ten, han: c.han_tu, cauHoi: c.cau_hoi_chinh }))}
        duongDanChang={chang.map(duongDanChang)}
      />
      <VongChuong />
      <ThanhRutGon />
    </div>
  );
}

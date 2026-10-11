import { KhoiGiay, KhoiTrangChu, TrangKhung } from "@/components/khung/TrangKhung";
import { BuoiSoi, SauDieuKhongLam } from "@/components/trang-con/KhoiCuaTam";
import { LoiMoiGuiCauHoi } from "@/components/trang-con/LoiMoiGuiCauHoi";
import { DongHanh } from "@/components/trang-chu/DongHanh";
import { taoMetadata } from "@/lib/seo";
import "@/styles/trang-chu.css";

/**
 * Cách tôi đồng hành /cach-toi-dong-hanh (phiên S4; docs/02, mục 3): con đường
 * bốn trạm và bốn lời hẹn (phần #dong-hanh của trang chủ), một buổi Soi diễn
 * ra thế nào và sáu điều tôi không làm (Cửa Tâm). Lời mời chính: gửi một câu
 * hỏi. Câu chuyện “một buổi khai vấn tốt” chờ buổi ghi âm số 3 (docs/07, B3).
 */
export const metadata = taoMetadata({
  tieuDe: "Cách tôi đồng hành",
  moTa: "Tôi không đi thay bạn. Tôi cầm đèn đi bên cạnh, để bạn thấy rõ từng bước chân của chính mình.",
  duongDan: "/cach-toi-dong-hanh",
});

export default function CachToiDongHanh() {
  return (
    <TrangKhung
      vun={[
        { ten: "Trang chủ", duongDan: "/" },
        { ten: "Cách tôi đồng hành", duongDan: "/cach-toi-dong-hanh" },
      ]}
      nhan="CỬA TÂM · AN TÂM MỆNH"
      tieuDe="Cách tôi đồng hành"
    >
      <KhoiTrangChu>
        <DongHanh noiKhac />
      </KhoiTrangChu>
      <KhoiGiay>
        <BuoiSoi />
        <SauDieuKhongLam />
        <LoiMoiGuiCauHoi />
      </KhoiGiay>
    </TrangKhung>
  );
}

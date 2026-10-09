import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Noto_Serif } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/site.config";
import "@/styles/tokens.css";
import "@/styles/globals.css";

const notoSerif = Noto_Serif({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-noto-serif",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Khai Minh – Người Khai Vấn",
    template: "%s – Khai Minh",
  },
  description:
    "Đời người có chín chặng, và chặng nào cũng có những câu hỏi ta chỉ dám hỏi mình lúc nửa đêm. Khai Minh không trả lời thay bạn; tôi ngồi cùng bạn, đủ lâu để bạn tự thấy.",
  // Chưa ra mắt thì không lập chỉ mục (CLAUDE.md, quy tắc 12).
  robots: siteConfig.choPhepLapChiMuc
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#120E0B",
};

/**
 * Chạy trước khi vẽ: bật bản nhẹ cho máy yếu hoặc mạng chậm, và đọc lại
 * lựa chọn "Chữ lớn" / "Bản nhẹ" đã lưu. Chép từ đầu các trang bản mẫu.
 */
const SCRIPT_HIEN_THI = `(function(){var d=document.documentElement,c=navigator.connection||{},lite=false,s=null;
try{s=window.localStorage}catch(e){}
if(c.saveData||/2g|3g/.test(c.effectiveType||''))lite=true;
if(navigator.deviceMemory&&navigator.deviceMemory<=2)lite=true;
if(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)lite=true;
try{var v=s&&s.getItem('km-lite');if(v==='1')lite=true;if(v==='0')lite=false;if(s&&s.getItem('km-easy')==='1')d.classList.add('easy');}catch(e){}
if(lite)d.classList.add('lite');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${notoSerif.variable} ${beVietnamPro.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_HIEN_THI }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Đi thẳng tới nội dung
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MO_TA_TRANG_CHU } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import "@/styles/tokens.css";
import "@/styles/globals.css";

/**
 * Noto Serif cho tiêu đề (docs/03, mục 3), tự lưu trong app/fonts/: mỗi kiểu
 * (thẳng, nghiêng) là một tệp duy nhất gồm chữ Latin và đủ chữ Việt, trục độ
 * đậm 400–600. Tải từ Google Fonts bằng tham số `text=` (giấy phép SIL Open
 * Font License).
 *
 * Vì sao không dùng next/font/google như Be Vietnam Pro: Google tách mỗi kiểu
 * thành tệp “latin” và tệp “vietnamese”. Hai tệp về lúc khác nhau, nên giữa
 * chừng tiêu đề vẽ nửa bằng Noto Serif, nửa bằng phông dự phòng, xuống dòng
 * khác đi rồi trở lại: trang chủ bị xô lệch bố cục (docs/10, mục R11). Một tệp
 * cho mỗi kiểu thì chữ đổi phông đúng một lần.
 *
 * Không tải trước (`preload: false`): tải trước cả hai kiểu chiếm băng thông
 * của ảnh cánh cổng và làm LCP chậm (docs/10, mục R13).
 */
const notoSerif = localFont({
  src: [
    { path: "./fonts/noto-serif.woff2", weight: "400 600", style: "normal" },
    { path: "./fonts/noto-serif-nghieng.woff2", weight: "400 600", style: "italic" },
  ],
  display: "swap",
  variable: "--font-noto-serif",
  preload: false,
  adjustFontFallback: "Times New Roman",
  fallback: ["Noto Serif", "Georgia", "serif"],
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
  // Không tải trước: nhường băng thông cho ảnh đầu tiên (docs/10, mục R13).
  // Mỗi độ đậm vẫn tách hai tệp latin và vietnamese, nhưng chữ thân bài đổi
  // phông không làm xô lệch bố cục (đã đo).
  preload: false,
});

/**
 * Chữ Hán cho dấu và cửu cung (docs/03, mục 3): tập con Noto Serif SC chỉ gồm
 * 33 chữ có trong prototypes/*.html, tải từ Google Fonts bằng tham số `text=`
 * (giấy phép SIL Open Font License). Thêm chữ Hán mới thì tải lại tệp này.
 */
const notoSerifHan = localFont({
  src: "./fonts/noto-serif-sc-han.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-han",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Khai Minh – Người Khai Vấn",
    template: "%s – Khai Minh",
  },
  description: MO_TA_TRANG_CHU,
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
 *
 * Thêm so với bản mẫu:
 * - lớp `km-js`: trang có JavaScript. Thiếu lớp này thì CSS hiện bản tĩnh
 *   đọc được trọn chữ (docs/08, "Không cần JS vẫn đọc được");
 * - lớp `mzs-seen`: máy này đã qua cánh cổng (localStorage `km-gate`), nên
 *   cổng không hiện lại, kể cả trong khoảnh khắc trước khi React chạy
 *   (CLAUDE.md, quy tắc 9).
 */
const SCRIPT_HIEN_THI = `(function(){var d=document.documentElement,c=navigator.connection||{},lite=false,s=null;d.classList.add('km-js');
try{s=window.localStorage}catch(e){}
if(c.saveData||/2g|3g/.test(c.effectiveType||''))lite=true;
if(navigator.deviceMemory&&navigator.deviceMemory<=2)lite=true;
if(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)lite=true;
try{var v=s&&s.getItem('km-lite');if(v==='1')lite=true;if(v==='0')lite=false;if(s&&s.getItem('km-easy')==='1')d.classList.add('easy');}catch(e){}
if(lite)d.classList.add('lite');try{if(s&&s.getItem('km-gate')==='1')d.classList.add('mzs-seen');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${notoSerif.variable} ${beVietnamPro.variable} ${notoSerifHan.variable}`} suppressHydrationWarning>
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

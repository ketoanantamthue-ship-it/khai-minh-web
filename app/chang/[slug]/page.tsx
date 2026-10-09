import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BaCuaKhac } from "@/components/trang-con/BaCuaKhac";
import { HieuUngTrangCon } from "@/components/trang-con/HieuUngTrangCon";
import { LoiMoiGuiCauHoi } from "@/components/trang-con/LoiMoiGuiCauHoi";
import { ManDau } from "@/components/trang-con/ManDau";
import { NguongBinhMinh } from "@/components/trang-con/NguongBinhMinh";
import { OCan } from "@/components/trang-con/OCan";
import { docChang, docChinChang, duongDanChang, lopNhanTinCay, type Chang, type TangSoi } from "@/lib/chang";
import { doors } from "@/lib/doors";
import { SAU_TANG, thangSauTang } from "@/lib/sau-tang";
import "@/styles/trang-con.css";

/**
 * Chín trang chặng /chang/[slug] (phiên S2), theo khuôn prototypes/chang-5.html.
 *
 * Chữ đọc từ content/chang/*.mdx và nằm sẵn trong HTML (dựng sẵn lúc build).
 * Chặng 5 có đủ chữ của bản mẫu trong trường `trang`. Tám chặng còn lại
 * dùng phần seed (câu hỏi, lời soi, lời chia sẻ, nguồn, mức tin cậy, câu hỏi
 * liên quan); phần nào chưa có chữ thì để ô CẦN (docs/07, mục C2).
 */

/** Tên năm tầng soi, đúng thứ tự (chữ của bản mẫu chang-5.html). */
const NAM_TANG = [
  "Nỗi khổ của chặng này",
  "Điều người ta hay dọa bạn",
  "Điều khoa học biết",
  "Lời Phật dạy",
  "Một thực tập nhỏ cho tối nay",
] as const;

/** Mã việc ở docs/07 cho phần chữ còn thiếu của trang chặng. */
const CAN_CHU = "C2";

export const dynamicParams = false;

export function generateStaticParams() {
  return docChinChang().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/chang/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = docChang(slug);
  if (!c) return {};
  return {
    title: `${c.ten} – Chặng ${c.so}`,
    description: c.trang?.mo_ta ?? `${c.cau_hoi_chinh} ${c.soi}`,
    alternates: { canonical: duongDanChang(c) },
  };
}

export default async function TrangChang({ params }: PageProps<"/chang/[slug]">) {
  const { slug } = await params;
  const chin = docChinChang();
  const c = docChang(slug);
  if (!c) notFound();

  const trang = c.trang;
  const goiTen = trang?.goi_ten ?? c.ten.toLowerCase();
  const truoc = chin[c.so - 2];
  const sau = chin[c.so];
  const cauHoiKhac = trang?.cau_hoi_khac ?? c.cau_hoi_lien_quan;

  return (
    <main id="main" className="km-con">
      <ManDau
        nhan={
          // Một khối duy nhất: .hero .k là flex (dành cho dấu cửa), chữ phải xuống dòng liền mạch.
          <span>
            CHẶNG {c.so} · <span className="han">{c.han_tu}</span> · {c.ten.toLocaleUpperCase("vi")} ·{" "}
            {c.do_tuoi.toLocaleUpperCase("vi")}
          </span>
        }
        tieuDe={c.cau_hoi_chinh}
        soi={c.soi}
        moDau={trang?.mo_dau}
        can={CAN_CHU}
      >
        <a className="btn" href="#tang">
          Đọc năm tầng soi của chặng này
        </a>
        <Link className="soft" href="/ngoi-lang">
          Ngồi lặng chín mươi giây trước
        </Link>
      </ManDau>
      <NguongBinhMinh cau={trang?.binh_minh} can={CAN_CHU} />

      <section className="s" id="tang">
        <div className="wrap">
          <h2>Năm tầng soi của chặng {goiTen}</h2>
          <div className="grid g73 g-tren">
            <div>
              {trang ? null : <PhanSeed c={c} />}
              {NAM_TANG.map((ten, i) => (
                <TangSoiKhoi key={ten} so={i + 1} ten={ten} tang={trang?.nam_tang[i]} />
              ))}
            </div>
            <div className="tg-dinh">
              {/* Câu hỏi viết tay trên giấy dó: chờ chất liệu thật (docs/07, mục B6). */}
              <div className="slot r45" role="img" aria-label="Câu hỏi viết tay" data-can="B6">
                <div>
                  <b>Câu hỏi viết tay</b>Câu hỏi của chặng này, viết tay trên giấy dó
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <h2>Ba cánh cửa cho chặng {goiTen}</h2>
          <div className="grid g3">
            {c.cua.map((k) => {
              const loi = trang?.ba_cua[k];
              const ten = doors[k].ten.toLowerCase();
              return (
                <article key={k} className="card">
                  <h3>Cửa {ten}</h3>
                  {loi ? <p>{loi}</p> : <OCan ma={CAN_CHU} />}
                  <Link className="more" href={doors[k].href}>
                    Xem cửa {ten}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <h2>Bạn có thể đi sâu tới đâu, tùy bạn.</h2>
          <ul className="list">
            {(trang?.di_sau ?? thangSauTang(c.ten).map(vietThuongDau)).map((chu, i) => (
              <li key={SAU_TANG[i]!.ma}>
                <b>{SAU_TANG[i]!.nhan}:</b> {chu}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <h2>Những câu hỏi khác người ta hay mang ở chặng này</h2>
          <ul className="list">
            {cauHoiKhac.map((q) => (
              <li key={q}>
                {/* Chưa có bài hỏi – đáp nào (docs/07, mục C1). */}
                <a data-can="C1">{q}</a>
              </li>
            ))}
          </ul>
          <div className="cta cta-cuoi">
            {truoc ? (
              <Link className="soft" href={duongDanChang(truoc)}>
                Chặng trước: {truoc.ten}
              </Link>
            ) : null}
            {sau ? (
              <Link className="soft" href={duongDanChang(sau)}>
                Chặng sau: {sau.ten}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <BaCuaKhac
        tieuDe="Ngôi nhà này có ba cánh cửa."
        loiDan="Mỗi chặng đời đều có thể bước vào từ một trong ba cánh cửa. Bạn chọn cửa nào gần với lòng mình nhất."
      />
      <LoiMoiGuiCauHoi />
      <HieuUngTrangCon />
    </main>
  );
}

/**
 * Phần seed của chặng chưa có chữ riêng: lời chia sẻ, lời nhắc an toàn,
 * nguồn và mức tin cậy, như thẻ chặng trên trang chủ.
 */
function PhanSeed({ c }: { c: Chang }) {
  return (
    <div className="seed">
      {c.tra_loi.map((t) => (
        <p key={t} className="lede">
          {t}
        </p>
      ))}
      {c.loi_an_toan ? (
        <p className="safe" role="note">
          {c.loi_an_toan}
        </p>
      ) : null}
      <p className="nguon">
        <b>Nguồn:</b> {c.nguon}
      </p>
      <p>
        <span className={`label ${lopNhanTinCay(c)}`}>{c.muc_tin_cay}</span>
      </p>
    </div>
  );
}

function TangSoiKhoi({ so, ten, tang }: { so: number; ten: string; tang?: TangSoi }) {
  return (
    <>
      <h3 className="tg-h">
        {so}. {ten}
      </h3>
      {!tang ? <OCan ma={CAN_CHU} /> : null}
      {tang?.doan?.map((d) => (
        <p key={d} className="lede">
          {d}
        </p>
      ))}
      {tang?.trich ? (
        <p className="quote">
          {tang.trich.loi}
          <cite>{tang.trich.nguon}</cite>
        </p>
      ) : null}
      {tang?.nhan ? (
        <p>
          <span className={`label ${tang.nhan.lop}`}>{tang.nhan.chu}</span>
        </p>
      ) : null}
    </>
  );
}

/** “Lá thư của chặng này” → “lá thư của chặng này.” (như danh sách của chang-5.html). */
function vietThuongDau(chu: string): string {
  return `${chu.charAt(0).toLowerCase()}${chu.slice(1)}.`;
}

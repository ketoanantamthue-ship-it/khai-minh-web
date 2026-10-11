import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { LoiMoiGuiCauHoi } from "@/components/trang-con/LoiMoiGuiCauHoi";
import { LoiMoiNhanThu } from "@/components/trang-con/LoiMoiNhanThu";
import { OCan } from "@/components/trang-con/OCan";
import { docChinChang, duongDanChang } from "@/lib/chang";
import { doorStyle } from "@/lib/doors";
import { khoHienThi } from "@/lib/kho";
import {
  phutDoc,
  taoNeo,
  TEN_LOAI,
  tieuDeHai,
  videoTrongThan,
  vietNgay,
  type Bai,
  type FrontMatter,
} from "@/lib/noi-dung";
import {
  doThi,
  idVideo,
  nutBaiViet,
  nutDuongDan,
  nutNguoi,
  nutToChuc,
  nutVideo,
  nutWeb,
  taoMetadata,
  type DuLieuVideo,
  type MucDuongDan,
} from "@/lib/seo";
import { KhoiTacGia } from "./KhoiTacGia";
import { LienQuan } from "./LienQuan";
import { ManDauBai } from "./ManDauBai";
import { ThanMdx } from "./Mdx";
import { AmThanh, Anh } from "./ThanhPhanMdx";
import { VideoYouTube } from "./VideoYouTube";
import "@/styles/trang-con.css";
import "@/styles/bai.css";

/**
 * Khuôn trang chung cho sáu loại bài của kho: hỏi – đáp, từ điển, ngộ nhận,
 * viết, thư và phương pháp (phiên S3; docs/02, mục 2; docs/04, mục 4).
 *
 * Mọi chữ nằm sẵn trong HTML do server dựng lúc build. Trang bài không có
 * hiệu ứng và không có cánh cổng (CLAUDE.md, quy tắc 8 và 9).
 */

const TRANG_CHU: MucDuongDan = { ten: "Trang chủ", duongDan: "/" };

/** Dải đường dẫn của một bài, dùng cho cả trang và BreadcrumbList. */
export function duongDanVunBai(bai: Bai): MucDuongDan[] {
  const cuoi: MucDuongDan = { ten: bai.tieuDe, duongDan: bai.duongDan };
  switch (bai.loai) {
    case "hoi": {
      const c = typeof bai.chang === "number" ? docChinChang()[bai.chang - 1] : undefined;
      if (!c) return [TRANG_CHU, { ten: TEN_LOAI.hoi, duongDan: "/hoi" }, cuoi];
      return [
        TRANG_CHU,
        { ten: `Chặng ${c.so}: ${c.ten}`, duongDan: duongDanChang(c) },
        { ten: TEN_LOAI.hoi, duongDan: `${duongDanChang(c)}/hoi` },
        cuoi,
      ];
    }
    case "tu-dien":
    case "ngo-nhan":
      return [TRANG_CHU, { ten: "Cửa Trí", duongDan: "/tri" }, cuoi];
    case "viet":
      return [TRANG_CHU, { ten: TEN_LOAI.viet, duongDan: "/viet" }, cuoi];
    case "thu":
      return [TRANG_CHU, { ten: TEN_LOAI.thu, duongDan: "/thu" }, cuoi];
    case "phuong-phap":
      return [TRANG_CHU, { ten: "Cửa Tâm", duongDan: "/tam" }, cuoi];
  }
}

export function metadataBai(bai: Bai | undefined): Metadata {
  if (!bai) return {};
  return taoMetadata({
    tieuDe: bai.tieuDe,
    moTa: bai.moTa,
    duongDan: bai.duongDan,
    loai: "article",
    ngayViet: bai.fm.ngay_viet,
    ngayCapNhat: bai.ngayCapNhat,
    coAnhRieng: true,
    anh: bai.fm.anh_bia ? { url: bai.fm.anh_bia.src, alt: bai.fm.anh_bia.alt } : undefined,
  });
}

/** Mọi video của bài: video ở frontmatter, rồi các thẻ <VideoYouTube> trong thân bài. */
function videoCuaBai(bai: Bai): DuLieuVideo[] {
  const v = bai.fm.video;
  const dau: DuLieuVideo[] = v
    ? [{ id: v.id, tieuDe: v.tieu_de, loiThoai: v.loi_thoai, ngayDang: v.ngay_dang, thoiLuong: v.thoi_luong }]
    : [];
  const trongThan = videoTrongThan(bai.than).flatMap((a) =>
    a.id && a.tieuDe
      ? [
          {
            id: a.id,
            tieuDe: a.tieuDe,
            loiThoai: a.loiThoai || undefined,
            ngayDang: a.ngayDang,
            thoiLuong: a.thoiLuong,
          },
        ]
      : [],
  );
  return [...dau, ...trongThan];
}

/**
 * Đầu bài: thời gian đọc, bản đọc của Khai Minh (nếu có), mục lục nhỏ theo các
 * tiêu đề `##` của thân bài, ảnh đầu bài và video (nếu có).
 */
function DauBai({ bai }: { bai: Bai }) {
  const muc = tieuDeHai(bai.than.replace(/\{\/\*[\s\S]*?\*\/\}/g, ""));
  const { am_thanh, anh_bia, video } = bai.fm;
  return (
    <div className="dau-bai">
      <p className="phut-doc">Bạn đọc bài này trong khoảng {phutDoc(bai)} phút.</p>
      <AmThanh src={am_thanh?.src} thoiLuong={am_thanh?.thoi_luong} />
      {muc.length >= 2 ? (
        <nav className="muc-bai" aria-labelledby="muc-bai-dan">
          <p className="muc-bai-dan" id="muc-bai-dan">
            Bài này có các phần:
          </p>
          <ol>
            {muc.map((m) => (
              <li key={m}>
                <a href={`#${taoNeo(m)}`}>{m}</a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <Anh src={anh_bia?.src} alt={anh_bia?.alt} chuThich={anh_bia?.chu_thich} />
      <VideoYouTube id={video?.id} tieuDe={video?.tieu_de} loiThoai={video?.loi_thoai} />
    </div>
  );
}

/** Nhãn nhỏ trên tiêu đề: loại bài, chặng hoặc ngày gửi thư. */
function nhanBai(bai: Bai): ReactNode {
  const loai = TEN_LOAI[bai.loai].toLocaleUpperCase("vi");
  if (bai.loai === "thu" && bai.fm.ngay_gui) return `${loai} · ${vietNgay(bai.fm.ngay_gui)}`;
  if (typeof bai.chang !== "number" || bai.loai === "tu-dien" || bai.loai === "ngo-nhan") return loai;
  const c = docChinChang()[bai.chang - 1]!;
  return (
    <span>
      {loai} · CHẶNG {c.so} · <span className="han">{c.han_tu}</span> · {c.ten.toLocaleUpperCase("vi")}
    </span>
  );
}

/** Một hay nhiều đoạn văn của frontmatter; chưa có thì để ô “Đang soạn”. */
function CacDoan({ doan, lop = "lede" }: { doan?: string[]; lop?: string }) {
  if (!doan) return <OCan ma="C5" />;
  return (
    <>
      {doan.map((d) => (
        <p key={d} className={lop}>
          {d}
        </p>
      ))}
    </>
  );
}

function PhanDoan({ id, tieuDe, doan }: { id: string; tieuDe: string; doan?: string[] }) {
  return (
    <section className="s" aria-labelledby={id}>
      <div className="wrap bai-doc">
        <h2 id={id}>{tieuDe}</h2>
        <CacDoan doan={doan} />
      </div>
    </section>
  );
}

/** Phần đầu riêng của mỗi loại bài, nằm trong màn đầu. */
function DauRieng({ bai }: { bai: Bai }) {
  switch (bai.loai) {
    case "hoi": {
      const fm: FrontMatter["hoi"] = bai.fm;
      // Bước 3: trả lời ngắn, ngay dưới tiêu đề và lời nói lại tình cảnh.
      return fm.tra_loi_ngan ? (
        <p className="tl-ngan">{fm.tra_loi_ngan}</p>
      ) : (
        <p className="sub" data-can="C1" hidden />
      );
    }
    case "tu-dien":
      return bai.fm.dinh_nghia ? <p className="tl-ngan">{bai.fm.dinh_nghia}</p> : null;
    case "ngo-nhan":
      // Sự thật đặt trước, nguồn đặt sau (docs/04, mục 4).
      return bai.fm.su_that ? <CacDoan doan={bai.fm.su_that} lop="tl-ngan" /> : null;
    case "viet":
    case "thu":
      return bai.fm.tom_tat ? <p className="sub">{bai.fm.tom_tat}</p> : null;
    case "phuong-phap":
      return bai.fm.dinh_nghia ? <p className="tl-ngan">{bai.fm.dinh_nghia}</p> : null;
  }
}

export async function TrangBai({ bai }: { bai: Bai }) {
  const hienThi = khoHienThi();
  const vun = duongDanVunBai(bai);
  const cua = bai.cua[0]!;
  const soi = bai.loai === "hoi" ? bai.fm.tinh_canh : undefined;
  const coThan = bai.than.trim().length > 0;
  // Từ điển và phương pháp có phần riêng từ frontmatter, nên thân bài đặt sau phần ấy.
  const thanTruoc = bai.loai !== "tu-dien" && bai.loai !== "phuong-phap";
  const video = videoCuaBai(bai);

  return (
    <main id="main" className="km-con km-bai" data-door={cua} style={doorStyle(cua)}>
      <JsonLd
        duLieu={doThi(
          nutBaiViet({
            tieuDe: bai.tieuDe,
            moTa: bai.moTa,
            duongDan: bai.duongDan,
            ngayViet: bai.fm.ngay_viet,
            ngayCapNhat: bai.ngayCapNhat,
            nguon: bai.fm.nguon.map((n) => n.ten),
            anh: bai.fm.anh_bia?.src,
            video: video.map((v) => idVideo(v.id)),
          }),
          ...video.map(nutVideo),
          nutDuongDan(vun),
          nutNguoi(),
          nutToChuc(),
          nutWeb(),
        )}
      />
      <ManDauBai duongDan={vun} nhan={nhanBai(bai)} tieuDe={bai.tieuDe} soi={soi} trangThai={bai.trangThai}>
        <DauRieng bai={bai} />
      </ManDauBai>

      <section className="s bai-than">
        <div className="wrap bai-doc">
          <DauBai bai={bai} />
          {coThan && thanTruoc ? <ThanMdx than={bai.than} /> : null}
        </div>
      </section>

      {bai.loai === "tu-dien" ? (
        <>
          <PhanDoan id="kinh-noi" tieuDe="Kinh nói gì" doan={bai.fm.kinh_noi} />
          <PhanDoan id="dan-gian-noi" tieuDe="Dân gian nói gì" doan={bai.fm.dan_gian_noi} />
          <PhanDoan id="ngo-nhan" tieuDe="Ngộ nhận" doan={bai.fm.ngo_nhan} />
        </>
      ) : null}
      {bai.loai === "phuong-phap" ? <ThongTinPhuongPhap fm={bai.fm} /> : null}

      {coThan && !thanTruoc ? (
        <section className="s bai-than">
          <div className="wrap bai-doc">
            <ThanMdx than={bai.than} />
          </div>
        </section>
      ) : null}

      <LienQuan bai={bai} hienThi={hienThi} />
      <KhoiTacGia bai={bai} />
      {bai.loai === "hoi" ? <LoiMoiGuiCauHoi /> : <LoiMoiNhanThu />}
    </main>
  );
}

/** Ngày công bố và phiên bản của trang định nghĩa gốc (docs/02, mục 2). */
function ThongTinPhuongPhap({ fm }: { fm: FrontMatter["phuong-phap"] }) {
  return (
    <section className="s" aria-label="Ngày công bố và phiên bản">
      <div className="wrap bai-doc">
        <dl className="tg-ds">
          <div>
            <dt>Ngày công bố</dt>
            <dd>
              {fm.ngay_cong_bo ? (
                <time dateTime={fm.ngay_cong_bo}>{vietNgay(fm.ngay_cong_bo)}</time>
              ) : (
                <OCan ma="C4" kieu="dong" />
              )}
            </dd>
          </div>
          <div>
            <dt>Phiên bản</dt>
            <dd>{fm.phien_ban ?? <OCan ma="C4" kieu="dong" />}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

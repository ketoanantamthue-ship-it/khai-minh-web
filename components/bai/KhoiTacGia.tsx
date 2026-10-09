import Link from "next/link";
import { OCan } from "@/components/trang-con/OCan";
import { lopTinCay } from "@/lib/nhan";
import { vietNgay, type Bai, type Nguon } from "@/lib/noi-dung";
import { TRANG_TAC_GIA } from "@/lib/seo";
import { siteConfig } from "@/site.config";

/**
 * Bước 10 của khuôn: tác giả, ngày viết, ngày kiểm lại và nguồn (docs/04,
 * mục 4). Mọi bài đều ký tên Khai Minh và dẫn về trang tác giả (docs/05,
 * mục 4). Phần nào bài nháp chưa có thì để ô “Đang soạn”.
 *
 * Ảnh chân dung chờ chất liệu thật (docs/07, mục B2): khung nét góc như phần
 * “Người giữ những câu hỏi” ở trang chủ, cùng chữ.
 */
export function KhoiTacGia({ bai }: { bai: Bai }) {
  const { fm } = bai;
  const lop = fm.muc_tin_cay ? lopTinCay(fm.muc_tin_cay) : undefined;

  return (
    <section className="s bai-tg" aria-labelledby="tac-gia">
      <div className="wrap">
        <h2 id="tac-gia">Tác giả và nguồn</h2>
        <div className="tg-luoi">
          {/* Ảnh chân dung khổ 4:5 (docs/07, mục B2). */}
          <div className="slot r45 tg-anh" role="img" aria-label="Ảnh chân dung" data-can="B2">
            <div>
              <b>Ảnh chân dung</b>Khổ 4:5, ánh sáng cửa sổ
            </div>
          </div>
          <dl className="tg-ds">
            <div>
              <dt>Tác giả</dt>
              <dd>
                <Link href={TRANG_TAC_GIA} rel="author">
                  {siteConfig.kyTen}
                </Link>
              </dd>
            </div>
            <div>
              <dt>Ngày viết</dt>
              <dd>
                {fm.ngay_viet ? (
                  <time dateTime={fm.ngay_viet}>{vietNgay(fm.ngay_viet)}</time>
                ) : (
                  <OCan ma="C1" kieu="dong" />
                )}
              </dd>
            </div>
            {fm.ngay_kiem_lai ? (
              <div>
                <dt>Ngày kiểm lại</dt>
                <dd>
                  <time dateTime={fm.ngay_kiem_lai}>{vietNgay(fm.ngay_kiem_lai)}</time>
                </dd>
              </div>
            ) : null}
            <div>
              <dt>Người soát</dt>
              <dd>{fm.nguoi_soat ?? <OCan ma="F2" kieu="dong" />}</dd>
            </div>
            {fm.muc_tin_cay ? (
              <div>
                <dt>Mức tin cậy</dt>
                <dd>
                  <span className={`label ${lop ?? "l1"}`}>{fm.muc_tin_cay}</span>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
        <h3 className="tg-nguon">Nguồn</h3>
        {fm.nguon.length > 0 ? (
          <ul className="list">
            {fm.nguon.map((n) => (
              <li key={n.ten}>
                <TenNguon n={n} />
              </li>
            ))}
          </ul>
        ) : (
          <OCan ma="C1" />
        )}
      </div>
    </section>
  );
}

function TenNguon({ n }: { n: Nguon }) {
  const ten = n.url ? (
    <a href={n.url} rel="noopener">
      {n.ten}
    </a>
  ) : (
    n.ten
  );
  return (
    <>
      {ten}
      {n.dien_y ? " (diễn ý)" : null}
    </>
  );
}

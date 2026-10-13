"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { OBay, guiThu } from "@/components/thu/GuiThu";
import { useCheDoTinh } from "@/lib/dung-moi-truong";
import { CHU_THU, NOI_NHAN_THU, loiGuiThu } from "@/lib/thu-chu";
import { CHU_DE_THU, NHAN_CHU_DE_THU, type ChuDeThu } from "./chu";

/**
 * Tiêu đề "chữ thấm vào giấy": từng chữ hiện dần khi cuộn tới (bản mẫu V2).
 * Chữ nằm sẵn trong HTML; khi chưa có JavaScript, CSS hiện đủ chữ.
 */
export function ChuTham({ id, chu }: { id: string; chu: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const tinh = useCheDoTinh();
  const [toi, setToi] = useState(false);
  const on = toi || tinh;

  useEffect(() => {
    const h = ref.current;
    if (!h || tinh) return;
    if (!("IntersectionObserver" in window)) {
      const r = requestAnimationFrame(() => setToi(true));
      return () => cancelAnimationFrame(r);
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting) {
          setToi(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(h);
    return () => io.disconnect();
  }, [tinh]);

  const tu = chu.split(" ");
  return (
    <h2 id={id} className={on ? "inkwrite on" : "inkwrite"} ref={ref}>
      {tu.map((w, i) => (
        <Fragment key={i}>
          <span className="w" style={{ transitionDelay: `${i * 70}ms` }}>
            {w}
          </span>
          {i < tu.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}


const DIEU = [
  "Không nói trước tương lai",
  "Luôn nói thật",
  "Nhãn tin cậy",
  "Đời luôn có thể chuyển",
  "Đồng hành để bạn tự bước đi",
  "An toàn trên hết",
  "Không thay thế bác sĩ",
  "Giữ kín thông tin",
  "Lợi ích được công khai",
];

/**
 * Lá thư gửi Khai Minh (bản mẫu K1.9.9): chọn chủ đề, ô viết, phiếu đồng ý.
 * Các liên kết có `data-topic` ở khắp trang chủ chọn sẵn chủ đề tương ứng; ở
 * trang /gui-cau-hoi, chủ đề đến từ tham số `?chu-de=` của địa chỉ.
 *
 * Gửi thật từ phiên S5: lá thư đi tới nơi nhận thư của web (NOI_NHAN_THU,
 * app/api/thu/route.ts), rồi sang trang cảm ơn. Gửi không được thì hiện lời
 * báo ngay dưới nút và giữ nguyên chữ khách đã viết. Khi trình duyệt không
 * chạy JavaScript, biểu mẫu vẫn gửi được theo cách thường của HTML.
 */
const khongDoi = () => () => {};

function docChuDeTuDiaChi(): ChuDeThu | null {
  const ma = new URLSearchParams(window.location.search).get("chu-de");
  return ma && ma in CHU_DE_THU ? (ma as ChuDeThu) : null;
}

export function ThuGuiToi({ zalo }: { zalo: string | null }) {
  // Trang /gui-cau-hoi: chủ đề do liên kết ở trang khác mang theo (lib/lien-ket.ts).
  const tuDiaChi = useSyncExternalStore(khongDoi, docChuDeTuDiaChi, () => null);
  const [daChon, setChuDe] = useState<ChuDeThu | null>(null);
  const chuDe: ChuDeThu = daChon ?? tuDiaChi ?? "q";
  const [loiNhan, setLoiNhan] = useState<{ chu: string; loi: boolean } | null>(null);
  const [dangGui, setDangGui] = useState(false);
  // Trình duyệt không chạy JavaScript thì tự kiểm các ô `required`; có JavaScript
  // thì biểu mẫu tự kiểm để hiện lời nhắc ấm hơn.
  const tuKiem = useSyncExternalStore(khongDoi, () => true, () => false);
  const oViet = useRef<HTMLTextAreaElement>(null);
  const oThu = useRef<HTMLInputElement>(null);
  const oDongY = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const bam = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[data-topic]");
      const ma = a?.getAttribute("data-topic");
      if (ma && ma in CHU_DE_THU) setChuDe(ma as ChuDeThu);
    };
    document.addEventListener("click", bam);
    return () => document.removeEventListener("click", bam);
  }, []);

  const gui = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dangGui) return;
    const t = oViet.current;
    const m = oThu.current;
    const ok = oDongY.current;
    if (!t || !m || !ok) return;
    if (!t.value.trim()) {
      setLoiNhan({ chu: CHU_THU.thieuCauHoi, loi: true });
      t.focus();
      return;
    }
    if (m.value.trim() && !m.checkValidity()) {
      setLoiNhan({ chu: CHU_THU.saiDiaChi, loi: true });
      m.focus();
      return;
    }
    if (!ok.checked) {
      setLoiNhan({ chu: CHU_THU.chuaDongYHoi, loi: true });
      ok.focus();
      return;
    }
    setDangGui(true);
    setLoiNhan({ chu: CHU_THU.dangGui, loi: false });
    const kq = await guiThu(e.currentTarget);
    if (kq.ok) {
      router.push(kq.den);
      return;
    }
    setDangGui(false);
    const loi = loiGuiThu(kq.loi, "hoi");
    setLoiNhan({ chu: kq.loi === "nhieu" || !zalo ? loi : `${loi} ${CHU_THU.loiZalo(zalo)}`, loi: true });
  };

  const [nhanO, nhacNho] = CHU_DE_THU[chuDe];

  return (
    <form id="askForm" action={NOI_NHAN_THU} method="post" noValidate={tuKiem} onSubmit={gui}>
      <input type="hidden" name="loai" value="hoi" />
      <OBay />
      <fieldset className="sd-topic">
        <legend>Bạn viết thư về điều gì?</legend>
        <div className="sd-chips">
          {NHAN_CHU_DE_THU.map((c) => (
            <label className="sd-chip" key={c.ma}>
              <input
                type="radio"
                name="topic"
                value={c.ma}
                checked={chuDe === c.ma}
                onChange={() => setChuDe(c.ma)}
              />
              <span>{c.nhan}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="sd-hint" id="sdHint" aria-live="polite">
        {nhacNho}
      </p>
      <div className="field sd-dieu" id="sdDieu" hidden={chuDe !== "hc"}>
        <label htmlFor="q-dieu">Bạn góp ý về điều số mấy?</label>
        <select id="q-dieu" name="dieu">
          {DIEU.map((d, i) => (
            <option key={d} value={i + 1}>
              Điều {i + 1}: {d}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="q-name">Bạn muốn tôi gọi bạn là gì? (không bắt buộc)</label>
        <input id="q-name" name="ten" type="text" autoComplete="nickname" maxLength={80} />
      </div>
      <div className="field">
        <label htmlFor="q-text" id="qLabel">
          {nhanO}
        </label>
        <textarea
          id="q-text"
          name="cau-hoi"
          ref={oViet}
          required
          maxLength={6000}
          placeholder="Bạn viết bằng lời của mình, dài ngắn thế nào cũng được."
        />
      </div>
      <div className="field">
        <label htmlFor="q-mail">Địa chỉ thư, nếu bạn muốn nhận lời hồi âm</label>
        <input id="q-mail" name="email" type="email" autoComplete="email" maxLength={254} ref={oThu} />
      </div>
      <label className="consent">
        <input type="checkbox" id="q-ok" name="dong-y" ref={oDongY} required />
        <span>
          Tôi đồng ý để Khai&nbsp;Minh đọc lá thư này và có thể trả lời trong một bài viết không nêu tên tôi, theo cách
          được nói rõ ở <Link href="/du-lieu">trang Dữ liệu</Link>.
        </span>
      </label>
      <button className="submit" type="submit" aria-disabled={dangGui || undefined}>
        Gửi thư cho Khai&nbsp;Minh
      </button>
      <p className="msg" id="askMsg" aria-live="polite" style={loiNhan?.loi ? { color: "#7A3B10" } : undefined}>
        {loiNhan?.chu}
      </p>
    </form>
  );
}

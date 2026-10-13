"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { OBay, guiThu } from "@/components/thu/GuiThu";
import { CHU_THU, NOI_NHAN_THU, loiGuiThu } from "@/lib/thu-chu";

const khongDoi = () => () => {};

/**
 * Ô nhận thư (`form.signup` của bản mẫu): “Nhận thư hằng tháng” (`loai="thang"`)
 * và “Báo cho tôi khi sách ra đời” (`loai="sach"`).
 *
 * Gửi thật từ phiên S5: địa chỉ đi tới nơi nhận thư của web (NOI_NHAN_THU), rồi
 * sang trang cảm ơn. Bản mẫu không có phiếu đồng ý ở ô này; S5 thêm một ô
 * đánh dấu dẫn tới trang Dữ liệu, vì Hiến chương nói “sự im lặng không bao giờ
 * được xem là đồng ý”. Bản thật chưa có nơi nhận thư thì nơi dùng ô này không
 * dựng nó (`siteConfig.moLoiThu`; docs/07, mục A18).
 */
export function FormNhanThu({ id, nut, loai }: { id: string; nut: string; loai: "thang" | "sach" }) {
  const [loi, setLoi] = useState(false);
  const [bao, setBao] = useState("");
  const [dangGui, setDangGui] = useState(false);
  // Không có JavaScript thì trình duyệt tự kiểm các ô `required`.
  const tuKiem = useSyncExternalStore(khongDoi, () => true, () => false);
  const oDongY = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const gui = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dangGui) return;
    const form = e.currentTarget;
    const o = form.elements.namedItem("email") as HTMLInputElement;
    if (!o.value.trim() || !o.checkValidity()) {
      setLoi(true);
      setBao(CHU_THU.saiDiaChi);
      o.focus();
      return;
    }
    if (!oDongY.current?.checked) {
      setLoi(true);
      setBao(CHU_THU.chuaDongYNhanThu);
      oDongY.current?.focus();
      return;
    }
    setDangGui(true);
    setLoi(false);
    setBao(CHU_THU.dangGui);
    const kq = await guiThu(form);
    if (kq.ok) {
      router.push(kq.den);
      return;
    }
    setDangGui(false);
    setLoi(true);
    setBao(loiGuiThu(kq.loi, loai));
  };

  const [truoc, lienKet, sau] = CHU_THU.dongYNhanThu;

  return (
    <>
      <form className="signup" action={NOI_NHAN_THU} method="post" noValidate={tuKiem} onSubmit={gui}>
        <input type="hidden" name="loai" value={loai} />
        <OBay />
        <label className="sr" htmlFor={id}>
          Địa chỉ thư của bạn
        </label>
        <input
          id={id}
          name="email"
          type="email"
          placeholder="Địa chỉ thư của bạn"
          autoComplete="email"
          maxLength={254}
          required
          aria-invalid={loi || undefined}
          aria-describedby={`${id}-bao`}
        />
        <button className="btn" type="submit" aria-disabled={dangGui || undefined}>
          {nut}
        </button>
        <label className="signup-dy">
          <input type="checkbox" name="dong-y" ref={oDongY} required />
          <span>
            {truoc}
            <Link href="/du-lieu">{lienKet}</Link>
            {sau}
          </span>
        </label>
      </form>
      <p className="msg" id={`${id}-bao`} aria-live="polite" style={loi ? { color: "#7A3B10" } : undefined}>
        {bao}
      </p>
    </>
  );
}

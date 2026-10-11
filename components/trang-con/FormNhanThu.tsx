"use client";

import { useState, type FormEvent } from "react";

/**
 * Ô nhận thư của cửa Trí và cửa Thân (`form.signup` của bản mẫu).
 *
 * Như bản mẫu, đây mới là bản xem trước: bấm gửi thì hiện lời cảm ơn nhưng
 * địa chỉ thư chưa được gửi đi đâu (docs/07, mục A5 và E18; phiên S5).
 * Bản thật chưa có nơi nhận thư thì nơi dùng ô này không dựng nó
 * (`siteConfig.moLoiThu`; docs/07, mục A18).
 */
export function FormNhanThu({ id, nut, camOn }: { id: string; nut: string; camOn: string }) {
  const [loi, setLoi] = useState(false);
  const [bao, setBao] = useState("");

  const gui = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const o = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (!o.value || o.value.indexOf("@") < 1) {
      setLoi(true);
      setBao("Bạn giúp tôi điền địa chỉ thư đầy đủ nhé, để lá thư đến đúng nơi.");
      o.focus();
      return;
    }
    setLoi(false);
    setBao(camOn);
    o.value = "";
  };

  return (
    <>
      <form className="signup" noValidate onSubmit={gui} data-can="A5: chưa có nơi nhận thư">
        <label className="sr" htmlFor={id}>
          Địa chỉ thư của bạn
        </label>
        <input
          id={id}
          name="email"
          type="email"
          placeholder="Địa chỉ thư của bạn"
          autoComplete="email"
          aria-invalid={loi || undefined}
          aria-describedby={`${id}-bao`}
        />
        <button className="btn" type="submit">
          {nut}
        </button>
      </form>
      <p className="msg" id={`${id}-bao`} aria-live="polite" style={loi ? { color: "#7A3B10" } : undefined}>
        {bao}
      </p>
    </>
  );
}

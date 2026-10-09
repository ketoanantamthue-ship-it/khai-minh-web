"use client";

import { useEffect, useState } from "react";

/**
 * Nút "Aa Chữ lớn" (lớp `easy`) và "Bản nhẹ cho máy yếu" (lớp `lite`) trên <html>.
 * Lựa chọn lưu ở localStorage `km-easy` / `km-lite`; script đầu trang trong
 * app/layout.tsx đọc lại trước khi vẽ để trang không nháy.
 * Mọi nút cùng loại trên trang luôn đồng bộ qua sự kiện `km-hien-thi`.
 */

type CheDo = "easy" | "lite";

const KHOA: Record<CheDo, string> = { easy: "km-easy", lite: "km-lite" };
const SU_KIEN = "km-hien-thi";

function dangBat(cheDo: CheDo): boolean {
  return document.documentElement.classList.contains(cheDo);
}

function useCheDo(cheDo: CheDo): [boolean, () => void] {
  const [bat, setBat] = useState(false);

  useEffect(() => {
    const dongBo = () => setBat(dangBat(cheDo));
    dongBo();
    window.addEventListener(SU_KIEN, dongBo);
    return () => window.removeEventListener(SU_KIEN, dongBo);
  }, [cheDo]);

  const doi = () => {
    const moi = !dangBat(cheDo);
    document.documentElement.classList.toggle(cheDo, moi);
    try {
      window.localStorage.setItem(KHOA[cheDo], moi ? "1" : "0");
    } catch {
      // Trình duyệt chặn localStorage: lựa chọn chỉ giữ trong lần xem này.
    }
    window.dispatchEvent(new Event(SU_KIEN));
  };

  return [bat, doi];
}

/** Nút "Aa Chữ lớn". `nhan` là chữ hiện cạnh "Aa". */
export function NutChuLon({ nhan }: { nhan: string }) {
  const [bat, doi] = useCheDo("easy");
  return (
    <button
      className="aa-btn"
      type="button"
      aria-pressed={bat}
      aria-label={bat ? "Tắt chữ lớn" : "Bật chữ lớn, dễ đọc"}
      onClick={doi}
    >
      <span aria-hidden="true">Aa</span>
      <em>{nhan}</em>
    </button>
  );
}

/** Nút "Bản nhẹ cho máy yếu". */
export function NutBanNhe() {
  const [bat, doi] = useCheDo("lite");
  return (
    <button className="lite-btn" type="button" aria-pressed={bat} onClick={doi}>
      {bat ? "Đang dùng bản nhẹ" : "Bản nhẹ cho máy yếu"}
    </button>
  );
}

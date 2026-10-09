"use client";

import { useSyncExternalStore } from "react";
import { laCheDoTinh } from "./su-kien";

/**
 * Các hook đọc môi trường trình duyệt mà không gây lệch khi hydrate:
 * phía server (và lúc hydrate) luôn trả giá trị mặc định, sau đó mới là
 * giá trị thật của trình duyệt.
 */

const khongDoi = () => () => {};

/** `true` khi trang đã chạy JavaScript phía client. */
export function useCoJs(): boolean {
  return useSyncExternalStore(
    khongDoi,
    () => true,
    () => false,
  );
}

/** Sự kiện do HienThiToggle phát khi khách bật/tắt Chữ lớn hoặc Bản nhẹ. */
const SU_KIEN_HIEN_THI = "km-hien-thi";

function ngheCheDo(bao: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", bao);
  window.addEventListener(SU_KIEN_HIEN_THI, bao);
  return () => {
    mq.removeEventListener("change", bao);
    window.removeEventListener(SU_KIEN_HIEN_THI, bao);
  };
}

/** Chế độ tĩnh (giảm chuyển động, Bản nhẹ, Chữ lớn). Phía server coi là tĩnh. */
export function useCheDoTinh(): boolean {
  return useSyncExternalStore(ngheCheDo, laCheDoTinh, () => true);
}

/** Đọc một khoá localStorage, cập nhật khi có sự kiện `ten` trên window. */
export function useKhoLuu(khoa: string, suKien: string): string | null {
  return useSyncExternalStore(
    (bao) => {
      window.addEventListener(suKien, bao);
      window.addEventListener("storage", bao);
      return () => {
        window.removeEventListener(suKien, bao);
        window.removeEventListener("storage", bao);
      };
    },
    () => {
      try {
        return window.localStorage.getItem(khoa);
      } catch {
        return null;
      }
    },
    () => null,
  );
}

/** `true` khi màn hình chính là màn hình cảm ứng (không rê chuột được). */
export function useManHinhCham(): boolean {
  return useSyncExternalStore(
    (bao) => {
      const mq = window.matchMedia("(hover: none)");
      mq.addEventListener("change", bao);
      return () => mq.removeEventListener("change", bao);
    },
    () => window.matchMedia("(hover: none)").matches,
    () => false,
  );
}

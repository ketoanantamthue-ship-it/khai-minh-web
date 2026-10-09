/**
 * Giữ phím Tab trong một hộp thoại (focus trap), như cánh cổng của bản mẫu:
 * chỉ tính các nút và liên kết đang thấy được và bấm được.
 * Trả về hàm gỡ bỏ.
 */
export function bayFocus(hop: HTMLElement): () => void {
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const ds = [...hop.querySelectorAll<HTMLElement>("button,a[href],input,select,textarea,summary")].filter((x) => {
      const s = getComputedStyle(x);
      return (
        !(x as HTMLButtonElement).disabled &&
        !x.closest("[inert]") &&
        x.getClientRects().length > 0 &&
        s.visibility !== "hidden" &&
        parseFloat(s.opacity) > 0.05 &&
        s.pointerEvents !== "none"
      );
    });
    if (!ds.length) return;
    const i = ds.indexOf(document.activeElement as HTMLElement);
    if (e.shiftKey && i <= 0) {
      e.preventDefault();
      ds[ds.length - 1]!.focus();
    } else if (!e.shiftKey && (i === ds.length - 1 || i === -1)) {
      e.preventDefault();
      ds[0]!.focus();
    }
  };
  hop.addEventListener("keydown", onKey);
  return () => hop.removeEventListener("keydown", onKey);
}

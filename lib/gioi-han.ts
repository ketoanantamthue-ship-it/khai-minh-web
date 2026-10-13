/**
 * Giới hạn tần suất gửi thư theo địa chỉ mạng (phiên S5).
 *
 * Bộ đếm nằm trong bộ nhớ của từng máy chủ Vercel, nên chỉ là lớp chặn thứ
 * nhất. Lớp thứ hai nằm ở Apps Script (apps-script/Code.gs), đếm chung cho mọi
 * máy chủ theo khoá băm của địa chỉ mạng.
 */
export function taoGioiHan({ toiDa, khoangMs }: { toiDa: number; khoangMs: number }) {
  const so = new Map<string, number[]>();

  return function duocGui(khoa: string, bayGio = Date.now()): boolean {
    // Dọn các khoá đã hết hạn để bộ nhớ không phình ra.
    if (so.size > 5000) {
      for (const [k, ds] of so) if (ds.every((t) => bayGio - t >= khoangMs)) so.delete(k);
    }
    const ds = (so.get(khoa) ?? []).filter((t) => bayGio - t < khoangMs);
    if (ds.length >= toiDa) {
      so.set(khoa, ds);
      return false;
    }
    ds.push(bayGio);
    so.set(khoa, ds);
    return true;
  };
}

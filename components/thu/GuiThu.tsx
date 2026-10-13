import { NOI_NHAN_THU, type MaLoiThu } from "@/lib/thu-chu";

/**
 * Phần dùng chung của các biểu mẫu gửi thư (phiên S5): ô bẫy máy gửi rác và
 * hàm gửi biểu mẫu tới nơi nhận thư (app/api/thu/route.ts).
 */

/**
 * Ô bẫy: người thật không thấy, không bấm Tab tới được, máy đọc màn hình bỏ
 * qua. Máy gửi rác điền mọi ô nó gặp, nên lá thư có ô này được điền sẽ bị bỏ.
 */
export function OBay() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Trang web của bạn
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export type KetQuaGui = { ok: true; den: string } | { ok: false; loi: MaLoiThu };

/** Gửi biểu mẫu tới nơi nhận thư và đọc kết quả. Mất mạng thì báo lỗi `mang`. */
export async function guiThu(form: HTMLFormElement): Promise<KetQuaGui> {
  try {
    const res = await fetch(NOI_NHAN_THU, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>),
    });
    const kq = (await res.json()) as KetQuaGui;
    if (kq && typeof kq.ok === "boolean") return kq;
  } catch {}
  return { ok: false, loi: "mang" };
}

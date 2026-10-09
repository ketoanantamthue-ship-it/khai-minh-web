import Link from "next/link";
import { DOOR_KEYS, doors, doorStyle, type DoorKey } from "@/lib/doors";

/** Tên phụ và lời dẫn của mỗi cửa trong khối `.dsw` (chữ của bản mẫu). */
export const CHU_CUA: Record<DoorKey, { phu: string; danhCho: string }> = {
  tam: { phu: "An Tâm Mệnh", danhCho: "Dành cho bạn khi lòng chưa yên." },
  tri: { phu: "Sách và tri thức", danhCho: "Dành cho bạn khi muốn hiểu cho đúng." },
  than: { phu: "Dưỡng sinh Trần Y Thư", danhCho: "Dành cho bạn khi thân thể mỏi mệt." },
};

/**
 * Khối "Ngôi nhà này còn hai cánh cửa khác" (`section.dsw` của bản mẫu).
 * Trên trang cửa, cửa đang xem đứng đầu và mang nhãn "Bạn đang ở đây";
 * hai cửa còn lại theo thứ tự Tâm, Trí, Thân. Trên trang chặng, ba cửa
 * đều là lối đi.
 */
export function BaCuaKhac({ hienTai, tieuDe, loiDan }: { hienTai?: DoorKey; tieuDe: string; loiDan: string }) {
  const thuTu = hienTai ? [hienTai, ...DOOR_KEYS.filter((k) => k !== hienTai)] : [...DOOR_KEYS];

  return (
    <section className="dsw" aria-labelledby="dsw-h">
      <div className="wrap">
        <h2 id="dsw-h">{tieuDe}</h2>
        <p className="dsw-l">{loiDan}</p>
        <div className="dsw-g">
          {thuTu.map((k) => {
            const d = doors[k];
            const dangO = k === hienTai;
            return (
              <Link
                key={k}
                className={`dsw-c ${k}`}
                href={d.href}
                style={doorStyle(k)}
                aria-current={dangO ? "page" : undefined}
              >
                <span className="dsw-s" aria-hidden="true">
                  {d.han}
                </span>
                <span>
                  <span className="dsw-n">
                    Cửa {d.ten}
                    {dangO ? <em className="dsw-here">Bạn đang ở đây</em> : null}
                  </span>
                  <span className="dsw-b">{CHU_CUA[k].phu}</span>
                  <span className="dsw-f">{CHU_CUA[k].danhCho}</span>
                </span>
                {dangO ? null : (
                  <span className="dsw-a" aria-hidden="true">
                    ›
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

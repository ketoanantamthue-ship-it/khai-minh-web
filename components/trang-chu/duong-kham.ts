/**
 * Đường khảm vàng của chín chặng (bản mẫu: hàm buildLine).
 *
 * Hạt giống cố định nên đường luôn giống nhau: server vẽ sẵn SVG, client chỉ
 * dùng lại toạ độ để đặt nhãn và cho vệt sáng chạy theo.
 */

export const KHUNG_RONG = 1200;
export const KHUNG_CAO = 120;

export type DuongKham = {
  d: string;
  /** Các điểm của đường, mỗi điểm cách nhau 20 đơn vị. */
  diem: [number, number][];
  /** Chín mảnh vỏ trứng, mỗi chặng một mảnh. */
  vo: { d: string; x: number; y: number; xoay: number }[];
};

const HINH_VO = ["M-7 -2 L-2 -6 L6 -4 L7 3 L0 6 L-6 4Z", "M-6 -4 L3 -6 L7 0 L3 5 L-5 5 L-7 0Z", "M-5 -5 L5 -5 L7 2 L1 6 L-7 2Z"];
export const HINH_VO_DIEN_THOAI = HINH_VO[0]!;

/** Hoành độ của chặng k (0–8) trên khung 1200. */
export function xCuaChang(k: number): number {
  return 60 + k * (1080 / 8);
}

export function yTai(diem: [number, number][], x: number): number {
  const i = Math.max(0, Math.min(diem.length - 1, Math.round(x / 20) - 1));
  return diem[i]![1];
}

export function veDuongKham(): DuongKham {
  const y0 = 64;
  let seed = 3;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const diem: [number, number][] = [];
  let d = `M0 ${y0}`;
  for (let i = 1; i <= 60; i++) {
    const x = i * 20;
    const y = y0 + Math.sin(i * 0.37) * 5 + Math.sin(i * 1.9) * 1.6 + (rnd() - 0.5) * 1.4;
    d += ` L${x} ${y.toFixed(2)}`;
    diem.push([x, y]);
  }
  const vo = Array.from({ length: 9 }, (_, k) => {
    const x = xCuaChang(k);
    return { d: HINH_VO[k % 3]!, x, y: yTai(diem, x), xoay: ((k * 23) % 40) - 20 };
  });
  return { d, diem, vo };
}

/* ---------- Khảm vỏ trứng: mảnh vỏ nứt thành khảm (Voronoi trong đa giác) ---------- */

type Diem = [number, number];

export function docDaGiac(d: string): Diem[] {
  const n = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
  const ra: Diem[] = [];
  for (let i = 0; i < n.length; i += 2) ra.push([n[i]!, n[i + 1]!]);
  return ra;
}

export function nam(p: Diem, poly: Diem[]): boolean {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i]!;
    const b = poly[j]!;
    if (a[1] > p[1] !== b[1] > p[1] && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) c = !c;
  }
  return c;
}

function cat(poly: Diem[], a: number, b: number, c: number): Diem[] {
  const ra: Diem[] = [];
  for (let i = 0; i < poly.length; i++) {
    const P = poly[i]!;
    const Q = poly[(i + 1) % poly.length]!;
    const inP = a * P[0] + b * P[1] <= c;
    const inQ = a * Q[0] + b * Q[1] <= c;
    if (inP) ra.push(P);
    if (inP !== inQ) {
      const den = a * (Q[0] - P[0]) + b * (Q[1] - P[1]);
      const t = (c - a * P[0] - b * P[1]) / den;
      ra.push([P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]);
    }
  }
  return ra;
}

/** Chia đa giác thành các mảnh quanh những hạt nằm trong nó. */
export function chiaManh(poly: Diem[], soHat: number, R: () => number): { manh: Diem[]; hat: Diem }[] {
  const hat: Diem[] = [];
  let thu = 0;
  while (hat.length < soHat && thu < 400) {
    thu++;
    const s: Diem = [-8 + R() * 16, -7 + R() * 14];
    if (nam(s, poly)) hat.push(s);
  }
  const ra: { manh: Diem[]; hat: Diem }[] = [];
  hat.forEach((sd, i) => {
    let o = poly.slice();
    hat.forEach((h, j) => {
      if (i === j) return;
      const a = h[0] - sd[0];
      const b = h[1] - sd[1];
      o = cat(o, a, b, (a * (sd[0] + h[0])) / 2 + (b * (sd[1] + h[1])) / 2);
    });
    if (o.length >= 3) ra.push({ manh: o, hat: sd });
  });
  return ra;
}

/** Bộ sinh ngẫu nhiên có hạt giống (bản mẫu: hàm rng). */
export function taoNgauNhien(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

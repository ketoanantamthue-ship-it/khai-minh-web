/**
 * Nhận diện ba cửa (docs/03, mục 2; bản mẫu K1.9.16).
 *
 * Đây là nơi duy nhất giữ mã màu của ba cửa. Mọi thành phần lấy màu từ map
 * này, không viết cứng mã màu.
 */

export const DOOR_KEYS = ["tam", "tri", "than"] as const;
export type DoorKey = (typeof DOOR_KEYS)[number];

export type Door = {
  key: DoorKey;
  /** Tên cửa hiện cho khách. */
  ten: string;
  /** Chữ dấu. */
  han: string;
  /** Đường dẫn trang cửa (docs/02, mục 1). */
  href: `/${DoorKey}`;
  /** `--dc`: màu chính. */
  dc: string;
  /** `--dc2`: màu sáng, dùng trên nền tối. */
  dc2: string;
  /** `--ink-d`: màu chữ trên giấy. */
  inkD: string;
  /** `--tint`: màu nền nhạt. */
  tint: string;
};

export const doors: Record<DoorKey, Door> = {
  tam: {
    key: "tam",
    ten: "Tâm",
    han: "心",
    href: "/tam",
    dc: "#B8452F",
    dc2: "#E58B73",
    inkD: "#9B3A33",
    tint: "#F4E4DC",
  },
  tri: {
    key: "tri",
    ten: "Trí",
    han: "智",
    href: "/tri",
    dc: "#4E78B5",
    dc2: "#93B4E6",
    inkD: "#355C94",
    tint: "#E1E8F3",
  },
  than: {
    key: "than",
    ten: "Thân",
    han: "身",
    href: "/than",
    dc: "#2F9A8F",
    dc2: "#7FD3C8",
    inkD: "#1F7A70",
    tint: "#DCEFEB",
  },
};

export const doorList: Door[] = DOOR_KEYS.map((k) => doors[k]);

/** Biến CSS của một cửa, đặt lên phần tử gốc của trang hoặc thẻ cửa. */
export function doorStyle(key: DoorKey): Record<"--dc" | "--dc2" | "--ink-d" | "--tint", string> {
  const d = doors[key];
  return { "--dc": d.dc, "--dc2": d.dc2, "--ink-d": d.inkD, "--tint": d.tint };
}

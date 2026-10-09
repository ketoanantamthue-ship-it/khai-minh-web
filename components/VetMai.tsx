/** Dấu "vết mài": chữ ký thị giác của Khai Minh (bản mẫu K1.9.16). */
export function VetMai({ size, animated = false }: { size: number; animated?: boolean }) {
  return (
    <svg
      className={animated ? "vm vm-anim" : "vm"}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="38" height="38" rx="3" fill="#0E0B09" stroke="rgba(196,151,59,.65)" />
      <rect x="4" y="4" width="32" height="32" rx="1.5" fill="none" stroke="rgba(196,151,59,.25)" />
      <path
        className="vm-s"
        d="M9 27 Q19 16 32 19.5"
        fill="none"
        stroke="#EFE6D2"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        className="vm-h"
        d="M11 25.6 Q19.5 17.4 30 19.6"
        fill="none"
        stroke="#FFF8EA"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle className="vm-g" cx="7.5" cy="30" r=".7" fill="#EFE6D2" />
      <circle className="vm-g" cx="33.5" cy="23" r=".6" fill="#EFE6D2" />
    </svg>
  );
}

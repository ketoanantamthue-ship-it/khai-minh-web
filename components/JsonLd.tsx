/**
 * Một khối dữ liệu có cấu trúc (JSON-LD) nằm sẵn trong HTML (docs/05, mục 1).
 * Dấu “<” được thoát để chữ trong bài không đóng được thẻ script.
 */
export function JsonLd({ duLieu }: { duLieu: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(duLieu).replace(/</g, "\\u003c") }}
    />
  );
}

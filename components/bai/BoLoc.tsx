"use client";

import { useId, useState } from "react";
import { useCoJs } from "@/lib/dung-moi-truong";

type LuaChon = { gia: string; ten: string };

/**
 * Bộ lọc theo ba nhãn cho trang /viet (docs/02, mục 2: “Lọc theo ba nhãn”).
 *
 * Danh sách bài nằm sẵn trong HTML (mỗi dòng mang data-chang, data-tang,
 * data-cua). Bộ lọc chỉ ẩn bớt dòng phía trình duyệt, nên trang vẫn dựng sẵn
 * lúc build. Không có JavaScript thì bộ lọc không hiện, mọi bài vẫn đọc được.
 */
export function BoLoc({
  vung,
  chang,
  tang,
  cua,
}: {
  /** id của phần tử chứa danh sách. */
  vung: string;
  chang: LuaChon[];
  tang: LuaChon[];
  cua: LuaChon[];
}) {
  const coJs = useCoJs();
  const id = useId();
  const [chon, setChon] = useState({ chang: "", tang: "", cua: "" });

  if (!coJs) return null;

  const doi = (khoa: keyof typeof chon, gia: string) => {
    const moi = { ...chon, [khoa]: gia };
    setChon(moi);
    document.querySelectorAll<HTMLElement>(`#${vung} li[data-tang]`).forEach((li) => {
      const hop =
        (!moi.chang || li.dataset.chang === moi.chang) &&
        (!moi.tang || li.dataset.tang === moi.tang) &&
        (!moi.cua || (li.dataset.cua ?? "").split(" ").includes(moi.cua));
      li.hidden = !hop;
    });
  };

  const o = (khoa: keyof typeof chon, nhan: string, ds: LuaChon[]) => (
    <label className="loc-o" htmlFor={`${id}-${khoa}`}>
      <span>{nhan}</span>
      <select id={`${id}-${khoa}`} value={chon[khoa]} onChange={(e) => doi(khoa, e.target.value)}>
        <option value="">Tất cả</option>
        {ds.map((l) => (
          <option key={l.gia} value={l.gia}>
            {l.ten}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="loc" role="group" aria-label="Lọc theo chặng, tầng và cửa">
      {o("chang", "Chặng", chang)}
      {o("tang", "Tầng", tang)}
      {o("cua", "Cửa", cua)}
    </div>
  );
}

"use client";

import { SWEDEN_YEARS, SWEDEN_BY_AGE_GROUP } from "@/data/incidens-acl-data";

const AGE_GROUPS = [
  "40–44",
  "35–39",
  "30–34",
  "25–29",
  "20–24",
  "15–19",
  "10–14",
] as const;

const ALL_VALUES = AGE_GROUPS.flatMap(
  (g) => SWEDEN_BY_AGE_GROUP[g] as unknown as number[]
);
const MAX_VAL = Math.max(...ALL_VALUES);

function cellColor(v: number): string {
  const t = Math.min(v / MAX_VAL, 1);
  if (t === 0) return "rgb(248, 250, 252)";
  const r = Math.round(238 - t * 159);
  const g = Math.round(242 - t * 172);
  const b = Math.round(255 - t * 26);
  return `rgb(${r}, ${g}, ${b})`;
}

function textColor(v: number): string {
  return v / MAX_VAL > 0.45 ? "rgb(255,255,255)" : "rgb(30, 41, 59)";
}

const DISPLAY_YEARS = SWEDEN_YEARS.filter((yr) => yr % 2 === 0);

export function AgeHeatmap() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white pb-2 pr-2 text-left text-xs font-medium text-slate-500">
              Ålder
            </th>
            {SWEDEN_YEARS.map((yr) => (
              <th
                key={yr}
                className="min-w-[34px] pb-2 text-center font-medium text-slate-400"
              >
                {DISPLAY_YEARS.includes(yr) ? yr : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AGE_GROUPS.map((group) => {
            const values = SWEDEN_BY_AGE_GROUP[group] as unknown as number[];
            return (
              <tr key={group}>
                <td className="sticky left-0 z-10 bg-white pr-2 text-right text-xs font-medium text-slate-600 whitespace-nowrap">
                  {group}
                </td>
                {values.map((v, i) => (
                  <td
                    key={SWEDEN_YEARS[i]}
                    className="p-0"
                  >
                    <div
                      className="flex h-8 items-center justify-center rounded-[3px] mx-px my-px tabular-nums font-medium transition-colors"
                      style={{
                        backgroundColor: cellColor(v),
                        color: textColor(v),
                      }}
                      title={`${group}, ${SWEDEN_YEARS[i]}: ${v} / 100 000`}
                    >
                      {v > 0 ? Math.round(v) : ""}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <span>Låg</span>
        <div className="flex h-3 w-32 overflow-hidden rounded-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-full flex-1"
              style={{ backgroundColor: cellColor((i / 19) * MAX_VAL) }}
            />
          ))}
        </div>
        <span>Hög ({Math.round(MAX_VAL)})</span>
      </div>
    </div>
  );
}

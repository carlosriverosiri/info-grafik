"use client";

import { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SWEDEN_YEARS,
  SWEDEN_BY_AGE_GROUP,
  AGE_GROUP_OPTIONS,
  INTERNATIONAL_STUDIES,
  type AgeGroup,
} from "@/data/incidens-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LABELS = SWEDEN_YEARS.map(String);

function buildInternationalDataset(study: (typeof INTERNATIONAL_STUDIES)[number]) {
  const data = LABELS.map((label) => {
    const pt = study.dataPoints.find((d) => d.year === Number(label));
    return pt ? pt.value : null;
  });

  return {
    label: `${study.country} (${study.reference})`,
    data,
    borderColor: study.color,
    backgroundColor: "transparent",
    borderDash: [6, 4],
    borderWidth: 1.5,
    tension: 0.3,
    pointRadius: 3,
    pointHoverRadius: 5,
    spanGaps: true,
  };
}

export function IncidensChart() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("Totalt");

  const showInternational = ageGroup === "Totalt";

  const chartData = useMemo<ChartData<"line">>(() => {
    const swedenValues = [...SWEDEN_BY_AGE_GROUP[ageGroup]];

    const datasets: ChartData<"line">["datasets"] = [
      {
        label: `Sverige — ${ageGroup === "Totalt" ? "alla åldrar" : ageGroup + " år"}`,
        data: swedenValues,
        borderColor: "rgb(79, 70, 229)",
        backgroundColor: "rgba(99, 102, 241, 0.10)",
        fill: true,
        borderWidth: 2.5,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ];

    if (showInternational) {
      for (const study of INTERNATIONAL_STUDIES) {
        datasets.push(buildInternationalDataset(study));
      }
    }

    return { labels: LABELS, datasets };
  }, [ageGroup, showInternational]);

  const yMax = useMemo(() => {
    let max = 0;
    for (const ds of chartData.datasets) {
      for (const v of ds.data as (number | null)[]) {
        if (v !== null && v > max) max = v;
      }
    }
    return Math.ceil(max / 20) * 20 + 20;
  }, [chartData]);

  const options = useMemo<ChartOptions<"line">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 16,
            font: { size: 11, family: "Inter, sans-serif" },
            color: "rgb(51, 65, 85)",
          },
        },
        tooltip: {
          backgroundColor: "rgb(15, 23, 42)",
          titleFont: { family: "Inter, sans-serif" },
          bodyFont: { family: "Inter, sans-serif" },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => {
              const label = ctx.dataset.label || "";
              const v = ctx.parsed.y;
              return v !== null ? `${label}: ${v.toFixed(1)} / 100 000` : "";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: yMax,
          grid: { color: "rgba(0,0,0,0.06)" },
          ticks: {
            color: "rgb(51, 65, 85)",
            font: { family: "Inter, sans-serif" },
          },
          title: {
            display: true,
            text: "Incidens per 100 000 invånare",
            color: "rgb(100, 116, 139)",
            font: { size: 12, family: "Inter, sans-serif" },
          },
        },
        x: {
          grid: { display: false },
          ticks: {
            color: "rgb(51, 65, 85)",
            font: { family: "Inter, sans-serif" },
          },
          title: {
            display: true,
            text: "År",
            color: "rgb(100, 116, 139)",
            font: { size: 12, family: "Inter, sans-serif" },
          },
        },
      },
    }),
    [yMax]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-slate-700">
          Åldersgrupp
        </label>
        <Select value={ageGroup} onValueChange={(v) => setAgeGroup(v as AgeGroup)}>
          <SelectTrigger className="w-52 border-slate-200 bg-white text-sm text-slate-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AGE_GROUP_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!showInternational && (
          <span className="text-xs text-slate-400">
            Internationell jämförelse visas vid &quot;Totalt&quot;
          </span>
        )}
      </div>

      <div className="h-[420px] w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  INTERNATIONAL_STUDIES,
  SWEDEN_BY_AGE_GROUP,
  SWEDEN_YEARS,
} from "@/data/incidens-data";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface RankEntry {
  label: string;
  value: number;
  year: number;
  isSweden: boolean;
}

export function RankingBars() {
  const entries = useMemo<RankEntry[]>(() => {
    const rows: RankEntry[] = INTERNATIONAL_STUDIES.map((s) => {
      const last = s.dataPoints[s.dataPoints.length - 1];
      return {
        label: `${s.country} (${last.year})`,
        value: last.value,
        year: last.year,
        isSweden: false,
      };
    });

    const totalt = SWEDEN_BY_AGE_GROUP["Totalt"];
    rows.push({
      label: `Sverige (${SWEDEN_YEARS[SWEDEN_YEARS.length - 1]})`,
      value: totalt[totalt.length - 1],
      year: SWEDEN_YEARS[SWEDEN_YEARS.length - 1],
      isSweden: true,
    });

    rows.sort((a, b) => b.value - a.value);
    return rows;
  }, []);

  const chartData = useMemo<ChartData<"bar">>(
    () => ({
      labels: entries.map((e) => e.label),
      datasets: [
        {
          data: entries.map((e) => e.value),
          backgroundColor: entries.map((e) =>
            e.isSweden ? "rgb(79, 70, 229)" : "rgb(203, 213, 225)"
          ),
          borderColor: entries.map((e) =>
            e.isSweden ? "rgb(67, 56, 202)" : "rgb(148, 163, 184)"
          ),
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.7,
        },
      ],
    }),
    [entries]
  );

  const options = useMemo<ChartOptions<"bar">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgb(15, 23, 42)",
          titleFont: { family: "Inter, sans-serif", size: 13, weight: "bold" },
          bodyFont: { family: "Inter, sans-serif", size: 12 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => `${ctx.parsed.x.toFixed(1)} per 100 000`,
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.06)" },
          ticks: {
            color: "rgb(51, 65, 85)",
            font: { family: "Inter, sans-serif" },
          },
          title: {
            display: true,
            text: "Incidens per 100 000",
            color: "rgb(100, 116, 139)",
            font: { size: 12, family: "Inter, sans-serif" },
          },
        },
        y: {
          grid: { display: false },
          ticks: {
            color: "rgb(51, 65, 85)",
            font: { size: 12, family: "Inter, sans-serif", weight: "500" },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="h-[360px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}

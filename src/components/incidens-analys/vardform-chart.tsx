"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  SWEDEN_YEARS,
  SLUTENVARD_TOTALT,
  OPPENVARD_TOTALT,
} from "@/data/incidens-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LABELS = SWEDEN_YEARS.map(String);

export function VardformChart() {
  const chartData = useMemo<ChartData<"line">>(
    () => ({
      labels: LABELS,
      datasets: [
        {
          label: "Slutenvård",
          data: [...SLUTENVARD_TOTALT],
          backgroundColor: "rgba(30, 41, 59, 0.55)",
          borderColor: "rgb(30, 41, 59)",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          pointHoverRadius: 5,
        },
        {
          label: "Specialiserad öppenvård",
          data: [...OPPENVARD_TOTALT],
          backgroundColor: "rgba(99, 102, 241, 0.40)",
          borderColor: "rgb(99, 102, 241)",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          pointHoverRadius: 5,
        },
      ],
    }),
    []
  );

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
              const raw = (ctx.dataset.data[ctx.dataIndex] as number) ?? 0;
              return `${ctx.dataset.label}: ${raw.toFixed(1)} / 100 000`;
            },
            afterBody: (items) => {
              const yr = Number(items[0]?.label);
              const idx = SWEDEN_YEARS.indexOf(yr as (typeof SWEDEN_YEARS)[number]);
              if (idx < 0) return "";
              const total = SLUTENVARD_TOTALT[idx] + OPPENVARD_TOTALT[idx];
              return `─────────────\nTotalt: ${total.toFixed(1)} / 100 000`;
            },
          },
        },
      },
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.06)" },
          ticks: {
            color: "rgb(51, 65, 85)",
            font: { family: "Inter, sans-serif" },
          },
          title: {
            display: true,
            text: "Ingrepp per 100 000 invånare",
            color: "rgb(100, 116, 139)",
            font: { size: 12, family: "Inter, sans-serif" },
          },
        },
        x: {
          grid: { display: false },
          ticks: {
            color: "rgb(51, 65, 85)",
            font: { family: "Inter, sans-serif" },
            maxTicksLimit: 14,
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
    []
  );

  return (
    <div className="h-[380px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}

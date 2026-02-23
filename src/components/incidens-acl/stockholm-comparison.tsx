"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type Plugin,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { STOCKHOLM_BY_AGE_2024 } from "@/data/incidens-acl-data";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ratioPlugin: Plugin<"bar"> = {
  id: "ratioLabels",
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const meta0 = chart.getDatasetMeta(0);
    const meta1 = chart.getDatasetMeta(1);
    if (!meta0.visible || !meta1.visible) return;

    meta1.data.forEach((el, i) => {
      const row = STOCKHOLM_BY_AGE_2024[i];
      const ratio = (row.stockholm / row.riket).toFixed(2);
      const { x, y } = el;
      const w = (el as unknown as { width: number }).width ?? 0;

      ctx.save();
      ctx.font = "600 11px Inter, sans-serif";
      ctx.fillStyle = "rgb(14, 165, 233)";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(`${ratio}x`, x + w / 2 + 8, y);
      ctx.restore();
    });
  },
};

export function StockholmComparison() {
  const chartData = useMemo<ChartData<"bar">>(
    () => ({
      labels: STOCKHOLM_BY_AGE_2024.map((r) => r.group),
      datasets: [
        {
          label: "Riket",
          data: STOCKHOLM_BY_AGE_2024.map((r) => r.riket),
          backgroundColor: "rgb(79, 70, 229)",
          borderColor: "rgb(67, 56, 202)",
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.7,
        },
        {
          label: "Stockholm",
          data: STOCKHOLM_BY_AGE_2024.map((r) => r.stockholm),
          backgroundColor: "rgb(14, 165, 233)",
          borderColor: "rgb(2, 132, 199)",
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.7,
        },
      ],
    }),
    []
  );

  const options = useMemo<ChartOptions<"bar">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      layout: { padding: { right: 52 } },
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
          titleFont: { family: "Inter, sans-serif", size: 13, weight: "bold" },
          bodyFont: { family: "Inter, sans-serif", size: 12 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            afterBody: (items) => {
              const idx = items[0]?.dataIndex ?? 0;
              const row = STOCKHOLM_BY_AGE_2024[idx];
              const ratio = (row.stockholm / row.riket).toFixed(2);
              const diff = (row.stockholm - row.riket).toFixed(1);
              return `─────────────\nKvot: ${ratio}x\nSkillnad: +${diff} / 100 000`;
            },
            label: (ctx) =>
              `${ctx.dataset.label}: ${ctx.parsed.x.toFixed(1)} / 100 000`,
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
            text: "Ingrepp per 100 000 invånare (2024)",
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
    <div className="h-[400px] w-full">
      <Bar data={chartData} options={options} plugins={[ratioPlugin]} />
    </div>
  );
}

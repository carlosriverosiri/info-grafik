"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type Plugin,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import {
  SWEDEN_YEARS,
  SWEDEN_BY_AGE_GROUP,
  STOCKHOLM_TOTALT,
  INTERNATIONAL_STUDIES,
} from "@/data/incidens-acl-data";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const BUBBLE_YEARS = [2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024];

const labelPlugin: Plugin<"bubble"> = {
  id: "bubbleLabels",
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    chart.data.datasets.forEach((ds, i) => {
      const meta = chart.getDatasetMeta(i);
      if (!meta.visible) return;

      const isMulti = (ds.data?.length ?? 0) > 1;
      const isSwedenRiket = ds.label?.includes("Riket");
      const isStockholm = ds.label?.includes("Stockholm");

      meta.data.forEach((el, j) => {
        const { x, y } = el;
        const r = (el.options as { radius?: number }).radius ?? 10;
        ctx.save();
        ctx.textAlign = "center";

        const isLast = j === (ds.data?.length ?? 0) - 1;

        if (isMulti && isSwedenRiket && isLast) {
          ctx.font = "600 11px Inter, sans-serif";
          ctx.fillStyle = "rgb(79, 70, 229)";
          ctx.textBaseline = "top";
          ctx.fillText("Sverige (Riket)", x, y + r + 5);
        } else if (isMulti && isStockholm && isLast) {
          ctx.font = "600 11px Inter, sans-serif";
          ctx.fillStyle = "rgb(14, 165, 233)";
          ctx.textBaseline = "bottom";
          ctx.fillText("Stockholm", x, y - r - 5);
        } else if (!isMulti) {
          ctx.font = "600 11px Inter, sans-serif";
          ctx.fillStyle = "rgb(15, 23, 42)";
          ctx.textBaseline = "bottom";
          ctx.fillText(ds.label ?? "", x, y - r - 5);
        }

        ctx.restore();
      });
    });
  },
};

function radius(v: number): number {
  return Math.max(5, Math.sqrt(v) * 2);
}

function withAlpha(rgb: string, a: number): string {
  return rgb.replace("rgb(", "rgba(").replace(")", `, ${a})`);
}

function pickSwedenBubbles(values: readonly number[]) {
  return BUBBLE_YEARS.map((yr) => {
    const idx = (SWEDEN_YEARS as readonly number[]).indexOf(yr);
    const val = values[idx];
    return { x: yr, y: val, r: radius(val) };
  });
}

export function IncidensBubbleChart() {
  const chartData = useMemo(() => {
    const datasets = [
      {
        label: "Sverige (Riket)",
        data: pickSwedenBubbles(SWEDEN_BY_AGE_GROUP["Totalt"]),
        backgroundColor: "rgba(79, 70, 229, 0.70)",
        borderColor: "rgb(79, 70, 229)",
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
      {
        label: "Stockholm",
        data: pickSwedenBubbles(STOCKHOLM_TOTALT),
        backgroundColor: "rgba(14, 165, 233, 0.55)",
        borderColor: "rgb(14, 165, 233)",
        borderWidth: 1.5,
        hoverBorderWidth: 2.5,
      },
      ...INTERNATIONAL_STUDIES.map((s) => {
        const last = s.dataPoints[s.dataPoints.length - 1];
        return {
          label: s.country,
          data: [{ x: last.year, y: last.value, r: radius(last.value) }],
          backgroundColor: withAlpha(s.color, 0.55),
          borderColor: s.color,
          borderWidth: 1.5,
          hoverBorderWidth: 2.5,
        };
      }),
    ];

    return { datasets };
  }, []);

  const options = useMemo<ChartOptions<"bubble">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 28, right: 12 } },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 14,
            font: { size: 11, family: "Inter, sans-serif" },
            color: "rgb(51, 65, 85)",
            filter: (item) => {
              const idx = item.datasetIndex ?? 0;
              const ds = chartData.datasets[idx];
              return (ds?.data?.length ?? 0) > 1 || idx <= 1;
            },
          },
        },
        tooltip: {
          backgroundColor: "rgb(15, 23, 42)",
          titleFont: { family: "Inter, sans-serif", size: 13, weight: "bold" },
          bodyFont: { family: "Inter, sans-serif", size: 12 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            title: (items) => items[0]?.dataset?.label ?? "",
            label: (ctx) => {
              const raw = ctx.raw as { x: number; y: number };
              return `${raw.y.toFixed(1)} per 100 000 (${raw.x})`;
            },
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          min: 2001,
          max: 2026,
          grid: { display: false },
          ticks: {
            stepSize: 2,
            color: "rgb(51, 65, 85)",
            font: { family: "Inter, sans-serif" },
            callback: (v) => String(v),
          },
          title: {
            display: true,
            text: "År",
            color: "rgb(100, 116, 139)",
            font: { size: 12, family: "Inter, sans-serif" },
          },
        },
        y: {
          beginAtZero: true,
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
      },
    }),
    [chartData]
  );

  return (
    <div className="h-[480px] w-full">
      <Bubble data={chartData} options={options} plugins={[labelPlugin]} />
    </div>
  );
}

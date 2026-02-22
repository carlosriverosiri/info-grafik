"use client";

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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const labels = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
const softIndigo = "rgba(99, 102, 241, 0.6)";
const softIndigoBorder = "rgb(79, 70, 229)";

const chartData = {
  labels,
  datasets: [
    {
      label: "Indikator",
      data: [28, 35, 42, 38, 52, 48, 61, 58, 65, 72, 68, 75],
      borderColor: softIndigoBorder,
      backgroundColor: "rgba(99, 102, 241, 0.15)",
      fill: true,
      tension: 0.35,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: "rgba(0,0,0,0.06)" },
      ticks: { color: "rgb(15, 23, 42)" },
    },
    x: {
      grid: { display: false },
      ticks: { color: "rgb(15, 23, 42)" },
    },
  },
};

export function AnalysChart() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm transition-all duration-200 ease-out">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-900 text-lg font-semibold">
          Analys — trend
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[320px] w-full">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

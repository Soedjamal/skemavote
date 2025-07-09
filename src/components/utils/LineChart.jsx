import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register component yang dibutuhkan
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

// Contoh data
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Pengunjung",
      data: [100, 200, 150, 300, 250],
      borderColor: "#3b82f6", // warna biru Tailwind
      backgroundColor: "rgba(59, 130, 246, 0.3)", // semi-transparan
      tension: 0.4,
      fill: true,
    },
  ],
};

// Opsi chart
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#374151", // text-slate-700
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#6b7280" }, // text-gray-500
      grid: { color: "#e5e7eb" }, // border-gray-200
    },
    y: {
      ticks: { color: "#6b7280" },
      grid: { color: "#e5e7eb" },
    },
  },
};

export default function MyLineChart() {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl w-full max-w-xl mx-auto">
      <Line data={data} options={options} />
    </div>
  );
}

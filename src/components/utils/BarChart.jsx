import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ["Kelas X", "Kelas XI", "Kelas XII", "Guru & Staff"],
  datasets: [
    {
      label: "Paslon 1",
      data: [80, 100, 70, 70],
      backgroundColor: "#3b82f6", // Tailwind blue
    },
    {
      label: "Paslon 2",
      data: [90, 80, 100, 60],
      backgroundColor: "#f97316", // Tailwind orange
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#374151",
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#6b7280" },
      grid: { color: "#e5e7eb" },
    },
    y: {
      beginAtZero: true,
      ticks: { color: "#6b7280" },
      grid: { color: "#e5e7eb" },
    },
  },
};

export default function VotingResultChart() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-2xl ">
      <Bar data={data} options={options} />
    </div>
  );
}

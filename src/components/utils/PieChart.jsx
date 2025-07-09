import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Paslon 1", "Paslon 2"],
  datasets: [
    {
      label: "Total Suara",
      data: [320, 280],
      backgroundColor: ["#3b82f6", "#f97316"], // biru & oranye Tailwind
      borderColor: ["#ffffff", "#ffffff"],
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#374151",
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const value = context.parsed;
          const percentage = ((value / total) * 100).toFixed(1);
          return `${context.label}: ${value} suara (${percentage}%)`;
        },
      },
    },
  },
};

export default function TotalVotePieChart() {
  return (
    <div className="flex justify-center bg-white shadow-md rounded-xl p-4 w-full max-w-sm ">
      <Pie data={data} options={options} />
    </div>
  );
}

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [votedCount, setVotedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: candidatesData } = await supabase
        .from("candidates")
        .select("paslon, total_vote");
      const { data: usersData } = await supabase
        .from("users")
        .select("has_voted");

      const voted = usersData.filter((u) => u.has_voted).length;

      setCandidates(candidatesData);
      setUsers(usersData);
      setVotedCount(voted);
    };

    fetchData();
  }, []);

  const pieData = {
    labels: candidates.map((c) => `Paslon ${c.paslon}`),
    datasets: [
      {
        data: candidates.map((c) => c.total_vote),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barData = {
    labels: candidates.map((c) => `Paslon ${c.paslon}`),
    datasets: [
      {
        label: "Total Suara",
        data: candidates.map((c) => c.total_vote),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Pemilih</div>
            <div className="stat-value">{users.length}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Sudah Voting</div>
            <div className="stat-value text-success">{votedCount}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Belum Voting</div>
            <div className="stat-value text-warning">
              {users.length - votedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-base-100 p-4 rounded-box shadow">
          <h2 className="text-lg font-semibold mb-2">Perolehan Suara (Pie)</h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-base-100 p-4 rounded-box shadow">
          <h2 className="text-lg font-semibold mb-2">Perolehan Suara (Bar)</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

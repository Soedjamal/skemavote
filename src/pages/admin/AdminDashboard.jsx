import VotingResultChart from "../../components/utils/BarChart";
import TotalVotePieChart from "../../components/utils/PieChart";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex flex-col mx-auto md:flex-row gap-10">
        <div className="flex flex-col gap-3 md:px-10">
          <h4 className="text-lg font-semibold text-neutral-600">
            Persentase Total Pemilih
          </h4>
          <div className="md:max-w-[300px] md:h-[300px]">
            <TotalVotePieChart />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-lg font-semibold text-neutral-600">
            Persentase Tiap Pemilih
          </h4>
          <div className=" md:h-[500px]">
            <VotingResultChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

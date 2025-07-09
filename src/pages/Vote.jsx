import { useEffect, useState } from "react";
import { Pencil, Send } from "lucide-react";
import { useEventList } from "../service/public/useActiveEvent";
import { useCandidateList } from "../service/public/useCandidateList";
import Modal from "../components/utils/Modal";
import { useVote } from "../service/public/useVote";

const Vote = () => {
  const { activeEvent } = useEventList();
  const { candidates } = useCandidateList();
  const [token, setToken] = useState("");
  const { handleVote } = useVote();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user?.token || null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center pb-16 pt-4 px-4">
      {/* Banner Acara */}
      <div className="relative w-full max-w-lg flex flex-col justify-center mb-4">
        <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-lg">
          <img
            src={activeEvent?.banner}
            alt=""
            className="w-full h-36 object-cover opacity-50"
          />
        </div>
        <div className="absolute w-full h-full p-4 bg-gradient-to-r from-neutral-50 via-neutral-50/80 rounded-xl to-transparent">
          <h4 className="font text-neutral-700 text-2xl">
            {activeEvent?.title}
          </h4>
          <h4 className="font-semibold text-neutral-700 text-lg">
            {activeEvent?.main_heading}
          </h4>
          <h4 className="font text-neutral-700">{activeEvent?.sub_heading}</h4>
        </div>
      </div>

      {/* Card Utama */}
      <div className="flex flex-col gap-4 w-full max-w-lg">
        <h4 className="flex items-center gap-2 mt-8">
          <Pencil size={16} /> Pilih pasangan calon{" "}
          {candidates[0]?.nama_ketua
            ? "Ketua dan Wakil Ketua Osis"
            : "Wakil Kepala Sekolah"}
        </h4>
        {candidates?.map((user, i) => (
          <div
            key={i}
            className={`flex rounded-xl gap-3 border-neutral-400 bg-neutral-50 p-3 items-center w-full max-w-lg shadow-xl 
border-[1px] cursor-pointer transition-all`}
            // onClick={() => setSelectedCandidateId(user.id)}
          >
            <div className="w-32 flex-shrink-0 h-40 overflow-hidden border-[1px] border-neutral-300 rounded-lg bg-neutral-100">
              <img
                className="w-full h-full object-cover"
                src={user.thumbnail_url}
                alt=""
              />
            </div>
            <div key={i} className="w-full h-40 rounded-lg">
              {user.nama_ketua.length > 0 ? (
                <>
                  <h4 className="font text-neutral-700 leading-4">
                    <p className="text-neutral-500 flex gap-1 items-center">
                      {" "}
                      Calon Ketua.{" "}
                    </p>
                    <h3 className="font-[600] text-lg">{user.nama_ketua}</h3>
                  </h4>
                  <h4 className="font text-neutral-700 ">
                    <p className="text-neutral-500 flex gap-1 items-center">
                      Calon Wakil.{" "}
                    </p>
                    <h3 className="font-[600] text-lg">{user.nama_wakil}</h3>
                  </h4>
                </>
              ) : (
                <h4 className="font text-neutral-700">
                  <p className="text-neutral-400"> Nama Wakil. </p>
                  <h3 className="font-[600] text-lg">{user.nama_wakil}</h3>
                </h4>
              )}

              <Modal
                icon={<Send />}
                title="Anda Yakin?"
                desc={`Ingin Memilih Paslon No ${user.paslon || ""}`}
                btnTitle={`Pilih Paslon ${user.paslon}`}
                submitTitle="Ya"
                submitBtn="bg-cyan-700 text-neutral-50"
                onClick={() =>
                  handleVote({ token: token, candidateId: user.id })
                }
                className="bg-cyan-700 w-full  text-neutral-50 mt-3"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vote;

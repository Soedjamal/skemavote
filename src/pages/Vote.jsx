import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

// Data pasangan calon
const candidatePairs = [
  {
    id: 1,
    chairman: {
      name: "John Doe",
      role: "Calon Ketua",
    },
    vice: {
      name: "Jane Smith",
      role: "Calon Wakil",
    },
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    vision: "Mewujudkan organisasi yang inklusif dan berdaya saing",
    missions: [
      "Meningkatkan kualitas anggota melalui pelatihan rutin",
      "Membangun jaringan kerjasama dengan organisasi serupa",
      "Menciptakan sistem administrasi yang transparan",
      "Mengadakan kegiatan pengabdian masyarakat rutin",
    ],
  },
  {
    id: 2,
    chairman: {
      name: "Alex Johnson",
      role: "Calon Ketua",
    },
    vice: {
      name: "Sarah Williams",
      role: "Calon Wakil",
    },
    image:
      "https://images.unsplash.com/photo-1439931444800-9bcc83f804a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    vision: "Organisasi yang adaptif dan berorientasi pada solusi",
    missions: [
      "Digitalisasi sistem organisasi",
      "Program mentoring untuk anggota baru",
      "Peningkatan anggaran untuk kegiatan lapangan",
      "Reformasi struktur kepengurusan",
    ],
  },
  {
    id: 3,
    chairman: {
      name: "Michael Brown",
      role: "Calon Ketua",
    },
    vice: {
      name: "Emily Davis",
      role: "Calon Wakil",
    },
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    vision: "Sinergi untuk mencapai tujuan bersama",
    missions: [
      "Menyelenggarakan forum diskusi bulanan",
      "Program kesejahteraan anggota",
      "Penguatan hubungan alumni",
      "Evaluasi kinerja berkala",
    ],
  },
];

const Vote = () => {
  const [selectedPair, setSelectedPair] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAccordion = (id) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  const handleVote = () => {
    if (!selectedPair) return;

    setIsSubmitting(true);

    // Simulasi pengiriman data
    setTimeout(() => {
      console.log("Memilih pasangan:", selectedPair);
      setIsSubmitting(false);
      // Navigasi ke halaman terima kasih
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-2xl font-bold text-neutral-700 mb-2">
            Pemilihan Ketua & Wakil Ketua Osis
          </h1>
          <h2 className="text-xl sm:text-2xl text-gray-600">
            Periode 2024-2027
          </h2>
          <div className="divider max-w-xs mx-auto"></div>
          <p className="text-gray-500 mt-2">
            Pilih salah satu pasangan calon berikut
          </p>
        </div>

        {/* Grid Pasangan Calon */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-40 ">
          {candidatePairs.map((pair) => (
            <div
              key={pair.id}
              className={`card bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300
                ${selectedPair === pair.id ? "ring-4 ring-cyan-600 transform scale-[1.02]" : "hover:shadow-lg"}`}
            >
              {/* Foto Pasangan */}
              <figure className="relative h-96 overflow-hidden">
                <img
                  src={pair.image}
                  alt={`Pasangan ${pair.chairman.name} dan ${pair.vice.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2">
                    {selectedPair === pair.id && (
                      <CheckCircle className="text-green-300" size={20} />
                    )}
                    <h3 className="text-xl font-bold">{pair.chairman.name}</h3>
                  </div>
                  <p className="text-sm opacity-90">{pair.chairman.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {selectedPair === pair.id && (
                      <CheckCircle className="text-green-300" size={20} />
                    )}
                    <h3 className="text-xl font-bold">{pair.vice.name}</h3>
                  </div>
                  <p className="text-sm opacity-90">{pair.vice.role}</p>
                </div>
              </figure>

              {/* Info Calon */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-500">{pair.chairman.bio}</p>
                    <p className="text-sm text-gray-500">{pair.vice.bio}</p>
                  </div>
                </div>

                {/* Accordion Visi Misi */}
                <div className="flex w-full items-start gap-3">
                  <div className="border border-gray-200 rounded-box w-full">
                    <div
                      className="p-4 flex justify-between items-center cursor-pointer"
                      onClick={() => toggleAccordion(pair.id)}
                    >
                      <span className="font-medium">Visi & Misi</span>
                      {expandedAccordion === pair.id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                    {expandedAccordion === pair.id && (
                      <div className="px-4 pb-4">
                        <div className="pt-2">
                          <h4 className="font-semibold ">Visi:</h4>
                          <p className="mb-3 text-gray-700">{pair.vision}</p>

                          <h4 className="font-semibold ">Misi:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            {pair.missions.map((mission, idx) => (
                              <li key={idx}>{mission}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedPair(pair.id)}
                    className={`btn btn-md flex items-center gap-1 ${selectedPair === pair.id ? "bg-cyan-700 text-neutral-50" : "btn-outline"}`}
                  >
                    {selectedPair === pair.id ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Terpilih</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        <span>Pilih</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        {selectedPair && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="avatar-group -space-x-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          candidatePairs.find((p) => p.id === selectedPair)
                            .image
                        }
                        alt="Selected candidate"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-medium">
                    {
                      candidatePairs.find((p) => p.id === selectedPair).chairman
                        .name
                    }{" "}
                    &{" "}
                    {
                      candidatePairs.find((p) => p.id === selectedPair).vice
                        .name
                    }
                  </p>
                  <p className="text-sm text-gray-500">Pasangan terpilih</p>
                </div>
              </div>
              <button
                className={`btn bg-cyan-700 text-neutral-50 flex items-center gap-2 ${isSubmitting ? "loading" : ""}`}
                onClick={handleVote}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    <span>Kirim Pilihan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vote;

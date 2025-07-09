import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

export const PairCard = ({
  pair,
  isSelected,
  onSelect,
  isExpanded,
  onToggle,
}) => {
  return (
    <div
      className={`card bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300
      ${isSelected ? "ring-4 ring-cyan-600 scale-[1.02]" : "hover:shadow-lg"}`}
    >
      {/* Gambar */}
      <figure className="relative h-80 overflow-hidden">
        <img
          src={pair.thumbnail_url}
          alt={`Pasangan ${pair.nama_ketua} dan ${pair.nama_wakil}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-xl font-bold">{pair.nama_ketua}</div>
          <div className="text-xl font-bold">{pair.nama_wakil}</div>
        </div>
      </figure>

      {/* Info */}
      <div className="p-4">
        <div className="flex w-full items-start gap-3">
          <div className="border border-gray-200 rounded-box w-full">
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => onToggle(pair.id)}
            >
              <span className="font-medium">Visi & Misi</span>
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {isExpanded && (
              <div className="px-4 pb-4 text-gray-700">
                <h4 className="font-semibold">Visi:</h4>
                <p className="mb-2">{pair.visi}</p>
                <h4 className="font-semibold">Misi:</h4>
                <ul className="list-disc pl-5">
                  {pair.misi?.map((mission, idx) => (
                    <li key={idx}>{mission}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={() => onSelect(pair.id)}
            className={`btn btn-md flex items-center gap-1 ${isSelected ? "bg-cyan-700 text-white" : "btn-outline"}`}
          >
            <CheckCircle size={16} />
            <span>{isSelected ? "Terpilih" : "Pilih"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

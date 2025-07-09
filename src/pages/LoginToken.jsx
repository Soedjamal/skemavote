import { useState } from "react";
import { useNavigate } from "react-router";
import { useEvents } from "../service/admin/useEvents";
import { MailWarning } from "lucide-react";

const LoginToken = () => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { events } = useEvents();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulasi validasi token
    setTimeout(() => {
      if (token === "TXT1256") {
        navigate("/pemilihan");
      } else {
        setError("Token tidak valid. Silakan coba lagi.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div
      className="h-screen bg-gradient-to-br from-blue-50 to-purple-50 
      flex flex-col items-center pb-16 pt-4 px-4"
    >
      {/* Banner Acara */}
      <div className="relative w-full max-w-lg flex justify-center">
        <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-lg mb-4">
          <img
            src={events[0]?.banner}
            alt="Banner Acara Pemilihan"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>

      {/* Card Utama */}
      <div className="card  w-full max-w-lg bg-base-100 shadow-xl mb-12">
        <div className="w-full flex justify-center mt-4">
          <div className=" w-28 h-28 rounded-full bg-neutral-50 shadow-xl"></div>
        </div>
        <div className="w-full max-w-lg flex justify-center mt-4">
          <div className="card-body max-w-md">
            {/* Judul Acara */}
            <h1 className="card-title text-3xl max-w-md font-bold text-center mb-2 text-neutral-500">
              {events[0]?.title}
            </h1>
            <h2 className="text-xl font-semibold text-center mb-6 text-neutral-400">
              {events[0]?.sub_heading}
            </h2>

            {/* Form Token */}
            <form className="max-w-md" onSubmit={handleSubmit}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Masukkan Token Anda</span>
                </label>
                <input
                  type="password"
                  placeholder="Contoh: 123456"
                  className="input input-bordered w-full"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>

              {/* Tombol Submit */}
              <div className="card-actions justify-center mt-6">
                <button
                  type="submit"
                  className={`btn bg-cyan-600 text-neutral-50 w-full`}
                  disabled={isLoading}
                >
                  {isLoading ? "Memverifikasi..." : "Kirim"}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert rounded-lg text-red-500 bg-red-50 mt-4 flex">
                  <MailWarning />
                  <span>{error}</span>
                </div>
              )}
            </form>

            {/* Informasi Tambahan */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                Pastikan Anda menggunakan token yang valid untuk mengakses
                halaman voting.
              </p>
              <p className="mt-2">Hubungi panitia jika mengalami kesulitan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginToken;

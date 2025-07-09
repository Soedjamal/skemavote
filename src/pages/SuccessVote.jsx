import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Home, ClipboardList } from "lucide-react";
import confetti from "canvas-confetti";

const SuccessVote = () => {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(30); // Hitung mundur 10 detik

  // Countdown otomatis
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Efek animasi confetti

  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Konfetti dari library eksternal akan lebih baik
      // Ini hanya simulasi sederhana
      if (confetti) {
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Card Utama */}
      <div className="card w-full max-w-md bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="card-body items-center text-center p-8">
          {/* Icon Sukses */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full opacity-60 animate-ping"></div>
            <CheckCircle
              className="relative text-green-500"
              size={80}
              strokeWidth={1.5}
            />
          </div>

          {/* Judul */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Voting Berhasil!
          </h1>
          <p className="text-gray-600 mb-6">
            Terima kasih telah menggunakan hak pilih Anda. Suara Anda telah
            tercatat.
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => navigate("/")}
              className="btn bg-cyan-700 text-neutral-50 flex-1 gap-2"
            >
              <Home size={20} />
              Kembali ke Halaman Pemilihan
            </button>
            {/* Progress bar dan countdown */}
            <div className="w-full mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Kembali dalam:</span>
                <span>{countdown} detik</span>
              </div>
              {/* <progress */}
              {/*   className="progress progress-primary w-full" */}
              {/*   value={10 - countdown} */}
              {/*   max="10" */}
              {/* ></progress> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SkemaVote. All rights reserved.</p>
        <p className="mt-1">Hubungi panitia jika ada pertanyaan.</p>
      </div>
    </div>
  );
};

export default SuccessVote;

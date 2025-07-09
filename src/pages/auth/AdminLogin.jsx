import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("Session tidak ditemukan setelah login.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("admin")
      .select("level")
      .eq("id", session.user.id)
      .single();

    if (profileError || !profile) {
      console.log(profileError, profile);
      setError(profileError.message);
      setLoading(false);
      return;
    }

    if (profile.level === "admin") {
      navigate("/admin/dashboard");
    } else {
      setError("Akun ini bukan admin.");
    }

    setLoading(false);
  };

  return (
    <form
      className="w-screen h-screen flex items-center flex-col"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col mt-40 w-[300px] gap-4">
        <h2 className="font-pS2p text-xl font-semibold text-center text-cyan-700 mb-8">
          Selamat Datang Admin
        </h2>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="font-pS2p text-secondary-600 text-sm"
          >
            Email
          </label>
          <input
            className="px-4 py-2 rounded-lg border-[1px] border-neutral-200"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="contoh : admin@ixcode.dev"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="font-pS2p text-secondary-600 text-sm"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              className="px-4 py-2 rounded-lg w-full border-[1px] border-neutral-200"
              type={showPw ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="masukkan password"
            />
            {showPw ? (
              <Eye
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-2"
              />
            ) : (
              <EyeClosed
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-[12px] text-neutral-400"
              />
            )}
          </div>
        </div>

        <button
          className="bg-cyan-700 py-2 rounded-lg border-2  border-secondary-800 text-neutral-50 font-pxSans"
          type="submit"
        >
          {loading ? "Loging in.." : "Login"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
}

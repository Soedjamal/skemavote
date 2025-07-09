import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    }
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="btn px-4 py-2 rounded">
      <LogOut /> Logout
    </button>
  );
}

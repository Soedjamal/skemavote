import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";
import Modal from "../../components/utils/Modal";

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
    <Modal
      title="Logout?"
      desc="Anda yakin untuk logout?"
      icon={<LogOut />}
      btnTitle="Logout"
      submitTitle="Ya"
      onClick={handleLogout}
      className="btn px-4 py-2 rounded"
    />
  );
}

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { supabase } from "../lib/supabase";

export default function ProtectedAdmin() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        setIsAdmin(false);
        return;
      }

      const user = session.user;

      const { data } = await supabase
        .from("admin")
        .select("level")
        .eq("id", user.id)
        .single();

      if (data?.level === "admin") {
        setIsAdmin(true);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isAdmin) return <Navigate to="/auth/admin/login" replace />;

  return <Outlet />;
}

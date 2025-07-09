import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedVoting() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user?.has_voted || null);
    setLoading(false);
  }, []);

  if (loading) return null; // atau tampilkan loader/spinner
  if (userData) return <Navigate to="/" replace />;

  return <Outlet />;
}

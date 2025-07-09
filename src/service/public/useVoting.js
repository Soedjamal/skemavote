import { useState } from "react";
import usersQueries from "../../queries/admin/users";
import eventsQueries from "../../queries/admin/events";
import { useNavigate } from "react-router";
import { formatDate } from "../../utils/formatDate";

export const useVoting = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getUserByToken = async (e, token, id) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const now = new Date().toISOString();

    try {
      const result = await usersQueries.getUserByToken(token);
      const votingStart = await eventsQueries.getEventByIdAndDateTime(now, id);

      if (votingStart) {
        return setError(
          `Waktu Pemilihan Belum Dimulai, Dimulai pada ${formatDate(votingStart.voting_start)}`,
        );
      }

      if (result && result.token !== token) {
        return setError("Token tidak valid. Silakan coba lagi.");
      }

      if (result && result.has_voted) {
        return setError("Pemilihan hanya dapat dilakukan satu kali.");
      }

      if (result && result.token === token) {
        setUser(result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/vote"); // Navigasi hanya jika berhasil
      }
      console.log(result);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getUserByToken,
    user,
    isLoading,
    error,
  };
};

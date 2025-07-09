import { useEffect, useState } from "react";
import usersQueries from "../../queries/admin/users"; // pastikan path sesuai

export const useCandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCandidates = async () => {
    try {
      setLoading(true);
      const result = await usersQueries.getAllCandidates();
      setCandidates(result);
    } catch (err) {
      console.error("Gagal mengambil data kandidat:", err);
      setError("Gagal mengambil data kandidat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return {
    candidates,
    loading,
    error,
    refreshCandidates: getCandidates,
  };
};

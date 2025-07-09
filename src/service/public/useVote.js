import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router";

export const useVote = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const nv = useNavigate();

  const handleVote = async ({ token, candidateId }) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.rpc("vote_once", {
      vote_token: token,
      candidate_id: candidateId,
    });

    if (data) {
      nv("/success-vote");
    }

    if (error) {
      setError("Terjadi kesalahan saat voting. Coba lagi.");
      console.error(error);
    } else {
      setMessage(data); // data = pesan dari function SQL
    }

    setLoading(false);
  };

  return {
    handleVote,
    loading,
    message,
    error,
  };
};

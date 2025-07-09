import { useEffect, useState } from "react";
import eventsQueries from "../../queries/admin/events"; // pastikan path sesuai

export const useEventList = () => {
  const [activeEvent, setActiveEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getActiveEvent = async () => {
    try {
      setLoading(true);
      const result = await eventsQueries.getActiveEvent();
      setActiveEvent(result);
    } catch (err) {
      console.error("Gagal mengambil data kandidat:", err);
      setError("Gagal mengambil data kandidat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActiveEvent();
  }, []);

  return {
    activeEvent,
    loading,
    error,
    refreshEvent: getActiveEvent,
  };
};

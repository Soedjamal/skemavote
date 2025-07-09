import { useCallback, useEffect, useRef, useState } from "react";
import usersQueries from "../../queries/admin/users";

export const useStudents = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(localStorage.getItem("levelS") || "xi");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadedPages = useRef(new Set());
  const abortController = useRef(null);
  const LIMIT = 50;

  const getUsersBy = useCallback(async () => {
    if (loadedPages.current.has(page) || isLoading) return;

    if (abortController.current) {
      abortController.current.abort();
    }

    abortController.current = new AbortController();
    loadedPages.current.add(page);

    setIsLoading(true);
    try {
      const result = await usersQueries.getStudentsByLevel(
        filter,
        page,
        LIMIT,
        {
          signal: abortController.current.signal,
        },
      );

      setUsers((prev) => {
        const newData = page === 1 ? result : [...prev, ...result];
        // Deduplikasi data berdasarkan ID
        const uniqueData = Array.from(
          new Map(newData.map((item) => [item.id, item])).values(),
        );
        return uniqueData;
      });

      setHasMore(result.length === LIMIT);
      if (page === 1) setIsInitialLoad(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        loadedPages.current.delete(page);
        console.error("Fetch error:", err);
      }
    } finally {
      setIsLoading(false);
      abortController.current = null;
    }
  }, [filter, page, isLoading]);

  const resetUsers = () => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
    loadedPages.current.clear();
    setIsInitialLoad(true);
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  // Fetch data effect
  useEffect(() => {
    getUsersBy();
  }, [getUsersBy]);

  const setFilterWithReset = useCallback(
    (newFilter) => {
      if (newFilter !== filter) {
        localStorage.setItem("levelS", newFilter);
        setFilter(newFilter);
        resetUsers();
      }
    },
    [filter],
  );

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isLoading]);

  return {
    users,
    setFilter: setFilterWithReset,
    loadMore,
    hasMore,
    isLoading,
    isInitialLoad,
    page,
    filter,
    deleteAllUsers: async (level) => {
      await usersQueries.deleteAllUsersByLevel(level);
      resetUsers();
    },
    deleteUserById: async (id) => {
      await usersQueries.deleteUserById(id);
      resetUsers();
    },
    generateTokenByLevel: async (token) => {
      await usersQueries.insertUsersTokenByLevel(token);
      resetUsers();
    },
    resetUsers,
  };
};

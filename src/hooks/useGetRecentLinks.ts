import { useState, useEffect } from "react";
import { type Data } from "../services/services";

function useGetRecentLinks() {
  const [recentLinks, setRecentLinks] = useState<Data[]>(() => {
    try {
      const saved = localStorage.getItem("recentLinks");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("recentLinks", JSON.stringify(recentLinks));
  }, [recentLinks]);

  return { recentLinks, setRecentLinks };
}

export default useGetRecentLinks;

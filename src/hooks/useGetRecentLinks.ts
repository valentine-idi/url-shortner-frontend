import { useState, useEffect } from "react";
import { type LinksServiceResponse } from "../services/services";

function useGetRecentLinks() {
  const [recentLinks, setRecentLinks] = useState<LinksServiceResponse[]>(() => {
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

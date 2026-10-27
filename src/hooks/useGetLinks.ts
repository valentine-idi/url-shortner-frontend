import { useEffect, useState } from "react";
import { isAxiosError } from "../services/apiClient";
import { type linksServiceResponse, linksService } from "../services/services";

function useGetLinks() {
  const [myLinks, setMyLinks] = useState<linksServiceResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getMyLinks = async () => {
      try {
        const { data } = await linksService.get<linksServiceResponse[]>(
          controller.signal,
        );

        setMyLinks(data);
      } catch (error) {
        if (controller.signal.aborted) return;

        if (isAxiosError(error)) setError(error.response?.data.message);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    getMyLinks();

    return () => controller.abort();
  }, []);

  console.log("MyLinks", myLinks);

  return { myLinks, isLoading, error };
}

export default useGetLinks;

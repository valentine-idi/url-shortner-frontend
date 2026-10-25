import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { FiPlus, FiSearch } from "react-icons/fi";
import { isAxiosError } from "../../services/apiClient";
import { setAuthToken } from "../../services/apiClient";
import useAuth from "../../hooks/useAuth";
import {
  type linksServiceResponse,
  linksService,
} from "../../services/services";
import LoadingScreen from "../../components/loadingScreen";
import LinkCard from "../../components/linkCard";
import Error from "../../components/error";
import Icon from "../../components/Icon";
import styles from "./MyLinks.module.scss";

export default function MyLinks() {
  const [myLinks, setMyLinks] = useState<linksServiceResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    getMyLinks();
  }, []);

  const getMyLinks = async () => {
    try {
      //   setAuthToken(currentUser?.token);
      setIsLoading(true);
      const { data } = await linksService.get<linksServiceResponse[]>();
      setMyLinks(data);
      console.log("links", data);
    } catch (error) {
      if (isAxiosError(error)) setError(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (shortUrl: string) => {
    console.log("url", shortUrl);
  };

  if (isLoading) return <LoadingScreen />;

  if (error) return <Error message={error} />;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>My links</h1>
          <p>All your shortened links, in one place.</p>
        </div>

        <NavLink className={styles.newLinkButton} to="/">
          <Icon label={FiPlus} className={styles.icon} />
          <span>New link</span>
        </NavLink>
      </header>

      <div className={styles.searchBox}>
        <Icon label={FiSearch} className={styles.searchIcon} />

        <label className={styles.srOnly} htmlFor="search-links">
          Search your links
        </label>

        <input
          id="search-links"
          type="search"
          placeholder="Search by URL or short link…"
        />
      </div>

      <p className={styles.linkCount}>{myLinks.length} saved links</p>

      {myLinks.map(({ shortUrl, originalUrl }) => (
        <LinkCard
          key={shortUrl}
          handleDelete={handleDelete}
          shortUrl={shortUrl}
          originalUrl={originalUrl}
        />
      ))}
    </main>
  );
}

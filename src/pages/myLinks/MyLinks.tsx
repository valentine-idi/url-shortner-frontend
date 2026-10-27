import { NavLink } from "react-router";
import { FiPlus, FiSearch } from "react-icons/fi";
import { isAxiosError } from "../../services/apiClient";
import setMessage from "../../utils/setMessage";
import {
  linksService,
  type LinksServiceResponse,
} from "../../services/services";
import useGetLinks from "../../hooks/useGetLinks";
import LoadingScreen from "../../components/loadingScreen";
import LinkCard from "../../components/linkCard";
import ErrorComponent from "../../components/errorComponent";
import Icon from "../../components/Icon";
import EmptyLink from "../../components/emptyLink/EmptyLink";
import styles from "./MyLinks.module.scss";

export default function MyLinks() {
  const {
    myLinks,
    isLoading,
    error,
    setMyLinks,
    statusMessage,
    setStatusMessage,
  } = useGetLinks();

  const handleDelete = async (id: string) => {
    const originalLinks = [...myLinks];

    setMyLinks(myLinks.filter((link) => link.id !== id));
    try {
      await linksService.delete<LinksServiceResponse>(id);
      setMessage("success", setStatusMessage, "Link deleted successfully");
    } catch (error) {
      if (isAxiosError(error))
        setMessage("error", setStatusMessage, error.response?.data.message);
      setMyLinks(originalLinks);
    }
  };

  if (isLoading) return <LoadingScreen />;

  if (error) return <ErrorComponent message={error} />;

  if (myLinks.length === 0) return <EmptyLink />;

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

      {statusMessage.error && (
        <p className={styles.error}>{statusMessage.error}</p>
      )}

      {statusMessage.success && (
        <p className={styles.success}>{statusMessage.success}</p>
      )}

      {myLinks.map(({ id, shortUrl, originalUrl }) => (
        <LinkCard
          id={id}
          key={shortUrl}
          handleDelete={handleDelete}
          shortUrl={shortUrl}
          originalUrl={originalUrl}
        />
      ))}
    </main>
  );
}

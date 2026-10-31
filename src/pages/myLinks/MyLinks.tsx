import { useState } from "react";
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
import Pagination from "../../components/pagination";

export default function MyLinks() {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    myLinks,
    isLoading,
    error,
    setMyLinks,
    statusMessage,
    setStatusMessage,
  } = useGetLinks();

  const pageSize = 5;
  const paginationSize = Math.ceil(myLinks.length / pageSize);
  const paginationArray = Array.from(
    { length: paginationSize },
    (_, i) => i + 1,
  );

  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;

  const slicedLinks = myLinks.slice(start, end);

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleChangePageNumber = (increaseBy: 1 | -1) => {
    setPageNumber((prev) => prev + increaseBy);
  };

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

      {slicedLinks.map(({ id, shortUrl, originalUrl }) => (
        <LinkCard
          id={id}
          key={shortUrl}
          handleDelete={handleDelete}
          shortUrl={shortUrl}
          originalUrl={originalUrl}
        />
      ))}

      {myLinks.length > pageSize && (
        <Pagination
          paginationArray={paginationArray}
          pageNumber={pageNumber}
          changePage={handlePageChange}
          changePageNumber={handleChangePageNumber}
        />
      )}
    </main>
  );
}

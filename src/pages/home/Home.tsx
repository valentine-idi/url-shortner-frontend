import { useState } from "react";
import { type LinksServiceResponse } from "../../services/services";
import useGetRecentLinks from "../../hooks/useGetRecentLinks";
import UrlBox from "../../components/urlBox";
import RecentLinks from "../../components/recentLinks";
import Pagination from "../../components/pagination";
import styles from "./Home.module.scss";

function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const { recentLinks, setRecentLinks } = useGetRecentLinks();

  const pageSize = 5;
  const paginationSize = Math.ceil(recentLinks.length / pageSize);
  const paginationArray = Array.from(
    { length: paginationSize },
    (_, index) => index + 1,
  );
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;
  const newRecentLinks = recentLinks.slice(start, end);

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleChangePageNumber = (increaseBy: 1 | -1) => {
    setPageNumber((prev) => prev + increaseBy);
  };

  const handleRecentLink = (data: LinksServiceResponse) =>
    setRecentLinks((prevLinks) => (prevLinks ? [data, ...prevLinks] : [data]));

  const handleDelete = (id: string) =>
    setRecentLinks(recentLinks.filter((link) => link.id !== id));

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <p>Long Link. Short story.</p>
        <p>Shorten, share and keep track of your links</p>
      </header>
      <UrlBox setRecentLinks={handleRecentLink} />
      <RecentLinks recentLinks={newRecentLinks} handleDelete={handleDelete} />

      {paginationArray.length > 1 && (
        <Pagination
          changePage={handlePageChange}
          changePageNumber={handleChangePageNumber}
          pageNumber={pageNumber}
          paginationArray={paginationArray}
        />
      )}
    </div>
  );
}

export default Home;

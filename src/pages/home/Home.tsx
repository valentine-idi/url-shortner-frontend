import { type linksServiceResponse } from "../../services/services";
import useGetRecentLinks from "../../hooks/useGetRecentLinks";
import UrlBox from "../../components/urlBox";
import RecentLinks from "../../components/recentLinks";
import styles from "./Home.module.scss";

function Home() {
  const { recentLinks, setRecentLinks } = useGetRecentLinks();

  const handleRecentLink = (data: linksServiceResponse) =>
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
      <RecentLinks recentLinks={recentLinks} handleDelete={handleDelete} />
    </div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { type Data } from "../../services/services";
import UrlBox from "../../components/urlBox";
import RecentLinks from "../../components/recentLinks";
import styles from "./Home.module.scss";

function Home() {
  const [recentLinks, setRecentLinks] = useState<Data[] | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    getRecentLinks();
  }, []);

  useEffect(() => {
    saveRecentLinks();
  }, [recentLinks]);

  const saveRecentLinks = () => {
    if (isFirstLoad) return setIsFirstLoad(false);

    const parsedRecentLinks = JSON.stringify(recentLinks);

    localStorage.setItem("recentLinks", parsedRecentLinks);
  };

  console.log("recentLinks", localStorage.getItem("recentLinks"));

  const getRecentLinks = () => {
    const recentLinks = localStorage.getItem("recentLinks");

    if (!recentLinks) return;

    const parsedRecentLinks = JSON.parse(recentLinks);
    setRecentLinks(parsedRecentLinks);
  };

  const handleRecentLink = (data: Data) =>
    setRecentLinks((prevLinks) => (prevLinks ? [data, ...prevLinks] : [data]));

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <p>Long Link. Short story.</p>
        <p>Shorten, share and keep track of your links</p>
      </header>
      <UrlBox setRecentLinks={handleRecentLink} />
      <RecentLinks recentLinks={recentLinks} />
    </div>
  );
}

export default Home;

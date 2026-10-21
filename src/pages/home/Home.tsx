import { useState, useEffect } from "react";
import { type Data } from "../../services/services";
import UrlBox from "../../components/urlBox";
import RecentLinks from "../../components/recentLinks";
import styles from "./Home.module.scss";

function Home() {
  const [recentLinks, setRecentLinks] = useState<Data[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState("");

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

  const getRecentLinks = () => {
    const recentLinks = localStorage.getItem("recentLinks");

    if (!recentLinks) return;

    const parsedRecentLinks = JSON.parse(recentLinks);
    setRecentLinks(parsedRecentLinks);
  };

  const handleCopy = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedUrl(shortUrl);

      setTimeout(() => setCopiedUrl(""), 2000);
    } catch (error) {
      setCopiedUrl("");
    }
  };

  const handleRecentLink = (data: Data) =>
    setRecentLinks((prevLinks) => (prevLinks ? [data, ...prevLinks] : [data]));

  const handleDelete = (shortUrl: string) =>
    setRecentLinks(recentLinks.filter((link) => link.shortUrl !== shortUrl));

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <p>Long Link. Short story.</p>
        <p>Shorten, share and keep track of your links</p>
      </header>
      <UrlBox setRecentLinks={handleRecentLink} />
      <RecentLinks
        copiedUrl={copiedUrl}
        recentLinks={recentLinks}
        handleDelete={handleDelete}
        handleCopy={handleCopy}
      />
    </div>
  );
}

export default Home;

import { useState } from "react";
import { type Data } from "../../services/services";
import useGetRecentLinks from "../../hooks/useGetRecentLinks";
import UrlBox from "../../components/urlBox";
import RecentLinks from "../../components/recentLinks";
import styles from "./Home.module.scss";

function Home() {
  const [copiedUrl, setCopiedUrl] = useState("");
  const { recentLinks, setRecentLinks } = useGetRecentLinks();

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

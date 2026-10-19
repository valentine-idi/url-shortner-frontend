import UrlBox from "../../components/urlBox";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <p>Long Link. Short story.</p>
        <p>Shorten, share and keep track of your links</p>
      </header>
      <UrlBox />
    </div>
  );
}

export default Home;

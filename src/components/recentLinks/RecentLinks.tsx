import { FaRegCopy } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Icon from "../Icon";
import { type Data } from "../../services/services";
import styles from "./RecentLinks.module.scss";

interface Props {
  recentLinks: Data[] | null;
}

function RecentLinks({ recentLinks }: Props) {
  console.log(recentLinks);
  return (
    <div className={styles.container}>
      {recentLinks && <header className={styles.header}>Recent links</header>}

      {recentLinks?.map(({ originalUrl, shortUrl }) => (
        <div className={styles.card} key={shortUrl}>
          <div className={styles.links}>
            <div className={styles.originalUrl}>{originalUrl}</div>
            <div className={styles.shortUrl}>{shortUrl}</div>
          </div>
          <div className={styles.buttons}>
            <button className={`${styles.actionButton}`}>
              <Icon label={FaRegCopy} className={styles.icon} />
            </button>
            <button className={`${styles.actionButton} ${styles.deleteButton}`}>
              <Icon label={AiOutlineDelete} className={styles.icon} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentLinks;

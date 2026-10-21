import { FaRegCopy, FaCheck } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Icon from "../Icon";
import { type Data } from "../../services/services";
import styles from "./RecentLinks.module.scss";

interface Props {
  recentLinks: Data[];
  copiedUrl: string;
  handleCopy: (shortUrl: string) => void;
  handleDelete: (shortUrl: string) => void;
}

function RecentLinks({
  recentLinks,
  copiedUrl,
  handleCopy,
  handleDelete,
}: Props) {
  return (
    <div className={styles.container}>
      {recentLinks.length > 0 && (
        <header className={styles.header}>Recent links</header>
      )}

      {recentLinks?.map(({ originalUrl, shortUrl }) => (
        <div className={styles.card} key={shortUrl}>
          <div className={styles.links}>
            <div className={styles.originalUrl}>{originalUrl}</div>
            <div className={styles.shortUrl}>{shortUrl}</div>
          </div>
          <div className={styles.buttons}>
            <button
              className={`${styles.actionButton}`}
              onClick={() => handleCopy(shortUrl)}
            >
              <Icon
                label={copiedUrl === shortUrl ? FaCheck : FaRegCopy}
                className={`${styles.icon} ${copiedUrl == shortUrl && styles.copied}`}
              />
            </button>
            <button
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={() => handleDelete(shortUrl)}
            >
              <Icon label={AiOutlineDelete} className={styles.icon} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentLinks;

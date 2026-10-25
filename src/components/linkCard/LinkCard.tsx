import { useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Icon from "../Icon";
import styles from "./LinkCard.module.scss";

interface Props {
  handleDelete: (shortUrl: string) => void;
  originalUrl: string;
  shortUrl: string;
}

function LinkCard({ handleDelete, originalUrl, shortUrl }: Props) {
  const [copiedUrl, setCopiedUrl] = useState("");

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedUrl(textToCopy);

      setTimeout(() => setCopiedUrl(""), 2000);
    } catch (error) {
      setCopiedUrl("");
    }
  };

  return (
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
  );
}

export default LinkCard;

import { useState, useRef } from "react";
import styles from "./UrlBox.module.scss";

interface Data {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  user: string;
}

function UrlBox() {
  const [data, setData] = useState<Data | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = inputRef.current?.value;
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Paste your long URL</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://example.com/your-very-long-link"
          ref={inputRef}
        />
        <button className={styles.submit}>Shorten Link</button>
      </form>

      <div className={`${styles.result} ${data && styles.block}`}>
        <p>Your short link is ready</p>

        <div className={styles.buttonGroup}>
          <button>{data && data.shortUrl}</button>
          <button>Copy link</button>
        </div>
      </div>
    </div>
  );
}

export default UrlBox;

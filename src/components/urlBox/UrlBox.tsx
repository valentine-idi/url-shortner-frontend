import { useState, useRef } from "react";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { isAxiosError } from "../../services/apiClient";
import {
  type BackendPostData,
  shortenLinksService,
  type Data,
} from "../../services/services";
import Icon from "../Icon";
import isValidUrl from "../../utils/isValidUrl";
import styles from "./UrlBox.module.scss";

interface Error {
  message: string;
}

interface Props {
  setRecentLinks: (data: Data) => void;
}

function UrlBox({ setRecentLinks }: Props) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isBackendCalled, setIsBackendCalled] = useState(false);
  const [shortenButtonText, setShortenButtonText] = useState("Shorten Link");
  const [copyStatus, setCopyStatus] = useState("Copy Link");

  const inputRef = useRef<HTMLInputElement>(null);

  const callBackend = async (url: string) => {
    try {
      setIsBackendCalled(true);
      setShortenButtonText("Shortening...");

      const { data } = await shortenLinksService.post<BackendPostData, Data>({
        link: url,
      });

      setError(null);
      setData(data);
      setIsBackendCalled(false);
      setShortenButtonText("Shorten Link");
      setRecentLinks(data);

      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      if (isAxiosError(error))
        setError({ message: error.response?.data.message });

      setIsBackendCalled(false);
      setShortenButtonText("Shorten Link");
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setData(null);

    if (!inputRef.current) return;

    const url = inputRef.current.value;
    const isUrlValid = isValidUrl(url);

    if (!isUrlValid) return setError({ message: "Please enter a valid url" });

    callBackend(url);
  };

  const handleCopyText = async () => {
    if (!data) return;

    try {
      await navigator.clipboard.writeText(data.shortUrl);
      setCopyStatus("Copied!");

      setTimeout(() => setCopyStatus("Copy Link"), 2000);
    } catch (error) {
      setCopyStatus("Failed to copy");
      setTimeout(() => setCopyStatus("Copy Link"), 2000);
    }
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
        <button
          className={`${styles.submit} ${isBackendCalled && styles.disabled}`}
          disabled={isBackendCalled}
        >
          {shortenButtonText}
        </button>
      </form>

      {error && <p className={styles.error}>{error.message}</p>}

      <div className={`${styles.result} ${data && styles.block}`}>
        <p>
          <Icon
            className={`${styles.icon} ${styles.iconReady}`}
            label={FaCheckCircle}
          />
          Your short link is ready
        </p>

        <div className={styles.buttonGroup}>
          <button>{data && data.shortUrl}</button>
          <button onClick={handleCopyText}>
            {copyStatus.toLocaleLowerCase() === "copy link" && (
              <Icon className={styles.icon} label={FaRegCopy} />
            )}

            {copyStatus.toLocaleLowerCase() === "copied!" && (
              <Icon
                className={`${styles.icon} ${styles.copiedIcon}`}
                label={FaCheck}
              />
            )}

            {copyStatus}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UrlBox;

import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import Icon from "../Icon";
import styles from "./ErrorComponent.module.scss";

function ErrorComponent({
  title = "We couldn't load your links",
  message = "Something went wrong, Please try again",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <section className={styles.fetchError} role="alert">
      <Icon label={FiAlertCircle} className={styles.errorIcon} />

      <h2>{title}</h2>

      <p>{message}</p>

      <button className={styles.retryButton} type="button">
        <Icon label={FiRefreshCw} className={styles.retryIcon} />
        <span>Try again</span>
      </button>
    </section>
  );
}

export default ErrorComponent;

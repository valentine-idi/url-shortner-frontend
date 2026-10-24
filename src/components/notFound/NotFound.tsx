import { NavLink } from "react-router";
import { FiLink, FiArrowLeft } from "react-icons/fi";
import Icon from "../../components/Icon";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="error-heading">
        <Icon label={FiLink} className={styles.logo} />

        <p className={styles.errorCode}>404</p>

        <h1 id="error-heading">This link leads nowhere</h1>

        <p className={styles.description}>
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <NavLink className={styles.homeButton} to="/">
          <Icon label={FiArrowLeft} className={styles.buttonIcon} />
          <span>Back to home</span>
        </NavLink>
      </section>
    </main>
  );
}

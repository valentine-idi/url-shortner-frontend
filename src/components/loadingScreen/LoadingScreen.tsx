import styles from "./LoadingScreen.module.scss";

function LoadingScreen() {
  return (
    <section className={styles.loading} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <h2>Loading your links</h2>
      <p>Just a moment…</p>
    </section>
  );
}

export default LoadingScreen;

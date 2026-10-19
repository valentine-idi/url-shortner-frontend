import styles from "./UrlBox.module.scss";

function UrlBox() {
  return (
    <div className={styles.container}>
      <p className={styles.label}>Paste your long URL</p>
      <form>
        <input
          type="text"
          placeholder="https://example.com/your-very-long-link"
        />
        <button className={styles.submit}>Shorten Link</button>
      </form>

      <div className={styles.result}></div>
    </div>
  );
}

export default UrlBox;

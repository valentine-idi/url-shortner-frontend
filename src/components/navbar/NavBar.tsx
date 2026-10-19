import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <ul className={`${styles.left} ${styles.navList}`}>
        <li className={`${styles.navItem} ${styles.navLogo}`}>URL Shortener</li>
      </ul>

      <ul className={`${styles.right} ${styles.navList}`}>
        <li className={styles.navItem}>My Links</li>
        <li className={styles.navItem}>About</li>
      </ul>
    </nav>
  );
}

export default NavBar;

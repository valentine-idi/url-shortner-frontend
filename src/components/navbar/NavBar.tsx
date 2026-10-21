import { FaLink } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Icon from "../Icon";
import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <ul className={`${styles.left} ${styles.navList}`}>
        <li className={`${styles.navItem} ${styles.navLogo}`}>
          <span>
            <Icon className={styles.icon} label={FaLink} />
          </span>
          URL Shortener
        </li>
      </ul>

      <ul className={`${styles.right} ${styles.navList}`}>
        <li className={styles.navItem}>Log in</li>
        <li className={styles.navItem}>Sign up</li>
        <li className={styles.navItem}>
          <Icon label={GiHamburgerMenu} className={styles.hamburger} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

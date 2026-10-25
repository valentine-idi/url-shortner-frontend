import { NavLink } from "react-router";
import { FiPlus, FiSearch, FiCopy, FiTrash2 } from "react-icons/fi";
import LinkCard from "../../components/linkCard";
import Icon from "../../components/Icon";
import styles from "./MyLinks.module.scss";

export default function MyLinks() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>My links</h1>
          <p>All your shortened links, in one place.</p>
        </div>

        <NavLink className={styles.newLinkButton} to="/">
          <Icon label={FiPlus} className={styles.icon} />
          <span>New link</span>
        </NavLink>
      </header>

      <div className={styles.searchBox}>
        <Icon label={FiSearch} className={styles.searchIcon} />

        <label className={styles.srOnly} htmlFor="search-links">
          Search your links
        </label>

        <input
          id="search-links"
          type="search"
          placeholder="Search by URL or short link…"
        />
      </div>

      <p className={styles.linkCount}>2 saved links</p>
    </main>
  );
}

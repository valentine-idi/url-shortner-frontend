import { NavLink } from "react-router";
import { FiLink, FiPlus } from "react-icons/fi";
import Icon from "../../components/Icon";
import styles from "./EmptyLink.module.scss";

function EmptyLink() {
  return (
    <section className={styles.emptyState}>
      <div className={styles.iconWrapper}>
        <Icon label={FiLink} className={styles.emptyIcon} />
      </div>

      <h2>No links yet</h2>
      <p>Create your first short link and it will appear here.</p>

      <NavLink className={styles.createButton} to="/">
        <Icon label={FiPlus} className={styles.buttonIcon} />
        <span>Create a link</span>
      </NavLink>
    </section>
  );
}

export default EmptyLink;

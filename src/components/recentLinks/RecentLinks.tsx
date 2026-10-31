import LinkCard from "../linkCard/LinkCard";
import { type LinksServiceResponse } from "../../services/services";
import styles from "./RecentLinks.module.scss";

interface Props {
  recentLinks: LinksServiceResponse[];
  handleDelete: (id: string) => void;
}

function RecentLinks({ handleDelete, recentLinks }: Props) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Recent links</header>

      {recentLinks.length < 1 && (
        <div className={styles.emptyRecentLinks}>
          <h3>No recent links yet</h3>
          <p>Shorten your first URL above to see it here.</p>
        </div>
      )}

      {recentLinks?.map(({ id, originalUrl, shortUrl }) => (
        <LinkCard
          id={id}
          key={shortUrl}
          originalUrl={originalUrl}
          shortUrl={shortUrl}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default RecentLinks;

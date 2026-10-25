import LinkCard from "../linkCard/LinkCard";
import { type Data } from "../../services/services";
import styles from "./RecentLinks.module.scss";

interface Props {
  recentLinks: Data[];
  handleDelete: (shortUrl: string) => void;
}

function RecentLinks({ handleDelete, recentLinks }: Props) {
  return (
    <div className={styles.container}>
      {recentLinks.length > 0 && (
        <header className={styles.header}>Recent links</header>
      )}

      {recentLinks?.map(({ originalUrl, shortUrl }) => (
        <LinkCard
          originalUrl={originalUrl}
          shortUrl={shortUrl}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default RecentLinks;

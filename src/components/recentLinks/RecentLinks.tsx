import LinkCard from "../linkCard/LinkCard";
import { type linksServiceResponse } from "../../services/services";
import styles from "./RecentLinks.module.scss";

interface Props {
  recentLinks: linksServiceResponse[];
  handleDelete: (id: string) => void;
}

function RecentLinks({ handleDelete, recentLinks }: Props) {
  return (
    <div className={styles.container}>
      {recentLinks.length > 0 && (
        <header className={styles.header}>Recent links</header>
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

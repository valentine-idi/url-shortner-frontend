import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Icon from "../../components/Icon";
import styles from "./Pagination.module.scss";

interface Props {
  changePage: (pageNumber: number) => void;
  changePageNumber: (incBy: 1 | -1) => void;
  paginationArray: number[];
  pageNumber: number;
}

export default function Pagination({
  changePage,
  changePageNumber,
  paginationArray,
  pageNumber,
}: Props) {
  return (
    <nav className={styles.pagination} aria-label="Links pagination">
      <p className={styles.summary}>
        Page {pageNumber} of {paginationArray.length}
      </p>

      <div className={styles.controls}>
        <button
          className={styles.navigationButton}
          type="button"
          disabled={pageNumber === 1}
          onClick={() => changePageNumber(-1)}
        >
          <Icon label={FiChevronLeft} className={styles.icon} />
          <span className={styles.buttonLabel}>Previous</span>
        </button>

        {paginationArray.map((p) => (
          <button
            key={p}
            className={`${styles.pageButton} ${p === pageNumber && styles.active}`}
            type="button"
            onClick={() => changePage(p)}
          >
            {p}
          </button>
        ))}

        <button
          className={styles.navigationButton}
          type="button"
          disabled={pageNumber === paginationArray.length}
          onClick={() => changePageNumber(1)}
        >
          <span className={styles.buttonLabel}>Next</span>
          <Icon label={FiChevronRight} className={styles.icon} />
        </button>
      </div>
    </nav>
  );
}

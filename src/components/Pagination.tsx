import { memo } from "react";
import styles from "./Pagination.module.css";
import PageSize from "./PageSize";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onSelect: (val: number) => void;
  onPageSizeChange: (value: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { totalCount, currentPage, pageSize, onSelect, onPageSizeChange } = props;

  const ranges = Math.ceil(totalCount / pageSize);

  return (
    <div className={styles.container}>
      <PageSize onChange={onPageSizeChange} pageSize={pageSize} />

      <ul className={styles.ul}>
        <li>
          <button disabled={currentPage === 0} className={styles.actionBtn} onClick={() => onSelect(currentPage - 1)}>Prev</button>
        </li>
        {
          Array(ranges).fill(null).map((val, index) => (
            <li key={index + 1}><button className={`${styles.button} ${currentPage === index ? styles.current : ""}`} onClick={() => onSelect(index)}>{index + 1}</button></li>
          ))
        }
        <li>
          <button disabled={currentPage === ranges - 1} onClick={() => onSelect(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </div>
  )
};

export default memo(Pagination);
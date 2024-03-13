import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from "./TablePagination.module.scss";

const SpanNum = ({ idx, num, handlePageChange, children, page, ...args }) => {
  const value = idx >= 0 ? idx + 1 : num;
  return (
    <span
      className={`${value === page ? styles.active : ""}`}
      onClick={() => {
        if (handlePageChange) {
          handlePageChange(value);
        }
      }}
      {...args}
    >
      {children}
    </span>
  );
};
const TablePagination = ({ page, totalPages, handlePageChange }) => {
  const pages = Array.from({ length: totalPages });

  const components =
    totalPages <= 6 ? (
      pages.map((key, idx) => (
        <SpanNum
          page={page}
          idx={idx}
          handlePageChange={handlePageChange}
          key={idx + 1}
        >
          {idx + 1}
        </SpanNum>
      ))
    ) : page >= 5 && page + 4 <= totalPages ? (
      <>
        <SpanNum page={page} num={1} handlePageChange={handlePageChange}>
          1
        </SpanNum>
        <SpanNum page={page}>...</SpanNum>
        {pages.slice(page - 2, page + 1).map((key, idx) => {
          return (
            <SpanNum
              page={page}
              num={page - 2 + idx + 1}
              handlePageChange={handlePageChange}
              key={idx + 1}
            >
              {page - 2 + idx + 1}
            </SpanNum>
          );
        })}
        <SpanNum page={page}>...</SpanNum>
        <SpanNum
          page={page}
          num={totalPages}
          handlePageChange={handlePageChange}
        >
          {totalPages}
        </SpanNum>
      </>
    ) : page < 5 ? (
      <>
        {Array.from({ length: 5 }).map((key, idx) => {
          return (
            <SpanNum
              page={page}
              idx={idx}
              handlePageChange={handlePageChange}
              key={idx + 1}
            >
              {idx + 1}
            </SpanNum>
          );
        })}
        <SpanNum page={page} handlePageChange={handlePageChange}>
          ...
        </SpanNum>
        <SpanNum
          page={page}
          num={totalPages}
          handlePageChange={handlePageChange}
        >
          {totalPages}
        </SpanNum>
      </>
    ) : (
      <>
        <SpanNum page={page} num={1} handlePageChange={handlePageChange}>
          {1}
        </SpanNum>
        <SpanNum page={page} handlePageChange={handlePageChange}>
          ...
        </SpanNum>

        {Array.from({ length: 5 }).map((key, idx) => {
          return (
            <SpanNum
              page={page}
              num={totalPages - 5 + idx + 1}
              handlePageChange={handlePageChange}
              key={totalPages - 5 + idx + 1}
            >
              {totalPages - 5 + idx + 1}
            </SpanNum>
          );
        })}
      </>
    );

  return (
    <div className={styles.wrap}>
      <span
        className={`${styles.dir_icon} ${page === 1 ? styles.disable : ""}`}
        onClick={() => {
          if (page - 1 >= 1) {
            handlePageChange(page - 1);
          }
        }}
      >
        <AiOutlineLeft />
      </span>
      <>{components}</>
      <span
        className={`${styles.dir_icon} ${
          page === totalPages ? styles.disable : ""
        }`}
        onClick={() => {
          if (page + 1 <= totalPages) {
            handlePageChange(page + 1);
          }
        }}
      >
        <AiOutlineRight />
      </span>
    </div>
  );
};

export default TablePagination;

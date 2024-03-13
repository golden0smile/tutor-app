import classNames from "classnames";
import React from "react";

const MyLibraryHeader = ({ headers, styles }) => {
  return (
    <div className={styles.tabContentHeader}>
      {headers?.map(header => {
        return (
          <div className={styles.wrapper} key={header?.title}>
            <div className={styles.titleWrapper}>
              <div className={classNames(styles.title)}>{header?.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyLibraryHeader;

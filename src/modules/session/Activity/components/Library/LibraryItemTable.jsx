import React, { useEffect } from "react";
import styles from "../../AddActivity.module.scss";
import classNames from "classnames";
import LibraryTableInnerRow from "./LibraryTableInnerRow";
import { noDataFoundMsg } from "constants/messages";

const LibraryItemTable = ({
  data,
  headers,
  handleSelected,
  isAddDisable,
  selectedData,
  handlePreviewLibrary,
  topicId,
  subjectID,
}) => {
  useEffect(() => {
    if (topicId) {
      document.querySelector(".defaultExpandRow")?.scrollIntoView();
    }
  }, [topicId]);
  return (
    <div className={styles.tabContentWrapper}>
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

      <div className={styles.tabContainer}>
        <div className={classNames(styles.tabContent)}>
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <div
                className={classNames(
                  styles.collapseContent,
                  +topicId === +item?.pk_tutor_library_item_id
                    ? "defaultExpandRow"
                    : "",
                )}
              >
                <LibraryTableInnerRow
                  key={item?.pk_tutor_library_item_id + index}
                  styles={styles}
                  extra={item}
                  handleSelected={handleSelected}
                  selectedData={selectedData}
                  handlePreviewLibrary={handlePreviewLibrary}
                  subjectID={subjectID}
                />
              </div>
            ))
          ) : (
            <div style={{ alignSelf: "center" }}>{noDataFoundMsg}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryItemTable;

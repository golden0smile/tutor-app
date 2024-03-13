import React, { useEffect, useState } from "react";
import styles from "../AddActivity.module.scss";
import classNames from "classnames";
import LevelTable from "./LevelTable";

const ActivityTable = ({
  data,
  headers,
  handleSelected,
  selectedData,
  handlePreviewAssessment,
  yearID,
  topicId,
}) => {
  const [isOpenClass, setIsOpenClass] = useState({ open: false, id: 0 });
  useEffect(() => {
    document.querySelector(".defaultExpand")?.scrollIntoView();
  }, [yearID]);

  return (
    <>
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

      {data?.length > 0 ? (
        data?.map((item, index) => {
          return (
            <div
              className={classNames(
                styles.tabContainer,
                isOpenClass.open && isOpenClass.id === item?.activity_level_id
                  ? "position-relative"
                  : "",
                item?.activity_level_id === +yearID
                  ? "defaultExpand position-relative"
                  : "",
              )}
              key={index}
            >
              <LevelTable
                key={item.activity_level_id + index}
                styles={styles}
                item={item}
                handleSelected={handleSelected}
                selectedData={selectedData}
                handlePreviewAssessment={handlePreviewAssessment}
                yearID={yearID}
                isDefaultOpen={
                  item?.activity_level_id === +yearID ? true : false
                }
                topicId={topicId}
                yearLevelId={+item?.activity_level_id}
                isOpenClass={isOpenClass}
                setIsOpenClass={setIsOpenClass}
              />
            </div>
          );
        })
      ) : (
        <div style={{ alignSelf: "center" }}>No Data Found</div>
      )}
    </>
  );
};

export default ActivityTable;

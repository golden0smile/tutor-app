import React, { useState } from "react";
import styles from "../../AddActivity.module.scss";
import classNames from "classnames";

import LevelTable from "../LevelTable";
import { noDataFoundMsg } from "constants/messages";

const VideoItemTable = ({
  headers,
  data,
  handleSelected,
  selectedData,
  handlePreviewLibrary,
  topicId,
  yearID,
}) => {
  const [isOpenClass, setIsOpenClass] = useState({ open: false, id: 0 });
  return (
    <div className={styles.tabContentWrapper}>
      <div className={classNames(styles.tabContentHeader)}>
        {headers?.map(header => {
          return (
            <div
              className={classNames(styles.wrapper, styles.diagnosticHeader)}
              key={header?.title}
            >
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
                item?.activity_level_id === +yearID ? "defaultExpand" : "",
              )}
              key={index}
            >
              <LevelTable
                key={item.activity_level_id + index}
                styles={styles}
                item={item}
                handleSelected={handleSelected}
                selectedData={selectedData}
                handlePreviewAssessment={handlePreviewLibrary}
                yearID={yearID}
                isDefaultOpen={
                  item?.activity_level_id === +yearID ? true : false
                }
                topicId={topicId}
                yearLevelId={+item?.activity_level_id}
                isVideo={true}
                isOpenClass={isOpenClass}
                setIsOpenClass={setIsOpenClass}
              />
            </div>
          );
        })
      ) : (
        <div style={{ alignSelf: "center" }}>{noDataFoundMsg}</div>
      )}
    </div>
  );
};

export default VideoItemTable;

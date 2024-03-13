import classNames from "classnames";
import React, { useEffect, useState } from "react";

const VideoTableInnerRow = ({
  styles,
  extra,
  handleSelected,
  selectedData,
  handlePreviewLibrary,
  topicID,
  subject_id,
  yearLevelId,
}) => {
  const [isSelectDisable, setSelectDisable] = useState(false);

  const handleSelect = data => {
    const initialSelected = {
      id: data?.id,
      name: data?.video_name,
      type: 6,
      duration: data?.duration,
      coin: data?.coins,
      topicID: topicID,
    };

    handleSelected(initialSelected, +subject_id);
  };
  useEffect(() => {
    const isAlready = selectedData?.find(
      x => x?.id === extra?.id && x?.topicID === topicID,
    );
    if (isAlready) {
      setSelectDisable(true);
    } else {
      setSelectDisable(false);
    }
  }, [selectedData, extra, topicID]);

  return (
    <div className={styles.innerRowWrapper} key={extra?.id}>
      <div className={styles.innerRow}>
        <div className={styles.rowTitle}>
          <div
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: extra?.video_name || "-" }}
          />
        </div>
      </div>

      <div className={styles.innerRow}>
        <div
          className={styles.rowButton}
          style={{
            backgroundColor: extra?.attended === 1 ? "#65a30d" : "#e5e7eb",
            color: extra?.attended === 1 ? "#ffffff" : "#20365b",
          }}
        >
          <div className={styles.rowTitle}>
            {extra?.attended ? "ATTEMPTED" : "UNATTEMPTED"}
          </div>
        </div>
      </div>

      <div className={styles.innerRow}>
        <div
          className={classNames(
            isSelectDisable ? styles.disableAdd : "",
            styles.rowAddActionButton,
          )}
          onClick={() => {
            if (!isSelectDisable) {
              handleSelect(extra);
            }
            setSelectDisable(true);
          }}
        >
          <div className={styles.actionButtonTitle}>Select</div>
        </div>
        <div className={styles.rowViewActionButton}>
          <div
            className={styles.actionButtonTitle}
            onClick={() => {
              handlePreviewLibrary(extra?.id, 6, topicID, yearLevelId);
            }}
          >
            Preview
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTableInnerRow;

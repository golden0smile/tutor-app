import classNames from "classnames";
import { getActivityType } from "modules/session/utils/getActivityType";
import React, { useEffect, useState } from "react";
import PreviewModal from "./PreviewModal";

const LibraryTableInnerRow = ({
  styles,
  extra,
  handleSelected,
  selectedData,
  handlePreviewLibrary,
  subjectID,
}) => {
  const [isSelectDisable, setSelectDisable] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const handleClosePrev = () => {
    setShowPrev(false);
  };
  const handleSelect = data => {
    const initialSelected = {
      id: data?.pk_tutor_library_item_id,
      name: data?.name,
      type: data?.activity_type,
      duration: data?.duration,
      coin: data?.coins,
      topicID: data?.fk_activity_topic_id,
    };

    handleSelected(initialSelected, +subjectID);
  };
  useEffect(() => {
    const isAlready = selectedData?.find(
      x =>
        x?.id === extra?.pk_tutor_library_item_id &&
        x?.topicID === extra?.fk_activity_topic_id,
    );
    if (isAlready) {
      setSelectDisable(true);
    } else {
      setSelectDisable(false);
    }
  }, [selectedData, extra]);

  return (
    <div
      className={styles.innerRowWrapper}
      key={extra?.pk_tutor_library_item_id}
    >
      <div className={styles.innerRow}>
        <div className={styles.rowTitle}>
          <div
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: extra?.name || "" }}
          />
        </div>
      </div>

      <div className={styles.innerRow}>
        <div className={styles.rowTitle}>
          <div className={styles.title}>
            {extra?.source ? extra?.source : "-"}
          </div>
        </div>
      </div>

      <div className={styles.innerRow}>
        <div className={styles.rowTitle}>
          <div className={styles.title}>
            {extra?.activity_type ? getActivityType(extra?.activity_type) : "-"}
          </div>
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
              // handlePreviewLibrary(
              //   extra?.pk_tutor_library_item_key,
              //   extra?.activity_type,
              //   extra?.fk_activity_topic_id,
              // );
              // setShowPrev(true);
              handlePreviewLibrary(
                extra?.pk_tutor_library_item_key,
                extra?.activity_type,
                // extra?.fk_activity_topic_id,
                extra?.pk_tutor_library_item_id,
              );
            }}
          >
            Preview
          </div>
        </div>
      </div>
      <PreviewModal
        show={showPrev}
        onHide={handleClosePrev}
        confirmation={() => {
          handlePreviewLibrary(
            extra?.pk_tutor_library_item_key,
            extra?.activity_type,
            // extra?.fk_activity_topic_id,
            extra?.pk_tutor_library_item_id,
          );
          handleClosePrev();
        }}
      />
    </div>
  );
};

export default LibraryTableInnerRow;

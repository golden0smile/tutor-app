import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WorksheetTableInnerRow = ({
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
      name: data?.node_name,
      type: 7,
      duration: data?.duration,
      coin: data?.coins,
      topicID: topicID,
    };
    if (data?.activity_pdf_questions?.length > 0) {
      handleSelected(initialSelected, +subject_id);
    } else {
      toast.warning("Selected activity does not have any question...");
    }
  };
  const handlePreview = () => {
    if (extra?.activity_pdf_questions?.length > 0) {
      handlePreviewLibrary(extra?.id, 7, topicID, yearLevelId);
    } else {
      toast.warning(
        "Selected activity does not have any question for preview...",
      );
    }
  };

  useEffect(() => {
    const isAlready = selectedData?.find(
      x => x?.id === extra?.id && x?.topicID === topicID && x?.type === 7,
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
            dangerouslySetInnerHTML={{ __html: extra?.node_name || "-" }}
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
              handlePreview();
            }}
          >
            Preview
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetTableInnerRow;

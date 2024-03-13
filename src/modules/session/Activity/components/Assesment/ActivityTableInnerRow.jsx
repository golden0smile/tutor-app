import classNames from "classnames";
import React, { useEffect, useState } from "react";
import PreviewModal from "../PreviewModal";
import { toast } from "react-toastify";
import { setSelectActivity } from "modules/session/features/sessionSlice";
import { useDispatch } from "react-redux";

const ActivityTableInnerRow = ({
  styles,
  extra,
  handleSelected,
  topicID,
  selectedData,
  handlePreviewAssessment,
  yearLevelId,
  subject_id,
}) => {
  const dispatch = useDispatch();
  const [isSelectDisable, setSelectDisable] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const handleClosePrev = () => {
    setShowPrev(false);
  };
  const handleSelect = data => {
    const initialSelected = {
      id: data?.activity_node_id,
      name: data?.node_name,
      type: 0,
      topicID: topicID,
    };
    handleSelected(initialSelected, subject_id);
  };

  const handlePreview = () => {
    dispatch(
      setSelectActivity({
        activity_node_id: extra?.activity_node_id,
        subject_id: subject_id,
      }),
    ).then(res => {
      if (res?.payload?.statusCode === 200) {
        let condition = false;
        const type =
          subject_id === 1 ? "english" : subject_id === 2 ? "maths" : "";
        condition = res?.payload?.data?.nodeActivityData?.[type]?.length > 0;
        if (condition) {
          handlePreviewAssessment(
            extra?.activity_node_id,
            topicID,
            yearLevelId,
          );
        } else {
          toast.warning(
            "Selected activity does not have any question for preview...",
          );
        }
      }
    });
  };

  useEffect(() => {
    const isAlready = selectedData?.find(
      x => x?.id === extra?.activity_node_id && x?.topicID === topicID,
    );
    if (isAlready) {
      setSelectDisable(true);
    } else {
      setSelectDisable(false);
    }
  }, [selectedData, extra, topicID]);
  return (
    <div className={styles.innerRowWrapper} key={extra?.activity_node_id}>
      <div className={styles.innerRow}>
        <div className={styles.rowTitle}>
          <div
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: extra?.node_name || "",
            }}
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
        <div className={styles.rowTitle}>
          <div className={styles.title}>
            {extra?.accuracy ? extra?.accuracy.toFixed(0) + "%" : "-"}
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
      <PreviewModal
        show={showPrev}
        onHide={handleClosePrev}
        confirmation={() => {
          handlePreviewAssessment(
            extra?.activity_node_id,
            topicID,
            yearLevelId,
          );
          handleClosePrev();
        }}
      />
    </div>
  );
};

export default ActivityTableInnerRow;

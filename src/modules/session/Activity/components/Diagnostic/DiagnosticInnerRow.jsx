import classNames from "classnames";
import React, { useEffect, useState } from "react";
import PreviewModal from "../PreviewModal";
import { Tick } from "constants/images";
import { toast } from "react-toastify";

const DiagnosticInnerRow = ({
  styles,
  extra,
  handleSelected,
  topicID,
  selectedData,
  handlePreviewAssessment,
  yearLevelId,
  subject_id,
}) => {
  const [isSelectDisable, setSelectDisable] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const handleClosePrev = () => {
    setShowPrev(false);
  };
  const diagnosticData =
    +subject_id === 1
      ? "english_diagnostic"
      : +subject_id === 2
      ? "diagnostic"
      : "";
  //extra.attended
  const handleSelect = data => {
    const qnsIds =
      +subject_id === 1
        ? data.activity_master_topic?.activity_level_has_topic_nodes?.flatMap(
            h =>
              h?.activity_node?.english_diagnostic_question_activities?.flatMap(
                j => j?.english_diagnostic?.diagnostic_id,
              ),
          )
        : data.activity_master_topic?.activity_level_has_topic_nodes?.flatMap(
            h =>
              h?.activity_node?.diagnostic_question_activities?.flatMap(
                j => j?.diagnostic?.diagnostic_id,
              ),
          );
    const getCoins =
      +subject_id === 1
        ? data.activity_master_topic?.activity_level_has_topic_nodes?.flatMap(
            h =>
              h?.activity_node?.english_diagnostic_question_activities?.flatMap(
                j => j?.english_diagnostic?.coins,
              ),
          )
        : data.activity_master_topic?.activity_level_has_topic_nodes?.flatMap(
            h =>
              h?.activity_node?.diagnostic_question_activities?.flatMap(
                j => j?.diagnostic?.coins,
              ),
          );

    const initialSelected = {
      id: qnsIds,
      name: data?.activity_master_topic?.topic_name,
      type: 2,
      duration: qnsIds?.length * 1 + " mins",
      // coin: qnsIds?.length * 2,
      coin: extra?.coins,
      // topicID: topicID,
      topicID: data?.activity_master_topic?.activity_topic_id,
    };
    handleSelected(initialSelected, +subject_id);
  };

  const handlePreview = () => {
    const type =
      subject_id === 1
        ? "english_diagnostic"
        : subject_id === 2
        ? "diagnostic_question_activities"
        : "";
    const Condition =
      extra.activity_master_topic?.activity_level_has_topic_nodes?.flatMap(
        h => h?.activity_node?.[type]?.length > 0,
      );
    if (Condition) {
      handlePreviewAssessment(
        extra?.activity_master_topic?.activity_topic_id,
        2,
        topicID,
        +yearLevelId,
      );
    } else {
      toast.warning(
        "Selected activity does not have any question for preview...",
      );
    }
  };

  useEffect(() => {
    const isAlready = selectedData?.find(
      x =>
        x?.topicID === extra?.activity_master_topic?.activity_topic_id &&
        x?.type === 2,
    );

    if (isAlready) {
      setSelectDisable(true);
    } else {
      setSelectDisable(false);
    }
  }, [selectedData, extra, topicID, diagnosticData]);
  return (
    <div className={styles.innerRowWrapper} key={extra?.activity_node_id}>
      <div className={classNames(styles.innerRow, styles.diagnosticData)}>
        <div className={styles.rowTitle}>
          <div
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: extra?.activity_master_topic?.topic_name || "",
            }}
          />

          {+extra?.checkmark === 1 ? (
            <img src={Tick} alt="" style={{ width: "15px" }} className="ms-3" />
          ) : null}
        </div>
      </div>

      <div className={styles.innerRow} style={{ paddingLeft: "0" }}>
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
      <PreviewModal
        show={showPrev}
        onHide={handleClosePrev}
        confirmation={() => {
          handlePreviewAssessment(
            extra?.activity_master_topic?.activity_topic_id,
            2,
            topicID,
            +yearLevelId,
          );
          handleClosePrev();
        }}
      />
    </div>
  );
};

export default DiagnosticInnerRow;

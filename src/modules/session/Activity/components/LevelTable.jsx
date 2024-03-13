import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Collapse } from "reactstrap";
import classNames from "classnames";
import ActivityTableRow from "./ActivityTableRow";
import DiagnosticInnerRow from "./Diagnostic/DiagnosticInnerRow";

const LevelTable = ({
  styles,
  item,
  handleSelected,
  selectedData,
  handlePreviewAssessment,
  isDefaultOpen,
  topicId,
  yearLevelId,
  isDiagnostic = false,
  isVideo = false,
  subjectID,
  isWorksheet = false,
  isOpenClass,
  setIsOpenClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    setIsOpenClass({ ...isOpenClass, id: yearLevelId });
  };
  useEffect(() => {
    if (isDefaultOpen) {
      setIsOpen(true);
    }
  }, [isDefaultOpen]);

  useEffect(() => {
    setIsOpenClass({ ...isOpenClass, open: isOpen });
  }, [isOpen]);

  return (
    <div className={classNames(styles.tabContent, isDefaultOpen ? "" : "")}>
      <div
        className={styles.tabContainerWrapper}
        onClick={() => toggle()}
        key={item?.activity_topic_id}
      >
        <div className={styles.tabTitleWrapper}>
          <div
            className={styles.levelTitle}
            dangerouslySetInnerHTML={{ __html: item?.level_name || "" }}
          />
        </div>
        <div className={styles.tabTitleWrapper}>
          <div className={styles.tabTitle}></div>
        </div>
        <div
          className={styles.tabTitleWrapper}
          style={{ justifyContent: "flex-end" }}
        >
          <div
            className={classNames(styles.tabTitle, styles.masterScore)}
          ></div>
          <div className={styles.collapseIcon}>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
      </div>
      <Collapse
        isOpen={isOpen}
        className={styles.collapseContent}
        onEntered={() => {
          if (isDefaultOpen) {
            document.querySelector(".defaultExpandRow")?.scrollIntoView();
          }
        }}
      >
        {isDiagnostic
          ? item?.topics?.map((extra, index) => {
              return (
                <DiagnosticInnerRow
                  isDiagnostic={isDiagnostic}
                  key={index}
                  styles={styles}
                  extra={extra}
                  handleSelected={handleSelected}
                  topicID={extra?.activity_master_topic?.activity_topic_id}
                  selectedData={selectedData}
                  subject_id={+subjectID}
                  handlePreviewAssessment={handlePreviewAssessment}
                  yearLevelId={yearLevelId}
                />
              );
            })
          : isVideo
          ? item?.topics?.map((extra, index) => {
              return (
                <ActivityTableRow
                  key={index}
                  styles={styles}
                  subject_id={+extra?.item?.subject_id}
                  item={extra}
                  handleSelected={handleSelected}
                  selectedData={selectedData}
                  handlePreviewAssessment={handlePreviewAssessment}
                  topicId={topicId}
                  isDefaultOpen={
                    +extra?.activity_master_topic?.activity_topic_id ===
                    +topicId
                  }
                  yearLevelId={yearLevelId}
                  isVideo={true}
                />
              );
            })
          : isWorksheet
          ? item?.topics?.map((extra, index) => {
              return (
                <ActivityTableRow
                  key={index}
                  styles={styles}
                  subject_id={item?.subject_id}
                  item={extra}
                  handleSelected={handleSelected}
                  selectedData={selectedData}
                  handlePreviewAssessment={handlePreviewAssessment}
                  topicId={topicId}
                  isDefaultOpen={
                    +extra?.activity_master_topic?.activity_topic_id ===
                    +topicId
                  }
                  yearLevelId={yearLevelId}
                  isWorksheet={true}
                />
              );
            })
          : item?.LevelTopics?.map((extra, index) => {
              return (
                <ActivityTableRow
                  key={index}
                  styles={styles}
                  subject_id={+extra?.subject?.subject_id}
                  item={extra}
                  handleSelected={handleSelected}
                  selectedData={selectedData}
                  handlePreviewAssessment={handlePreviewAssessment}
                  topicId={topicId}
                  isDefaultOpen={+extra?.activity_topic_id === +topicId}
                  yearLevelId={yearLevelId}
                />
              );
            })}
      </Collapse>
    </div>
  );
};

export default LevelTable;

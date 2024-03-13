import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Collapse } from "reactstrap";
import ActivityTableInnerRow from "./ActivityTableInnerRow";
import classNames from "classnames";
import LibraryTableInnerRow from "./LibraryTableInnerRow";
import VideoTableInnerRow from "./VideoTableInnerRow";

const ActivityTableRow = ({
  styles,
  item,
  handleSelected,
  selectedData,
  isLibrary = false,
  subject_id,
  handlePreviewAssessment,
  handlePreviewLibrary,
  topicId,
  isDefaultOpen,
  yearLevelId,
  LibraryTopicId,
  isVideo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    if (isDefaultOpen) {
      setIsOpen(true);
    }
  }, [isDefaultOpen, isLibrary]);

  const dataOfSubject =
    item?.subject_id === 1
      ? "english_activity_video_extra_data"
      : "math_activity_video_extra_data";

  return (
    <div
      className={classNames(
        styles.tabContent,
        isLibrary
          ? LibraryTopicId === +topicId
            ? "defaultExpandRow"
            : ""
          : isVideo
          ? item?.activity_master_topic?.activity_topic_id === +topicId
            ? "defaultExpandRow"
            : ""
          : +item?.activity_topic_id === +topicId
          ? "defaultExpandRow"
          : "",
      )}
    >
      <div
        className={classNames(styles.tabContainerWrapper)}
        onClick={() => toggle()}
        key={item?.activity_topic_id}
      >
        <div
          className={styles.tabTitleWrapper}
          // style={{ justifyContent: "flex-start" }}
        >
          {isVideo ? (
            <div
              className={styles.tabTitle}
              dangerouslySetInnerHTML={{
                __html: item?.activity_master_topic?.topic_name || "",
              }}
            />
          ) : (
            <div
              className={styles.tabTitle}
              dangerouslySetInnerHTML={{ __html: item?.topic_name || "" }}
            />
          )}
        </div>
        <div className={styles.tabTitleWrapper}>
          <div className={styles.tabTitle}></div>
        </div>
        <div
          className={styles.tabTitleWrapper}
          style={{ justifyContent: "flex-end" }}
        >
          <div className={classNames(styles.tabTitle, styles.masterScore)}>
            Mastery Score:{" "}
            {isVideo
              ? item?.activity_master_topic?.score?.toFixed(0)
              : item?.score?.toFixed(0)}
          </div>
          <div className={styles.collapseIcon}>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
      </div>

      <Collapse isOpen={isOpen} className={styles.collapseContent}>
        {isLibrary
          ? item?.TutorLibraryItems?.map((extra, index) => {
              return (
                <LibraryTableInnerRow
                  key={extra?.pk_tutor_library_item_id + index}
                  styles={styles}
                  extra={extra}
                  handleSelected={handleSelected}
                  selectedData={selectedData}
                  handlePreviewLibrary={handlePreviewLibrary}
                />
              );
            })
          : isVideo
          ? item?.activity_master_topic?.activity_level_has_topic_nodes?.map(
              (x, index) => {
                return x?.activity_node?.[dataOfSubject]?.map(
                  (extra, index) => {
                    return (
                      <VideoTableInnerRow
                        key={index}
                        styles={styles}
                        extra={extra}
                        handleSelected={handleSelected}
                        topicID={item?.activity_master_topic?.activity_topic_id}
                        selectedData={selectedData}
                        subject_id={item?.subject_id}
                        handlePreviewLibrary={handlePreviewAssessment}
                        yearLevelId={yearLevelId}
                      />
                    );
                  },
                );
              },
            )
          : item?.TopicActivities?.map((extra, index) => {
              return (
                <ActivityTableInnerRow
                  key={index}
                  styles={styles}
                  extra={extra}
                  handleSelected={handleSelected}
                  topicID={item?.activity_topic_id}
                  selectedData={selectedData}
                  subject_id={subject_id}
                  handlePreviewAssessment={handlePreviewAssessment}
                  yearLevelId={yearLevelId}
                />
              );
            })}
      </Collapse>
    </div>
  );
};

export default ActivityTableRow;

import { IconBack, QuestionMarkCircle, RightArrow1 } from "constants/images";
import styles from "../Modals/ModalForStudentDetails.module.scss";
import PiChart from "modules/session/chart/PiChart";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import getScoreStatus from "modules/session/utils/getScoreStatus";
import CommonModal from "components/CommonModal";
import TopicMasteryScoreInfo from "./TopicMasteryScoreInfo";
import { subjectName } from "constants/CustomTableConstant";
const ReportSection = ({
  setReportDetails,
  setReportListing,
  onClickTopic,
  subject_id,
}) => {
  const { studentDetails } = useSelector(state => state.session);
  const [show, setShow] = useState(false);
  const subjectNames = [
    ...new Set(
      subject_id?.map(x =>
        +x === 1
          ? subjectName.ENGLISH + " Curriculum"
          : +x === 2
          ? subjectName.MATHS + " Curriculum"
          : "",
      ) || [],
    ),
  ].toString();

  const getNumberOfTopics = () => {
    if (studentDetails?.reportDetails) {
      const total =
        studentDetails?.reportDetails?.mastery_graph_data?.high_mastery_score +
        studentDetails?.reportDetails?.mastery_graph_data?.mid_mastery_score +
        studentDetails?.reportDetails?.mastery_graph_data?.low_mastery_score +
        studentDetails?.reportDetails?.mastery_graph_data?.no_score;
      return total;
    } else {
      return 0;
    }
  };
  useEffect(() => {}, []);
  return (
    <div className={styles.modelStudentDetailsReportSectionMainContainer}>
      <div className={styles.modelStudentDetailsReportSectionHeader1}>
        <label>
          {studentDetails?.student?.activity_level?.level_name}{" "}
          {studentDetails?.student?.activity_level?.level_name ? "•" : ""}{" "}
          {subjectNames}
        </label>
      </div>
      <div className={styles.modelStudentDetailsReportSectionHeader2}>
        <div className={styles.modelStudentDetailsReportSectionHeader2Item}>
          <label>Classes Attended</label>
          <span>{studentDetails?.reportDetails?.classAttendedCount}</span>
        </div>
        <div className={styles.modelStudentDetailsReportSectionHeader2Item}>
          <label>Activities Completed</label>
          <span>{studentDetails?.reportDetails?.activityCompletedCount}</span>
        </div>
      </div>
      <div className={styles.modelStudentDetailsReportSectionHeader3}>
        <label>Topic mastery</label>
        <img onClick={() => setShow(true)} src={QuestionMarkCircle} alt="" />
      </div>

      <div className={styles.modelStudentDetailsReportSectionTopicsSection}>
        <label>No of Topics</label>
        {/* <span>{studentDetails?.reportDetails?.totalTopicsCount}</span> */}
        <span>{getNumberOfTopics()}</span>
      </div>

      <div className={styles.modelStudentDetailsReportSectionTopicsSection1}>
        <div className={styles.modelStudentDetailsReportTopicsDiagramDesc}>
          <div
            className={styles.modelStudentDetailsReportSectionTopicsDiagram1}
          />
          <label id={styles.label01}>High mastery</label>
          <span>
            <strong>
              {studentDetails?.reportDetails?.mastery_graph_data
                ?.high_mastery_score
                ? studentDetails?.reportDetails?.mastery_graph_data
                    ?.high_mastery_score
                : 0}
            </strong>
            topic
          </span>
        </div>
        <div className={styles.modelStudentDetailsReportTopicsDiagramDesc}>
          <div
            className={styles.modelStudentDetailsReportSectionTopicsDiagram2}
          />
          <label id={styles.label02}>Medium mastery</label>
          <span>
            <strong>
              {studentDetails?.reportDetails?.mastery_graph_data
                ?.mid_mastery_score
                ? studentDetails?.reportDetails?.mastery_graph_data
                    ?.mid_mastery_score
                : 0}
            </strong>
            topic
          </span>
        </div>
        <div className={styles.modelStudentDetailsReportTopicsDiagramDesc}>
          <div
            className={styles.modelStudentDetailsReportSectionTopicsDiagram3}
          />
          <label id={styles.label03}>Low mastery</label>
          <span>
            <strong>
              {studentDetails?.reportDetails?.mastery_graph_data
                ?.low_mastery_score
                ? studentDetails?.reportDetails?.mastery_graph_data
                    ?.low_mastery_score
                : 0}
            </strong>
            topic
          </span>
        </div>
        <div className={styles.modelStudentDetailsReportTopicsDiagramDesc}>
          <div
            className={styles.modelStudentDetailsReportSectionTopicsDiagram4}
          />
          <label id={styles.label04}>No Score</label>
          <span>
            <strong>
              {studentDetails?.reportDetails?.mastery_graph_data?.no_score
                ? studentDetails?.reportDetails?.mastery_graph_data?.no_score
                : 0}
            </strong>
            topic
          </span>
        </div>
      </div>
      <div
        onClick={() => setReportListing()}
        className={styles.modelStudentDetailsReportTopicsBtn}
      >
        <label>All topics</label>
        <img onClick={() => setReportListing()} src={IconBack} alt="" />
      </div>
      <div className={styles.modelStudentDetailsReportPieChartSection}>
        {studentDetails?.reportDetails?.improveChildMasteryScore?.length > 0 &&
        window?.ResizeObserver ? (
          <Fragment>
            <label>Topics practiced in the past month</label>
            <PiChart
              graphData={
                studentDetails?.reportDetails?.improveChildMasteryScore
              }
            />
          </Fragment>
        ) : null}
        {studentDetails?.reportDetails?.improveChildMasteryScore?.length > 0 ? (
          <Fragment>
            <label>Improve their mastery score</label>
            <span>Practice these topics more</span>
            <div className={styles.modelStudentDetailsReportTopicSec}>
              <p>TOPIC</p>
              <p>MASTERY SCORE</p>
            </div>
            {studentDetails?.reportDetails?.improveChildMasteryScore?.map(
              (item, index) => {
                let score = item?.current_mastery_score
                  ? getScoreStatus(item?.current_mastery_score)
                  : 0;
                return (
                  <div
                    key={index}
                    className={styles.modelStudentDetailsReportTopicSec}
                    onClick={() =>
                      onClickTopic(
                        item?.activity_node?.activityLevelHasTopicNode
                          ?.activity_master_topic?.activity_topic_id,
                      )
                    }
                  >
                    <span className={styles.title}>
                      {item?.activity_node.node_name}
                    </span>
                    <span
                      id={
                        score === 0
                          ? styles.noScore
                          : [
                              score === 1
                                ? styles.highScore
                                : [
                                    score === 2
                                      ? styles.mediumScore
                                      : score === 3 && styles.Failed,
                                  ],
                            ]
                      }
                    >
                      {item?.current_mastery_score
                        ? Math.floor(item?.current_mastery_score)
                        : "No Score"}
                      <img src={RightArrow1} alt="" />
                    </span>
                  </div>
                );
              },
            )}
          </Fragment>
        ) : null}
      </div>
      <CommonModal
        show={show}
        hide={() => setShow(false)}
        closeModal={() => setShow(false)}
        modalBody={TopicMasteryScoreInfo()}
        title={"Topic mastery"}
      />
    </div>
  );
};
export default ReportSection;

import {
  Close1,
  FilterIcon,
  NoScoreIcon,
  RightArrow1,
  SessionLeftArrowIcon,
} from "constants/images";
import styles from "../ModalForStudentDetails.module.scss";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCountOfCompletedQuestions } from "modules/session/utils/getCountOfCompletedQuestions";
import CustomSelect from "components/CommonDropDown";
import reactSelectStyles from "components/CommonDropDown/reactSelectStyles";
import getScoreStatus from "modules/session/utils/getScoreStatus";
import { getActivityLevel } from "modules/session/features/sessionSlice";
import { useDispatch } from "react-redux";

const ReportListing = ({
  onClickBack,
  onClickTopic,
  subject_id,
  subjectName,
  levels,
  setLevels,
  masteryLevel,
  setMasteryLevel,
  selectedLevel,
  setSelectedLevel,
  loading = true,
  setLoading,
  handleReportListing,
}) => {
  const dispatch = useDispatch();
  const { studentDetails } = useSelector(state => state.session);
  const [levelData, setLevelData] = useState([]);

  const getLevel = useCallback(async () => {
    const levelPayload = {
      subject_id: 0,
    };
    dispatch(getActivityLevel(levelPayload)).then(res => {
      const mathsData =
        res?.payload?.data?.activityLevels?.filter(x => x?.subject_id === 2) ||
        [];
      const englishData =
        res?.payload?.data?.activityLevels?.filter(x => x?.subject_id === 1) ||
        [];
      const subjectData = [...mathsData, ...englishData];
      const groupedData = subjectData.reduce((groups, subject) => {
        const label = subject.subject_id === 1 ? "English" : "Maths";
        if (!groups[label]) {
          groups[label] = [];
        }

        groups[label].push({
          label: subject.level_name,
          value: subject.activity_level_id,
        });

        return groups;
      }, {});

      const result = Object.keys(groupedData).map(label => ({
        label,
        options: groupedData[label],
      }));
      setLevelData(result);
    });
  }, [dispatch]);

  useEffect(() => {
    if (studentDetails?.topicDetailsBySubject) {
      setLoading(false);
    }
    let arr = [];
    if (studentDetails?.topicDetailsBySubject) {
      studentDetails?.topicDetailsBySubject?.primaryList?.map((item, index) => {
        let v = {
          label: item?.level_name,
          value: item?.activity_level_id,
        };
        arr.push(v);
        return {};
      });
      setLevels(arr);
    }
  }, [studentDetails?.topicDetailsBySubject, setLevels, setLoading]);
  const masteryLevelArray = [
    {
      value: 0,
      label: "No score",
    },
    {
      value: 1,
      label: "Low mastery",
    },
    {
      value: 2,
      label: "Mid mastery",
    },
    {
      value: 3,
      label: "High mastery",
    },
  ];

  useEffect(() => {
    getLevel();
  }, [dispatch]);
  return (
    <div className={styles.reportListingMainContainer}>
      <div className={styles.reportListingHeaderSection}>
        <div className={styles.reportListingBackButton}>
          <img
            onClick={() => onClickBack()}
            alt=""
            src={SessionLeftArrowIcon}
          />
          <label>Back</label>
        </div>
        <img onClick={() => onClickBack()} src={Close1} alt="" />
      </div>
      <div className={styles.reportListingFilterSection}>
        <div className={styles.reportListingFilterSectionHead}>
          <label>View all topics</label>
        </div>
        <div className={styles.reportListingFilterSectionContent}>
          <img
            onClick={() => {
              handleReportListing();
            }}
            src={FilterIcon}
            alt=""
          />
          <CustomSelect
            placeHolder="Select level"
            styles={{
              container: provided => ({
                ...reactSelectStyles.container(provided),
                minWidth: "150px !important",
                maxWidth: "150px !important",
                marginRight: "20px !important",
              }),
            }}
            // list={levels}
            list={levelData}
            isGroup={true}
            value={selectedLevel}
            handleChange={(e, t) => {
              setSelectedLevel(e.value);
            }}
          />
          <CustomSelect
            styles={{
              container: provided => ({
                ...reactSelectStyles.container(provided),
                minWidth: "150px !important",
                maxWidth: "150px !important",
              }),
            }}
            list={masteryLevelArray}
            value={masteryLevel}
            handleChange={(e, t) => {
              setMasteryLevel(e.value);
            }}
          />
        </div>
        {!loading ? (
          studentDetails?.topicDetailsBySubject?.subjectDetails
            ?.LessonActivities?.length > 0 ? (
            <div className={styles.reportListingContent}>
              {studentDetails?.topicDetailsBySubject?.subjectDetails?.LessonActivities?.map(
                (item, i) => {
                  let score = item?.current_mastery_score
                    ? getScoreStatus(item?.current_mastery_score)
                    : 0;
                  return (
                    <div key={i} className={styles.reportListingContentItem}>
                      <div
                        onClick={() => onClickTopic(item?.activity_topic_id)}
                        className={styles.reportListingContentItemSec1}
                      >
                        <div className={styles.reportListingContentItemSecCont}>
                          <label>{item?.topic_name}</label>
                          <span>{item?.level_name}</span>
                        </div>
                        <img alt="" src={RightArrow1} />
                      </div>
                      <div className={styles.reportListingContentItemSec2}>
                        <p>Questions Completed</p>
                        <span>{item?.question_completed}</span>
                      </div>
                      <div className={styles.reportListingContentItemSec2}>
                        <p>Current mastery score</p>
                        <p
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
                          {item?.current_mastery_score ? (
                            Math.floor(item?.current_mastery_score)
                          ) : (
                            <Fragment>
                              <label>No Score</label>
                              <img src={NoScoreIcon} alt="" />
                            </Fragment>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          ) : (
            <p style={{ alignSelf: "center" }}>No Data Found...</p>
          )
        ) : (
          <div className={styles.loader} />
        )}
      </div>
    </div>
  );
};
export default ReportListing;

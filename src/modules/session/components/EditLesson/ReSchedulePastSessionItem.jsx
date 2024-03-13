import { useSelector } from "react-redux";
import styles from "../../pages/EditLessonPlan.module.scss";
import ActivityCard from "../ActivityCard";
import { Clock, coin } from "constants/images";
import { getStatus, getActivityStatus } from "../../utils/Functions";
import Cookies, { cookieKeys } from "services/cookies";
import routesConstants from "routes/routesConstants";
import getExpectedCoinsForLesson from "modules/session/utils/getExpectedCoinsForLesson";

const ReSchedulePastSessionItem = ({
  title,
  desc,
  activity_list,
  type,
  duration,
  setViewReport,
  subject_id,
  locationParams,
  yearId,
  handleActivityDelete,
}) => {
  const { previousPlan, editLessonPlan } = useSelector(state => state.session);

  const handlePreview = (node_id, activityType, subjectId) => {
    const itemType =
      +activityType === 0
        ? "assessment"
        : +activityType === 1
        ? "videos"
        : +activityType === 5
        ? "worksheets"
        : +activityType === 3
        ? "link"
        : +activityType === 4
        ? "task"
        : +activityType === 2
        ? "diagnostic"
        : "";
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.EDIT_LESSON_PLAN}/${editLessonPlan?.pk_lesson_key}?is_homework=${type}&sessionId=${locationParams?.sessionId}&studentId=${locationParams?.studentId}&subjectId=${locationParams?.subjectId}&yearId=${yearId}&typePlan=${locationParams?.typePlan}&selectedTab=${locationParams?.selectedTab}&isReschedule=true`;
    const url = `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${node_id}`;
    const studentData = {
      studentID: locationParams?.studentId,
      subjectID: +subjectId,
      isActivityPage: false,
      activityNodeId: node_id,
      redirectUrl: fullUrl,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
    };
    Cookies.setStudent(cookieKeys.STUDENT_DATA, JSON.stringify(studentData));
    console.log({ studentData, url });
    window.open(url, "_self");
  };

  const handleMarkView = (id, activityType, subjectId) => {
    const itemType =
      +activityType === 5
        ? "worksheets"
        : +activityType === 0
        ? "manual-marking"
        : "";
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.EDIT_LESSON_PLAN}/${editLessonPlan?.pk_lesson_key}?is_homework=${type}&sessionId=${locationParams?.sessionId}&studentId=${locationParams?.studentId}&subjectId=${subjectId}&yearId=${yearId}&typePlan=${locationParams?.typePlan}&selectedTab=${locationParams?.selectedTab}&isReschedule=true`;
    const url = `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${id}`;
    const studentData = {
      studentID: locationParams?.studentId,
      subjectID: +subjectId,
      redirectUrl: fullUrl,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
    };
    Cookies.setStudent(cookieKeys.STUDENT_DATA, JSON.stringify(studentData));
    console.log({ url });
    window.open(url, "_self");
  };
  return (
    <div className={styles.editLessonPlanContentItemCont}>
      <label>
        <b>{title}</b>
      </label>
      <p>{desc}</p>
      <div className={styles.divider} />
      <div className={styles.editLessonPlanSessionDetailsLeftSection}>
        <div className={styles.editLessonPlanSessionDetailsCont}>
          <img alt="coin-icon" src={coin} />
          <label>
            {getExpectedCoinsForLesson(activity_list) === 0
              ? 0
              : `${
                  type && previousPlan?.homework_coins_earned
                    ? previousPlan?.homework_coins_earned
                    : !type && previousPlan?.lesson_coins_earned
                    ? previousPlan?.lesson_coins_earned
                    : 0
                }/${getExpectedCoinsForLesson(activity_list)}`}
          </label>
        </div>
        <div className={styles.editLessonPlanSessionDetailsCont}>
          <img alt="clock-icon" src={Clock} />
          <label>{duration ? `${duration}` : null}</label>
        </div>
      </div>
      <div>
        <label
          className={
            getStatus(activity_list) === 1
              ? styles.fullyCompleted
              : getStatus(activity_list) === 0
              ? styles.notCompleted
              : styles.partiallyCompleted
          }
        >
          {getActivityStatus(activity_list, type, previousPlan?.ses_status)}
        </label>
      </div>
      {activity_list?.length > 0 && getStatus(activity_list) === 1 && (
        <button
          onClick={() => setViewReport(true)}
          className={styles.OutlineButton}
        >
          View {type ? "homework" : "lesson"} report
        </button>
      )}

      {activity_list?.map((item, i) => {
        return (
          <ActivityCard
            handleActivityDelete={handleActivityDelete}
            key={i}
            subject_id={+item?.fk_sub_id}
            type={4}
            values={item}
            handlePreview={() => {
              handlePreview(
                item?.pk_lesson_activity_key,
                item?.activity_type,
                +item?.fk_sub_id,
              );
            }}
            handleMarkView={() => {
              handleMarkView(
                item?.pk_lesson_activity_key,
                item?.activity_type,
                +item?.fk_sub_id,
              );
            }}
          />
        );
      })}
    </div>
  );
};
export default ReSchedulePastSessionItem;

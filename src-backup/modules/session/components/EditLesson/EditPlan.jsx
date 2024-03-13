import { useCallback, useState } from "react";
import styles from "../../pages/EditLessonPlan.module.scss";
import ReactDnd from "../ReactDnd";
import ActivityCard from "../ActivityCard";
import { Clock, RandomizeIcon, SequentialIcon, coin } from "constants/images";
import Switch from "react-switch";
import routesConstants from "routes/routesConstants";
import moment from "moment";
import { useSelector } from "react-redux";
import { getSubStr, getTime } from "modules/session/utils/Functions";
import { getDuration } from "modules/session/utils/getDuration";
import { getHourMinis } from "modules/dashboard/utils/getHourMinis";
import { useDispatch } from "react-redux";
import Cookies, { cookieKeys } from "services/cookies";
import { addUpdateActivity } from "modules/session/features/sessionSlice";
import { toast } from "react-toastify";
import classNames from "classnames";
import getExpectedCoinsForLesson from "modules/session/utils/getExpectedCoinsForLesson";

// const dummy =
//   "localhost:3000/edit-lesson-plan/14acdccb795a6343aea3b3acc32a4cff?is_homework=0&sessionId=38djeeeioixiwi2p2;2lds8x8xusfkls;alds8ud&studentId=a55ccad1353a0286&subjectId=2&yearId=10";

const EditPlan = ({
  title,
  type,
  data,
  setData,
  locationParams,
  navigate,
  setBtnDisable,
  handleActivityDelete,
  getValues,
  yearId,
  setUpdate,
}) => {
  const { editLessonPlan, lessonPlan } = useSelector(state => state.session);

  const [activityType, setActivityType] = useState(() => ({
    type: "",
    is_homework: "",
    activityId: "",
  }));

  const redirectHandler = useCallback(() => {
    if (+type === 0 && +lessonPlan?.ses_is_completed === 1) {
      toast.error("Session is already completed");
    } else {
      navigate("/" + routesConstants.ADD_ACTIVITY, {
        state: {
          sessionID: locationParams?.sessionId,
          studentID: locationParams?.studentId,
          subjectID: locationParams?.subjectId,
          yearID: yearId,
          is_homework: type,
          typePlan: locationParams?.typePlan,
          selectedTabEditSession:
            +locationParams?.selectedTab ||
            +locationParams?.selectedTabEditSession,
        },
      });
    }
  }, [navigate, yearId, type, locationParams]);

  let lesson_activity = editLessonPlan?.LessonActivities
    ? editLessonPlan?.LessonActivities
    : [];

  lesson_activity = lesson_activity?.filter(i =>
    type ? i?.marked_for_homework : !i?.marked_for_homework,
  );

  // let totalCoins = 0;

  // let t = 0;
  // lesson_activity?.map(item => {
  //   return (t = t + item?.LessonActivityQuestions?.length * 2);
  // });
  // totalCoins = t;
  const handleChange = e => {
    if (type === 0) {
      setData(p => ({ ...p, lesson_desc: e.target.value }));
      setUpdate(false);
    } else {
      setData(p => ({ ...p, homework_desc: e.target.value }));
      setUpdate(false);
    }
    setBtnDisable(false);
  };
  const handleToggleChange = () => {
    if (type === 0) {
      setData(prev => ({
        ...prev,
        lesson_sequential: !prev?.lesson_sequential,
      }));
    } else {
      setData(prev => ({
        ...prev,
        homework_sequential: !prev?.homework_sequential,
      }));
    }
    setUpdate(false);
    setBtnDisable(false);
  };
  const ActivityComponent = ({ child }) => {
    return child;
  };
  const dispatch = useDispatch();
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
        : +activityType === 6
        ? "videos"
        : "";
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.EDIT_LESSON_PLAN}/${editLessonPlan?.pk_lesson_key}?is_homework=${type}&sessionId=${locationParams?.sessionId}&studentId=${locationParams?.studentId}&subjectId=${subjectId}&yearId=${yearId}&typePlan=${locationParams?.typePlan}&selectedTab=${locationParams?.selectedTab}`;
    const url =
      +activityType === 6
        ? `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${node_id}?type=${activityType}&subject_id=${subjectId}`
        : `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${node_id}`;
    const studentData = {
      // sessionID: locationParams?.sessionId || query?.sessionId,
      studentID: locationParams?.studentId,
      subjectID: +subjectId,
      // yearId: yearId,

      isActivityPage: false,
      activityNodeId: node_id,
      redirectUrl: fullUrl,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
    };

    Cookies.setStudent(cookieKeys.STUDENT_DATA, JSON.stringify(studentData));
    console.log({ studentData, url });
    window.open(url, "_self");
  };

  const handleRepeat = (data = "") => {
    const isAssessment = +data?.activity_type === 0 ? true : false;
    const activityDetails = [
      {
        activity_node_id: isAssessment
          ? data?.activity_node?.activity_node_id
          : data?.library_item?.pk_tutor_library_item_id,
        type: +data?.activity_type, // Type of activity
        topic_id: isAssessment
          ? data?.activity_node?.activityLevelHasTopicNode?.topic_id
          : data?.library_item?.activity_master_topic?.activity_topic_id, //parent topic id
        subject_id: +data?.fk_sub_id,
        is_homework: data?.marked_for_homework,
      },
    ];
    const payload = {
      subject_id: +data?.fk_sub_id,
      student_key: locationParams?.studentId,
      session_key: locationParams?.sessionId,
      lesson_key: editLessonPlan?.pk_lesson_key,
      activities: activityDetails,
      is_homework: data?.marked_for_homework,
    };
    dispatch(addUpdateActivity(payload)).then(res => {
      if (res?.payload?.statusCode === 200) {
        getValues();
        toast.success("Activity repeated successfully...");
      }
    });
  };

  const handleMarkView = (id, activityType, subjectId) => {
    const itemType =
      +activityType === 5
        ? "worksheets"
        : +activityType === 0
        ? "manual-marking"
        : "";
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.EDIT_LESSON_PLAN}/${editLessonPlan?.pk_lesson_key}?is_homework=${type}&sessionId=${locationParams?.sessionId}&studentId=${locationParams?.studentId}&subjectId=${subjectId}&yearId=${yearId}&typePlan=${locationParams?.typePlan}&selectedTab=${locationParams?.selectedTab}`;
    const url = `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${id}`;
    const studentData = {
      studentID: locationParams?.studentId,
      subjectID: +subjectId,
      redirectUrl: fullUrl,
      manual: true,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
    };

    Cookies.setStudent(cookieKeys.STUDENT_DATA, JSON.stringify(studentData));
    // console.log({ studentData, url });
    window.open(url, "_self");
  };
  const getDisabledStatus = () => {
    if (
      (+editLessonPlan?.tbl_session?.ses_is_completed && type === 0) ||
      !editLessonPlan?.pk_lesson_key
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div
      className={
        +type === 0 && +editLessonPlan?.tbl_session?.ses_is_completed === 1
          ? classNames(styles.editLessonPlanContentItem, "pe-none")
          : styles.editLessonPlanContentItem
      }
    >
      <div className={styles.editLessonPlanContentItemHeader}>
        <label className={styles.editLessonPlanContentItemHeaderLabel}>
          {title}
        </label>
        <span>Message from tutor</span>

        <textarea
          // disabled={editLessonPlan?.pk_lesson_key ? false : true}
          disabled={getDisabledStatus()}
          value={type === 0 ? data?.lesson_desc : data?.homework_desc}
          cols={3}
          onChange={e => handleChange(e)}
        >
          {type === 0 ? data?.lesson_desc : data?.homework_desc}
        </textarea>
        <div className={styles.editLessonPlanSessionDetailsLeftSection}>
          <div className={styles.editLessonPlanSessionDetailsCont}>
            <img alt="coin-icon" src={coin} />
            <label>
              {lesson_activity?.length === 0
                ? "-"
                : getExpectedCoinsForLesson(lesson_activity) > 0
                ? `${
                    type && editLessonPlan?.homework_coins_earned
                      ? editLessonPlan?.homework_coins_earned
                      : !type && editLessonPlan?.lesson_coins_earned
                      ? editLessonPlan?.lesson_coins_earned
                      : 0
                  }/${getExpectedCoinsForLesson(lesson_activity)}`
                : 0}
            </label>
          </div>
          <div className={styles.editLessonPlanSessionDetailsCont}>
            <img alt="clock-icon" src={Clock} />
            <label>
              {type
                ? editLessonPlan?.totalHomeworkDuration
                  ? getDuration(editLessonPlan?.totalHomeworkDuration)
                  : "-"
                : editLessonPlan?.totalLessonDuration
                ? getDuration(editLessonPlan?.totalLessonDuration)
                : "-"}
            </label>
          </div>
        </div>
        <div className={styles.editLessonPlanSessionDetailsLeftSection}>
          <div className={styles.editLessonPlanSessionDetailsSection1}>
            <label id={styles.sessionNameOverFlowStyle}>
              {editLessonPlan?.tbl_session?.tbl_session_time?.sest_name}
            </label>
            <p>{editLessonPlan?.tbl_session?.tbl_session_time?.sest_type}</p>
          </div>
          <div className={styles.editLessonPlanSessionDetailsSection2}>
            <span id={styles.dateData}>
              {editLessonPlan?.tbl_session?.ses_date
                ? moment(editLessonPlan?.tbl_session?.ses_date).format(
                    "DD MMM YYYY",
                  )
                : ""}{" "}
              (
              {editLessonPlan?.tbl_session?.tbl_session_time?.sest_day
                ? getSubStr(
                    editLessonPlan?.tbl_session?.tbl_session_time?.sest_day,
                  )
                : "-"}
              )
            </span>

            <p>
              {editLessonPlan?.tbl_session?.tbl_session_time?.sest_start_time
                ? getTime(
                    editLessonPlan?.tbl_session?.tbl_session_time
                      ?.sest_start_time,
                  )
                : ""}{" "}
              -{" "}
              {editLessonPlan?.tbl_session?.tbl_session_time?.sest_end_time
                ? getTime(
                    editLessonPlan?.tbl_session?.tbl_session_time
                      ?.sest_end_time,
                  )
                : ""}{" "}
              (
              {editLessonPlan?.tbl_session?.tbl_session_time?.sest_start_time &&
              editLessonPlan?.tbl_session?.tbl_session_time?.sest_end_time
                ? getHourMinis(
                    editLessonPlan?.tbl_session?.tbl_session_time
                      ?.sest_start_time,
                    editLessonPlan?.tbl_session?.tbl_session_time
                      ?.sest_end_time,
                  )
                : "-"}
              )
            </p>
          </div>
        </div>
        <div className={styles.editLessonPlanContentItemCont}>
          <div className={styles.editLessonPlanSequentialSection}>
            {type === 0 ? (
              data?.lesson_sequential ? (
                <img alt="sequential-icon" src={SequentialIcon} />
              ) : (
                <img alt="random-icon" src={RandomizeIcon} />
              )
            ) : data?.homework_sequential ? (
              <img alt="sequential-icon" src={SequentialIcon} />
            ) : (
              <img alt="random-icon" src={RandomizeIcon} />
            )}

            <label>
              {type === 0
                ? data?.lesson_sequential
                  ? "Sequential"
                  : "Random"
                : data?.homework_sequential
                ? "Sequential"
                : "Random"}
            </label>

            <Switch
              disabled={getDisabledStatus()}
              height={15}
              width={30}
              onColor="#4D4D4D"
              onChange={() => {
                handleToggleChange();
              }}
              checked={
                type === 0 ? data?.lesson_sequential : data?.homework_sequential
              }
            />
          </div>
          <div className={styles.addActivityButton} onClick={redirectHandler}>
            <label>Add New Activity</label>
          </div>
          <div className={styles.editLessonPlanSessionDetailsLeftSection}>
            <div className={styles.editLessonPlanSessionDetailsCont}>
              <img alt="coin-icon" src={coin} />
              <label>
                {" "}
                {lesson_activity?.length === 0
                  ? "-"
                  : getExpectedCoinsForLesson(lesson_activity) > 0
                  ? `
                  ${
                    type && editLessonPlan?.homework_coins_earned
                      ? editLessonPlan?.homework_coins_earned
                      : !type && editLessonPlan?.lesson_coins_earned
                      ? editLessonPlan?.lesson_coins_earned
                      : 0
                  }/${getExpectedCoinsForLesson(lesson_activity)}`
                  : 0}
              </label>
            </div>
            <div className={styles.editLessonPlanSessionDetailsCont}>
              <img alt="clock-icon" src={Clock} />
              <label>
                {type
                  ? editLessonPlan?.totalHomeworkDuration
                    ? getDuration(editLessonPlan?.totalHomeworkDuration)
                    : "-"
                  : editLessonPlan?.totalLessonDuration
                  ? getDuration(editLessonPlan?.totalLessonDuration)
                  : "-"}
              </label>
            </div>
          </div>

          {!type ? (
            data?.lesson_sequential ? (
              // ? data?.lesson_sequential
              // : editLessonPlan?.is_lesson_sequential
              editLessonPlan?.LessonActivities?.filter(
                i => !i?.marked_for_homework,
              )?.map((item, i) => {
                return (
                  <ActivityCard
                    lesson_key={editLessonPlan?.pk_lesson_key}
                    subject_id={+item?.fk_sub_id}
                    key={i}
                    type={3}
                    values={item}
                    redirectHandler={redirectHandler}
                    handleActivityDelete={handleActivityDelete}
                    sessionID={locationParams?.sessionId}
                    studentID={locationParams?.studentId}
                    setActivityType={setActivityType}
                    activityType={activityType}
                    getValues={getValues}
                    handlePreview={
                      () => {
                        handlePreview(
                          item?.pk_lesson_activity_key,
                          item?.activity_type,
                          +item?.fk_sub_id,
                        );
                      }

                      // console.log({ item })
                    }
                    handleRepeat={handleRepeat}
                    handleMarkView={() =>
                      handleMarkView(
                        item?.pk_lesson_activity_key,
                        item?.activity_type,
                        +item?.fk_sub_id,
                      )
                    }
                  />
                );
              })
            ) : (
              <ActivityComponent
                child={
                  <ReactDnd
                    dispatch={dispatch}
                    lesson_key={editLessonPlan?.pk_lesson_key}
                    key={`ii-${editLessonPlan}`}
                    subject_id={locationParams?.subjectId}
                    // subject_id={+item?.fk_sub_id}
                    redirectHandler={redirectHandler}
                    handleActivityDelete={handleActivityDelete}
                    activity_list={
                      editLessonPlan
                        ? editLessonPlan?.LessonActivities?.filter(
                            i => !i?.marked_for_homework,
                          )
                        : []
                    }
                    sessionID={locationParams?.sessionId}
                    studentID={locationParams?.studentId}
                    setActivityType={setActivityType}
                    activityType={activityType}
                    getValues={getValues}
                    handlePreview={(
                      pk_lesson_activity_key,
                      activityType,
                      subject_id,
                    ) =>
                      handlePreview(
                        pk_lesson_activity_key,
                        activityType,
                        subject_id,
                      )
                    }
                    handleRepeat={handleRepeat}
                    handleMarkView={handleMarkView}
                  />
                }
              />
            )
          ) : data?.homework_sequential ? (
            // ? data?.homework_sequential
            // : editLessonPlan?.is_homework_sequential
            editLessonPlan?.LessonActivities?.filter(
              i => i?.marked_for_homework,
            )?.map((item, i) => {
              return (
                <ActivityCard
                  lesson_key={editLessonPlan?.pk_lesson_key}
                  subject_id={+item?.fk_sub_id}
                  key={i}
                  type={3}
                  values={item}
                  redirectHandler={redirectHandler}
                  setActivityType={setActivityType}
                  activityType={activityType}
                  handleActivityDelete={handleActivityDelete}
                  sessionID={locationParams?.sessionId}
                  studentID={locationParams?.studentId}
                  getValues={getValues}
                  handlePreview={() => {
                    handlePreview(
                      item.pk_lesson_activity_key,
                      item?.activity_type,
                      +item?.fk_sub_id,
                    );
                  }}
                  handleRepeat={handleRepeat}
                  handleMarkView={() => {
                    handleMarkView(
                      item.pk_lesson_activity_key,
                      item?.activity_type,
                      +item?.fk_sub_id,
                    );
                  }}
                />
              );
            })
          ) : (
            <ActivityComponent
              child={
                <ReactDnd
                  dispatch={dispatch}
                  lesson_key={editLessonPlan?.pk_lesson_key}
                  key={`ii-${editLessonPlan}`}
                  subject_id={+locationParams?.subjectId}
                  redirectHandler={redirectHandler}
                  handleActivityDelete={handleActivityDelete}
                  activity_list={
                    editLessonPlan
                      ? editLessonPlan?.LessonActivities?.filter(
                          i => i?.marked_for_homework,
                        )
                      : []
                  }
                  sessionID={locationParams?.sessionId}
                  studentID={locationParams?.studentId}
                  setActivityType={setActivityType}
                  activityType={activityType}
                  getValues={getValues}
                  handlePreview={(activity_node_id, activityType, subject_id) =>
                    handlePreview(activity_node_id, activityType, subject_id)
                  }
                  handleRepeat={handleRepeat}
                  handleMarkView={handleMarkView}
                />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default EditPlan;

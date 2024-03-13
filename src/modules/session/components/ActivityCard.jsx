import {
  ActivityIcon,
  AlertTriangle,
  Clock,
  Draggable,
  coin,
} from "constants/images";
import styles from "./ActivityCard.module.scss";
import OverlayExample from "./OverlayExample";
import { getDuration } from "modules/session/utils/getDuration";
import { handleQuestionObject } from "../utils/handleQuestionObject";
import { getActivityType } from "../utils/getActivityType";
import { getOverlayData } from "../utils/getOverlayData";
import { handleActivityStatus } from "../utils/handleActivityStatus";
import { getQuestionStatus } from "../utils/getQuestionStatus";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addUpdateActivity,
  getNextActivity,
  handleRemoveSuggestedActivity,
} from "../features/sessionSlice";
import NextActivityCard from "./NextActivityCard";
import { toast } from "react-toastify";
import getExpectedCoinsForActivity from "../utils/getExpectedCoinsForActivity";
import { handleQuestionPart } from "../utils/handleQuestionPart";
import { getQuestionPartStatus } from "../utils/getQuestionPartStatus";
import { Fragment } from "react";
const ActivityCard = ({
  values,
  type,
  draggable,
  subject_id,
  lesson_key,
  handleActivityDelete,
  redirectHandler,
  sessionID = "",
  studentID = "",
  setActivityType,
  activityType,
  getValues,
  handlePreview,
  handleRepeat,
  handleMarkView,
}) => {
  const dispatch = useDispatch();
  const { lessonPlan, nextActivityData, editLessonPlan, previousPlan } =
    useSelector(state => state.session);

  let m = 0;
  const setManualMark = () => {
    m = 1;
  };

  const handleGetNextActivity = () => {
    const isAssessment = values?.activity_type === 0 ? true : false;
    const payload = {
      session_id: sessionID,
      student_id: studentID,
      subject_id: +subject_id,
      activity_type: values?.activity_type,
      is_homework: values?.marked_for_homework,
      activity_node_id: isAssessment
        ? values?.activity_node?.activity_node_id
        : values?.library_item?.pk_tutor_library_item_id,
      activity_topic_id: isAssessment
        ? values?.activity_node?.activityLevelHasTopicNode?.topic_id
        : values?.library_item?.activity_master_topic?.activity_topic_id,
      sort_order: values?.sort_order,
    };
    dispatch(getNextActivity(payload)).then(res => {
      if (
        +values?.activity_type === 0 &&
        res?.payload?.data?.TopicActivities?.length === 0
      ) {
        toast.warning("No, Activity suggestions for this activity");
      } else if (
        +values?.activity_type !== 0 &&
        res?.payload?.data?.TutorLibraryItems?.length === 0
      ) {
        toast.warning("No, Activity suggestions for this activity");
      } else {
        setActivityType({
          type: values?.activity_type,
          // activityId:
          //   +values?.activity_type === 0
          //     ? values?.activity_node?.activity_node_id
          //     : values?.library_item?.pk_tutor_library_item_id,
          activityId: values?.pk_lesson_activity_key,
          is_homework: values?.marked_for_homework,
        });
      }
    });
  };
  const handleAddNextActivity = (data, type) => {
    const isAssessment = type === 0 ? true : false;
    const activityDetails = [
      {
        activity_node_id: isAssessment
          ? data?.activity_node_id
          : data?.pk_tutor_library_item_id,
        type: activityType?.type, // Type of activity
        topic_id: isAssessment
          ? data?.activity_level_has_topic_node?.topic_id
          : data?.fk_activity_topic_id, //parent topic id
        // pk_lesson_activity_key: x?.pk_lesson_activity_key
        // ? x?.pk_lesson_activity_key
        // : "",
        subject_id: +subject_id,
        is_homework: activityType?.is_homework,
      },
    ];

    const payload = {
      subject_id: +subject_id,
      student_key: studentID,
      session_key: sessionID,
      lesson_key: editLessonPlan?.pk_lesson_key,
      activities: activityDetails,
      is_homework: activityType?.is_homework,
    };
    dispatch(addUpdateActivity(payload)).then(res => {
      if (res?.payload?.statusCode === 200) {
        getValues();
        handleRemoveActivity();
        toast.success("Activities Added successfully...");
      }
    });
  };

  const handleRemoveActivity = () => {
    setActivityType({
      type: "",
      is_homework: "",
      activityId: "",
    });
    dispatch(handleRemoveSuggestedActivity());
  };
  const handleQuestionStatus = (item, i) => {
    if (
      (values?.activity_type === 5 || values?.activity_type === 7) &&
      item?.marked_for_manual_marking === 0
    ) {
      return <span className={styles.markManualWhite}>M</span>;
    } else if (
      values?.activity_type === 0 &&
      +subject_id === 1 &&
      item?.english_question?.english_question_parts?.length > 0 &&
      item?.english_question?.english_question_parts.some(
        x => x?.english_question_part_automark === 0,
      ) &&
      item?.marked_for_manual_marking === 0
    ) {
      setManualMark();
      return <span className={styles.markManual}>M</span>;
    } else if (
      item?.[handleQuestionObject(+subject_id)]?.StudentAnsAttempts?.length >
        0 &&
      values?.activity_type !== 0
    ) {
      return (
        <img alt="" src={getQuestionStatus(item, +subject_id, values).img} />
      );
    } else if (
      item?.[handleQuestionObject(+subject_id)]?.[
        handleQuestionPart(+subject_id)
      ]?.flatMap(x => x?.StudentAnsAttempts)?.length > 0 &&
      values?.activity_type === 0
    ) {
      return (
        <img
          alt=""
          src={getQuestionPartStatus(item, +subject_id, values).img}
        />
      );
    } else {
      return <label style={{ color: "#ffffff" }}>{i + 1}</label>;
    }
  };

  const handleActivityName = () => {
    if (+values?.activity_type === 0) {
      return values?.activity_node?.node_name;
    } else if (+values?.activity_type === 2) {
      return values?.topics?.map((item, index) => {
        if (index === 0) {
          return item;
        } else {
          return "/" + item;
        }
      });
    } else if (+values?.activity_type === 6) {
      return values?.activity_node?.video_name;
    } else if (+values?.activity_type === 7) {
      return values?.workSheet?.activity_node?.node_name;
    } else {
      return values?.library_item?.name;
    }
  };

  return (
    <>
      <div
        key={values?.id}
        className={styles.sessionDetailsActivityCardMainContainer}
      >
        <div className={styles.sessionDetailsActivityCardTitle}>
          <div className={styles.sessionDetailsActivityCardTitleSec}>
            {handleActivityStatus(values, +subject_id, lessonPlan)}

            <div>
              {draggable && <img src={Draggable} alt="" />}
              <label className={styles.activityCardTitleLabel}>
                {handleActivityName()}
              </label>
            </div>
          </div>
        </div>
        <div className={styles.sessionDetailsActivityCardActCont}>
          <div className={styles.sessionDetailsActivityCardActContItem}>
            <img src={ActivityIcon} alt="" />
            <label className={styles.activityCardTypeLabel}>
              {getActivityType(values?.activity_type)}
            </label>
          </div>

          <OverlayExample
            activity_type={values?.activity_type}
            handleActivityDelete={handleActivityDelete}
            // lesson_key={editLessonPlan?.pk_lesson_key}
            lesson_key={lesson_key}
            key={values?.id}
            activity_key={values?.pk_lesson_activity_key}
            redirectHandler={handleGetNextActivity}
            data={getOverlayData(
              type,
              values?.status,
              values?.LessonActivityQuestions,
              subject_id,
              values?.activity_type,
              lessonPlan,
              editLessonPlan,
              previousPlan,
              values,
            )}
            handlePreview={handlePreview}
            handleRepeat={() => {
              handleRepeat(values);
            }}
            handleMarkView={handleMarkView}
          />
        </div>
        <div className={styles.sessionDetailsActivityCardActCont}>
          <div className={styles.sessionDetailsActivityCardActContItem}>
            <img src={Clock} alt="" />
            <label className={styles.activityCardTypeLabel}>
              {values?.duration ? getDuration(values?.duration) : "."}
            </label>
          </div>
          <div className={styles.sessionDetailsActivityCardActContItem}>
            <img src={coin} alt="" />

            {getExpectedCoinsForActivity(values?.LessonActivityQuestions) >
            0 ? (
              <label className={styles.activityCardTypeLabel}>
                {values?.coins_earned ? values?.coins_earned : 0}/
                {getExpectedCoinsForActivity(values?.LessonActivityQuestions)}
              </label>
            ) : (
              <label className={styles.activityCardTypeLabel}>0</label>
            )}
          </div>
        </div>

        <div className={styles.sessionDetailsActivityCardQuestionSection}>
          {values?.LessonActivityQuestions?.map((item, i) => {
            return (
              <Fragment key={i}>
                {[0, 2].includes(values?.activity_type) ? (
                  <div
                    style={{
                      backgroundColor:
                        values?.activity_type === 0
                          ? getQuestionPartStatus(item, +subject_id, values)
                              .color
                          : getQuestionStatus(item, +subject_id, values).color,
                    }}
                    className={
                      styles.sessionDetailsActivityCardQuestionSectionItem
                    }
                  >
                    {handleQuestionStatus(item, i)}
                  </div>
                ) : null}
                {(values?.activity_type === 5 || values?.activity_type === 7) &&
                  item?.marked_for_manual_marking === 0 &&
                  setManualMark()}
              </Fragment>
            );
          })}
        </div>
        {m === 1 && (
          <div className={styles.activityCardManualMarkStatus}>
            <img src={AlertTriangle} alt="" />
            <label>Manual marking required</label>
          </div>
        )}
      </div>

      {nextActivityData &&
      activityType?.type === 0 &&
      activityType?.activityId === values?.pk_lesson_activity_key &&
      nextActivityData?.TopicActivities?.length > 0 ? (
        <NextActivityCard
          type={activityType?.type}
          items={nextActivityData?.TopicActivities}
          handleAddNextActivity={handleAddNextActivity}
          handlerRemove={handleRemoveActivity}
        />
      ) : [1, 2, 3, 4, 5, 7].includes(activityType?.type) &&
        activityType?.activityId === values?.pk_lesson_activity_key &&
        nextActivityData?.TutorLibraryItems?.length > 0 ? (
        <NextActivityCard
          type={activityType?.type}
          items={nextActivityData?.TutorLibraryItems}
          handlerRemove={handleRemoveActivity}
          handleAddNextActivity={handleAddNextActivity}
        />
      ) : null}
    </>
  );
};
export default ActivityCard;

import React, { Fragment, useMemo } from "react";
import styles from "./SessionCard.module.scss";
import { useSelector } from "react-redux";
import { getActivityStatus, getStatus } from "../utils/Functions";
import ReScheduleCardItem from "./SessionCard/ReScheduleCardItem";
const ReScheduleSessionCard = ({
  selectedTab,
  code,
  handleActivityDelete,
  handleToggleSessionOffline,
  isReschedule,
}) => {
  const lessonPlan = useSelector(state => state.session?.lessonPlan);
  // eslint-disable-next-line
  const student_details = useMemo(() =>
    lessonPlan?.tbl_session_time?.tbl_student_enrolments
      ? lessonPlan?.tbl_session_time?.tbl_student_enrolments
      : [],
  );

  return (
    <div className={styles.sessionCardMainContainer}>
      {student_details?.length > 0 && (
        <div className={styles.sessionCardList}>
          {student_details?.map((item, i) => {
            return (
              item?.tbl_student && (
                <Fragment key={i}>
                  <ReScheduleCardItem
                    nextSessionKey={item?.tbl_student?.next_session?.pk_ses_key}
                    handleActivityDelete={handleActivityDelete}
                    code={code}
                    selectedTab={selectedTab}
                    getStatus={getStatus}
                    getActivityStatus={getActivityStatus}
                    id={item?.pk_enrol_key}
                    lesson_key={item?.tbl_student?.Lesson?.pk_lesson_key}
                    userIcon={item?.tbl_student?.st_avatar}
                    name={item?.tbl_student?.st_first_name}
                    surname={item?.tbl_student?.st_surname}
                    duration={item?.totalDuration}
                    coins={
                      item?.tbl_student?.Lesson?.coins_earned
                        ? item?.tbl_student?.Lesson?.coins_earned
                        : 0
                    }
                    description={item?.tbl_student?.Lesson?.description}
                    homework_description={
                      item?.tbl_student?.Lesson?.homework_description
                    }
                    is_lesson_sequential={
                      item?.tbl_student?.Lesson?.is_lesson_sequential
                    }
                    attendance={item?.stu_status}
                    status={getStatus(
                      item?.tbl_student?.Lesson?.LessonActivities,
                    )}
                    activity_list={
                      item?.tbl_student?.Lesson?.LessonActivities
                        ? item?.tbl_student?.Lesson?.LessonActivities
                        : []
                    }
                    session_key={lessonPlan?.pk_ses_key}
                    student_key={item?.tbl_student?.pk_student_key}
                    subject_id={item?.tbl_enrolment_subjects?.map(
                      x => x?.fk_sub_id,
                    )}
                    subjectName={item?.tbl_enrolment_subjects?.map(
                      x => x?.subject_name,
                    )}
                    offlineStatus={
                      item?.tbl_student?.tbl_session_attendances?.length > 0 &&
                      item?.tbl_student?.tbl_session_attendances[0]
                        ?.attendance_status
                    }
                    handleToggleSessionOffline={type =>
                      handleToggleSessionOffline(
                        type,
                        lessonPlan?.pk_ses_key,
                        item?.tbl_student?.pk_student_key,
                      )
                    }
                    isReschedule={isReschedule}
                  />
                </Fragment>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ReScheduleSessionCard;

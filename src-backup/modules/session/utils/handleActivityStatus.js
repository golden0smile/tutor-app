import styles from "../components/ActivityCard.module.scss";
import { handleQuestionObject } from "./handleQuestionObject";
import { handleQuestionPart } from "./handleQuestionPart";
export const handleActivityStatus = (values, subject_id, lessonPlan) => {
  let attempt_count =
    +values?.activity_type === 0
      ? values?.LessonActivityQuestions?.filter(
          item =>
            item?.[handleQuestionObject(+subject_id)]?.[
              handleQuestionPart(+subject_id)
            ]?.flatMap(x => x?.StudentAnsAttempts)?.length > 0,
        ).length
      : values?.LessonActivityQuestions?.filter(
          item =>
            item?.[handleQuestionObject(+subject_id)]?.StudentAnsAttempts
              ?.length > 0,
        ).length;

  if (+values?.status === 1) {
    // completed
    return <span id={styles.fullyCompleted}>Completed</span>;
  } else if (+values?.status === 2) {
    return <span id={styles.partiallyCompleted}>Skip</span>;
  } else if (
    attempt_count <= values?.LessonActivityQuestions?.length &&
    lessonPlan?.ses_is_completed
  ) {
    // incomplete
    return <span id={styles.notCompleted}>Incomplete</span>;
  } else if (attempt_count === 0) {
    // not started
    return <span></span>;
  } else if (
    attempt_count > 0 &&
    attempt_count < values?.LessonActivityQuestions?.length
  ) {
    // Currently working
    return <span id={styles.partiallyCompleted}>Currently working on</span>;
  }
};

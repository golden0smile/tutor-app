import { Close, Tick, yellow_checkmark } from "constants/images";
import { handleQuestionObject } from "./handleQuestionObject";
import { getCurrentQuestion } from "./getCurrentQuestion";
const colors = {
  DEFAULT: "#DAE7F2",
  CORRECT: "#D9F7ED",
  CURRENT: "#20365B",
  WRONG: "#FFDBDB",
  PARTIAL: "#D9F7ED",
};
export const getQuestionStatus = (item, subject_id, values) => {
  let attempt_count =
    item?.[handleQuestionObject(+subject_id)]?.StudentAnsAttempts?.length;
  let correct_ans_count = item?.[
    handleQuestionObject(+subject_id)
  ]?.StudentAnsAttempts?.filter(item1 => item1.attempt_status)?.length;
  let currentQuestion = getCurrentQuestion(
    values?.LessonActivityQuestions,
    +subject_id,
    values?.activity_type,
  );

  let givenQuestion =
    values?.activity_type === 2
      ? item?.pk_lesson_activity_question_key
      : subject_id === 1
      ? item?.[handleQuestionObject(+subject_id)]?.english_question_id
      : item?.[handleQuestionObject(+subject_id)]?.question_id;

  let status1 = "";
  let bg = colors.DEFAULT;
  if (
    (values?.activity_type === 5 || values?.activity_type === 7) &&
    item?.marked_for_manual_marking === 0
  ) {
    bg = colors.DEFAULT;
  } else if (attempt_count === 1 && attempt_count === correct_ans_count) {
    status1 = Tick;
    bg = colors.CORRECT;
  } else if (correct_ans_count === 0 && attempt_count >= 1) {
    status1 = Close;
    bg = colors.WRONG;
  } else if (attempt_count > 1 && correct_ans_count > 0) {
    status1 = yellow_checkmark;
    bg = colors.PARTIAL;
  } else if (currentQuestion === givenQuestion) {
    bg = colors.CURRENT;
  } else {
    bg = colors.DEFAULT;
  }
  let res = {
    color: bg,
    img: status1,
  };
  return res;
};

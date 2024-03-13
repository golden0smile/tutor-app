import { Close, Tick, yellow_checkmark } from "constants/images";
import { handleQuestionObject } from "./handleQuestionObject";
import { handleQuestionPart } from "./handleQuestionPart";
import { getCurrentQuestionPart } from "./getCurrentQuestionPart";
const colors = {
  DEFAULT: "#DAE7F2",
  CORRECT: "#D9F7ED",
  CURRENT: "#20365B",
  WRONG: "#FFDBDB",
  PARTIAL: "#D9F7ED",
};
// #dae7f2
export const getQuestionPartStatus = (item, subject_id, values) => {
  let attempt_count = item?.[handleQuestionObject(subject_id)]?.[
    handleQuestionPart(subject_id)
  ]?.flatMap(x => x?.StudentAnsAttempts)?.length;
  let correct_ans_count = item?.[handleQuestionObject(subject_id)]?.[
    handleQuestionPart(subject_id)
  ]?.flatMap(x =>
    x.StudentAnsAttempts?.filter(item1 => item1.attempt_status),
  )?.length;
  let currentQuestion = getCurrentQuestionPart(
    values?.LessonActivityQuestions,
    subject_id,
    true,
  );

  let givenQuestion = item?.[handleQuestionObject(+subject_id)]?.[
    handleQuestionPart(+subject_id)
  ]?.map(x =>
    +subject_id === 1
      ? x?.english_question_part_id
      : +subject_id === 2 || +subject_id === 3
      ? x?.part_id
      : [],
  );

  let status1 = "";

  let bg = colors.DEFAULT;
  if (
    (values?.activity_type === 5 || values?.activity_type === 7) &&
    item?.marked_for_manual_marking === 0
  ) {
    bg = colors.DEFAULT;
  } else if (
    values?.activity_type === 0 &&
    +subject_id === 1 &&
    item?.english_question?.english_question_parts?.length > 0 &&
    item?.english_question?.english_question_parts.some(
      x => x?.english_question_part_automark === 0,
    ) &&
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
  } else if (
    givenQuestion?.length > 0 &&
    givenQuestion?.includes(currentQuestion)
  ) {
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

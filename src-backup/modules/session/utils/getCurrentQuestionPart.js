import { handleQuestionObject } from "./handleQuestionObject";
import { handleQuestionPart } from "./handleQuestionPart";

export const getCurrentQuestionPart = (
  item1,
  subject_id,
  isAssessment = false,
) => {
  let array = item1?.filter(
    item =>
      item?.[handleQuestionObject(subject_id)]?.[
        handleQuestionPart(subject_id)
      ]?.flatMap(x => x?.StudentAnsAttempts)?.length === 0,
  );

  let question_id = 0;
  array?.length === 0
    ? (question_id = 0)
    : array?.length < item1?.length &&
      (question_id = array[0]?.[handleQuestionObject(subject_id)]?.[
        handleQuestionPart(subject_id)
      ]?.map(x =>
        +subject_id === 1
          ? x?.english_question_part_id
          : +subject_id === 2 || +subject_id === 3
          ? x?.part_id
          : null,
      ));
  // console.log(
  //   "new",
  //   array,
  //   item1,
  //   array?.length < item1?.length ? array[0] : "not",
  // );
  return question_id[0];
};

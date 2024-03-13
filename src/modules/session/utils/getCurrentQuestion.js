import { handleQuestionObject } from "./handleQuestionObject";

export const getCurrentQuestion = (item1, subject_id, type) => {
  let array = item1?.filter(item =>
    type === 2
      ? item?.[handleQuestionObject(item?.fk_sub_id)]?.StudentAnsAttempts
          ?.length === 0
      : item?.[handleQuestionObject(subject_id)]?.StudentAnsAttempts?.length ===
        0,
  );
  let question_id = 0;
  array?.length === 0
    ? (question_id = 0)
    : array?.length < item1?.length &&
      (question_id =
        type === 2
          ? array[0]?.pk_lesson_activity_question_key
          : subject_id === 1
          ? array[0]?.[handleQuestionObject(+subject_id)]?.english_question_id
          : array[0]?.[handleQuestionObject(+subject_id)]?.question_id);
  return question_id;
};

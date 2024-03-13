import { handleQuestionObject } from "./handleQuestionObject";

export const getCountOfCompletedQuestions = (questions, subject_id) => {
  // let totalQuestions = questions?.length;
  let attemptedQuestions = questions?.filter(
    item =>
      item?.[handleQuestionObject(subject_id)]?.StudentAnsAttempts?.length > 0,
  ).length;
  return attemptedQuestions;
};

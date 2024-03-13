import { subjectIdArray } from "../constants/Data";

export const handleQuestionObject = subjectId => {
  let obj = subjectIdArray?.filter(i => i.id === +subjectId);
  return `${obj[0]?.object}`;
};

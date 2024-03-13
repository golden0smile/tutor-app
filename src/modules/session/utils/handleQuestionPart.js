import { subjectPartArray } from "../constants/Data";

export const handleQuestionPart = subjectId => {
  let obj = subjectPartArray?.filter(i => i.id === +subjectId);
  return `${obj[0]?.object}`;
};

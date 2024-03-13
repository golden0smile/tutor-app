import { subjectName } from "constants/CustomTableConstant";

export const getSubjectName = id => {
  if (id) {
    if (+id === 1) {
      return subjectName.ENGLISH;
    } else if (+id === 2) {
      return subjectName.MATHS;
    } else {
      return "_";
    }
  }
};

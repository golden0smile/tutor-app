import { subjectName } from "constants/CustomTableConstant";

const getUniqueSubjectName = (arr = []) => {
  const newArray = [];
  arr.forEach(e => {
    e?.tbl_enrolment_subjects?.forEach(s => {
      newArray.push(
        +s?.fk_sub_id === 1
          ? subjectName.ENGLISH
          : +s?.fk_sub_id === 2
          ? subjectName.MATHS
          : "",
      );
    });
  });
  // arr.forEach(e => {
  //   e?.tbl_enrolment_subjects?.forEach(s => {
  //     newArray.push(s?.subject_name);
  //   });
  // });

  const str = [...new Set(newArray)].sort().join(" & ");

  return str;
};

export default getUniqueSubjectName;

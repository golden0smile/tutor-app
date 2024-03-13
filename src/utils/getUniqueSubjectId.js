const getUniqueSubjectId = (arr = []) => {
  const newArray = [];
  arr.forEach(e => {
    e?.tbl_enrolment_subjects?.forEach(s => {
      if (![1, 2].includes(+s?.fk_sub_id)) {
        newArray.push(s?.subject_name);
      }
    });
  });
  const str = [...new Set(newArray)].sort();
  return str;
};

export default getUniqueSubjectId;

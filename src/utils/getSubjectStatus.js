const getSubjectStatus = subjectId => {
  if (Array.isArray(subjectId)) {
    if (subjectId?.includes(1) || subjectId?.includes(2)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export default getSubjectStatus;

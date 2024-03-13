const attendanceStatus = {
  SCHEDULED: "SCHEDULED",
  ONGOING: "ONGOING",
  ATTENDED: "ATTENDED",
  MISSED: "MISSED",
  OFFLINE: "OFFLINE",
  DEFER: "DEFER",
};

export const getAttendanceStatus = status => {
  if (+status === 0) {
    return attendanceStatus.SCHEDULED;
  } else if (+status === 1) {
    return attendanceStatus.ONGOING;
  } else if (+status === 2) {
    return attendanceStatus.ATTENDED;
  } else if (+status === 3) {
    return attendanceStatus.MISSED;
  } else if (+status === 4) {
    return attendanceStatus.OFFLINE;
  } else if (+status === 5) {
    return attendanceStatus.DEFER;
  }
};

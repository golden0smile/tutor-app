import moment from "moment";

export const getHourMinis = (startTime, endTime) => {
  if (startTime && endTime) {
    let momentOne = moment(startTime, "hh:mm");
    let momentTwo = moment(endTime, "hh:mm");
    let duration = moment.duration(momentTwo.diff(momentOne)).asMinutes();
    if (duration < 0) {
      return null;
    }
    return `${Math.floor(duration)} mins`;
  } else {
    return null;
  }
};

import moment from "moment";
import { handleTimeFormate } from "./handleTimeFormate";

export const getTime = time => {
  let t = moment(time, "hh:mm A");
  return handleTimeFormate(t);
};
//  const getDurationTime = (time, duration) => {
//   let time1 = moment(time, "hh:mm A");
//   return handleTimeFormate(time1.add(duration, "minutes"));
// };

export const getSubStr = str => {
  let temp = str?.slice(0, 3);
  return temp;
};
const getTotalActivities = item => {
  let totalActivities = item?.length;
  // console.log(item?.map(item => item?.status));
  return totalActivities;
};
const getCompletedActivities = item => {
  // console.log(item?.filter(item => item?.status));
  let completedActivities = item?.filter(item => item?.status)?.length;
  return completedActivities;
};
const getHomeworkActivities = item => {
  let homework = item?.filter(item => item?.marked_for_homework)?.length;
  return homework;
};
export const getActivityStatus = (item, type, isSessionStart) => {
  let totalActivities = getTotalActivities(item);
  let completedActivities = getCompletedActivities(item);
  let homework = getHomeworkActivities(item);
  let count = `${completedActivities}/${totalActivities}`;
  let countPercent = ((completedActivities / totalActivities) * 100).toFixed(0);

  let status = "";
  if (totalActivities > 0) {
    if (totalActivities === homework && !type) {
      status = "Offline lesson";
    } else if (totalActivities === completedActivities) {
      status = "All activities completed (100%)";
    } else if (isSessionStart === 0) {
      status = `${totalActivities} activities planned`;
    } else {
      status = `${count} activities completed (${countPercent}%)`;
    }
  } else {
    status = "No activities assigned";
  }
  return status;
};
export const getStatus = item => {
  let totalActivities = getTotalActivities(item);
  let completedActivities = getCompletedActivities(item);
  // let homework = getHomeworkActivities(item);
  let status =
    totalActivities > 0
      ? totalActivities === completedActivities
        ? 1
        : -2
      : 0;

  return status;
};

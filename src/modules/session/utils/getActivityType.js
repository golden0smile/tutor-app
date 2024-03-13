import { activityType } from "../Activity/constants/ActivityConstants";

export const getActivityType = type => {
  if (type === 0) {
    return activityType.ASSESSMENT;
  } else if (type === 1 || type === 6) {
    return activityType.VIDEO;
  } else if (type === 2) {
    return activityType.DIAGNOSTIC;
  } else if (type === 3) {
    return activityType.LINK;
  } else if (type === 4) {
    return activityType.TASK;
  } else if (type === 5 || type === 7) {
    return activityType.WORKSHEET;
  }
};

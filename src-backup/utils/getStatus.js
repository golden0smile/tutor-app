import { statusName } from "constants/CustomTableConstant";

export const getStatus = status => {
  if (+status === 1) return statusName.UPCOMING;
  else if (+status === 2) return statusName.REASSIGNED;
  else if (status === 3) return statusName.ONGOING;
  else if (+status === 4) return statusName.COMPLETED;
  else return "";
};

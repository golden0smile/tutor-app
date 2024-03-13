const status = {
  UPCOMING: {
    status: "Upcoming",
    color: "#5B51FF",
  },
  REASSIGNED: {
    status: "Reassigned",
    color: "#4d4d4d",
  },
  COMPLETED: {
    code: 1,
    status: "Completed",
    color: "#65A30D",
  },
  PAST: {
    status: "Past",
    color: "#4d4d4d",
  },
  ONGOING: {
    status: "Ongoing",
    color: "#EA580C",
  },
};
const getSessionStatus = sessionData => {
  if (sessionData?.ses_reassigned) {
    //reassigned
    return status.REASSIGNED;
  } else if (sessionData?.ses_is_completed) {
    //completed
    return status.COMPLETED;
  } else if (sessionData?.ses_status) {
    //ongoing
    return status.ONGOING;
  } else if (!sessionData?.ses_status) {
    //upcoming
    return status.UPCOMING;
  }
};
export default getSessionStatus;

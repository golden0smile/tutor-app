import classNames from "classnames";
import styles from "./WeeklyCalendar.module.scss";

import React, { Fragment } from "react";
import { UncontrolledTooltip } from "reactstrap";

import routesConstants from "routes/routesConstants";
import { Link } from "react-router-dom";

import { dummyPhotoOne } from "constants/images";
import { statusName } from "constants/CustomTableConstant";

const ScheduledSession = ({ eventDetails, isDay = false }) => {
  const {
    duration,
    endTime,
    startTime,
    title,
    student,
    sessionId,
    id,
    isComplete,
    isReassigned,
    sessionType,
    subjectName,
    subjectIds,
    status,
    isDefer,
  } = eventDetails;
  const rescheduleState = {
    isReschedule: isDefer,
  };

  const getStatus = () => {
    if (isComplete === 1) {
      return statusName.COMPLETED;
    } else if (isReassigned === 1) {
      return statusName.REASSIGNED;
    } else if (status === 0) {
      return statusName.UPCOMING;
    } else if (status === 1) {
      return statusName.ONGOING;
    }
  };

  return (
    <div className={styles.dateInfoContainer} key={id + "sessionCard"}>
      <Link
        to={"/" + routesConstants.SESSION_PAGE + "/" + sessionId}
        className={styles.moreLink}
        state={rescheduleState}
      >
        <div className={styles.inner}>
          <div className="d-flex flex-column">
            {!isDay && (
              <div className="d-flex justify-content-between">
                <p className={classNames(styles.pTime)}>
                  {startTime} - {endTime}
                </p>
                <p className={classNames(styles.pTime)}> {duration} </p>
              </div>
            )}
            <p className={classNames(styles.sessionName)} id={"session" + id}>
              {title}
            </p>
            <UncontrolledTooltip placement={"bottom"} target={"session" + id}>
              {title}
            </UncontrolledTooltip>
            <p className={classNames(styles.pSubject)}>
              {sessionType} • {subjectName}
            </p>
          </div>
          {student?.length > 0 ? (
            <hr className={classNames(styles.lineHr)} />
          ) : null}
          <div className={classNames(styles.mainStudentName)}>
            {student?.map((x, index) => (
              <Fragment key={index}>
                {x?.tbl_student ? (
                  <div className={styles.inner} key={index}>
                    <img
                      src={dummyPhotoOne}
                      alt="dummyPhoto"
                      width="15px"
                      height="15px"
                    />
                    <p className={classNames(styles.studentName)}>
                      {x.tbl_student?.st_first_name}{" "}
                    </p>
                  </div>
                ) : null}
                {subjectIds?.length > 0 ? (
                  <p className={styles.otherSubject}>{subjectIds}</p>
                ) : +x.tbl_student?.TotalActivities === 0 ? (
                  [6].includes(
                    x?.tbl_student?.tbl_session_attendances?.[0]
                      ?.attendance_status,
                  ) ? (
                    <p className={styles.noActivity}>Defer</p>
                  ) : (
                    <p className={styles.noActivity}>No activities assigned</p>
                  )
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
        <button
          className={classNames(
            styles.buttonWeeklyCalendar,
            getStatus() === "Completed"
              ? styles.completed
              : getStatus() === "Ongoing"
              ? styles.onGoing
              : getStatus() === "Upcoming"
              ? styles.upcoming
              : styles.reAssigned,
          )}
        >
          {" "}
          {getStatus()}
        </button>
      </Link>
    </div>
  );
};

export default ScheduledSession;

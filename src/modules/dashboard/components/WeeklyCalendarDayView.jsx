import React, { useState, useMemo } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import styles from "./WeeklyCalendar.module.scss";
import { useSelector } from "react-redux";
import { getHourMinis } from "../utils/getHourMinis";
import CustomWeeklyHeaderDayView from "./CustomWeeklyHeaderDayView";
import DayViewComponent from "./DayViewComponent";
import getUniqueSubjectName from "utils/getUniqueSubjectName";
import getUniqueSubjectId from "utils/getUniqueSubjectId";

const WeeklyCalendarDayView = ({ defaultDate, setDefaultDate }) => {
  const SessionDetails = useSelector(state => state.session?.SessionDetails);
  const isLoading = useSelector(state => state.session?.isLoading);

  //for not display single day events;
  const [week, setWeekNumber] = useState(1);
  moment.locale("ko", {
    week: {
      dow: week,
    },
  });

  const handleDataFromChild = (data, value) => {
    setDefaultDate(moment(data).format());
    const dayOfWeek = new Date(data).getDay();
    setWeekNumber(dayOfWeek);
  };

  const handleTimeFormate = (dateTime, isEndTime = false, Duration) => {
    const date = dateTime;
    let formatString = "ha";

    if (date.format("mm") === "00") {
      formatString = "ha";
    } else {
      formatString = "h:mma";
    }

    return dateTime.format(formatString);
  };

  //events Data
  const customEvents = useMemo(() => {
    const sessionList = SessionDetails?.sessions;
    return sessionList?.map(i => {
      const combinedSDateTime = `${i?.ses_date} ${i.ses_start_time}`;
      const startTime = moment(combinedSDateTime, "YYYY-MM-DD hh:mmA");
      const combinedEDateTime = `${i?.ses_date} ${i.ses_end_time}`;
      const endTime = moment(combinedEDateTime, "YYYY-MM-DD hh:mmA");
      const durationTime =
        i?.ses_start_time && i?.ses_end_time
          ? getHourMinis(i?.ses_start_time, i?.ses_end_time)
          : null;
      return {
        id: i.pk_ses_id,
        sessionId: i?.pk_ses_key,
        start: moment(startTime).toDate(),
        end: moment(endTime).toDate(),

        title: i?.tbl_session_time?.sest_name,
        duration: durationTime,
        student: i?.tbl_session_time?.tbl_student_enrolments,
        sessionDay: i?.tbl_session_time?.sest_day,
        isComplete: i?.ses_is_completed,
        isReassigned: i?.ses_reassigned,
        startTime: handleTimeFormate(startTime),
        endTime: handleTimeFormate(endTime),
        sessionType: i?.type,
        subjectName: getUniqueSubjectName(
          i?.tbl_session_time?.tbl_student_enrolments,
        ),
        subjectIds: getUniqueSubjectId(
          i?.tbl_session_time?.tbl_student_enrolments,
        ),
        status: i?.ses_status,
        isDefer: i?.is_reschedule,
      };
    });
  }, [SessionDetails]);

  return (
    <div
      style={{
        marginLeft: "0px",
        paddingLeft: "16px",
        paddingRight: "16px",
        position: "relative",
      }}
    >
      <CustomWeeklyHeaderDayView
        onDataSend={handleDataFromChild}
        initialDate={defaultDate}
        isDisable={isLoading}
      />

      <DayViewComponent event={customEvents} />

      <div></div>
      {isLoading ? (
        <div className={styles.loader_bg}>
          <div className={styles.loader} />
        </div>
      ) : null}
    </div>
  );
};

export default WeeklyCalendarDayView;

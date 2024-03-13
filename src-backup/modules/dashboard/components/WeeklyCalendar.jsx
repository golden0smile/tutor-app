import React, { useCallback, useState, useMemo, useEffect } from "react";
import CustomWeeklyHeader from "./CustomWeeklyHeader";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import classNames from "classnames";
import styles from "./WeeklyCalendar.module.scss";
import ScheduledSession from "./ScheduledSession";
import { useSelector } from "react-redux";
import { getHourMinis } from "../utils/getHourMinis";
import getUniqueSubjectName from "utils/getUniqueSubjectName";
import getUniqueSubjectId from "utils/getUniqueSubjectId";

const WeeklyCalendar = ({ defaultDate, setDefaultDate }) => {
  const localizer = momentLocalizer(moment);
  const { SessionDetails, isLoading } = useSelector(state => state.session);
  const [view, setView] = useState(Views.WEEK);
  const [customDate, setCustomDate] = useState([]);
  const onNavigate = useCallback(newDate => setCustomDate([]), [customDate]);

  //for not display single day events
  const onView = useCallback(() => setView(Views.WEEK), [setView]);
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
    setCustomDate([]);
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
    setCustomDate([]);
    return SessionDetails?.sessions?.map(i => {
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
        start: moment(i?.ses_date).toDate(),
        end: moment(i?.ses_date).toDate(),
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
      };
    });
  }, [SessionDetails]);

  const customMsg = () => {
    <div className="no-events-message">No session scheduled</div>;
  };
  useEffect(() => {
    setCustomDate([]);
  }, []);
  const formats = {
    dayFormat: (date, culture, localizer) => {
      // Check if the date is the first day of the month
      const isFirstDayOfMonth = moment(date).date() === 1;

      if (isFirstDayOfMonth) {
        // Apply custom format for the first day of the month
        return `${localizer.format(date, "D", culture)} ${localizer.format(
          date,
          "MMM",
          culture,
        )} ${localizer.format(date, "ddd", culture)}`;
      } else {
        // Use the default format for other dates
        return localizer.format(date, "D ddd", culture);
      }
    },
  };

  const CustomEvent = customEvents1 => {
    if (!customEvents1.event) {
      return <div>No sessions scheduled</div>; // Display "No Data" message if there are no events
    } else {
      let arr = customDate?.find(item =>
        moment(item).isSame(customEvents1?.event?.start, "day"),
      );
      let array = [];

      if (!arr || customDate?.length > 7) {
        customDate?.push(customEvents1?.event?.start);
        customEvents
          ?.filter((item, i) =>
            moment(item?.start).isSame(customEvents1?.event?.start, "day"),
          )
          ?.map((item1, k) => {
            array.push(item1);
          });
      }

      return array?.map((item, key) => {
        return <ScheduledSession key={key} eventDetails={item} />;
      });
    }
  };

  // Custom const to check if there are events for a given day
  const hasEventsForDay = day => {
    return customEvents?.some(
      event =>
        moment(day).isSame(event.start, "day") ||
        moment(day).isSame(event.end, "day"),
    );
  };

  // Custom const to render day contents
  const dayPropGetter = date => {
    const dayStyle = {
      paddingTop: "35px",
      paddingLeft: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
    };

    if (!hasEventsForDay(date)) {
      return {
        className: "no-events-wrapper",
        style: dayStyle,
        customElements: (
          <div className="no-events-message">No sessions scheduled</div>
        ),
      };
    }

    return {
      style: dayStyle,
    };
  };

  //header customization
  const handleCustomHeader = headerData => {
    const { label } = headerData;
    if (label.split(" ")?.length === 2) {
      const [dayNumber, day] = label.split(" ");
      return (
        <div className={styles.calender_day_title}>
          <span>{dayNumber}</span>
          <span>{day}</span>
        </div>
      );
    } else {
      const [dayNumber, month, day] = label.split(" ");
      return (
        <div className={styles.calender_day_title}>
          <span>
            {dayNumber} {month}
          </span>
          <span>{day}</span>
        </div>
      );
    }
  };
  const handleEventClick = event => {
    // navigate("/" + routesConstants.SESSION_PAGE + "/" + event.sessionId);
  };
  return (
    <div
      style={{
        marginLeft: "0px",
        paddingLeft: "16px",
        paddingRight: "16px",
        position: "relative",
      }}
    >
      <CustomWeeklyHeader
        onDataSend={handleDataFromChild}
        initialDate={defaultDate}
        isDisable={isLoading}
      />

      <Calendar
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        localizer={localizer}
        formats={formats}
        date={defaultDate}
        className={classNames(
          "removeTimeSlot removeTimeSlotLabel",
          styles.myCalendar,
        )}
        events={customEvents}
        components={{
          event: CustomEvent,
          customMsg: customMsg,
          header: handleCustomHeader,
        }}
        dayPropGetter={dayPropGetter}
        onSelectEvent={handleEventClick}
        tooltipAccessor={false}
      />
      <div></div>
      {isLoading ? (
        <div className={styles.loader_bg}>
          <div className={styles.loader} />
        </div>
      ) : null}
    </div>
  );
};

export default WeeklyCalendar;

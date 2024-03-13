import styles from "../components/CustomWeeklyHeader.module.scss";
import React, { useEffect, useState } from "react";
import moment from "moment";
import CardDashBoard from "../components/CardDashBoard";
import WeeklyCalendar from "../components/WeeklyCalendar";
import { useDispatch } from "react-redux";
import { getSessionCount } from "../features/homeSlice";
import WeeklyCalendarDayView from "../components/WeeklyCalendarDayView";
const DashBoardPage = () => {
  const dispatch = useDispatch();
  const [defaultDate, setDefaultDate] = useState(moment().format());
  const [isDay, setIsDay] = useState(0);
  const handleChange = nextChecked => {
    setIsDay(nextChecked ? 1 : 0);
  };

  useEffect(() => {
    dispatch(getSessionCount());
    localStorage.removeItem("sessionTabId");
    localStorage.removeItem("sessionData");
  }, [dispatch]);

  const ToggleForView = () => {
    return (
      <div
        className={`${styles.view_type_wrap} order-2 order-md-0 d-flex align-self-center`}
      >
        <div
          name="payment_mode_for_pre_registration"
          data-type="payment_mode_for_pre_registration"
          className={`${isDay == 1 ? styles.green_select : ""} ${styles.p4}`}
          onClick={() => {
            handleChange(1);
          }}
        >
          Day
        </div>
        <div
          name="payment_mode_for_pre_registration"
          data-type="payment_mode_for_pre_registration"
          className={`${isDay == 0 ? styles.green_select : ""} ${styles.p4}`}
          onClick={() => {
            handleChange(0);
          }}
        >
          Week
        </div>
      </div>
    );
  };
  return (
    <>
      <CardDashBoard />
      <div style={{ position: "relative" }}>
        {isDay ? (
          <WeeklyCalendarDayView
            defaultDate={defaultDate}
            setDefaultDate={setDefaultDate}
          />
        ) : (
          <WeeklyCalendar
            defaultDate={defaultDate}
            setDefaultDate={setDefaultDate}
          />
        )}
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <ToggleForView />
        </div>
      </div>
    </>
  );
};

export default DashBoardPage;

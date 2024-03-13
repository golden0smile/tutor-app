import classNames from "classnames";
import styles from "./CustomWeeklyHeader.module.scss";

import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import DashboardDatePicker from "../../../components/CommonDatePicker/index";
import useOutsideClick from "hooks/useOutsideClick";
import { getSessionAllDetail } from "modules/session/features/sessionSlice";
import { calendarIconNew } from "constants/images";

const CustomWeeklyHeader = props => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [applyWeekOff, setApplyWeekOff] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);
  useOutsideClick(modalRef, handleClose);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const sendDataToParent = buttonCondition => {
    if (buttonCondition === "next") {
      const nextDate = moment(endDate).add(1, "days").format();
      setStartDate(nextDate);
      props.onDataSend(nextDate);
    } else {
      const prevDate = moment(startDate).subtract(7, "days").format();
      setStartDate(prevDate);
      props.onDataSend(prevDate);
    }
  };

  const weekView = () => {
    if (applyWeekOff) {
      const dayOfWeek = new Date(props.initialDate).getDay();
      let daysToSubtract = 0;
      if (dayOfWeek === 1) {
        // Monday
        daysToSubtract = 0;
      } else if (dayOfWeek === 2) {
        // Tuesday
        daysToSubtract = 1;
      } else if (dayOfWeek === 3) {
        // Wednesday
        daysToSubtract = 2;
      } else if (dayOfWeek === 4) {
        // Thursay
        daysToSubtract = 3;
      } else if (dayOfWeek === 5) {
        // Friday
        daysToSubtract = 4;
      } else if (dayOfWeek === 6) {
        // Saturday
        daysToSubtract = 5;
      } else if (dayOfWeek === 7) {
        // Sunday
        daysToSubtract = 6;
      }
      const startingDate = new Date(props.initialDate);
      startingDate.setDate(startingDate.getDate() - daysToSubtract);

      setStartDate(startingDate);
      const endingDate = moment(startingDate).add(6, "days").format();

      setEndDate(endingDate);
      dispatch(
        getSessionAllDetail({
          from_date: moment(startingDate).format("YYYY-MM-DD"),
          to_date: moment(endingDate).format("YYYY-MM-DD"),
        }),
      );
    } else {
      const startingDate = new Date(props.initialDate);
      setStartDate(startingDate);
      const endingDate = moment(startingDate).add(6, "days").format();
      setEndDate(endingDate);
      dispatch(
        getSessionAllDetail({
          from_date: moment(startingDate).format("YYYY-MM-DD"),
          to_date: moment(endingDate).format("YYYY-MM-DD"),
        }),
      );
    }
  };

  const handleDateFromDatePicker = (data, value) => {
    setStartDate(data);
    setApplyWeekOff(false);
    props.onDataSend(data, value);
  };

  useEffect(() => {
    weekView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialDate]);

  return (
    <div className={styles.calendarMainDiv} ref={modalRef}>
      <img
        src={calendarIconNew}
        alt="calendar"
        className={classNames(styles.calendarImg)}
        onClick={toggleModal}
      />

      <button
        onClick={() => {
          sendDataToParent("prev");
        }}
        className={classNames(styles.uniqueButton)}
        disabled={props.isDisable}
      >
        <IoIosArrowBack color="#001035" />
      </button>

      <p onClick={toggleModal} className=" m-2 mb-0 mt-0">
        {" "}
        {moment(startDate).format("D MMMM")} -{" "}
        {moment(startDate).add(6, "days").format("D MMMM")}
      </p>

      <button
        onClick={() => {
          sendDataToParent("next");
        }}
        className={classNames(styles.uniqueButton)}
        disabled={props.isDisable}
      >
        <IoIosArrowForward />
      </button>

      {isOpen && (
        <div>
          <DashboardDatePicker
            onDatePick={handleDateFromDatePicker}
            className="pickerOverlayA"
            dates={startDate}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
    </div>
  );
};

export default CustomWeeklyHeader;

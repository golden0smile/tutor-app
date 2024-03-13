import classNames from "classnames";
import styles from "./CustomWeeklyHeader.module.scss";

import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import DashboardDatePicker from "../../../components/CommonDatePicker/index";
import useOutsideClick from "hooks/useOutsideClick";
import { getSessionAllDetail } from "modules/session/features/sessionSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { calendarIconNew } from "constants/images";

const CustomWeeklyHeaderDayView = props => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [startDate, setStartDate] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useOutsideClick(modalRef, handleClose);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const sendDataToParent = buttonCondition => {
    if (buttonCondition === "next") {
      const nextDate = moment(startDate).add(1, "days").format();
      setStartDate(nextDate);
      props.onDataSend(nextDate);
    } else {
      const prevDate = moment(startDate).subtract(1, "days").format();
      setStartDate(prevDate);
      props.onDataSend(prevDate);
    }
  };

  const weekView = () => {
    const startingDate = new Date(props.initialDate);
    setStartDate(startingDate);
    dispatch(
      getSessionAllDetail({
        from_date: moment(startingDate).format("YYYY-MM-DD"),
        to_date: moment(startingDate).format("YYYY-MM-DD"),
      }),
    );
  };

  const handleDateFromDatePicker = (data, value) => {
    setStartDate(data);
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
        {moment(startDate).format("D MMMM")}
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
            isDay={true}
          />
        </div>
      )}
    </div>
  );
};

export default CustomWeeklyHeaderDayView;

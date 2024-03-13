import classNames from "classnames";
import { calendarIconNew } from "constants/images";
import moment from "moment";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import DashboardDatePicker from "../../../components/CommonDatePicker/index";
import styles from "./CustomWeeklyHeader.module.scss";
import useOutsideClick from "hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { getSessionAllDetail } from "modules/session/features/sessionSlice";

const CustomWeeklyHeaderDayView = props => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [applyWeekOff, setApplyWeekOff] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

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
    setEndDate(startingDate);
    dispatch(
      getSessionAllDetail({
        from_date: moment(startingDate).format("YYYY-MM-DD"),
        to_date: moment(startingDate).format("YYYY-MM-DD"),
      }),
    );
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
          />
        </div>
      )}
    </div>
  );
};

export default CustomWeeklyHeaderDayView;

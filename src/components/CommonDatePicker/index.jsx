import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css fil
import "./index.scss";
import { toast } from "react-toastify";
const DashboardDatePicker = props => {
  const initialDate = new Date(props.dates);
  const endDate = new Date(initialDate);
  endDate.setDate(endDate.getDate() + 6);
  const initialRange = {
    startDate: initialDate,
    endDate: endDate,
    key: "selection",
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRange, setSelectedRange] = useState([initialRange]);

  const handleDateChange = ranges => {
    const maxAllowedDuration = props?.isDay ? 0 : 6; // Maximum allowed duration in days
    const { startDate, endDate } = ranges.selection;

    // Calculate the duration in days
    const isRangeSelection = endDate !== startDate;
    const durationInDays =
      isRangeSelection &&
      Math.round((endDate - startDate) / (24 * 60 * 60 * 1000));

    if (isRangeSelection && durationInDays === maxAllowedDuration) {
      setSelectedRange([ranges.selection]);
      setSelectedDate([ranges.selection]);
    } else if (isRangeSelection && durationInDays < maxAllowedDuration) {
      setSelectedRange([ranges.selection]);
      setSelectedDate([ranges.selection]);
      !props?.isDay && toast.error("Selected range must be exactly 7 days.");
    } else if (isRangeSelection && durationInDays > maxAllowedDuration) {
      // If the selected range exceeds the maximum allowed duration, adjust the endDate
      setSelectedRange([
        {
          startDate,
          endDate: new Date(
            startDate.getTime() + maxAllowedDuration * 24 * 60 * 60 * 1000,
          ),
          key: "selection",
        },
      ]);
      !props?.isDay &&
        toast.error("Selected range exceeding the maximum range of 7 days.");
    } else {
      setSelectedRange([ranges.selection]);
    }
  };
  const sendDataToHeader = data => {
    props.onDatePick(data, "datePickerValue");
  };

  return (
    <>
      <div className="dashboard-date-picker">
        <DateRangePicker
          ranges={selectedRange}
          onChange={handleDateChange}
          className="pickerOverlayA"
          direction="horizontal"
        />
        {selectedDate !== "" || initialDate ? (
          <div className="date-picker-footer">
            <button
              className="primaryBTn"
              onClick={() => {
                sendDataToHeader(selectedRange[0].startDate);
                props?.setIsOpen(false);
              }}
            >
              Done
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DashboardDatePicker;

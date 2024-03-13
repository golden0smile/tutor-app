import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./CustomDatePicker.scss";

const CustomDatePicker = ({
  handleChange,
  setInitialDate,
  initialDate = null,
  setIsDateShow,
}) => {
  const [selectedRange, setSelectedRange] = useState(
    initialDate
      ? [initialDate]
      : [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ],
  );

  const [selectedDate, setSelectedDate] = useState("");

  const handleSelect = ranges => {
    setInitialDate({
      endDate: ranges.selection.endDate,
      startDate: ranges.selection.startDate,
      key: "selection",
    });
    setSelectedRange([ranges.selection]);
    setSelectedDate(ranges.selection);
  };

  return (
    <div className="date-picker-wrapper">
      <DateRangePicker
        ranges={selectedRange}
        onChange={handleSelect}
        showSelectionPreview={true}
        showHeader={false}
        className="pickerOverlayA"
        moveRangeOnFirstSelection={false}
      />
      {selectedDate !== "" || initialDate ? (
        <div className="date-picker-footer">
          <button
            className="primaryBTn"
            onClick={() => {
              handleChange(selectedRange[0]);
              setIsDateShow(false);
            }}
          >
            Done
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CustomDatePicker;

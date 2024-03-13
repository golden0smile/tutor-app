import React from "react";
import Select, { components } from "react-select";
import reactSelectStyles from "./reactSelectStyles";
import { dropDownArrow } from "constants/images";

const CustomSelect = ({
  type = "",
  list,
  value,
  handleChange,
  placeHolder = "Select...",
  isDisabled = false,
  isMulti = false,
  isGroup = false,
  ...args
}) => {
  const DropDownIndicatorCustom = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={dropDownArrow} alt="" />
      </components.DropdownIndicator>
    );
  };
  return (
    <Select
      isMulti={isMulti}
      isDisabled={isDisabled}
      placeholder={placeHolder}
      name="filter"
      id="selectedOption"
      options={list}
      value={
        isMulti
          ? value
          : isGroup && value
          ? list
              ?.map(item =>
                item?.options?.find(item1 => item1?.value === value),
              )
              ?.find(item2 => item2?.value === value) || null
          : list?.find(option => option.value === value) || null
      }
      onChange={option => {
        handleChange(option, type);
      }}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator: DropDownIndicatorCustom,
      }}
      styles={{
        ...reactSelectStyles,
        ...(args?.styles || {}),
        control: (base, props) => ({
          ...reactSelectStyles.control(base, { ...props }),
        }),
      }}
    />
  );
};

export default CustomSelect;

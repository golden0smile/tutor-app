import React from "react";
import Select from "react-select";
import { customReactSelectStyles } from "constants/customReactSelectStyles";

const LoadingIndicator = ({ getStyles, ...props }) => {
  const styles = getStyles("loadingIndicator", props);

  return <p style={{ ...styles }}>Loading...</p>;
};

const TableSelect = ({ value, isSearchable = false, ...args }) => {
  return (
    <Select
      formatOptionLabel={o => (
        <span title={o?.label} className="m-0 d-inline-flex w-100 flex-1">
          {o?.label}
        </span>
      )}
      isSearchable={isSearchable}
      value={value}
      {...args}
      components={{
        LoadingIndicator,
      }}
      styles={{
        ...customReactSelectStyles,
        menu: base => ({
          ...base,
          zIndex: 1000,
          overflowX: "hidden",
          border: 0,
          boxShadow: "0px 5px 10px rgb(0 0 0 / 9%)",
          padding: 10,
          width: "100%",
          marginTop: "0px",
        }),
        menuList: provided => ({
          ...provided,
          overflowY: "auto",
          overflowX: "hidden",
          marginTop: "0px",
        }),
        control: (...base) => ({
          ...customReactSelectStyles.control(...base),
          minHeight: "none",
          padding: "0px 0px 0px 6px",
          height: "35px",
          background: "white",
          borderRadius: "3px",
          border: "0 !important",
        }),
        container: (base, ...args) => ({
          ...customReactSelectStyles.container(base, ...args),
          minWidth: "none",
          width: "max-content",
        }),
        valueContainer: base => ({
          paddingLeft: "8px",
          minHeight: "none",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          justifyContent: "flex-start",
        }),
        singleValue: base => ({
          color: "#212529",
          fontWeight: "400",
          fontSize: "15px",
        }),
        indicatorsContainer: base => ({
          ...base,
          "& div": {
            color: "#1A1A1A",
            fontWeight: "400",
            padding: "7px 7px",
          },
          "& div:hover": {
            color: "black",
          },
        }),
      }}
    />
  );
};

export default TableSelect;

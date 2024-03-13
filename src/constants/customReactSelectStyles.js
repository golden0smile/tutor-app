import { CgCloseO } from "react-icons/cg";
import { components } from "react-select";

export const ReactSelectMultiValueRemove = props => {
  return (
    <components.MultiValueRemove {...props}>
      <CgCloseO title={"Remove Item"} />
    </components.MultiValueRemove>
  );
};

export const ReactSelectLoadingIndicator = ({ getStyles, ...props }) => {
  const styles = getStyles("loadingIndicator", props);

  return (
    <p
      style={{
        ...styles,
        borderRadius: "100px",
        zIndex: "1",
        fontSize: "12px !important",
      }}
      className="loadingtext"
    >
      Loading...
    </p>
  );
};

export const ReactSelectClearIndicator = ({
  children,
  message = "Remove all items",
  showToolTip = false,
  ...props
}) => {
  return (
    <components.ClearIndicator {...props}>
      <span {...(showToolTip ? { title: message } : {})}>
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className="css-tj5bde-Svg"
        >
          <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
        </svg>
      </span>
    </components.ClearIndicator>
  );
};

export const customReactSelectStyles = {
  menu: base => ({
    ...base,
    zIndex: 1000,
    overflowX: "hidden",
    border: 0,
    boxShadow: "0px 5px 10px rgb(0 0 0 / 9%)",
    padding: 10,
    width: "100%",
    marginTop: "0px !important",
    textAlign: "left",
  }),
  menuList: provided => ({
    ...provided,
    overflowY: "auto",
    overflowX: "hidden",
    marginTop: "0px !important",
    textAlign: "left",
  }),
  noOptionsMessage: provide => ({
    textAlign: "left",
  }),
  loadingIndicator: base => ({
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    content: '""',
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    padding: "0px 16px",
    textAlign: "left",
    zIndex: 1000,
    backgroundColor: "#f5f5f5",
    color: "#1a1a1a",
    fontSize: "12px !important",
    "& p.jsdjf": {
      color: "#1a1a1a",
      fontSize: "12px!important",
    },
  }),
  indicatorSeparator: () => null,
  multiValue: base => ({
    ...base,
    backgroundColor: "#ABC76E",
    borderRadius: "50px",
    padding: "1px 8px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
  }),
  multiValueLabel: base => ({
    ...base,
    color: "#fff",
    fontSize: "13px",
    fontWeight: 500,
  }),
  multiValueRemove: base => ({
    ...base,
    borderRadius: "50px",
    width: "20px",
    padding: "2px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    border: "none",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "transparent",
      color: "white",
      opacity: 1,
    },
    "& div": {
      backgroundColor: "transparent !important",
      color: "inherit !important",
    },
    "& div:hover": {
      backgroundColor: "transparent",
      color: "inherit",
    },
    "& svg": {
      color: "#fff",
      border: "none",
    },
  }),
  container: provided => ({
    ...provided,
    minWidth: "225px",
    color: "#666666",
    padding: "1px 2px",
  }),
  singleValue: provided => ({
    ...provided,
    color: "#212529",
    marginTop: "3px",
    fontWeight: "400",
    position: "relative",
  }),
  control: (base, args) => ({
    ...base,
    boxShadow: "none",
    borderRadius: "0px",
    cursor: "pointer",
    position: "relative",
    padding: "3px 6px",
    border: "none",
    backgroundColor: args?.isDisabled ? "#F5F5F5" : "#fff",
  }),
  option: (provided, { isFocused, isSelected }) => {
    return {
      ...provided,
      margin: "1px",
      cursor: "pointer",
      whiteSpace: "nowrap",
      overflow: "hidden",
      lineheight: "normal",
      textOverflow: "ellipsis",
      color: isSelected ? "white" : "black",
      backgroundColor: isSelected ? "#999fae" : "white",
      "&:active": {
        color: isSelected ? "white" : "black",
        backgroundColor: isSelected ? "#999fae" : "white",
      },
      "&:hover": {
        color: isFocused ? "white" : "black",
        backgroundColor: isFocused ? "#999fae" : "white",
      },
    };
  },
  indicatorsContainer: base => ({
    ...base,
    "& div": {
      paddingBlock: 0,
      color: "#1A1A1A",
      fontWeight: "400",
    },
    "& div:hover": {
      color: "#1A1A1A",
    },
  }),
  placeholder: base => ({
    ...base,
    opacity: 0.9,
    fontWeight: 400,
    color: "#a1a5a8",
    position: "absolute",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  }),
  input: base => ({
    ...base,
    margin: 0,
    color: "#c7cdd0",
  }),
};

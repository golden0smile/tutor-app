const reactSelectStyles = {
  noOptionsMessage: base => ({
    ...base,
    fontSize: "10px",
  }),
  container: base => ({
    ...base,
    width: "100%",
    backgroundColor: "#f2f4fe",
    borderRadius: 0,
    // maxWidth:"230px",
    minWidth: "188px",
  }),
  control: (base, { error, touched }) => ({
    ...base,
    borderRadius: "3px",
    padding: "0 0 0 5px",
    border: "1px solid #999fae ",
    borderColor: "black",
    backgroundColor: "white",
    boxShadow: "none",
  }),
  valueContainer: base => ({
    ...base,
    paddingInline: 0,
    color: "#1b1b1b",
    border: "none",
    fontSize: "14px",
  }),
  placeholder: base => ({
    ...base,
    fontFamily: " Nunito",
    fontSize: "14px",
    color: "rgba(0, 16, 53, 0.60) ",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#999fae" : "transparent",
    color: state.isSelected ? "#fff" : provided.color,
    borderBottom: "1px solid #999fae",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
    ":hover": {
      background: "#999fae",
      color: "#fff",
    },
  }),

  multiValue: base => ({
    ...base,
    border: "1px solid #999fae",
    borderRadius: "50px",
    backgroundColor: "transparent",
    paddingLeft: "4px",
  }),
  multiValueRemove: base => ({
    ...base,
    svg: {
      background: "#222c5b",
      borderRadius: "10px",
      color: "white",
      ":hover": {
        background: "#ff4343",
      },
    },
    ":hover": {
      background: "transparent",
    },
  }),
  clearIndicator: base => ({
    ...base,
    cursor: "pointer",
  }),
  dropdownIndicator: base => ({
    ...base,

    color: "#001035", // Custom colour
  }),
  groupHeading: base => ({
    ...base,
    color: "black",
    fontSize: "13px",
    fontWeight: 800,
    textTransform: "capitalize",
  }),
};

export default reactSelectStyles;

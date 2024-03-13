import classNames from "classnames";
import React from "react";
import styles from "./TableSwitch.module.scss";

const TableSwitch = ({ title, bg }) => {
  return (
    <button className={classNames(styles.btn, bg, "text-uppercase")}>
      {title}
    </button>
  );
};

export default TableSwitch;

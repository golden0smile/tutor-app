import React from "react";
import styles from "./CommonButton.module.scss";
import classNames from "classnames";

const CommonButton = ({
  className,
  btnText,
  handleClick,
  isWarning = false,
  ...args
}) => {
  return (
    <button
      className={classNames(
        styles.btn,
        isWarning ? styles.warningBtn : "",
        className,
      )}
      onClick={handleClick}
      {...args}
    >
      {btnText}
    </button>
  );
};

export default CommonButton;

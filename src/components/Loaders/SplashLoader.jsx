import React from "react";
import styles from "./SplashLoader.module.scss";
import classNames from "classnames";
import { companyLogoWithName } from "constants/images";

const SplashLoader = () => {
  return (
    <div className={classNames("container", styles.splash)}>
      <div className={classNames(styles.p20)}>
        <img
          src={companyLogoWithName}
          alt=""
          className={classNames(styles.centerImg)}
        />
      </div>
    </div>
  );
};

export default SplashLoader;

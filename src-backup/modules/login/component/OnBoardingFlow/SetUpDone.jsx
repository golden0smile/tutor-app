import classNames from "classnames";
import { done } from "constants/images";
import React from "react";
import styles from "./SetUpDone.module.scss";

import UserCommonBtn from "./common/UserCommonBtn";

const SetUpDone = ({ setStep }) => {
  return (
    <div className={classNames(styles.main_container, "container w-100")}>
      <div className={classNames(styles.detail_container, "")}>
        <div className={classNames(styles.optionContent, "")}>
          <img src={done} alt="" />
        </div>
        <div className={classNames("mb-3")}>
          <UserCommonBtn
            setStep={setStep}
            backStep={2}
            btn1_text="Back"
            btn2_text="Get Started"
            isNavigate={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SetUpDone;

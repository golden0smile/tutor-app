import classNames from "classnames";
import React, { useState } from "react";
import styles from "./UserNameOption.module.scss";
import UserCommonBtn from "./common/UserCommonBtn";
import { useDispatch } from "react-redux";
import { setTutorAllDetail } from "modules/login/features/loginSlice";

const UserNameOption = ({ setStep }) => {
  const dispatch = useDispatch();
  const [optionalName, setOptionalName] = useState("");
  const handleConfirmNext = () => {
    if (optionalName) {
      dispatch(
        setTutorAllDetail({
          tut_pref_name: optionalName,
        }),
      );
    }
  };
  return (
    <>
      <div className={classNames(styles.main_container, "container w-100")}>
        <div className={classNames(styles.detail_container, "")}>
          <div className={classNames(styles.optionContent, "w-100")}>
            <span
              className={classNames(
                "mb-3 fw-bold",
                styles.mainLabel,
                styles.fs_18,
              )}
            >
              Let us know your preferred name (optional)
            </span>
            <span className={classNames("mb-3", styles.fs_15)}>
              Your preferred name will be displayed on the student and parent
              platforms.
            </span>
            <input
              className={classNames(
                styles.inputClass,
                styles.input_bg,
                "w-100",
              )}
              placeholder="Enter preferred name"
              value={optionalName}
              onChange={e => {
                const value = e.target.value;
                setOptionalName(value.trimStart());
              }}
            />
            <div className={classNames("mt-3")}>
              <UserCommonBtn
                setStep={setStep}
                step={2}
                backStep={0}
                btn1_text="Back"
                btn2_text="Next"
                handleConfirmNext={handleConfirmNext}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNameOption;

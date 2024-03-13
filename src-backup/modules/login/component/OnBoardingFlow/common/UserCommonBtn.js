import classNames from "classnames";
import React from "react";
import styles from "./UserCommonbtn.module.scss";
import LocalStorage from "services/localStorage";
import { useDispatch } from "react-redux";
import {
  changeIsOldUser,
  setTutorAllDetail,
} from "modules/login/features/loginSlice";
const defaultFunction = () => {};

const UserCommonBtn = ({
  setTab,
  setStep,
  btn1_text,
  btn2_text,
  step,
  backStep = "",
  isNavigate = false,
  disable = false,
  isBackBtn = true,
  handleConfirmNext = defaultFunction,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      {isBackBtn ? (
        <button
          className={classNames("me-3 btn", styles.btn_secondary)}
          onClick={() => {
            if (!!backStep || backStep === 0) {
              LocalStorage.set("step", backStep);
              setStep(backStep);
            } else {
              setTab(-1);
            }
          }}
        >
          {btn1_text}
        </button>
      ) : null}
      <button
        className={classNames("btn ", styles.btn_Primary)}
        onClick={() => {
          if (isNavigate) {
            dispatch(changeIsOldUser({ isOldUser: true }));
          } else {
            dispatch(
              setTutorAllDetail({
                tut_activie: step === "done" ? 3 : step,
              }),
            );
            LocalStorage.set("step", step);
            setStep(step);
            handleConfirmNext();
          }
        }}
        disabled={disable}
      >
        {btn2_text}
      </button>
    </>
  );
};

export default UserCommonBtn;

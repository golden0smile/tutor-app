import classNames from "classnames";
import React, { useEffect, useState } from "react";
import SetUpDone from "./SetUpDone";
import UploadPhoto from "./UploadPhoto";
import UserDetails from "./UserDetails";
import UserNameOption from "./UserNameOption";

const OnBoardingFlow = ({ setTab, tab }) => {
  const [step, setStep] = useState(tab);
  useEffect(() => {
    setStep(tab);
  }, [tab]);
  return (
    <div className={classNames("container-fluid w-100")}>
      <div className={classNames("row")}>
        <div className={classNames("col-xl-6 col-lg-8 p-4 mx-auto")}>
          {step === 0 ? (
            <UserDetails setStep={setStep} setTab={setTab} />
          ) : step === 1 ? (
            <UserNameOption setStep={setStep} />
          ) : step === 2 ? (
            <UploadPhoto setStep={setStep} />
          ) : step === "done" ? (
            <SetUpDone setStep={setStep} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OnBoardingFlow;

import React, { useEffect, useState } from "react";
import OnBoardingFlow from "./OnBoardingFlowPage";
import SplashLoader from "components/Loaders/SplashLoader";
import {
  changeIsOldUser,
  getTutorAllDetail,
} from "modules/login/features/loginSlice";
import { useDispatch } from "react-redux";

const User = () => {
  const [tab, setTab] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tab === -1) {
      setTimeout(() => {
        setTab(0);
      }, 2000);
    }
  }, [tab]);
  useEffect(() => {
    dispatch(getTutorAllDetail()).then(res => {
      if ([0, 1, 2].includes(+res?.payload?.data?.onboarding_step)) {
        setTab(+res?.payload?.data?.onboarding_step);
        dispatch(
          changeIsOldUser({
            isOldUser: false,
            step: res?.payload?.data?.onboarding_step,
          }),
        );
      }
    });
  }, [dispatch]);
  return (
    <>
      {tab === -1 ? (
        <SplashLoader />
      ) : (
        <OnBoardingFlow setTab={setTab} tab={tab} />
      )}
    </>
  );
};

export default User;

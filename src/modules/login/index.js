import React, { useState, useEffect } from "react";
import LoginPage from "./component/LoginPage";
import SplashLoader from "components/Loaders/SplashLoader";
import { useDispatch } from "react-redux";
import { getMaintenanceMessage } from "./features/loginSlice";

const Login = () => {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (tab === 0) {
      setTimeout(() => {
        setTab(1);
      }, 1500);
    }
    //for getting maintenance msg
    dispatch(getMaintenanceMessage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return tab === 0 ? <SplashLoader /> : <LoginPage setTab={setTab} tab={tab} />;
};

export default Login;

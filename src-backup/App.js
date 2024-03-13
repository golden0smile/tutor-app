import { getRemarkReportCount } from "modules/dashboard/features/homeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Routes from "routes";
import Cookies, { cookieKeys } from "services/cookies";

const App = () => {
  const location = useLocation();
  const path = location?.pathname;
  const tutorToken = Cookies.get(cookieKeys.TOKEN);

  const dispatch = useDispatch();
  useEffect(() => {
    if (tutorToken) {
      dispatch(getRemarkReportCount());
    }
  }, [dispatch, path, tutorToken]);
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Routes />
    </>
  );
};

export default App;

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
  // Cookies.clear();
  // const tutorToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQjkwOThDRkQ1QTMwREI3RCIsInJvbGUiOjEsImV4cCI6MTcwMjExMzM2NSwidXNlcmFnZW50IjoidEpFRWxXTDJnU3JMMG9JWlFvdlFwTU1MUERuSG5LWW9IMWl2bS9CY2NwTT0iLCJpYXQiOjE3MDIwMjY5NjV9.89q9a6oMrBbKCu3YSrqK6qEMZOJreaAzUAn3AhpIAhg";

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

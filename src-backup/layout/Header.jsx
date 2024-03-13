import moment from "moment";
import React from "react";
import style from "./Header.module.scss";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import routesConstants from "routes/routesConstants";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate("/" + routesConstants.REMARK_REPORT);
  };
  const remarkReportCount = useSelector(state => state.home?.remarkReportCount);
  return (
    // <div className={`${style.header} d-flex justify-content-start gap-5`}>
    <div className={`${style.header} d-flex justify-content-end gap-5`}>
      <div className={`${style.info} p-2`} onClick={handleIconClick}>
        <FaBell className={style.reportIcon} />
        {remarkReportCount > 0 ? (
          <span className={`${style.badgeIcon}`}>{remarkReportCount}</span>
        ) : null}
        {/* <div className={style.userName}> Welcome, User. </div> */}
        {/* <div className={style.currentTime}>
          {" "}
          {moment().format("ddd, D MMM YYYY")}{" "}
        </div> */}
      </div>
    </div>
  );
};

export default Header;

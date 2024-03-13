import classNames from "classnames";
import {
  SessionsTaught,
  marketing,
  payment,
  unPlaided,
} from "constants/images";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import routesConstants from "routes/routesConstants";
import styles from "./CardDashBoard.module.scss";
import { useSelector } from "react-redux";
import { handleStudentUnplannedLessonFilter } from "modules/students/features/studentSlice";
import { useDispatch } from "react-redux";

const CardDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector(state => state.home.count);
  const redirectHandler = (value, path) => {
    if (path === routesConstants.STUDENTS) {
      dispatch(handleStudentUnplannedLessonFilter(true));
      navigate(value);
    } else {
      navigate(value);
    }
  };

  const countData = useMemo(() => {
    return [
      {
        id: 1,
        icon: SessionsTaught,
        title: "Sessions taught this year",
        amount: count?.totalSessionsCountInYear || 0,
        redirectionLink: routesConstants.SESSION_PAGE,
        footerTitle:
          "+" + (count?.totalSessionsCountInWeek || 0) + " this week",
        color: "#F2C6DE",
      },
      {
        id: 2,
        icon: payment,
        title: "Pending Payments",
        amount: "SGD " + (count?.totalUnpaiedSessions || 0),
        redirectionLink: routesConstants.TIME_SHEETS_PAGE,
        footerTitle:
          // (count?.totalPaidSessionsCountInWeek || 0) + " All paid this week",
          "SGD " + (count?.totalUnpaiedSessions || 0) + " this week",
        color: "#F7D9CA",
      },
      {
        id: 3,
        icon: unPlaided,
        title: "Unplanned lessons",
        amount: count?.totalUnplannedSessionsCountInWeek,
        redirectionLink: routesConstants.STUDENTS,
        footerTitle:
          count?.totalUnplannedSessionsCountInWeek > 0
            ? (count?.totalUnplannedSessionsCountInWeek || 0) +
              " upcoming in " +
              (count?.totalUpComingSessionsInHourCount || 0) +
              " hour"
            : "All upcoming lessons planned.",
        color: "#C6DEF1",
      },
      {
        id: 4,
        icon: marketing,
        title: "Outstanding marking",
        redirectionLink: routesConstants.MARKING_WIZARD_PAGE,
        amount: count?.totalOutstandingMarkingCount,
        // amount: "0",
        isMarked: true,
        footerTitle:
          count?.totalOutstandingMarkingCount === 0
            ? "All activities marked."
            : "",
        color: "#DBCDF0",
      },
    ];
  }, [count]);

  return (
    <div className={classNames("mt-3", styles.cardsMain)}>
      {countData?.map(data => (
        <div
          key={data?.id}
          className={classNames(
            data?.redirectionLink
              ? data?.id === 4 && +data?.amount === 0
                ? // ? data?.id === 4
                  ""
                : "cursor-pointer"
              : "",
            styles.dashboardCard,
          )}
          onClick={() =>
            data?.redirectionLink
              ? // ? data?.id === 4 && +data?.amount === 0
                data?.id === 4
                ? null
                : redirectHandler(
                    `/${data?.redirectionLink}`,
                    data?.redirectionLink,
                  )
              : null
          }
        >
          <div
            className={styles.dashboardCardInner}
            style={{ backgroundColor: data?.color }}
          >
            <div className={styles.dashboardCardContainer}>
              <img
                src={data?.icon}
                alt="tutor"
                className={styles.dashboardCardImage}
              />
              <div className={styles.dashboardCardDetails}>
                <div className={styles.dashboardCardNameWrapper}>
                  <div className={styles.dashboardCardName}>
                    <h6 className={classNames("mb-0", styles.title)}>
                      {data?.title}
                    </h6>
                    <h4 className={classNames("mb-0", styles.amount)}>
                      {data?.amount}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.dashboardCardFooter}>
              {data?.isMarked ? (
                <div className={styles.dashboardCardMarkContent}>
                  <div className={classNames(styles.dashboardCardMarkTitle)}>
                    Mark
                  </div>
                </div>
              ) : (
                <div className={styles.dashboardCardFooterContent}>
                  <h6 className={styles.dashboardCardFooterTitle}>
                    {data?.footerTitle}
                  </h6>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardDashBoard;

import CommonModal from "components/CommonModal";
import {
  CalendarIcon,
  DurationIcon,
  SessionLeftArrowIcon,
  TimeIcon,
  coin,
  playButton,
  stop,
} from "constants/images";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import routesConstants from "routes/routesConstants";
import AwardedCoinsSuccessModal from "../components/Modals/AwardedCoinsSuccessModal";
import {
  EndSessionModal,
  MainContentModal,
} from "../components/Modals/ModalForEndSession";
import { AddCoinSection } from "../components/Modals/ModalforAwardSession";
import SessionCard from "../components/SessionCard";
import StudentsTable from "../components/StudentsTable";
import { TabTitle } from "../constants/Data";
import {
  RescheduleLessonPlanDetails,
  deleteActivity,
  endSessionDetails,
  getEndSessionDuration,
  getSessionStudents,
  getStudentDetailsBySessionid,
  lessonPlanDetails,
  setAwardCoins,
  toggleSessionOffline,
} from "../features/sessionSlice";
import { getSubStr, getTime } from "../utils/Functions";
import styles from "./SessionDetails.module.scss";
import { getHourMinis } from "modules/dashboard/utils/getHourMinis";
import getSessionStatus from "../utils/getSessionStatus";
import StartSessionModal from "../components/SessionCard/StartSessionModal";
import queryString from "query-string";
import ReScheduleSessionCard from "../components/ReScheduleSessionCard";
import classNames from "classnames";
import getUniqueSubjectName from "utils/getUniqueSubjectName";
import { FaBook } from "react-icons/fa";

const SessionDetails = () => {
  const [isAwardLoad, setIsAwardLoad] = useState(false);
  const [data, setData] = useState({
    student: [],
    coin: "",
    reason: "",
  });
  const [studentCount, setStudentCount] = useState(null);
  const [modalForAward, setModalForAward] = useState(false);
  const [modalForEndSession, setModalForEndSession] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [endSessionModal, setEndSessionModal] = useState(false);

  const { lessonPlan, sessionStudents } = useSelector(state => state.session);
  const localCurrentSessionData = localStorage.getItem("sessionData");

  const [attendance, setAttendance] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [sessionData, setSessionData] = useState(
    localCurrentSessionData
      ? JSON?.parse(localCurrentSessionData)
        ? JSON.parse(localCurrentSessionData)
        : null
      : null,
  );
  const params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const query = useMemo(
    () => queryString?.parse(location.search) || {},

    [location.search],
  );

  const localSessionTabId = localStorage.getItem("sessionTabId");
  const isRescheduleValue =
    location?.state?.isReschedule || query?.isReschedule === "true";

  const sessionSchedule = isRescheduleValue ? 1 : 0;
  const [selected, setSelected] = useState(1);

  //doing that because main content i not change from redirecting to student tab to lesson tab
  useMemo(() => {
    setSelected(
      +localSessionTabId
        ? location?.state?.selectedTab === +localSessionTabId
          ? location?.state?.selectedTab
          : +query?.selectedTab === +localSessionTabId
          ? +query?.selectedTab
          : +localSessionTabId
        : 1,
    );
  }, [localSessionTabId, location?.state?.selectedTab, query?.selectedTab]);
  const getContent = session_key => {
    if (+selected === 1 && location.pathname.includes("/session/")) {
      let payload = {
        sessionId: session_key,
        homework: 0,
        previous: 0,
      };
      if (sessionSchedule) {
        dispatch(RescheduleLessonPlanDetails(payload));
      } else {
        dispatch(lessonPlanDetails(payload));
      }
    }
  };

  const getValues = useCallback(
    id => {
      setLoading(true);
      let payload = {
        sessionId: id
          ? id
          : params.sessionDetailedId || query?.sessionDetailedId,
        homework: +selected === 2 ? 1 : 0,
        previous: +selected === 3 ? 1 : 0,
      };
      if (sessionSchedule) {
        dispatch(RescheduleLessonPlanDetails(payload)).then(res => {
          if (+selected === 1 || +selected === 2) {
            setSessionData(res?.payload?.data?.session);
            res?.payload?.data?.session &&
              localStorage.setItem(
                "sessionData",
                JSON.stringify(res?.payload?.data?.session),
              );
            setLoading(false);
          } else if (+selected === 3) {
            res?.payload?.data?.session?.tbl_session_time?.tbl_student_enrolments?.map(
              (item, key) => {
                let activityCount = item?.tbl_student?.Lesson?.LessonActivities
                  ? item?.tbl_student?.Lesson?.LessonActivities?.map(
                      (i, k) => !i.marked_for_homework,
                    )?.length
                  : 0;
                if (activityCount === 0) {
                  toast.warn(
                    `No activities assigned to ${item?.tbl_student?.st_first_name}`,
                    {
                      autoClose: 2000,
                    },
                  );
                }
              },
            );
            setLoading(false);
          }
        });
      } else {
        dispatch(lessonPlanDetails(payload)).then(res => {
          if (+selected === 1 || +selected === 2) {
            setSessionData(res?.payload?.data?.session);
            res?.payload?.data?.session &&
              localStorage.setItem(
                "sessionData",
                JSON.stringify(res?.payload?.data?.session),
              );
            setLoading(false);
          } else if (+selected === 3) {
            res?.payload?.data?.session?.tbl_session_time?.tbl_student_enrolments?.map(
              (item, key) => {
                let activityCount = item?.tbl_student?.Lesson?.LessonActivities
                  ? item?.tbl_student?.Lesson?.LessonActivities?.map(
                      (i, k) => !i.marked_for_homework,
                    )?.length
                  : 0;
                if (activityCount === 0) {
                  toast.warn(
                    `No activities assigned to ${item?.tbl_student?.st_first_name}`,
                    {
                      autoClose: 2000,
                    },
                  );
                }
              },
            );
            setLoading(false);
          }
        });
      }
    },
    [selected],
  );
  const getSessionStudentsDetails = () => {
    dispatch(getSessionStudents(lessonPlan?.pk_ses_key));
  };

  useEffect(() => {
    if (+selected !== 4) {
      getValues(params?.sessionDetailedId);
    } else if (+selected === 4) {
      //for student tab
      setLoading(true);
      dispatch(
        getStudentDetailsBySessionid({
          session_id: params?.sessionDetailedId || query?.sessionDetailedId,
          type: sessionSchedule ? 1 : 0,
        }),
      ).then(res => {
        setStudentCount(
          res?.payload?.data?.studentDetails?.tbl_session_time
            ?.tbl_student_enrolments?.length,
        );
        setLoading(false);
      });
    }

    const interval = setInterval(() => {
      if (+selected === 1) {
        getContent(params.sessionDetailedId);
      }
    }, 10 * 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, params.sessionDetailedId, sessionSchedule]);

  const handleActivityDelete = (lesson_key, activity_key) => {
    let act_list = [];
    act_list.push(activity_key);
    let values = {
      lesson_key: lesson_key,
      activities: act_list,
    };

    dispatch(deleteActivity(values)).then(res => {
      if (res?.payload?.statusCode === 200) {
        toast.success("Deleted Successfully");
        getValues();
      }
    });
  };

  const Subtitle = ({ selected, setSelected }) => {
    return (
      <div className={styles.sessionDetailsTitleSection}>
        {TabTitle?.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setSelected(item?.id);
                localStorage.setItem("sessionTabId", item?.id);
              }}
              className={
                +selected === item?.id
                  ? styles.sessionDetailsTitleSectionCont2
                  : styles.sessionDetailsTitleSectionCont
              }
            >
              <label>{item?.name}</label>
              {item?.count && studentCount ? (
                <label> ({studentCount})</label>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  const getSubjectName = () => {
    if (sessionData?.tbl_session_time?.tbl_student_enrolments?.length > 0) {
      return getUniqueSubjectName(
        sessionData?.tbl_session_time?.tbl_student_enrolments,
      );
    }
  };

  const handleEndSession = () => {
    let studentList =
      sessionStudents?.tbl_session_time?.tbl_student_enrolments &&
      sessionStudents?.tbl_session_time?.tbl_student_enrolments?.length > 0
        ? [...sessionStudents?.tbl_session_time?.tbl_student_enrolments]
        : [];
    if (studentList?.length === attendance?.length) {
      let values = {
        session_id: sessionStudents?.pk_ses_key,
        studentsAttended: attendance
          ?.filter(i => i.attendance_id === 1)
          ?.map(item => item?.student_key),
        studentsUnattended: attendance
          ?.filter(i => i.attendance_id !== 1)
          ?.map(item => item?.student_key),
        activities: activityList?.map(
          (item, i) =>
            item?.activities?.map(
              (item1, i1) => item1?.pk_lesson_activity_key,
            )[0],
        ),
      };
      dispatch(endSessionDetails(values)).then(res => {
        if (res?.payload?.statusCode === 200) {
          dispatch(getEndSessionDuration(sessionStudents?.pk_ses_key)).then(
            res => {
              setModalForEndSession(false);
              setEndSessionModal(true);
              getValues();
            },
          );
        } else {
          toast.error("Something went wrong");
        }
      });
    } else {
      toast?.error("Please mark attendance for all students");
    }
  };

  const getIsAllDefer = () => {
    const isAllDefer =
      lessonPlan?.tbl_session_time?.tbl_student_enrolments?.every(
        studentEnrolment =>
          studentEnrolment?.tbl_student?.tbl_session_attendances?.every(
            attendance => attendance?.attendance_status === 6,
          ),
      );
    return isAllDefer;
  };

  const handleSessionStart = () => {
    const isAllDefer = getIsAllDefer();
    if (isAllDefer) {
      return false;
    } else {
      setShow(true);
    }
  };
  const HeaderSection = () => {
    return (
      <div className={styles.sessionDetailsHeaderMainSection}>
        <div className={styles.sessionDetailsHeaderSection}>
          <div className={styles.sessionDetailsHeaderSectionLeft}>
            {/* icon */}
            <div className={styles.sessionDetailsHeaderIcon}>
              <img
                onClick={() => navigate("/" + routesConstants.SESSION_PAGE)}
                alt="session-left-arrow-icon"
                src={SessionLeftArrowIcon}
              />
            </div>
            {/* heading contents */}
            <div className={styles.sessionDetailsHeaderCont}>
              <label>{sessionData?.tbl_session_time?.sest_name}</label>
            </div>
          </div>
          {/* right section */}
          <div className={styles.sessionDetailsHeaderSectionRight}>
            <div className={styles.sessionDetailsHeaderCont}>
              <p>{sessionData?.tbl_session_time?.sest_type}</p>
            </div>

            <div
              onClick={() =>
                sessionData?.ses_is_completed
                  ? toast.error("Session is completed")
                  : setModalForAward(true)
              }
              className={styles.sessionDetailsHeaderSectionButton}
            >
              <img alt="coin-icon" src={coin} />
              <label>Award Coins</label>
            </div>

            {!sessionData?.ses_is_completed &&
              (!sessionData?.ses_status ? (
                <div
                  onClick={() => {
                    handleSessionStart();
                  }}
                  className={classNames(
                    getIsAllDefer() ? styles.disable : "",
                    styles.sessionDetailsHeaderSectionButton,
                  )}
                >
                  <img alt="start-session-icon" src={playButton} />
                  <label>Start Session</label>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setModalForEndSession(true);
                    getSessionStudentsDetails();
                  }}
                  className={styles.sessionDetailsHeaderSectionButton}
                >
                  <img alt="stop-session-icon" src={stop} />
                  <label>End Session</label>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.sessionDetailsDdSection}>
          {/* date and time */}
          <div className={styles.sessionDetailsHeaderContDate}>
            <div className={styles.sessionDetailsHeaderContDateSection}>
              <img alt="calendar-icon" src={CalendarIcon} />
              <div
                className={styles.sessionDetailsHeaderContDateSectionContents}
              >
                <label>Date</label>

                <p>
                  {sessionData
                    ? moment(sessionData?.ses_date).format("DD MMM YYYY")
                    : null}{" "}
                  (
                  {sessionData
                    ? getSubStr(sessionData?.tbl_session_time?.sest_day)
                    : null}
                  )
                </p>
              </div>
            </div>

            <div className={styles.sessionDetailsHeaderContDateSection}>
              <img alt="time-icon" src={TimeIcon} />
              <div
                className={styles.sessionDetailsHeaderContDateSectionContents}
              >
                <label>Time</label>

                <p>
                  {sessionData ? getTime(sessionData?.ses_start_time) : null} -{" "}
                  {sessionData ? getTime(sessionData?.ses_end_time) : null}
                </p>
              </div>
            </div>
            <div className={styles.sessionDetailsHeaderContDateSection}>
              <img alt="duration-icon" src={DurationIcon} />
              <div
                className={styles.sessionDetailsHeaderContDateSectionContents}
              >
                <label>Duration</label>
                <p>
                  {sessionData?.ses_start_time && sessionData?.ses_end_time
                    ? getHourMinis(
                        sessionData?.ses_start_time,
                        sessionData?.ses_end_time,
                      )
                    : "-"}{" "}
                </p>
              </div>
            </div>
            <div className={styles.sessionDetailsHeaderContDateSection}>
              <div className={styles.subjectIcon}>
                <FaBook />
              </div>

              <div
                className={styles.sessionDetailsHeaderContDateSectionContents}
              >
                <label>Subject</label>
                <p>{getSubjectName()}</p>
              </div>
            </div>
          </div>
          {/* status */}
          <div
            style={{
              backgroundColor: getSessionStatus(sessionData)?.color,
            }}
            className={styles.sessionDetailsHeaderStatus}
          >
            <label>{getSessionStatus(sessionData)?.status}</label>
          </div>
        </div>
      </div>
    );
  };

  const RescheduleHeaderSection = () => {
    return (
      <div className={styles.sessionDetailsHeaderMainSection}>
        <div className={styles.sessionDetailsHeaderSection}>
          <div className={styles.sessionDetailsHeaderSectionLeft}>
            {/* icon */}
            <div className={styles.sessionDetailsHeaderIcon}>
              <img
                onClick={() => navigate("/" + routesConstants.SESSION_PAGE)}
                alt="session-left-arrow-icon"
                src={SessionLeftArrowIcon}
              />
            </div>
            {/* heading contents */}
            <div className={styles.sessionDetailsHeaderCont}>
              <label>{sessionData?.tbl_session_time?.sest_name}</label>
            </div>
          </div>
          {/* right section */}
          <div className={styles.sessionDetailsHeaderSectionRight}>
            <div className={styles.sessionDetailsHeaderCont}>
              <p>{sessionData?.tbl_session_time?.sest_type}</p>
            </div>

            <div
              onClick={() =>
                sessionData?.ses_is_completed
                  ? toast.error("Session is completed")
                  : setModalForAward(true)
              }
              className={styles.sessionDetailsHeaderSectionButton}
            >
              <img alt="coin-icon" src={coin} />
              <label>Award Coins</label>
            </div>

            {!sessionData?.ses_is_completed &&
              (!sessionData?.ses_status ? (
                <div
                  onClick={() => {
                    handleSessionStart();
                  }}
                  className={classNames(
                    getIsAllDefer() ? styles.disable : "",
                    styles.sessionDetailsHeaderSectionButton,
                  )}
                >
                  <img alt="start-session-icon" src={playButton} />
                  <label>Start Session</label>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setModalForEndSession(true);
                    getSessionStudentsDetails();
                  }}
                  className={styles.sessionDetailsHeaderSectionButton}
                >
                  <img alt="stop-session-icon" src={stop} />
                  <label>End Session</label>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.sessionDetailsDdSection}>
          {/* date and time */}
          <div className={styles.sessionDetailsHeaderContDate}>
            <div className={styles.sessionDetailsHeaderContDateSection}>
              <img alt="calendar-icon" src={CalendarIcon} />
              <div
                className={styles.sessionDetailsHeaderContDateSectionContents}
              >
                <label>Date</label>

                <p>
                  {sessionData
                    ? moment(sessionData?.ses_date).format("DD MMM YYYY")
                    : null}{" "}
                  (
                  {sessionData
                    ? getSubStr(sessionData?.tbl_session_time?.sest_day)
                    : null}
                  )
                </p>
              </div>
            </div>

            <div className={styles.sessionDetailsHeaderContDateSection}>
              <img alt="time-icon" src={TimeIcon} />
              <div
                className={styles.sessionDetailsHeaderContDateSectionContents}
              >
                <label>Time</label>

                <p>
                  {sessionData ? getTime(sessionData?.ses_start_time) : null} -{" "}
                  {sessionData ? getTime(sessionData?.ses_end_time) : null}
                </p>
              </div>
            </div>
            <div className={styles.sessionDetailsHeaderContDateSection}>
              <img alt="duration-icon" src={DurationIcon} />
              <div
                className={styles.sessionDetailsHeaderContDateSectionContents}
              >
                <label>Duration</label>
                <p>
                  {sessionData?.ses_start_time && sessionData?.ses_end_time
                    ? getHourMinis(
                        sessionData?.ses_start_time,
                        sessionData?.ses_end_time,
                      )
                    : "-"}{" "}
                </p>
              </div>
            </div>
          </div>
          {/* status */}
          <div
            style={{
              backgroundColor: getSessionStatus(sessionData)?.color,
            }}
            className={styles.sessionDetailsHeaderStatus}
          >
            <label>{getSessionStatus(sessionData)?.status}</label>
          </div>
        </div>
      </div>
    );
  };

  const handleToggleSessionOffline = useCallback(
    (status, session_key, student_key) => {
      let payload = {
        session_key: session_key,
        student_key: student_key,
        status: status,
      };
      dispatch(toggleSessionOffline(payload)).then(res => {
        if (res?.payload?.statusCode === 200) {
          toast.success(res?.payload?.message);
          getValues();
        } else {
          toast.error("Something went wrong");
        }
      });
    },
    [dispatch],
  );

  const handleMainContent = () => {
    if (+selected === 4) {
      return <StudentsTable isReschedule={sessionSchedule} />;
    } else if (
      location?.state?.isReschedule ||
      query?.isReschedule === "true"
    ) {
      return (
        <ReScheduleSessionCard
          handleActivityDelete={(lesson_key, activity_key) =>
            handleActivityDelete(lesson_key, activity_key)
          }
          code={getSessionStatus(sessionData)?.code}
          selectedTab={+selected}
          handleToggleSessionOffline={(status, session_key, student_key) =>
            handleToggleSessionOffline(status, session_key, student_key)
          }
          isReschedule={true}
        />
      );
    } else {
      return (
        <SessionCard
          handleActivityDelete={(lesson_key, activity_key) =>
            handleActivityDelete(lesson_key, activity_key)
          }
          code={getSessionStatus(sessionData)?.code}
          selectedTab={+selected}
          handleToggleSessionOffline={(status, session_key, student_key) =>
            handleToggleSessionOffline(status, session_key, student_key)
          }
        />
      );
    }
  };

  const handleAddAward = data => {
    const studentDropDown =
      sessionData?.tbl_session_time?.tbl_student_enrolments?.map(y => ({
        label: y?.tbl_student?.st_first_name + " " + y?.tbl_student?.st_surname,
        value: y?.tbl_student?.pk_student_key,
      }));
    const studentKeys =
      data?.student?.[0]?.value === 0
        ? studentDropDown.map(x => x.value)
        : data.student?.map(x => x.value);
    if (studentKeys?.length > 0 && !!data?.coin) {
      setIsAwardLoad(true);
      const payload = {
        students: studentKeys,
        coins_earned: +data?.coin,
        remarks: data?.reason?.trim() || "",
      };
      dispatch(setAwardCoins(payload)).then(res => {
        setIsAwardLoad(false);
        setModalForAward(false);
        setEndSession(true);
        setData({
          student: [],
          reason: "",
          coin: "",
        });
      });
    } else if (studentKeys?.length === 0) {
      toast.error("Please select student name ");
    } else if (!data?.coin) {
      toast.error("Please add coins ");
    }
  };

  return (
    <div className={styles.sessionDetailsMainContainer}>
      {/* header section */}
      {sessionSchedule ? <RescheduleHeaderSection /> : <HeaderSection />}
      {/* Sub title */}

      <Subtitle selected={+selected} setSelected={setSelected} />
      {!loading ? (
        <div className={styles.sessionDetailsContentSection}>
          {handleMainContent()}
        </div>
      ) : (
        <div className={styles.loader} />
      )}
      {/* Award session modal starts  */}
      <CommonModal
        closeModal={() => {
          setModalForAward(false);
          setData({
            student: [],
            coin: "",
            reason: "",
          });
        }}
        show={modalForAward}
        hide={() => {
          handleAddAward(data);
        }}
        title={"Award coin to"}
        modalBody={AddCoinSection(sessionData, setData, data)}
        btnPrimary={isAwardLoad ? "Adding..." : "Award"}
        isDisable={isAwardLoad}
      />
      <CommonModal
        closeModal={() => setEndSession(false)}
        show={!!endSession}
        hide={val => {
          setEndSession(false);
          if (val === 0) {
            navigate("/" + routesConstants.SESSION_PAGE);
          } else if (val === 1) {
            navigate("/" + routesConstants.DASHBOARD_PAGE);
            window.location.reload();
          }
        }}
        title={"Award coins to"}
        modalBody={AwardedCoinsSuccessModal()}
        footerClassName="flex flex-row justify-content-center"
        cancelBtn={"Back to session"}
        cancelBtnClassName="order-1"
        btnPrimary2ClassName="order-2"
        btnPrimary2={"Go to home"}
      />
      {/* Award session modal ends */}
      {/* End session modal starts  */}
      <CommonModal
        closeModal={() => setModalForEndSession(false)}
        show={modalForEndSession}
        hide={() => handleEndSession()}
        title={"End Session"}
        modalBody={
          <MainContentModal
            attendance={attendance}
            setAttendance={setAttendance}
            activityList={activityList}
            setActivityList={setActivityList}
          />
        }
        btnPrimary={"End Session"}
      />

      <CommonModal
        closeModal={() => setEndSessionModal(false)}
        show={endSessionModal}
        hide={val => {
          if (val === 0) {
            navigate("/" + routesConstants.DASHBOARD_PAGE);
            window.location.reload();
          } else if (val === 1) {
            navigate("/" + routesConstants.SESSION_PAGE);
          }
          setEndSessionModal(false);
          getValues();
        }}
        title={"Session ended"}
        modalBody={<EndSessionModal />}
        btnPrimary={"Go to home"}
        btnPrimary2={"Back to Session"}
      />
      {/* End session modal ends .. */}
      <StartSessionModal
        session_key={sessionData?.pk_ses_key}
        show={show}
        onHide={() => {
          setShow(false);
          getValues();
        }}
        title="Start session"
      />
    </div>
  );
};
export default SessionDetails;

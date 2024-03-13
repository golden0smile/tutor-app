import CommonModal from "components/CommonModal";
import { LeftCollapseIcon, RightArrow1 } from "constants/images";
import moment from "moment";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteActivity,
  editLessonPlanDetails,
  getPastSessions,
  getViewReport,
  handlePastSessionSortField,
  handlePastSessionSortOrder,
  previousPlanDetails,
  updateLessonDetails,
} from "../features/sessionSlice";
import ModalViewReport from "../components/ModalViewReport";
import ModalForStudentDetails from "../components/ModalforStudentDetails";
import SortTable from "../components/SortTable";
import styles from "./EditLessonPlan.module.scss";
import PastSessionItem from "../components/EditLesson/PastSessionItem";
import EditPlan from "../components/EditLesson/EditPlan";
import { getTime } from "../utils/Functions";
import { getDuration } from "modules/session/utils/getDuration";
import EditLessonHeader from "../components/EditLesson/EditLessonHeader";
import { getStudentStatus } from "../utils/getStudentStatus";
import { getHourMinis } from "modules/dashboard/utils/getHourMinis";
import queryString from "query-string";
import routesConstants from "routes/routesConstants";

const EditLessonPlan = () => {
  const [viewReport, setViewReport] = useState(false);
  const [modalForStudentDetails, setModalForStudentDetails] = useState(false);
  const [modalForViewPastLessons, setModalForViewPastLessons] = useState(false);
  const { editLessonPlan, previousPlan } = useSelector(state => state.session);
  const [typePlan, setTypePlan] = useState(0);
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({
    lesson_desc: "",
    homework_desc: "",
    lesson_sequential: true,
    homework_sequential: true,
  });
  const {
    pastSession,
    pastSession_sortOrder,
    pastSession_sortField,
    pastSessionLoading,
  } = useSelector(state => state.session.studentDetails);
  let navigate = useNavigate();
  const location = useLocation();

  const params = useParams();
  const dispatch = useDispatch();
  const query = useMemo(
    () => queryString?.parse(location.search) || {},

    [location.search],
  );

  const locationParams = location?.state || query;
  const handleActivityDelete = (lesson_key, activity_key) => {
    let act_list = [];
    act_list.push(activity_key);
    let values = {
      lesson_key: editLessonPlan?.pk_lesson_key,
      activities: act_list,
    };

    dispatch(deleteActivity(values)).then(res => {
      if (res?.payload?.statusCode === 200) {
        toast.success("Deleted Successfully");
        getValues();
        next ? handleSessionChange(2) : handleSessionChange(3);
      }
    });
  };
  const getValues = useCallback(() => {
    if (!!params && !!locationParams) {
      let values = {
        session_id: locationParams?.sessionId,
        student_id: locationParams?.studentId,
        // subject_id: +locationParams?.subjectId,
        type: 0,
      };
      dispatch(editLessonPlanDetails(values));
    }
  }, [dispatch, locationParams, params]);
  useEffect(() => {
    getValues();

    if (locationParams?.studentId) {
      const payload = {
        pk_student_key: locationParams?.studentId,
        sort_by: pastSession_sortField,
        sort_order: pastSession_sortOrder,
      };
      dispatch(getPastSessions(payload));
    }
  }, [getValues, pastSession_sortOrder, pastSession_sortField]);
  const handleRedirectFromPastLesson = data => {
    setModalForStudentDetails(false);
    setModalForViewPastLessons(false);
    navigate("/" + routesConstants.SESSION_PAGE + "/" + data.pk_ses_key);
  };
  const handleSessionChange = useCallback(
    type => {
      let values = {
        session_id: locationParams?.sessionId,
        student_id: locationParams?.studentId,
        // subject_id: +locationParams?.subjectId,
        type: type,
      };
      dispatch(previousPlanDetails(values)).then(res => {
        setNext(type === 2 ? true : false);
        setPrevious(type === 3 ? true : false);
      });
    },
    [dispatch, locationParams],
  );
  useEffect(() => {
    handleSessionChange(2);
  }, [handleSessionChange]);

  useEffect(() => {
    if (editLessonPlan) {
      setData({
        lesson_desc: editLessonPlan?.description
          ? editLessonPlan?.description
          : "",
        homework_desc: editLessonPlan?.homework_description
          ? editLessonPlan?.homework_description
          : "",
        lesson_sequential: Boolean(editLessonPlan?.is_lesson_sequential),
        homework_sequential: Boolean(editLessonPlan?.is_homework_sequential),
      });
    }
  }, [editLessonPlan]);
  const updateLessonDetailsEvent = () => {
    let values = {
      lesson_key: editLessonPlan?.pk_lesson_key,
      description: data?.lesson_desc,
      homework_description: data?.homework_desc,
      is_lesson_sequential: data?.lesson_sequential ? 1 : 0,
      is_homework_sequential: data?.homework_sequential ? 1 : 0,
      fk_sest_key: editLessonPlan?.fk_sest_key,
    };

    dispatch(updateLessonDetails(values)).then(res => {
      if (res?.payload?.statusCode === 200) {
        toast.success("Updated successfully");
        setUpdate(true);
      } else {
        toast.error("Something went wrong");
        setUpdate(false);
      }
    });
  };
  const handleReport = type => {
    type === 1 ? setTypePlan(0) : setTypePlan(1);
    let payload = {
      is_homework: type === 1 ? 0 : type === 2 && 1,
      lesson_key: previousPlan?.pk_lesson_key,
      student_key: previousPlan?.tbl_student?.pk_student_key,
    };

    previousPlan &&
      dispatch(getViewReport(payload)).then(res => {
        if (res?.payload?.statusCode === 200) {
          setViewReport(true);
        }
      });
  };
  const onTableChange = (type, { sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(handlePastSessionSortField(sortField));
        dispatch(handlePastSessionSortOrder(sortOrder));
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.editLessonPlanMainContainer}>
      <EditLessonHeader
        typePlan={locationParams?.typePlan}
        selectedTab={
          locationParams?.selectedTab || +locationParams?.selectedTabEditSession
        }
        setModalForStudentDetails={setModalForStudentDetails}
      />
      {editLessonPlan ? (
        <div className={styles.editLessonPlanContent}>
          {/* past session */}
          <div className={styles.editLessonPlanContentItem}>
            <div className={styles.editLessonPlanContentItemHeader}>
              <label className={styles.editLessonPlanContentItemHeaderLabel}>
                {previous ? "Next session" : "Past session"}
              </label>
              <div className={styles.editLessonPlanContentItemCalendar}>
                <img
                  onClick={() => handleSessionChange(2)}
                  alt="left-arrow-icon"
                  src={LeftCollapseIcon}
                  style={!previous ? { height: "0px", width: "0px" } : {}}
                />

                <label>
                  {previousPlan?.tbl_session?.ses_date
                    ? moment(previousPlan?.tbl_session?.ses_date).format(
                        "DD MMM YYYY",
                      )
                    : null}
                </label>

                <img
                  onClick={() => handleSessionChange(3)}
                  alt="right-arrow"
                  src={RightArrow1}
                  style={!next ? { height: "0px", width: "0px" } : {}}
                />
              </div>
              {previousPlan && (
                <Fragment>
                  {previousPlan?.tbl_student?.tbl_session_attendances?.length >
                    0 &&
                    getStudentStatus(
                      previousPlan?.tbl_student?.tbl_session_attendances[0]
                        ?.attendance_status,
                    )}

                  <div
                    className={styles.editLessonPlanSessionDetailsLeftSection}
                  >
                    <div
                      className={styles.editLessonPlanSessionDetailsSection1}
                    >
                      <label>
                        {previousPlan?.tbl_session?.tbl_session_time?.sest_name}
                      </label>
                      <p>
                        {previousPlan?.tbl_session?.tbl_session_time?.sest_type}
                      </p>
                    </div>
                    <div
                      className={styles.editLessonPlanSessionDetailsSection2}
                    >
                      <span id={styles.dateData}>
                        {previousPlan?.tbl_session?.ses_date
                          ? moment(previousPlan?.tbl_session?.ses_date).format(
                              "DD MMM YYYY",
                            )
                          : ""}{" "}
                        ({previousPlan?.tbl_session?.tbl_session_time?.sest_day}
                        )
                      </span>

                      <p>
                        {previousPlan?.tbl_session?.tbl_session_time
                          ?.sest_start_time
                          ? getTime(
                              previousPlan?.tbl_session?.tbl_session_time
                                ?.sest_start_time,
                            )
                          : ""}{" "}
                        -{" "}
                        {previousPlan?.tbl_session?.tbl_session_time
                          ?.sest_end_time
                          ? getTime(
                              previousPlan?.tbl_session?.tbl_session_time
                                ?.sest_end_time,
                            )
                          : ""}{" "}
                        (
                        {previousPlan?.tbl_session?.tbl_session_time
                          ?.sest_start_time &&
                        previousPlan?.tbl_session?.tbl_session_time
                          ?.sest_end_time
                          ? getHourMinis(
                              previousPlan?.tbl_session?.tbl_session_time
                                ?.sest_start_time,
                              previousPlan?.tbl_session?.tbl_session_time
                                ?.sest_end_time,
                            )
                          : "-"}{" "}
                        )
                      </p>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
            {previousPlan ? (
              <Fragment>
                <PastSessionItem
                  subject_id={locationParams?.subjectId}
                  title={"Lesson Plan"}
                  desc={previousPlan?.description}
                  activity_list={
                    previousPlan?.LessonActivities
                      ? previousPlan?.LessonActivities?.filter(
                          item => !item?.marked_for_homework,
                        )
                      : []
                  }
                  type={0}
                  duration={
                    previousPlan
                      ? getDuration(previousPlan?.totalLessonDuration)
                      : "-"
                  }
                  setViewReport={() => handleReport(1)}
                  locationParams={locationParams}
                  getValues={getValues}
                  yearId={editLessonPlan?.tbl_student?.st_year_level}
                  handleActivityDelete={(lesson_key, activity_key) =>
                    handleActivityDelete(lesson_key, activity_key)
                  }
                />
                <div className={styles.divider2}></div>
                <PastSessionItem
                  subject_id={locationParams?.subjectId}
                  setViewReport={() => handleReport(2)}
                  title={"Homework Plan"}
                  desc={previousPlan?.homework_description}
                  activity_list={
                    previousPlan?.LessonActivities
                      ? previousPlan?.LessonActivities?.filter(
                          item => item?.marked_for_homework,
                        )
                      : []
                  }
                  type={1}
                  duration={
                    previousPlan
                      ? getDuration(previousPlan?.totalHomeworkDuration)
                      : "-"
                  }
                  locationParams={locationParams}
                  getValues={getValues}
                  yearId={editLessonPlan?.tbl_student?.st_year_level}
                  handleActivityDelete={(lesson_key, activity_key) =>
                    handleActivityDelete(lesson_key, activity_key)
                  }
                />
              </Fragment>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "100px",
                }}
              >
                <label>Data not found</label>
              </div>
            )}
          </div>

          {!!data && (
            <EditPlan
              setUpdate={setUpdate}
              setBtnDisable={setBtnDisable}
              key={`lesson${editLessonPlan}`}
              data={data}
              location={location}
              navigate={navigate}
              setData={setData}
              title={"Lesson plan"}
              type={0}
              locationParams={locationParams}
              handleActivityDelete={(lesson_key, activity_key) =>
                handleActivityDelete(lesson_key, activity_key)
              }
              getValues={getValues}
              yearId={editLessonPlan?.tbl_student?.st_year_level}
            />
          )}
          {!!data && (
            <EditPlan
              setUpdate={setUpdate}
              setBtnDisable={setBtnDisable}
              key={`homework-${editLessonPlan}`}
              data={data}
              location={location}
              navigate={navigate}
              setData={setData}
              title={"Homework"}
              type={1}
              locationParams={locationParams}
              handleActivityDelete={(lesson_key, activity_key) =>
                handleActivityDelete(lesson_key, activity_key)
              }
              getValues={getValues}
              yearId={editLessonPlan?.tbl_student?.st_year_level}
            />
          )}
        </div>
      ) : (
        <div className={styles.loader} />
      )}
      <div className={styles.editLessonButtonGroup}>
        <button
          onClick={() =>
            navigate(
              "/" +
                routesConstants.SESSION_PAGE +
                "/" +
                editLessonPlan?.tbl_session?.pk_ses_key,
              {
                state: {
                  selectedTab:
                    locationParams?.selectedTab ||
                    +locationParams?.selectedTabEditSession,
                },
              },
            )
          }
          className={styles.OutlineButtonColored}
        >
          Back
        </button>

        {!update && editLessonPlan?.pk_lesson_key && (
          <button
            disabled={btnDisable}
            onClick={() => updateLessonDetailsEvent()}
            className={styles.buttonFillColored}
          >
            Update
          </button>
        )}
      </div>
      <CommonModal
        closeModal={() => setViewReport(false)}
        show={viewReport}
        title={"View Lesson Report"}
        hide={() => setViewReport(false)}
        modalBody={ModalViewReport()}
      />
      {modalForStudentDetails && (
        <ModalForStudentDetails
          student_key={editLessonPlan?.tbl_student?.pk_student_key}
          subject_id={
            Array.isArray(locationParams?.subjectId)
              ? locationParams?.subjectId
              : [+locationParams?.subjectId]
          }
          modalForViewPastLessons={modalForViewPastLessons}
          setModalForViewPastLessons={setModalForViewPastLessons}
          closeModal={setModalForStudentDetails}
        />
      )}
      <CommonModal
        closeModal={() => setModalForViewPastLessons(false)}
        show={modalForViewPastLessons}
        title={"View past sessions"}
        hide={() => setModalForViewPastLessons(false)}
        modalBody={SortTable(
          pastSession,
          onTableChange,
          pastSessionLoading,
          pastSession_sortField,
          pastSession_sortOrder,
          handleRedirectFromPastLesson,
        )}
      />
      <CommonModal
        show={viewReport}
        closeModal={() => setViewReport(false)}
        title={`View ${typePlan ? "homework" : "lesson"} report`}
        hide={() => setViewReport(false)}
        modalBody={ModalViewReport()}
      />
    </div>
  );
};
export default EditLessonPlan;

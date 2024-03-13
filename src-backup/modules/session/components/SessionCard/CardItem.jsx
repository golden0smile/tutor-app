import { bigProfileImage } from "constants/images";
import styles from "../SessionCard.module.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import PlanSection from "./PlanSection";
import { getSubStr, getTime } from "modules/session/utils/Functions";
import { getStudentStatus } from "modules/session/utils/getStudentStatus";
import ModalViewReport from "../ModalViewReport";
import CommonModal from "components/CommonModal";
import { useDispatch } from "react-redux";
import {
  getPastSessions,
  getViewReport,
  handlePastSessionSortField,
  handlePastSessionSortOrder,
} from "modules/session/features/sessionSlice";
import ModalForStudentDetails from "../ModalforStudentDetails";

import SortTable from "../SortTable";
import routesConstants from "routes/routesConstants";
import { useNavigate } from "react-router-dom";
import { getHourMinis } from "modules/dashboard/utils/getHourMinis";
const CardItem = props => {
  const { lessonPlan, isLoading } = useSelector(state => state.session);
  const {
    pastSession,
    pastSession_sortOrder,
    pastSession_sortField,
    pastSessionLoading,
  } = useSelector(state => state.session.studentDetails);
  const navigate = useNavigate();

  const [imgError, setImgError] = useState(false);
  const [viewReport, setViewReport] = useState(false);
  const [modalForStudentDetails, setModalForStudentDetails] = useState(false);
  const [modalForViewPastLessons, setModalForViewPastLessons] = useState(false);
  const [viewReportType, setViewReportType] = useState(0);
  // const [singleStudentData, setSingleStudentData] = useState("");

  const handleActivities = () => {
    let list = props?.activity_list ? [...props?.activity_list] : [];
    list =
      +props?.selectedTab === 1
        ? list?.filter(i => !i.marked_for_homework)
        : +props?.selectedTab === 2 && list?.filter(i => i.marked_for_homework);
    return list;
  };
  const dispatch = useDispatch();
  const handleReport = type => {
    setViewReportType(type);
    let payload = {
      is_homework: type,
      lesson_key: props?.lesson_key,
      student_key: props?.student_key,
    };
    lessonPlan &&
      dispatch(getViewReport(payload)).then(res => {
        if (res?.payload?.statusCode === 200) {
          setViewReport(true);
        }
      });
  };
  const handleStudentDetails = () => {
    setModalForStudentDetails(true);
    // setSingleStudentData(props);
    const payload = {
      pk_student_key: props?.student_key,
    };
    dispatch(getPastSessions(payload));
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
  const handleRedirectFromPastLesson = data => {
    setModalForStudentDetails(false);
    setModalForViewPastLessons(false);
    navigate("/" + routesConstants.SESSION_PAGE + "/" + data.pk_ses_key);
  };
  useEffect(() => {
    if (props?.student_key) {
      const payload = {
        pk_student_key: props?.student_key,
        sort_by: pastSession_sortField,
        sort_order: pastSession_sortOrder,
      };
      dispatch(getPastSessions(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastSession_sortOrder, pastSession_sortField, dispatch]);
  return (
    <div
      className={
        +props?.selectedTab === 3
          ? styles.sessionCardItem
          : styles.advSessionCardItem
      }
    >
      <div className={styles.sessionCardItemUser}>
        <div onClick={() => handleStudentDetails()} className={styles.user_v}>
          <img
            alt=""
            src={imgError ? bigProfileImage : props?.usericon}
            onError={() => {
              setImgError(true);
            }}
          />
          <span
            // style={{textOverflow:"ellipsis",width:'50px',whiteSpace:"nowrap"}}
            id={
              +props?.selectedTab !== 3
                ? styles.usernameOverFlowStyle
                : props?.attendance
                ? styles.usernameOverFlowStyle1
                : styles.usernameOverFlowStyle
            }
          >
            {props?.name} {props?.surname}
          </span>
        </div>
        {+props?.selectedTab === 3 && props?.attendance
          ? getStudentStatus(props?.attendance)
          : null}
      </div>
      {+props?.selectedTab === 3 && (
        <Fragment key={`header-${props?.id}`}>
          <div className={styles.sessionDetailsCardItemSessionNameDetails}>
            <div
              className={
                styles.sessionDetailsCardItemSessionNameDetailsSection1
              }
            >
              <label>{lessonPlan?.tbl_session_time?.sest_name}</label>
              <p>{lessonPlan?.tbl_session_time?.sest_type}</p>
            </div>
            <div
              className={
                styles.sessionDetailsCardItemSessionNameDetailsSection2
              }
              style={{ justifyContent: "flex-end" }}
            >
              <span>
                {lessonPlan?.ses_date
                  ? moment(lessonPlan?.ses_date).format("DD MMM YYYY")
                  : null}{" "}
                (
                {lessonPlan?.tbl_session_time?.sest_day
                  ? getSubStr(lessonPlan?.tbl_session_time?.sest_day)
                  : null}
                )
              </span>
              <p>
                {lessonPlan?.ses_start_time
                  ? getTime(lessonPlan?.ses_start_time)
                  : ""}
                -
                {lessonPlan?.ses_end_time
                  ? getTime(lessonPlan?.ses_end_time)
                  : ""}{" "}
                (
                {lessonPlan?.ses_start_time && lessonPlan?.ses_end_time
                  ? getHourMinis(
                      lessonPlan?.ses_start_time,
                      lessonPlan?.ses_end_time,
                    )
                  : "-"}
                )
              </p>
            </div>
          </div>
        </Fragment>
      )}

      {+props?.selectedTab === 3 ? (
        <Fragment key={props?.id}>
          <PlanSection
            handleActivityDelete={props?.handleActivityDelete}
            key={`lesson-${props?.id}`}
            type={0}
            props={props}
            setViewReport={() => handleReport(0)}
            activity_list={props?.activity_list?.filter(
              item => !item?.marked_for_homework,
            )}
          />
          <br></br>
          <PlanSection
            handleActivityDelete={props?.handleActivityDelete}
            key={`homework-${props?.id}`}
            type={1}
            props={props}
            setViewReport={() => handleReport(1)}
            activity_list={props?.activity_list?.filter(
              item => item?.marked_for_homework,
            )}
          />
        </Fragment>
      ) : (
        <PlanSection
          nextSessionKey={props?.nextSessionKey}
          handleActivityDelete={props?.handleActivityDelete}
          key={props?.id}
          type={+props?.selectedTab === 1 ? 0 : 1}
          activity_list={handleActivities()}
          setViewReport={() => handleReport(+props?.selectedTab === 1 ? 0 : 1)}
          props={props}
          offlineStatus={props?.offlineStatus}
          handleToggleSessionOffline={props?.handleToggleSessionOffline}
        />
      )}
      {viewReport ? (
        <CommonModal
          show={viewReport}
          closeModal={() => setViewReport(false)}
          title={`View ${+viewReportType ? "homework" : "lesson"} report`}
          hide={() => setViewReport(false)}
          modalBody={ModalViewReport()}
        />
      ) : null}
      {modalForStudentDetails && (
        <ModalForStudentDetails
          student_key={props?.student_key}
          subject_id={props?.subject_id}
          subjectName={props?.subjectName}
          modalForViewPastLessons={modalForViewPastLessons}
          setModalForViewPastLessons={setModalForViewPastLessons}
          closeModal={setModalForStudentDetails}
        />
      )}
      {modalForViewPastLessons ? (
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
      ) : null}
    </div>
  );
};

export default CardItem;

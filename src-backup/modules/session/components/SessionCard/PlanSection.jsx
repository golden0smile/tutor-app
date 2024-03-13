import { Clock, RandomizeIcon, SequentialIcon, coin } from "constants/images";
import ActivityCard from "../ActivityCard";
import { OutlineButton, Button } from "../Button";
import styles from "../SessionCard.module.scss";
import routesConstants from "routes/routesConstants";
import {
  Fragment,
  useCallback,
  //  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { getActivityStatus, getStatus } from "modules/session/utils/Functions";
import { getDuration } from "modules/session/utils/getDuration";
import Cookies, { cookieKeys } from "services/cookies";
import ConfirmPopup from "../ConfirmPopup";
import { useSelector } from "react-redux";
// import getExpectedCoinsForActiivty from "modules/session/utils/getExpectedCoinsForActivity";
import getExpectedCoinsForLesson from "modules/session/utils/getExpectedCoinsForLesson";
import getSubjectStatus from "utils/getSubjectStatus";
// const redirect =
//   "tutor.mygooroo.io/session/38djeeeioixiwi2p2;2lds8x8xusfkls;alds8ud?is_homework=0&sessionDetailedId=38djeeeioixiwi2p2;2lds8x8xusfkls;alds8ud&studentID=861e7b8f53d17632&subjectId=2&sessionId=38djeeeioixiwi2p2;2lds8x8xusfkls;alds8ud";

const PlanSection = ({
  type,
  props,
  activity_list,
  handleActivityDelete,
  setViewReport,
  handleToggleSessionOffline,
  nextSessionKey,
}) => {
  const [toggle, setToggle] = useState(0);
  const [show, setShow] = useState(false);
  const { lessonPlan } = useSelector(state => state.session);
  const navigate = useNavigate();

  const getDescription = () => {
    let desc =
      +props?.selectedTab === 1
        ? props?.description
        : +props?.selectedTab === 2
        ? props?.homework_description
        : +props?.selectedTab === 3 && type === 0
        ? props?.description
        : props?.homework_description;
    return desc;
  };

  const handlePreviewFromSessionDetails = (node_id, type, subjectId) => {
    const itemType =
      +type === 0
        ? "assessment"
        : +type === 1
        ? "videos"
        : +type === 5
        ? "worksheets"
        : +type === 3
        ? "link"
        : +type === 4
        ? "task"
        : +type === 2
        ? "diagnostic"
        : +type === 6
        ? "videos"
        : "";
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.SESSION_PAGE}/${props?.session_key}?sessionDetailedId=${props?.session_key}&selectedTab=${props?.selectedTab}`;
    const url =
      +type === 6
        ? `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${node_id}?type=${type}&subject_id=${subjectId}`
        : `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${node_id}`;
    const studentData = {
      studentID: props?.student_key,
      subjectID: +subjectId,
      isActivityPage: false,
      activityNodeId: node_id,
      redirectUrl: fullUrl,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
    };

    Cookies.setStudent(cookieKeys.STUDENT_DATA, JSON.stringify(studentData));
    console.log({ studentData, url });
    window.open(url, "_self");
  };

  const handleNavigationToEditLessonPlan = useCallback(
    typePlan => {
      props?.lesson_key
        ? navigate(
            `/${routesConstants.EDIT_LESSON_PLAN}/${props?.lesson_key}`,
            {
              state: {
                sessionId: props?.session_key,
                studentId: props?.student_key,
                // subjectId: props?.subject_id?.map(x => x?.fk_sub_id),
                subjectId: props?.subject_id,
                typePlan: typePlan,
                selectedTab: +props?.selectedTab,
              },
            },
          )
        : navigate(`/${routesConstants.EDIT_LESSON_PLAN}`, {
            state: {
              sessionId: props?.session_key,
              studentId: props?.student_key,
              // subjectId: props?.subject_id?.map(x => x?.fk_sub_id),
              subjectId: props?.subject_id,
              typePlan: typePlan,
              selectedTab: +props?.selectedTab,
            },
          });
    },
    [navigate, props],
  );

  const HandleButtonContainer = () => {
    // 0 = No activities ,-1 = offline lesson , 1 = All activities are completed , -2 = neither 1 nor 0
    let typePlan = {
      CREATE: "Create",
      EDIT: "Edit",
    };

    if (+props?.selectedTab === 1) {
      if (props?.code) {
        if (nextSessionKey) {
          return (
            <Button
              onButtonClick={() => {
                // localStorage.removeItem("sessionData");
                // localStorage.removeItem("sessionTabId");
                navigate(
                  "/" + routesConstants.SESSION_PAGE + "/" + nextSessionKey,
                );
              }}
              label={"Plan next session"}
            />
          );
        }
      } else if (props?.status === 1) {
        return (
          <Button
            onButtonClick={() =>
              handleNavigationToEditLessonPlan(typePlan.EDIT)
            }
            label={"Edit Lesson Plan"}
          />
        );
      } else if (props?.offlineStatus === 4) {
        return (
          <Button
            onButtonClick={() => {
              // handleToggleSessionOffline(0);
              setToggle(0);
              setShow(true);
            }}
            label="Switch to online lesson"
          />
        );
      } else if (props?.status === 0) {
        return (
          <Fragment key={props?.id}>
            {getSubjectStatus(props?.subject_id) && (
              <Button
                onButtonClick={() =>
                  handleNavigationToEditLessonPlan(typePlan.CREATE)
                }
                label={"Create Lesson Plan"}
              />
            )}
            <Button
              onButtonClick={() => {
                // handleToggleSessionOffline(1);
                setToggle(1);
                setShow(true);
              }}
              label="Switch to offline lesson"
            />
          </Fragment>
        );
      } else {
        return (
          <Button
            onButtonClick={() =>
              handleNavigationToEditLessonPlan(typePlan.EDIT)
            }
            label={"Edit Lesson Plan"}
          />
        );
      }
    } else if (+props?.selectedTab === 2) {
      if (props?.status === 1) {
        return (
          <Fragment key={props?.id}>
            <OutlineButton
              onButtonClick={() => setViewReport(true)}
              label="View homework report"
            />
            <Button
              onButtonClick={() =>
                handleNavigationToEditLessonPlan(typePlan.EDIT)
              }
              label="Edit homework plan"
            />
          </Fragment>
        );
      } else if (props?.status === 0) {
        return (
          getSubjectStatus(props?.subject_id) && (
            <Button
              onButtonClick={() =>
                handleNavigationToEditLessonPlan(typePlan.CREATE)
              }
              label="Create homework plan"
            />
          )
        );
      } else {
        return (
          <Button
            onButtonClick={() =>
              handleNavigationToEditLessonPlan(typePlan.EDIT)
            }
            label="Edit homework plan"
          />
        );
      }
    } else if (+props?.selectedTab === 3 && getStatus(activity_list) === 1) {
      return (
        <OutlineButton
          label={`View ${type ? "homework" : "lesson"} report`}
          onButtonClick={() => setViewReport(true)}
        />
      );
    } else {
      return null;
    }
  };
  const handleMarkView = (id, activityType, subjectId) => {
    const itemType =
      +activityType === 5
        ? "worksheets"
        : +activityType === 0
        ? "manual-marking"
        : "";
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.SESSION_PAGE}/${props?.session_key}?sessionDetailedId=${props?.session_key}&selectedTab=${props?.selectedTab}`;
    const url = `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${id}`;
    const studentData = {
      studentID: props?.student_key,
      subjectID: subjectId,
      redirectUrl: fullUrl,
      manual: true,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
    };
    Cookies.setStudent(cookieKeys.STUDENT_DATA, JSON.stringify(studentData));
    // console.log({ studentData, url });
    window.open(url, "_self");
  };

  return (
    <Fragment key={props?.id}>
      {+props?.selectedTab === 3 && (
        <label id={styles.titleSection}>
          {type ? "Homework" : "Lesson"} plan
        </label>
      )}
      {/* {getDescription() ? ( */}
      <div className={styles.sessionCardItemPara}>
        <p>{getDescription()}</p>
      </div>
      {/* ) : null} */}
      {getStatus(activity_list) === 0 && +props?.selectedTab === 3 ? null : (
        <div className={styles.sessionCardItemCoinDur}>
          <div>
            <img alt="coin-icon" src={coin} />
            <label style={{ fontSize: "12px" }}>
              {props?.activity_list?.length === 0
                ? "-"
                : [
                    getExpectedCoinsForLesson(props?.activity_list) === 0
                      ? 0
                      : `${props?.coins}/${getExpectedCoinsForLesson(
                          props?.activity_list,
                        )}`,
                  ]}
            </label>
          </div>
          <div>
            <img alt="clock-icon" src={Clock} />
            <label style={{ fontSize: "12px" }}>
              {props?.duration ? getDuration(props?.duration) : "-"}
            </label>
          </div>
        </div>
      )}
      <div className={styles.sessionCardItemStatus}>
        <label
          className={
            getStatus(activity_list) === 0
              ? styles.notCompleted
              : getStatus(activity_list) === 1
              ? styles.fullyCompleted
              : styles.partiallyCompleted
          }
        >
          {getActivityStatus(
            activity_list,
            +props?.selectedTab,
            lessonPlan?.ses_status,
          )}
        </label>
        {props?.is_lesson_sequential ? (
          <img alt="sequential-icon" src={SequentialIcon} />
        ) : (
          <img alt="sequential-icon" src={RandomizeIcon} />
        )}
      </div>
      <div key={props?.id} className={styles.sessionCardItemButtonContainer}>
        <HandleButtonContainer />
      </div>
      <div
        // style={
        //   props?.code && !nextSessionKey && +props?.selectedTab === 1
        //     ? { maxHeight: "calc(100% - 196px)" }
        //     : +props?.selectedTab === 2 && props?.status === 1
        //     ? { maxHeight: "calc(100% - 317px)" }
        //     : { maxHeight: "calc(100% - 262px)" }
        // }
        style={
          props?.code && !nextSessionKey && +props?.selectedTab === 1
            ? { maxHeight: "calc(100% - 149px)" }
            : +props?.selectedTab === 2 && props?.status === 1
            ? { maxHeight: "calc(100% - 269px)" }
            : { maxHeight: "calc(100% - 219px)" }
        }
        className={
          +props?.selectedTab === 3
            ? styles.sessionCardItemActivityCardSectionNoScroll
            : styles.sessionCardItemActivityCardSection
        }
      >
        {activity_list?.map((item, i) => {
          // !+props?.selectedTab === 3 &&
          // (totalCoins =
          //   totalCoins + item?.LessonActivityQuestions?.length * 2);

          return (
            <ActivityCard
              handleActivityDelete={handleActivityDelete}
              lesson_key={props?.lesson_key}
              // subject_id={props?.subject_id}
              subject_id={+item?.fk_sub_id}
              key={i}
              values={item}
              type={type}
              sessionID={props?.sessionId}
              studentID={props?.studentId}
              handlePreview={() => {
                handlePreviewFromSessionDetails(
                  item.pk_lesson_activity_key,
                  item?.activity_type,
                  +item?.fk_sub_id,
                );
              }}
              handleMarkView={() => {
                handleMarkView(
                  item.pk_lesson_activity_key,
                  item?.activity_type,
                  +item?.fk_sub_id,
                );
              }}
            />
          );
        })}
      </div>
      {show ? (
        <ConfirmPopup
          show={show}
          onConfirm={() => {
            handleToggleSessionOffline(toggle);
            setShow(false);
          }}
          onHide={() => setShow(false)}
          title={toggle ? "Switch to offline" : "Switch to online"}
          message={
            toggle
              ? "Do you want to switch the session to offline?"
              : "Do you want to switch the session to online?"
          }
        />
      ) : null}
    </Fragment>
  );
};
export default PlanSection;

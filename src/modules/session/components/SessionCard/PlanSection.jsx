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
import ConfirmPopup from "../Modals/ConfirmPopup";
import { useSelector } from "react-redux";
import getExpectedCoinsForLesson from "modules/session/utils/getExpectedCoinsForLesson";
import getSubjectStatus from "utils/getSubjectStatus";
import classNames from "classnames";
import { subjectName } from "constants/CustomTableConstant";

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
  const isDefer = props?.offlineStatus === 6;

  const getDescription = () => {
    let desc =
      +props?.selectedTab === 1
        ? props?.description
        : +props?.selectedTab === 2
        ? props?.homework_description
        : +props?.selectedTab === 3 && type === 0
        ? props?.description
        : props?.homework_description;
    if (desc) {
      return desc;
    } else {
      return false;
    }
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
        : +type === 7
        ? "lcms-worksheets"
        : "";

    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.SESSION_PAGE}/${props?.session_key}?sessionDetailedId=${props?.session_key}&selectedTab=${props?.selectedTab}`;
    const url =
      +type === 6
        ? `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${node_id}?type=${type}&subject_id=${subjectId}`
        : +type === 7
        ? `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${node_id}?subject_id=${subjectId}`
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
      if (isDefer) {
        if (nextSessionKey) {
          return (
            <Button
              onButtonClick={() => {
                navigate(
                  "/" + routesConstants.SESSION_PAGE + "/" + nextSessionKey,
                );
              }}
              label={"Plan next session"}
            />
          );
        }
      } else if (props?.code) {
        if (nextSessionKey) {
          return (
            <Button
              onButtonClick={() => {
                navigate(
                  "/" + routesConstants.SESSION_PAGE + "/" + nextSessionKey,
                );
              }}
              label={"Plan next session"}
            />
          );
        }
      } else if (props?.status === 1 && !isDefer) {
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
              setToggle(0);
              setShow(true);
            }}
            label="Switch to online lesson"
          />
        );
      } else if (props?.status === 0 && !isDefer) {
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
            {!isDefer && (
              <Button
                onButtonClick={() => {
                  setToggle(1);
                  setShow(true);
                }}
                label="Switch to offline lesson"
              />
            )}
          </Fragment>
        );
      } else {
        return (
          !isDefer && (
            <Button
              onButtonClick={() =>
                handleNavigationToEditLessonPlan(typePlan.EDIT)
              }
              label={"Edit Lesson Plan"}
            />
          )
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
            {!isDefer && (
              <Button
                onButtonClick={() =>
                  handleNavigationToEditLessonPlan(typePlan.EDIT)
                }
                label="Edit homework plan"
              />
            )}
          </Fragment>
        );
      } else if (props?.status === 0 && !isDefer) {
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
          !isDefer && (
            <Button
              onButtonClick={() =>
                handleNavigationToEditLessonPlan(typePlan.EDIT)
              }
              label="Edit homework plan"
            />
          )
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
        : +activityType === 7
        ? "lcms-worksheets"
        : "";
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.SESSION_PAGE}/${props?.session_key}?sessionDetailedId=${props?.session_key}&selectedTab=${props?.selectedTab}`;
    const url =
      +activityType === 7
        ? `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${id}?subject_id=${subjectId}`
        : `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${id}`;
    const studentData = {
      studentID: props?.student_key,
      subjectID: subjectId,
      redirectUrl: fullUrl,
      manual: true,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
    };
    Cookies.setStudent(cookieKeys.STUDENT_DATA, JSON.stringify(studentData));
    console.log({ studentData, url });
    window.open(url, "_self");
  };
  const getSubjectName = () => {
    const subjectNames = [
      ...new Set(
        props?.subject_id?.map(x =>
          +x === 1 ? subjectName.ENGLISH : +x === 2 ? subjectName.MATHS : "",
        ) || [],
      ),
    ]
      .sort()
      .join(" & ");
    return subjectNames;
  };

  return (
    <Fragment key={props?.id}>
      {+props?.selectedTab === 3 && (
        <label id={styles.titleSection}>
          {type ? "Homework" : "Lesson"} plan
        </label>
      )}
      <div
        className={classNames(styles.sessionCardItemPara, styles.subjectCard)}
      >
        <p className="mb-0">
          {/* <span className="fw-bold">Subject : </span> */}
          {getSubjectName()}
        </p>
      </div>

      <div className={styles.sessionCardItemPara}>
        <p>{getDescription()}</p>
      </div>

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
          {isDefer
            ? "Defer"
            : getActivityStatus(
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
        {!isDefer &&
          activity_list?.map((item, i) => {
            return (
              <ActivityCard
                handleActivityDelete={handleActivityDelete}
                lesson_key={props?.lesson_key}
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

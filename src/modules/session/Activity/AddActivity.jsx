/* eslint-disable react-hooks/exhaustive-deps */
import CommonModal from "components/CommonModal";
import useDebounced from "hooks/useDebounced";
import AddNewActivity from "modules/myLibrary/component/AddNewActivity";
import { addActivity } from "modules/myLibrary/features/myLibrarySlice";
import queryString from "query-string";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies, { cookieKeys } from "services/cookies";
import loader from "assets/gif/Rubik's cube.gif";

import routesConstants from "routes/routesConstants";
import {
  addUpdateActivity,
  getActivityCount,
  getActivityLevel,
  getActivityList,
  getDiagnosticsActivities,
  getLibraryActivityList,
  getVideoActivities,
  getWorksheetActivities,
  setSelectActivity,
} from "../features/sessionSlice";
import { combineRanges } from "../utils/coin";
import styles from "./AddActivity.module.scss";
import ActivityHeader from "./components/ActivityHeader";
import ActivityRightBar from "./components/ActivityRightBar";
import AssessmentTab from "./components/Assesment/AssessmentTab";
import DiagnosticItemTable from "./components/Diagnostic/DiagnosticItemTable";
import LibraryItemTable from "./components/Library/LibraryItemTable";
import VideoItemTable from "./components/Lcms-video/VideoItemTable";
import {
  DiagnosticsHeaderOptions,
  LibraryItemHeaderOptions,
  VideoHeaderOptions,
  WorksheetHeaderOptions,
  // otherResponse,
  tabsOptions,
} from "./constants/ActivityConstants";
import WorksheetItemTable from "./components/Worksheet-lcms/WorksheetItemTable";
import { ArraysAreEqual } from "./utils/ArraysAreEqual";
import { useSelector } from "react-redux";

const allLevel = [
  {
    label: "All",
    value: 0,
  },
];

const initialActivity = {
  subject: "",
  topic: "",
  activity_type: "",
  activity_name: "",
  source: "",
  duration: "",
  file: "",
  link: "",
  video: "",
};
const errorInitialValue = {
  library_item_id: 0,
  subject: false,
  topic: false,
  activity_type: false,
  activity_name: false,
  source: false,
  duration: false,
  file: false,
  link: false,
  video: false,
};

const AddActivity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedData = localStorage.getItem("selectedData");
  const query = useMemo(
    () => queryString?.parse(location.search) || {},

    [location.search],
  );
  const {
    sessionID = "",
    studentID = "",
    is_homework = 0, // 0= lesson plan 1= home work
    subjectID = [1],
    yearID = 2,
    typePlan = "",
    topicId = 0,
    selectedTabEditSession = 1,
    isReschedule = false,
    lesson_key = "",
  } = location?.state || query;

  const activityCount = useSelector(state => state.session?.activityCount);
  const [isLoad, setIsLoad] = useState(false);
  const [isDisabledSubject, setIsDisabledSubject] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounced(search?.trim());
  const [selectedTab, setSelectedTab] = useState(
    query?.tabNumber ? +query?.tabNumber : 1,
  );
  const [selectedData, setSelectedData] = useState([]);
  const [lessonKey, setLessonKey] = useState("");
  const [subject, setSubject] = useState();
  const [status, setStatus] = useState("all");
  const [levelData, setLevelData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [response, setResponse] = useState([]);
  const [data, setData] = useState([]);
  const [LibraryData, setLibraryData] = useState([]);
  const [workSheetData, setWorkSheetData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [activityModal, setActivityModal] = useState(false);
  const [errorValues, setErrorValues] = useState(errorInitialValue);
  const [values, setValues] = useState(initialActivity);

  const fetchActivityLevel = () => {
    const levelPayload = {
      subject_id: subject,
      student_key: studentID ? studentID : "",
    };
    dispatch(getActivityLevel(levelPayload)).then(res => {
      setLevelData(
        res?.payload?.data?.activityLevels.map(x => ({
          label: x?.level_name,
          value: x?.activity_level_id,
        })) || [],
      );
    });
  };

  const fetchAssessmentData = useCallback(async () => {
    setIsDataLoad(true);
    const payload = {
      is_homework: +is_homework,
      subject_id: subject,
      activity_level_id: selectedLevel,
      student_key: studentID ? studentID : "",
      session_key: sessionID ? sessionID : "",
      attended: status === "all" ? "" : status, // 1 = filter by attended and 0 = filter by unattended
      search: debounceSearch,
    };
    dispatch(getActivityList(payload)).then(res => {
      setResponse(res?.payload?.activities);
      setData(res?.payload?.activities);
      setLessonKey(res?.payload?.pk_lesson_key);
      setIsDataLoad(false);
    });
  }, [
    debounceSearch,
    dispatch,
    is_homework,
    selectedLevel,
    sessionID,
    studentID,
    subject,
    status,
  ]);

  const fetchWorksheetData = useCallback(async () => {
    setIsDataLoad(true);
    const payload = {
      is_homework: +is_homework,
      subject_id: subject,
      activity_level_id: selectedLevel,
      student_key: studentID ? studentID : "",
      session_key: sessionID ? sessionID : "",
      attended: status === "all" ? "" : status, // 1 = filter by attended and 0 = filter by unattended
      search: debounceSearch,
      // is_homework: 0,
      // subject_id: 2,
      // activity_level_id: 0,
      // student_key: "3E2B24B76FDEEC42",
      // session_key: "090580B9642E285E",
      // attended: "1",
      // search: "",
    };

    dispatch(getWorksheetActivities(payload)).then(res => {
      setResponse(res?.payload?.data);
      setWorkSheetData(res?.payload?.data);
      setIsDataLoad(false);
    });
  }, [
    debounceSearch,
    dispatch,
    is_homework,
    selectedLevel,
    sessionID,
    studentID,
    subject,
    status,
  ]);

  const fetchVideoData = useCallback(async () => {
    setIsDataLoad(true);
    const payload = {
      is_homework: +is_homework,
      subject_id: subject,
      activity_level_id: selectedLevel,
      student_key: studentID ? studentID : "",
      session_key: sessionID ? sessionID : "",
      attended: status === "all" ? "" : status, // 1 = filter by attended and 0 = filter by unattended
      search: debounceSearch,
    };

    dispatch(getVideoActivities(payload)).then(res => {
      setResponse(res?.payload?.activities);
      setVideoData(res?.payload?.activities);
      setIsDataLoad(false);
    });
  }, [
    debounceSearch,
    dispatch,
    is_homework,
    selectedLevel,
    sessionID,
    studentID,
    subject,
    status,
  ]);

  const handleAutoSelected = useCallback(
    initialSelected => {
      const isAlready = selectedData?.find(
        x =>
          ArraysAreEqual(x?.id, initialSelected?.id) &&
          x?.topicID === initialSelected?.topicID,
      );
      if (isAlready) {
        return false;
      } else {
        setSelectedData(prev => [...prev, initialSelected]);
      }
    },
    [selectedData],
  );

  const fetchDiagnosticActivities = useCallback(async () => {
    setIsDataLoad(true);
    let payload = {
      is_homework: +is_homework,
      subject_id: subject,
      activity_level_id: selectedLevel,
      student_key: studentID ? studentID : "",
      session_key: sessionID ? sessionID : "",
      attended: status === "all" ? "" : status,
      search: debounceSearch,
    };

    dispatch(getDiagnosticsActivities(payload)).then(res => {
      setIsDataLoad(false);
      res?.payload?.activities?.forEach(x =>
        x?.topics?.forEach(y => {
          const qnsIds =
            +subject === 1
              ? y?.activity_master_topic?.activity_level_has_topic_nodes?.flatMap(
                  x =>
                    x?.activity_node?.english_diagnostic_question_activities?.flatMap(
                      d => d?.english_diagnostic?.diagnostic_id,
                    ),
                )
              : y?.activity_master_topic?.activity_level_has_topic_nodes?.flatMap(
                  x =>
                    x?.activity_node?.diagnostic_question_activities?.flatMap(
                      d => d?.diagnostic?.diagnostic_id,
                    ),
                );
          if (y.checkmark === 1) {
            const initialSelected = {
              id: qnsIds,
              name: y?.activity_master_topic?.topic_name,
              type: 2,
              duration: qnsIds?.length * 1 + " mins",
              coin: qnsIds?.length * 2,
              topicID: y?.activity_master_topic?.activity_topic_id,
              subject_id: +subject,
            };
            handleAutoSelected(initialSelected);
          }
        }),
      );
    });
  }, [selectedTab, subject, debounceSearch, dispatch, status, selectedLevel]);

  const fetchLibraryActivities = useCallback(async () => {
    setIsDataLoad(true);
    const payload = {
      subjectFilter: subject,
      statusFilter: status === "all" ? "" : status, // 1 = filter by attended and 0 = filter by unattended
      search: debounceSearch,
    };
    dispatch(getLibraryActivityList(payload)).then(res => {
      setLibraryData(res?.payload?.data?.activityData);
      setIsDataLoad(false);
    });
  }, [debounceSearch, dispatch, status, subject]);

  const fetchData = useCallback(() => {
    switch (selectedTab) {
      case 1:
        fetchAssessmentData();
        break;
      case 2:
        fetchDiagnosticActivities(selectedData);
        break;
      case 3:
        fetchVideoData();
        break;
      case 4:
        fetchLibraryActivities();
        break;
      case 5:
        fetchWorksheetData();
        break;
      default:
        break;
    }
  }, [
    selectedTab,
    fetchAssessmentData,
    fetchLibraryActivities,
    fetchDiagnosticActivities,
  ]);

  const handleSearch = useCallback(e => {
    const { value } = e.target;
    setSearch(value);
  }, []);

  const handelTab = useCallback(value => {
    setSelectedTab(value);
  }, []);

  const handleSubject = useCallback(
    option => {
      setSubject(+option.value);
    },
    [response],
  );

  const handleStatus = useCallback(
    option => {
      setStatus(option.value);
    },
    [response],
  );

  const handleLevel = useCallback(
    option => {
      setSelectedLevel(option.value);
    },
    [response],
  );

  const handleAddSelected = useCallback(
    (option, subject_id) => {
      const countExceed = activityCount + selectedData?.length;
      if (countExceed >= 20) {
        toast.error(
          "A lesson plan can only contain a maximum of 20 activities.",
        );
      } else {
        localStorage.setItem("sessionID", sessionID);
        localStorage.setItem("studentID", studentID);
        localStorage.setItem("isHomeWork", is_homework);
        if ([1, 2, 3, 4, 5, 6, 7].includes(option.type)) {
          setSelectedData([
            ...selectedData,

            {
              ...option,
              subject_id: subject_id,
              is_homework: is_homework,
            },
          ]);

          //for keep the value while preview
          const dataToStore = JSON.stringify([
            ...selectedData,
            {
              ...option,
              subject_id: subject_id,
              is_homework: is_homework,
            },
          ]);
          localStorage.setItem("selectedData", dataToStore);
        } else {
          dispatch(
            setSelectActivity({
              activity_node_id: option.id,
              subject_id: subject_id,
            }),
          ).then(res => {
            if (res?.payload?.statusCode === 200) {
              let condition = false;
              if (subject_id === 1) {
                condition =
                  res?.payload?.data?.nodeActivityData?.english?.length > 0;
              } else if (subject_id === 2) {
                condition =
                  res?.payload?.data?.nodeActivityData?.maths?.length > 0;
              }
              if (condition) {
                const arr = [res?.payload?.data?.nodeActivityData?.duration];
                setSelectedData([
                  ...selectedData,
                  {
                    ...option,
                    duration: combineRanges(arr),
                    coin: res?.payload?.data?.nodeActivityData?.coins,
                    subject_id: subject_id,
                    is_homework: is_homework,
                  },
                ]);

                //for keep the value while preview
                const dataToStore = JSON.stringify([
                  ...selectedData,
                  {
                    ...option,
                    duration: combineRanges(arr),
                    coin: res?.payload?.data?.nodeActivityData?.coins,
                    subject_id: subject_id,
                    is_homework: is_homework,
                  },
                ]);
                localStorage.setItem("selectedData", dataToStore);
              } else {
                toast.warning(
                  "Selected activity does not have any question...",
                );
              }
            }
          });
        }
      }
    },
    [selectedData, activityCount],
  );

  const handleRemoveSelected = useCallback(
    option => {
      const dataToStore = selectedData.filter(data => {
        return !(data.id === option.id && data?.topicID === option?.topicID);
      });
      setSelectedData(dataToStore);
      localStorage.setItem("selectedData", JSON.stringify(dataToStore));
    },
    [selectedData],
  );

  const handleSubmitAddActivity = useCallback(() => {
    const countExceed = activityCount + selectedData?.length;
    if (countExceed >= 20) {
      toast.error("A lesson plan can only contain a maximum of 20 activities.");
    } else {
      setIsLoad(true);
      const activityDetails = selectedData.map(x => ({
        activity_node_id: x.id,
        type: x.type, // Type of activity
        topic_id: x.topicID, //parent topic id
        pk_lesson_activity_key: x?.pk_lesson_activity_key
          ? x?.pk_lesson_activity_key
          : "",
        subject_id: x?.subject_id,
        is_homework: +is_homework,
      }));
      const payload = {
        // subject_id: subject,
        student_key: studentID,
        session_key: sessionID,
        lesson_key: lessonKey,
        activities: activityDetails,
        is_homework: +is_homework,
      };
      dispatch(addUpdateActivity(payload)).then(res => {
        setIsLoad(false);
        if (res?.payload?.statusCode === 200) {
          handleGoBack();
          toast.success("Activities updated successfully...");
        }
      });
    }
  }, [selectedData, activityCount]);

  const isValidUrl = urlString => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i",
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };
  const validate = () => {
    if (!values?.subject) {
      setErrorValues(prev => ({
        ...prev,
        subject: true,
      }));
      return false;
    } else if (!values?.activity_type?.value) {
      setErrorValues(prev => ({
        ...prev,
        activity_type: true,
      }));

      return false;
    } else if (!values?.activity_name) {
      setErrorValues(prev => ({
        ...prev,
        activity_name: true,
      }));

      return false;
    } else if (!values?.duration?.value) {
      setErrorValues(prev => ({
        ...prev,
        duration: true,
      }));
      return false;
    } else if (values?.activity_type?.value === 5 && !values?.file) {
      setErrorValues(prev => ({
        ...prev,
        file: true,
      }));
      return false;
    } else if (values?.activity_type?.value === 3 && !values?.link) {
      setErrorValues(prev => ({
        ...prev,
        link: true,
      }));
      return false;
    } else if (values?.activity_type?.value === 1 && !values?.video) {
      setErrorValues(prev => ({
        ...prev,
        video: true,
      }));
      return false;
    } else if (
      values?.activity_type?.value === 3 &&
      !isValidUrl(values?.link)
    ) {
      setErrorValues(prev => ({
        ...prev,
        linkValid: true,
      }));
      return false;
    } else if (
      values?.activity_type?.value === 1 &&
      !isValidUrl(values?.video)
    ) {
      setErrorValues(prev => ({
        ...prev,
        linkValid: true,
      }));
      return false;
    } else {
      return true;
    }
  };

  const handleActivitySubmit = () => {
    setErrorValues(errorInitialValue);
    if (validate()) {
      let payload = {
        library_item_id: 0,
        subject_id: values?.subject,
        topic_id: 0,
        activity_type: values?.activity_type?.value,
        activity_name: values?.activity_name,
        source: values?.source,
        duration: values?.duration?.value,
        link:
          values?.activity_type?.value === 5
            ? values?.file
            : values?.activity_type?.value === 3
            ? values?.link
            : values?.activity_type?.value === 1
            ? values?.video
            : "",
      };
      dispatch(addActivity(payload)).then(res => {
        if (res?.payload?.statusCode === 200) {
          toast.success("Upload successfully");
          setActivityModal(false);
          setValues(initialActivity);
          setErrorValues(errorInitialValue);
          fetchLibraryActivities();
        } else {
          toast.error("Something went wrong");
        }
      });
    }
  };

  const handlePreviewAssessment = (id, topicID, yearLevelId) => {
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.ADD_ACTIVITY}?is_homework=${is_homework}&sessionID=${sessionID}&studentID=${studentID}&subjectID=${subject}&typePlan=${typePlan}&yearID=${yearLevelId}&tabNumber=${selectedTab}&selectedTabEditSession=${selectedTabEditSession}&topicId=${topicID}&isReschedule=${isReschedule}&lesson_key=${lesson_key}`;
    const url = `${process.env.REACT_APP_STUDENT_APP_URL}/assessment/${id}`;
    const studentData = {
      subjectID: subject,
      isActivityPage: true,
      activityNodeId: id,
      redirectUrl: fullUrl,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
    };

    Cookies.setStudent(cookieKeys.STUDENT_DATA, JSON.stringify(studentData));
    window.open(url, "_self");
    console.log({ studentData, url });
  };

  const handlePreviewLibrary = (id, type, topicID, yearLevelId = 0) => {
    const itemType =
      +type === 1
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
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.ADD_ACTIVITY}?is_homework=${is_homework}&sessionID=${sessionID}&studentID=${studentID}&subjectID=${subject}&yearID=${yearLevelId}&typePlan=${typePlan}&tabNumber=${selectedTab}&selectedTabEditSession=${selectedTabEditSession}&topicId=${topicID}&isReschedule=${isReschedule}&lesson_key=${lesson_key}`;
    const url =
      +type === 6
        ? `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${id}?type=${type}&subject_id=${subject}`
        : +type === 7
        ? `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${id}?subject_id=${subject}`
        : `${process.env.REACT_APP_STUDENT_APP_URL}/${itemType}/${id}`;
    const studentData = {
      sessionID: sessionID,
      studentID: studentID,
      is_homework: is_homework,
      subjectID: subject,
      isActivityPage: true,
      activityNodeId: id,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
      redirectUrl: fullUrl,
      topic_id: topicID,
    };
    Cookies.setStudent(cookieKeys.STUDENT_DATA, JSON.stringify(studentData));
    console.log({ studentData, url });
    window.open(url, "_self");
  };

  const handleGoBack = () => {
    localStorage.removeItem("selectedData");
    localStorage.removeItem("sessionID");
    localStorage.removeItem("studentID");
    localStorage.removeItem("isHomeWork");
    navigate("/" + routesConstants.EDIT_LESSON_PLAN, {
      state: {
        sessionId: sessionID,
        studentId: studentID,
        is_homework: is_homework,
        subjectId: subjectID,
        typePlan: typePlan,
        selectedTabEditSession: +selectedTabEditSession,
        isReschedule: isReschedule,
      },
    });
  };
  const handleSubjectIds = (value, isPrev = false) => {
    if (value?.length > 0) {
      if (value?.length === 2) {
        setSubject(1);
      } else {
        // const subValue = isPrev ? value : values?.map(x => x?.fk_sub_id);
        const subValue = value;
        const id = subValue.toString();
        if ([1, 2].includes(+id)) {
          setSubject(+id);
          setIsDisabledSubject(true);
        } else {
          setSubject(1);
          setIsDisabledSubject(false);
        }
      }
    }
  };

  const handleActivityCount = () => {
    const key = lesson_key;
    dispatch(
      getActivityCount({
        lesson_key: key,
        session_key: sessionID,
        student_key: studentID,
        type: 0,
      }),
    );
    // .then(res => {
    //   if (res?.payload?.statusCode === 200) {
    //     setActivityCount(res?.payload?.data?.activityCount);
    //   }
    // });
  };

  useEffect(() => {
    if (Array.isArray(subjectID)) {
      handleSubjectIds(subjectID);
    } else {
      //at the tme of come back form preview we get subject as a string
      handleSubjectIds([+subjectID], true);
    }
  }, [subjectID]);

  useEffect(() => {
    setSearch("");
    setSelectedLevel(0);
    // setSubject(subject);
    setStatus("all");
  }, [selectedTab]);

  useEffect(() => {
    if (subject) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    fetchActivityLevel();
  }, [subject]);

  useEffect(() => {
    const localSessionId = localStorage.getItem("sessionID");
    const localStudentId = localStorage.getItem("studentID");
    const localHomeWork = localStorage.getItem("isHomeWork");
    handleActivityCount();

    if (
      storedData &&
      localSessionId === sessionID &&
      localStudentId === studentID &&
      +localHomeWork === +is_homework
    ) {
      const selectedDataFromStorage = JSON.parse(storedData);
      if (selectedDataFromStorage) {
        setSelectedData(selectedDataFromStorage);
      }
    }
  }, [storedData]);

  return (
    <div className={styles.activityMainSection}>
      <div className={styles.addActivitySection}>
        <ActivityHeader
          search={search}
          subject={subject}
          status={status}
          level={selectedLevel}
          levelData={[...allLevel, ...levelData]}
          isLibrary={selectedTab === 4 ? true : false}
          handleSearch={handleSearch}
          handleSubject={handleSubject}
          handleStatus={handleStatus}
          handleLevel={handleLevel}
          isDisable={isDisabledSubject}
        />
        <div className={styles.containerSection}>
          <div className={styles.wrapper}>
            <div className={styles.tabsWrapper}>
              <div className={styles.navTabs}>
                {tabsOptions?.map(option => (
                  <div
                    key={option?.id}
                    onClick={() => {
                      handelTab(option?.id);
                    }}
                    className={
                      selectedTab === option?.id
                        ? styles.selectedTab
                        : styles.tab
                    }
                  >
                    {option?.name}
                  </div>
                ))}
              </div>
              {selectedTab === 4 ? (
                <button
                  className={styles.addActivityButton}
                  onClick={() => setActivityModal(true)}
                >
                  Add new
                </button>
              ) : null}
            </div>
            {isDataLoad ? (
              // <div className={styles.loader}>
              <img src={loader} className={styles.loaders} alt="" />
            ) : // </div>
            selectedTab === 1 ? (
              <AssessmentTab
                data={data}
                handleSelected={handleAddSelected}
                selectedData={selectedData}
                handlePreviewAssessment={handlePreviewAssessment}
                yearID={yearID}
                topicId={+topicId}
                search={search}
              />
            ) : selectedTab === 3 ? (
              <VideoItemTable
                headers={VideoHeaderOptions}
                data={videoData}
                handleSelected={handleAddSelected}
                selectedData={selectedData}
                yearID={yearID}
                topicId={+topicId}
                handlePreviewLibrary={handlePreviewLibrary}
              />
            ) : selectedTab === 4 ? (
              <LibraryItemTable
                data={LibraryData}
                handleSelected={handleAddSelected}
                headers={LibraryItemHeaderOptions}
                selectedData={selectedData}
                handlePreviewLibrary={handlePreviewLibrary}
                topicId={+topicId}
                subjectID={subject}
              />
            ) : selectedTab === 2 ? (
              <DiagnosticItemTable
                headers={DiagnosticsHeaderOptions}
                handleSelected={handleAddSelected}
                selectedData={selectedData}
                handlePreviewAssessment={handlePreviewAssessment}
                yearID={yearID}
                topicId={+topicId}
                handlePreviewLibrary={handlePreviewLibrary}
                subjectID={subject}
                search={search}
              />
            ) : selectedTab === 5 ? (
              <WorksheetItemTable
                headers={WorksheetHeaderOptions}
                data={workSheetData}
                handleSelected={handleAddSelected}
                selectedData={selectedData}
                yearID={yearID}
                topicId={+topicId}
                handlePreviewLibrary={handlePreviewLibrary}
              />
            ) : null}
          </div>
        </div>
      </div>

      <ActivityRightBar
        // key={selectedData}
        selectedData={selectedData}
        handlerRemove={handleRemoveSelected}
        handleSubmit={handleSubmitAddActivity}
        isLoad={isLoad}
        isDisable={selectedData?.length === 0}
        handleGoBack={handleGoBack}
      />

      <CommonModal
        show={activityModal}
        closeModal={() => {
          setActivityModal(false);
          setValues(initialActivity);
          setErrorValues(errorInitialValue);
        }}
        hide={() => handleActivitySubmit()}
        title={"Add New Activity"}
        modalBody={AddNewActivity({
          values: values,
          setValues: setValues,
          subject_id: +subject,
          isDisabledSubject: isDisabledSubject,
          errorValues: errorValues,
          setErrorValues: setErrorValues,
          isValidUrl: isValidUrl,
        })}
        btnPrimary={"Add"}
      />
    </div>
  );
};

export default AddActivity;

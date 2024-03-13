import { useCallback, useEffect, useState } from "react";
import styles from "./ModalForStudentDetails.module.scss";
import ReportListing from "../StudentDetails/ReportListing";
import ReportDetails from "../StudentDetails/ReportDetails";
import { student } from "../../constants/Data";
import { useDispatch } from "react-redux";
import {
  allTopicDetailsBySubject,
  getStudentDetails,
  getStudentNotes,
  getTutorReportListData,
  reportDetailsIncludingGraphChart,
} from "../../features/sessionSlice";
import { useSelector } from "react-redux";
import StudentDetailsComponent from "../StudentDetails/StudentDetailsComponent";
import { subjectName } from "constants/CustomTableConstant";
const ModalForStudentDetails = ({
  closeModal,
  setModalForViewPastLessons,
  student_key,
  subject_id,
  subjectName,
  session,
}) => {
  const [tabSelected, setTabSelected] = useState(1);
  const [reportListing, setReportListing] = useState(false);
  const [reportDetails, setReportDetails] = useState(false);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [masteryLevel, setMasteryLevel] = useState();
  const [loading, setLoading] = useState(true);
  const [activityTopicId, setActivityTopicId] = useState(null);
  const dispatch = useDispatch();
  const { studentDetails } = useSelector(state => state.session);
  const tabs = [
    {
      id: 1,
      name: student.NOTES,
    },
    {
      id: 2,
      name: student.REPORT,
    },
    {
      id: 3,
      name: student.CONTACT,
    },
  ];

  // const subjectNames = [
  //   ...new Set(
  //     subject_id?.map(x =>
  //       +x === 1 ? subjectName.ENGLISH : subjectName.MATHS,
  //     ) || [],
  //   ),
  // ].toString();

  const handleReportSection = () => {
    let payload = {
      pk_student_key: student_key,
      subject_key: subject_id,
      parent_key: studentDetails?.student?.tbl_parstu_relation?.fk_parent_key,
    };

    dispatch(getTutorReportListData(payload));
  };
  const handleTabListing = id => {
    setTabSelected(id);
    if (id === 1) {
      handleNotesListing();
    }
    if (id === 2) {
      handleReportSection();
    }
  };
  const handleReportListing = (level, masteryScore) => {
    if (level) {
      setSelectedLevel(level);
    } else {
      setSelectedLevel("");
    }
    if (masteryScore !== undefined || masteryScore !== null) {
      setMasteryLevel(masteryScore);
    } else {
      setMasteryLevel();
    }
    setLoading(true);
    let payload = {
      subject_id: subject_id,
      pk_student_key: student_key,
      masteryScoreFilter: [0, 1, 2, 3]?.includes(masteryScore)
        ? [masteryScore]
        : [],
      primaryFilter: level ? [level] : [],
    };
    dispatch(allTopicDetailsBySubject(payload)).then(res => {
      if (res?.payload?.statusCode === 200) {
        setLoading(false);
      }
    });
    setReportListing(true);
  };
  const handleReportDetails = (activity_id, filterContent = "") => {
    // setLoading(true)
    activity_id && setActivityTopicId(activity_id);
    let payload = {
      subject_id: Array.isArray(subject_id) ? subject_id[0] : +subject_id,
      pk_student_key: student_key,
      activity_topic_id: activity_id ? activity_id : activityTopicId,
      filter: filterContent,
    };
    dispatch(reportDetailsIncludingGraphChart(payload)).then(res => {
      setReportDetails(true);
      setLoading(false);
    });
  };
  const handleStudentDetails = useCallback(() => {
    setLoading(true);
    let payload = {
      pk_student_key: student_key,
    };
    dispatch(getStudentDetails(payload));
  }, [setLoading, dispatch, student_key]);
  const handleNotesListing = useCallback(() => {
    let payload = {
      pk_student_key: student_key,
    };
    dispatch(getStudentNotes(payload));
  }, [dispatch, student_key]);
  useEffect(() => {
    if (student_key) {
      handleStudentDetails();
      handleNotesListing();
    }
  }, [handleStudentDetails, handleNotesListing, student_key]);
  const handleContent = () => {
    if (reportDetails) {
      return (
        <ReportDetails
          onFilter={c => handleReportDetails(null, c)}
          loading={loading}
          setLoading={setLoading}
          subject_id={subject_id}
          subjectName={subjectName}
          onClickBack={() => setReportDetails(false)}
        />
      );
    } else if (reportListing) {
      return (
        <ReportListing
          handleReportListing={handleReportListing}
          loading={loading}
          setLoading={setLoading}
          levels={levels}
          setLevels={setLevels}
          masteryLevel={masteryLevel}
          setMasteryLevel={e => handleReportListing(selectedLevel, e)}
          selectedLevel={selectedLevel}
          setSelectedLevel={e => handleReportListing(e, masteryLevel)}
          subject_id={subject_id}
          subjectName={subjectName}
          onClickTopic={activity_id => handleReportDetails(activity_id)}
          onClickBack={() => setReportListing(false)}
        />
      );
    } else if (studentDetails?.student) {
      return (
        <StudentDetailsComponent
          onClickTopic={activity_id => handleReportDetails(activity_id)}
          session={session}
          student_key={student_key}
          handleNotesListing={handleNotesListing}
          closeModal={closeModal}
          handleReportListing={handleReportListing}
          handleTabListing={handleTabListing}
          loading={loading}
          masteryLevel={masteryLevel}
          selectedLevel={selectedLevel}
          setLoading={setLoading}
          setModalForViewPastLessons={setModalForViewPastLessons}
          setReportDetails={setReportDetails}
          tabSelected={tabSelected}
          tabs={tabs}
          subject_id={subject_id}
          subjectName={subjectName}
        />
      );
    } else {
      return <div className={styles?.loader} />;
    }
  };
  return (
    <div className={styles.modalStudentMainContainer}>
      <div className={styles.modalStudentContainer}>{handleContent()}</div>
    </div>
  );
};
export default ModalForStudentDetails;

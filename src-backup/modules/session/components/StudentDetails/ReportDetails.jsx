import styles from "../ModalForStudentDetails.module.scss";
import { LineChart } from "modules/session/chart/LineChart";
import {
  Close1,
  QuestionMark,
  SessionLeftArrowIcon,
  arrowDown,
  arrowUp,
} from "constants/images";
import { useSelector } from "react-redux";
import { Fragment, forwardRef, useEffect, useState } from "react";
import { getSubjectName } from "modules/session/utils/getSubjectName";
import moment from "moment";
import { subjectName } from "constants/CustomTableConstant";
import CustomDatePicker from "components/CommonDatePicker/CustomDatePicker";
import { FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ReportDetails = ({
  onClickBack,
  loading,
  setLoading,
  subject_id,
  onFilter,
}) => {
  const [isDateShow, setIsDateShow] = useState(false);
  const [initialDate, setInitialDate] = useState(null);
  const { studentDetails } = useSelector(state => state.session);
  const subjectNames = [
    ...new Set(
      subject_id?.map(x =>
        +x === 1 ? subjectName.ENGLISH : +x === 2 ? subjectName.MATHS : "",
      ) || [],
    ),
  ].toString();
  // const subjectNames = [...new Set(subjectName?.map(x => x) || [])].toString();
  useEffect(() => {
    if (studentDetails?.graphDetails) {
      setLoading(false);
    }
  }, [studentDetails, setLoading]);
  const getMasteryScoreStatus = () => {
    let status = "";
    if (studentDetails?.graphDetails?.graphData?.length > 0) {
      let currentMonth = moment().format("M");
      if (currentMonth !== 1) {
        let previousMonth = currentMonth - 1;
        let scoreCurrentMonth = 0;
        let scorePreviousMonth = 0;
        let scoreArrayCurrentMonth = studentDetails?.graphDetails?.graphData
          ?.filter(i => moment(i?.date)?.format("M") === currentMonth)
          ?.map(i1 => i1?.masteryScore);
        scoreArrayCurrentMonth?.map((i, k) => {
          if (i && i > scoreCurrentMonth) {
            scoreCurrentMonth = i;
          }
          return {};
        });
        let scoreArrayPreviousMonth = studentDetails?.graphDetails?.graphData
          ?.filter(i => moment(i?.date)?.format("M") === previousMonth)
          ?.map(i1 => i1?.masteryScore);
        scoreArrayPreviousMonth?.map((i, k) => {
          if (i && i > scorePreviousMonth) {
            scorePreviousMonth = i;
          }
          return {};
        });
        let diff = scoreCurrentMonth - scorePreviousMonth;

        if (diff > 0) {
          status = (
            <label>
              <span id={styles?.label0}>
                <img alt="" src={arrowUp} />
                {Math.floor(diff)}{" "}
              </span>{" "}
              in the past month
            </label>
          );
        } else {
          status = (
            <label>
              <span id={styles?.label2}>
                <img alt="" src={arrowDown} />
                {Math.floor(diff)}{" "}
              </span>{" "}
              in the past month
            </label>
          );
        }
      }
    }
    return status;
  };
  const CustomInputFunction = forwardRef(({ value, onClick }, ref) => (
    <div
      style={{ cursor: "pointer" }}
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
    >
      <label
        style={{ cursor: "pointer" }}
        className={styles.reportDetailsTitle1}
      >
        {initialDate ? moment(initialDate).format("MMM yyyy") : "Past 6 months"}{" "}
        {"  "}
      </label>
      <FaChevronDown
        style={{ marginLeft: "10px", marginRight: "10px" }}
        color="#4d4d4d"
        fontSize={12}
      />
    </div>
  ));
  return (
    <div className={styles.reportListingMainContainer}>
      <div className={styles.reportListingHeaderSection}>
        <div className={styles.reportListingBackButton}>
          <img
            onClick={() => onClickBack()}
            alt=""
            src={SessionLeftArrowIcon}
          />
          <label>Back</label>
        </div>
        <img onClick={() => onClickBack()} src={Close1} alt="" />
      </div>
      {!loading ? (
        <div className={styles.reportDetailsContainer}>
          <label className={styles.reportDetailsTitle1}>
            {subjectNames}
            {subjectNames ? "•" : ""}
            {studentDetails?.graphDetails?.level_name}
          </label>
          <label className={styles.reportDetailsTitle2}>
            {studentDetails?.graphDetails?.topic_name}
          </label>
          <label className={styles.reportDetailsTitle3}>
            Questions Completed
          </label>
          <label className={styles.reportDetailsTitle4}>
            {studentDetails?.graphDetails?.totalQuestionAttempt
              ? studentDetails?.graphDetails?.totalQuestionAttempt
              : 0}
          </label>

          <div className={styles.reportDetailsGraphContainer}>
            <div className={styles.reportDetailsGraphHead}>
              <label className={styles.reportDetailsTitle5}>
                Mastery score over time
              </label>
              <img src={QuestionMark} alt="" />
            </div>
            <label className={styles.reportDetailsTitle2}>
              {studentDetails?.graphDetails?.masteryOverTime
                ? Math.floor(studentDetails?.graphDetails?.masteryOverTime)
                : null}
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label className={styles.reportDetailsTitle1}>
                {getMasteryScoreStatus()}
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <DatePicker
                  selected={initialDate}
                  onChange={e => {
                    setIsDateShow(false);
                    setInitialDate(e);
                    onFilter(e ? moment(e).format("M-yyyy") : "");
                  }}
                  showMonthYearPicker
                  customInput={<CustomInputFunction />}
                  isClearable={true}
                />
              </div>
            </div>
            {studentDetails?.graphDetails?.graphData?.length > 0 ? (
              <LineChart
                initialDate={initialDate}
                graphData={studentDetails?.graphDetails?.graphData}
              />
            ) : (
              <div>No graph data </div>
            )}
          </div>

          <br></br>
          {/* <label className={styles.reportDetailsTitle5}>Curriculum</label>
          <label className={styles.reportDetailsTitle4}>
            Numbers up to 10000
          </label>

          <List>
            <li className={styles.reportDetailsTitle4}>
             
              Numbers up to 10,000 a number notation and place values
              (thousands, hundreds, tens, ones)
            </li>
            <li className={styles.reportDetailsTitle4}>
             
              reading and writing numbers in numerals and in words
            </li>
            <li className={styles.reportDetailsTitle4}>
             
              comparing and ordering numbers
            </li>
            <li className={styles.reportDetailsTitle4}>
             
              odd and even numbers number patterns.
            </li>
          </List>
          <label className={styles.reportDetailsTitle4}>
            Addition and Subtraction
          </label>
          <List>
            <li className={styles.reportDetailsTitle4}>
              addition and subtraction of numbers up to 4 digits
            </li>
            <li className={styles.reportDetailsTitle4}>
              use of the terms 'sum' and 'difference'{" "}
            </li>
            <li className={styles.reportDetailsTitle4}>
              solving up to 2-step word problems involving addition and
              subtraction
            </li>
          </List>
          <label className={styles.reportDetailsTitle4}>
            Level 2 topic name
          </label>
          <List>
            <li className={styles.reportDetailsTitle4}>
              Level 3 topic name / Skill
            </li>
            <li className={styles.reportDetailsTitle4}>
              Level 3 topic name / Skill
            </li>
            <li className={styles.reportDetailsTitle4}>
              Level 3 topic name / Skill
            </li>
            <li className={styles.reportDetailsTitle4}>
              Level 3 topic name / Skill
            </li>
          </List> */}
        </div>
      ) : (
        <div className={styles.loader} />
      )}
    </div>
  );
};
export default ReportDetails;

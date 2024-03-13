import styles from "../Modals/ModalForStudentDetails.module.scss";
import { LineChart } from "modules/session/chart/LineChart";
import {
  Close1,
  QuestionMark,
  SessionLeftArrowIcon,
  arrowDown,
  arrowUp,
} from "constants/images";
import { useSelector } from "react-redux";
import { forwardRef, useEffect, useState } from "react";
import moment from "moment";
import { subjectName } from "constants/CustomTableConstant";
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
  const [initialDate, setInitialDate] = useState(null);
  const { studentDetails } = useSelector(state => state.session);
  const subjectNames = [
    ...new Set(
      subject_id?.map(x =>
        +x === 1 ? subjectName.ENGLISH : +x === 2 ? subjectName.MATHS : "",
      ) || [],
    ),
  ].toString();
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
                    setInitialDate(e);
                    onFilter(e ? moment(e).format("MM-YYYY") : "");
                  }}
                  showMonthYearPicker
                  customInput={<CustomInputFunction />}
                  isClearable={true}
                />
              </div>
            </div>
            {studentDetails?.graphDetails?.graphData?.length > 0 &&
            window?.ResizeObserver ? (
              <LineChart
                initialDate={initialDate}
                graphData={studentDetails?.graphDetails?.graphData}
              />
            ) : (
              <div>No graph data </div>
            )}
          </div>

          <br></br>
        </div>
      ) : (
        <div className={styles.loader} />
      )}
    </div>
  );
};
export default ReportDetails;

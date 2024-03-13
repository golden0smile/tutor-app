import { checkMark } from "constants/images.js";
import styles from "./ModalForEndSession.module.scss";
import { Fragment } from "react";
import CustomSelect from "components/CommonDropDown";
import { useSelector } from "react-redux";
import { handleEndDuration } from "../../utils/getDuration";

const attendanceList = [
  {
    id: 1,
    label: "Attended",
    value: "Attended",
  },
  {
    id: 2,
    label: "Not attended",
    value: "Not attended",
  },
];
const MainContentModal = ({
  activityList = [],
  setActivityList,
  attendance = [],
  setAttendance,
}) => {
  const { sessionStudents } = useSelector(state => state.session);

  const handleSelectChange = (e, student_key) => {
    let v = {
      student_key: student_key,
      attendance_id: e.id,
    };
    let arr = [...attendance];
    let arr1 = arr.find(i => i.student_key === student_key);

    if (arr1) {
      arr1.attendance_id = e.id;
    } else {
      arr.push(v);
    }
    setAttendance(arr);
  };
  const getStudentAttendStatus = student_key => {
    let array = attendance?.find(i => i.student_key === student_key);
    if (array) {
      let a = attendanceList?.find(i => i.id === array?.attendance_id);
      return a.value;
    } else {
      return "";
    }
  };

  const getCheckedStatus = student_key => {
    let arr = [...activityList];
    let arr1 = arr.find(i => i === student_key);
    if (arr1) {
      return true;
    } else {
      return false;
    }
  };
  const handleActivityList = (student_key, activities) => {
    let arr = [...activityList];
    let arr1 = arr.find(i => i.student_key === student_key);
    if (arr1) {
      arr.pop(arr1);
    } else {
      arr.push({ student_key: student_key, activities: activities });
    }
    setActivityList(arr);
  };
  return (
    <div>
      <div className={styles.modalBody}>
        <div className={styles.modalTableColumnsSection}>
          <div className={styles.modalTable}>
            <div className={styles.modalTableTitle}>
              <div className={styles.modalTableTitleItem}>
                <label>Name</label>
              </div>
              <div className={styles.modalTableTitleItem}>
                <label>Attendance</label>
              </div>
              <div className={styles.modalTableTitleItem}>
                <label>Move to homework</label>
              </div>
            </div>
            {sessionStudents?.tbl_session_time?.tbl_student_enrolments?.map(
              (item, i) => {
                return (
                  <div key={i} className={styles.modalTableTitle1}>
                    <div className={styles.modalTableTitleItem}>
                      <label>
                        {item?.tbl_student?.st_first_name}{" "}
                        {item?.tbl_student?.st_surname}
                      </label>
                    </div>
                    <div className={styles.modalTableTitleItem}>
                      <CustomSelect
                        value={getStudentAttendStatus(
                          item?.tbl_student?.pk_student_key,
                        )}
                        handleChange={e =>
                          handleSelectChange(
                            e,
                            item?.tbl_student?.pk_student_key,
                          )
                        }
                        list={attendanceList}
                      />
                    </div>
                    <div className={styles.modalTableTitleItem}>
                      {item?.tbl_student?.LessonActivities?.length === 0 ? (
                        <Fragment>
                          <label>all activities completed</label>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <input
                            onChange={() =>
                              handleActivityList(
                                item?.tbl_student?.pk_student_key,
                                item?.tbl_student?.LessonActivities,
                              )
                            }
                            value={getCheckedStatus(
                              item?.tbl_student?.pk_student_key,
                            )}
                            type="checkbox"
                          />{" "}
                          <label>
                            {" "}
                            {item?.tbl_student?.LessonActivities?.length}{" "}
                            incomplete activities
                          </label>
                        </Fragment>
                      )}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const EndSessionModal = () => {
  const { endSessionDuration } = useSelector(state => state.session);

  return (
    <div>
      <div className={styles.modalContainerTickSection}>
        <img src={checkMark} alt="" />
      </div>
      <center>
        <label>
          Total time : {handleEndDuration(endSessionDuration?.session_duration)}
        </label>
      </center>
      <br></br>
    </div>
  );
};

export { MainContentModal, EndSessionModal };

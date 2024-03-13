import styles from "../components/SessionCard.module.scss";
import { studentStatus } from "../constants/Data";
export const getStudentStatus = status => {
  let title = "";
  let color = "";
  if (status === 0) {
    title = studentStatus.UPCOMING.name;
    color = studentStatus.UPCOMING.color;
  } else if (status === 1) {
    title = studentStatus.ONGOING.name;
    color = studentStatus.ONGOING.color;
  } else if (status === 2) {
    title = studentStatus.ATTENDED.name;
    color = studentStatus.ATTENDED.color;
  } else if (status === 3) {
    title = studentStatus.MISSED.name;
    color = studentStatus.MISSED.color;
  } else if (status === 4) {
    title = studentStatus.CANCEL.name;
    color = studentStatus.CANCEL.color;
  }
  return (
    <div
      style={{ backgroundColor: color, width: "fit-content" }}
      className={styles.sessionCardItemAttendedStatus}
    >
      <label style={{ color: "#ffffff", width: "100%", fontSize: "10px" }}>
        {title}
      </label>
    </div>
  );
};

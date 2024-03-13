import { useSelector } from "react-redux";
import styles from "../../pages/EditLessonPlan.module.scss";
import { getSubStr, getTime } from "modules/session/utils/Functions";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { bigProfileImage, leftIcon } from "constants/images";
import { getHourMinis } from "modules/dashboard/utils/getHourMinis";
import routesConstants from "routes/routesConstants";

const EditLessonHeader = ({
  setModalForStudentDetails,
  typePlan,
  selectedTab,
}) => {
  const { editLessonPlan } = useSelector(state => state.session);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className={styles.editLessonPlanContainerHeader}>
        <div className={styles.editLessonPlanContainerHeaderLeftSection}>
          <img
            onClick={() =>
              navigate(
                "/" +
                  routesConstants.SESSION_PAGE +
                  "/" +
                  editLessonPlan?.tbl_session?.pk_ses_key,
                {
                  state: {
                    selectedTab: selectedTab,
                  },
                },
              )
            }
            alt="left-icon"
            src={leftIcon}
          />
          <div className={styles.editLessonPlanSessionNameContainer}>
            <label>{typePlan} Session Plan</label>
            <span>
              {editLessonPlan?.tbl_session?.tbl_session_time?.sest_type}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.editLessonPlanSessionDetails}>
        <div className={styles.editLessonPlanSessionDetailsLeftSection}>
          <div className={styles.editLessonPlanSessionDetailsSection1}>
            <label>
              {editLessonPlan?.tbl_session?.tbl_session_time?.sest_name}
            </label>
            <p>{editLessonPlan?.tbl_session?.tbl_session_time?.sest_type}</p>
          </div>
          <div
            id={styles.Sec2}
            className={styles.editLessonPlanSessionDetailsSection2}
          >
            <span>
              {moment(editLessonPlan?.tbl_session?.ses_date).format(
                "DD MMM YYYY",
              )}{" "}
              (
              {editLessonPlan?.tbl_session?.tbl_session_time?.sest_day
                ? getSubStr(
                    editLessonPlan?.tbl_session?.tbl_session_time?.sest_day,
                  )
                : "-"}
              )
            </span>

            <p>
              {editLessonPlan?.tbl_session?.ses_start_time
                ? getTime(editLessonPlan?.tbl_session?.ses_start_time)
                : ""}{" "}
              -{" "}
              {editLessonPlan?.tbl_session?.ses_end_time
                ? getTime(editLessonPlan?.tbl_session?.ses_end_time)
                : ""}{" "}
              (
              {editLessonPlan?.tbl_session?.ses_start_time &&
              editLessonPlan?.tbl_session?.ses_end_time
                ? getHourMinis(
                    editLessonPlan?.tbl_session?.ses_start_time,
                    editLessonPlan?.tbl_session?.ses_end_time,
                  )
                : "-"}
              )
            </p>
          </div>
        </div>
        <div
          onClick={() => setModalForStudentDetails(true)}
          style={{ cursor: "pointer" }}
          className={styles.editLessonPlanSessionDetailsLeftSection}
        >
          <img
            alt="user-icon"
            src={
              imgError
                ? bigProfileImage
                : editLessonPlan?.tbl_student?.st_avatar
            }
            onError={() => {
              setImgError(true);
            }}
          />
          <div className={styles.editLessonPlanSessionDetailsSection2}>
            <label style={{ cursor: "pointer" }}>
              {editLessonPlan?.tbl_student?.st_first_name}{" "}
              {editLessonPlan?.tbl_student?.st_surname}
            </label>
            <p>
              {editLessonPlan?.tbl_student?.st_year_level} .{" "}
              {editLessonPlan?.tbl_student?.tbl_school?.sc_name}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EditLessonHeader;

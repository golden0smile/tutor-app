import { IconBack, ModalClose, bigProfileImage } from "constants/images";
import styles from "../ModalForStudentDetails.module.scss";
import ContactSection from "./ContactSection";
import NotesSection from "./NotesSection";
import ReportSection from "./ReportSection";
import { getHourMinis } from "modules/dashboard/utils/getHourMinis";
import { getTime } from "modules/session/utils/Functions";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getSubjectName } from "modules/session/utils/getSubjectName";
import { subjectName } from "constants/CustomTableConstant";
const StudentDetailsComponent = ({
  setLoading,
  loading,
  tabSelected,
  setReportDetails,
  masteryLevel,
  selectedLevel,
  handleReportListing,
  handleTabListing,
  tabs,
  setModalForViewPastLessons,
  closeModal,
  student_key,
  handleNotesListing,
  subject_id,
  // subjectName,
  session,
  onClickTopic,
}) => {
  const { studentDetails } = useSelector(state => state.session);

  let data = studentDetails?.student;
  const [imgError, setImgError] = useState(false);
  const subjectNames = [
    ...new Set(
      subject_id?.map(x =>
        +x === 1 ? subjectName.ENGLISH : +x === 2 ? subjectName.MATHS : "",
      ) || [],
    ),
  ].toString();

  // const subjectNames = [...new Set(subjectName?.map(x => x) || [])].toString();

  return (
    <div>
      <div className={styles.modalStudentHeader}>
        <div className={styles.modalStudentHeaderIcon}>
          <img
            src={imgError ? bigProfileImage : data?.st_avatar}
            onError={() => {
              setImgError(true);
            }}
            alt=""
          />
        </div>
        <div className={styles.modalStudentHeaderName}>
          <label id={styles.name}>
            {data?.st_first_name} {data?.st_surname}
          </label>
          <label id={styles.level}>
            {data?.activity_level?.level_name}{" "}
            {data?.activity_level?.level_name ? "•" : ""}{" "}
            {data?.tbl_school?.sc_name}
          </label>
          <label id={styles.level2}>
            Student ID {data?.pk_student_id} {data?.pk_student_id ? "•" : ""}
            {data?.next_session?.tbl_session_time?.tbl_student_enrolments[0]
              ?.enrol_start_date
              ? ` Joined ${moment(
                  data?.next_session?.tbl_session_time
                    ?.tbl_student_enrolments[0]?.enrol_start_date,
                ).format("DD MMM YYYY")}`
              : null}
          </label>
        </div>
        <div className={styles.modalStudentHeaderClose}>
          <img onClick={() => closeModal(false)} src={ModalClose} alt="" />
        </div>
      </div>
      {data?.next_session ? (
        <div className={styles.modalStudentHeaderSectionContent}>
          {/* <div class'> */}
          <label id={styles.label1}>Next session</label>
          {/* </div> */}
          <div className={styles.modalStudentHeaderSectionContentDetails1}>
            <div
              className={styles.modalStudentHeaderSectionContentDetails1Item1}
            >
              <label>
                {data?.next_session?.ses_date
                  ? moment(data?.next_session?.ses_date).format("DD")
                  : null}
              </label>
              <label>
                {data?.next_session?.ses_date
                  ? moment(data?.next_session?.ses_date).format("MMM")
                  : null}
              </label>
            </div>
            <div
              className={styles.modalStudentHeaderSectionContentDetails1Item2}
            >
              <label>
                {data?.next_session?.ses_start_time
                  ? getTime(data?.next_session?.ses_start_time)
                  : null}{" "}
                -{" "}
                {data?.next_session?.ses_end_time
                  ? getTime(data?.next_session?.ses_end_time)
                  : null}
                (
                {data?.next_session?.ses_start_time &&
                data?.next_session?.ses_end_time
                  ? getHourMinis(
                      data?.next_session?.ses_start_time,
                      data?.next_session?.ses_end_time,
                    )
                  : null}
                )
              </label>
              <label>
                <b>{data?.next_session?.tbl_session_time?.sest_name}</b>
              </label>
              <label>
                {/* {data?.next_session?.type}.{getSubjectName(subject_id)}. */}
                {data?.next_session?.type}.{subjectNames}.
                {data?.next_session?.total_students} students
              </label>
            </div>
          </div>
          {data?.next_session?.activity_counts ? (
            <label id={styles.label1}>
              {data?.next_session?.activity_counts} activities assigned
            </label>
          ) : (
            <label id={styles.label2}>No activities assigned</label>
          )}
        </div>
      ) : null}

      <div className={styles.modalStudentHeaderSectionContent1}>
        <label>View past lessons</label>
        <img
          onClick={() => setModalForViewPastLessons(true)}
          src={IconBack}
          alt=""
        />
      </div>
      {/* notes , report and contacts section */}
      <div className={styles.modalStudentSubHeaderSection}>
        {tabs?.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => handleTabListing(item?.id)}
              className={
                tabSelected === item?.id
                  ? styles.modelStudentSubHeaderItemSelected
                  : styles.modelStudentSubHeaderItem
              }
            >
              {item?.name}
            </div>
          );
        })}
      </div>
      <div className={styles.modelStudentSubSection}>
        {/* Notes section */}
        {tabSelected === 1 && (
          <NotesSection
            session={session}
            student_key={student_key}
            handleNotesListing={handleNotesListing}
          />
        )}
        {tabSelected === 2 && (
          <ReportSection
            setReportListing={() =>
              handleReportListing(selectedLevel, masteryLevel)
            }
            setReportDetails={setReportDetails}
            onClickTopic={onClickTopic}
            subject_id={subject_id}
          />
        )}
        {tabSelected === 3 && (
          <ContactSection loading={loading} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
};
export default StudentDetailsComponent;

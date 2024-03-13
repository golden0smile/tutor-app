import { useSelector } from "react-redux";
import styles from "../ModalForStudentDetails.module.scss";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addLessonNotesDetails,
  getDeleteNotes,
} from "modules/session/features/sessionSlice";
import moment from "moment";
import { getSubStr, getTime } from "modules/session/utils/Functions";
import { toast } from "react-toastify";
import { closeIcon } from "constants/images";
import DeleteModal from "modules/myLibrary/component/DeleteModal";

const NotesSection = ({ student_key, handleNotesListing, session }) => {
  const { studentDetails, lessonPlan } = useSelector(state => state.session);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  let intialData = {
    session: lessonPlan?.pk_ses_key,
    student_key: student_key,
    note: "",
  };
  const [data, setData] = useState(intialData);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const dispatch = useDispatch();

  const handleNotes = () => {
    if (data?.note && data?.session && data?.student_key) {
      let payload = {
        pk_student_key: data?.student_key,
        pk_ses_key: data?.session,
        notes_details: data?.note,
        pk_notes_key: data?.notes_key,
      };
      dispatch(addLessonNotesDetails(payload)).then(res => {
        if (res?.payload?.statusCode === 200) {
          // if (!data?.notes_key) {
          //   toast.success("Note updated");
          // } else {
          //   toast.success("Note added");
          // }
          setData(intialData);
          handleNotesListing();
        }
      });
    }
  };
  const handleDeleteNotes = () => {
    if (deleteId) {
      let payload = {
        pk_notes_key: deleteId,
      };
      dispatch(getDeleteNotes(payload)).then(res => {
        if (res?.payload?.statusCode === 200) {
          setShow(false);
          toast.success("Deleted");
          handleNotesListing();
        }
      });
    } else {
      setShow(false);
    }
  };
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleNotes();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, data?.note]);
  }
  const NotesConfirmAlert = id => {
    setShow(true);
    setDeleteId(id);
  };
  return (
    <div className={styles.modelStudentSubSectionNotesContainer}>
      {!session ? (
        <Fragment>
          <label>Lesson Notes</label>
          <p>Add lesson notes for this session</p>
          <textarea
            ref={wrapperRef}
            placeholder="Notes"
            rows={5}
            onChange={e =>
              setData(prev => ({
                ...prev,
                note: e.target.value,
              }))
            }
            value={data?.note}
          ></textarea>{" "}
        </Fragment>
      ) : null}

      {!session && studentDetails?.notes?.LessonNotes ? (
        <div className={styles.modelStudentSubSectionNotesSection}>
          {studentDetails?.notes?.LessonNotes?.map((item, key) => {
            return (
              <div
                onClick={() =>
                  setData(prev => ({
                    ...prev,
                    session: item?.tbl_session?.tbl_session_time?.pk_sest_key,
                    notes_key: item?.pk_notes_key,
                    note: item?.notes_details,
                  }))
                }
                style={{ position: "relative" }}
                key={key}
                className={styles.modelStudentSubSectionNotesItem}
              >
                <div className={styles.modelStudentSubSectionNotesItem1}>
                  <label>
                    {item?.tbl_session?.ses_date
                      ? moment(item?.tbl_session?.ses_date).format(
                          "DD MMM YYYY",
                        )
                      : null}
                    (
                    {item?.tbl_session?.tbl_session_time?.sest_day
                      ? getSubStr(item?.tbl_session?.tbl_session_time?.sest_day)
                      : null}
                    )
                  </label>
                  <p>
                    {item?.tbl_session?.ses_start_time
                      ? getTime(item?.tbl_session?.ses_start_time)
                      : null}{" "}
                    -{" "}
                    {item?.tbl_session?.ses_end_time
                      ? getTime(item?.tbl_session?.ses_end_time)
                      : null}
                  </p>
                  <p>{item.tbl_session.tbl_session_time.sest_name}</p>
                  <span>{item?.name}</span>
                </div>
                <div className={styles.modelStudentSubSectionNotesItem2}>
                  <p>{item?.notes_details}</p>
                </div>
                <div
                  onClick={() => NotesConfirmAlert(item?.pk_notes_key)}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    cursor: "pointer",
                  }}
                >
                  <img alt="" src={closeIcon} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.modelStudentSubSectionNotesItem}>
          <span style={{ fontSize: "10px" }}>No Lesson Notes</span>
        </div>
      )}

      <label>Other Notes</label>
      {studentDetails?.notes?.otherNotes?.length > 0 ? (
        <div className={styles.modelStudentSubSectionNotesSection}>
          {studentDetails?.notes?.otherNotes?.map((item, key) => {
            return (
              <div key={key} className={styles.modelStudentSubSectionNotesItem}>
                <div className={styles.modelStudentSubSectionNotesItem1}>
                  <label>
                    {item?.tbl_session?.ses_date
                      ? moment(item?.tbl_session?.ses_date).format(
                          "DD MMM YYYY",
                        )
                      : null}
                    (
                    {item?.tbl_session?.tbl_session_time?.sest_day
                      ? getSubStr(item?.tbl_session?.tbl_session_time?.sest_day)
                      : null}
                    )
                  </label>
                  <p>{item?.tbl_session?.tbl_session_time?.sest_name}</p>
                </div>
                <div className={styles.modelStudentSubSectionNotesItem2}>
                  <p>{item?.notes_details}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.modelStudentSubSectionNotesSection}>
          <span style={{ fontSize: "10px", padding: "10px" }}>No Data</span>
        </div>
      )}

      <label>Goals</label>
      {studentDetails?.notes?.goalNotes?.length > 0 ? (
        <div className={styles.modelStudentSubSectionNotesSection}>
          {studentDetails?.notes?.goalNotes?.map((item, key) => {
            return (
              <div key={key} className={styles.modelStudentSubSectionNotesItem}>
                <div className={styles.modelStudentSubSectionNotesItem1}>
                  <p>{item?.notes_details}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.modelStudentSubSectionNotesSection}>
          <span style={{ fontSize: "10px", padding: "10px" }}>No Data</span>
        </div>
      )}
      <DeleteModal
        show={show}
        onHide={() => setShow(false)}
        deleteConfirmation={() => {
          handleDeleteNotes();
          setShow(false);
        }}
        msg="Do you want to delete this note?"
        // isLoad={deleteModal?.isLoad}
      />
    </div>
  );
};
export default NotesSection;

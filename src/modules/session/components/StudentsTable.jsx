import { useEffect, useState } from "react";
import { RightArrow } from "constants/images";
import ModalforStudentDetails from "./Modals/ModalforStudentDetails";
import CommonTable from "components/CommonTable";
import styles from "./StudentTable.module.scss";

import TableSwitch from "components/TableSwitch";
import CommonModal from "components/CommonModal";
import SortTable from "./SortTable";
import { useSelector } from "react-redux";
import { getAttendanceStatus } from "../utils/getAttendanceStatus";
import {
  getPastSessions,
  handlePastSessionSortField,
  handlePastSessionSortOrder,
} from "../features/sessionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routesConstants from "routes/routesConstants";

const StudentsTable = ({ isReschedule }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector(state => state.session.studentTable);
  const {
    pastSession,
    pastSession_sortOrder,
    pastSession_sortField,
    pastSessionLoading,
  } = useSelector(state => state.session.studentDetails);

  const [modalForStudentDetails, setModalForStudentDetails] = useState(false);
  const [modalForViewPastLessons, setModalForViewPastLessons] = useState(false);
  const [singleStudentData, setSingleStudentData] = useState("");
  const handleSingleStudentData = rowData => {
    setModalForStudentDetails(true);
    setSingleStudentData(rowData);
    const payload = {
      pk_student_key: rowData?.pk_student_key,
    };
    dispatch(getPastSessions(payload));
  };

  const columns = [
    {
      dataField: "sname",
      text: "Name",

      formatter: (cellContent, row) => {
        return <div>{row?.st_first_name + " " + row?.st_surname}</div>;
      },
    },
    {
      dataField: "level",
      text: "Level",

      formatter: (cellContent, row) => {
        return <div>{row?.level_name}</div>;
      },
    },

    {
      dataField: "school",
      text: "School Name",

      formatter: (cellContent, row) => {
        return row?.sc_name ? <div>{row?.sc_name}</div> : <div>-</div>;
      },
    },
    {
      dataField: "attendance_status",
      text: "Attendance",
      formatter: (cellContent, row) => {
        const customBTn =
          +row.attendance_status === 0
            ? styles.tBTn_a0
            : +row.attendance_status === 1
            ? styles.tBTn_a1
            : +row.attendance_status === 2
            ? styles.tBTn_a2
            : +row.attendance_status === 3
            ? styles.tBTn_a3
            : +row.attendance_status === 4
            ? styles.tBTn_a4
            : "";
        const titleName = getAttendanceStatus(+row.attendance_status);

        return <TableSwitch title={titleName} bg={customBTn} />;
      },
    },
    {
      dataField: "previousNotes",
      text: "Previous Notes",

      formatter: (cellContent, row) => {
        return row.previous_note?.notes_details ? (
          <div>{row.previous_note?.notes_details}</div>
        ) : (
          <div className="">-</div>
        );
      },
    },
    {
      dataField: "todaysNotes",
      text: "Today's Notes",

      formatter: (cellContent, row) => {
        return row.todays_note?.notes_details ? (
          <div>{row.todays_note?.notes_details}</div>
        ) : (
          <div className="">-</div>
        );
      },
    },

    {
      dataField: "action",
      text: "",
      formatter: (cellContent, row) => {
        return (
          <img
            src={RightArrow}
            alt=""
            onClick={() => handleSingleStudentData(row)}
            className="cursor-pointer"
          />
        );
      },
    },
  ];

  const onTableChange = (type, { sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(handlePastSessionSortField(sortField));
        dispatch(handlePastSessionSortOrder(sortOrder));
        break;
      default:
        break;
    }
  };
  const handleRedirectFromPastLesson = data => {
    setModalForStudentDetails(false);
    setModalForViewPastLessons(false);
    localStorage.setItem("sessionTabId", 1);
    navigate("/" + routesConstants.SESSION_PAGE + "/" + data.pk_ses_key);
  };
  useEffect(() => {
    if (singleStudentData?.pk_student_key) {
      const payload = {
        pk_student_key: singleStudentData?.pk_student_key,
        sort_by: pastSession_sortField,
        sort_order: pastSession_sortOrder,
      };
      dispatch(getPastSessions(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastSession_sortOrder, pastSession_sortField, dispatch]);

  return (
    <div className={styles.session_details_student_table}>
      {modalForStudentDetails && (
        <ModalforStudentDetails
          student_key={singleStudentData?.pk_student_key}
          subject_id={singleStudentData?.tbl_enrolment_subjects?.map(
            x => x?.fk_sub_id,
          )}
          setModalForViewPastLessons={setModalForViewPastLessons}
          closeModal={setModalForStudentDetails}
        />
      )}

      <CommonModal
        closeModal={() => setModalForViewPastLessons(false)}
        show={modalForViewPastLessons}
        title={"View past sessions"}
        hide={() => setModalForViewPastLessons(false)}
        modalBody={SortTable(
          pastSession,
          onTableChange,
          pastSessionLoading,
          pastSession_sortField,
          pastSession_sortOrder,
          handleRedirectFromPastLesson,
        )}
      />
      <CommonTable
        keyField="pk_student_id"
        columns={columns}
        list={
          isReschedule
            ? list?.studentDetails?.tbl_student_enrolments
            : list?.studentDetails?.tbl_session_time?.tbl_student_enrolments
        }
        isPagination={false}
      />
    </div>
  );
};
export default StudentsTable;

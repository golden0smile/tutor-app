import { RightArrow } from "constants/images";
import styles from "./SortTable.module.scss";
import CommonTable from "components/CommonTable";
import { handleTimeFormate } from "../utils/handleTimeFormate";
import moment from "moment";
import { subjectName } from "constants/CustomTableConstant";
import { getAttendanceStatus } from "../utils/getAttendanceStatus";
import TableSwitch from "components/TableSwitch";
import classNames from "classnames";
import getUniqueSubjectName from "utils/getUniqueSubjectName";

const SortTable = (
  pastSession,
  onTableChange,
  pastSessionLoading,
  pastSession_sortField,
  pastSession_sortOrder,
  handleRedirectFromPastLesson,
) => {
  const handleArrow = data => {
    handleRedirectFromPastLesson(data);
  };
  const columns = [
    {
      dataField: "ses_date",
      text: "Date",
      sort: true,
      formatter: (cellContent, row) => {
        const date = row?.ses_date;
        const formattedDate = moment(date).format("D MMM YYYY (ddd)");
        return <div>{formattedDate}</div>;
      },
    },
    {
      dataField: "time",
      text: "Time",
      sort: true,
      formatter: (cellContent, row) => {
        const initialTime = moment(row?.ses_start_time, "hh:mm A");
        const endTimeInitial = moment(row?.ses_end_time, "hh:mm A");
        const startTime = handleTimeFormate(initialTime);
        const endTime = handleTimeFormate(endTimeInitial);
        return (
          <div className="cursor-pointer">
            {startTime} - {endTime}
          </div>
        );
      },
    },
    {
      dataField: "sest_name",
      text: "Session name",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <div>
            {row?.tbl_session_time?.sest_name
              ? row?.tbl_session_time?.sest_name
              : "-"}
          </div>
        );
      },
    },

    {
      dataField: "subject",
      text: "Subject",
      sort: true,
      formatter: (cellContent, row) => {
        // const str = [
        //   ...new Set(
        //     row?.tbl_session_time?.tbl_student_enrolments?.map(x =>
        //       +x?.fk_sub_id === 1 ? subjectName.ENGLISH : subjectName.MATHS,
        //     ) || [],
        //   ),
        // ].toString();
        const str = getUniqueSubjectName(
          row?.tbl_session_time?.tbl_student_enrolments,
        );
        return <div className="cursor-pointer">{str || "-"}</div>;
      },
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      formatter: (cellContent, row) => {
        return <div>{row?.type ? row?.type : "-"}</div>;
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cellContent, row) => {
        const attendance = row?.tbl_session_attendance?.attendance_status;
        const customBTn =
          +attendance === 0
            ? styles.tBTn_a0
            : +attendance === 1
            ? styles.tBTn_a1
            : +attendance === 2
            ? styles.tBTn_a2
            : +attendance === 3
            ? styles.tBTn_a3
            : +attendance === 4
            ? styles.tBTn_a4
            : +attendance === 5
            ? styles.tBTn_a5
            : "";
        const titleName = getAttendanceStatus(+attendance);

        return <TableSwitch title={titleName} bg={customBTn} />;
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
            onClick={() => handleArrow(row)}
            className="cursor-pointer"
          />
        );
      },
    },
  ];
  return (
    <div className={styles.tableContent}>
      <CommonTable
        keyField="pk_ses_key"
        className={
          (pastSession || [])?.length === 0
            ? classNames("noData", styles.tableContent1)
            : styles.tableContent
        }
        list={pastSession || []}
        columns={
          (pastSession || [])?.length === 0
            ? columns?.filter(item => item?.text)
            : columns
        }
        isPagination={false}
        onTableChange={onTableChange}
        loading={pastSessionLoading}
        sortField={pastSession_sortField}
        sortOrder={pastSession_sortOrder}
      />
    </div>
  );
};

export default SortTable;

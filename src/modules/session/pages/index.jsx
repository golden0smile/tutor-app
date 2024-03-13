import CommonTable from "components/CommonTable";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getSessionAllDetail,
  handleClearAllFilters,
  handleSessionDateFilter,
  handleSessionPage,
  handleSessionSearch,
  handleSessionSizePerPage,
  handleSessionSortField,
  handleSessionSortOrder,
  handleSessionStatusFilter,
  handleSessionSubjectFilter,
  handleSessionTypeFilter,
  // handleSort,
} from "../features/sessionSlice";
import styles from "./index.module.scss";
import TableSwitch from "components/TableSwitch";
import {
  filterName,
  placeholderMsg,
  statusFilter,
} from "constants/CustomTableConstant";
import { RightArrow } from "constants/images";
import routesConstants from "routes/routesConstants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import useDebounced from "hooks/useDebounced";
import { handleTimeFormate } from "../utils/handleTimeFormate";
import { getStatus } from "utils/getStatus";
import getUniqueSubjectName from "utils/getUniqueSubjectName";

const Session = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    SessionDetails,
    sortField,
    sortOrder,
    statusFilterR,
    typeFilterR,
    dateFilterR,
    subjectFilterR,
    page,
    sizePerPage,
    totalPage,
    isLoading,
  } = useSelector(state => state.session);
  const [search, setSearch] = useState("");
  const hasFilter = useMemo(() => {
    return [statusFilterR, subjectFilterR, typeFilterR, dateFilterR].some(
      x => !!x,
    );
  }, [statusFilterR, subjectFilterR, typeFilterR, dateFilterR]);
  const [initialDate, setInitialDate] = useState(null);
  const debounceSearch = useDebounced(search?.trim());
  const initialFilter = useMemo(
    () => ({
      subject: subjectFilterR,
      type: typeFilterR,
      status: statusFilterR,
    }),
    [statusFilterR, subjectFilterR, typeFilterR],
  );

  const handleArrow = (id, row) => {
    navigate("/" + routesConstants.SESSION_PAGE + "/" + id, {
      state: { isReschedule: row?.is_reschedule },
    });
  };

  const columns = [
    {
      dataField: "pk_ses_id",
      text: "",
      hidden: true,
    },
    {
      dataField: "ses_date",
      text: "Date",
      sort: true,
      formatter: (cellContent, row) => {
        const date = row?.ses_date;
        const formattedDate = moment(date).format("D MMM YYYY (ddd)");
        return (
          <div
            className="cursor-pointer"
            onClick={() => {
              handleArrow(row?.pk_ses_key, row);
            }}
          >
            {formattedDate}
          </div>
        );
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
          <div
            className="cursor-pointer"
            onClick={() => {
              handleArrow(row?.pk_ses_key, row);
            }}
          >
            {startTime} - {endTime}
          </div>
        );
      },
    },
    {
      dataField: "sest_name",
      text: "Session Name",
      sort: true,
      formatter: (cellContent, row) => {
        const sessionName = row?.tbl_session_time?.sest_name;

        return <div className="cursor-pointer">{sessionName}</div>;
      },
    },
    {
      dataField: "studentCount",
      text: "Students",
      sort: true,
      formatter: (cellContent, row) => {
        const studentCount =
          row?.tbl_session_time?.tbl_student_enrolments?.length;

        return (
          <div className="cursor-pointer">
            {studentCount ? studentCount : 0}
          </div>
        );
      },
    },
    {
      dataField: "subject_name",
      text: "Subject",
      sort: true,
      formatter: (cellContent, row) => {
        const str = getUniqueSubjectName(
          row?.tbl_session_time?.tbl_student_enrolments,
        );
        return <div className="cursor-pointer">{str || "-"}</div>;
      },
    },
    {
      dataField: "session_type",
      text: "Type",
      // sort: true,
      formatter: (cellContent, row) => {
        return <div className="cursor-pointer">{row?.type}</div>;
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: false,
      // #5B51FF
      formatter: (cellContent, row) => {
        const rowValue = row;
        let status = "";
        if (rowValue?.ses_reassigned === 1) {
          status = 2; //reassigned
        } else if (rowValue?.ses_is_completed === 1) {
          status = 4; //past or completed
        } else if (rowValue?.ses_status === 0) {
          status = 1;
        } else if (rowValue?.ses_status === 1) {
          status = 3; //ongoing
        }
        const customBTn =
          +status === 1
            ? styles.tBTn_s1
            : +status === 2
            ? styles.tBTn_s2
            : +status === 3
            ? styles.tBTn_s3
            : +status === 4
            ? styles.tBTn_s4
            : "";
        const titleName = getStatus(status);

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
            className="cursor-pointer"
            onClick={() => {
              handleArrow(row?.pk_ses_key, row);
            }}
          />
        );
      },
    },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      handleArrow(row?.pk_ses_key, row);
    },
  };

  const handleDateFilter = (val, isDefault = false) => {
    const startDefault = moment();
    const endDefault = startDefault.add(6, "days").toDate();
    const payload = {
      endDate: moment(val.endDate).format("YYYY-MM-DD"),
      startDate: moment(val.startDate).format("YYYY-MM-DD"),
    };
    const defaultPayload = {
      endDate: moment(endDefault).format("YYYY-MM-DD"),
      startDate: moment().format("YYYY-MM-DD"),
    };
    dispatch(handleSessionDateFilter(isDefault ? defaultPayload : payload));
  };

  const handleSearch = val => {
    setSearch(val);
    dispatch(handleSessionSearch(val));
  };

  const handleFilter = (val, type) => {
    if (type === filterName.SUBJECT) {
      dispatch(handleSessionSubjectFilter(val?.value));
    } else if (type === filterName.TYPE) {
      dispatch(handleSessionTypeFilter(val?.value));
    } else if (type === filterName.STATUS) {
      dispatch(handleSessionStatusFilter(val?.value));
    }
  };

  const handleClearFilter = () => {
    setInitialDate(null);
    dispatch(handleClearAllFilters());
  };

  const handleSizePerPageChange = val => {
    dispatch(handleSessionSizePerPage(val));
  };

  const handlePageChange = val => {
    dispatch(handleSessionPage(val));
  };

  const onTableChange = (type, { sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(handleSessionSortField(sortField));
        dispatch(handleSessionSortOrder(sortOrder));

        break;
      case "pagination":
        //created custom component for this
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setInitialDate(
      dateFilterR
        ? {
            endDate: moment(dateFilterR?.endDate).toDate(),
            startDate: moment(dateFilterR?.startDate).toDate(),
            key: "selection",
          }
        : "",
    );
  }, [dateFilterR]);

  useEffect(() => {
    let controller;
    controller = dispatch(
      getSessionAllDetail({
        search: debounceSearch,
        status: statusFilterR,
        type: typeFilterR,
        subject:
          subjectFilterR !== ""
            ? subjectFilterR === 3
              ? [1, 2]
              : subjectFilterR === 0
              ? []
              : [subjectFilterR]
            : [],
        sort_by: sortField,
        sort_order: sortOrder,
        to_date: dateFilterR
          ? moment(dateFilterR.endDate).format("YYYY-MM-DD")
          : "",
        from_date: dateFilterR
          ? moment(dateFilterR.startDate).format("YYYY-MM-DD")
          : "",
        page: page,
        limit: sizePerPage,
      }),
    );
    localStorage.removeItem("sessionTabId");
    localStorage.removeItem("sessionData");
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [
    dispatch,
    statusFilterR,
    typeFilterR,
    subjectFilterR,
    sortField,
    sortOrder,
    debounceSearch,
    dateFilterR,
    page,
    sizePerPage,
  ]);

  useEffect(() => {
    handleDateFilter("", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-3">
      <CommonTable
        keyField="pk_ses_id"
        handleFilters={true}
        isSearch={true}
        search={search}
        columns={columns}
        // list={
        //   SessionDetails?.sessions?.concat(SessionDetails?.reAssignedData) || []
        // }
        list={SessionDetails?.sessions || []}
        isDateFilter={true}
        isStatus={true}
        isSubject={true}
        isType={true}
        statusList={statusFilter}
        page={page}
        sizePerPage={sizePerPage}
        totalPages={totalPage}
        placeholderMsg={placeholderMsg.SESSIONS}
        isFilter={hasFilter}
        filterState={initialFilter}
        initialDate={initialDate}
        setInitialDate={setInitialDate}
        loading={isLoading}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        handleSizePerPageChange={handleSizePerPageChange}
        handlePageChange={handlePageChange}
        onTableChange={onTableChange}
        handleDateFilter={handleDateFilter}
        handleClearFilter={handleClearFilter}
        rowEvents={rowEvents}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default Session;

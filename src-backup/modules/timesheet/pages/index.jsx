import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import styles from "./index.module.scss";
import CommonTable from "components/CommonTable";
import TableSwitch from "components/TableSwitch";
import { filterName } from "constants/CustomTableConstant";
import { RightArrow } from "constants/images";
import moment from "moment";
import {
  getTimeSheetDetails,
  handleClearAllFilters,
  handleSort,
  handleTimeSheetDateFilter,
  handleTimeSheetPage,
  handleTimeSheetPaymentStatusFilter,
  handleTimeSheetSizePerPage,
  handleTimeSheetSortField,
  handleTimeSheetSortOrder,
} from "../features/timeSheetSlice";

import { useSelector } from "react-redux";
import {
  paymentStatus,
  timeSheetStatusFilter,
} from "../constant/timeSheetConstant";
import CommonModal from "components/CommonModal";
import DownloadModalContent from "../components/DownloadModal";

const TimeSheetsPage = () => {
  const dispatch = useDispatch();
  const {
    page,
    sizePerPage,
    totalPage,
    sortOrder,
    sortField,
    paymentStatusFilterR,
    dateFilterR,
    timeSheetDetails,
    isLoading,
  } = useSelector(state => state.time);

  const [showDownloadM, setDownloadM] = useState(false);
  // const [isFilter, setIsFilter] = useState(false);
  const [initialDate, setInitialDate] = useState(null);
  // const [filterState, setFilterState] = useState(initialFilter);
  const initialFilter = useMemo(
    () => ({
      payment_status: paymentStatusFilterR,
    }),
    [paymentStatusFilterR],
  );
  const hasFilter = useMemo(() => {
    return [paymentStatusFilterR, dateFilterR].some(x => !!x);
  }, [paymentStatusFilterR, dateFilterR]);
  const handleArrow = () => {
    setDownloadM(true);
  };

  const handleCloseModal = () => {
    setDownloadM(false);
  };
  const columns = [
    {
      dataField: "pay_dot",
      text: "Date",
      sort: true,
      formatter: (cellContent, row) => {
        const date = moment(row?.pay_dot);
        const formattedDate = date.format("D MMMM YYYY (ddd)");
        return formattedDate;
      },
    },
    {
      dataField: "Sessions",
      text: "Sessions",
      sort: true,
    },
    {
      dataField: "lesson",
      text: "Lessons",
      sort: true,
    },
    {
      dataField: "pay_amount",
      text: "Payment Due",
      sort: true,
    },

    {
      dataField: "pay_type_of_payment",
      text: "Status",
      sort: true,
      formatter: (cellContent, row) => {
        const customBTn =
          +row.pay_type_of_payment === 2 || +row.pay_type_of_payment === 1
            ? styles.tBTn_s2
            : +row.pay_type_of_payment === 3
            ? styles.tBTn_s4
            : "";
        const titleName =
          +row.pay_type_of_payment === 3
            ? paymentStatus.PAID
            : +row.pay_type_of_payment === 2 || +row.pay_type_of_payment === 1
            ? paymentStatus.PENDING
            : "-";

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
            onClick={() => {
              handleArrow();
            }}
            className="cursor-pointer"
          />
        );
      },
    },
  ];

  const handleDateFilter = val => {
    const payload = {
      endDate: moment(val.endDate).format("YYYY-MM-DD"),
      startDate: moment(val.startDate).format("YYYY-MM-DD"),
    };
    dispatch(handleTimeSheetDateFilter(payload));
  };

  const handleFilter = (val, type) => {
    if (type === filterName.PAYMENT_STATUS) {
      dispatch(handleTimeSheetPaymentStatusFilter(val.value));
    }
  };

  const handleSizePerPageChange = val => {
    dispatch(handleTimeSheetSizePerPage(val));
  };

  const handlePageChange = val => {
    dispatch(handleTimeSheetPage(val));
  };
  const onTableChange = (type, { sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(
          handleSort({
            field: sortField,
            order: sortOrder,
          }),
        );
        dispatch(handleTimeSheetSortField(sortField));
        dispatch(handleTimeSheetSortOrder(sortOrder));
        break;

      default:
        break;
    }
  };
  const handleClearFilter = () => {
    dispatch(handleClearAllFilters());
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
    dispatch(
      getTimeSheetDetails({
        statusFilter: paymentStatusFilterR,
        sort_field: sortField,
        sort_order: sortOrder.toUpperCase(),

        endDate: dateFilterR
          ? moment(dateFilterR.endDate).format("YYYY-MM-DD")
          : "",
        startDate: dateFilterR
          ? moment(dateFilterR.startDate).format("YYYY-MM-DD")
          : "",
        page_record: sizePerPage,
        page_no: page,
      }),
    );
  }, [
    dispatch,
    paymentStatusFilterR,
    sortField,
    sortOrder,
    dateFilterR,
    page,
    sizePerPage,
  ]);
  return (
    <div className="p-3">
      <CommonTable
        keyField="pk_ses_key"
        handleFilters={true}
        columns={columns}
        // list={dummyData}
        list={timeSheetDetails?.rows || []}
        loading={isLoading}
        isDateFilter={true}
        isPaymentStatus={true}
        statusList={timeSheetStatusFilter}
        isFilter={hasFilter}
        initialDate={initialDate}
        setInitialDate={setInitialDate}
        filterState={initialFilter}
        sortField={sortField}
        sortOrder={sortOrder}
        page={page}
        totalPages={totalPage}
        sizePerPage={sizePerPage}
        handleFilter={handleFilter}
        handleSizePerPageChange={handleSizePerPageChange}
        handlePageChange={handlePageChange}
        onTableChange={onTableChange}
        handleDateFilter={handleDateFilter}
        handleClearFilter={handleClearFilter}
      />

      <CommonModal
        show={showDownloadM}
        closeModal={handleCloseModal}
        modalBody={<DownloadModalContent closeModal={handleCloseModal} />}
        title={"Download PDF timesheet"}
        isFooter={false}
      />
    </div>
  );
};

export default TimeSheetsPage;

import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import CustomDatePicker from "components/CommonDatePicker/CustomDatePicker";
import CustomSelect from "components/CommonDropDown";
import TablePagination from "components/TablePagination";
import TableSelect from "components/TableSelect";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-date-picker/dist/DatePicker.css";
import {
  commonTableDefaultSizePerPageOptions,
  filterName,
  levelFilter,
  schoolFilter,
  subjectFilter,
  typeFilter,
} from "../../constants/CustomTableConstant";
import styles from "./index.module.scss";
import CommonButton from "components/CommonButton";
import useOutsideClick from "hooks/useOutsideClick";
import { dropDownArrow } from "constants/images";
import { noDataFoundMsg } from "constants/messages";
const defaultFunction = () => {};
const defaultRowEvents = {
  onClick: () => {},
};

const CommonTable = ({
  className,
  keyField = "id",
  list = [],
  columns,
  search,
  sizePerPage,
  page,
  totalPages,
  isFilter,
  filterState,
  initialDate,
  setInitialDate,
  loading,
  sortField,
  sortOrder,
  statusList = [],
  placeholderMsg = "",
  schoolList = schoolFilter,
  levelData = levelFilter,
  isLevel = false,
  isLevelGroup = false,
  isSchool = false,
  isStatus = false,
  isSubject = false,
  isType = false,
  isPaymentStatus = false,
  isDateFilter = false,
  isSearch = false,
  isRowSelect = false,
  isPagination = true,
  isButton = false,
  unPlannedLesson = false,
  sizePerPageOptions = commonTableDefaultSizePerPageOptions,
  rowEvents = defaultRowEvents,
  onTableChange = defaultFunction,
  handleSearch = defaultFunction,
  handleFilter = defaultFunction,
  handlePageChange = defaultFunction,
  handleSizePerPageChange = defaultFunction,
  handleButtonFilter = defaultFunction,
  handleDeleteAll = defaultFunction,
  handleDateFilter = defaultFunction,
  handleClearFilter = defaultFunction,
  handleUnplannedLesson = defaultFunction,
}) => {
  const tableRef = useRef();
  const [isDateShow, setIsDateShow] = useState(false);
  const [dateShow, setDateShow] = useState();
  const [isAllRowSelect, setIsAllRowSelect] = useState(false);
  const dateRef = useRef(null);

  const formattedDates = useMemo(() => {
    if (initialDate) {
      return {
        eDate: moment(initialDate.endDate).format("D MMM YYYY"),
        sDate: moment(initialDate.startDate).format("D MMM YYYY"),
      };
    }
    return null;
  }, [initialDate]);

  const handleClose = useCallback(() => setIsDateShow(false), []);
  useOutsideClick(dateRef, handleClose);

  // Update dateShow when initialDate changes
  useMemo(() => {
    setDateShow(formattedDates);
  }, [formattedDates]);

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    style: { width: "24px" },
    // selected: [],
    onSelect: obj => {
      // console.log({ obj });
    },
    onSelectAll: (obj, ...args) => {
      console.log({ obj });
      setIsAllRowSelect(obj);
      console.log({ args });
    },
  };

  const columnsData = columns.map((col, index) => ({
    ...col,
    ...(col.hasOwnProperty("sort")
      ? {
          sortCaret: order => {
            return (
              <span className="sort-arrows cursor-pointer ms-3" key={index}>
                {!!order ? (
                  order === "desc" ? (
                    <i className="fa-solid fa-arrow-down"></i>
                  ) : (
                    <i className="fa-solid fa-arrow-up"></i>
                  )
                ) : (
                  <>
                    <i className="fa-solid fa-arrow-up"></i>
                  </>
                )}
              </span>
            );
          },
        }
      : {}),
  }));
  return (
    <>
      <div>
        {isSearch && (
          <div
            className={classNames(
              "position-relative m-0 mb-3",
              styles.searchBox,
              styles.searchRenewal,
              "min-w-150",
              isButton ? styles.buttonFilter : "",
            )}
          >
            <input
              type="search"
              className=""
              placeholder={placeholderMsg}
              value={search}
              onChange={e => {
                const val = e.target.value;
                if (val.trim()?.length !== 0 || val === "") {
                  handleSearch(val);
                }
              }}
            />
            <i className="fa fa-magnifying-glass"></i>
            {isButton && (
              <div>
                {isAllRowSelect && (
                  <CommonButton
                    btnText="Delete All"
                    handleClick={handleDeleteAll}
                    isWarning={true}
                  />
                )}
                <CommonButton btnText="All" handleClick={handleButtonFilter} />
                <CommonButton
                  btnText="Video"
                  handleClick={handleButtonFilter}
                />
                <CommonButton btnText="Link" handleClick={handleButtonFilter} />
                <CommonButton
                  btnText="Work Sheet"
                  handleClick={handleButtonFilter}
                />
              </div>
            )}
          </div>
        )}

        <div
          className={classNames(
            "d-flex align-items-center justify-content-start flex-wrap mb-3",
            styles.filters,
          )}
        >
          {isDateFilter ? (
            <div className="me-3" ref={dateRef}>
              <label>Date</label>
              <div
                className={styles.datePickerInput}
                key={dateShow}
                onClick={() => {
                  setIsDateShow(!isDateShow);
                }}
              >
                {dateShow ? (
                  <span>{dateShow?.sDate + " - " + dateShow?.eDate}</span>
                ) : (
                  <span className={styles.placeHolder}>Select date</span>
                )}
                <div>
                  <img src={dropDownArrow} alt="" />
                </div>
              </div>
              {isDateShow && (
                <CustomDatePicker
                  setIsDateShow={setIsDateShow}
                  setInitialDate={setInitialDate}
                  initialDate={initialDate}
                  handleChange={handleDateFilter}
                />
              )}
            </div>
          ) : null}

          <div className="d-flex flex-wrap">
            {isLevel ? (
              <div className="me-3">
                <label>Level</label>
                <CustomSelect
                  isGroup={isLevelGroup}
                  value={filterState?.level}
                  type={filterName.LEVEL}
                  list={levelData}
                  placeHolder="Select level"
                  handleChange={handleFilter}
                />
              </div>
            ) : null}
            {isSchool ? (
              <>
                <div className="me-3">
                  {/* <label>School</label>
                  <CustomSelect
                    value={filterState?.school}
                    type={filterName.SCHOOL}
                    list={schoolList}
                    placeHolder="Select school"
                    handleChange={handleFilter}
                  /> */}
                </div>

                <div className="me-3 mt-4">
                  <input
                    type="checkbox"
                    onChange={handleUnplannedLesson}
                    checked={unPlannedLesson}
                  />
                  <label>Unplanned lessons (next 7 days)</label>
                </div>
              </>
            ) : null}
            {isSubject ? (
              <div className="me-3">
                <label>Subject</label>
                <CustomSelect
                  value={filterState?.subject}
                  type={filterName.SUBJECT}
                  list={subjectFilter}
                  placeHolder="Select subject"
                  handleChange={handleFilter}
                />
              </div>
            ) : null}

            {isType ? (
              <div className="me-3">
                <label>Type</label>
                <CustomSelect
                  value={filterState?.type}
                  type={filterName.TYPE}
                  list={typeFilter}
                  placeHolder="Select type"
                  handleChange={handleFilter}
                />
              </div>
            ) : null}
            {isStatus ? (
              <div className="me-3">
                <label>Status</label>
                <CustomSelect
                  value={filterState?.status}
                  type={filterName.STATUS}
                  list={statusList}
                  placeHolder="Select status"
                  handleChange={handleFilter}
                />
              </div>
            ) : null}
            {isPaymentStatus ? (
              <div className="me-3">
                <label>Status</label>
                <CustomSelect
                  value={filterState?.payment_status}
                  type={filterName.PAYMENT_STATUS}
                  list={statusList}
                  placeHolder="Select status"
                  handleChange={handleFilter}
                />
              </div>
            ) : null}

            {isFilter ? (
              <div className="me-3 mt-4">
                <CommonButton
                  btnText="Clear filter"
                  handleClick={handleClearFilter}
                  className={styles.clearFilterBtn}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={classNames(styles.main_table, className)}>
        <div className="position-relative">
          <ToolkitProvider
            keyField={keyField}
            columns={columnsData}
            data={list}
            search
          >
            {({ baseProps }) => {
              return (
                <>
                  <BootstrapTable
                    rowEvents={rowEvents}
                    bordered={false}
                    keyField={keyField}
                    ref={tableRef}
                    remote
                    onTableChange={onTableChange}
                    // defaultSortDirection="desc"
                    sort={{
                      dataField: sortField,
                      order: sortOrder,
                    }}
                    loading={loading}
                    noDataIndication={() =>
                      loading ? (
                        <div className={styles.noDataMsg}>Loading...</div>
                      ) : (
                        <div className={styles.noDataMsg}>{noDataFoundMsg}</div>
                      )
                    }
                    bootstrap4
                    // {...isRowSelect?{selectRow}:{}}
                    selectRow={isRowSelect ? selectRow : undefined}
                    {...baseProps}
                  />
                  {list?.length && isPagination ? (
                    <div className=" p-3 d-flex justify-content-md-between align-items-center flex-column flex-wrap flex-md-row ">
                      <Row
                        className={`justify-content-between justify-content-sm-start flex-xxl-nowrap`}
                      >
                        <Col
                          xs="auto"
                          sm={12}
                          md="auto"
                          className={classNames(
                            styles.font_small12,
                            "order-1 order-md-0 d-inline-flex flex-wrap-nowrap align-items-center gap-2 w-auto ms-auto ms-md-0 p-0",
                            styles.page_count,
                          )}
                        >
                          Show Entries
                          <TableSelect
                            options={sizePerPageOptions}
                            value={{
                              label: sizePerPage,
                              value: sizePerPage,
                            }}
                            onChange={({ value }) => {
                              setTimeout(() => {
                                handleSizePerPageChange(value);
                              }, 0);
                            }}
                            className="me-1"
                          />
                        </Col>
                      </Row>

                      <TablePagination
                        handlePageChange={handlePageChange}
                        page={page}
                        sizePerPage={sizePerPage}
                        totalPages={totalPages}
                      />
                    </div>
                  ) : null}
                </>
              );
            }}
          </ToolkitProvider>
        </div>
      </div>
    </>
  );
};

export default CommonTable;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getReportedQuestionList } from "./features/reportRemarkSlice";
import { useSelector } from "react-redux";
import { RightArrow } from "constants/images";
import CommonTable from "components/CommonTable";
import Cookies, { cookieKeys } from "services/cookies";
import routesConstants from "routes/routesConstants";
import moment from "moment";

const RemarkReport = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(state => state.report);

  const handleArrow = row => {
    const fullUrl = `${process.env.REACT_APP_TUTOR_APP_URL}/${routesConstants.REMARK_REPORT}`;
    const url = `${process.env.REACT_APP_STUDENT_APP_URL}/marking-override/${row?.question_id}`;
    const remarkReportData = {
      lessonActivityKey: row?.fk_lesson_activity_key,
      subjectID: +row?.fk_sub_id,
      studentKey: row?.pk_student_key,
      tutorToken: Cookies.get(cookieKeys.TOKEN),
      redirectUrl: fullUrl,
    };

    Cookies.setStudent(
      cookieKeys.REMARK_DATA,
      JSON.stringify(remarkReportData),
    );
    window.open(url, "_self");
    // console.log({ remarkReportData, url });
  };
  const columns = [
    {
      dataField: "question_id",
      text: "Question id",
      sort: false,
    },
    {
      dataField: "st_first_name",
      text: "Student name",
      sort: false,
      formatter: (cellContent, row) => {
        return <div>{row?.st_first_name + " " + row?.st_surname}</div>;
      },
    },
    {
      dataField: "created_on",
      text: "Date",
      sort: false,
      formatter: (cellContent, row) => {
        const date = moment(row?.created_on);
        const formattedDate = date.format("D MMMM YYYY (ddd)");
        return formattedDate;
      },
    },
    {
      dataField: "created_time",
      text: "Time",
      sort: false,
      formatter: (cellContent, row) => {
        const date = moment(row?.created_on);
        const time = date.format("h:mm a");
        return time;
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
              handleArrow(row);
            }}
            className="cursor-pointer"
          />
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getReportedQuestionList());
  }, [dispatch]);
  return (
    <div className="p-3">
      <CommonTable
        keyField="question_id"
        columns={columns}
        list={data || []}
        loading={isLoading}
        isPagination={false}
      />
    </div>
  );
};

export default RemarkReport;

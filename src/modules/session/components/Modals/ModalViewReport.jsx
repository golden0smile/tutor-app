import { useSelector } from "react-redux";
import styles from "./ModalViewReport.module.scss";
import CommonTable from "components/CommonTable";
const ModalViewReport = () => {
  const { getViewReportData } = useSelector(state => state.session);

  const columns = [
    {
      dataField: "id",
      text: "Id",
      hidden: true,
      formatter: (cellContent, row) => {
        return <div>{cellContent}</div>;
      },
    },
    {
      dataField: "topic",
      text: "Topic",
      formatter: (cellContent, row) => {
        return <div>{cellContent}</div>;
      },
    },
    {
      dataField: "question_completed",
      text: "Question Completed",
      formatter: (cellContent, row) => {
        return <div>{cellContent}</div>;
      },
    },
    {
      dataField: "mastery_score",
      text: "Mastery score",
      formatter: (cellContent, row) => {
        return <div>{Math.floor(+cellContent)}</div>;
      },
    },
  ];

  return (
    <div>
      <CommonTable
        keyField={"id"}
        columns={columns}
        list={getViewReportData?.report?.activities?.map((item, key) => {
          return {
            id: key,
            topic: item[0],
            question_completed: item[1],
            mastery_score: item[2],
          };
        })}
        isPagination={false}
        className={styles.ModalViewReportContainer}
      />
    </div>
  );
};
export default ModalViewReport;

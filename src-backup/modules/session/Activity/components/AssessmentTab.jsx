import React from "react";
import styles from "../AddActivity.module.scss";
import { AssessmentHeaderOptions } from "../constants/ActivityConstants";
import ActivityTable from "./ActivityTable";

const AssessmentTab = ({
  data,
  handleSelected,
  isAddDisable,
  selectedData,
  handlePreviewAssessment,
  yearID,
  topicId,
}) => {
  return (
    <div className={styles.tabContentWrapper}>
      <ActivityTable
        data={data}
        headers={AssessmentHeaderOptions}
        handleSelected={handleSelected}
        isAddDisable={isAddDisable}
        selectedData={selectedData}
        handlePreviewAssessment={handlePreviewAssessment}
        yearID={yearID}
        topicId={+topicId}
      />
    </div>
  );
};

export default AssessmentTab;

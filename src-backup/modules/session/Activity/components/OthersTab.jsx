import React from "react";
import styles from "../AddActivity.module.scss";
import { OthersHeaderOptions } from "../constants/ActivityConstants";
import ActivityTable from "./ActivityTable";

const OthersTab = ({ data, handleSelected }) => {
  return (
    <div className={styles.tabContentWrapper}>
      <ActivityTable
        data={data}
        headers={OthersHeaderOptions}
        handleSelected={handleSelected}
        isLibrary={true}
      />
    </div>
  );
};

export default OthersTab;

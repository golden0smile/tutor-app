import React from "react";
import styles from "../AddActivity.module.scss";
import ActivitySearchBar from "./ActivitySearchBar";
import CustomSelect from "components/CommonDropDown";
import { statusOptions, subjectOptions } from "../constants/ActivityConstants";

const ActivityHeader = ({
  search,
  subject,
  status,
  level,
  handleSearch,
  handleSubject,
  handleStatus,
  handleLevel,
  levelData,
  isLibrary,
  isDisable,
}) => {
  return (
    <>
      <div className={styles.titleSection}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Add activity</div>
          <ActivitySearchBar handleSearch={handleSearch} search={search} />
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Select Subject</div>
          <div className={styles.dropDown}>
            <CustomSelect
              list={subjectOptions}
              placeHolder="Select subject"
              value={+subject === 3 ? "1" : subject?.toString()}
              handleChange={e => handleSubject(e)}
              // isDisabled={isDisable}
            />
          </div>
        </div>
        {!isLibrary && (
          <div className={styles.wrapper}>
            <div className={styles.title}>Levels</div>
            <div className={styles.dropDown}>
              <CustomSelect
                list={levelData}
                placeHolder="Select level"
                value={level}
                handleChange={e => handleLevel(e)}
              />
            </div>
          </div>
        )}
        <div className={styles.wrapper}>
          <div className={styles.title}>Status</div>
          <div className={styles.dropDown}>
            <CustomSelect
              list={statusOptions}
              placeHolder="Select status"
              value={status}
              handleChange={e => handleStatus(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityHeader;

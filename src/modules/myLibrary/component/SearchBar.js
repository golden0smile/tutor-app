import classNames from "classnames";
import styles from "../index.module.scss";
import { placeholderMsg } from "constants/CustomTableConstant";
import React from "react";

const SearchBar = ({ search, handleSearch, setActivityModal }) => {
  return (
    <div className={styles.searchDiv}>
      <div
        className={classNames(
          "position-relative m-0 mb-3",
          styles.searchBox,
          styles.searchRenewal,
          "min-w-150",
        )}
      >
        <input
          type="search"
          className=""
          placeholder={placeholderMsg.MY_LIBRARY}
          value={search}
          onChange={e => {
            handleSearch(e.target.value);
          }}
        />
        <i className="fa fa-magnifying-glass"></i>
        <button
          onClick={() => setActivityModal(true)}
          className={styles.addActivityButton}
        >
          Add New Activity
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

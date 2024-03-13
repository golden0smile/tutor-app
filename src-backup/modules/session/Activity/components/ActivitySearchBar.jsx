import React from "react";
import styles from "../AddActivity.module.scss";

const ActivitySearchBar = ({ handleSearch, search }) => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.search}>
        <i className="fa fa-magnifying-glass"></i>
        <input
          type="search"
          placeholder="Search for topic or activity name"
          name="search"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default ActivitySearchBar;

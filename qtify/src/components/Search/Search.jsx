import React from "react";
import styles from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";

function Search({ placeholder = "Search a album of your choice" }) {
  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
        />
        <button type="submit" className={styles.searchButton}>
          <SearchIcon className={styles.searchIcon} />
        </button>
      </form>
    </div>
  );
}

export default Search;

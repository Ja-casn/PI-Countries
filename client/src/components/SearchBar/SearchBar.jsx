import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryQuery } from "../../react/actions/actions";
import styles from "./searchBar.module.css";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [countryName, setCountryName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setCountryName(e.target.value);
    dispatch(getCountryQuery(countryName));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountryQuery(countryName));
    setCurrentPage(1);
  };

  return (
    <div>
      <form className={styles.formSearchBar} onSubmit={(e) => handleOnSubmit(e)}>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Search country"
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={countryName}
        />

        <button className={styles.searchBar} type="submit" onClick={(e) => handleOnSubmit(e)}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

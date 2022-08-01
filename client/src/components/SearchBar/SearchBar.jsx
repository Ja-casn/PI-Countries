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
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountryQuery(countryName));
    setCurrentPage(1);
    setCountryName("");
  };

  return (
    <div>
      <form className={styles.formSearchBar}>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Search country"
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={countryName}
          required
          minLength="3"
        />

        <button
          style={{
            color: "white",
            backgroundImage: "linear-gradient(to right, #303638 0%, #0c113689)",
            borderRadius: "10px",
          }}
          type="submit"
          onClick={(e) => handleOnSubmit(e)}
          disabled={!countryName || /\s/g.test(countryName) ? true : false}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

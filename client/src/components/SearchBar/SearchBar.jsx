import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryQuery } from "../../react/actions/actions";
import styles from "./searchBar.module.css";

// function validate(countryName) {
//   let errors = {};

//   if (isNaN(countryName) !== true || !countryName.length || /\s/g.test(countryName)) {
//     // name es requerido y no acepta espacios en blancos.
//     errors.name =
//       "The name can not be Numbers, blank spaces and have initial spaces!";
//   } else if (!/^[a-zA-Z0-9& áéíóú]+$/.test(countryName)) {
//     // no permiten que hayan caracteres especiales
//     errors.name = "Country name is invalid, no special characters are allowed"; // -> "/[$%&|<>#]/" valida caracteres especiales
//   }
//   return errors;
// }

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [countryName, setCountryName] = useState("");
  const [errors, setErrors] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setCountryName(e.target.value);
    // setErrors(validate(countryName))
    // console.log(errors);
    // dispatch(getCountryQuery(countryName));
    // setCurrentPage(1);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // setErrors(validate(e.target.value));
    // console.log(errors);
    dispatch(getCountryQuery(countryName));
    setCurrentPage(1);
    setCountryName("");
    // if (errors.length != 0) {
    //   return alert("Must insert a correct name of country");
    // } else {
    //   console.log('TOY ENTRANDO');
    // }
  };

  return (
    <div>
      <form
        className={styles.formSearchBar}
        // onSubmit={(e) => handleOnSubmit(e)}
      >
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
          style={{color: "white", backgroundImage: "linear-gradient(to right, #303638 0%, #0c113689)", borderRadius: "10px"}}
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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContinent } from "../../react/actions/actions";
import styles from '../Home/Home.module.css'

const Continent = () => {
  const countries = useSelector((state) => state.countries);
  // const allContinents = countries.map((el) => el.continent);
  const allContinents = [
    "Asia",
    "South America",
    "North America",
    "Africa",
    "Antarctica",
    "Europe",
    "Oceania",
  ];
  // const fixSetContinent = new Set(allContinents); // saca repetidos

  // const setToArray = [...fixSetContinent];

  const dispatch = useDispatch();

  const handleClickFilter = (e) => {
    // e.preventDefault();
    dispatch(getContinent(e.target.value));
  };

  return (
    <div>
      <select className={styles.filter} onChange={(e) => handleClickFilter(e)}>
      <option value="all">Continents</option>
        {allContinents.map((el, i) => (
          <option value={el} key={i}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Continent;

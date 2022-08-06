import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContinent } from "../../react/actions/actions";
import styles from '../Home/Home.module.css'

const Continent = ({setCurrentPage}) => {
  const dispatch = useDispatch();

  const handleClickFilter = (e) => {
    // e.preventDefault();
    dispatch(getContinent(e.target.value));
    setCurrentPage(1)
  };

  return (
    <div>
      <select className={styles.filter} onChange={(e) => handleClickFilter(e)}>
      <option value="all">Continents</option>
      <option value="South America">South America</option>
      <option value="North America">North America</option>
      <option value="Africa">Africa</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
      <option value="Antartica">Antartica</option>
      
      </select>
    </div>
  );
};

export default Continent;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCountries,
  orderByName,
  orderByPopulation,
} from "../../react/actions/actions";
import Continent from "../Continent/Continent";
import CountryCard from "../Country-Card/CountryCard";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import AllActivities from "../Activity/Activity";

const Home = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage; // 10

  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0

  const currentCountry = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const [, setOrden] = useState("");

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllCountries());
    // console.log('im apprearing many times');
  }, [dispatch]);
  // Sirve para traerme del componente el estado global de los paises

  const handleReload = (e) => {
    e.preventDefault();
    dispatch(getAllCountries());
    setCurrentPage(1);
  };

  const handleSortCountry = (e) => {
    e.preventDefault();
    if (e.target.value === "all") {
      dispatch(getAllCountries());
      setCurrentPage(1);
      setOrden(e.target.value);
    } else {
      dispatch(orderByName(e.target.value));
      setCurrentPage(1);
      setOrden(e.target.value);
    }
  };

  const handleSortPopulation = (e) => {
    e.preventDefault();
    if (e.target.value === "all") {
      dispatch(getAllCountries());
      setCurrentPage(1);
      setOrden(e.target.value);
    } else {
      dispatch(orderByPopulation(e.target.value));
      setCurrentPage(1);
      setOrden(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.ordFilter}>
        <select
          className={styles.filter}
          onChange={(e) => handleSortCountry(e)}
        >
          <option value="all">Alphabetic Name</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select
          className={styles.filter}
          onChange={(e) => handleSortPopulation(e)}
        >
          <option value="all">Population</option>
          <option value="asc">Higher Population</option>
          <option value="desc">Lower Population</option>
        </select>

        <Continent />

        <AllActivities />
        <div className={styles.searchContainer}>
          <button
            className={styles.btnReload}
            onClick={(e) => {
              handleReload(e);
            }}
          >
            Reload countries
          </button>
          <SearchBar setCurrentPage={setCurrentPage} />

          <Link to="/activities">
            <button className={styles.btnCreateAct}>Create Activity</button>
          </Link>
        </div>
      </div>

      <div className={styles.cardDesign}>
        {currentCountry.map((el) => {
          return (
            <CountryCard
              key={el.id}
              id={el.id}
              flag={el.flag}
              name={el.name}
              continent={el.continent}
            />
          );
        })}
      </div>
      <Pagination
        countriesPerPage={countriesPerPage}
        countries={countries.length}
        paginated={paginated}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCountries,
  orderByName,
  orderByPopulation,
} from "../../react/actions/actions";
import Continent from "../Continent/Continent";
import Nav from "../Nav/Nav";
import CountryCard from "../Country-Card/CountryCard";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry =
    currentPage === 1 ? 9 : currentPage * countriesPerPage - 1; // 10
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage; // 0
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
  }, [dispatch]);
  // Sirve para traerme del estado los paises del componente cuando se monta

  const handleReload = (e) => {
    e.preventDefault();
    dispatch(getAllCountries());
  };

  const handleSortCountry = (e) => {
    e.preventDefault();
    // e.setCurrentPage(1)
    dispatch(orderByName(e.target.value));
    setOrden(`order ${e.target.value}`);
  };

  const handleSortPopulation = (e) => {
    e.preventDefault();
    // e.setCurrentPage(1)
    dispatch(orderByPopulation(e.target.value));
    setOrden(`order ${e.target.value}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.btReload}>
        <button
          onClick={(e) => {
            handleReload(e);
          }}
        >
          Reload countries
        </button>
      </div>

      {/* <Activity /> */}

      <div className={styles.filter}>
        <select onChange={(e) => handleSortCountry(e)}>
          <option defaultValue="">Alphabetic Name</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>

        <select onChange={(e) => handleSortPopulation(e)}>
          <option defaultValue="">Poblacion</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      {/* <div className="Continent">
        <Continent />
      </div> */}
      <Nav />
      <SearchBar  setCurrentPage={setCurrentPage} />

      <div className={styles.cardDesign}>
        {currentCountry.map((el) => {
          return (
            <CountryCard
              className={styles.cardDesign}
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

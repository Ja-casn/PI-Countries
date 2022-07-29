import React from "react";
import { Link } from "react-router-dom";
import styles from "./CountryCard.module.css";

const CountryCard = ({ flag, name, continent, id }) => {
  return (
    <div className={styles.countryCard}>
      <Link to={`/countries/${id}`}>
        <div className={styles.imgCountry}>
          <img src={flag} alt={id} />
        </div>
        <span className={styles.pagraph}>
          <p>{name}</p>
          <p>{continent}</p>
        </span>
      </Link>
    </div>
  );
};

export default CountryCard;

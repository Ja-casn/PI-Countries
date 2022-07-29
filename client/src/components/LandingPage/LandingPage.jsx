import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingDiv}>
      <h1 className={styles.h1}>
        "The world is a book, and those who do not travel read only a page."
      </h1>
      <button className={styles.button}>
        <NavLink to="/countries">
          <p>Explore the countries</p>
        </NavLink>
      </button>
    </div>
  );
};

export default LandingPage;

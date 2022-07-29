import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import btn from "../Home/Home.module.css"

const LandingPage = () => {
  return (
    <div className={styles.landingDiv}>
      <span className={styles.pTitle}>
        "The world is a book, and those who do not travel read only a page."
      </span>
      <button className={btn.btnReload}>
        <Link to="/countries">
          <span className={styles.content}>Explore the countries</span>
        </Link>
      </button>
    </div>
  );
};

export default LandingPage;

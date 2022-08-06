import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.mainContainerDiv}>
      <div className={styles.insideDiv}>
        <div className={styles.infoP}>
          <p>Developed by Jose Casanova</p>
          <a href="https://www.linkedin.com/in/jacasanova98/">
          <img className={styles.landingIMG} src="https://img.icons8.com/color/48/000000/linkedin.png" alt="linkedinImg"/>
        </a>
        </div>
        <div className={styles.pTitle}>
          "The world is a book, and those who do not travel read only a page."
        </div>

        <button className={styles.btnReload}>
          <Link to="/countries">
            <span className={styles.content}>Explore the countries</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Continent from "../Continent/Continent";
import styles from "./Nav.module.css";

const Nav = ({ setCurrentPage }) => {
  return (
    <div className={styles.containerNav}>
      <Continent />
    </div>
  );
};

export default Nav;

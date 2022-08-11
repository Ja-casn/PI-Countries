import React from "react";
import styles from './pagination.module.css'

export default function Pagination({currentPage, setCurrentPage, countriesPerPage, countries, paginated}) {
  let pageNumber = [];

  let maxPages = Math.ceil((countries) / countriesPerPage)

  for (let i = 1; i <= maxPages; i++) {
    pageNumber.push(i);
  }

  const prevClick = () => {
    setCurrentPage(currentPage - 1)
  }

  const nextClick = () => {
    setCurrentPage(currentPage + 1)
  }


  return (
      <div className={styles.paginated}>
        <button className={styles.movesBtn} disabled={currentPage <= 1} onClick={prevClick} >Prev</button>
        
        {pageNumber?.map((number) => (
          <button className={number === currentPage ? styles.btnUnSelect : styles.btnStyle } key={number} onClick={() => paginated(number)}>{number}</button>
        ))}

      <button className={styles.movesBtn} disabled={currentPage >= maxPages} onClick={nextClick} >Next</button>
      </div>
  );
}

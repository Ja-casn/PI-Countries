import React from "react";
import styles from './pagination.module.css'
import buttonStyle from '../Home/Home.module.css'

export default function Pagination({currentPage, setCurrentPage, countriesPerPage, countries, paginated }) {
  let pageNumber = [];

  let maxPages = 1 + Math.ceil((countries - 9) / countriesPerPage)

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
        <button style={{color: "white", backgroundImage: "linear-gradient(100% 100% at 100% 0%, #303638 0%, #0c113689 100%)", borderRadius: "10px"}} disabled={currentPage <= 1} onClick={prevClick} >Prev</button>
        
        {pageNumber?.map((number) => (
          <button className={styles.btnStyle} key={number} onClick={() => paginated(number)}>{number}</button>
        ))}

      <button style={{color: "white", backgroundImage: "radial-gradient(100% 100% at 100% 0%, #303638 0%, #0c113689 100%)", borderRadius: "10px"}} disabled={currentPage >= maxPages} onClick={nextClick} >Next</button>
      </div>
  );
}

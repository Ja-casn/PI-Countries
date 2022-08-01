import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountriesDetail } from "../../react/actions/actions";
import styles from "./CountryDetail.module.css";

const CountryDetail = (props) => {
  const countryDetail = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  let { idCountry } = useParams();

  useEffect(() => {
    dispatch(getCountriesDetail(idCountry));
  }, [dispatch]);

  console.log(countryDetail, "COUNTRY DETAIL");
  // console.log(countryDetail.touristActivities, 'fucking country detail');

  return (
    <div>
      <div>
        <button
          className={styles.btnReload}
          onClick={() => props.history.goBack()}
        >
          Back to countries
        </button>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.flagContainer}>
          <h2>{countryDetail.name}</h2>
          <img className={styles.img} src={countryDetail.flag} alt="No img" />

          {/* <div className={styles.activityDetail}>
          <h4>Activity:</h4>
            {countryDetail.touristActivities?.length === 0 ? (
              <h3>Has no activities</h3>
            ) : (
              countryDetail.touristActivities?.map((e) => {
                return (
                  <div className={styles.activitiies}>
                    <span ><h4>Name: {e.name}</h4></span>
                    <span ><h4>Difficulty: {e.difficulty}</h4></span>
                    <span ><h4>Duration: {e.duration}</h4></span>
                    <span ><h4>Season: {e.season}</h4></span>
                  </div>
                );
              })
            )}
          </div> */}
        </div>

        <div className={styles.infoDetail}>
          <h4>Code: {countryDetail.id}</h4>
          <h4>Subregion: {countryDetail.subregion}</h4>
          <h4>Capital: {countryDetail.capital}</h4>
          <h4>Area: {countryDetail.area} Km2</h4>
          <h4>Population: {countryDetail.population} Hab. </h4>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;

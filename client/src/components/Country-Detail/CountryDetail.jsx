import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountriesDetail } from "../../react/actions/actions";
import styles from "./CountryDetail.module.css";

const CountryDetail = () => {
  const countryDetail = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  let { idCountry } = useParams();
  
  useEffect(() => {
    dispatch(getCountriesDetail(idCountry));
  }, [dispatch, idCountry]);

  console.log(countryDetail, "COUNTRY DETAIL");
  // console.log(countryDetail.touristActivities, 'fucking country detail');

  return (
    <div>
      <button>
        <Link to="/countries">Back to countries</Link>
      </button>

      <div>
        <h1>{countryDetail.name}</h1>
        <h3>{countryDetail.id}</h3>
        <div>
          <img src={countryDetail.flag} alt="No img" />
        </div>
        <h4>Region: {countryDetail.region}</h4>
        <h5>Subregion: {countryDetail.subregion}</h5>
        <h5>Capital: {countryDetail.capital}</h5>
        <h5>Area: {countryDetail.area} Km2</h5>
        <h5>Population: {countryDetail.population} Hab. </h5>
        <h5>Activity:</h5>
        
        {/* <div >
          <Activity
            countryName={countryDetail.name}
            activities={countryDetail.activities}
          />
        </div> */}
      </div>
    </div>
  );
};

export default CountryDetail;

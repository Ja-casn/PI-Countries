import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContinent } from "../../react/actions/actions";

const Continent = () => {
  const countries = useSelector((state) => state.countries);
  const allContinents = countries.map((el) => el.continent);
  // const allContinents = [
  //   "Asia",
  //   "South America",
  //   "North America",
  //   "Africa",
  //   "Antarctica",
  //   "Europe",
  //   "Oceania",
  // ];
  const fixSetContinent = new Set(allContinents); // saca repetidos

  const setToArray = [...fixSetContinent];

  const dispatch = useDispatch();

  const handleClickFilter = (e) => {
    // e.preventDefault();
    dispatch(getContinent(e.target.value));
  };

  return (
    <div className="select-continent">
      <select onChange={(e) => handleClickFilter(e)}>
      <option value="all">Continents</option>
        {setToArray.map((el, i) => (
          <option value={el} key={i}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Continent;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Home/Home.module.css";
import {
  filterByActivity,
  getAllActivities,
  getAllCountries,
} from "../../react/actions/actions";



const AllActivities = () => {
  const totalCountries = useSelector((state) => state.countries);

  let valueActivity = [];

  totalCountries.map(
    (data) =>
      data.touristActivities?.map(
        (activity) => activity.name && valueActivity.push(activity.name) //aca pusheo todas las actividades
      )
  );

  // console.log(valueActivity);

  let uniqueAct = valueActivity.filter(function (act, index, array) {
    //aca los creo sin repetidos
    return array.indexOf(act) === index;
  });


  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.target.value === "All") {
      return dispatch(getAllCountries());
    }
    dispatch(filterByActivity(e.target.value));
  };



  return (
    <div>
      <select className={styles.filter} onChange={(e) => handleOnChange(e)}>
        <option value="All">All activities</option>
        {uniqueAct.map((act, i) => {
          return (
            <option value={act.name} key={i}>
              {act}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AllActivities;

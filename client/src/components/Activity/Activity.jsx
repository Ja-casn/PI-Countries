import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Home/Home.module.css";
import {
  filterByActivity,
  getAllActivities,
  getAllCountries,
} from "../../react/actions/actions";

const AllActivities = () => {
  const totalActivities = useSelector((state) => state.activities);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllActivities())
  }, [dispatch])

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
        {totalActivities.map((act, i) => {
          return (
            <option value={act.name} key={i}>
              {act.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AllActivities;

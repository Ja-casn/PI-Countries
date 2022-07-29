import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByActivity,
  getAllActivities,
  getAllCountries,
} from "../../react/actions/actions";


const Activity = () => {
  const countries = useSelector((state) => state.countries);

  let valueActivity = [];

  countries.map(
    (data) =>
      data.TouristActivity &&
      data.TouristActivity.map(
        (activity) => activity.name && valueActivity.push(activity.name) //aca pusheo todas las actividades
      )
  );

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

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <div>
      <select onChange={(e) => handleOnChange(e)}>
        <option value="All">All activities</option>
        {uniqueAct.map((act, index) => {
          return (
            <option key={index} value={act.name}>
              {act}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Activity;

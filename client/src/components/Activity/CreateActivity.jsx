import React, { useEffect, useState } from "react";
// import { connect } from 'react-redux'
import {
  getAllActivities,
  getAllCountries,
  postActivity,
} from "../../react/actions/actions";
import styles from "./createActivity.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import btn from "../Home/Home.module.css";

function validate(myForm) {
  let errors = {};

  if (isNaN(myForm.name) !== true || !myForm.name || /\s/g.test(myForm.name)) {
    // name es requerido y no acepta espacios en blancos.
    errors.name =
      "The name of the activity is required, numbers and spaces are not allowed";
  } else if (!/^[a-zA-Z0-9& áéíóú]+$/.test(myForm.name)) {
    // no permiten que hayan caracteres especiales
    errors.name = "Activity name is invalid, no special characters are allowed"; // -> "/[$%&|<>#]/" valida caracteres especiales
  }

  if (!myForm.duration) {
    // duration es requerido
    errors.duration = "Duration is required";
  }

  if (!myForm.difficulty) {
    errors.difficulty = "Difficulty is required, please choose one option";
  }

  if (!myForm.season) {
    errors.season = "Season is required, please choose one option";
  }

  if (myForm.countries.length < 1) {
    errors.countryId =
      "At least one country is required, please choose from the list";
  }

  return errors;
}

const CreateActivity = (props) => {
  const totalCountries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState({ created: false, error: false });
  const [myForm, setMyForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch, myForm]);

  console.log(totalCountries);

  const handleChange = (e) => {
    // console.log(e.target.value)
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...myForm, [e.target.name]: e.target.value }));
  };

  const handleChangeCountry = (ev) => {
    if (ev.target.value) {
      if (
        !myForm.countries?.includes(ev.target.value) &&
        ev.target.value !== "Countries"
      ) {
        setMyForm({
          ...myForm,
          countries: [...myForm.countries, ev.target.value],
        });
        setErrors(
          validate({
            ...myForm,
            [ev.target.name]: ev.target.value,
          })
        );
        console.log(errors);
      }
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (
      !myForm.name ||
      !myForm.difficulty ||
      !myForm.duration ||
      !myForm.season ||
      myForm.countries.length < 1
    ) {
      alert("There is missing a field");
    } else {
      {
        dispatch(
          postActivity({
            name: myForm.name,
            difficulty: parseInt(myForm.difficulty),
            duration: parseInt(myForm.duration),
            season: myForm.season,
            countries: myForm.countries,
          })
        );
      }
      alert("Your activity has created");
    }
  };

  const removeCountry = (e) => {
    setMyForm({
      ...myForm,
      countries: myForm.countries?.filter((elem) => {
        return elem !== e;
      }),
    });
  };
  return (
    <div>
      <button className={btn.btnReload} onClick={() => history.goBack()}>
        Back to countries
      </button>
      <div>
        <div>
          <h1>Create Activity</h1>
          <form className={styles.inputs} onSubmit={handleSubmit}>
            <h4>Name:</h4>
            <input
              className={styles.inputsActivity}
              key="1"
              name="name"
              type="text"
              placeholder="Name"
              value={myForm.name}
              onChange={handleChange}
            />
            <span className={styles.errors}>{errors.name && <span>{errors.name}</span>}</span>
            <h4>Difficulty: {myForm.difficulty}</h4>
            <input
              className={styles.inputsActivity}
              key="2"
              name="difficulty"
              type="range"
              min="0"
              max="5"
              value={myForm.difficulty}
              placeholder="Difficulty"
              onChange={handleChange}
            >
              </input>
            <span className={styles.errors}>{!errors.difficulty ? null : <span>{errors.difficulty}</span>}</span>
            <h4>Duration:</h4>
            <input
              className={styles.inputsActivity}
              key="3"
              name="duration"
              type="time"
              value={myForm.duration}
              placeholder="Duration"
              onChange={handleChange}
            />
            <span className={styles.errors}>{!errors.duration ? null : <span>{errors.duration}</span>}</span>
            <h4>Season:</h4>
            <select
              className={styles.inputsActivity}
              key="4"
              name="season"
              onChange={handleChange}
              value={myForm.season}
            >
              <option key="defaultValue" value="Season">
                Season
              </option>
              <option key="value1" value="Spring">
                Spring
              </option>
              <option key="value2" value="Summer">
                Summer
              </option>
              <option key="value3" value="Autumn">
                Autumn
              </option>
              <option key="value4" value="Winter">
                Winter
              </option>
            </select>
            <span className={styles.errors}>{!errors.season ? null : <span>{errors.season}</span>}</span>

            <h4>Countries:</h4>
            <select
              className={styles.inputsActivity}
              name="countries "
              onChange={handleChangeCountry}
              value={myForm.countries}
            >
              <option value="Countries">Countries</option>
              {totalCountries &&
                totalCountries.map((e) => (
                  <option key={e.id}> {e.name}</option>
                ))}
            </select>
            {!errors.countries ? null : <span>{errors.countries}</span>}

            {/* <input className='submit' type="submit" value='Create' /> */}
            <button
              className="enviar"
              type="submit"
              disabled={
                errors.name ||
                errors.difficulty ||
                errors.duration ||
                errors.season ||
                errors.countries
                  ? true
                  : false
              }
            >
              Submit
            </button>
          </form>
        </div>
        <div className={styles.addRemove}>
          {myForm.countries?.map((e) => {
            return (
              <div key={e} className={styles.nameCountry}>
                <h3 key={e} className="nombre">
                  {e}
                </h3>
                <button onClick={() => removeCountry(e)} className="botoncito">
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateActivity;

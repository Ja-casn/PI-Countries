import React, { useEffect, useState } from "react";
// import { connect } from 'react-redux'
import { getAllActivities, postActivity } from "../../react/actions/actions";
import styles from "./createActivity.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function validate(myForm) {
  let errors = {};

  if (isNaN(myForm.name) !== true || !myForm.name || /\s/g.test(myForm.name)) {
    // name es requerido y no acepta espacios en blancos.
    errors.name = "Only letters";
  } else if (!/^[a-zA-Z0-9& áéíóú]+$/.test(myForm.name)) {
    // no permiten que hayan caracteres especiales
    errors.name = "No special characters are allowed"; // -> "/[$%&|<>#]/" valida caracteres especiales
  }

  if (!myForm.duration) {
    // duration es requerido
    errors.duration = "Duration is required";
  }

  if (!myForm.difficulty) {
    errors.difficulty = "Choose one option";
  }

  if (!myForm.season) {
    errors.season = "Choose one option";
  }

  if (myForm.countries.length < 1) {
    errors.countryId = "Choose at least one from the list";
  }

  return errors;
}

const CreateActivity = () => {
  const totalCountries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
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

  // console.log(totalCountries);

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
        // console.log(errors);
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
      dispatch(
        postActivity({
          name: myForm.name,
          difficulty: parseInt(myForm.difficulty),
          duration: parseInt(myForm.duration),
          season: myForm.season,
          countries: myForm.countries,
        })
      )
      history.push('/countries')
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
    <div className={styles.mainContainerAct}>
      <button className={styles.btnReload} onClick={() => history.goBack()}>
        Back to countries
      </button>

      <h1>Create Activity</h1>
      <form className={styles.inputs} onSubmit={handleSubmit}>
        <label className={styles.labelName}>Name:</label>
        <input
          className={styles.inputsActivity}
          key="1"
          name="name"
          type="text"
          placeholder="Name"
          value={myForm.name}
          onChange={handleChange}
        />
        <span className={styles.errorsName}>
          {errors.name && <span>{errors.name}</span>}
        </span>

        <label className={styles.labelDifficulty}>
          Difficulty: {myForm.difficulty}
        </label>
        <input
          className={styles.inputsActivity}
          key="2"
          name="difficulty"
          type="range"
          min="1"
          max="5"
          value={myForm.difficulty}
          placeholder="Difficulty"
          onChange={handleChange}
        ></input>
        <span className={styles.errorsDifficulty}>
          {!errors.difficulty ? null : <span>{errors.difficulty}</span>}
        </span>
        <label className={styles.labelDuration}>Duration:</label>
        <input
          className={styles.inputsActivity}
          key="3"
          name="duration"
          type="time"
          value={myForm.duration}
          placeholder="Duration"
          onChange={handleChange}
        />
        <span className={styles.errorsDuration}>
          {!errors.duration ? null : <span>{errors.duration}</span>}
        </span>
        <label className={styles.labelSeason}>Season:</label>
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
        <span className={styles.errorsSeason}>
          {!errors.season ? null : <span>{errors.season}</span>}
        </span>

        <label className={styles.labelCountries}>Countries:</label>
        <select
          className={styles.inputsActivity}
          name="countries"
          // multiple={true}
          onChange={handleChangeCountry}
          value={myForm.countries}
        >
          <option value="Countries">Countries</option>
          {totalCountries &&
            totalCountries.map((e) => <option key={e.id}> {e.name}</option>)}
        </select>
        <span className={styles.errorsCountry}>
          {!errors.countries ? null : <span>{errors.countries}</span>}
        </span>

        <button
          className={styles.submitBtn}
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

        <div className={styles.nameCountry}>
          {myForm.countries?.map((e) => {
            return (
              <div key={e} className={styles.orderCountry}>
                <h3 key={e} className={styles.borderCountry}>
                  {e}
                </h3>
                <button
                  onClick={() => removeCountry(e)}
                  className={styles.removeBtn}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default CreateActivity;

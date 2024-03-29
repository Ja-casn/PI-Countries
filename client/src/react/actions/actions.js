import { GET_COUNTRIES_DETAIL, GET_ACTIVITIES, GET_ALLCOUNTRIES, GET_CONTINENT, GET_COUNTRY_QUERY, LOCALHOST, FILTER_ACTIVITY, ORDER_BY_NAME, ORDER_BY_POPULATION } from '../actions-types/actionsTypes';
import axios from 'axios';

export const getAllCountries = () => async (dispatch) => {
    const response = await axios.get(`/countries`)
    dispatch({ type: GET_ALLCOUNTRIES, payload: response.data })
}

export const getCountryQuery = (name) => async (dispatch) => {
    try {
        const response = await axios.get(`/countries?name=${name}`)
        dispatch({ type: GET_COUNTRY_QUERY, payload: response.data })
    } catch (error) {
        if (error.response) {
            alert(error.response.data)
        }
    }
}

export const getCountriesDetail = (idCountry) => async (dispatch) => {
    const response = await axios.get(`/countries/${idCountry}`)
    dispatch({ type: GET_COUNTRIES_DETAIL, payload: response.data })

}
// NO ES ASYNC PORQUE NO TIENE QUE ESPERAR NINGUNA RESPUESTA AL BACK
export const getContinent = (payload) => {
    return ({
        type: GET_CONTINENT, 
        payload
    })
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
}


export const filterByActivity = (payload) => async (dispatch) => {
    const response = await axios.get('/countries')

    console.log(payload)

    if (payload === 'All') {
        dispatch({ type: FILTER_ACTIVITY, payload: response.data })
    }
    const response2 = await response.data.filter((e) => (
        e.touristActivities.filter((el) => el.name === payload).length
    )
)

    console.log(response2)
    dispatch({ type: FILTER_ACTIVITY, payload: response2 })


}

export const getAllActivities = () => async (dispatch) => {
    const response = await axios.get('/activities')
    dispatch({ type: GET_ACTIVITIES, payload: response.data })
}

export const postActivity = (values) => async () => {

    const response = await axios.post(`/activities`, values)
    return response

}
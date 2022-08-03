// importing action types


import { GET_COUNTRIES_DETAIL, CREATE_ACTIVITY, GET_ALLCOUNTRIES, GET_CONTINENT, GET_COUNTRY_QUERY, FILTER_ACTIVITY, ORDER_BY_NAME, ORDER_BY_POPULATION, GET_ACTIVITIES } from "../../react/actions-types/actionsTypes";

const initialState = {
    countries: [],
    countriesCopy: [],
    activities: [],
    activityDetail: {},
    countryDetail: {},

}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALLCOUNTRIES:
            return {
                ...state,
                countries: action.payload,
                countriesCopy: action.payload
            }
        case GET_COUNTRY_QUERY:
            return {
                ...state,
                countries: action.payload
            }
        case GET_COUNTRIES_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            }
        case GET_CONTINENT:
            const allCountries = state.countriesCopy
            const filterContinent = action.payload === 'all' ? allCountries : allCountries.filter((el) => el.continent === action.payload)

            return {
                ...state,
                countries: filterContinent
            }
        case ORDER_BY_NAME:
            const orderByName = action.payload === 'asc' ? state.countries.sort((a, b) => {
                if (a.name < b.name) {
                    return -1
                }
                if (a.name > b.name) {
                    return 1
                }
                return 0
            })
                : state.countries.sort((a, b) => {
                    if (a.name < b.name) {
                        return 1
                    }
                    if (a.name > b.name) {
                        return -1
                    }
                    return 0
                })
            return {
                ...state,
                countries: orderByName
            }
        case ORDER_BY_POPULATION:
            const orderByPopulation = action.payload === 'asc' ? state.countries.sort((a, b) => {
                return b.population - a.population
            })
                : state.countries.sort((a, b) => {
                   return a.population - b.population
                })
            return {
                ...state,
                countries: orderByPopulation
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                activityDetail: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case FILTER_ACTIVITY:
            return {
                ...state,
                countries: action.payload
            }
        default:
            return state
    }
}

export default mainReducer;
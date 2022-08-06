const axios = require('axios');
const { Country } = require('../db')


const getInfoApi = () => {
    return axios.get("https://restcountries.com/v3/all")
        .then((results) => {
            const mapeandoData = results.data.map((el) => {
                Country.findOrCreate({
                    where: {
                        id: el.cca3,
                        name: el.name.common ? el.name.common : "doesn't have name",
                        flag: el.flags ? el.flags[1] : "doesn't have flag",
                        continent: el.continents ? el.continents[0] : "doesn't have continent",
                        capital: el.capital ? el.capital[0] : "doesn't have capital",
                        subregion: el.subregion ? el.subregion : "doesn't have subregion",
                        area: el.area,
                        population: el.population,
                        codecountry: Math.ceil(Math.random(0) * 100)
                    }
                })
            })
            return mapeandoData
        })
        .catch((error) => console.log(error))
}

module.exports = getInfoApi;
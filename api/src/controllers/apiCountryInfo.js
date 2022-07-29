const axios = require('axios');
const { Country } = require('../db')


// const getInfoApi = async () => {
//     // const full = await Country.count(); // VERIFYING IF THE TABLE HAS DATA.
//     // console.log(!full)
//     // ver porque si no se hace la verificacion de si esta llena da error
//     // if (full === 0) {
//     try {
//         const api = await axios.get("https://restcountries.com/v3/all");
//         // console.log(api.data)
//         const mapData = await api.data.map((el) => {
//             Country.findOrCreate({
//                 where: {
//                     id: el.cca3,
//                     name: el.name.common ? el.name.common : "doesn't have name",
//                     flag: el.flags ? el.flags[1] : "doesn't have flag",
//                     continent: el.continents ? el.continents[0] : "doesn't have continent",
//                     capital: el.capital ? el.capital[0] : "doesn't have capital",
//                     subregion: el.subregion ? el.subregion : "doesn't have subregion",
//                     area: el.area,
//                     population: el.population,
//                 }
//             })
//         })
//         return mapData
//     } catch (error) {
//         next(error)
//     }

//     // } else {
//     //     console.log("DB HAD ALREADY DATA");
//     // }
// }

const getInfoApi = () => {
    return axios.get("https://restcountries.com/v3/all")
        .then((mapData) => {
            const mapeandoData = mapData.data.map((el) => {
                Country.findOrCreate({
                    where: {
                        id: el.cca3,
                        name: el.name.common ? el.name.common : "doesn't have name",
                        flag: el.flags ? el.flags[0] : "doesn't have flag",
                        continent: el.continents ? el.continents[0] : "doesn't have continent",
                        capital: el.capital ? el.capital[0] : "doesn't have capital",
                        subregion: el.subregion ? el.subregion : "doesn't have subregion",
                        area: el.area,
                        population: el.population,
                    }
                })
            })
            return mapeandoData
        })
        .catch((e) => console.log(e))



    // } else {
    //     console.log("DB HAD ALREADY DATA");
    // }
}

module.exports = getInfoApi;
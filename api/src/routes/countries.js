const { Router } = require('express');
const { Op } = require('sequelize');

const { Country, TouristActivity } = require('../db')
const router = Router();

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    // const allCountries = await Country.findAll({include: TouristActivity});
    // const allCountries = await getAllCountries();
    // console.log(name)

    try {
        if (!name) { // /countries?name= 
            const countryAll = await Country.findAll({
                include: TouristActivity
            }
            );
            res.send(countryAll);
            /*
            Preguntamos si no tiene nombre, de ser asi, creamos una constante donde le asignamos el await para que espere que dicha informacion sea traida y en la tabla Country buscamos todos los paises incluyendonos la actividad
          */
        } else {  //si llega name por query hacemos esto:
            const countryQuery = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%` // arg > argentina, ven -> venezia venezuela
                    },
                },
                include: TouristActivity
            });

            // const countryQuery = await getDbInfo();

            // console.log(countryQuery)

            // let includname = countryQuery.filter((el) => el.name.toLowerCase().startsWith(name.toLowerCase()))

            if (countryQuery.length === 0) {
                return res
                    .status(404)
                    .send(
                        `there is no country with name ---> ${name}`,
                    );
            }
            // /countries
            return res.send(countryQuery);

            /*
            En el if de la linea 36, verificamos si nuestra constante countryQuery es igual a 0, es decir que no tiene informacion, si es asi, entonces retornamos un status 404 y un mensaje de error. 

            Si countryQuery tiene informacion, es decir que si existe un pais que corresponda a los de nuestra info, retornamos dicha informacion del pais.
            */
        }
    } catch (error) {
        next(error);
    }
})

// router.get('/', (req, res, next) => {
//     const { name } = req.query;

//     if (!name) { // /countries?name= 
//         Country.findAll({ include: TouristActivity })
//             .then((countryAll) => {
//                 res.send(countryAll);
//             })
//             .catch((e) => next(e))

//     } else {  //si llega name por query hacemos esto:
//         Country.findAll({
//             where: {
//                 name: {
//                     [Op.iLike]: `%${name}%` // arg > argentina, ven -> venezia venezuela
//                 },
//             },
//             include: TouristActivity
//         })
//             .then((countryQuery) => {
//                 if (countryQuery.length === 0) {
//                     return res
//                         .status(404)
//                         .send({
//                             error: `there is no country with name , ${name}`,
//                         });
//                 } else {
//                     return res.send(countryQuery);
//                 }
//             })
//             .catch((e) => next(e))
//     }
// })

router.get('/:idCountry', async (req, res, next) => { // /countries/:idCountry
    const { idCountry } = req.params;

    const countryById = await Country.findByPk(idCountry.toUpperCase(), {
        include: TouristActivity
    })

    if (!countryById) {
        return res.status(404).send(`This ${idCountry} does not belong to a country`)
    }


    return res.status(200).send(countryById)

})
module.exports = router;


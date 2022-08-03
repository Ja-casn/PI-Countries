const { Router } = require('express');
const { Op } = require('sequelize');

const { Country, TouristActivity } = require('../db')
const router = Router();

router.get('/', async (req, res, next) => {
    const { name } = req.query;

    try {
        if (!name) { // /countries?name= 
            const countryAll = await Country.findAll({
                include: TouristActivity
            }
            );
            res.send(countryAll);
        } else {  //si llega name por query hacemos esto:
            const countryQuery = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    },
                },
                include: TouristActivity
            });
            if (countryQuery.length === 0) {
                return res
                    .status(404)
                    .send(
                        `there is no country with name ---> ${name}`,
                    );
            }
            return res.status(200).send(countryQuery);
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


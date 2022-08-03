const { Router } = require('express');
const { Country, TouristActivity } = require('../db');
const router = Router();

router.get('/', async (req, res, next) => {
    const allActivities = await TouristActivity.findAll({
        include: Country
    }
    );
    res.send(allActivities);

})

router.post('/', async (req, res, next) => {
    let { name, difficulty, duration, season, countries } = req.body;
    const newActivity = { name, difficulty, duration, season };

    try {
        const validAct = await TouristActivity.findOne({
            where: {
                name: name
            }
        })
        if (!validAct) {
            const createActivity = await TouristActivity.create(newActivity)
            let matchCountry = await Country.findAll({
                where: {
                    name: countries
                }
            })
            await createActivity.addCountry(matchCountry)
            res.status(200).send('Your activity has created')
        } else {
            let matchCountry2 = await Country.findAll({
                where: {
                    name: countries
                }
            })
            await validAct.addCountry(matchCountry2)
            res.status(200).send('Your activity has created')
        }

    } catch (error) {
        next(error)
    }


})
// si el usuario escribe la palabra correr y esa actividad ya existe, si no hago validacion al momento de traerme el get con todas las actividades, me voy a traer corre correr 100 veces.

module.exports = router;

// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes
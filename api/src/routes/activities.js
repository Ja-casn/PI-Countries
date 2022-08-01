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

    // si el nombre existe ya en TouristActivity, entonces, guardame el nombre en una constante, y luego al momento de crear una nueva actividad le voy a pasar como name, dicha constante.

    /* Checking if the fields are empty. */
    if (!name || !difficulty || !duration || !season) {
        return res.status(404).send('faltan campos por completar');
    }

    try {
        const createActivity = await TouristActivity.create(newActivity)

        let bringCountry = await Country.findAll({ where: { name: countries } })

        createActivity.addCountry(bringCountry)
        return res.status(201).send('You have create a new activity')

    } catch (error) {
        next(error)
    }


})
// si el usuario escribe la palabra correr y esa actividad ya existe, si no hago validacion al momento de traerme el get con todas las actividades, me voy a traer corre correr 100 veces.

module.exports = router;

// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes
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


module.exports = router;

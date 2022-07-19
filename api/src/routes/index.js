const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRoute = require('./activities');
const activityRoute = require('./countries');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countriesRoute) // /api/countries
router.use('/activity', activityRoute) // /api/activity

module.exports = router;

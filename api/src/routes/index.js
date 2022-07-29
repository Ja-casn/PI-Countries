const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRoute = require('./countries');
const activityRoute = require('./activities');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countriesRoute) // /countries
router.use('/activities', activityRoute) // /api/activity

module.exports = router;

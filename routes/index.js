const express = require('express');
const router = express.Router();

// router for api routers
router.use('/doctors', require('./doctorRoutes.js'));
// router.use('/patients', require('./patientRoutes.js'));
// router.use('/reports', require('./reportRoutes.js'));

module.exports = router;

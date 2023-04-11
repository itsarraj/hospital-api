const express = require('express');
const router = express.Router();

// router for api routers
router.use('/api', require('./api'));
router.use('/doctors', require('./doctorRoutes.js'));

module.exports = router;

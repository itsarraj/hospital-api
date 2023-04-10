const express = require('express');
const router = express.Router();

// router for api routers
router.use('/api', require('./api'));

module.exports = router;

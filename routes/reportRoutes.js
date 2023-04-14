const express = require('express');
const router = express.Router();

// controllers imports
const reportController = require('../controllers/reportController');
// router for api routers

router.get('/:status', reportController.fetchReportsByStatus);

module.exports = router;

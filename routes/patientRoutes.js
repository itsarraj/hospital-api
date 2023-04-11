const express = require('express');
const router = express.Router();

// controllers imports
const patientController = require('../controllers/patientController');
// router for api routers

router.get('/register', patientController.register);
router.get('/:id/create-report', patientController.createReports);
router.get('/:id/all-report', patientController.allReports);

module.exports = router;

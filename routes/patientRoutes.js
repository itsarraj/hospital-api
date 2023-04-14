const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers imports
const patientController = require('../controllers/patientController');
// router for api routers

router.post(
    '/register',
    passport.authenticate('jwt', { session: false }),
    patientController.register
);
router.post(
    '/:id/create-report',
    passport.authenticate('jwt', { session: false }),
    patientController.createReport
);
router.get(
    '/:id/all-report',
    passport.authenticate('jwt', { session: false }),
    patientController.allReports
);

module.exports = router;

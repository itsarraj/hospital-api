const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers imports
const doctorsController = require('../controllers/doctorController');
// router for api routers

router.get('/register', doctorsController.register);
router.post(
    '/register/register-doctor-profile',
    doctorsController.registerDoctorProfile
);
router.get('/login', doctorsController.login);
router.post(
    '/create-session',
    passport.authenticate('local', {
        failureRedirect: '/login',
    }),
    doctorsController.createSession
);

module.exports = router;

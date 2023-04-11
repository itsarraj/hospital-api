const express = require('express');
const router = express.Router();

// controllers imports
const doctorsController = require('../controllers/doctorController');
// router for api routers

router.get('/register', doctorsController.register);
router.get('/register/create-profile', doctorsController.createProfile);
router.get('/login', doctorsController.login);

module.exports = router;

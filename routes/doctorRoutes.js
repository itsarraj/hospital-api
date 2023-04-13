const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers imports
const doctorsController = require('../controllers/doctorController');
// router for api routers

router.post('/register', doctorsController.register);
router.post('/login', doctorsController.login);

module.exports = router;

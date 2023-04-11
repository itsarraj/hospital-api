const express = require('express');
const router = express.Router();

// controllers imports
const reportController = require('../controllers/doctorController');
// router for api routers

router.get('/:status', reportController.register);

module.exports = router;

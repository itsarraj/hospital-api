const express = require('express');
const router = express.Router();

router.get('/', doctorsApi.index);

module.exports = router;

const express = require('express');
const env = require('./config/environment.js');
const app = express();
require('./config/view-helpers.js')(app);

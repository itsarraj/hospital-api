const express = require('express');
const app = express();
const env = require('./config/environment.js');

const port = env.port_number;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');

// Models importing
const Doctor = require('./models/Doctor.js');
const Patient = require('./models/Patient.js');
const Report = require('./models/Report.js');

app.use(logger(env.morgan.mode, env.morgan.options));

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const env = require('./config/environment.js');

const session = require('express-session');
const port = env.port_number;
const db = require('./config/mongoose.js');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy.js');

const MongoStore = require('connect-mongo');
const path = require('path');
const jwt = require('jsonwebtoken');

// Models importing
const Doctor = require('./models/Doctor.js');
const Patient = require('./models/Patient.js');
const Report = require('./models/Report.js');

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use express routes
app.use('/', require('./routes/index.js'));

app.use(passport.initialize());

app.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('listening on port ' + port);
    }
});

const express = require('express');
const session = require('express-session');

const app = express();
const env = require('./config/environment.js');

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

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use express routes
app.use('/', require('./routes/index.js'));

app.use(
    session({
        name: 'Hospital-Api',
        secret: env.session_cookie_key,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 10, // 10 minutes
        },
        // this will store the session in db
        store: MongoStore.create(
            {
                mongoUrl: `mongodb://127.0.0.1/${env.db}`,
                mongooseConnection: db,
                autoRemove: 'disabled',
            },
            function (error) {
                console.log(
                    `Error ( ./index.js ).(app.use(session) : Error in saving session in db || ` +
                        error
                );
            }
        ),
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('listening on port ' + port);
    }
});

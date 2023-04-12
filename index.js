const express = require('express');
const app = express();
const env = require('./config/environment.js');

const port = env.port_number;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const passport = require('passport');
// const passportLocal = require('./config/passport-local-strategy.js');
// const passportJWT = require('./config/passport-jwt-strategy.js');

const path = require('path');
const notie = require('notie');

// Models importing
const Doctor = require('./models/Doctor.js');
const Patient = require('./models/Patient.js');
const Report = require('./models/Report.js');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'assets')));
app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express routes
app.use('/', require('./routes/index.js'));

// set up the view engine
app.set('view engine', env.viewEngine);
app.set('views', './views');

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
                mongoUrl: `mongodb://127.0.0.1/${db}`,
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

app.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('listening on port ' + port);
    }
});

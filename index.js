const express = require('express');
const app = express();
const env = require('./config/environment.js');

const port = env.port_number;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');

const path = require('path');
import notie from 'notie';

// Models importing
const Doctor = require('./models/Doctor.js');
const Patient = require('./models/Patient.js');
const Report = require('./models/Report.js');

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

app.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('listening on port ' + port);
    }
});

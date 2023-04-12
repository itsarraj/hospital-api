const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Doctor = require('../models/Doctor');

// Configure Passport to use LocalStrategy for authentication
passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async function (username, password, done) {
            try {
                // Find the doctor in the database by username
                const doctor = await Doctor.findOne({ username: username });

                if (!doctor) {
                    // Doctor not found
                    return done(null, false, {
                        message: 'Invalid username or password',
                    });
                }

                // Compare the provided password with the stored hashed password
                doctor.comparePassword(password, (error, isMatch) => {
                    if (error) {
                        // Handle error
                        return done(error);
                    }

                    if (isMatch) {
                        return done(null, doctor);
                    } else {
                        // Passwords do not match
                        return done(null, false, {
                            message: 'Invalid username or password',
                        });
                    }
                });
            } catch (error) {
                console.log(
                    'Error ( /config/passport-local-strategy.js ).( passport.use(new LocalStrategy()  )) : Error in Authentication || ' +
                        error
                );
                return done(error);
            }
        }
    )
);

// serialize and deserialize user functions
// Serialize user for session storage
passport.serializeUser(function (doctor, done) {
    // Serialize the Doctor model by storing its id in the session
    done(null, doctor.id);
});

// Deserialize user from session
passport.deserializeUser(async function (id, done) {
    try {
        // Deserialize the Doctor model by finding it in the database using the id stored in the session
        const doctor = await Doctor.findById(id);
        return done(null, doctor);
    } catch (error) {
        console.log(
            'Error ( /config/passport-local-strategy.js ).( passport.deserializeUser() ) : Error in Deserialize || ' +
                error
        );
        return done(error);
    }
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // Use Passport's isAuthenticated() method to check if the user is authenticated
    if (req.isAuthenticated()) {
        return next();
    }
    // If the user is not authenticated, redirect to the login page
    return res.redirect('/doctors/login');
};

// Middleware to set the authenticated user in response locals
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie
        // We can set this to locals for the views

        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/Doctor'); // Replace with your Doctor model

// Define local strategy for doctor login
passport.use(
    'doctor-local',
    new LocalStrategy(
        { usernameField: 'username', passwordField: 'password' },
        async (username, password, done) => {
            try {
                const doctor = await Doctor.findOne({ username });
                if (!doctor) {
                    return done(null, false, {
                        message: 'Incorrect username or password',
                    });
                }

                const isMatch = await doctor.comparePassword(password);
                if (!isMatch) {
                    return done(null, false, {
                        message: 'Incorrect username or password',
                    });
                }

                return done(null, doctor);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Define JWT strategy for doctor authentication
passport.use(
    'doctor-jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'your-secret-key', // Replace with your own secret key
        },
        async (payload, done) => {
            try {
                const doctor = await Doctor.findById(payload.id);
                if (!doctor) {
                    return done(null, false, { message: 'Unauthorized' });
                }

                return done(null, doctor);
            } catch (error) {
                return done(error);
            }
        }
    )
);

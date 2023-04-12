const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

const Doctor = require('../models/Doctor');

let options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = env.jwt_secret;
options.issuer = env.url_name;
options.audience = env.url_name;

passport.use(
    new JWTStrategy(options, async function (jwtPayload, done) {
        try {
            const doctor = await Doctor.findById(jwtPayload._id);
            if (doctor) {
                return done(null, doctor);
            } else {
                return done(null, false);
            }
        } catch (error) {
            console.log(
                'Error ( /config/passport-jwt-strategy.js ).( passport.use(new JWTStrategy()  )) : Error in Authentication || ' +
                    error
            );
        }
    })
);

module.exports = passport;

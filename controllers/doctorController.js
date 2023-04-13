const Doctor = require('../models/Doctor.js');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');

module.exports.register = async function (req, res) {
    //Check if all field enter
    // Check if all fields are entered
    if (
        req.body.username == undefined ||
        req.body.name == undefined ||
        req.body.password == undefined
    ) {
        return res.status(206).json({
            message: 'Incomplete data provided',
        });
    }

    let doctor = await Doctor.find({ username: req.body.username }).exec();
    doctor = JSON.stringify(doctor);
    console.log(doctor);

    if (doctor === []) {
        return res.status(200).json({
            message: 'Doctor already registered',
            data: {
                doctor: {
                    username: req.body.username,
                    // name: doctor.name,
                },
            },
        });
    }

    // if doctor does not exist create a new one
    if (doctor === []) {
        doctor = await Doctor.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
        });

        return res.status(200).json({
            message: 'Doctor registration successful',
            data: {
                doctor: doctor,
            },
        });
    }
    // console.log(
    //     'Error (doctorsController).(module.exports.register): Error in registering doctor || ' +
    //         error
    // );
    // return res.status(500).json({ message: 'Internal server error' });
};

module.exports.login = async function (req, res) {
    passport.authenticate('jwt', { session: false }, (err, doctor, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!doctor) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: doctor._id }, 'your-secret-key', {
            expiresIn: '1h',
        }); // Replace with your own secret key

        // Return JWT token to client
        return res.status(200).json({ token });
    })(req, res, next);
};

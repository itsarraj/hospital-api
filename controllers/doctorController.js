const Doctor = require('../models/Doctor.js');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');

module.exports.register = async function (req, res) {
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

    let doctor = await Doctor.findOne({ username: req.body.username }).exec();
    if (!doctor) {
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
    } else {
        doctor.password = 'Not authorized';
        return res.status(200).json({
            message: 'Doctor already registered',
            data: {
                doctor: doctor,
            },
        });
    }
};

module.exports.login = async function (req, res) {
    if (req.body.username == undefined || req.body.password == undefined) {
        return res.status(206).json({
            message: 'Incomplete data provided',
        });
    }
    try {
        let doctor = await Doctor.findOne({
            username: req.body.username,
        }).exec();
        if (doctor != null) {
            if (req.body.password === doctor.password) {
                console.log('5');

                let token = await jwt.sign(doctor.toJSON(), env.jwt_secret, {
                    expiresIn: '600000',
                });

                return res.status(200).json({
                    data: {
                        token: token,
                    },
                });
            } else if (req.body.username != doctor.username) {
                return res.status(401).json({
                    message: 'Invalid Username',
                });
            } else {
                return res.status(401).json({
                    message: 'Invalid Password',
                });
            }
        } else {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

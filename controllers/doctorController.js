const Doctor = require('../models/Doctor.js');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');
// module.exports.registerDoctorProfile = async function (req, res) {
//     try {
//         let doctor = await Doctor.findOne({ username: req.body.username });

//         // if password does not match the confirm password
//         if (req.body.password != req.body.confirmpassword) {
//         }

//         if (doctor) {
//             // if username is already registered
//             if (req.body.username == doctor.username) {
//                 console.log('Doctor Exists || ', doctor.username);
//                 return res.redirect('/doctors/login');
//             }
//             return res.redirect('/doctors/register');
//         }

//         // if user does not exist create a new one
//         if (!doctor) {
//             Doctor.create({
//                 username: req.body.username,
//                 password: req.body.password,
//                 name: req.body.name,
//             });
//             console.log('Doctor registered successfully');
//             return res.redirect('/doctors/login');
//         }
//         //  else {
//         //     console.log('Doctor Username already registered');
//         //     return res.redirect('/doctors/login');
//         // }
//         return res.status(401).render('
//     } catch (error) {
//         console.log(
//             'Error ( doctorsController ).(module.exports.registerDoctorProfile) : Error in registering doctor || ' +
//                 error
//         );

//         return res.redirect('/doctors/register');
//     }
// };

// module.exports.login = function (req, res) {
//     try {
//         return res.render('doctors_login');
//     } catch (error) {
//         console.log(
//             'Error ( doctorsController ).(module.exports.login) : Error in login doctor || ' +
//                 error
//         );
//     }
// };

module.exports.register = async function (req, res) {
    try {
        let doctor = await Doctor.findOne({ username: req.body.username });

        if (doctor) {
            // if username is already registered
            if (req.body.username == doctor.username) {
                console.log('Doctor Exists || ', doctor.username);
                return res.status(200).json({
                    message: 'Registration is Successful',
                    data: {
                        token: jwt.sign(doctor.toJSON(), env.jwt_secret, {
                            expiresIn: '600000',
                        }),
                    },
                });
            }
            return res.redirect('/doctors/register');
        }

        // if user does not exist create a new one
        if (!doctor) {
            Doctor.create({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
            });
            console.log('Doctor registered successfully');
        } else {
            console.log('Doctor Username already registered');
        }

        return res.status(200).json({
            message: 'Registration is Successful',
            data: {
                token: jwt.sign(doctor.toJSON(), env.jwt_secret, {
                    expiresIn: '600000',
                }),
            },
        });
    } catch (error) {
        console.log(
            'Error ( doctorsController ).(module.exports.login) : Error in login doctor || ' +
                error
        );
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

module.exports.createSession = function (req, res) {
    try {
        return res.redirect('/');
    } catch (error) {
        console.log(
            'Error ( doctorsController ).(module.exports.login) : Error in login doctor || ' +
                error
        );
    }
};

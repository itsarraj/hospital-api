const Doctor = require('../models/Doctor.js');

module.exports.registerDoctorProfile = async function (req, res) {
    try {
        let doctor = await Doctor.findOne({ username: req.body.username });

        // if password does not match the confirm password
        if (req.body.password != req.body.confirmpassword) {
        }

        if (doctor) {
            // if username is already registered
            if (req.body.username == doctor.username) {
                console.log('Doctor Exists || ', doctor.username);
                return res.redirect('/doctors/login');
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
            return res.redirect('/doctors/login');
        }
        //  else {
        //     console.log('Doctor Username already registered');
        //     return res.redirect('/doctors/login');
        // }
        return res.redirect('/doctors/register');
    } catch (error) {
        console.log(
            'Error ( doctorsController ).(module.exports.registerDoctorProfile) : Error in registering doctor || ' +
                error
        );

        return res.redirect('/doctors/register');
    }
};

module.exports.login = function (req, res) {
    try {
        return res.render('doctors_login');
    } catch (error) {
        console.log(
            'Error ( doctorsController ).(module.exports.login) : Error in login doctor || ' +
                error
        );
    }
};

module.exports.register = function (req, res) {
    try {
        return res.render('doctors_register');
    } catch (error) {
        console.log(
            'Error ( doctorsController ).(module.exports.login) : Error in login doctor || ' +
                error
        );
    }
};

module.exports.createSession = function (req, res) {
    try {
        return res.render('doctors_register');
    } catch (error) {
        console.log(
            'Error ( doctorsController ).(module.exports.login) : Error in login doctor || ' +
                error
        );
    }
};

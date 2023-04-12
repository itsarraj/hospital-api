const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Define a method to compare the provided password with the stored hashed password
doctorSchema.methods.comparePassword = function (doctorPassword, callback) {
    try {
        bcrypt.compare(doctorPassword, this.password, (err, isMatch) => {
            if (err) {
                return callback(err);
            }
            callback(null, isMatch);
        });
    } catch (error) {
        console.log(
            'Error ( /models/Doctors.js ).(module.exports.comparePassword) : Error in comparing passwords || ' +
                error
        );
    }
};

// Define a pre-save middleware to hash the password before saving the document
doctorSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(this.password, salt, (err, hashedPassword) => {
            if (err) {
                return next(err);
            }

            this.password = hashedPassword;
            next();
        });
    });
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;

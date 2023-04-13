const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true,
        },
        reports: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Report',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;

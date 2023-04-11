const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    status: {
        type: String,
        enum: [
            'Negative',
            'Travelled-Quarantine',
            'Symptoms-Quarantine',
            'Positive-Admit',
        ],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    symptoms: {
        type: [String],
        default: [],
        required: false,
    },
    notes: {
        type: String,
        default: '',
        required: false,
    },
    location: {
        type: String,
        default: '',
        required: false,
    },
    isUrgent: {
        type: Boolean,
        default: false,
        required: false,
    },
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;

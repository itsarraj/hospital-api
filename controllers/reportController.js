const Doctor = require('../models/Doctor.js');
const Patient = require('../models/Patient.js');
const Report = require('../models/Report.js');

const jwt = require('jsonwebtoken');
const env = require('../config/environment');

// fetch all reports by using status

module.exports.fetchReportsByStatus = async function (req, res) {
    const Status = {
        0: 'Negative',
        1: 'Travelled-Quarantine',
        2: 'Symptoms-Quarantine',
        3: 'Positive-Admit',
    };
    let status = Status[req.params.status];

    if (status == undefined) {
        return res.status(404).json({
            message: 'Error',
        });
    }

    try {
        let reportStatus = await Report.find({ status: status })
            .sort('createdAt')
            .populate({ path: 'patient', select: 'name _id' })
            .populate({ path: 'doctor', select: 'name _id' });
        console.log(reportStatus);
        return res.status(200).json({
            data: { reportStatus: reportStatus },
            message: 'Reports based on status',
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

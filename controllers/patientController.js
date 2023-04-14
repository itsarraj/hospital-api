const Doctor = require('../models/Doctor.js');
const Patient = require('../models/Patient.js');
const Report = require('../models/Report.js');

const jwt = require('jsonwebtoken');
const env = require('../config/environment');

//Register a patient using name,phone and password
module.exports.register = async function (req, res) {
    if (req.body.phone == undefined || req.body.name == undefined) {
        console.log(req.body);
        return res.status(206).json({
            message: 'Incomplete data provided',
        });
    }

    //Checking if patient is already registered in db
    let patient = await Patient.findOne({ phone: req.body.phone });
    if (patient != null) {
        return res.status(405).json({
            data: {
                patient: patient,
            },
            message: '( Patient Phone / Patient ) is already Registered',
        });
    }

    try {
        //IF Patient is new Register new patient
        let patient = await Patient.create(req.body);
        if (patient) {
            return res.status(200).json({
                data: {
                    patient: patient,
                },
                message: 'Patient Successfully Registered',
            });
        } else {
            return res.status(401).json({
                message: 'Invalid Detailed Information',
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

//Create a Report for the patient using status and doctor ids
module.exports.createReport = async function (req, res) {
    let patientId = req.params.id;
    let doctorID = req.body.doctor;

    if (patientId == undefined || doctorID == undefined) {
        return res.status(206).json({
            message: 'Incomplete data provided',
        });
    }

    const Status = {
        0: 'Negative',
        1: 'Travelled-Quarantine',
        2: 'Symptoms-Quarantine',
        3: 'Positive-Admit',
    };

    let statusData = req.body.status;
    req.body.status = Status[statusData];
    try {
        let patient = await Patient.findById(req.params.id);
        let doctor = await Doctor.findById(req.body.doctor);

        //If the patient and doctor ids both exist only
        //then report created
        if (patient && doctor) {
            req.body.patient = patientId;
            let report = await Report.create(req.body);
            //pushing the new report in the patients report array
            await patient.reports.push(report);
            await patient.save();

            return res.status(200).json({
                data: {
                    report: {
                        patient: patient.name,
                        status: report.status,
                        doctor: doctor.name,
                        date: report.createdAt,
                    },
                },
                message: 'Report successfully Created',
            });
        } else {
            return res.status(401).json({
                message: 'Patient/Doctor is not Registered',
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

//fetchall reports of a patient
module.exports.allReports = async function (req, res) {
    try {
        let report = await Patient.findById(req.params.id).populate({
            path: 'reports',
        });
        console.log(req.params.id);

        console.log(report);

        return res.status(200).json({
            data: {
                report,
            },
            message: 'All reports of the patient',
            //details:report
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

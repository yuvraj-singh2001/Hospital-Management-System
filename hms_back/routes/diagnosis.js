const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const cors = require('cors');
const User = require("../models/User");
const Diagnosis_Details = require("../models/Diagnosis_Details")
const ConfirmedAppointments = require("../models/Confirmed_Appointment")

const verifyToken = require("../auth/verifytoken");
const Room = require("../models/Room");

const app = router;

app.post('/add_prescription', verifyToken, async (req, res) => {

    const{data} = req.body;
    await ConfirmedAppointments.findByIdAndDelete(data.appointmentid, (err, appointment) => {
        console.log(appointment);
        const newPrescription = new Diagnosis_Details({
            patient_name: data.patient_name,
            patient_age: data.patient_age,
            patient_email: data.email,
            prescription: data.prescription,
            gender: data.gender,
            symptoms: data.symptoms,
            disease: data.disease,
            doctor_id: data.doctor_id,
            doctor_name: data.doctor_name,
            app_date: data.app_date,
            app_time: data.app_time
        })
       // console.log(newPrescription)
        newPrescription.save()
            .then(data => res.json('success'))
            .catch(err => res.json('failure'))
    })
})

app.get('/user_case_history', verifyToken, async (req, res) => {
   // console.log(req.userId);
    User.findById(req.userId, (err, user) => {
        Diagnosis_Details.find({ patient_email: user.email }, (err, prescriptions) => {
            if (err) return res.json("Error in getting diagnosis history")
            //console.log(prescriptions);
            res.json(prescriptions);
        })
    })

})

app.post('/all_patients_case_history', verifyToken, async (req, res) => {
    Diagnosis_Details.distinct('patient_email', { doctor_id: req.body.doctor_id }, (err, prescriptions) => {
        if (err) return res.json("Error in getting diagnosis history")
        res.json(prescriptions);
    })
})

app.post('/patient_case_history', verifyToken, async (req, res) => {
    Diagnosis_Details.find({ patient_email: req.body.patient_email }, (err, prescriptions) => {
        if (err) return res.json("Error in getting diagnosis history")
        res.json(prescriptions);

    })
})

module.exports = app;
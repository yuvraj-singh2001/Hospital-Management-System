const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/verifytoken");
const pendingAppointment = require("../models/Pending_Appointment");
const Confirmed_Appointment = require("../models/Confirmed_Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Pending_Appointment = require("../models/Pending_Appointment");
const Rejected_Appointment = require("../models/Rejected_Appointment");


const app = router;

app.post('/book_appointment', verifyToken, (req, res) => {
    const app_date = req.body.data.date;
    const app_time = req.body.data.time;

    Pending_Appointment.findOne({ app_date: app_date, app_time: app_time, Doctor_Reg_ID: req.body.data.reg_id }).then(appointment => {
        if (appointment) {
            return res.status(400).json("Appointment Exists");
        }
        else {
            const new_appointment = new Pending_Appointment({
                name: req.body.data.name,
                age: req.body.data.age,
                specialization: req.body.data.specialization,
                gender: req.body.data.gender,
                email: req.body.email,
                Doctor_Reg_ID: req.body.data.reg_id,
                doctorname: req.body.data.doctorname,
                app_date: req.body.data.date,
                app_time: req.body.data.time
            })

            // console.log(new_appointment);
            new_appointment.save()
                .then(user => res.json('success'))
                //.catch(err=> console.log(err))
                .catch(err => res.json('Invalid'));

        }
    })
})

app.get('/pending_appointments', verifyToken, async (req, res) => {
    Doctor.findById(req.userId, { password: 0 }, function (err, doctor) {
        if (err) return res.status(500).send("There was a problem finding the doctor.");
        if (!doctor) return res.status(404).send("No doctor found.");
        console.log(doctor.registrationid)
        Pending_Appointment.find({ Doctor_Reg_ID: doctor.registrationid }, function (err, appointments) {
            if (err) return res.status(500).send("There was a problem finding the appointments.");
            if (!appointments) return res.status(404).send("No appointments found.");
            res.status(200).send(appointments);
        })
    });
})

app.post('/confirm_appointment', verifyToken, async (req, res) => {

    Pending_Appointment.findByIdAndDelete(req.body.appointmentid, function (err, appointment) {
        if (err) return res.status(500).send("There was a problem finding the appointment.");
        if (!appointment) return res.status(404).send("No appointment found.");
        // console.log(appointment.name);
        const newConfApp = new Confirmed_Appointment({
            name: appointment.name,
            age: appointment.age,
            specialization: appointment.specialization,
            gender: appointment.gender,
            email: appointment.email,
            Doctor_Reg_ID: appointment.Doctor_Reg_ID,
            doctorname: appointment.doctorname,
            app_date: appointment.app_date,
            app_time: appointment.app_time
        })
        newConfApp.save()
            .then(user => res.json('success'))
            .catch(err => res.json('Invalid'));

    })
})

app.post('/rejected_appointment', verifyToken, async (req, res) => {

    Pending_Appointment.findByIdAndDelete(req.body.appointmentid, function (err, appointment) {
        if (err) return res.status(500).send("There was a problem finding the appointment.");
        if (!appointment) return res.status(404).send("No appointment found.");
        // console.log(appointment.name);
        const newrejApp = new Rejected_Appointment({
            name: appointment.name,
            age: appointment.age,
            specialization: appointment.specialization,
            gender: appointment.gender,
            email: appointment.email,
            Doctor_Reg_ID: appointment.Doctor_Reg_ID,
            doctorname: appointment.doctorname,
            app_date: appointment.app_date,
            app_time: appointment.app_time
        })
        newrejApp.save()
            .then(user => res.json('success'))
            .catch(err => res.json('Invalid'));

    })
})

app.get('/confirmed_appointments', verifyToken, async (req, res) => {
    Doctor.findById(req.userId, { password: 0 }, function (err, doctor) {
        if (err) return res.status(500).send("There was a problem finding the doctor.");
        if (!doctor) return res.status(404).send("No doctor found.");
        //  console.log(doctor.registrationid)
        Confirmed_Appointment.find({ Doctor_Reg_ID: doctor.registrationid }, function (err, appointments) {
            if (err) return res.status(500).send("There was a problem finding the appointments.");
            if (!appointments) return res.status(404).send("No appointments found.");
            res.status(200).send(appointments);
        })
    });
})

app.get('/user_appointments', verifyToken, async (req, res) => {
     await User.findById(req.userId, { password: 0 }, async function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        var appointments = [];
        console.log(user.email)
        await Confirmed_Appointment.find({ email: user.email }, function (err, appointment) {
            if (err) return res.json("Error in finding confirmed appointments");
            appointments = appointments.concat(appointment);

        })
        await Pending_Appointment.find({ email: user.email }, function (err, appointment) {
            if (err) return res.json("Error in finding confirmed appointments");
            appointments = appointments.concat(appointment);

        })
         await Rejected_Appointment.find({ email: user.email }, function (err, appointment) {
             if (err) return res.json("Error in finding confirmed appointments");

             appointments = appointments.concat(appointment);
             return res.json(appointments);

         });

    })
})

module.exports = app;
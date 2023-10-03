const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const cors = require('cors');
const Doctor = require("../models/Doctor");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const verifyToken = require("../auth/verifytoken");

const app = router;

app.post("/register_doctor", async (req, res) => {
    const instance = await Doctor.findOne({ registrationid: req.body.data.registrationid });
    if (instance) {
         res.json('Registration ID already exists');
    }

    await Doctor.findOne({ email: req.body.data.email }).then(doctor => {
        if (doctor) {
            return res.json('Email already exists');

        }
        else {
            const newDoctor = new Doctor({
                name: req.body.data.name,
                specialization: req.body.data.specialization,
                state: req.body.data.state,
                gender: req.body.data.gender,
                registrationid: req.body.data.registrationid,
                dob: Date.parse(req.body.data.dob),
                address: req.body.data.address,
                mobile_number: req.body.data.mobile_number,
                email: req.body.data.email,
                password: req.body.data.password,

            });
            const rounds = 10;
            bcrypt.genSalt(rounds, (err, salt) => {
                bcrypt.hash(newDoctor.password, salt, (err, hash) => {
                    if (err) throw err;
                    newDoctor.password = hash;
                    newDoctor
                        .save()
                        .then(user => res.json('success'))
                        .catch(err => res.json(err));
                });
            });
        }

    });
});

module.exports = app;
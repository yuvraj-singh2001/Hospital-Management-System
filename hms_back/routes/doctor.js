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

app.post("/login", async (req, res) => {

    //Form Valdiation
    /*const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }*/

    const email = req.body.email;
    const password = req.body.password;

    //Find user by Email
    await Doctor.findOne({ email }).then(doctor => {
        if (!doctor) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, doctor.password).then(isMatch => {
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: doctor.id,
                    name: doctor.name
                };
                console.log(payload.id);

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        //res.cookie("xaccesstoken", token, { httpOnly: true });
                        res.json({
                            success: true,
                            token: token,
                            auth: true
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

app.get('/me', verifyToken, (req, res) => {
    Doctor.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the doctor.");
        if (!user) return res.status(404).send("No doctor found.");

        res.status(200).send(user);
    });

});



module.exports = app;
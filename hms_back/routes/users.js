const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const cors = require('cors');
const User = require("../models/User");
const Doctor = require("../models/Doctor");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const verifyToken = require("../auth/verifytoken");

const app = router;
/*app.use(cookieParser);*/

app.post("/register", (req, res) => {

    //Form validation

    /*const {errors, isValid} = validateRegisterInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    } */

    User.findOne({ email: req.body.email }).then(user => {

        if (user) {
            return res.status(400).json("Email already exists");
        } else {
            const newUser = new User({
                name: req.body.name,
                father_name: req.body.fatherName,
                mother_name: req.body.motherName,
                password: req.body.password,
                email: req.body.email,
                dob: Date.parse(req.body.age), gender: req.body.gender,
                address: req.body.address, mobile_number: req.body.mobile, father_phone_number: req.body.parentMobile
            });
            //Hash password before storing in database
            const rounds = 10;
            bcrypt.genSalt(rounds, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json('success'))
                        .catch(err => res.json('Invalid'));
                });
            });
        }

    });

});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

app.post("/login", async (req, res) => {

    const email = req.body.emailid;
    const password = req.body.password;

    //Find user by Email
    await User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

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
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });

});

app.get('/all_doctors', async (req, res) => {
    await Doctor.find(function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the doctor.");
        if (!user) return res.status(404).send("No doctor found.");
        res.status(200).send(user);

    })
})

module.exports = app;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: String,
    specialization: String,
    state: String,
    gender: { type: String },
    registrationid: { type: String, unique: true },
    dob: { type: Date, trim: true },
    address: String,
    mobile_number: String,
    email: { type: String, unique: true }, // unique id
    password: String,
});

module.exports = mongoose.model("Doctors", doctorSchema);
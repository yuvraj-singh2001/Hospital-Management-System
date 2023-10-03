const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rejectedAppointment = new Schema({
    name: String,
    age: Number,
    specialization: String,
    gender: { type: String },
    email: String,
    doctorname: String,
    Doctor_Reg_ID: { type: String },
    app_date: { type: String},
    app_time: { type: String },
    app_status: { type: String, default: "rejected" }
    
});

module.exports = mongoose.model("RejectedAppointments", rejectedAppointment);
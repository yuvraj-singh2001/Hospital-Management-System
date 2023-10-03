const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingAppointment = new Schema({
    name: String,
    age: Number,
    specialization: String,
    gender: { type: String },
    email: String,
    Doctor_Reg_ID: { type: String },
    doctorname: String,
    app_date: { type: String },
   // app_date: {type: String, required: true},
    app_time: { type: String },
    app_status: {type:String,default:"pending"}

});

module.exports = mongoose.model("PendingAppointments", pendingAppointment);

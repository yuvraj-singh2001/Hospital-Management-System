const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Diagnosis_Schema = new Schema({
    patient_name: String,
    patient_email: String,
    patient_age: Number,
    prescription: String,
    gender: String,
    symptoms: String,
    disease: String,
    doctor_id:String,
    doctor_name: String,
    app_date: String,
    app_time: String
    
})

module.exports = mongoose.model("Diagnosis_Details", Diagnosis_Schema);
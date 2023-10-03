const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema=new Schema({
        name: String,
        father_name: String,
        mother_name: String,
        gender: { type: String },
        dob: { type: Date, trim: true },
        address: String,
        mobile_number: String,
        father_phone_number: String,
    email: { type: String, unique: true }, // unique id
    password: String,
});

module.exports=mongoose.model("Users", userSchema);

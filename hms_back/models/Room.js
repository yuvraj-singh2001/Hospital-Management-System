const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: String,
    age: Number,
    gender: { type: String },
    email: String,
    booking_date: Date,
    release_date:Date,
    room_no: Number,
    room_status: String
});

module.exports = mongoose.model("Rooms", roomSchema);
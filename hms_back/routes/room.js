const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const cors = require('cors');
const User = require("../models/User");

const verifyToken = require("../auth/verifytoken");
const Room = require("../models/Room");

const app = router;

app.post('/add_room', async (req, res) => {
    const room_no = req.body.room_no;
    Room.findOne({ room_no }, function (err, room) {
        console.log(room);
        if (room)
            res.json("Room exists");
        else {
            const newRoom = new Room({
                name: "",
                age: 0,
                gender: "",
                booking_date: Date(Date.now),
                release_date: "2100-12-31",
                room_no: req.body.room_no,
                room_status: "added",
                email: ""

            })
            newRoom.save()
                .then(room => res.json("success"))
                .catch(err => res.json('invalid'));
        }
    })
})

app.post('/book_room', verifyToken, async (req, res) => {
    console.log(req);
   /* var user_email = "";
    await User.findById(req.userId, function (err, user) {
        user_email = user.email;
    })*/

    /* Room.findOne({ room_no }, function (err, room) {
         if (room.room_status === "booked"||room.room_status==="pending") {
             const end_date = new Date(Number(room.booking_date))
             const req_booking_date = new Date(Number(Date.parse(req.body.booking_date)))
             end_date.setDate(room.booking_date.getDate() + room.no_of_days);
             if (req_booking_date.getTime() <= end_date.getTime() && req_booking_date.getTime() >= room.booking_date.getTime()) {
                return res.json("Room is booked during this period");
             }
 
         }*/
    const newRoom = new Room({
        name: req.body.details.name,
        age: req.body.details.age,
        gender: req.body.details.gender,
        booking_date: Date.parse(req.body.details.startDate),
        release_date: Date.parse(req.body.details.endDate),
        room_status: "pending",
        email: req.body.email,
        room_no: req.body.room_no
    })
   // console.log(newRoom);

    newRoom.save()
        .then(room => res.json("success"))
        .catch(err => res.json("failure"));


})

app.get('/pending_rooms', async (req, res) => {
    Room.find({ room_status: "pending" }, function (err, rooms) {
        if (err) return res.status(500).send("There was a problem finding the rooms.");
        if (!rooms) return res.status(404).send("No pending room requests found.");
        res.status(200).json(rooms);
    });
})

app.post('/confirm_room', async (req, res) => {
   // console.log(req.body.roomid);
    Room.findById(req.body.roomid, function (err, room) {
        if (err) return res.status(500).send("There was a problem finding the room.");
        if (!room) return res.status(404).send("No room found.");
      //  console.log(room.name);
        room.room_status = "booked";
        room.save()
            .then(user => res.json('success'))
            .catch(err => res.json('Invalid'));

    })
})

app.post('/reject_room', async (req, res) => {
    Room.findById(req.body.roomid, function (err, room) {
        if (err) return res.status(500).send("There was a problem finding the room.");
        if (!room) return res.status(404).send("No room found.");
        room.room_status = "rejected";
        room.save()
            .then(user => res.json('success'))
            .catch(err => res.json('Invalid'));
    })
})

app.get('/all_rooms',verifyToken, async (req, res) => {
    Room.find({room_status:"added"},function (err, rooms) {
        if (err) return res.status(500).json("There was an error in finding rooms");
        else
            res.json(rooms);
    })
})

/*
app.post('/get_rooms', verifyToken,async (req, res) => {
    //console.log(req.body.booking_date);
    var rooms = []
    await Room.find({ release_date: { $gte: Date.parse(req.body.booking_date),$lte: Date.parse(req.body.release_date) }, room_status: { $nin: ["added","rejected"] } }, function (err, room) {
        if (err) return res.status(500).send("There was a problem finding the room");
        rooms = rooms.concat(room)
    })
        
    
    await Room.find({ booking_date: { $lte: Date.parse(req.body.release_date) }, release_date: { $gt: Date.parse(req.body.release_date) }, room_status: { $nin: ["added","rejected"] } }, function (err, room) {
        if (err) return res.status(500).send("There was a problem finding the room");
        rooms=rooms.concat(room)
        res.json(rooms);
    })
})
*/
app.post('/get_rooms', verifyToken, async (req, res) => {
    //console.log(req.body.booking_date);
    var rooms = []
    await Room.find({ release_date: { $gte: Date.parse(req.body.booking_date),$lte: Date.parse(req.body.release_date) }, room_status: { $nin: ["added","rejected"] } }, function (err, room) {
        if (err) return res.status(500).send("There was a problem finding the room");
        rooms = rooms.concat(room)
    })
        
    
    await Room.find({ booking_date: { $lte: Date.parse(req.body.release_date) }, release_date: { $gt: Date.parse(req.body.release_date) }, room_status: { $nin: ["added","rejected"] } }, function (err, room) {
        if (err) return res.status(500).send("There was a problem finding the room");
        rooms=rooms.concat(room)
        res.json(rooms);
    })
})

app.get('/get_rooms_request', verifyToken, async (req, res) => {
    
    await User.findById(req.userId, function (err, user) {
        console.log(user.email);
        Room.find({ email: user.email }, function (err, rooms) {
        if (err)
            return res.json("Error in fetching room details.")
        res.json(rooms);
    })
    })
})

module.exports = app;
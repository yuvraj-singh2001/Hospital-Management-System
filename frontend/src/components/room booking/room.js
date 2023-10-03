import React, { useState, useEffect } from "react";
import './room.css';
import { Button, Typography, TextField, Select,MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.React_App_URL;



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '0%',
    marginTop: '1%',
    color: 'white',
    alignItems: 'center',
    marginLeft: '25%',
    height: '100%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    textDecorationColor: 'white',
  },


}));

const values = {
  name: '',
  age: '',
  gender: 'Select Gender',
  startDate: '',
  endDate: '',

}


function Room(props) {
  const [details, setDetails] = useState(values);
  const classes = useStyles();
  const [flag, setFlag] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [room_booked, setRoomBooked] = useState([]);
  const [room_selected, setRoomSelected] = useState({ room: '', id: '' });
 
  var token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    fetch(uri+'/room/all_rooms', {
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'jwttoken': token },
    })
      .then(response => response.json())
      .then(data => {
        setRooms(data);
      });
  },[]);

  const handleInputChange = e => {
    const { name, value } = e.target
    setDetails({
      ...details,
      [name]: value
    })
  }

  function onSubmit() {

    if (details.name === '' || details.age === '' || details.gender === 'Select Gender')
      alert('Kindly Fill all the details');

    else if (room_selected.room === '' || room_selected.id === '')
      alert('Kindly Select Room number');

    else {

      fetch(uri+'/room/book_room', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'jwttoken': token },
        body: JSON.stringify({
          details: details,
          room_no: room_selected.room,
          email: props.email
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            alert('Book room request has been successfully submitted!!!\nWait for the Confirmation');
            props.onRouteChange('patientprofile');
          }
          else
            alert('Error!!! Kindly book the room again!!!')
        })
    }
  }

  function onSearch() {
    
    if (details.startDate === '')
      alert('Start Date is missing')

    else if (details.endDate === '')
      alert('End Date is missing')
    
    else if (new Date(details.startDate).getTime() >= new Date(details.endDate).getTime())
        alert("End Date must be bigger than the start date")

    else {
      fetch(uri+'/room/get_rooms', {              // Rooms which are booked in this period
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'jwttoken': token },
        body: JSON.stringify({
          booking_date: details.startDate,
          release_date: details.endDate
        })
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data === 'No room found')
            alert('All rooms are booked for these dates!!!!')
          else if (data === 'There was a problem finding the room')
            alert('Kindly search it again')
          else {
            setRoomBooked(data);
            setFlag(true);
          }
        });
    }
  }

  function check(val) {

    for (var i = 0; i < room_booked.length; i++) {
      if (room_booked[i].room_no === val.room_no)
        return true;
    }

    return false;
  }

  function onChangeRoom(val) {
    var r = { room: val.room_no, id: val._id };

    if (room_selected.room === '')
      setRoomSelected(r);
    else if (room_selected.room === r.room) {
      var r1 = { room: '', id: '' };
      setRoomSelected(r1);
    }
    else
      setRoomSelected(r);

  }


  return (
    <div>
      <div class="room-container">
        <Typography component="h1" variant="h4" align="left" style={{ marginLeft: '10%', padding: '10px' }}>
          Book Room
          </Typography>
      </div>
      <div>
        <div >
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              name="startDate"
              value={details.startDate}
              onChange={handleInputChange}
              defaultValue="xxxx-xx-xx"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="End Date"
              type="date"
              name="endDate"
              value={details.endDate}
              onChange={handleInputChange}
              defaultValue="xxxx-xx-xx"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" color="primary" style={{ marginLeft: '10%' }} onClick={onSearch}>
              Search
            </Button>
          </form>
        </div>
      </div>
      {
        flag === false
          ? <p></p>
          :
              <div>
                <div>  
              <form className={classes.container} noValidate>
              <TextField id="outlined-basic" label="Name" variant="outlined" name="name" type='text' value={details.name} onChange={handleInputChange} />
              <TextField id="outlined-basic" label="Age" variant="outlined" name="age" type='number' value={details.age} onChange={handleInputChange} />
                <Select id="outlined-basic" label="Gender" variant="outlined" name="gender" displayEmpty={true} value={details.gender} onChange={handleInputChange} renderValue={(value)=>(value)} ><MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                  </Select>
              </form>
              </div>
              <ul class="showcase">
              <li>
                <div class="seat"></div>
                <small>Available</small>
              </li>
              <li>
                <div class="seat selected"></div>
                <small>Selected</small>
              </li>
              <li>
                <div class="seat occupied"></div>
                <small>Occupied</small>
              </li>
              </ul>
               
              <div class="container">
            <div class="row" style={{marginLeft: '5%'}}>
              {
               rooms.map((values, key) => (
                  check(values)
                  ?   <Button class="seat occupied" style={{backgroundColor: "rgb(233, 99, 106)"}} value={key} >Room {values.room_no}</Button>
                  :
                    room_selected.room === values.room_no
                    ?  <Button class="seat" style={{backgroundColor: "#6ff69c"}} value={key} onClick={() => onChangeRoom(values)} >Room {values.room_no}</Button>
                    :
                    <Button class="seat" style={{backgroundColor: "#cfcfda"}} value={key} onClick={() => onChangeRoom(values)} >Room {values.room_no}</Button>
                ))
                
              }
              </div>

            <p class="text" style={{marginLeft: '5%'}}>
              You have selected <span id="count">Room-{room_selected.room}</span>
            </p>
            <div className="btn">
                  <Button variant="contained" color="primary" onClick={onSubmit}>
                Submit
                  </Button>
            </div>
          </div>
                    </div>
          }
      
    </div >
    

  );
}

export default Room;

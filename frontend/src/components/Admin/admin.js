import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Data from "./data"
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.React_App_URL;

const useStyles = makeStyles({
  root: {
    minWidth: 2,
    marginLeft: '20%',
    marginTop: '15%',
    display: 'card',

    flexGrow: 1,
    // padding: theme.spacing(2)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles()
  const [roomno, setRoom] = useState('');
  const [pendingReq, setPendingReq] = useState([]);
  const [total_doc, setdoc] = useState(0);

  var token = sessionStorage.getItem('jwtToken');

  function setValues() {
    fetch(uri+'/room/pending_rooms', {
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'jwttoken': token },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPendingReq(data);
      });
    fetch(uri+'/all_doctors',{
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'jwttoken': token },
    })
      .then(response => response.json())
      .then(data => {
        setdoc(data.length)
    })
}

useEffect(() => {
  setValues();
},[]);

const handleChange = (event) => {
  setRoom(event.target.value);
};

function onSubmit() {
  fetch(uri+'/room/add_room', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      room_no: roomno
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data === 'Room exists')
        alert('Room-' + roomno + ' already exists');
      else if (data === 'success')
        alert('Room-' + roomno + ' successfully added in the database')
      else
        alert('Error in adding room in the database');
    })
}

function onStatusChange(type, data) {

  if (type === 'confirm') {

    if (window.confirm("Click 'OK' to confirm this booking, else click 'Cancel' ")) {

      fetch(uri+'/room/confirm_room', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'jwttoken': token },
        body: JSON.stringify({
          roomid: data
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            alert('Room has been booked !!!')
            setValues();
          }
          else
            alert('Error in confirming room')
        });
    }
  }

  else {
    if (window.confirm("Click 'OK' to cancel this booking, else click 'Cancel' ")) {

      fetch(uri+'/room/reject_room', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'jwttoken': token },
        body: JSON.stringify({
          roomid: data
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            alert('Booking Room has been cancelled !!!')
            setValues();
          }
          else
            alert('Error in cancelling booking of room')
        });
    }
  }
}


return (

  <>
    <div>
      <Grid container spacing={24}>
        <Grid>
          <div className="card" style={{ marginLeft: "10%", marginTop: "10%" }}>
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} />
                <div className="mt-3">
                  <h4>ADMIN</h4>
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item md={3} >
          <div className="doctor" style={{ marginLeft: "3" }} >
            <Card className={classes.root} style={{ backgroundColor: 'red' }}>
              <CardContent >
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Total Doctors
        </Typography>
                <Typography variant="h5" component="h2">
                  {total_doc}
        </Typography>
              </CardContent>
              <CardActions>

                <Button size="small" onClick={() => props.onRouteChange('doctorregistration')}>Add Doctor</Button>
              </CardActions>
            </Card>
          </div>
        </Grid>
        <Grid item md={3}>
          <div className="patient" style={{ display: "flex" }}>
            <Card className={classes.root} style={{ backgroundColor: "lightblue" }}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Book Room Requests
        </Typography>
                <Typography variant="h5" component="h2">
                  {pendingReq.length}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Confirm Requests</Button>
              </CardActions>
            </Card>
          </div>
        </Grid>
        <Grid item md={3} >
          <div className="doctor" style={{ marginLeft: "3" }} >
            <Card className={classes.root} style={{ backgroundColor: 'lightgreen' }}>
              <CardContent >
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Add Room Number
        </Typography>
                <Typography variant="h5" component="h2">
                  <TextField
                    id="outlined-name"
                    label="Enter Room Number"
                    type='number'
                    value={roomno}
                    onChange={handleChange}
                  />
                </Typography>
              </CardContent>
              <CardActions>

                <Button size="small" onClick={onSubmit}>Submit</Button>
              </CardActions>
            </Card>
          </div>
        </Grid>
      </Grid>
      <div style={{ padding: '20px' }}>
        <Data pendingReq={pendingReq} onStatusChange={onStatusChange} />
      </div>
    </div>,

  </>
);
}
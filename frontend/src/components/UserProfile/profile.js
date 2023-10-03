import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, CardActions, CardContent, Typography, Button }from '@material-ui/core';
import './profile_style.css';
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.React_App_URL;

const useStyles = makeStyles({
  root: {
    minWidth: 2,
    marginLeft:'20%',
    marginTop:'10%',
    display:'card',
    width: '300px',
    height: '125px',
    flexGrow: 1,
    // padding: theme.spacing(2)
  },
 
});

export default function Profile(props) {
  
  const classes = useStyles();
  var token = sessionStorage.getItem('jwtToken');
 
  function changeroute(r){
    //console.log(r);

    if(r==='app'){
      fetch(uri+'/appointment/user_appointments', {
        method: 'get',
        headers: { 'Content-Type': 'application/json','jwttoken': token },
      })
        .then(response => response.json())
        .then(data => {
          props.onRouteChange('appointmentdetails', data);
        });
    }

    else{        
      fetch(uri+'/room/get_rooms_request', {
        method: 'get',
        headers: { 'Content-Type': 'application/json','jwttoken': token },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          props.onRouteChange('roomdetails', data);
        });
    }

  }

  return (
    
    <div className="container">
    
      <div className="main-body">
       
        <div className="row gutters-sm">
          <div className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} />
                  <div className="mt-3">
                    <h4>{props.data.name}</h4>
                    <div className='button1' style={{padding: '10px', marginRight:150}}>
                    <button className="btn btn-primary" style={{height: 40, width: 180}} onClick = {() => props.onRouteChange('patientdetailbypatient')}>User Profile</button>
                    </div>
                   <div className='button2' style={{padding: '10px', marginRight:150}}>
                   <button className="btn btn-primary" style={{height: 40, width: 180}}onClick = {() => props.onRouteChange('patienthistory')}>Previous Reports</button>
                   </div>
                  </div>
                </div>
              </div>
            </div>
           </div>

           <Grid item xs={4} >
            <div className="doctor" style={{marginLeft:"3"}} > 
            <Card className={classes.root} style={{backgroundColor:'white'}}>
            <CardContent >
              <Typography variant="h5" component="h3">
               Appointments Details
              </Typography>
            </CardContent>
            <CardActions>
          
              <Button size="small" onClick = {() => changeroute('app')} >Click Here</Button>
            </CardActions>
          </Card>
          </div>

          <div className="doctor" style={{marginLeft:"3"}} > 
            <Card className={classes.root} style={{backgroundColor:'white'}}>
            <CardContent >
              <Typography variant="h5" component="h3">
               Book Appointment
              </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick = {() => props.onRouteChange('BookAppointment')}>Click Here</Button>
            </CardActions>
          </Card>
          </div>
          
  
          </Grid>

          <Grid item xs={4} >
              <div className="doctor" style={{marginLeft:"3"}} > 
          <Card className={classes.root} style={{backgroundColor:'white'}}>
            <CardContent >
              <Typography variant="h5" component="h2">
               Room Details
              </Typography>
            </CardContent>
            <CardActions>
            
            <Button size="small" onClick = {() => changeroute('room')}>Click Here</Button>
            </CardActions>
          </Card>
          </div>

          <div className="doctor" style={{marginLeft:"3"}} > 
          <Card className={classes.root} style={{backgroundColor:'white'}}>
            <CardContent >
              <Typography variant="h5" component="h2">
               Book Room
              </Typography>
            </CardContent>
            <CardActions>
            
            <Button size="small" onClick = {() => props.onRouteChange('BookRoom')}>Click Here</Button>
            </CardActions>
          </Card>
          </div>

          </Grid>
               
          </div>
          </div>
 
       </div> 

     );
}
 
/*
  <div className="row gutters-sm">
     <div className="col-sm-6 mb-3">
       <div className="card h-100">
       <div className="card-body" style = {{display: "flex",justifyContent: "center",alignItems: "center" }}>
         <div className="button3" style={{padding: '20px', marginRight:150}}>
         <button className="btn btn-primary" style={{height: 50, width: 200}} onClick = { () => props.onRouteChange('BookAppointment')}  >Book Appointment</button>
         </div>
       
         </div>
       </div>
     </div>
     <div className="col-sm-6 mb-3">
       <div className="card h-100">
       <div className="card-body" style = {{display: "flex",justifyContent: "center",alignItems: "center" }}>
         <div className="button3" style={{padding: '20px', marginRight:150}}>
         <button className="btn btn-primary" style={{height: 50, width: 200}} onClick = {() => props.onRouteChange('BookRoom')} >Book Room</button>
         </div>
         </div>
       </div>
     </div>
  </div> */

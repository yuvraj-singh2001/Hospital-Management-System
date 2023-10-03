import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DoctorForm from './DateandDoctorForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import Review from './Review';
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.React_App_URL;


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3000/">
        HOSPITAL MANGENMENT 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(23),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: '1000',
      marginRight: 'auto',
      
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Search Doctor', 'Personal Details', 'Review'];

const initialPatientValues={
  name:'',
  age:'',
  gender:'',
  doctorname: '',
  time: '',
  date: '',
  reg_id: '',
  specialization: ''
}

export default function Checkout(props) {
  const classes = useStyles();
 // console.log(initialPatientValues);
  const [patient, setPatientData] = useState(initialPatientValues);
  const [doctorDetails, setDoctorDetails] = useState([]);
  var token = sessionStorage.getItem('jwtToken');

  useEffect(() =>{
    fetch(uri+'/all_doctors', {
      method: 'get',
      headers: { 'Content-Type': 'application/json','jwttoken': token },
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setDoctorDetails(data);
      });
   },[]);

  const handleInputChange = e =>{
    const{name,value} = e.target
    setPatientData({
        ...patient,
        [name]:value
    })
  } 
  
  const handleDoctorName = e => {
    
    if(e===null){
      setPatientData({
        ...patient,
        doctorname:''
      }) 
    }
      
    else{
    setPatientData({
      ...patient,
      doctorname:e.name.split('- ')[0],
      specialization: e.name.split('- ')[1],
      reg_id: e.reg_id
     }) 
    } 
  }
  
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.toDateString()
    
      if (new Date(patient.date).getTime() <= yesterday.getTime())
        alert("Appointment Date must be bigger than the current date!!!")

      else {
        if (patient.name === '' || patient.age === '' || patient.gender === '' || patient.doctorname === '' || patient.date === '' || patient.time === '')
          alert('Kindly fill all the details')
        else {
          fetch(uri + '/appointment/book_appointment', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'jwttoken': token },
            body: JSON.stringify({
              data: patient,
              email: props.email
            })
          })
            .then(response => response.json())
            .then(data => {
              if (data === 'success') {
                alert('Your Appointment has been successfully submitted!!!\nWait for the Confirmation');
                props.onRouteChange('patientprofile');
              }
              else if (data === 'Appointment Exists')
                alert(patient.doctorname + 'already has an appointment on the mentioned date and time')
              else
                alert('Error!!! Kindly fix the appointment again!!!')
            })
        }
      }
    }
    else
     setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        if(doctorDetails.length === 0)
         return <p></p>
        else 
        return <DoctorForm patient={patient} doctorDetails={doctorDetails} handleInputChange={handleInputChange} handleDoctorName={handleDoctorName}/> ;
      case 1:
        return <PersonalDetailsForm patient={patient} handleInputChange={handleInputChange}/>;
      case 2:
        return <Review name={patient.name} age={patient.age} gender={patient.gender} doctorname={patient.doctorname} date={patient.date} time={patient.time} specialization={patient.specialization}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <div>
      <CssBaseline />
      
      <main className={classes.layout}>
        <Paper className={classes.paper} style = {{marginLeft:'10px'}}>
          <Typography component="h1" variant="h4" align="center" >
            Book Appointment
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography variant="h5" gutterBottom>
                  Thank you .
                </Typography>
                <Typography variant="subtitle1">
                  Your Appointment number is #2001539.
                </Typography>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Book Appointment' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Paper>
        <Copyright />
      </main>
    </div>
  );
}
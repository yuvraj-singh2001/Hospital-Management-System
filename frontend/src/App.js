import  React, {useState} from "react";
import './App.css';
import { makeStyles } from "@material-ui/core";
import Header from './components/Header' ;
import Patient from "./components/Registration/patient";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/UserProfile/profile";
import Start from "./components/Book Appoitnment/Checkout";
import BookRoom from "./components/room booking/room";
import Admin from "./components/Admin/admin"
import Docreg from "./components/Registration/doctorregistration";
import Dr from "./components/Doctor/dr"
import ViewReport from "./components/Doctor/viewReport"
import PatientHistory from "./components/history2"
import PatientDetails from"./components/UserProfile/userprofile"
import Appointment from "./components/UserProfile/appointment"
import RoomDetails from "./components/UserProfile/roomdetails"
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.React_App_URL;

const useStyles = makeStyles({
  appMain : {
    width:'100%'
  }
})

function App() {
   const[userdata, setData] = useState([]);
   const[appoint, setAppoint] = useState([]);
   const[roomdetails, setRoom] = useState([]);
   const[history, setHistory] = useState([]);
   const [route, setRoute] = useState('signin');
   const classes = useStyles();

  function onRouteChange(route, data) {
		setRoute(route);

      if(route === 'appointmentdetails')
         setAppoint(data);
      
      else if(route === 'roomdetails')
         setRoom(data); 
      
      else if(route === 'patienthistory'){
         //console.log(userdata._id);
         let token = sessionStorage.getItem('jwtToken');
         fetch(uri+'/case_history/user_case_history', {
             method: 'get',
             headers: { 'Content-Type': 'application/json' ,'jwttoken': token}
            })
             .then(response => response.json())
             .then(data => {
                 if(data === 'Error in getting diagnosis history')
                  alert('Error in adding patient details!!!\nKindly add it again');
                 else
                   setHistory(data);   
             })
      } 
      
      else if(route === 'patienthistory2'){
         let token = sessionStorage.getItem('jwtToken');
         fetch(uri+'/case_history/patient_case_history', {
             method: 'post',
             headers: { 'Content-Type': 'application/json' ,'jwttoken': token},
             body: JSON.stringify({
               patient_email : data
             })
            })
             .then(response => response.json())
             .then(data => {
                 if(data === 'Error in getting diagnosis history')
                  alert('Error in adding patient details!!!\nKindly add it again');
                 else
                   setHistory(data);   
             })
      }
  }

  function onProfileChange(data, route) {
      setData(data);
      setRoute(route);
  }


  if(route === 'signin' || route === 'adminlogin' || route === 'doctorsignin') {
     return(
      <div className={classes.appMain}>
         <Header onRouteChange={onRouteChange} route ={route}/>
         <SignIn onRouteChange={onRouteChange} route={route} onProfileChange={onProfileChange} />
        </div> 
     );
  }

 else if(route === 'register') {
    return(
     <div className={classes.appMain}>
        <Header onRouteChange={onRouteChange} route ={route} />
        <Patient onRouteChange={onRouteChange}  />
       </div> 
    );
  }
  else if(route === 'doctorregistration') {
   return(
    <div className={classes.appMain}>
       <Header onRouteChange={onRouteChange} route ={route} />
       <Docreg onRouteChange={onRouteChange}/>
      </div> 
   );
 }
  else if(route === 'patientprofile') {
   return(
    <div className={classes.appMain}>
       <Header onRouteChange={onRouteChange} route ={route}/>
       <Profile onRouteChange={onRouteChange} data={userdata} email={userdata.email} />
      </div> 
    );
   }

   else if(route ==='BookAppointment')
   {
      return(
         <div className={classes.appMain}>
       <Header onRouteChange={onRouteChange} route ={route}/>
       <Start onRouteChange={onRouteChange} email={userdata.email}/>
      </div> 
      );
   }

   else if(route === 'BookRoom'){
      return(
         <div className={classes.appMain}>
            <Header onRouteChange={onRouteChange} route ={route}/>
            <BookRoom onRouteChange={onRouteChange} email={userdata.email}/>
      </div> 
      );
   }
   else if(route === 'admin'){
      return(
         <div className={classes.appMain}>
            <Header onRouteChange={onRouteChange} route ={route}/>
            <Admin  onRouteChange={onRouteChange}/>
      </div> 
      );
   }

   else if(route==='patientdetailbypatient' || route === 'doctordetailbydoctor')
   {
      return(
         <div className={classes.appMain}>
            <Header onRouteChange={onRouteChange} route ={route}/>
            <PatientDetails onRouteChange={onRouteChange} userdata={userdata} route={route}/>
         </div> 
      )
   }
   
   else if(route==='doctorProfile')
   {
      return(
         <div className={classes.appMain}>
            <Header onRouteChange={onRouteChange} route ={route}/>
            <Dr onRouteChange={onRouteChange} data={userdata}/>
         </div> 
      )
   }
   else if(route==='patienthistory' || route==='patienthistory2')
   {
      return(
         <div className={classes.appMain}>
            <Header onRouteChange={onRouteChange} route ={route}/>
            <PatientHistory onRouteChange={onRouteChange} history={history}/>
         </div> 
      )
   }

   else if(route === 'appointmentdetails')
   {  
      return(
         <div className={classes.appMain}>
            <Header onRouteChange={onRouteChange} route ={route}/>
            <Appointment appoint={appoint} />
         </div> 
      )

   }

   else if(route === 'roomdetails')
   {  
      return(
         <div className={classes.appMain}>
            <Header onRouteChange={onRouteChange} route ={route}/>
            <RoomDetails roomdetails={roomdetails} />
         </div> 
      )

   }

   else if(route === 'checkReport')
   {  
      return(
         <div className={classes.appMain}>
            <Header onRouteChange={onRouteChange} route ={route}/>
            <ViewReport />
         </div> 
      )

   }
   
  

}

export default App;

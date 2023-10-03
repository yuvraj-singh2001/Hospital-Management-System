import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {IconButton} from '@material-ui/core';
import './dropdown.css';
import Link from '@material-ui/core/Link';
// import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  function ChangeRoute1(){
    sessionStorage.removeItem("jwttoken");
    props.onRouteChange('signin');
  }
  function ChangeRoute(){
    props.onRouteChange('register');
   }

  if(props.route === 'signin' || props.route === 'register' || props.route === 'adminlogin' || props.route === 'doctorsignin'){
      return (
        <div className={classes.root}> 
          <AppBar position="auto">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                {/* <MenuIcon /> */}
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Hospital Management System
              </Typography>
              <div  class="dropdown" >
              <Button class="dropbtn" >{'Patient'}</Button>
              <div class="dropdown-content">
                <Link href='#' onClick = {ChangeRoute1}>Login</Link>
                <Link  href='#' onClick = {ChangeRoute} >Register</Link>
              </div>
            </div>

            <div class="dropdown" >
              <button class="dropbtn"  onClick = {() => props.onRouteChange('doctorsignin')}>Doctor</button>
            </div>
            <div class="dropdown" >
            <button class="dropbtn"  onClick = {() => props.onRouteChange('adminlogin')}>Admin</button>
            </div>
            </Toolbar>
           </AppBar>
         </div>
              );
           }
  
  else if (props.route === 'patientprofile' || props.route === 'admin' || props.route === 'doctorProfile'){
    return (
      <div className={classes.root}> 
        <AppBar position="auto">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Hospital Management System
            </Typography>
            { props.route === 'admin'
              ?  
                <div class="dropdown" >
                <button class="dropbtnmain" onClick = {() => {
                  sessionStorage.removeItem("jwttoken");
                  props.onRouteChange('adminlogin')}} > Sign Out</button>
                </div>
              :
               props.route === 'doctorProfile'
               ?  <div>
                  <div class="dropdown" >
                  <button class="dropbtnmain" onClick = {() => props.onRouteChange('checkReport')} >Previous Report</button>
                  </div>
                  <div class="dropdown" >
                  <button class="dropbtnmain" onClick = {() => {
                    sessionStorage.removeItem("jwttoken");
                    props.onRouteChange('doctorsignin')}} >Sign Out</button>
                  </div>
                  </div>
               :
                <div class="dropdown" >
                <button class="dropbtnmain" onClick = {ChangeRoute1} >Sign Out</button>
                </div>
              }
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  else{
    return (
      <div className={classes.root}> 
        <AppBar position="auto">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Hospital Management System
            </Typography>
            { props.route === 'doctorregistration'
              ? 
                <div> 
                <div class="dropdown" >
                <button class="dropbtnmain" onClick = {() => props.onRouteChange('admin')} >Go Back</button>
                </div>
                <div class="dropdown" >
                <button class="dropbtnmain" onClick = {() => {
                  sessionStorage.removeItem("jwttoken");
                  props.onRouteChange('adminlogin')} } >Sign Out</button>
                </div>
                </div>
              : 
                props.route === 'doctordetailbydoctor' || props.route === 'patienthistory2' || props.route === 'checkReport'
                ?
                  <div>
                  <div class="dropdown" >
                  <button class="dropbtnmain" onClick = {() => props.onRouteChange('doctorProfile')} >Go Back</button>
                  </div> 
                  <div class="dropdown" >
                  <button class="dropbtnmain" style={{marginRight: 50}} onClick = {() => {
                    sessionStorage.removeItem("jwttoken");
                    props.onRouteChange('doctorsignin')}} >Sign Out</button>
                  </div>
                  </div>
                :
                <div>
                <div class="dropdown" >
                <button class="dropbtnmain" onClick = {() => props.onRouteChange('patientprofile')} >Go Back</button>
                </div> 
                <div class="dropdown" >
                <button class="dropbtnmain" style={{marginRight: 50}}onClick = {ChangeRoute1} >Sign Out</button>
                </div>
                </div>
              }
          </Toolbar>
        </AppBar>
      </div>
    );

  }
 }


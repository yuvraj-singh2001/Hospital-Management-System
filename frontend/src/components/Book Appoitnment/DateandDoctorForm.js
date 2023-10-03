import React from 'react';
import {Typography, TextField, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '5%',
      marginTop : '5%',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    drop:
    {
        display: 'flex',
        marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    }

  }));


  function addDoctorData(data){
   
    const l = [];
    //console.log(data);
    for(var i=0; i<data.length; i++){
        l.push({
          name: 'Dr.' + data[i].name + ' - ' + data[i].specialization,
          reg_id: data[i].registrationid
        })
    }

    return l;
  }

export default function AddressForm(props) {
    const classes = useStyles();
    const list = React.useState(addDoctorData(props.doctorDetails));
   
  return (
     
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      Select Date and Doctor
      </Typography>
     
      <Grid container>
      <Grid item xs ={6}>     
       <div >  
       <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Appointment Date"
        type="date"
        name='date'
        defaultValue="yyyy-MM-dd"
        minDate={moment().toDate()}
        value={props.patient.date}
        onChange={props.handleInputChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
    </div>
         <div className="time">
          <form className={classes.container} noValidate>
      <TextField
        id="time"
        label="Appointment Time"
        type="time"
        defaultValue="07:30"
        name='time'
        value={props.patient.time}
        onChange={props.handleInputChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
    </div>
     </Grid>
     <Grid item xs ={6} style={{paddingTop: '20px'}}>   
      <Autocomplete
          id="Search Doctor"
          options={list[0]}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          onChange={(event, value) => props.handleDoctorName(value)}
          renderInput={(params) => <TextField {...params} label="Search Doctor" variant="outlined"/>}
           />
       </Grid>
    </Grid>
    </React.Fragment>
  );
}

 
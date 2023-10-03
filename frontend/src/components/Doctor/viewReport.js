import React, { useState } from "react";
import { Button, Typography, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PatientHistory from "../history2"
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


function Room(props) {
 
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [data, setData] = useState();
  const [flag, setFlag] = useState(false);
 
  var token = sessionStorage.getItem('jwtToken');

  const handleInputChange = e => {
      setEmail(e.target.value);
  }


  function onSearch() {
    
    if (email === '')
     alert('Kindly add the email address!!!!')

    else {
      fetch(uri+'/case_history/patient_case_history', {              
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'jwttoken': token },
        body: JSON.stringify({
            patient_email: email
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data === 'Error in getting diagnosis history')
            alert('Error in getting diagnosis history!!!!')
          else{ 
            setData(data);
            setFlag(true);
          }
        });
    }
  }

  return (
    <div>
      <div class="room-container">
        <Typography component="h1" variant="h5" align="center" style={{padding: '5px' }}>
          Check Previous Report
          </Typography>
      </div>
      <div style={{paddingBottom: '20px'}}>
        <div style={{marginLeft: '13%'}}>
          <form className={classes.container} noValidate>
            <TextField required
                 variant = "outlined"
                 label="Email ID"
                 name="email"
                 type = 'text'
                 value={email}
                 onChange={handleInputChange}
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
          <PatientHistory history={data}/>  
          }
      
    </div >
    

  );
}

export default Room;

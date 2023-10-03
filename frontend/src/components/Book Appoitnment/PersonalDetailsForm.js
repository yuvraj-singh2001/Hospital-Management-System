import {React} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {  FormLabel, Radio, RadioGroup } from "@material-ui/core";



export default function PaymentForm(props) {
  
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required
          id="cardName" 
          label="Name"
          name="name"
          type = 'text' 
         // fullWidth autoComplete="cc-name"
          value={props.patient.name}
          onChange={props.handleInputChange}
           />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Age"
            name="age"
            type = 'number'
            value={props.patient.age}
            onChange={props.handleInputChange}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
        <FormLabel required>Gender</FormLabel>
                <RadioGroup onClick={props.handleInputChange} value={props.patient.gender} row>
                    <FormControlLabel value= "Male" name='gender' control = {<Radio/>} label="Male"/>
                    <FormControlLabel value= "Female" name='gender' control = {<Radio/>} label="Female"/>
                    <FormControlLabel value= "Others" name='gender' control = {<Radio/>} label="Others"/>
                </RadioGroup>
        </Grid>
      
      </Grid>
    </>
  );
}
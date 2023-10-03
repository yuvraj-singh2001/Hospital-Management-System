import { React, useState } from "react";
import PageHeader from "./PageHeader"
import { makeStyles, Paper } from "@material-ui/core";
import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@material-ui/core";
import UploadButtons from './submitbutton';
import Autocomplete from '@material-ui/lab/Autocomplete';
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.React_App_URL;

const list = [
    { title: 'Pediatrician' },
    { title: 'Surgeon' },
    { title: 'Psychiatrist' },
    { title: 'Cardiologist' },
    { title: 'Dermatologist' },
    { title: 'Endocrinologist' },
    { title: 'Gastroenterologist' },
    { title: 'Nephrologist' },
    { title: 'Ophthalmologist' },
    { title: 'Otolaryngologist' },
    { title: 'Pulmonologist' },
    { title: 'Neurologist' },
    { title: 'Radiologist' },
    { title: 'Anesthesiologist' },
    { title: 'Oncologist ' },

];
const liststate = [
    { title: "Andhra Pradesh" },
    { title: "Arunachal Pradesh" },
    { title: "Assam" },
    { title: "Bihar" },
    { title: "Chhattisgarh" },
    { title: "Goa" },
    { title: "Gujarat" },
    { title: "Haryana" },
    { title: "Himachal Pradesh" },
    { title: "Jammu and Kashmir" },
    { title: "Jharkhand" },
    { title: "Karnataka" },
    { title: "Kerala" },
    { title: "Madhya Pradesh" },
    { title: "Maharashtra" },
    { title: "Manipur" },
    { title: "Meghalaya" },
    { title: "Mizoram" },
    { title: "Nagaland" },
    { title: "Odisha" },
    { title: "Punjab" },
    { title: "Rajasthan" },
    { title: "Sikkim" },
    { title: "Tamil Nadu" },
    { title: "Telangana" },
    { title: "Tripura" },
    { title: "Uttarakhand" },
    { title: "Uttar Pradesh" },
    { title: "West Bengal" },
    { title: "Andaman and Nicobar Islands" },
    { title: "Chandigarh" },
    { title: "Dadra and Nagar Haveli" },
    { title: "Daman and Diu" },
    { title: "Delhi" },
    { title: "Lakshadweep" },
    { title: "Puducherry" }];


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    root: {
        '& .MuiFormControl-root': {
            width: '60%',
            margin: theme.spacing(1),
            // leftMargin:'100px'
        }
    }
}))

const initialDoctorValues = {
    registrationid: '',
    name: '',
    dob: '',
    mobile_number: '',
    email: '',
    password: '',
    address: '',
    gender: '',
    state: '',
    specialization: ''
}

export default function Docreg(props) {

    const [values, setvalues] = useState(initialDoctorValues);
    const classes = useStyles();
    const handleInputChange = e => {
        const{ name,value} = e.target
        setvalues({
            ...values,
            [name]: value
        })
    }

    function onSubmit() {
      
      if(values.name === '' || values.registrationid === '' || values.dob === '' || values.mobile_number === '' || values.email === '' || values.password === '' || values.address === '' || values.state === '' || values.specialization === '' )
        alert('Kindly fill all the details')

      else{  
        fetch(uri+'/admin/register_doctor', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: values
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data === 'success')
                    alert('New Doctor added in the database');
                else if (data === 'Email already exists')
                    alert('Email already exists');
                else if (data === 'Registration ID already exists')
                    alert('Registration ID already exists');
                else
                    alert('Error in registering doctor! Please try again');

            })
        }
    }

    return (
        <Paper className={classes.pageContent}>
            <PageHeader
                title=" DOCTOR REGISTRATION FORM  :"
                subTitle=" (All the fields marked with (*) are mandatory)  "

            />
            <PageHeader
                title="Doctor Details:"
                subTitle=""
            />

            <form className={classes.root}>

                <Grid container>
                    <Grid item xs={6}>
                        <TextField required
                            variant="outlined"
                            label="Full Name"
                            name="name"
                            type='text'
                            value={values.name}
                            onChange={handleInputChange}
                        />

                        <TextField required
                            variant="outlined"
                            label="Email ID"
                            name="email"
                            type='text'
                            value={values.email}
                            onChange={handleInputChange}
                        />

                        <TextField required
                            variant="outlined"
                            label="Date of Birth"
                            name='dob'
                            type="date"
                            value={values.dob}
                            onChange={handleInputChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel required>Gender</FormLabel>
                        <RadioGroup row value={values.gender} onChange={handleInputChange} >
                            <FormControlLabel value="male" name='gender' control={<Radio />} label="Male" />
                            <FormControlLabel value="female" name='gender' control={<Radio />} label="Female" />
                            <FormControlLabel value="others" name='gender' control={<Radio />} label="Others" />
                        </RadioGroup>

                        <TextField required
                            variant="outlined"
                            label="Password"
                            name="password"
                            type='password'
                            value={values.password}
                            onChange={handleInputChange}
                        />

                        <Autocomplete
                            id="specialization"
                            options={list}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 300 }}
                            onChange={(event, value) => setvalues({ ...values, specialization: value.title })}
                            renderInput={(params) => <TextField {...params} label="Specialization" variant="outlined" />}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={6}>
                        <TextField required
                            variant="outlined"
                            label="Registration ID"
                            name="registrationid"
                            type='text'
                            value={values.registrationid}
                            onChange={handleInputChange}
                        />

                        <TextField required
                            variant="outlined"
                            label="Phone Number "
                            name="mobile_number"
                            type='number'
                            value={values.mobile_number}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField required
                            variant="outlined"
                            label="Address "
                            name="address"
                            type='text'
                            multiline={true}
                            rows={2}
                            value={values.address}
                            onChange={handleInputChange}
                        />
                        <  Autocomplete
                            id="State"
                            options={liststate}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 300 }}
                            onChange={(event, value) => setvalues({ ...values, state: value.title })}
                            renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
                        />

                    </Grid>

                </Grid>
                <UploadButtons onSubmit={onSubmit} />

            </form>

        </Paper>

    )
}
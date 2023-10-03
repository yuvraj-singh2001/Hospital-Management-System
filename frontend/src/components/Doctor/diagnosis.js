import { React, useState } from "react";
import PageHeader from "../Registration/PageHeader"
import { makeStyles, withStyles, Paper } from "@material-ui/core";
import { Grid, TextField, Button } from "@material-ui/core";
import UploadButtons from '../Registration/submitbutton';
import Autocomplete from '@material-ui/lab/Autocomplete';
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.React_App_URL;

const listdisease = [
    { title: 'Fever' },
    { title: 'Cough' },
    { title: 'Cold' },
    { title: 'Corona' },
    { title: 'Diarrhea' },
    {title: 'Diabetes' },
    {title: 'Kidney Stone' },
    {title: 'Heart Disease' },
    {title: 'Liver disease' },
    {title: 'Cancer' },
    {title: 'Allergies and Asthma' },
    {title: 'Scleroderma' },
    {title: 'Relapsing Polychondritis' },
    {title: 'Celiac Disease' },
    

];


const DarkerDisabledTextField = withStyles({
    root: {
      marginRight: 8,
      "& .MuiInputBase-root.Mui-disabled": {
        color: "rgba(0, 0, 0, 0.9)" // (default alpha is 0.38)
      }
    }
  })(TextField);


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


export default function Docreg(props) {
    
    const [values, setvalues] = useState({
        patient_name: props.details.name,
        patient_age: props.details.age,
        email: props.details.email,
        gender: props.details.gender,
        doctor_id: props.details.Doctor_Reg_ID,
        doctor_name: props.name,
        app_date: props.details.app_date,
        app_time: props.details.app_time,
        appointmentid  :props.details._id,
        disease: '',
        symptoms:'',
        prescription: '',
    });
    
    const classes = useStyles();

    const handleInputChange = e => {
        const{ name,value} = e.target
        setvalues({
            ...values,
            [name]: value
        })
    }
    

    function onSubmit() {
     
       if(values.disease === '' || values.symptoms === '' || values.prescription === '')
         alert('Kindly fill all the details ')

       else { 
        var token = sessionStorage.getItem('jwtToken');
        fetch(uri+'/case_history/add_prescription', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' ,'jwttoken': token},
            body: JSON.stringify({
                data: values
             })
           })
            .then(response => response.json())
            .then(data => {
                console.log(data);
               if (data === 'success'){
                    alert('Patient Details Successfully Added!!!!');
                    props.onRouteChange('bookappointment');
               }
                else
                    alert('Error in adding patient details!!!\nKindly add it again');
            })
          }
    }
 
    return (
        <Paper style={{marginTop:"3%",marginLeft:"4"}}>
            <PageHeader
                title=" PATIENT DIAGNOSIS FORM  :"
                subTitle=" (All the fields marked with (*) are mandatory)  "

            />
            <PageHeader
                title="Patient Details:"
                subTitle=""
            />

            <form className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                       <DarkerDisabledTextField required
                            variant="outlined"
                            label="Patient Name "
                            name="name"
                            type='text'
                            disabled
                            value={values.patient_name}
                        />

                        <DarkerDisabledTextField required
                            variant="outlined"
                            label="Age(in Years)"
                            name='age'
                            type="number"
                            disabled
                            value={values.patient_age}
                           
                        />
                      
                      <TextField required
                            variant="outlined"
                            label="Medical prescription "
                            name="prescription"
                            type='text'
                            multiline={true}
                            rows={3}
                            value={values.prescription}
                            onChange={handleInputChange}
                        />

                    </Grid>
                    <Grid item xs={6}>
                    <DarkerDisabledTextField required
                            variant="outlined"
                            label="Gender"
                            name="gender"
                            type='text'
                            disabled
                            value={values.gender}
                      /> 

                        <TextField required
                            variant="outlined"
                            label="Symptoms "
                            name="symptoms"
                            type='text'
                            multiline={true}
                            rows={2}
                            value={values.symptoms}
                            onChange={handleInputChange}
                        />

                        <Autocomplete
                            id="disease"
                            options={listdisease}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 500 }}
                            onChange={(event, value) => setvalues({ ...values, disease: value.title })}
                            renderInput={(params) => <TextField {...params} label=" Disease" variant="outlined" />}
                        />
                    </Grid>
                </Grid>
                <Grid style={{display:'flex',justifyContent:"center", padding: "10px",}}>
                <Button  onClick = {() => props.onRouteChange('bookappointment')}   >
                 Go Back
                </Button>
                <UploadButtons onSubmit={onSubmit} />
                </Grid>
                
                

            </form>

        </Paper>

    )

}
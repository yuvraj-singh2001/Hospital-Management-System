import React, {useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PageHeader from "./Registration/PageHeader"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Grid, TextField} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, Age, Gender, dr, date, time, disease, prescription, symptoms) {
    return {name, Age, Gender, dr, date, time, disease, prescription, symptoms};
  }



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));


const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.9)" // (default alpha is 0.38)
    }
  }
})(TextField);

export default function CustomizedTables(props) {
  
  const [route, setRoute] = useState('all');
  const [selectedData, setSelData] = useState([]);

   function onRouteChange(r,data){
     setSelData(data);
     setRoute(r);
   }

   function setData(data){
      const rows = [];
     //console.log(data);
      data.map((details) => (
        rows.push(createData(details.patient_name, details.patient_age, details.gender, details.doctor_name, details.app_date, details.app_time, details.disease, details.prescription, details.symptoms))
      )) 
      return rows;
   }

  const rows = setData(props.history);
  const classes = useStyles();
 
  if(route === 'all'){
    return (
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{width: 50}}>Name </StyledTableCell>
              <StyledTableCell align="center" style={{width: 50}}>Age </StyledTableCell>
              <StyledTableCell align="center" style={{width: 50}}>Gender</StyledTableCell>
              <StyledTableCell align="center" style={{width: 50}}>Doctor Name</StyledTableCell>
              <StyledTableCell align="center" style={{width: 50}}>Appointment Date</StyledTableCell>
              <StyledTableCell align="center" style={{width: 50}}>Appointment Time</StyledTableCell>
              <StyledTableCell align="center" style={{width: 50}} >View Report</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Age}</StyledTableCell>
              <StyledTableCell align="center">{row.Gender}</StyledTableCell>
              <StyledTableCell align="center">Dr. {row.dr}</StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center">{row.time}</StyledTableCell>
              <Button variant="contained" color="lightsecondary"  style={{marginLeft: '35%', marginTop:'8px' }} onClick = {() => onRouteChange('patient', row)} > View </Button>
            </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      );
    }
  
  else if(route === 'patient'){
    console.log(selectedData)
    return (  
              <main className={classes.layout}>
        <Paper className={classes.paper} >
      <Typography variant="h6" gutterBottom style={{marginLeft: "38%"} }>
        Review Report 
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem} key='Dr'>
        <Typography variant="h6" style={{color: "blue"}}>Dr. {selectedData.dr}  </Typography>
            
          </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom className={classes.title}>
            Patient Details
          </Typography>
          <Grid container>
                <Grid item xs={6}>
                  <Typography gutterBottom>Name</Typography>
                  <Typography gutterBottom>Age</Typography>
                  <Typography gutterBottom>Gender</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{selectedData.name}</Typography>
                  <Typography gutterBottom>{selectedData.Age}</Typography>
                  <Typography gutterBottom>{selectedData.Gender}</Typography>
                </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          
        <Typography variant="h6" gutterBottom className={classes.title}>
            Appointment Time
          </Typography>
           <Grid container>
           <Grid item xs={6}>
                  <Typography gutterBottom>Date</Typography>
                  <Typography gutterBottom>Time</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{selectedData.date}</Typography>
                  <Typography gutterBottom>{selectedData.time}</Typography>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid >
          <Typography variant="h6" gutterBottom className={classes.title}>
             Disease
            </Typography>
             <Typography>{selectedData.disease}</Typography>
          </Grid>
          <Grid >
          
          <Typography variant="h6" gutterBottom className={classes.title}>
            Symptom
            </Typography>
             <Typography>{selectedData.symptoms}</Typography>
          </Grid>
          <Grid >
          
          <Typography variant="h6" gutterBottom className={classes.title}>
          Prescription
            </Typography>
             <Typography>{selectedData.prescription}</Typography>
          </Grid>
      
          
    
              <Grid style={{display:'flex',justifyContent:"center", padding: "10px",}}>
              <Button  variant="contained" onClick = {() => onRouteChange('all')}   >
               Go Back
              </Button>
              </Grid>
          
      </Paper>
      </main>
     )

  } 
}

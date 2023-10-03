import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
import Button from '@material-ui/core/Button';


const TablePage = (props) => {
  
  const columns= [
    
    {
      label: 'Name',
      field: 'Name',
    },
    {
      label: 'Age',
      field: 'Age',
    },
    {
        label: 'Gender',
         field: 'Gender',
    },
    {
        label: 'Email',
         field: 'mail',
    },
    {
        label: 'Appointment Date',
         field: 'Date',
    },
    {
        label: 'Appointment TIme',
         field: 'Time',
    },
    {
      label: 'Action',
      field: 'Action',
    },
    {
      label: 'Cancel',
      field: 'Cancel',
    }
    ,
    {
      label: 'View Profile',
      field: 'View',
    }
  ];
 
  const rows_regular = () => {

   const rows_regular = [];
     props.pendingApp.map((details, index) => (
          rows_regular.push({
            'Name':details.name,
            'Age': details.age,
            'Gender': details.gender,
            'mail' : details.email,
            'Date' : details.app_date,
            'Time' : details.app_time,
            'Action': <Button variant="contained" color="primary" onClick={ () => props.onStatusChange('confirm', details._id)} >Confirm</Button>,
            'Cancel': <Button variant="contained" color="secondary" onClick={() => props.onStatusChange('cancel', details._id)} >Cancel</Button>,
            'View': <Button variant="contained" color="lightsecondary" onClick = {() => props.onRouteChange('patienthistory2', details.email)} > View </Button>
          })
      ))
     return rows_regular
  }
 

  return(
    <MDBTable btn>
      <MDBTableHead columns={columns} />
      <MDBTableBody rows={rows_regular()} />
    </MDBTable>
  );
};

export default TablePage;
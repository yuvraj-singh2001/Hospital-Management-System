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
      label: 'Add Prescription',
      field: 'Add ',
    },
    {
      label: 'View Profile',
      field: 'View',
    }
  ];

  const rows_regular = () => {
    const rows_regular = [];

    if(props.confirmApp !== undefined){
      props.confirmApp.map((details, index) => (
            rows_regular.push({
              'Name':details.name,
              'Age': details.age,
              'Gender': details.gender,
              'mail' : details.email,
              'Date' : details.app_date,
              'Time' : details.app_time,
              'Add ': <Button variant="contained" color="lightprimary" onClick = {() => props.onRouteChange22('diagnosis', details)}>Add </Button>,
              'View':  <Button variant="contained" color="lightsecondary" onClick = {() => props.onRouteChange('patienthistory2', details.email)} > View </Button>
            })
      ))
      }
     return rows_regular
  }


  return(
    <MDBTable btn >
      <MDBTableHead columns={columns} />
      <MDBTableBody rows={rows_regular()} />
    </MDBTable>
  );
};

export default TablePage;
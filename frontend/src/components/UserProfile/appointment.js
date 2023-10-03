import React from 'react';
import {MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
import {Button, Typography} from '@material-ui/core';

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
        label: 'Doctor Name',
         field: 'doc',
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
      label: 'Status',
      field: 'Action',
    }
  ];

  const rows_regular = () => {

  const rows_regular_btn = [];

    props.appoint.map((details, index) => (
      details.app_status === 'confirmed'
        ?
          rows_regular_btn.push({
            'Name': details.name,
            'Age': details.age,
            'Gender': details.gender,
            'doc': details.doctorname,
            'Date' : details.app_date,
            'Time' : details.app_time,
            'Action':   <Button color="primary" ><b>{details.app_status}</b></Button>
          })
        : details.app_status === 'rejected'
           ?
           rows_regular_btn.push({
            'Name': details.name,
            'Age': details.age,
            'Gender': details.gender,
            'doc': details.doctorname,
            'Date' : details.app_date,
            'Time' : details.app_time,
            'Action':   <Button color="secondary" ><b>{details.app_status}</b></Button>
            })
            : 
            rows_regular_btn.push({
              'Name': details.name,
              'Age': details.age,
              'Gender': details.gender,
              'doc': details.doctorname,
              'Date' : details.app_date,
              'Time' : details.app_time,
              'Action':   <Button color="lightsecondary" ><b>{details.app_status}</b></Button>
              })
          
    ))
     return rows_regular_btn;
  }

  return(
    <div>
    <Typography component="h1" variant="h4" align="left" style={{marginLeft:'10%', padding: '10px'}}>Appointment Details </Typography>
    <MDBTable btn >
      <MDBTableHead columns={columns} />
      <MDBTableBody rows={rows_regular()} />
    </MDBTable>
    </div>
  );
};

export default TablePage;
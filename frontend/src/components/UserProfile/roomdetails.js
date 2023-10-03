import React from 'react';
import {MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
import {Button, Typography} from '@material-ui/core';

const TablePage = (props) => {
  console.log(props.roomdetails)

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
        label: 'Room Number',
         field: 'num',
    },
    {
        label: 'Start Date',
         field: 'startDate',
    },
    {
      label: 'End Date',
       field: 'endDate',
    },
    {
      label: 'Status',
      field: 'Action',
    }
  ];

  const rows_regular = () => {

  const rows_regular_btn = [];

    props.roomdetails.map((details, index) => (
      details.room_status === 'booked'
        ?
          rows_regular_btn.push({
            'Name': details.name,
            'Age': details.age,
            'Gender': details.gender,
            'num': details.room_no,
            'startDate' : details.booking_date.substring(0,10),
            'endDate' : details.release_date.substring(0,10),
            'Action':   <Button color="primary" ><b>{details.room_status}</b></Button>
          })
        : details.room_status === 'rejected'
           ?
           rows_regular_btn.push({
            'Name': details.name,
            'Age': details.age,
            'Gender': details.gender,
            'num': details.room_no,
            'startDate' : details.booking_date.substring(0,10),
            'endDate' : details.release_date.substring(0,10),
            'Action':   <Button color="secondary" ><b>{details.room_status}</b></Button>
            })
            : 
            rows_regular_btn.push({
              'Name': details.name,
              'Age': details.age,
              'Gender': details.gender,
              'num': details.room_no,
              'startDate' : details.booking_date.substring(0,10),
              'endDate' : details.release_date.substring(0,10),
              'Action':   <Button color="lightsecondary" ><b>{details.room_status}</b></Button>
              })
          
    ))
     return rows_regular_btn;
  }

  return(
    <div>
    <Typography component="h1" variant="h4" align="left" style={{marginLeft:'10%', padding: '10px'}}>Room Details</Typography>
    <MDBTable btn >
      <MDBTableHead columns={columns} />
      <MDBTableBody rows={rows_regular()} />
    </MDBTable>
    </div>
  );
};

export default TablePage;
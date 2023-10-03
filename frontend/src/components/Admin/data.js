import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
import Button from '@material-ui/core/Button';

const TablePage = (props) => {
  
  console.log(props.pendingReq);
  
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
       field: 'email',
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
      label: 'Confirm',
      field: 'Action',
    },
    {
      label: 'Cancel',
      field: 'Cancel',
    }
  
  ];

  const rows_regular = () => { 
    const rows_regular_btn = [];
    
    props.pendingReq.map((details, index) => (
       rows_regular_btn.push({
          'Name':details.name,
          'Age': details.age,
          'Gender': details.gender,
          'email': details.email,
          'num' : details.room_no,
          'startDate' : details.booking_date.substring(0,10),
          'endDate' : details.release_date.substring(0,10),
          'Action':  <Button variant="contained" color="primary" onClick={ () => props.onStatusChange('confirm', details._id)} >
            confirm
          </Button>,
          'Cancel':  <Button variant="contained" color="secondary" onClick={() => props.onStatusChange('cancel', details._id)}>
          cancel
        </Button>,
       })
    ))
  return rows_regular_btn
}

  return(
    <div className= "Status" >
      <MDBTable btn >
      <MDBTableHead columns={columns} />
      <MDBTableBody rows={rows_regular()} />
    </MDBTable>
    </div>
    
  );
};

export default TablePage;
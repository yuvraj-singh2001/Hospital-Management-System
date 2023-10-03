import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
 import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      paddingLeft : '37%',
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButtons(props) {
  const classes = useStyles();
  function onSubmit(){
      props.onSubmit();
  }

  return (
    <div className={classes.root}>
     
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" onClick = {onSubmit}>
          Submit
        </Button>
      </label>
     
    </div>
  );
}

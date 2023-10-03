import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

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
}));

export default function Review(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem} key='Dr'>
            <ListItemText primary={props.doctorname} />
            <Typography variant="body2">{props.specialization}</Typography>
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
                  <Typography gutterBottom>{props.name}</Typography>
                  <Typography gutterBottom>{props.age}</Typography>
                  <Typography gutterBottom>{props.gender}</Typography>
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
                  <Typography gutterBottom>{props.date}</Typography>
                  <Typography gutterBottom>{props.time}</Typography>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
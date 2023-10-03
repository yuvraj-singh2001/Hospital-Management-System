import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.React_App_URL;


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const [values, setCred] = useState({email: '', password: ''});
  const classes = useStyles();

  function ChangeRoute(){
     props.onRouteChange('register');
  }

  function onSubmit(e){
    e.preventDefault();

    
    fetch(uri+'/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailid: values.email,
        password: values.password
      })
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        if (data.success === true) {
          sessionStorage.setItem('jwtToken', data.token);

          fetch(uri+'/me', {
              method: 'get',
              headers: { 'Content-Type': 'application/json','jwttoken' : data.token},
            })
              .then(response => response.json())
              .then(data => {
                props.onProfileChange(data, 'patientprofile');
              });
        }
        else if (data.emailnotfound)
          alert(data.emailnotfound);
        else if (data.passwordincorrect)
          alert('Incorrect Password');
        else
          alert('Invalid');
      });


  }

  function onSubmit2(e){
    //console.log(values);
    e.preventDefault();
   
    if(props.route === 'adminlogin'){
      if(values.email === 'admin' && values.password === 'admin')
        props.onRouteChange('admin');
      else
        alert('Wrong Credentials')
       
    }

    else{
    fetch(uri+'/doctor/login', {
      method: 'post',
      
      headers: { 'Content-Type': 'application/json' },
   		body: JSON.stringify({
   			email: values.email,
   			password: values.password
   		})
   	})
      .then(response => response.json())
      .then(data => {
       // console.log(data);
        if (data.success===true)
        {
          sessionStorage.setItem('jwtToken', data.token);

            fetch(uri+'/doctor/me', {
              method: 'get',
              headers: { 'Content-Type': 'application/json','jwttoken' : data.token},
            })
              .then(response => response.json())
              .then(data => {
                props.onProfileChange(data, 'doctorProfile');
              });
          
        }
        else if (data.emailnotfound)
          alert(data.emailnotfound);
        else if (data.passwordincorrect)
          alert('Incorrect Password');
        else
          alert('Invalid');
      })
    }
  }

  if(props.route === 'signin'){
   return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {e => {
              const val = e.target.value;
              setCred(prevState => {
               return { ...prevState, email: val }
               });
              }
             }

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            //autoComplete="current-password"
            onChange = {e => {
              const val = e.target.value;
              setCred(prevState => {
               return { ...prevState, password: val }
               });
              }
             }

          />
    
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
            type="submit"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick = {ChangeRoute}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
     );
    }
  
    else{
      return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {  
           props.route === 'doctorsignin'
            ?
              <Typography component="h1" variant="h5">
                Doctor Sign in
              </Typography>
            :  
              <Typography component="h1" variant="h5">
               Admin Sign in
              </Typography>
           }
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {e => {
                const val = e.target.value;
                setCred(prevState => {
                 return { ...prevState, email: val }
                 });
                }
               }
  
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              //autoComplete="current-password"
              onChange = {e => {
                const val = e.target.value;
                setCred(prevState => {
                 return { ...prevState, password: val }
                 });
                }
               }
  
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit2}
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
       );
    }

}
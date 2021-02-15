import { Button, Grid, TextField, Typography, makeStyles, Link } from '@material-ui/core';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  mainContainer: {
    flexDirection: 'row'
  },
  header: {
    marginBottom: 20
  },
  boxStyle: {
    marginTop: 20,
    marginBottom: 20,
    padding: 5
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const SignUpForm = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ instrument, setInstrument ] = useState('');

  const classes = useStyles()

  const handleSignUp = (e) => {
    e.preventDefault();
    const newUser = { username, password, instrument };
    console.log(newUser);
  }
  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"  
    >
      <form onSubmit={handleSignUp}>
      <Grid item className={classes.boxStyle}>
        <TextField placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
      </Grid>
      <Grid item className={classes.boxStyle}>
        <TextField placeholder="Instrument" value={instrument} onChange={({ target }) => setInstrument(target.value)} />
      </Grid>
      <Grid item className={classes.boxStyle}>
        <TextField placeholder="Password" value={password} type='password' onChange={({ target }) => setPassword(target.value)} />
      </Grid>
      <Grid item className={classes.boxStyle}>
        <Button type="submit">Create account</Button>
      </Grid>
      <Grid item>
        <Link variant='body2' component={RouterLink} to='/'>Cancel</Link>
      </Grid>
      </form>
    </Grid>
  )
}

export default SignUpForm;
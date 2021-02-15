import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: 20
  },
}));

const Header = ({ currentUser, token, handleLogOut }) => {
  const classes = useStyles();
  const history = useHistory()
  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      >
        <Grid item>
          <Typography variant='h2' className={classes.header}>Practice clock</Typography> 
        </Grid>
        <Grid item>
          {token 
            ? <Typography>Welcome back {currentUser.username}!</Typography>
            : <Link to='/login'><Typography variant='h5'>Signup/Login</Typography></Link>
          }
        </Grid>
        <Grid item>
          {token
            ? <>
              <Button onClick={() => history.push('/')}>Home</Button> 
              <Button onClick={() => history.push('/history')}>History</Button>
              <Button href ='/' onClick={handleLogOut}>Log out</Button></>
            : null
          }
        </Grid>
      </Grid>
  )
}

export default Header;
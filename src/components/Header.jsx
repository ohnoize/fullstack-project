import {
  Button, Grid, makeStyles, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles(() => ({
  header: {
    marginBottom: 20,
  },
}));

const Header = ({ currentUser, token, handleLogOut }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h2" className={classes.header}>Practice clock</Typography>
      </Grid>
      <Grid item>
        {token
          ? (
            <Typography>
              Welcome back
              {' '}
              {currentUser.username}
              !
            </Typography>
          )
          : <Link to="/login"><Typography variant="h5">Signup/Login</Typography></Link>}
      </Grid>
      <Grid item>
        {token
          ? (
            <>
              <Button component={Link} to="/">Home</Button>
              <Button component={Link} to="/history">History</Button>
              <Button component={Link} to="/" onClick={handleLogOut}>Log out</Button>
            </>
          )
          : null}
      </Grid>
    </Grid>
  );
};

export default Header;

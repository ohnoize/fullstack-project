import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography, 
  Grid,
  Button
  } from '@material-ui/core';
import MainTimer from './components/MainTimer';
import LoginForm from './components/LoginForm';
import { useApolloClient, useQuery } from '@apollo/client';
import { CURRENT_USER } from './graphql/queries';

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



const App = () => {
  
  const [token, setToken] = useState(null);
  const classes = useStyles();
  const client = useApolloClient()

  const currentUser = useQuery(CURRENT_USER, {
    pollInterval: 1000
  })

  const handleLogOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore()
  }

  return (
    <Router>
    <Grid
      container
      direction="column"
    >
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
            ? <Typography>Welcome back {currentUser.data.me.username}!</Typography>
            : <Link to='/login'><Typography variant='h5'>Signup/Login</Typography></Link>
          }
        </Grid>
        <Grid item>
          {token
            ? <Button onClick={handleLogOut}>Log out</Button>
            : null
          }
        </Grid>
      </Grid>
      <Switch>
        <Route path='/login'>
          <LoginForm setToken={setToken} />
        </Route>
        <Route path='/'>
          <MainTimer />
        </Route>
      </Switch>
    </Grid>
    </Router>
  );
};

export default App;
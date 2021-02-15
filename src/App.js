import React, {useContext, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, useHistory
} from "react-router-dom"

import { 
  Grid,
  } from '@material-ui/core';
import MainTimer from './components/MainTimer';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import { useApolloClient, useQuery } from '@apollo/client';
import SessionHistory from './components/SessionHistory';
import SignUpForm from './components/SignUpForm';

const App = () => {
  
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  let currentUser = JSON.parse(localStorage.getItem('shed-app-user'));
  const history = useHistory();
  useEffect(() => {
    const localToken = localStorage.getItem('shed-app-user-token')
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  // console.log('Current user in app:', currentUser)
 
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
      <Header currentUser={currentUser} token={token} handleLogOut={handleLogOut} />
      <Switch>
        <Route path='/login'>
          <LoginForm setToken={setToken} />
        </Route>
        <Route path='/signup'>
          <SignUpForm />
        </Route>
        <Route path='/history'>
            <SessionHistory currentUser={currentUser} />
        </Route>
        <Route path='/'>
          <MainTimer currentUser={currentUser} />
        </Route>
      </Switch>
    </Grid>
    </Router>
  );
};

export default App;
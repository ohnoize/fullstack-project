import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';

import {
  Grid,
} from '@material-ui/core';
import { useApolloClient, useMutation } from '@apollo/client';
import MainTimer from './components/MainTimer';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import SubjectForm from './components/SubjectForm';
import SignUp from './components/SignUp';
import AccountPage from './components/AccountPage';
import { LOG_OUT } from './graphql/mutations';

const App = () => {
  const [token, setToken] = useState(null);
  const [practiceTime, setPracticeTime] = useState({});
  const [logOut] = useMutation(LOG_OUT);
  const client = useApolloClient();
  const currentUser = JSON.parse(localStorage.getItem('shed-app-user'));

  useEffect(() => {
    const localToken = localStorage.getItem('shed-app-user-token');
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const handleLogOut = () => {
    setToken(null);
    logOut();
    setPracticeTime({});
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Router>
      <Grid
        container
        direction="column"
        alignItems="center"
        margin="40"
      >
        <Header currentUser={currentUser} token={token} handleLogOut={handleLogOut} />
        <Switch>
          <Route path="/login">
            <LoginForm setToken={setToken} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/addsubject">
            <SubjectForm />
          </Route>
          <Route path="/account">
            <AccountPage />
          </Route>
          <Route path="/">
            <MainTimer
              token={token}
              practiceTime={practiceTime}
              setPracticeTime={setPracticeTime}
            />
          </Route>
          <Route path="/*">
            <MainTimer
              token={token}
              practiceTime={practiceTime}
              setPracticeTime={setPracticeTime}
            />
          </Route>
        </Switch>
      </Grid>
    </Router>
  );
};

export default App;

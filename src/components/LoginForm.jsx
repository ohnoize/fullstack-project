import { useMutation } from '@apollo/client';
import {
  Button, Grid, TextField, makeStyles, Link,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';

import { useHistory, Link as RouterLink } from 'react-router-dom';
import { LOGIN } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  mainContainer: {
    flexDirection: 'row',
  },
  header: {
    marginBottom: 20,
  },
  boxStyle: {
    marginTop: 20,
    marginBottom: 20,
    padding: 5,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const classes = useStyles();

  const history = useHistory();
  useEffect(() => {
    if (result.data) {
      const { token } = result.data.login;
      const { user } = result.data.login;
      setToken(token);
      localStorage.setItem('shed-app-user-token', token);
      localStorage.setItem('shed-app-user', JSON.stringify(user));
      history.push('/');
    }
  }, [result.data]);

  const handleLogin = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };
  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      <form onSubmit={handleLogin}>
        <Grid item className={classes.boxStyle}>
          <TextField id="username" placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
        </Grid>
        <Grid item className={classes.boxStyle}>
          <TextField id="password" placeholder="Password" value={password} type="password" onChange={({ target }) => setPassword(target.value)} />
        </Grid>
        <Grid item className={classes.boxStyle}>
          <Button id="login-button" type="submit">Login</Button>
        </Grid>
        <Grid item>
          <Link variant="body2" component={RouterLink} to="/signup">Create account</Link>
        </Grid>
        <Grid item>
          <Link id="cancel-button" variant="body2" component={RouterLink} to="/">Cancel</Link>
        </Grid>
      </form>
    </Grid>
  );
};

export default LoginForm;

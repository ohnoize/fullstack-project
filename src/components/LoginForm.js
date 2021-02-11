import { useMutation } from '@apollo/client';
import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';


const LoginForm = ({ setToken }) => {
  
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [ { query: CURRENT_USER } ]
  })
  const history = useHistory();
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.token;
      const user = result.data.login.user;
      setToken(token)
      localStorage.setItem('shed-app-user-token', token);
      localStorage.setItem('shed-app-user', JSON.stringify(user));
      history.push('/')
    }
  }, [result.data])

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ variables: { username, password }})
  }
  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"  
    >
      <form onSubmit={handleLogin}>
        <TextField placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
        <TextField placeholder="Password" value={password} type='password' onChange={({ target }) => setPassword(target.value)} />
        <Button type="submit">Login</Button>
      </form>
    </Grid>
  )
}

export default LoginForm;
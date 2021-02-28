import { useMutation } from '@apollo/client';
import {
  Button, Grid, TextField, makeStyles, Link,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { LOGIN } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import AlertDialog from './Alert';

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

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Enter your username'),
  password: yup
    .string()
    .required('Enter your password'),
});

const LoginForm = ({ setToken }) => {
  const [errorText, setErrorText] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const handleError = (text) => {
    setErrorText(text);
    setErrorOpen(true);
  };
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

  const handleLogin = async (values) => {
    const { username, password } = values;
    try {
      await login({ variables: { username, password } });
    } catch (error) {
      handleError(error.message);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <>
      <AlertDialog
        alertText={errorText}
        setOpen={setErrorOpen}
        open={errorOpen}
        action={() => null}
      />
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid item className={classes.boxStyle}>
            <TextField
              id="username"
              name="username"
              label="Username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item className={classes.boxStyle}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
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
    </>
  );
};

export default LoginForm;

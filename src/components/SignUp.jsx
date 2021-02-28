import { useMutation } from '@apollo/client';
import {
  Button, Grid, makeStyles, Link, TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { ADD_USER } from '../graphql/mutations';
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
  instrument: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('username is required'),
  instrument: yup
    .string()
    .min(1)
    .max(30),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords need to match')
    .required('password confirmation required'),
});

const SignUp = () => {
  const classes = useStyles();
  const [alertText, setAlertText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [signUp] = useMutation(ADD_USER);
  const handleAlert = (text) => {
    setAlertText(text);
    setAlertOpen(true);
  };
  const handleSignUp = async (values) => {
    const { username, password, instrument } = values;
    const newUser = { username, password, instrument };
    // console.log(newUser);
    try {
      await signUp({ variables: { ...newUser } });
      handleAlert(`New user ${newUser.username} added!`);
    } catch (e) {
      throw new Error(e.message);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSignUp,
  });
  const history = useHistory();

  return (
    <>
      <AlertDialog
        alertText={alertText}
        setOpen={setAlertOpen}
        open={alertOpen}
        action={() => history.push('/login')}
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
              id="instrument"
              name="instrument"
              label="Instrument"
              placeholder="Instrument"
              value={formik.values.instrument}
              onChange={formik.handleChange}
              error={formik.touched.instrument && Boolean(formik.errors.instrument)}
              helperText={formik.touched.instrument && formik.errors.instrument}
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>
          <Grid item className={classes.boxStyle}>
            <Button id="signup-button" type="submit">Create account</Button>
          </Grid>
        </form>
        <Grid item>
          <Link variant="body2" component={RouterLink} to="/">Cancel</Link>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;

import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Grid, TextField, makeStyles, Link,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ADD_SUBJECT } from '../graphql/mutations';
import { CURRENT_USER, GET_SUBJECTS } from '../graphql/queries';
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
  name: '',
  description: '',
};

const validationSchema = yup.object({
  name: yup
    .string()
    .min(1)
    .max(30)
    .required('Subject name is required'),
  description: yup
    .string(),
});

const SubjectForm = () => {
  const [alertText, setAlertText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const userQuery = useQuery(CURRENT_USER);
  const [addSubject] = useMutation(ADD_SUBJECT, {
    refetchQueries: [{ query: GET_SUBJECTS }],
  });
  const history = useHistory();
  const classes = useStyles();

  const handleAlert = (text) => {
    setAlertText(text);
    setAlertOpen(true);
  };
  const handleError = (text) => {
    setErrorText(text);
    setErrorOpen(true);
  };

  const handleAddSubject = async (values) => {
    // console.log(values);
    const { name, description } = values;
    let userID;
    if (userQuery.data) {
      userID = userQuery.data.me.id;
    }
    const newSubject = { name, description, userID };
    try {
      await addSubject({ variables: { ...newSubject } });
      handleAlert(`${name} added as subject!`);
    } catch (error) {
      handleError(error.message);
    }
  };
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleAddSubject,
  });
  return (
    <>
      <AlertDialog
        alertText={alertText}
        setOpen={setAlertOpen}
        open={alertOpen}
        action={() => history.push('/')}
      />
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
              id="subject"
              name="name"
              label="Subject"
              placeholder="Subject"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item className={classes.boxStyle}>
            <TextField
              id="description"
              name="description"
              label="Description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid item className={classes.boxStyle}>
            <Button id="submit-button" type="submit">Add subject</Button>
          </Grid>
          <Grid item>
            <Link id="cancel-button" variant="body2" component={RouterLink} to="/">Cancel</Link>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default SubjectForm;

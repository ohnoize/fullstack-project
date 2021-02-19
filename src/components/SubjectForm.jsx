import { useMutation } from '@apollo/client';
import {
  Button, Grid, TextField, makeStyles, Link,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { ADD_SUBJECT } from '../graphql/mutations';
import { GET_SUBJECTS } from '../graphql/queries';
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

const SubjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [alertText, setAlertText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [addSubject] = useMutation(ADD_SUBJECT, {
    refetchQueries: [{ query: GET_SUBJECTS }],
  });

  const history = useHistory();
  const classes = useStyles();

  const handleAlert = (text) => {
    setAlertText(text);
    setAlertOpen(true);
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    const newSubject = { name, description };
    // console.log(newSubject);
    addSubject({ variables: { ...newSubject } });
    handleAlert(`${name} added as subject!`);
  };
  return (
    <>
      <AlertDialog
        alertText={alertText}
        setOpen={setAlertOpen}
        open={alertOpen}
        action={() => history.push('/')}
      />
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <form onSubmit={handleAddSubject}>
          <Grid item className={classes.boxStyle}>
            <TextField placeholder="Subject" value={name} onChange={({ target }) => setName(target.value)} />
          </Grid>
          <Grid item className={classes.boxStyle}>
            <TextField placeholder="Description" value={description} onChange={({ target }) => setDescription(target.value)} />
          </Grid>
          <Grid item className={classes.boxStyle}>
            <Button type="submit">Add subject</Button>
          </Grid>
          <Grid item>
            <Link variant="body2" component={RouterLink} to="/">Cancel</Link>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default SubjectForm;
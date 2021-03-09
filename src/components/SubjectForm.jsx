import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Grid, TextField, makeStyles, Link, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ADD_SUBJECT } from '../graphql/mutations';
import { CURRENT_USER, GET_SUBJECTS } from '../graphql/queries';
import AlertDialog from './Alert';
import AddLinkDialog from './AddLinkDialog';

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
    minWidth: 250,
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
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [linkDescription, setLinkDescription] = useState('');
  const [links, setLinks] = useState(null);
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
    let newSubject;
    let userID;
    if (userQuery.data) {
      try {
        userID = userQuery.data.me.id;
      } catch (e) {
        handleError(e.message);
      }
    }
    const { name, description } = values;
    if (links) {
      newSubject = {
        name, description, links, userID,
      };
    } else {
      newSubject = { name, description, userID };
    }

    try {
      await addSubject({ variables: { ...newSubject } });
      handleAlert(`${name} added as subject!`);
    } catch (error) {
      handleError(error.message);
    }
  };
  const handleAddLink = () => {
    const newLink = { url, description: linkDescription };
    setLinks(newLink);
    setAddLinkOpen(false);
    setUrl('');
    setLinkDescription('');
  };
  // console.log('links: ', links);
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
      <AddLinkDialog
        open={addLinkOpen}
        setOpen={setAddLinkOpen}
        url={url}
        subject={null}
        setUrl={setUrl}
        description={linkDescription}
        setDescription={setLinkDescription}
        handleAddLink={handleAddLink}
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
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item className={classes.boxStyle}>
            <TextField
              fullWidth
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
          {!links ? (
            <Grid item className={classes.boxStyle}>
              <Button id="addLink-button" variant="text" size="small" onClick={() => setAddLinkOpen(true)}>Add link (optional)</Button>
            </Grid>
          ) : (
            <>
              <Link
                href={links.url}
                target="_blank"
                rel="noopener"
                variant="body2"
                key={links.url}
              >
                {links.description}
              </Link>
              <IconButton onClick={() => setLinks(null)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </>
          )}

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

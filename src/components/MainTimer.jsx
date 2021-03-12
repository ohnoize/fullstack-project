import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Grid,
  Link,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useStopwatch } from 'react-timer-hook';
import { ADD_LINK, ADD_NOTE, ADD_SESSION } from '../graphql/mutations';
import { CURRENT_USER, GET_SESSIONS, GET_SUBJECTS } from '../graphql/queries';
import { timeParser, totalTime } from '../utils';
import AlertDialog from './Alert';
import ConfirmDialog from './Confirm';
import AddLinkDialog from './AddLinkDialog';
import GoalsDialog from './GoalsDialog';

// eslint-disable-next-line react/jsx-props-no-spreading
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

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
  divStyle: {
    marginTop: 50,
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
  centerScreen: {
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 100,
  },
}));

const secondsParser = ({
  days, hours, minutes, seconds,
}) => {
  let finalSeconds = seconds;
  if (minutes) {
    finalSeconds += (minutes * 60);
  }
  if (hours) {
    finalSeconds += (hours * 60 * 60);
  }
  if (days) {
    finalSeconds += (days * 24 * 60 * 60);
  }
  return finalSeconds;
};

const MainTimer = ({ token, practiceTime, setPracticeTime }) => {
  const {
    days, hours, minutes, seconds, start, pause, reset, isRunning,
  } = useStopwatch();
  const [nowPracticing, setNowPracticing] = useState('');
  const [subject, setSubject] = useState('');
  const [notes, setNotes] = useState('');
  const [subjectNote, setSubjectNote] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [goalsDialogOpen, setGoalsDialogOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const subjects = useQuery(GET_SUBJECTS);
  const currentUser = useQuery(CURRENT_USER);
  const [addSession] = useMutation(ADD_SESSION, {
    refetchQueries: [{ query: GET_SESSIONS }],
  });
  const [addLink] = useMutation(ADD_LINK, {
    refetchQueries: [{ query: GET_SUBJECTS }],
  });
  const [addNote] = useMutation(ADD_NOTE);

  const classes = useStyles();

  const handleDropDown = (event) => {
    const { value } = event.target;
    setSubject(value);
  };

  const handleNotes = (event) => {
    event.preventDefault();
    setNotes(event.target.value);
  };

  const handleStartNew = () => {
    if (!subject) {
      setAlertOpen(true);
      setAlertText('Pick a subject!');
      return;
    }
    if (isRunning) {
      setAlertOpen(true);
      setAlertText('Already practing!');
    }
    const fullSubject = subjects.data.allSubjects.find((s) => s.name === subject);
    setNowPracticing(fullSubject);
    start();
  };

  useEffect(() => {
    if (subjects && subjects.data && subjects.data.allSubjects) {
      const subjectData = subjects.data.allSubjects.find((s) => s.name === subject);
      setNowPracticing(subjectData);
    }
  }, [subjects.data]);

  const handleStopNew = (event) => {
    event.preventDefault();
    if (!isRunning) return;
    pause();
    const finalSeconds = secondsParser({
      days, hours, minutes, seconds,
    });
    if (Object.prototype.hasOwnProperty.call(practiceTime, subject)) {
      setPracticeTime((prevState) => ({
        ...prevState,
        [subject]: prevState[subject] + finalSeconds,
      }));
      reset();
      setSubject('');
    } else {
      setPracticeTime((prevState) => ({
        ...prevState,
        [subject]: finalSeconds,
      }));
      reset();
    }
  };

  // console.log(isRunning);
  // console.log('currentuser in timer:', currentUser);

  const handleFinishConfirm = () => {
    if (Object.keys(practiceTime).length === 0) {
      setAlertText('No time spent practicing yet');
      setAlertOpen(true);
    } else {
      setConfirmText('Do you really want to end your session?');
      setConfirmOpen(true);
    }
  };

  const handleFinish = () => {
    // console.log('Session over!');
    // console.log(Object.entries(practiceTime));
    setConfirmOpen(false);
    // console.log(date);
    const sessionInfo = {
      individualSubjects: Object.entries(practiceTime).map((a) => ({ name: a[0], length: a[1] })),
      totalLength: totalTime(practiceTime),
      userID: currentUser.data.me.id,
      notes,
    };
    addSession({ variables: { ...sessionInfo } });
    // console.log(sessionInfo);
    setPracticeTime({});
    setNotes('');
    setSubject('');
    setSnackbarText('Session saved!');
    setSnackbarOpen(true);
    // console.log(sessionInfo);
  };

  const addSubjectNote = (event) => {
    event.preventDefault();
    const entry = {
      id: currentUser.data.me.id,
      subjectNotes: {
        notes: subjectNote,
        subjectID: nowPracticing.id,
      },
    };
    addNote({ variables: { ...entry } });
  };

  if (subjects.loading || currentUser.loading) {
    return (
      <div className={classes.centerScreen}>
        <CircularProgress />
      </div>
    );
  }
  if (currentUser.data) {
    // console.log('User from query in maintimer', currentUser.data.me);
  }

  const handleError = (text) => {
    setAlertText(text);
    setAlertOpen(true);
  };

  const handleAddLink = () => {
    const newLink = {
      url,
      description,
      subjectID: nowPracticing.id,
    };
    try {
      addLink({ variables: { ...newLink } });
      // setTempLinks(tempLinks.concat(newLink));
      setAddLinkOpen(false);
      setSnackbarOpen(true);
      setSnackbarText('New link added!');
      setUrl('');
      setDescription('');
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleNoteChange = (e) => {
    e.preventDefault();
    setSubjectNote(e.target.value);
  };

  const startOnGoal = (goalSubject) => {
    setSubject(goalSubject);
    setGoalsDialogOpen(false);
    const fullSubject = subjects.data.allSubjects.find((s) => s.name === goalSubject);
    setNowPracticing(fullSubject);
    start();
  };

  return (
    <>
      <AlertDialog
        alertText={alertText}
        setOpen={setAlertOpen}
        open={alertOpen}
        title="Error"
        action={() => null}
      />
      {token
        ? (
          <GoalsDialog
            goals={currentUser.data.me.goals}
            open={goalsDialogOpen}
            setSubject={setSubject}
            setOpen={setGoalsDialogOpen}
            handleStart={startOnGoal}
          />
        )
        : null}
      <ConfirmDialog
        confirmText={confirmText}
        setOpen={setConfirmOpen}
        open={confirmOpen}
        action={handleFinish}
      />
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)}>
          {snackbarText}
        </Alert>
      </Snackbar>
      <AddLinkDialog
        setOpen={setAddLinkOpen}
        url={url}
        setUrl={setUrl}
        description={description}
        setDescription={setDescription}
        open={addLinkOpen}
        subject={nowPracticing}
        handleAddLink={handleAddLink}
      />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <div className={classes.divStyle}>
            <Typography variant="body1">Pick a subject to practice:</Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="subject-label">Choose one</InputLabel>
              <Select
                labelId="subject-label"
                id="subjectMenu"
                value={subject}
                onChange={handleDropDown}
              >
                {subjects.data.allSubjects
                  .map((s) => <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>)}
              </Select>
            </FormControl>
            <br />
            {token ? <Link variant="body2" component={RouterLink} to="/addsubject">Add subject</Link> : null}
            <Box className={classes.boxStyle}>
              <Button variant="outlined" onClick={handleStartNew}>Start</Button>
              <Button variant="outlined" onClick={handleStopNew}>Stop</Button>
            </Box>

            <Box className={classes.boxStyle}>
              <Typography variant="body1">Time spent:</Typography>
              {Object.entries(practiceTime).map(([key, value]) => (
                <Typography variant="body1" key={key}>
                  {key}
                  :
                  {' '}
                  {timeParser(value)}
                </Typography>
              ))}
              <Typography variant="body1">
                Total:
                {' '}
                {timeParser(totalTime(practiceTime))}
              </Typography>
            </Box>

            { token
              ? (
                <>
                  <Box className={classes.boxStyle}>
                    <TextField id="notes" value={notes} placeholder="Add notes (optional)" onChange={handleNotes} />
                  </Box>
                  <Box className={classes.boxStyle}>
                    <Button onClick={handleFinishConfirm}>Finish session</Button>
                  </Box>
                </>
              )
              : <Link variant="body2" component={RouterLink} to="/login">Log in to save sessions</Link>}
          </div>
        </Grid>
        <Grid item>
          { isRunning
            ? (
              <>
                <Typography variant="h5">
                  Now practicing
                  {' '}
                  {nowPracticing.name}
                  {' '}
                  {Number(minutes).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                  :
                  {Number(seconds).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                </Typography>
                <br />
                <Typography variant="subtitle1">
                  Description:
                  {' '}
                  {nowPracticing.description}
                </Typography>
                <br />
                <Typography variant="subtitle1">
                  Resources:
                </Typography>
                {nowPracticing.links.map((l) => (
                  <div key={l.url}>
                    <Link
                      href={l.url}
                      target="_blank"
                      rel="noopener"
                      variant="body2"
                      key={l.url}
                    >
                      {l.description}
                    </Link>
                  </div>
                ))}
                <br />
                {token ? <Button id="addLinkButton" variant="text" size="small" onClick={() => setAddLinkOpen(true)}>Add link</Button> : null}
                <br />
                <br />
                {token
                  ? (
                    <>
                      <Typography variant="body1">Personal notes on this subject:</Typography>
                      <br />
                      {currentUser.data.me.mySubjects
                        .filter((n) => n.subjectID === nowPracticing.id)
                        .map((n) => n.subjectNotes.map((m) => (
                          <Typography variant="body2" key={m.date}>
                            {new Date(m.date).toLocaleDateString()}
                            {' '}
                            {m.notes}
                          </Typography>
                        )))}
                      <br />
                      <TextField onChange={handleNoteChange} id="subjectNotes" placeholder="Add note" />
                      <Button id="addNoteButton" onClick={addSubjectNote}>Add note</Button>
                    </>
                  )
                  : null}
              </>
            )
            : (
              <>
                <Typography variant="h6">Pick a subject and click start!</Typography>
                <br />
                {token
                  ? <Button onClick={() => setGoalsDialogOpen(true)}>See your goals</Button>
                  : null}
              </>
            )}
        </Grid>
      </Grid>
    </>
  );
};

export default MainTimer;

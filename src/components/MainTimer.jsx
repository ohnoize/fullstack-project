import React, { useState } from 'react';
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
} from '@material-ui/core';
import { useStopwatch } from 'react-timer-hook';
import { ADD_NOTE, ADD_SESSION } from '../graphql/mutations';
import { CURRENT_USER, GET_SESSIONS, GET_SUBJECTS } from '../graphql/queries';
import { timeParser } from '../utils';
import AlertDialog from './Alert';
import ConfirmDialog from './Confirm';

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
  const subjects = useQuery(GET_SUBJECTS);
  const currentUser = useQuery(CURRENT_USER);
  // console.log(currentUser);
  // console.log(nowPracticing);
  const [addSession] = useMutation(ADD_SESSION, {
    refetchQueries: [{ query: GET_SESSIONS }],
  });
  const [addNote] = useMutation(ADD_NOTE, {
    update: (store, response) => {
      // const dataInStore = store.readQuery({ query: CURRENT_USER });
      // console.log(response.data.editUser);
      // console.log(dataInStore.me);
      store.writeQuery({
        query: CURRENT_USER,
        data: {
          me: response.data.editUser,
        },
      });
    },
  });

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
    const fullSubject = subjects.data.allSubjects.find((s) => s.name === subject);
    setNowPracticing(fullSubject);
    start();
  };

  const handleStopNew = (event) => {
    event.preventDefault();
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

  const totalTime = () => {
    if (Object.keys(practiceTime).length !== 0) {
      const time = Object.values(practiceTime).reduce((a, b) => a + b);
      return time;
    } return null;
  };
  // console.log(isRunning);
  // console.log('currentuser in timer:', currentUser);

  const handleFinishConfirm = () => {
    setConfirmText('Do you really want to end your session?');
    setConfirmOpen(true);
  };

  const handleFinish = () => {
    // console.log('Session over!');
    // console.log(Object.entries(practiceTime));
    setConfirmOpen(false);
    const date = new Date();
    // console.log(date);
    const sessionInfo = {
      date: date.toString(),
      individualSubjects: Object.entries(practiceTime).map((a) => ({ name: a[0], length: a[1] })),
      totalLength: totalTime(),
      userID: currentUser.data.me.id,
      notes,
    };
    addSession({ variables: { ...sessionInfo } });
    // console.log(sessionInfo);
    setPracticeTime({});
    setNotes('');
    // console.log(sessionInfo);
  };

  const addSubjectNote = () => {
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
      <div>Loading...</div>
    );
  }
  if (currentUser.data) {
    // console.log('User from query in maintimer', currentUser.data.me);
  }

  return (
    <>
      <AlertDialog
        alertText={alertText}
        setOpen={setAlertOpen}
        open={alertOpen}
        action={() => null}
      />
      <ConfirmDialog
        confirmText={confirmText}
        setOpen={setConfirmOpen}
        open={confirmOpen}
        action={handleFinish}
      />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>

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
          <Link variant="body2" component={RouterLink} to="/addsubject">Add subject</Link>
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
              {timeParser(totalTime())}
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
                <Typography variant="subtitle1">
                  Description:
                  {' '}
                  {nowPracticing.description}
                </Typography>
                <Typography variant="h6">Personal notes on this subject:</Typography>
                {currentUser.data.me.subjectNotes
                  .filter((n) => n.subjectID === nowPracticing.id)
                  .map((n) => (
                    <Typography variant="body2" key={n.date}>
                      {new Date(n.date).toLocaleDateString()}
                      :
                      {n.notes}
                    </Typography>
                  ))}
                <TextField onChange={(event) => setSubjectNote(event.target.value)} id="subjectNotes" placeholder="Add note" />
                <Button onClick={addSubjectNote}>Add note</Button>
              </>
            )
            : <Typography variant="h6">Pick a subject and click start!</Typography>}
        </Grid>
      </Grid>
    </>
  );
};

export default MainTimer;

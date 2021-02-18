import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client'
import { GET_SESSIONS, GET_SUBJECTS, GET_USERS } from '../graphql/queries'
import { ADD_SESSION } from '../graphql/mutations'
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Grid,
  Paper,
  Link
  } from '@material-ui/core';
import { useStopwatch } from 'react-timer-hook';
import { timeParser } from '../utils';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  mainContainer: {
    flexDirection: 'row'
  },
  header: {
    marginBottom: 20
  },
  boxStyle: {
    marginTop: 20,
    marginBottom: 20,
    padding: 5
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const secondsParser = ({ days, hours, minutes, seconds }) => {
  if (minutes) {
    seconds = seconds + (minutes * 60);
  }
  if (hours) {
    seconds = seconds + (hours * 60 * 60);
  }
  if (days) {
    seconds = seconds + (days * 24 * 60 * 60);
  }
  return seconds;
}


const MainTimer = ({ currentUser }) => {
  const { days, hours, minutes, seconds, start, pause, reset, isRunning } = useStopwatch()
  const [ nowPracticing, setNowPracticing ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ practiceTime, setPracticeTime ] = useState({});
  const [ notes, setNotes ] = useState('');



  const subjects = useQuery(GET_SUBJECTS)
  
  const [ addSession ] = useMutation(ADD_SESSION, {
    refetchQueries: [ { query: GET_SESSIONS } ]
  })
  
  const classes = useStyles();

  const handleDropDown = (event) => {
    const value = event.target.value;
    setSubject(value)
  };

  const handleNotes = (event) => {
    event.preventDefault();
    setNotes(event.target.value);
  }
  
  const handleStartNew = () => {
    if (!subject) {
      window.alert('Pick a subject!')
      return;
    }
    const fullSubject = subjects.data.allSubjects.find(s => s.name === subject)
    setNowPracticing(fullSubject);
    start();
  }

  const handleStopNew = (event) => {
    event.preventDefault()
    pause();
    const finalSeconds = secondsParser({ days, hours, minutes, seconds })
    if (practiceTime.hasOwnProperty(subject)) {
      setPracticeTime((prevState) => ({
        ...prevState,
        [subject]: prevState[subject] + finalSeconds
      }));
      reset();
      setSubject('');
    } else {
      setPracticeTime((prevState) => ({
        ...prevState,
        [subject]: finalSeconds
      }));
      reset();
    }
  }

  const totalTime = () => {
    if (Object.keys(practiceTime).length !== 0) {
      const time = Object.values(practiceTime).reduce((a, b) => a + b)
      return time;
    } else return null;
  }
  // console.log(isRunning);
  console.log('currentuser in timer:', currentUser);
  const handleFinish = () => {
    if (window.confirm('Do you really want to end the practice session?')) {
      console.log('Session over!');
      console.log(Object.entries(practiceTime))
      const date = new Date();
      console.log(date);
      const sessionInfo = {
        date: date.toString(),
        individualSubjects: Object.entries(practiceTime).map(a => ({name: a[0], length: a[1]})),
        totalLength: totalTime(),
        userID: currentUser.id,
        notes: notes
      }
      addSession({ variables: { ...sessionInfo } });
      console.log(sessionInfo);
      setPracticeTime({});
      setNotes('');
      console.log(sessionInfo);
    }
  }

  if (subjects.loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    

    <Grid 
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
      <Grid item>
              
        <Typography variant='body1'>Pick a subject to practice:</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id='subject-label'>Choose one</InputLabel>
          <Select 
            labelId='subject-label'
            id='subjectMenu'
            value={subject}
            onChange={handleDropDown}>
            {subjects.data.allSubjects.map(s => 
              <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <br />
        <Link variant='body2' component={RouterLink} to='/addsubject'>Add subject</Link>
        <Box className={classes.boxStyle}>
          <Button variant='outlined' onClick={handleStartNew}>Start</Button>
          <Button variant='outlined' onClick={handleStopNew}>Stop</Button>
        </Box>
        
        <Box className={classes.boxStyle}>
          <Typography variant='body1'>Time spent:</Typography>
          {Object.entries(practiceTime).map(([key, value]) => 
            <Typography variant='body1' key={key}>{key}: {timeParser(value)}</Typography>)}
          <Typography variant='body1'>Total: {timeParser(totalTime())}</Typography>
        </Box>
        <Box className={classes.boxStyle}>
        <TextField placeholder='Add notes (optional)' onChange={handleNotes} />
        </Box>
        <Box className={classes.boxStyle}>
        <Button onClick={handleFinish}>Finish session</Button>
        </Box>
      </Grid>
      <Grid item>
          { isRunning 
          ? <><Typography variant='h6'>Now practicing {nowPracticing.name} {Number(minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{Number(seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</Typography>
            <Typography variant='body2'>Description: {nowPracticing.description}</Typography></>
          : <Typography variant='h6'>Pick a subject and click start!</Typography>}
      </Grid>
      </Grid>
  );
};

export default MainTimer;
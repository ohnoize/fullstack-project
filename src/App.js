import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client'
import { GET_SUBJECTS, GET_USERS } from './graphql/queries'
import { ADD_SESSION } from './graphql/mutations'
import { makeStyles } from '@material-ui/core/styles';
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
  Paper
  } from '@material-ui/core';
import { useStopwatch } from 'react-timer-hook';
import axios from 'axios';


// const sessionsURL = 'http://localhost:3001/api/sessions';
// const subjectsURL = 'http://localhost:3001/api/subjects';

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


const App = () => {
  const { days, hours, minutes, seconds, start, pause, reset, isRunning } = useStopwatch()
  const [ nowPracticing, setNowPracticing ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ practiceTime, setPracticeTime ] = useState({});
  const [ sessions, setSessions ] = useState([]);
  // const [ subjects, setSubjects ] = useState([]);
  const [ notes, setNotes ] = useState('');

  const subjects = useQuery(GET_SUBJECTS)
  const users = useQuery(GET_USERS)

  const [ addSession ] = useMutation(ADD_SESSION)
  
  const classes = useStyles();

  // useEffect(() => {
  //   axios
  //     .get(sessionsURL)
  //     .then(res => setSessions(res.data))
  //   axios
  //     .get(subjectsURL)
  //     .then(res => setSubjects(res.data))
  // }, [])
  
  const handleDropDown = (event) => {
    setSubject(event.target.value)
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
    setNowPracticing(subject);
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
  console.log(isRunning);

  const handleFinish = () => {
    if (window.confirm('Do you really want to end the practice session?')) {
      console.log('Session over!');
      console.log(Object.entries(practiceTime))
      const sessionInfo = {
        individualSubjects: Object.entries(practiceTime).map(a => ({name: a[0], length: a[1]})),
        totalLength: totalTime(),
        userID: 1,
        notes: notes
      }
      addSession({ variables: { ...sessionInfo } });
      setPracticeTime({});
      setNotes('');
      console.log(sessionInfo);
      // axios.post(sessionsURL, sessionInfo);
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
        <Typography variant='h2' className={classes.header}>Practice clock</Typography>       
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
        <Box className={classes.boxStyle}>
          <Button variant='outlined' onClick={handleStartNew}>Start</Button>
          <Button variant='outlined' onClick={handleStopNew}>Stop</Button>
        </Box>
        
        <Box className={classes.boxStyle}>
          <Typography variant='body1'>Time spent:</Typography>
          {Object.entries(practiceTime).map(([key, value]) => 
            <Typography variant='body1' key={key}>{key}: {new Date(value * 1000).toISOString().substr(11, 8)}</Typography>)}
          <Typography variant='body1'>Total: {new Date(totalTime() * 1000).toISOString().substr(11, 8)}</Typography>
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
          ? <Typography variant='h6'>Now practicing {nowPracticing} {Number(minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{Number(seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</Typography> 
          : <Typography variant='h6'>Pick a subject and click start!</Typography>}
      </Grid>
      </Grid>
  );
};

export default App;
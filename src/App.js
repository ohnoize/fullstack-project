import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useStopwatch } from 'react-timer-hook';
import axios from 'axios';

const sessionsURL = 'http://localhost:3001/api/sessions';
const subjectsURL = 'http://localhost:3001/api/subjects';

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
  const [ fieldVisible, setFieldVisible ] = useState(false);
  const [ sessions, setSessions ] = useState([]);
  const [ subjects, setSubjects ] = useState([]);
  const [ notes, setNotes ] = useState('');

  useEffect(() => {
    axios
      .get(sessionsURL)
      .then(res => setSessions(res.data))
    axios
      .get(subjectsURL)
      .then(res => setSubjects(res.data))
  }, [])
  
  const handleDropDown = (event) => {
    event.preventDefault;
    if (event.target.value === 'other') {
      setFieldVisible(true)
    } else {
      setFieldVisible(false)
      setSubject(event.target.value)
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSubject(event.target.value);
  }

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
      setFieldVisible(false);
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
      const sessionInfo = {
        individualSubjects: {
          ...practiceTime,
        },
        totalLength: totalTime(),
        user: 'olli',
        notes: notes
      }
      setPracticeTime({
        chords: 0,
        scales: 0
      })
      setNotes('')
      console.log(sessionInfo);
      axios.post(sessionsURL, sessionInfo);
    }
  }

  return (
    <Container>
    <div>
    <Typography>
      <h1>Practice clock</h1>
      { isRunning 
        ? <p>Now practicing {nowPracticing} {Number(minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{Number(seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</p> 
        : null}

      <p>Pick a subject to practice:</p>
      <select onChange={handleDropDown}>
        <option value=''>Choose one</option>
        {subjects.map(s => 
          <option key={s.id} value={s.name}>{s.name}</option>
        )}
      </select>
      { fieldVisible
          ? <input placeholder='What?' name='subject' onChange={handleChange} />
          : null
      }
      
      <p><button onClick={handleStartNew}>Start</button>
      <button onClick={handleStopNew}>Stop</button></p>
      
      <p><b>Time spent:</b></p>
      {Object.entries(practiceTime).map(([key, value]) => 
        <p key={key}>{key}: {new Date(value * 1000).toISOString().substr(11, 8)}</p>)}
      <p>Total: {new Date(totalTime() * 1000).toISOString().substr(11, 8)}</p>
      <p><input value={notes} placeholder='Add notes (optional)' onChange={handleNotes} /></p>
      <p><button onClick={handleFinish}>Finish session</button></p>
      </Typography>
    </div>
    </Container>
  );
};

export default App;
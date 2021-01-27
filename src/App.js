import React, { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook'

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
  const [ practiceTime, setPracticeTime ] = useState({
    chords: 0,
    scales: 0
  });
  const handleStart = (subject) => {
    setNowPracticing(subject);
    start();
  }
  console.log(nowPracticing);

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSubject(event.target.value);
  }
  const handleStopChords = () => {
    pause();
    const finalSeconds = secondsParser({ days, hours, minutes, seconds })
    setPracticeTime((prevState) => ({
      ...prevState,
      chords: prevState.chords + finalSeconds 
    }));
    reset();
  }
  const handleStopScales = () => {
    pause();
    const finalSeconds = secondsParser({ days, hours, minutes, seconds })
    setPracticeTime((prevState) => ({
      ...prevState,
      scales: prevState.scales + finalSeconds 
    }));
    reset();
  }

  const handleStartNew = () => {
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
    } else {
      setPracticeTime((prevState) => ({
        ...prevState,
        [subject]: finalSeconds
      }));
      reset();
    }
  }

  const totalTime = () => {
    const time = Object.values(practiceTime).reduce((a, b) => a + b)
    const formattedTime = new Date(time * 1000).toISOString().substr(11, 8)
    return formattedTime;
  }
  console.log(isRunning);
  return (
    <div>
      <p>Practice clock</p>
      { isRunning 
        ? <p>Now practicing {nowPracticing} {Number(minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{Number(seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</p> 
        : null}
        
      <p>Practice chords: <button onClick={() => handleStart('chords')}>Start</button>
      <button onClick={handleStopChords}>Stop</button></p>
      <p>Practice scales: <button onClick={() => handleStart('scales')}>Start</button>
      <button onClick={handleStopScales}>Stop</button></p>
      
        <p>Practice something else: <input placeholder='What?' name='subject' onChange={handleChange} />
        <button onClick={handleStartNew}>Start</button>
        <button onClick={handleStopNew}>Stop</button></p>
      
      <p>Time spent:</p>
      {Object.entries(practiceTime).map(([key, value]) => 
        <p key={key}>{key}: {new Date(value * 1000).toISOString().substr(11, 8)}</p>)}
      <p>Total time: {totalTime()}</p>
    </div>
  );
};

export default App;
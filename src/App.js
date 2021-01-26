import React, { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook'
const ms = require('pretty-ms');


const App = () => {
  const { seconds, minutes, start, pause, reset } = useStopwatch()
  const [ practiceTime, setPracticeTime ] = useState({
    chords: 0,
    scales: 0
  });
  const handleStart = () => {
    start();
  }
  const handleStopChords = () => {
    pause();
    setPracticeTime((prevState) => ({
      ...prevState,
      chords: prevState.chords + seconds 
    }));
    reset();
  }
  const handleStopScales = () => {
    pause();
    setPracticeTime((prevState) => ({
      ...prevState,
      scales: prevState.scales + seconds 
    }));
    reset();
  }
  
  return (
    <div>
      <p>Practice clock</p>
      <p>{minutes}:{seconds}</p>  
      <p>Practice chords: <button onClick={handleStart}>Start</button>
      <button onClick={handleStopChords}>Stop</button></p>
      <p>Practice scales: <button onClick={handleStart}>Start</button>
      <button onClick={handleStopScales}>Stop</button></p>
      <p>Total time spent:</p>
      {Object.entries(practiceTime).map(([key, value]) => <p key={key}>{key}: {value}</p>)}
    </div>
  );
};

export default App;
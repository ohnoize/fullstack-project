import React, { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook'
const ms = require('pretty-ms');


const App = () => {
  const { seconds, minutes, start, pause, reset } = useStopwatch()
  const [ chordsTime, setChordsTime ] = useState(0);
  const [ scalesTime, setScalesTime ] = useState(0);
  const handleStart = () => {
    start();
  }
  const handleStopChords = () => {
    pause();
    setChordsTime(chordsTime + seconds);
    reset();
  }
  const handleStopScales = () => {
    pause();
    setScalesTime(scalesTime + seconds);
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
      <p>Total time spent on chords: {chordsTime} seconds</p>
      <p>Total time spent on scales: {scalesTime} seconds</p>
    </div>
  );
};

export default App;
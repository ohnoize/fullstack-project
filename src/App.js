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
  const { days, hours, minutes, seconds, start, pause, reset } = useStopwatch()
  const [ practiceTime, setPracticeTime ] = useState({
    chords: 0,
    scales: 0
  });
  const handleStart = () => {
    start();
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

  const handleStopNew = () => {
    pause();
    const finalSeconds = secondsParser({ days, hours, minutes, seconds })
    setPracticeTime((prevState) => ({
      ...prevState,
      newSubject: finalSeconds
    }));
    reset();
  }

  const totalTime = () => {
    const time = Object.values(practiceTime).reduce((a, b) => a + b)
    const formattedTime = new Date(time * 1000).toISOString().substr(11, 8)
    return formattedTime;
  }
  
  return (
    <div>
      <p>Practice clock</p>
      <p>{Number(minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{Number(seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</p>  
      <p>Practice chords: <button onClick={handleStart}>Start</button>
      <button onClick={handleStopChords}>Stop</button></p>
      <p>Practice scales: <button onClick={handleStart}>Start</button>
      <button onClick={handleStopScales}>Stop</button></p>
      <p>Practice newSubject: <button onClick={handleStart}>Start</button>
      <button onClick={handleStopNew}>Stop</button></p>
      <p>Time spent:</p>
      {Object.entries(practiceTime).map(([key, value]) => 
        <p key={key}>{key}: {new Date(value * 1000).toISOString().substr(11, 8)}</p>)}
      <p>Total time: {totalTime()}</p>
    </div>
  );
};

export default App;
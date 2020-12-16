import React, { useState, useEffect, useRef } from 'react';

const CountDown = () => {
  console.log('CountDown Running');

  const [runningTime, setRunningTime] = useState(1 * 60); // User Inputted start
  const [timeString, setTimeString] = useState('');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timeRef = useRef();

  const runTimer = () => {
    timeRef.current =
      runningTime > 0 &&
      setTimeout(() => {
        // Calculating minutes & seconds
        const minutes = Math.floor(runningTime / 60);
        const seconds = runningTime % 60;
        // Updating timeString based on current minutes
        if (seconds < 10) {
          console.log(seconds);
          setTimeString(`${minutes}:0${seconds}`);
        } else {
          setTimeString(`${minutes}:${seconds}`);
        }
        // Setting current run time in state
        setRunningTime(runningTime - 1);
      }, 1000);

    if (runningTime < 1) {
      setTimeString(`00:00`);
    }
  };

  const pauseTimer = () => {
    if (runningTime > 0) clearTimeout(timeRef.current);
  };

  const resumeTimer = () => {
    runTimer();
  };

  useEffect(() => {
    // Run timer when button is clicked
    if (setIsTimerActive) runTimer();

    return () => {
      clearTimeout(timeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runningTime, isTimerActive]);

  return (
    <section>
      <h1>{timeString}</h1>
      <button type="button" onClick={() => setIsTimerActive(true)}>
        Start
      </button>
      <button type="button" onClick={pauseTimer}>
        Pause
      </button>
      <button type="button" onClick={resumeTimer}>
        Resume
      </button>
    </section>
  );
};

export default CountDown;

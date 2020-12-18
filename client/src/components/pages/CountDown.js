import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Imported Components
import Button from '../Buttons/Button';

// Styled Components
const Container = styled.section`
  padding: 8px 0 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimeString = styled.h1`
  font-size: 49px;
  margin: 16px 0 32px 0;
  color: white;
`;

const ButtonContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const CountDown = () => {
  const [runningTime, setRunningTime] = useState(20 * 60); // User Inputted start
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
    <Container>
      <TimeString>{timeString || '00:00'}</TimeString>
      <ButtonContainer>
        <Button text="Start" action={() => setIsTimerActive(true)} />
        <Button text="Pause" action={pauseTimer} />
        <Button text="Resume" action={resumeTimer} />
      </ButtonContainer>
    </Container>
  );
};

export default CountDown;

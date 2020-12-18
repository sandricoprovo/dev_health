import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Imported Components
import TimeString from '../TimeString';
import ButtonSmall from '../Buttons/ButtonSmall';

// Styled Components
const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Timer = ({ breakLength, sessionLength }) => {
  const [isSession, setIsSession] = useState(true);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(sessionLength * 60);
  const [timerString, setTimerString] = useState(`${sessionLength}:00`);
  const timerTimeoutRef = useRef();

  const startTimer = () => {
    timerTimeoutRef.current =
      timerSeconds >= 0 &&
      setTimeout(() => {
        // TODO: refactor minutes & seconds to account for being less than 10. Maybe switch statement or one liner if statements
        // Calculating minutes & seconds
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        // Conditionally adding appropriate formatting to seconds
        if (timerSeconds <= 0) {
          setTimerString(`00:00`);
          // TODO: session has stopped so run break timer code
          console.log('Session ended');
        } else if (seconds < 10) {
          setTimerString(`${minutes}:0${seconds}`);
        } else {
          setTimerString(`${minutes}:${seconds}`);
        }
        // Setting current run time in state
        setTimerSeconds(timerSeconds - 1);
      }, 1000);
  };

  const pauseTimer = () => {
    if (timerSeconds > 0) clearTimeout(timerTimeoutRef.current);
  };

  const resumeTimer = () => {
    startTimer();
  };

  useEffect(() => {
    // Run timer when button is clicked
    if (isTimerActive && isSession) {
      startTimer();
    } else {
      setTimerSeconds(sessionLength * 60);
      setTimerString(`${sessionLength}:00`);
    }

    return () => {
      clearTimeout(timerTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLength, timerSeconds, isTimerActive]);

  return (
    <Container>
      <p style={{ color: 'white', margin: 'none' }}>
        {isSession === true ? 'Session' : 'Break'}
      </p>
      <TimeString text={timerString} />
      <div
        style={{
          border: '2px solid grey',
          borderRadius: '5px',
          width: '141px',
        }}
      >
        {!isTimerActive ? (
          <ButtonSmall text="Start" action={() => setIsTimerActive(true)} />
        ) : (
          <>
            <ButtonSmall text="Pause" action={pauseTimer} />
            <ButtonSmall text="Resume" action={resumeTimer} />
          </>
        )}
      </div>
    </Container>
  );
};

Timer.propTypes = {
  breakLength: PropTypes.number,
  sessionLength: PropTypes.number,
};

export default Timer;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Imported Components
import BreakInterval from '../Pomodoro/BreakInterval';
import SessionLength from '../Pomodoro/SessionLength';
import Timer from '../Pomodoro/Timer';

// Styled Elements
const Container = styled.section`
  padding: 16px;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const IntervalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Pomodoro = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const increaseSessionLength = () => {
    console.log('Adding..');
    // Bounds check
    if (sessionLength === 40) return;
    // Incrementing interval by 1
    setSessionLength(sessionLength + 1);
  };

  const decreaseSessionLength = () => {
    // Bounds check
    if (sessionLength === 1) return;
    // Decreasing interval by 1
    setSessionLength(sessionLength - 1);
  };

  return (
    <Container>
      <Timer breakLength={breakLength} sessionLength={sessionLength} />
      <IntervalContainer>
        <SessionLength
          sessionLength={sessionLength}
          increment={increaseSessionLength}
          decrement={decreaseSessionLength}
        />
        <BreakInterval
          breakInterval={breakLength}
          updateBreakLength={setBreakLength}
        />
      </IntervalContainer>
    </Container>
  );
};

export default Pomodoro;

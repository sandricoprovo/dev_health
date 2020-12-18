import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Imported Components
import ActionsContainer from '../ActionsContainer';
import Button from '../Buttons/Button';

const SessionLength = ({ sessionLength, increment, decrement }) => {
  const [timeLength, setTimeLength] = useState(sessionLength);

  useEffect(() => {
    setTimeLength(sessionLength);
  }, [sessionLength]);

  return (
    <ActionsContainer>
      <Button text="Down" action={() => decrement()} />
      <span style={{ color: 'white' }}>{timeLength}</span>
      <Button text="Up" action={() => increment()} />
    </ActionsContainer>
  );
};

SessionLength.propTypes = {
  sessionLength: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
};

export default SessionLength;

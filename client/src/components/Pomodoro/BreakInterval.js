import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Imported Components
import ActionsContainer from '../ActionsContainer';
import Button from '../Buttons/Button';

const BreakInterval = ({ breakInterval, updateBreakLength }) => {
  const increaseLength = () => {
    // Bounds check
    if (breakInterval === 8) return;
    // Incrementing interval by 1
    const incrementedBreakLength = breakInterval + 1;
    updateBreakLength(incrementedBreakLength);
  };

  const decreaseLength = () => {
    // Bounds check
    if (breakInterval === 1) return;
    // Decreasing interval by 1
    const decrementedBreakLength = breakInterval - 1;
    updateBreakLength(decrementedBreakLength);
  };

  return (
    <ActionsContainer>
      <Button text="Down" action={decreaseLength} />
      <span style={{ color: 'white' }}>{breakInterval}</span>
      <Button text="Up" action={increaseLength} />
    </ActionsContainer>
  );
};

BreakInterval.propTypes = {
  breakInterval: PropTypes.number,
  updateBreakLength: PropTypes.func,
};

export default BreakInterval;

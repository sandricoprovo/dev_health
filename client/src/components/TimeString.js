import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled elements
const StyledString = styled.h1`
  font-size: 49px;
  margin: 16px 0 32px 0;
  color: white;
`;

const TimeString = ({ text }) => <StyledString>{text}</StyledString>;

TimeString.propTypes = {
  text: PropTypes.string,
};

export default TimeString;

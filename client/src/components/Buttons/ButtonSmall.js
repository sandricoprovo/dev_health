import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled Elements
const ButtonElement = styled.button`
  padding: 8px 12px;
  margin: 0;
  background-color: #1f1f1f;
  border: none;
  border-radius: 5px;
  color: white;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #313131;
  }
`;

const ButtonSmall = ({ text, action }) => (
  <ButtonElement type="button" onClick={action}>
    {text}
  </ButtonElement>
);

ButtonSmall.propTypes = {
  text: PropTypes.string,
  action: PropTypes.func,
};

export default ButtonSmall;

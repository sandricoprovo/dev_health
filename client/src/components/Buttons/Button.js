import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled Elements
const ButtonElement = styled.button`
  padding: 12px 32px;
  margin: 0 8px;
  border: none;
  border-radius: 5px;
`;

const Button = ({ text, action }) => (
  <ButtonElement type="button" onClick={action}>
    {text}
  </ButtonElement>
);

Button.propTypes = {
  text: PropTypes.string,
  action: PropTypes.func,
};

export default Button;

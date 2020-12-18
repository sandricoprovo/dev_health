import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled Elements
const Container = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionsContainer = ({ children }) => <Container>{children}</Container>;

ActionsContainer.propTypes = {
  children: PropTypes.any,
};

export default ActionsContainer;

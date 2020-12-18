import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled Elements
const Container = styled.header`
  padding: 16px 0 16px 0;
`;

const NavLinks = styled.ul`
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NavLink = styled.li`
  color: white;
`;

const Header = () => (
  <Container>
    <nav>
      <NavLinks>
        <Link
          to="/countdown"
          style={{ textDecoration: 'none', listStyle: 'none' }}
        >
          <NavLink>CountDown</NavLink>
        </Link>
        <Link to="/" style={{ textDecoration: 'none', listStyle: 'none' }}>
          <NavLink>Home</NavLink>
        </Link>
        <Link
          to="/pomodoro"
          style={{ textDecoration: 'none', listStyle: 'none' }}
        >
          <NavLink>Pomodoro</NavLink>
        </Link>
      </NavLinks>
    </nav>
  </Container>
);

export default Header;

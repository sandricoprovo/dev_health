import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = () => (
  <header>
    <nav>
      <ul>
        <Link to="/countdown">
          <li>CountDown</li>
        </Link>
        <Link to="/pomodoro">
          <li>Pomodoro</li>
        </Link>
      </ul>
    </nav>
  </header>
);

export default Header;

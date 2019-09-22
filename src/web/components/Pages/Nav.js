import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({ auth }) => {
  const {
    isAuthenticated, login, logout, userHasScopes,
  } = auth;
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Kevin</Link>
        </li>
        <li>
          <Link to="/resume">Resume</Link>
        </li>
        { isAuthenticated() && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        <li>
          <Link to="/public">Public</Link>
        </li>
        { isAuthenticated() && (
          <li>
            <Link to="/private">Private</Link>
          </li>
        )}
        { isAuthenticated() && userHasScopes(['read:courses']) && (
          <li>
            <Link to="/courses">Courses</Link>
          </li>
        )}
        <li>
          <button type="submit" onClick={isAuthenticated() ? logout : login}>
            {isAuthenticated() ? 'Log Out' : 'Log In'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    userHasScopes: PropTypes.func.isRequired,
  }).isRequired,
};

export default Nav;

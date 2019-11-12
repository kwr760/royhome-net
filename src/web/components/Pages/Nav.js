import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Auth/AuthContext';

const Nav = () => (
  <AuthContext.Consumer>
    { ({
      isAuthenticated, login, logout, userHasRole,
    }) => (
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
          { isAuthenticated() && (
          <li>
            <Link to="/private">Private</Link>
          </li>
          )}
          { isAuthenticated() && userHasRole('engineer') && (
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
    )}
  </AuthContext.Consumer>
);

export default Nav;

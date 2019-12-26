import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Auth/AuthContext';

const Nav = () => {
  const {
    isAuthenticated, login, logout, userHasRole,
  } = useContext(AuthContext);
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
  );
};

export default Nav;

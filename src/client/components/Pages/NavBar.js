import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Context from '../Context';

const NavBar = () => {
  const {
    isAuthenticated, login, logout, userHasRole,
  } = useContext(Context);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Kevin</Link>
        </li>
        <li>
          <Link to="/resume">
            <FontAwesomeIcon icon="link" className="mr-3" />
            Resume
          </Link>
        </li>
        { isAuthenticated() && (
          <li>
            <Link to="/profile">
              <FontAwesomeIcon icon="user" className="mr-3" />
              Profile
            </Link>
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
            <FontAwesomeIcon icon="power-off" className="mr-3" />
            {isAuthenticated() ? 'Log Out' : 'Log In'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

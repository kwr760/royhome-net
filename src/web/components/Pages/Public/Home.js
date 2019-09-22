import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ auth }) => {
  const {
    isAuthenticated,
    login,
  } = auth;

  return (
    <div>
      <h1>This is the home page of Kevin Roy</h1>
      {isAuthenticated() ? (
        <Link to="/profile">View profile</Link>
      ) : (
        <button type="submit" onClick={login}>Login</button>
      )}
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;

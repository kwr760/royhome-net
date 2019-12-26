import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthContext from '../../Auth/AuthContext';

const Home = ({ location }) => {
  const { isAuthenticated, login, handleAuthentication } = useContext(AuthContext);

  useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      handleAuthentication();
    }
  }, [handleAuthentication, location.hash]);

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
  location: PropTypes.shape({
    hash: PropTypes.string,
  }).isRequired,
};

export default Home;

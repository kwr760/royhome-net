import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth0 } from '../../../util/auth0/context';

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>This is the home page of Kevin Roy</h1>
      {isAuthenticated ? (
        <Link to="/profile">View profile</Link>
      ) : (
        <button type="submit" onClick={() => loginWithRedirect()}>Log in</button>
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

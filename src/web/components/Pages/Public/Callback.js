import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Callback = ({ auth, location }) => {
  useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    } else {
      throw new Error('Invalid callback URL.');
    }
  }, [auth, location.hash]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

Callback.propTypes = {
  auth: PropTypes.shape({
    handleAuthentication: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
  }).isRequired,
};

export default Callback;

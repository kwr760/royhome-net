import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import env from '../../../../config';

const Private = ({ auth }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = `${env.url}/api/private`;
    const accessToken = auth.getAccessToken();
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not good.');
      })
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => setMessage(error.message));
  }, [auth]);

  return <p>{ message }</p>;
};

Private.propTypes = {
  auth: PropTypes.shape({
    getAccessToken: PropTypes.func.isRequired,
  }).isRequired,
};

export default Private;

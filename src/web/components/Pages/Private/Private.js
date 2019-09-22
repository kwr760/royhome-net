import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Private = ({ auth }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:7001/private', {
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
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
  });

  return <p>{ message }</p>;
};

Private.propTypes = {
  auth: PropTypes.shape({
    getAccessToken: PropTypes.func.isRequired,
  }).isRequired,
};

export default Private;

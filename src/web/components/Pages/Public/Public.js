import React, { useState, useEffect } from 'react';
import env from '../../../../config';

const Public = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = `${env.url}/api/public`;
    fetch(url)
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
  }, []);

  return <p>{ message }</p>;
};

Public.propTypes = {
};

export default Public;

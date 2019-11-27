import React, { useState, useEffect, useContext } from 'react';
import env from '../../../../config';
import AuthContext from '../../Auth/AuthContext';

const Private = () => {
  const { getAccessToken } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = `${env.host}/api/private`;
    const init = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    fetch(url, init)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not good.');
      })
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, [getAccessToken]);

  return <p>{ message }</p>;
};

Private.propTypes = {
};

export default Private;

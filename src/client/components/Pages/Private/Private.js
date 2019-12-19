import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import env from '../../../../config';
import AuthContext from '../../Auth/AuthContext';

const Private = () => {
  const { getAccessToken } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = `${env.host}/api/private`;
    const options = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    axios.get(url, options)
      .then((res) => {
        setMessage(res.data.message);
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

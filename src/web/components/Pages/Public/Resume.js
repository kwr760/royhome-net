import React, { useState, useEffect } from 'react';
import env from '../../../../config';

const Resume = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = `${env.url}/api/resume`;
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
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  return <p>{ message }</p>;
};

Resume.propTypes = {
};

export default Resume;

import React, { useState, useEffect } from 'react';

const Resume = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/resume')
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

Resume.propTypes = {
};

export default Resume;

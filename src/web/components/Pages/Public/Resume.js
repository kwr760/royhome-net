import React, { useState, useEffect } from 'react';
import env from '../../../../config';

const Resume = () => {
  const useResume = () => {
    const [value, setValue] = useState('');

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
          setValue(response.message);
        })
        .catch((error) => {
          setValue(error.message);
        });
    }, []);

    return [value, setValue];
  };

  const [message] = useResume();
  return <p>{ message }</p>;
};

export default Resume;

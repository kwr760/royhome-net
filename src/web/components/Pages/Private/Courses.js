import React, { useState, useEffect, useContext } from 'react';

import env from '../../../../config';
import Logger from '../../../logger';
import AuthContext from '../../Auth/AuthContext';

const Courses = () => {
  const { getAccessToken } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = `${env.host}/api/courses`;
    const init = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    fetch(url, init)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not good.');
      })
      .then((response) => {
        setCourses(response.courses);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, [getAccessToken]);

  useEffect(() => {
    const url = `${env.host}/api/admin`;
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
        Logger.log(response);
      })
      .catch((error) => {
        Logger.error(error.message);
        setMessage(error.message);
      });
  }, [getAccessToken]);

  if (message) {
    return (
      <div>{ message }</div>
    );
  }

  return (
    <ul>
      { courses.map((course) => <li key={course.id}>{course.title}</li>) }
    </ul>
  );
};

Courses.propTypes = {
};

export default Courses;

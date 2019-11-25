import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Logger from '../../../logger';
import env from '../../../../config';

const Courses = ({ auth }) => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = `${env.host}/api/courses`;
    const init = {
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
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
  }, [auth]);

  useEffect(() => {
    const url = `${env.host}/api/admin`;
    const init = {
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
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
  }, [auth]);

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
  auth: PropTypes.shape({
    getAccessToken: PropTypes.func.isRequired,
  }).isRequired,
};

export default Courses;

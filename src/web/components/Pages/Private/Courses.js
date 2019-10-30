import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import env from '../../../../config';

const Courses = ({ auth }) => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = `${env.url}/api/courses`;
    fetch(url, {
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
        setCourses(response.courses);
      })
      .catch((error) => setMessage(error.message));
  }, [auth]);

  useEffect(() => {
    const url = `${env.url}/api/admin`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
      },
    })
    // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => setMessage(error.message));
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

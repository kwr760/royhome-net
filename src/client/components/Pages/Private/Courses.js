import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import env from '../../../../config';
import Logger from '../../../logger';
import Context from '../../Context';

const Courses = () => {
  const { getAccessToken } = useContext(Context);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = `${env.host}/api/courses`;
    const options = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    axios.get(url, options)
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, [getAccessToken]);

  useEffect(() => {
    const url = `${env.host}/api/admin`;
    const options = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    axios.get(url, options)
      .then((res) => {
        Logger.log(res.data);
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

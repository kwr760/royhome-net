// @flow

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';

import env from '../../../config';
import { useAuth0 } from '../../../util/auth0/context';

const Courses = () => {
  const { getToken } = useAuth0();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const callCoursesApi = async (cbCourses, cbMessage) => {
      const token = await getToken();
      const url = `${env.host}/api/courses`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.get(url, options)
        .then((res) => {
          cbCourses(res.data.courses);
        })
        .catch((error) => {
          cbMessage(error.message);
        });
    };
    if (isEmpty(courses)) {
      callCoursesApi(setCourses, setMessage);
    }
  }, [courses, getToken]);

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

export default Courses;

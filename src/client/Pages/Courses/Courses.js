// @flow

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { get, isEmpty } from 'lodash';
import { OK } from 'http-status-codes';

import env from '../../../config';
import { useAuth0 } from '../../../util/auth0/context';
import type { ContextType, AppPropsType } from '../../types';

const getInitialData = (context: ContextType) => {
  const status = get(context, 'data.courses.status', undefined);
  if (status === OK) {
    const courses = get(context, ['data', 'courses', 'body'], { courses: [] });
    return courses;
  }
  return { courses: [] };
};

const Courses = ({ context = {} }: AppPropsType) => {
  const { getToken } = useAuth0();
  const initialData = getInitialData(context);
  const [courses, setCourses] = useState(initialData.courses);
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

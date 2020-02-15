import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { OK } from 'http-status-codes';

import env from '../../../../config';
import { useAuth0 } from '../../../../util/auth0/context';

const getInitialData = (context) => {
  const status = get(context, 'data.courses.status', undefined);
  if (status === OK) {
    const courses = get(context, ['data', 'courses', 'body'], { courses: [] });
    return courses;
  }
  return { courses: [] };
};

const Courses = ({ context }) => {
  const { getTokenSilently } = useAuth0();
  const initialData = getInitialData(context);
  const [courses, setCourses] = useState(initialData.courses);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const callCoursesApi = async (cbCourses, cbMessage) => {
      const token = await getTokenSilently();
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
  }, [courses, getTokenSilently]);

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
  context: PropTypes.shape({
    data: PropTypes.shape(),
  }),
};

Courses.defaultProps = {
  context: {},
};

export default Courses;

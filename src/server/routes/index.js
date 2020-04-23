// @flow

import getResumeHandler from '../handler/staticresume/get';
import getCoursesHandler from '../handler/courses/get';
import putLogHandler from '../handler/log/put';

const routes = [
  {
    method: 'get',
    path: '/staticresume',
    handler: getResumeHandler,
  },
  {
    method: 'get',
    path: '/courses',
    handler: getCoursesHandler,
    authenticate: true,
    role: 'engineer',
    fetchData: {
      courses: getCoursesHandler,
    },
  },
  {
    method: 'put',
    path: '/log',
    handler: putLogHandler,
  },
];


export default routes;

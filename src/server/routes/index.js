// @flow

import getStaticResumeHandler from '../handler/staticresume/get';
import getResumeHandler from '../handler/resume/get-resume';
import putLogHandler from '../handler/log/put-log';

const routes = [
  {
    method: 'get',
    path: '/staticresume',
    handler: getStaticResumeHandler,
  },
  {
    method: 'get',
    path: '/resume/:email',
    handler: getResumeHandler,
    authenticate: true,
    role: 'engineer',
    fetchData: {
      resume: getResumeHandler,
    },
  },
  {
    method: 'put',
    path: '/log',
    handler: putLogHandler,
  },
];


export default routes;

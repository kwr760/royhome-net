// @flow

import getStaticResumeHandler from '../handler/staticresume/get';
import getResumeHandler from '../handler/resume/get';
import putLogHandler from '../handler/log/put';

const routes = [
  {
    method: 'get',
    path: '/staticresume',
    handler: getStaticResumeHandler,
  },
  {
    method: 'get',
    path: '/resume',
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

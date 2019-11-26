import getResumeHandler from './resume/get';
import getPrivateHandler from './private/get';
import getCoursesHandler from './courses/get';
import getAdminHandler from './admin/get';
import putLogHandler from './log/put';

const routes = [
  {
    method: 'get',
    path: '/resume',
    handler: getResumeHandler,
  },
  {
    method: 'get',
    path: '/private',
    handler: getPrivateHandler,
    authenticate: true,
  },
  {
    method: 'get',
    path: '/courses',
    handler: getCoursesHandler,
    authenticate: true,
    role: 'engineer',
  },
  {
    method: 'get',
    path: '/admin',
    handler: getAdminHandler,
    authenticate: true,
    role: 'admin',
  },
  {
    method: 'put',
    path: '/log',
    handler: putLogHandler,
  },
];


export default routes;
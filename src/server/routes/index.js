import getResumeHandler from '../handler/resume/get';
import getPrivateHandler from '../handler/private/get';
import getCoursesHandler from '../handler/courses/get';
import getAdminHandler from '../handler/admin/get';
import putLogHandler from '../handler/log/put';

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
    fetchData: {
      private: getPrivateHandler,
    },
  },
  {
    method: 'get',
    path: '/courses',
    handler: getCoursesHandler,
    authenticate: true,
    role: 'engineer',
    fetchData: {
      courses: getCoursesHandler,
      admin: getAdminHandler,
    },
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

import getResumeHandler from '../handler/resume/get-resume';
import putLogHandler from '../handler/log/put-log';
import { RouteType } from '../../types/routes.types';

const routes: RouteType[] = [
  {
    method: 'get',
    path: '/resume/:email',
    handler: getResumeHandler,
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

import { ResumeFetchType, RouteFetchType } from '../../types/server.types';
import { getResumeProxy } from '../proxy/resume.proxy';

export const fetchRoutes: RouteFetchType[] = [
  {
    path: '/',
    exact: true,
    fetchData: async (): Promise<ResumeFetchType> => {
      const email = 'kroy760@gmail.com';
      const resume = await getResumeProxy(email);
      return {
        resume: {
          email: email,
          [email]: resume,
        },
      };
    },
  },
];

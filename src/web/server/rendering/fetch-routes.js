// @flow

import { getResumeProxy } from '../proxy/resume.proxy';

export const fetchRoutes = [
  {
    path: '/',
    exact: true,
    fetchData: async () => {
      const email = 'kroy760@gmail.com';
      const resume = await getResumeProxy(email);
      return {
        resume: {
          activeResume: email,
          [email]: resume,
        },
      };
    },
  },
];

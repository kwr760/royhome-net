// @flow

import { loadResumeByEmail } from '@api/server/db/resume';

export const fetchRoutes = [
  {
    path: '/',
    exact: true,
    fetchData: async () => {
      const email = 'kroy760@gmail.com';
      const resume = await loadResumeByEmail(email);
      return {
        resume: {
          activeResume: email,
          [email]: resume,
        },
      };
    },
  },
];

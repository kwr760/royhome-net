// @flow

import { OK } from 'http-status-codes';
import type { ApiResponseType } from '../types';

const getResumeHandler = (): ApiResponseType => ({
  status: OK,
  body: {
    resume: [
      { id: 1, title: 'Building Apps with React and Redux' },
      { id: 2, title: 'Creating Reusable React Components' },
    ],
  },
});

export default getResumeHandler;

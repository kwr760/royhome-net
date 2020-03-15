// @flow

import { OK } from 'http-status-codes';
import type { ApiResponse } from '../types';

const getResumeHandler = (): ApiResponse => ({
  status: OK,
  body: {
    message: 'Return to my resume!',
  },
});

export default getResumeHandler;

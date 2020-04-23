// @flow

import { OK } from 'http-status-codes';
import type { ApiResponseType } from '../types';

const getResumeHandler = (): ApiResponseType => ({
  status: OK,
  body: {
    message: 'Return to my staticresume!',
  },
});

export default getResumeHandler;

// @flow

import { OK } from 'http-status-codes';
import { loadResumeByEmail } from '../../db/resume';

const getResumeHandler = async () => {
  const email = 'kroy760@gmail.com';
  const resume = await loadResumeByEmail(email);

  return {
    status: OK,
    body: {
      resume,
    },
  };
};

export default getResumeHandler;

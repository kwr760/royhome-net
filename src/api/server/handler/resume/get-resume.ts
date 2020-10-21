import { OK } from 'http-status-codes';
import { loadResumeByEmail } from '../../db/resume';
import { ApiResponseType } from '../../../types/handler.types';

const getResumeHandler = async (): Promise<ApiResponseType> => {
  const email = 'kroy760@gmail.com';
  const resume = await loadResumeByEmail(email);

  return {
    status: OK,
    data: {
      resume,
    },
  };
};

export default getResumeHandler;

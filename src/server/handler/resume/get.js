import { OK } from 'http-status-codes';

const getResumeHandler = () => ({
  status: OK,
  body: {
    message: 'Return to my resume!',
  },
});

export default getResumeHandler;

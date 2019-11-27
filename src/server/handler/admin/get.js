import { OK } from 'http-status-codes';

const getAdminHandler = () => ({
  status: OK,
  body: {
    message: 'Hello to an admin!',
  },
});

export default getAdminHandler;

import { OK } from 'http-status-codes';

const getPrivateHandler = () => ({
  status: OK,
  body: {
    message: 'Hello from a private API!',
  },
});

export default getPrivateHandler;

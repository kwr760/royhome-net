import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

const handleError = (err, req, res) => {
  console.error(err.message);
  return res.sendStatus(INTERNAL_SERVER_ERROR);
};

export default handleError;

import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Logger from '../logger';

const handleError = (err, req, res) => {
  Logger.error(err.message);
  return res.sendStatus(INTERNAL_SERVER_ERROR);
};

export default handleError;

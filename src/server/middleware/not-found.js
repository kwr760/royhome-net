import { NOT_FOUND } from 'http-status-codes';
import Logger from '../logger';

const notFound = (req, res) => {
  Logger.error('Endpoint was not found');
  return res.sendStatus(NOT_FOUND);
};

export default notFound;

// @flow

import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Logger from '../logger';

const handleError = (err: Error, req: Request, res: Response) => {
  Logger.error(err.message);
  return res.sendStatus(INTERNAL_SERVER_ERROR);
};

export default handleError;

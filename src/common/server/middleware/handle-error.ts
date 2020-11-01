import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Logger from '../logger';

const handleError = (err: Error, _req: Request, res: Response): Response => {
  Logger.error(err.message);
  return res.sendStatus(INTERNAL_SERVER_ERROR);
};

export default handleError;

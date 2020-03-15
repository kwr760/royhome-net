// @flow

import { OK } from 'http-status-codes';
import Logger from '../../logger';
import type { ApiResponse } from '../types';

const putLogHandler = (req: Request): ApiResponse => {
  const { logType, msg } = req.body;
  Logger.writeLog({ logType, msg });
  return { status: OK };
};

export default putLogHandler;

// @flow

import { OK } from 'http-status-codes';
import Logger from '../../logger';
import type { ApiResponseType } from '../types';

const putLogHandler = (req: Request): ApiResponseType => {
  const { logType, msg } = req.body;
  Logger.writeLog({ logType, msg });
  return { status: OK };
};

export default putLogHandler;

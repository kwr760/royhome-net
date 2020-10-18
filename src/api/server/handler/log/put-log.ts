import { Request } from 'express';
import { OK } from 'http-status-codes';

import Logger from '../../../../common/server/logger';
import { ApiResponseType } from '../../../types/handler.types';

const putLogHandler = (req: Request): ApiResponseType => {
  const { logType, msg } = req.body;
  Logger.writeLog({ logType, msg });
  return { status: OK };
};

export default putLogHandler;

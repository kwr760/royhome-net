import { OK } from 'http-status-codes';
import Logger from '../../logger';

const putLogHandler = (req) => {
  const { level, msg } = req.body;
  Logger.writeLog({ level, msg });
  return { status: OK };
};

export default putLogHandler;

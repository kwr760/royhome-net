import { Request, Response } from 'express';
import { getStatusText, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import Logger from '../../../common/server/logger';
import displayMessage from '../../../common/server/middleware/display-message';
import { RouteType } from '../../types/routes.types';

const routeHandler = async (route: RouteType, req: Request, res: Response): Promise<Response> => {
  try {
    displayMessage(`routeHandler: ${req.method} - ${req.url}`);
    const response = await route.handler(req, res);
    return res.status(response.status).send(response.data);
  } catch (e) {
    const status = e.status ? e.status : INTERNAL_SERVER_ERROR;
    const msg = `${getStatusText(status)}: ${e.msg ? e.msg : ''}`;
    Logger.error(msg);
    return res.status(status).json(msg);
  }
};

export default routeHandler;

import { getStatusText, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';

import Logger from '../logger';
import displayMessage from '../middleware/display-message';

const handleRoute = async (route, req, res) => {
  try {
    displayMessage(`handleRoute: ${req.method} - ${req.url}`);
    const response = await route.handler(req, res);
    const status = response.status ? response.status : OK;
    return res.status(status).send(response.body);
  } catch (e) {
    const status = e.status ? e.status : INTERNAL_SERVER_ERROR;
    const msg = `${getStatusText(status)}: ${e.msg ? e.msg : ''}`;
    Logger.error(msg);
    return res.status(status).json(msg);
  }
};

export default handleRoute;

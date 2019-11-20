import { OK, INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';
import express from 'express';

import checkJwt from '../middleware/check-jwt';
import checkRole from '../middleware/check-role';
import Logger from '../logger';

const handleRoute = async (route, req, res) => {
  try {
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

const generate = (routes) => {
  const router = express.Router();
  let middleware;

  routes.forEach((route) => {
    const {
      method, path, authenticate, role,
    } = route;
    middleware = [];
    if (authenticate) {
      middleware.push(checkJwt);
    }
    if (role) {
      middleware.push(checkRole(role));
    }

    switch (method) {
      case 'get':
        Logger.info(`GET: ${JSON.stringify(route)}`);
        router.get(
          path,
          middleware,
          (req, res) => handleRoute(route, req, res),
        );
        break;
      case 'put':
        Logger.info(`PUT: ${JSON.stringify(route)}`);
        router.put(
          path,
          middleware,
          (req, res) => handleRoute(route, req, res),
        );
        break;
      case 'post':
        Logger.info(`POST: ${JSON.stringify(route)}`);
        router.post(
          path,
          middleware,
          (req, res) => handleRoute(route, req, res),
        );
        break;
      default:
        Logger.error(`Unknown route: ${JSON.stringify(route)}`);
        break;
    }
  });
  return router;
};

export default generate;

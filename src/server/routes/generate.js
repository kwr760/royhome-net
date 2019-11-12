import express from 'express';
import checkJwt from '../middleware/check-jwt';
import checkRole from '../middleware/check-role';

const generate = (routes) => {
  const router = express.Router();
  let middleware;

  routes.forEach((route) => {
    const {
      method, path, handler, authenticate, role,
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
        router.get(
          path,
          middleware,
          handler,
        );
        break;
      case 'put':
        router.put(
          path,
          middleware,
          handler,
        );
        break;
      case 'post':
        router.post(
          path,
          middleware,
          handler,
        );
        break;
      default:
        console.error(`Unknown route: ${JSON.stringify(route)}`);
        break;
    }
  });
  return router;
};

export default generate;

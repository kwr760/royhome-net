import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';

import hasNeededRole from '../../util/auth0/has-needed-role';
import { TOKEN_URL } from '../../util/auth0/role.constants';

export interface ExRequest extends Request {
  user: {
    [TOKEN_URL]: {
      role: string;
    }
  }
}
const checkRole = (neededRole: string) => (req: ExRequest, res: Response, next: NextFunction): Response | void => {
  const { user: token = { [TOKEN_URL]: { role: '' } } } = req;
  const { [TOKEN_URL]: context } = token;

  if (hasNeededRole(neededRole, context)) {
    return next();
  }

  return res.sendStatus(UNAUTHORIZED);
};

export default checkRole;
